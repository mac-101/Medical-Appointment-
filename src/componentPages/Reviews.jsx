import React from 'react';
import { Star, User, ThumbsUp } from 'lucide-react';

const Reviews = () => {
    const reviews = [
        {
            id: 1,
            user: "Marcus Aurelius",
            rating: 5,
            date: "JAN 10, 2026",
            comment: "Excellent care and attention to detail. The doctor took the time to explain everything clearly.",
            verified: true
        },
        {
            id: 2,
            user: "Sarah Jenkins",
            rating: 4,
            date: "JAN 05, 2026",
            comment: "Very professional environment. The wait time was a bit long, but the consultation was top-notch.",
            verified: true
        },
        {
            id: 3,
            user: "David Chen",
            rating: 5,
            date: "DEC 28, 2025",
            comment: "Highly recommend for anyone dealing with chronic back pain. Life-changing experience.",
            verified: true
        }
    ];

    return (
        <div className="space-y-8">
            <h1 className="text-2xl px-4 font-medium">Reviews</h1>

            {/* 1. Review Summary Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gray-50 p-6 border-l-4 border-blue-600">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 leading-none">4.8</h2>
                    <div className="flex items-center gap-1 text-yellow-500 my-2">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={18} fill={i < 4 ? "currentColor" : "none"} />
                        ))}
                    </div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Based on 124 Reviews</p>
                </div>

                <button className="bg-gray-900 text-white px-6 py-3 text-xs font-black uppercase tracking-tighter hover:bg-blue-600 transition-colors">
                    Write a Review +
                </button>
            </div>

            {/* 2. Reviews List */}
            <div className="flex flex-col gap-6">
                {reviews.map((rev) => (
                    <div key={rev.id} className="border-b border-gray-100 pb-6 last:border-0">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-100 flex items-center justify-center">
                                    <User size={20} className="text-gray-400" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm uppercase">{rev.user}</h4>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] text-gray-400 font-bold">{rev.date}</span>
                                        {rev.verified && (
                                            <span className="text-[9px] bg-green-100 text-green-700 px-2 py-0.5 font-bold uppercase tracking-tighter">Verified</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-0.5 text-yellow-500">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={12} fill={i < rev.rating ? "currentColor" : "none"} />
                                ))}
                            </div>
                        </div>

                        <p className="text-sm text-gray-600 leading-relaxed italic">
                            "{rev.comment}"
                        </p>

                        <div className="mt-4 flex items-center gap-4">
                            <button className="flex items-center gap-1 text-[10px] font-bold text-gray-400 hover:text-blue-600">
                                <ThumbsUp size={12} /> Helpful
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reviews;