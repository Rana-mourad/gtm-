import { GoogleGenAI, Type } from "@google/genai";

/* =========================
   CONFIG
========================= */
const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || "",
});

const APOLLO_API_KEY = process.env.APOLLO_API_KEY!;

/* =========================
   TYPES
========================= */
interface GenerateInput {
  businessName: string;
  productService: string;
  valueProp: string;
  targetMarket?: string;
  priceRange?: string;
  scalingGoal?: string;
}

/* =========================
   UTILITIES
========================= */
async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function safeGenerate(fn: () => Promise<any>, retries = 2): Promise<any> {
  try {
    return await fn();
  } catch (err) {
    if (retries === 0) throw err;
    return safeGenerate(fn, retries - 1);
  }
}

/* =========================
   SCORING
========================= */
function scoreCompany(company: any): number {
  let score = 0;

  if (company.fundingStatus?.includes("Series")) score += 25;
  if ((company.growthSignals || []).length >= 2) score += 25;
  if (company.techStack?.toLowerCase().includes("salesforce")) score += 15;
  if (company.employees > 50 && company.employees < 500) score += 20;
  if (company.decisionMakers?.some((d: any) => d.email)) score += 15;

  return Math.min(score, 100);
}

function getTier(score: number) {
  if (score >= 70) return "Tier 1";
  if (score >= 40) return "Tier 2";
  return "Tier 3";
}

/* =========================
   STEP 1: AI TARGETING
========================= */
async function generateBase(input: GenerateInput) {
  const prompt = `
SYSTEM: Elite GTM Intelligence Engine

RULES:
- No fake companies or people
- Use roles if unsure
- High precision only

INPUT:
Business: ${input.businessName}
Product: ${input.productService}
Value: ${input.valueProp}

OUTPUT:
JSON with:
- icp
- companies (10 real companies)
- decisionMakers (roles ok)
`;

  const res = await safeGenerate(() =>
    ai.models.generateContent({
      model: "gemini-1.5-pro",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
      },
    })
  );

  return JSON.parse(res.text());
}

/* =========================
   STEP 2: ENRICH COMPANY
========================= */
async function enrichCompany(domain: string) {
  const res = await fetch("https://api.apollo.io/v1/organizations/enrich", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": APOLLO_API_KEY,
    },
    body: JSON.stringify({ domain }),
  });

  const data = await res.json();

  return {
    employees: data.organization?.estimated_num_employees,
    revenue: data.organization?.annual_revenue,
    industry: data.organization?.industry,
    linkedin: data.organization?.linkedin_url,
  };
}

/* =========================
   STEP 3: FIND PEOPLE
========================= */
async function findDecisionMakers(companyName: string) {
  const res = await fetch("https://api.apollo.io/v1/people/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": APOLLO_API_KEY,
    },
    body: JSON.stringify({
      q_organization_name: companyName,
      person_titles: ["CEO", "Head of Growth", "VP Sales", "CMO"],
    }),
  });

  const data = await res.json();

  return (
    data.people?.map((p: any) => ({
      name: p.name,
      title: p.title,
      linkedin: p.linkedin_url,
      email: p.email,
    })) || []
  );
}

/* =========================
   STEP 4: ENRICH PIPELINE
========================= */
async function enrichPipeline(companies: any[]) {
  const results = [];

  for (const c of companies) {
    const domain = c.website?.replace("https://", "").replace("/", "");

    const enriched = await enrichCompany(domain);
    const people = await findDecisionMakers(c.name);

    await sleep(1000); // avoid rate limit

    results.push({
      ...c,
      ...enriched,
      decisionMakers: people,
    });
  }

  return results;
}

/* =========================
   STEP 5: OUTREACH
========================= */
async function generateOutreach(dm: any, company: any) {
  const prompt = `
Write a short personalized cold message.

Person: ${dm.name}, ${dm.title}
Company: ${company.name}

Rules:
- under 80 words
- specific
- no fluff
`;

  const res = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents: [{ parts: [{ text: prompt }] }],
  });

  return res.text;
}

/* =========================
   FINAL ENGINE
========================= */
export async function runFullGTM(input: GenerateInput) {
  // 1. AI base
  const base = await generateBase(input);

  // 2. Enrich
  const enriched = await enrichPipeline(base.companies);

  // 3. Score + tier
  const scored = enriched.map((c) => {
    const score = scoreCompany(c);
    return {
      ...c,
      gtmScore: score,
      priorityTier: getTier(score),
    };
  });

  // 4. Outreach
  for (const company of scored) {
    for (const dm of company.decisionMakers || []) {
      dm.message = await generateOutreach(dm, company);
    }
  }

  return {
    icp: base.icp,
    companies: scored,
  };
}