import { MarketIntelligence } from "@/types";

export const demoMarketIntelligence: MarketIntelligence = {
  icp: {
    profile: {
      primaryIndustries: ["SaaS", "FinTech", "HealthTech"],
      secondaryIndustries: ["E-commerce", "EdTech"],
      idealCompanySize: "50-500 employees",
      idealRevenueRange: "$5M - $50M ARR",
      geographicFocus: "North America (US & Canada) and EMEA (UK, Germany, France)",
      businessMaturity: "Series B+ / Scale-up",
      operationalComplexity: "Moderate",
      technologyAdoption: "Early Adopters / Tech-Forward",
    },
    marketPotential: {
      estimatedTAM: "$4.5 Billion",
      segments: [
        {
          name: "Global FinTech Scale-ups",
          estimatedCount: "4,200",
          description: "Mid-market financial technology companies with recent funding rounds and growing headcounts.",
          searchQueries: ["Fintech + 50-500 employees", "Series B FinTech", "FinTech Scale-up UK"],
        },
        {
          name: "European SaaS Platform",
          estimatedCount: "3,800",
          description: "B2B SaaS companies headquartered in EMEA focusing on enterprise collaboration or HR tech.",
          searchQueries: ["SaaS EMEA", "HR Tech France", "Collaboration SaaS Berlin"],
        }
      ],
    },
    painPoints: [
      { category: "Efficiency", description: "Manual data entry slowing down sales development reps by 15 hours/week." },
      { category: "Scalability", description: "Inability to scale outreach without hire-heavy growth." }
    ],
    currentSolutions: [
      { category: "Legacy CRM", examples: ["Salesforce", "HubSpot"] },
      { category: "Manual", examples: ["Excel", "LinkedIn Search"] }
    ],
    buyingTriggers: [
      { event: "New Funding Round", description: "Series B or C funding typically leads to a 40% increase in tech budget." },
      { event: "New VP of Sales", description: "Hiring a new sales leader usually precedes a tool-stack review." }
    ],
    budgetProfile: {
      allocation: "Typically 15-20% of total GTM budget.",
      cycleLength: "3-6 Months",
    },
    successMetrics: [
      { kpi: "CAC Reduction", impact: "Aim for a 25% reduction in Customer Acquisition Cost." },
      { kpi: "Pipeline Velocity", impact: "Increase top-of-funnel conversion by 2.5x." }
    ],
  },
  companies: [
    {
      name: "Stripe",
      website: "https://stripe.com",
      industry: "Financial Services",
      headquarters: "San Francisco, CA",
      employees: "7,000+",
      revenue: "$14B+",
      fundingStatus: "Private (Late Stage)",
      techStack: "React, Ruby on Rails, AWS",
      growthSignals: ["Expanding to EMEA", "Launching new tax product"],
    },
    {
      name: "Revolut",
      website: "https://revolut.com",
      industry: "FinTech",
      headquarters: "London, UK",
      employees: "5,000-10,000",
      revenue: "$1B+",
      fundingStatus: "Private (Late Stage)",
      techStack: "Java, GCP, React",
      growthSignals: ["Hiring 100+ sales roles", "Applying for banking license"],
    }
  ],
  decisionMakers: [
    {
      id: "dm_1",
      fullName: "Patrick Collison",
      jobTitle: "CEO & Co-founder",
      company: "Stripe",
      linkedinUrl: "https://linkedin.com/in/pcollison",
      background: "Extensive background in logic and programming. Focuses on developer infrastructure.",
      authorityLevel: "High",
      responsibilities: "Strategic vision and core product development.",
      priorities: "Global scaling and financial infrastructure efficiency.",
      kpis: "Global transaction volume, API uptime.",
      email: "pcollison@stripe.com",
    },
    {
      id: "dm_2",
      fullName: "Nikolay Storonsky",
      jobTitle: "CEO",
      company: "Revolut",
      linkedinUrl: "https://linkedin.com/in/storonsky",
      background: "Former trader with a focus on high-efficiency financial systems.",
      authorityLevel: "High",
      responsibilities: "Company operations and growth strategy.",
      priorities: "Profitability and expansion into secondary markets.",
      kpis: "Active user growth, ARPU.",
      email: "nik@revolut.com",
    }
  ],
  behavioralIntelligence: [
    {
      decisionMakerId: "dm_1",
      activityLevel: "High",
      contentTopics: ["Infrastructure", "Economics", "AI"],
      interests: ["Bicycles", "Philosophy"],
      strategicInitiatives: "Reducing friction in global commerce.",
      communicationStyle: "Technical, direct, and value-driven.",
    },
    {
      decisionMakerId: "dm_2",
      activityLevel: "Medium",
      contentTopics: ["Efficiency", "Growth", "Banking Regulation"],
      interests: ["Chess", "History"],
      strategicInitiatives: "Scaling operations in developing markets.",
      communicationStyle: "Analytical, results-oriented, and skeptical.",
    }
  ],
  outreachStrategies: [
    {
      decisionMakerId: "dm_1",
      bestChannel: "Email (Direct)",
      timingTrigger: "Strategic product launch",
      messagingAngle: "Efficiency through infrastructure improvement",
      personalizationHook: "I noticed your team is expanding into EMEA...",
      exampleMessage: "Hi Patrick,\n\nI saw your recent post about the expansion into EMEA. As you scale, optimizing the data entry process for your BD team could save them upwards of 15 hours a week. Our tool integrates directly with your existing stack to accelerate this. Would love to show you how.",
    },
    {
      decisionMakerId: "dm_2",
      bestChannel: "LinkedIn",
      timingTrigger: "Hiring spikes",
      messagingAngle: "Cost-per-lead optimization",
      personalizationHook: "Congratulations on the recent banking license application...",
      exampleMessage: "Hi Nikolay,\n\nI noticed you're scaling up your sales operations significantly following the recent license progress. At this stage, lead-gen efficiency is usually the biggest blocker to profitability. We've helped similar fintechs reduce lead-gen costs by 40% using our engine. Interested in a quick 10-minute chat?",
    }
  ],
};
