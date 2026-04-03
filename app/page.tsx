'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, BarChart3, ShieldCheck, Zap, AlertCircle } from 'lucide-react';
import InputForm from '@/components/InputForm';
import ResultsDisplay from '@/components/ResultsDisplay';
import { generateMarketIntelligence } from '@/lib/gemini';
import { MarketIntelligence } from '@/types';
import { demoMarketIntelligence } from '@/lib/demoData';

interface FormData {
  businessName: string;
  productService: string;
  valueProp: string;
  targetMarket: string;
  priceRange: string;
  scalingGoal: string;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [intelligence, setIntelligence] = useState<MarketIntelligence | null>(null);

  const scrollToResults = () => {
    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleGenerate = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);
    setIntelligence(null);
    try {
      const data = await generateMarketIntelligence(formData);
      setIntelligence(data);
      scrollToResults();
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Failed to generate intelligence. Please check your API key and try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemo = () => {
    setIsLoading(true);
    setError(null);
    setIntelligence(null);
    setTimeout(() => {
      setIntelligence(demoMarketIntelligence);
      setIsLoading(false);
      scrollToResults();
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900 font-sans">

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl">
              <Target className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">
              GTM<span className="text-blue-600">Intelligence</span>
            </span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-semibold text-slate-500">
            <a href="#" className="hover:text-blue-600 transition-colors">Platform</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Solutions</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Enterprise</a>
            <a
              href="#initialize"
              className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
            >
              Get Started
            </a>
          </nav>
        </div>
      </header>

      {/* ── Status Bar ── */}
      <div className="bg-slate-100 border-b border-slate-200 px-6 py-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[11px] font-medium text-slate-500 uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Real-time Market Data Active</span>
          </div>
          <div className="hidden sm:block italic normal-case tracking-normal">
            Powering high-performance Business Development teams
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 space-y-32">

        {/* Hero Section */}
        <section className="relative">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-100">
              <Zap className="w-3 h-3" />
              <span>Next-Gen B2B Intelligence</span>
            </div>
            <h1 className="font-extrabold text-5xl md:text-7xl leading-tight tracking-tight text-slate-900">
              Accelerate Your <br />
              <span className="text-blue-600">Business Development</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
              Our AI-powered engine maps your Ideal Customer Profile and identifies
              thousands of high-probability targets with precision accuracy.
              Built for teams who value data over noise.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() =>
                  document.getElementById('initialize')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95"
              >
                Analyze Your Market
              </button>
              <button
                onClick={handleDemo}
                disabled={isLoading}
                className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Try with Demo Data
              </button>
            </div>
          </div>
          {/* Decorative blob */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400/10 blur-[120px] rounded-full -z-10 pointer-events-none" />
        </section>

        {/* Input Section */}
        <section id="initialize" className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <h2 className="font-bold text-4xl tracking-tight text-slate-900">
                Define Your <span className="text-blue-600">GTM Strategy</span>
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Enter your business parameters to initialize the intelligence engine.
                Our system will crawl verified records to build your comprehensive outreach ecosystem.
              </p>
            </div>
            <div className="space-y-6">
              {[
                {
                  icon: BarChart3,
                  title: 'Market Modeling',
                  desc: 'Identify 500–15,000 target companies matching your ICP.',
                },
                {
                  icon: ShieldCheck,
                  title: 'Lead Verification',
                  desc: 'Real decision-makers with behavioral intelligence.',
                },
                {
                  icon: Zap,
                  title: 'Outreach Scaling',
                  desc: 'Tailored messaging angles designed for conversion.',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-5 items-start p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="bg-blue-50 p-3 rounded-xl shrink-0">
                    <item.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">{item.title}</h4>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white p-2 rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-slate-200/50">
              <InputForm onSubmit={handleGenerate} isLoading={isLoading} />
            </div>
          </div>
        </section>

        {/* Error State */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-red-50 text-red-600 border border-red-100 p-6 rounded-2xl flex items-center gap-4 font-bold text-sm"
            >
              <AlertCircle className="w-6 h-6 shrink-0" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center gap-6 py-24 text-center"
            >
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <div className="space-y-2">
                <p className="font-bold text-xl text-slate-900">
                  Building Your Intelligence Report
                </p>
                <p className="text-slate-500">
                  Analyzing market segments and identifying decision-makers...
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Section */}
        <AnimatePresence>
          {intelligence && !isLoading && (
            <motion.section
              id="results-section"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-12 pt-24 border-t border-slate-200"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-bold border border-emerald-100 uppercase tracking-wider">
                    Generation Complete
                  </div>
                  <h2 className="font-extrabold text-5xl md:text-6xl tracking-tight text-slate-900">
                    Market <span className="text-blue-600">Intelligence</span> Report
                  </h2>
                </div>
                <div className="text-xs font-bold text-slate-400 bg-slate-100 px-4 py-2 rounded-lg border border-slate-200 shrink-0">
                  DATE:{' '}
                  {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </div>
              <ResultsDisplay data={intelligence} />
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* ── Footer ── */}
      <footer className="bg-white border-t border-slate-200 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-slate-100 pb-16 mb-12">
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="bg-blue-600 p-2 rounded-xl">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-2xl tracking-tight">
                  GTM<span className="text-blue-600">Intelligence</span>
                </span>
              </div>
              <p className="text-slate-500 max-w-sm leading-relaxed">
                The leading platform for Business Development professionals seeking
                precision data and automated market intelligence.
              </p>
            </div>
            <div className="space-y-6">
              <h4 className="font-bold text-slate-900">Product</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">API Docs</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Scraping Tools</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="font-bold text-slate-900">Company</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-blue-600 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            <div>© 2026 GTM INTELLIGENCE ENGINE. ALL RIGHTS RESERVED.</div>
            <div className="text-center md:text-right">
              Precision Intelligence for Modern BD Teams.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
