'use client';

import React, { useState } from 'react';
import { MarketIntelligence, DecisionMakerProfile } from '@/types';
import {
  Download,
  Users,
  Building2,
  Target,
  Brain,
  Send,
  ExternalLink,
  BarChart3,
  Zap,
} from 'lucide-react';
import { motion } from 'motion/react';

interface ResultsDisplayProps {
  data: MarketIntelligence;
}

type TabId = 'icp' | 'potential' | 'companies' | 'people' | 'outreach';

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: 'icp', label: 'ICP Modeling', icon: Target },
  { id: 'potential', label: 'Market Potential', icon: BarChart3 },
  { id: 'companies', label: 'Target Companies', icon: Building2 },
  { id: 'people', label: 'Decision Makers', icon: Users },
  { id: 'outreach', label: 'Outreach Strategy', icon: Send },
];

export default function ResultsDisplay({ data }: ResultsDisplayProps) {
  const [activeTab, setActiveTab] = useState<TabId>('icp');

  const exportToCSV = () => {
    const escape = (val: string | undefined) =>
      `"${String(val ?? '').replace(/"/g, '""')}"`;

    const headers = [
      'Company',
      'Website',
      'Industry',
      'HQ',
      'Employees',
      'Revenue',
      'Decision Maker',
      'Title',
      'LinkedIn',
    ];

    const rows = data.companies.map((company, index) => {
      const dm: Partial<DecisionMakerProfile> =
        data.decisionMakers.find((d) => d.company === company.name) ||
        data.decisionMakers[index] ||
        {};
      return [
        escape(company.name),
        escape(company.website),
        escape(company.industry),
        escape(company.headquarters),
        escape(company.employees),
        escape(company.revenue),
        escape(dm.fullName),
        escape(dm.jobTitle),
        escape(dm.linkedinUrl),
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gtm-intelligence-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-12">
      {/* Tab Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-6 border-b border-slate-200 pb-8">
        <div className="flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                  : 'bg-white text-slate-500 hover:text-blue-600 border border-slate-200 hover:border-blue-200'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-blue-600 transition-all shadow-lg shadow-slate-100"
        >
          <Download className="w-4 h-4" />
          Export Dataset
        </button>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="min-h-[500px]"
      >
        {/* ── ICP Tab ── */}
        {activeTab === 'icp' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <section className="space-y-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl">
                  01
                </div>
                <h3 className="font-bold text-3xl tracking-tight text-slate-900">
                  Ideal Customer Profile
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    label: 'Primary Industries',
                    value: data.icp.profile.primaryIndustries.join(', '),
                  },
                  {
                    label: 'Ideal Size',
                    value: data.icp.profile.idealCompanySize,
                  },
                  {
                    label: 'Revenue Range',
                    value: data.icp.profile.idealRevenueRange,
                  },
                  {
                    label: 'Geo Focus',
                    value: data.icp.profile.geographicFocus,
                  },
                  {
                    label: 'Business Maturity',
                    value: data.icp.profile.businessMaturity,
                  },
                  {
                    label: 'Technology Adoption',
                    value: data.icp.profile.technologyAdoption,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-blue-100 transition-colors"
                  >
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                      {item.label}
                    </span>
                    <span className="block font-bold text-slate-900 leading-tight text-lg">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xl">
                  !
                </div>
                <h3 className="font-bold text-3xl tracking-tight text-slate-900">
                  Success Vectors
                </h3>
              </div>
              <div className="space-y-6">
                <div className="p-8 bg-slate-900 text-white rounded-3xl shadow-xl">
                  <span className="block text-xs font-bold uppercase text-blue-400 mb-8 tracking-widest">
                    Decision Triggers
                  </span>
                  <div className="space-y-8">
                    {data.icp.buyingTriggers.map((bt, i) => (
                      <div
                        key={i}
                        className="space-y-2 border-l-2 border-slate-700 pl-6"
                      >
                        <strong className="font-bold text-lg block">
                          {bt.event}
                        </strong>
                        <p className="text-sm text-slate-400 leading-relaxed">
                          {bt.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-8 bg-blue-600 text-white rounded-3xl shadow-xl">
                  <span className="block text-xs font-bold uppercase text-blue-100 mb-8 tracking-widest">
                    Value Realization (KPIs)
                  </span>
                  <div className="space-y-8">
                    {data.icp.successMetrics.map((sm, i) => (
                      <div key={i} className="space-y-2">
                        <strong className="font-bold text-lg block">
                          {sm.kpi}
                        </strong>
                        <p className="text-sm text-blue-100 leading-relaxed">
                          {sm.impact}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ── Market Potential Tab ── */}
        {activeTab === 'potential' && (
          <div className="space-y-12">
            <div className="bg-blue-600 rounded-[2.5rem] p-12 text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10 space-y-6 max-w-2xl">
                <h3 className="text-4xl font-extrabold tracking-tight">
                  Market Scaling Analysis
                </h3>
                <p className="text-xl text-blue-100 leading-relaxed font-medium">
                  Total Addressable Market:{' '}
                  <span className="text-white font-bold">
                    {data.icp.marketPotential.estimatedTAM}
                  </span>
                  . Below are the segments that comprise your target company
                  list.
                </p>
                <div className="pt-4 flex gap-4 flex-wrap">
                  <div className="px-5 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-bold border border-white/30">
                    High Precision Mode
                  </div>
                  <div className="px-5 py-2 bg-emerald-500 rounded-full text-sm font-bold border border-emerald-400">
                    Verified Lead Sources
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 blur-3xl rounded-full translate-x-20 -translate-y-20 pointer-events-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.icp.marketPotential.segments.map((segment, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-100 p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="mb-8 space-y-2">
                    <h4 className="text-2xl font-bold text-slate-900 tracking-tight">
                      {segment.name}
                    </h4>
                    <p className="text-blue-600 font-bold text-sm uppercase tracking-wider">
                      {segment.estimatedCount} Real Companies
                    </p>
                  </div>
                  <p className="text-slate-500 leading-relaxed mb-10 font-medium">
                    {segment.description}
                  </p>
                  <div className="space-y-4">
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Apollo / Sales Navigator Filters
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {segment.searchQueries.map((query, j) => (
                        <div
                          key={j}
                          className="flex items-center gap-2 group cursor-pointer"
                        >
                          <code className="bg-slate-50 text-slate-600 px-4 py-2 rounded-xl text-xs border border-slate-100 group-hover:border-blue-300 transition-colors">
                            {query}
                          </code>
                          <a
                            href={`https://www.google.com/search?q=${encodeURIComponent(query)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-slate-300 hover:text-blue-600 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-900 rounded-[2rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
              <div className="space-y-2">
                <h4 className="text-white font-bold text-2xl">
                  Want to scrape all companies?
                </h4>
                <p className="text-slate-400 font-medium">
                  Export this ICP configuration to initialize deep-scrape
                  targeting.
                </p>
              </div>
              <button
                onClick={() =>
                  alert(
                    `Scraping initiated for ${data.icp.marketPotential.estimatedTAM} targets...`
                  )
                }
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-3 active:scale-95 shrink-0"
              >
                <Zap className="w-5 h-5" />
                Initialize Deep Scrape
              </button>
            </div>
          </div>
        )}

        {/* ── Companies Tab ── */}
        {activeTab === 'companies' && (
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-bold text-xs uppercase tracking-wider">
                    <th className="p-8">Company Entity</th>
                    <th className="p-8">Industry / Base</th>
                    <th className="p-8">Capital / Scale</th>
                    <th className="p-8">Intelligence Data</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.companies.map((company, i) => (
                    <tr
                      key={i}
                      className="hover:bg-blue-50/30 transition-colors group"
                    >
                      <td className="p-8">
                        <div className="font-extrabold text-xl tracking-tight text-slate-900">
                          {company.name}
                        </div>
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-slate-400 group-hover:text-blue-600 transition-colors"
                        >
                          {company.website.replace(/^https?:\/\//, '')}{' '}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                      <td className="p-8">
                        <div className="font-bold text-sm text-slate-900">
                          {company.industry}
                        </div>
                        <div className="text-[11px] font-bold uppercase text-slate-400 mt-1 tracking-wide">
                          {company.headquarters}
                        </div>
                      </td>
                      <td className="p-8">
                        <div className="font-bold text-sm text-slate-900">
                          {company.employees} EMPLOYEES
                        </div>
                        <div className="inline-block px-2 py-0.5 mt-1 bg-slate-100 text-slate-500 text-[10px] font-bold uppercase rounded-md">
                          {company.revenue}
                        </div>
                      </td>
                      <td className="p-8">
                        <div className="space-y-3">
                          <span className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                            Signals
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {company.growthSignals.slice(0, 2).map((s, j) => (
                              <span
                                key={j}
                                className="px-2 py-1 bg-emerald-50 text-emerald-700 text-[9px] font-bold rounded-lg border border-emerald-100"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Decision Makers Tab ── */}
        {activeTab === 'people' && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {data.decisionMakers.map((dm, i) => {
              const behavior = data.behavioralIntelligence?.find(
                (b) => b.decisionMakerId === dm.id
              );
              return (
                <div
                  key={i}
                  className="bg-white border border-slate-100 p-10 rounded-[3rem] shadow-sm flex flex-col gap-8 group hover:shadow-xl hover:border-blue-100 transition-all"
                >
                  {/* Card Header */}
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h4 className="font-extrabold text-2xl tracking-tight text-slate-900">
                        {dm.fullName}
                      </h4>
                      <p className="text-xs font-bold uppercase text-blue-600 tracking-widest">
                        {dm.jobTitle}
                      </p>
                      <p className="font-bold text-xs uppercase tracking-widest text-slate-400">
                        {dm.company}
                      </p>
                    </div>
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 ${
                        dm.authorityLevel === 'High'
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                          : dm.authorityLevel === 'Medium'
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {dm.authorityLevel[0]}
                    </div>
                  </div>

                  {/* Profile */}
                  <div className="space-y-4 flex-grow">
                    <span className="block text-[10px] font-bold uppercase text-slate-300 tracking-widest">
                      Profile Focus
                    </span>
                    <p className="text-sm font-medium text-slate-600 leading-relaxed">
                      {dm.background}
                    </p>
                  </div>

                  {/* KPIs & Priorities */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-[9px] font-extrabold uppercase text-slate-300 mb-2 tracking-widest">
                        Key KPIs
                      </span>
                      <p className="text-[11px] font-bold text-slate-800 leading-relaxed">
                        {dm.kpis}
                      </p>
                    </div>
                    <div>
                      <span className="block text-[9px] font-extrabold uppercase text-slate-300 mb-2 tracking-widest">
                        Priorities
                      </span>
                      <p className="text-[11px] font-bold text-slate-800 leading-relaxed">
                        {dm.priorities}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  {dm.email && (
                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center justify-between group-hover:border-blue-200 transition-colors">
                      <span className="text-[11px] font-bold text-slate-900">
                        {dm.email}
                      </span>
                      <div className="text-[9px] font-bold uppercase text-slate-300">
                        Verified
                      </div>
                    </div>
                  )}

                  {/* Behavioral Intelligence */}
                  {behavior && (
                    <div className="pt-6 border-t border-slate-100 space-y-4">
                      <span className="flex items-center gap-2 text-[9px] font-extrabold uppercase text-blue-600 tracking-widest">
                        <Brain className="w-3 h-3" />
                        Behavioral Insight
                      </span>
                      <p className="text-[11px] font-medium text-slate-500 italic">
                        &quot;{behavior.strategicInitiatives}&quot;
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="block text-[9px] font-extrabold uppercase text-slate-300 mb-1 tracking-widest">
                            Interests
                          </span>
                          <p className="text-[11px] font-bold text-slate-800">
                            {behavior.interests.join(', ')}
                          </p>
                        </div>
                        <div>
                          <span className="block text-[9px] font-extrabold uppercase text-slate-300 mb-1 tracking-widest">
                            Content Focus
                          </span>
                          <p className="text-[11px] font-bold text-slate-800">
                            {behavior.contentTopics.join(', ')}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3">
                    <a
                      href={dm.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-blue-600 transition-all shadow-md active:scale-95"
                    >
                      Connect <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() =>
                        alert(`Running deep intelligence scan on ${dm.fullName}...`)
                      }
                      className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold text-sm hover:border-blue-600 hover:text-blue-600 transition-all active:scale-95"
                    >
                      <Zap className="w-4 h-4" /> Scrape
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Outreach Tab ── */}
        {activeTab === 'outreach' && (
          <div className="space-y-12">
            {data.outreachStrategies.map((os, i) => {
              const dm = data.decisionMakers.find(
                (d) => d.id === os.decisionMakerId
              );
              if (!dm) return null;
              return (
                <div
                  key={i}
                  className="bg-white border border-slate-100 rounded-[3rem] overflow-hidden shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="bg-slate-900 text-white p-8 md:p-10 flex flex-wrap justify-between items-center gap-4">
                    <div className="space-y-1">
                      <span className="block text-[10px] font-bold uppercase text-slate-500 tracking-widest">
                        Strategy For
                      </span>
                      <div className="font-bold text-xl tracking-tight">
                        <span className="text-blue-400">{dm.fullName}</span>{' '}
                        <span className="text-white/40 font-normal px-2">
                          |
                        </span>{' '}
                        {dm.company}
                      </div>
                    </div>
                    <div className="px-6 py-2.5 bg-blue-600 text-white rounded-full font-bold text-sm tracking-wide">
                      Channel: {os.bestChannel}
                    </div>
                  </div>
                  <div className="p-10 md:p-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="space-y-8">
                      <div className="space-y-3">
                        <span className="block text-[10px] font-bold uppercase text-slate-300 tracking-widest">
                          Strategic Timing
                        </span>
                        <p className="text-lg font-bold text-slate-900 tracking-tight leading-snug">
                          {os.timingTrigger}
                        </p>
                      </div>
                      <div className="space-y-3">
                        <span className="block text-[10px] font-bold uppercase text-slate-300 tracking-widest">
                          Messaging Angle
                        </span>
                        <p className="text-sm font-medium text-slate-600 leading-relaxed">
                          {os.messagingAngle}
                        </p>
                      </div>
                      <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 relative overflow-hidden">
                        <span className="block text-[10px] font-bold uppercase text-blue-400 tracking-widest mb-3 relative z-10">
                          Personalization Hook
                        </span>
                        <p className="text-sm font-bold text-blue-700 italic leading-relaxed relative z-10">
                          &quot;{os.personalizationHook}&quot;
                        </p>
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 blur-2xl rounded-full translate-x-12 -translate-y-12 pointer-events-none" />
                      </div>
                    </div>
                    <div className="lg:col-span-2 bg-slate-50 rounded-[2.5rem] p-10 md:p-14 relative border border-slate-100 hover:border-blue-200 transition-colors">
                      <div className="flex justify-between items-center mb-10">
                        <span className="text-xs font-bold uppercase text-slate-300 tracking-widest">
                          Outreach Draft
                        </span>
                        <button
                          onClick={() => {
                            navigator.clipboard
                              .writeText(os.exampleMessage)
                              .then(() => alert('Message copied to clipboard!'))
                              .catch(() =>
                                alert('Copy failed — please copy manually.')
                              );
                          }}
                          className="flex items-center gap-2 text-[10px] font-bold uppercase bg-white border border-slate-200 px-4 py-2 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all"
                        >
                          Copy Script
                        </button>
                      </div>
                      <div className="text-base font-medium text-slate-700 whitespace-pre-wrap leading-loose font-mono bg-white p-8 rounded-2xl border border-slate-100">
                        {os.exampleMessage}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}
