import React, { useState, useEffect } from 'react';
import { Star, User, ThumbsUp, Send } from 'lucide-react';
import { db } from '../../firebase.config.js';
import { ref, push, get, onValue } from 'firebase/database';
import { useAuth } from '../services/useAuthContext';
import toast from 'react-hot-toast';

const Reviews = ({ targetId }) => {
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Form States
    const [showForm, setShowForm] = useState(false);
    const [newRating, setNewRating] = useState(5);
    const [newComment, setNewComment] = useState("");

    // 1. Fetch Reviews from the Doctor's own node
    useEffect(() => {
        // Path is now deep inside the target user (Doctor)
        const reviewsRef = ref(db, `users/${targetId}/reviews`);
        
        const unsubscribe = onValue(reviewsRef, async (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                
                // Get sender names by looking up their IDs
                const reviewList = await Promise.all(
                    Object.entries(data).map(async ([key, value]) => {
                        const userSnap = await get(ref(db, `users/${value.senderId}`));
                        return {
                            id: key,
                            ...value,
                            userName: userSnap.exists() ? userSnap.val().name : "User",
                            userImg: userSnap.exists() ? userSnap.val().image?.url : null
                        };
                    })
                );
                setReviews(reviewList.reverse());
            } else {
                setReviews([]);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [targetId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return toast("Log in to review");
        if (!newComment.trim()) return;

        const reviewData = {
            senderId: user.uid,
            rating: newRating,
            comment: newComment,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
            verified: true
        };

        try {
            // Push directly into the Doctor's reviews array
            await push(ref(db, `users/${targetId}/reviews`), reviewData);
            setNewComment("");
            setShowForm(false);
        } catch (err) {
            console.error("Post Review Error:", err);
        }
    };

    return (
        <div className="mt-2 pt-5 border-t border-slate-100">
            <div className="flex justify-between items-center mb-8 px-4">
                <div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mt-1">
                        {reviews.length} total reviews
                    </p>
                </div>
                <button 
                    onClick={() => setShowForm(!showForm)}
                    className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-200"
                >
                    {showForm ? "Close" : "Rate Doctor"}
                </button>
            </div>

            {/* Simple Writing Form */}
            {showForm && (
                <div className="mb-10 mx2 p-4 bg-blue-50/50 rounded-[2rem] border border-blue-100 animate-in fade-in zoom-in-95">
                    <div className="flex gap-2 mb-4">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <Star 
                                key={s} 
                                size={20} 
                                onClick={() => setNewRating(s)}
                                className={`cursor-pointer ${s <= newRating ? "text-yellow-400 fill-yellow-400" : "text-slate-300"}`} 
                            />
                        ))}
                    </div>
                    <textarea 
                        className="w-full p-4 rounded-2xl border-none focus:ring-2 focus:ring-blue-400 bg-white text-sm"
                        placeholder="Write your honest experience..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button 
                        onClick={handleSubmit}
                        className="mt-3 w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-xs uppercase"
                    >
                        Submit Review
                    </button>
                </div>
            )}

            {/* Review Cards */}
            <div className="space-y-4 px-2">
                {reviews.map((rev) => (
                    <div key={rev.id} className="bg-white border border-slate-50 rounded-2xl p-2">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-3">
                                <img 
                                    src={rev.userImg || "https://via.placeholder.com/40"} 
                                    className="w-8 h-8 rounded-lg object-cover bg-slate-100" 
                                />
                                <div>
                                    <h4 className="text-xs font-bold text-slate-900">{rev.userName}</h4>
                                    <span className="text-[9px] text-slate-400 font-bold uppercase">{rev.date}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-0.5 text-yellow-500">
                                {[...Array(rev.rating)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                            </div>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed italic mt-2">"{rev.comment}"</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reviews;