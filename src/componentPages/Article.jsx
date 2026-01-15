import React, { useState } from 'react';

export default function Article() {
    const [expandedId, setExpandedId] = useState(null);

    const dailyArticles = [
        {
            id: 1,
            title: "5 Signs of Heart Fatigue",
            category: "Cardiology",
            readTime: "3 min read",
            date: "JAN 13, 2026",
            content: "Heart fatigue often manifests as persistent shortness of breath, unusual swelling in the legs, and a sudden decrease in exercise tolerance. If you feel tired even after resting, it might be time to consult your cardiologist .",
            image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 2,
            title: "Managing Anxiety Naturally",
            category: "Mental Health",
            readTime: "5 min read",
            date: "JAN 12, 2026",
            content: "Mindfulness and controlled breathing exercises are proven to lower cortisol levels. Incorporating a 10-minute walk in nature and reducing caffeine intake can also help stabilize your mood.",
            image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800"
        }
    ];

    return (
        <section className="mb-8 max-w-7xl mx-auto">
            {/* News Header */}
            <div className="px-6 flex items-baseline gap-3 mb-8">
                <h3 className="font-black text-2xl md:text-3xl text-gray-900 tracking-tighter uppercase italic">The Pulse</h3>
                <div className="h-1 flex-1 bg-gray-900"></div>
            </div>

            <div className="flex flex-col px-6">
                {dailyArticles.map((article) => (
                    <div
                        key={article.id}
                        onClick={() => setExpandedId(expandedId === article.id ? null : article.id)}
                        // DESKTOP: flex-row | MOBILE: flex-col
                        className="group flex flex-col md:flex-row gap-6 border-b border-gray-200 last:border-0 pb-8 mb-8 cursor-pointer items-start"
                    >
                        {/* News Image - Fixed size on desktop, full width on mobile */}
                        <div className="relative w-full md:w-80 h-64 md:h-48 overflow-hidden bg-gray-100 flex-shrink-0 shadow-sm">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-3 left-3">
                                <span className="bg-blue-600 text-white text-[9px] font-bold px-2 py-1 uppercase tracking-widest">
                                    {article.category}
                                </span>
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="flex-1">
                            <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold mb-2">
                                <span>{article.date}</span>
                                <span>•</span>
                                <span>{article.readTime}</span>
                            </div>
                            
                            <h4 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-3 group-hover:text-blue-600 transition-colors">
                                {article.title}
                            </h4>

                            {/* Expandable Body */}
                            <div className={`overflow-hidden transition-all duration-300 ${expandedId === article.id ? 'max-h-96 opacity-100' : 'max-h-16 md:max-h-20 opacity-70'}`}>
                                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                                    {article.content}
                                </p>
                            </div>

                            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest">
                                {expandedId === article.id ? "Close Article -" : "Read Full Story +"}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}