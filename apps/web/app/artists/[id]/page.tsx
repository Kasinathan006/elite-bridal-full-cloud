"use client";
import {
    MapPin,
    Star,
    Calendar,
    Shield,
    Share2,
    Heart,
    CheckCircle2,
    IndianRupee,
    ArrowLeft,
    MoreHorizontal,
    Plus,
    MessageSquare,
    Globe,
    Award,
    Users,
    Crown,
    Quote,
    Camera,
    Sparkles,
    Lock
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function ArtistProfile() {
    const params = useParams();
    const id = params.id as string;
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [following, setFollowing] = useState(false);
    const [bookingDate, setBookingDate] = useState("");

    useEffect(() => {
        const initProfile = async () => {
            try {
                const [profRes, userRes] = await Promise.all([
                    fetch(`http://127.0.0.1:3001/profiles/${id}`),
                    fetch(`http://127.0.0.1:3001/auth/demo-user`)
                ]);
                const profData = await profRes.json();
                const userData = await userRes.json();
                setProfile(profData);
                setUser(userData);

                if (userData?.profile && profData?.followedBy) {
                    setFollowing(profData.followedBy.some((f: any) => f.followerId === userData.profile.id));
                }
            } catch (error) {
                console.error("Failed to init profile:", error);
            } finally {
                setLoading(false);
            }
        };
        if (id) initProfile();
    }, [id]);

    const handleFollow = async () => {
        if (!user?.profile) return alert("Please login to connect with artists");
        try {
            const res = await fetch(`http://127.0.0.1:3001/profiles/${id}/follow`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ followerId: user.profile.id })
            });
            const data = await res.json();
            setFollowing(data.following);
        } catch (e) { console.error(e); }
    };

    const handleInquiry = async () => {
        if (!user) return alert("Please login");
        if (!bookingDate) return alert("Please select a date");
        try {
            await fetch('http://127.0.0.1:3001/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    artistId: profile.id,
                    clientId: user.id,
                    date: bookingDate
                })
            });
            alert(`Inquiry sent to ${profile.displayName}! Check your dashboard for updates.`);
        } catch (e) { console.error(e); }
    };

    const handleRecommendation = async (text: string, rating: number) => {
        if (!user?.profile) return alert("Please login to endorse artists.");
        try {
            await fetch('http://127.0.0.1:3001/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ artistId: profile.id, clientId: user.id, date: new Date(), status: 'COMPLETED' })
            });
            alert("Elite recommendation submitted!");
        } catch (e) { console.error(e); }
    };

    if (loading) return <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
            <p className="font-black text-[#1A1A1A] uppercase tracking-[0.3em] text-sm">Opening Studio Gates...</p>
        </div>
    </div>;
    if (!profile) return <div className="min-h-screen bg-white flex items-center justify-center text-[#1A1A1A] font-black uppercase tracking-widest text-lg italic">Vault Profile Not Found</div>;

    const specsRaw = profile.specializations;
    const specs = Array.isArray(specsRaw) ? specsRaw : (specsRaw || "").split(',');
    const avgRating = profile.reviewsReceived?.length > 0
        ? (profile.reviewsReceived.reduce((acc: any, r: any) => acc + r.rating, 0) / profile.reviewsReceived.length).toFixed(1)
        : "New";

    return (
        <div className="min-h-screen bg-[#FAFAFA] pb-24 font-sans text-[#1A1A1A]">
            <div className="container mx-auto px-6 max-w-7xl pt-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* Main Content */}
                    <div className="lg:col-span-9 space-y-10">

                        {/* Header Card */}
                        <div className="bg-white rounded-[3rem] border border-gray-100 overflow-hidden relative shadow-2xl shadow-black/[0.02]">
                            {/* Banner */}
                            <div className="h-64 bg-[#1A1A1A] relative overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1594463750939-ebb6bd206637?auto=format&fit=crop&w=1200&q=80"
                                    className="w-full h-full object-cover opacity-70 scale-110 blur-sm group-hover:scale-100 transition-transform duration-1000"
                                    alt="Banner"
                                />
                                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
                                <div className="absolute top-8 right-8 flex gap-3">
                                    <button className="w-12 h-12 bg-white/10 hover:bg-white/30 rounded-2xl backdrop-blur-xl border border-white/20 flex items-center justify-center transition-all group">
                                        <Share2 className="w-5 h-5 text-white" />
                                    </button>
                                    <button className="w-12 h-12 bg-white/10 hover:bg-white/30 rounded-2xl backdrop-blur-xl border border-white/20 flex items-center justify-center transition-all group">
                                        <Heart className="w-5 h-5 text-white group-hover:fill-[#D4AF37] group-hover:text-[#D4AF37]" />
                                    </button>
                                </div>
                            </div>

                            <div className="px-10 pb-12 relative">
                                {/* Profile Img */}
                                <div className="relative -mt-32 mb-8 inline-block group">
                                    <div className="w-48 h-48 rounded-[2.5rem] border-[10px] border-white bg-white overflow-hidden shadow-2xl relative">
                                        <img
                                            src={profile.portfolioPhotos?.[0]?.url || 'https://i.pravatar.cc/300'}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            alt={profile.displayName}
                                        />
                                        <div className="absolute inset-0 bg-[#D4AF37]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-black rounded-2xl flex items-center justify-center shadow-xl border-4 border-white transform rotate-12 group-hover:rotate-0 transition-transform">
                                        <Crown className="w-6 h-6 text-[#D4AF37] fill-[#D4AF37]" strokeWidth={2.5} />
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-4">
                                            <h1 className="text-4xl font-black text-[#1A1A1A] uppercase tracking-tighter italic leading-none">{profile.displayName}</h1>
                                            {profile.isVerified && <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] border border-emerald-100 animate-pulse">Privé Partner</div>}
                                            <span className="text-gray-300 font-black text-xs space-x-2"><span>•</span> <span className="uppercase tracking-widest font-black">1st Degree Connection</span></span>
                                        </div>
                                        <p className="text-xl text-gray-500 font-black uppercase tracking-tight italic">{specs[0]} Haute Couture Studio • India</p>
                                        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-xs text-gray-400 font-black uppercase tracking-[0.2em]">
                                            <div className="flex items-center gap-2 group cursor-pointer hover:text-[#D4AF37] transition-colors">
                                                <MapPin className="w-4 h-4 text-[#D4AF37]" strokeWidth={3} />
                                                {profile.city}, {profile.state}
                                            </div>
                                            <div className="flex items-center gap-2 group cursor-pointer hover:text-[#D4AF37] transition-colors">
                                                <Users className="w-4 h-4 text-[#D4AF37]" strokeWidth={3} />
                                                1.2K+ Studio Network
                                            </div>
                                            <button className="text-[#D4AF37] border-b-2 border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all pb-0.5">Secure Credentials</button>
                                        </div>
                                    </div>

                                    <div className="hidden md:block">
                                        <div className="flex items-center gap-5 p-6 bg-gray-50 rounded-[2rem] border border-gray-100 shadow-inner">
                                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3">
                                                <Award className="w-8 h-8 text-[#D4AF37]" strokeWidth={2.5} />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em]">Vault Authority Rating</p>
                                                <p className="text-xl font-black text-[#1A1A1A] uppercase tracking-tighter italic">{avgRating} Stars <span className="text-[10px] text-gray-300 font-bold tracking-widest ml-2">({profile.reviewsReceived?.length} ENDORSEMENTS)</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 flex flex-wrap gap-4">
                                    <button className="bg-[#1A1A1A] text-[#D4AF37] px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/20 flex items-center gap-3">
                                        Propose Collaboration <Sparkles className="w-4 h-4" strokeWidth={3} />
                                    </button>
                                    <button className="border-2 border-[#1A1A1A] text-[#1A1A1A] px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-gray-50 transition-all flex items-center gap-3 active:scale-95">
                                        Connect Heritage <Users className="w-4 h-4" strokeWidth={3} />
                                    </button>
                                    <button className="w-14 h-14 bg-gray-50 flex items-center justify-center rounded-2xl hover:bg-gray-100 transition-all text-gray-400">
                                        <MoreHorizontal className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* About Card */}
                        <div className="bg-white rounded-[3rem] border border-gray-100 p-12 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-bl-full -mr-16 -mt-16 blur-2xl opacity-50" />
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-1.5 h-6 bg-[#D4AF37] rounded-full" />
                                <h2 className="text-2xl font-black text-[#1A1A1A] uppercase tracking-tighter italic">Artist Ethos</h2>
                            </div>
                            <div className="relative">
                                <Quote className="absolute -left-4 -top-4 w-10 h-10 text-gray-50 -z-10" />
                                <p className="text-xl text-gray-600 font-bold leading-relaxed italic pr-12">
                                    "{profile.bio || "Crafting legendary bridal standards through precision, heritage, and high-fidelity artistry. Every transition is a masterpiece of coordination."}"
                                </p>
                            </div>
                        </div>

                        {/* Portfolio Card */}
                        <div className="bg-white rounded-[3rem] border border-gray-100 overflow-hidden shadow-2xl shadow-black/[0.02]">
                            <div className="p-10 border-b border-gray-50 flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className="w-1.5 h-6 bg-[#D4AF37] rounded-full" />
                                    <h2 className="text-2xl font-black text-[#1A1A1A] uppercase tracking-tighter italic">Studio Archive</h2>
                                </div>
                                <button className="w-12 h-12 bg-gray-50 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] rounded-2xl flex items-center justify-center transition-all text-gray-400"><Plus className="w-6 h-6" strokeWidth={3} /></button>
                            </div>
                            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {profile.portfolioPhotos?.map((photo: any) => (
                                    <div key={photo.id} className="group relative aspect-square rounded-[2rem] overflow-hidden bg-gray-50 border border-gray-100 cursor-zoom-in">
                                        <img src={photo.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Portfolio" />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8 gap-2">
                                            <p className="text-white font-black uppercase tracking-widest text-[9px]">{photo.caption || 'Elite Bridal Set'}</p>
                                            <div className="h-0.5 w-8 bg-[#D4AF37] group-hover:w-full transition-all duration-500" />
                                        </div>
                                    </div>
                                ))}
                                {/* Mock additions if fewer than 3 */}
                                {(!profile.portfolioPhotos || profile.portfolioPhotos.length < 2) && (
                                    <>
                                        <div className="group relative aspect-square rounded-[2rem] overflow-hidden bg-gray-50 border border-gray-100 cursor-zoom-in">
                                            <img src="https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=400" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-50 grayscale" alt="Portfolio" />
                                            <div className="absolute inset-0 flex items-center justify-center"><Camera className="w-10 h-10 text-gray-200" /></div>
                                        </div>
                                        <div className="group relative aspect-square rounded-[2rem] overflow-hidden bg-gray-50 border border-gray-100 cursor-zoom-in">
                                            <img src="https://images.unsplash.com/photo-1596467677216-2644f058ee2d?auto=format&fit=crop&w=400" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-50 grayscale" alt="Portfolio" />
                                            <div className="absolute inset-0 flex items-center justify-center"><Camera className="w-10 h-10 text-gray-200" /></div>
                                        </div>
                                    </>
                                )}
                            </div>
                            <button className="w-full p-8 text-[10px] font-black text-gray-400 hover:text-[#D4AF37] hover:bg-gray-50 border-t border-gray-50 text-center transition-all uppercase tracking-[0.4em]">
                                Expand Full Production Log →
                            </button>
                        </div>

                        {/* Specializations Card */}
                        <div className="bg-[#1A1A1A] rounded-[3rem] p-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-[100px]" />
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="w-1.5 h-6 bg-[#D4AF37] rounded-full" />
                                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">Technical Mastery</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {specs.map((s: any) => (
                                        <div key={s} className="bg-white/5 border border-white/10 rounded-[2rem] p-8 hover:bg-white/[0.08] transition-all group">
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <CheckCircle2 className="w-6 h-6 text-[#D4AF37]" strokeWidth={3} />
                                                </div>
                                                <div className="flex -space-x-2">
                                                    {[1, 2, 3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-[#1A1A1A] bg-gray-800" />)}
                                                </div>
                                            </div>
                                            <h4 className="text-xl font-black text-white uppercase tracking-tight mb-2 italic">{s.trim ? s.trim() : s}</h4>
                                            <div className="flex items-center gap-3 text-[9px] font-black text-[#D4AF37] uppercase tracking-widest">
                                                Verified by 12 Elite Peers
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Recommendations Card */}
                        <div className="bg-white rounded-[3rem] border border-gray-100 overflow-hidden">
                            <div className="p-10 border-b border-gray-50 flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className="w-1.5 h-6 bg-[#D4AF37] rounded-full" />
                                    <h2 className="text-2xl font-black text-[#1A1A1A] uppercase tracking-tighter italic">Validated Endorsements</h2>
                                </div>
                                <button
                                    onClick={() => {
                                        const text = prompt("Submit formal review to the heritage archive:");
                                        if (text) handleRecommendation(text, 5);
                                    }}
                                    className="bg-gray-50 text-[#1A1A1A] px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-[#D4AF37] transition-all"
                                >
                                    Issue Recommendation
                                </button>
                            </div>
                            <div className="p-0">
                                {profile.reviewsReceived?.length > 0 ? profile.reviewsReceived.map((review: any) => (
                                    <div key={review.id} className="p-10 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-all group">
                                        <div className="flex gap-6 mb-6">
                                            <div className="w-16 h-16 rounded-[1.5rem] overflow-hidden bg-gray-50 border-2 border-white shadow-xl group-hover:scale-105 transition-transform duration-500">
                                                <img src={`https://i.pravatar.cc/150?u=${review.reviewerId}`} className="w-full h-full object-cover" alt="Reviewer" />
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-3">
                                                    <h4 className="text-lg font-black text-[#1A1A1A] uppercase tracking-tighter italic">{review.reviewer?.displayName || "Studio Client"}</h4>
                                                    <div className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[8px] font-black uppercase tracking-widest border border-emerald-100">Verified</div>
                                                </div>
                                                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-none">Official Bridal Assignment • Session #VAL-923</p>
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <Quote className="absolute -left-6 -top-4 w-12 h-12 text-gray-100 -z-10 opacity-50" />
                                            <p className="text-lg text-gray-600 font-bold leading-relaxed italic pr-12">
                                                "{review.content}"
                                            </p>
                                        </div>
                                        <div className="mt-8 flex items-center justify-between">
                                            <div className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-100 rounded-xl shadow-sm">
                                                {[...Array(review.rating)].map((_, i) => (
                                                    <Star key={i} className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" strokeWidth={3} />
                                                ))}
                                                <span className="text-[10px] text-gray-400 font-black ml-3 uppercase tracking-widest">Elite Standard Approved</span>
                                            </div>
                                            <span className="text-[9px] text-gray-300 font-black uppercase tracking-widest">Heritage Signature Added</span>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="p-24 text-center space-y-4 bg-gray-50/50">
                                        <Quote className="w-12 h-12 text-gray-200 mx-auto" />
                                        <p className="text-gray-400 font-black uppercase tracking-[0.3em] italic text-xs leading-loose">No formal endorsements recorded in the archives.<br/>Be the first to validate this master artist.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Right Sidebar */}
                    <div className="lg:col-span-3 space-y-6">

                        <div className="bg-white rounded-[2.5rem] border border-gray-100 p-10 sticky top-28 shadow-2xl shadow-black/[0.02] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/5 rounded-bl-full -mr-12 -mt-12 blur-2xl" />
                            <div className="text-center mb-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/10 rounded-full mb-4">
                                    <Lock className="w-3 h-3 text-[#D4AF37]" />
                                    <p className="text-[8px] font-black text-[#D4AF37] uppercase tracking-[0.3em]">Vault Secured Pricing</p>
                                </div>
                                <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.4em] mb-2">Base Commission</p>
                                <div className="text-5xl font-black text-[#1A1A1A] flex items-center justify-center gap-1 tracking-tighter italic">
                                    <IndianRupee className="w-6 h-6 text-[#1A1A1A]" strokeWidth={4} />
                                    {profile.priceMin?.toLocaleString() || '0'}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-[9px] font-black text-gray-400 mb-3 uppercase tracking-[0.3em]">Coordination Date</label>
                                    <div className="relative group">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-[#D4AF37] transition-colors" />
                                        <input
                                            type="date"
                                            value={bookingDate}
                                            onChange={(e) => setBookingDate(e.target.value)}
                                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-transparent rounded-[1.25rem] text-xs font-black text-[#1A1A1A] uppercase tracking-widest focus:bg-white focus:ring-4 focus:ring-[#D4AF37]/5 focus:border-[#D4AF37]/20 outline-none transition-all shadow-inner"
                                        />
                                    </div>
                                </div>
                                <button
                                    className="w-full bg-[#1A1A1A] text-[#D4AF37] py-5 rounded-[1.25rem] font-black text-[10px] uppercase tracking-[0.4em] hover:scale-105 transition-transform active:scale-95 shadow-2xl shadow-black/10 flex items-center justify-center gap-3"
                                    onClick={handleInquiry}
                                >
                                    Establish Link <ArrowLeft className="w-4 h-4 rotate-180" strokeWidth={3} />
                                </button>
                                <div className="flex items-center gap-3 px-4 py-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                    <p className="text-[9px] text-emerald-800 font-black uppercase tracking-widest leading-normal">
                                        Full Studio Commitment Required to Secure Listing.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-12 pt-8 border-t border-gray-50 space-y-5">
                                <div className="flex items-center justify-between">
                                    <span className="text-[9px] text-gray-400 font-black uppercase tracking-[0.2em]">Authority Level</span>
                                    <span className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">Tier 1 Elite</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[9px] text-gray-400 font-black uppercase tracking-[0.2em]">Response Priority</span>
                                    <span className="text-[10px] text-[#1A1A1A] font-black uppercase tracking-widest italic">Instant Access</span>
                                </div>
                                <div className="mt-6 p-4 bg-gray-50 rounded-2xl border border-gray-100/50">
                                   <p className="text-[8px] text-gray-400 font-bold leading-relaxed uppercase tracking-widest text-center italic">
                                        Endorsed by the National Bridal Artist Federation.
                                   </p>
                                </div>
                            </div>
                        </div>

                        {/* Network Card */}
                        <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-xl shadow-black/[0.01]">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-1 h-4 bg-[#D4AF37] rounded-full" />
                                <h3 className="text-xs font-black text-[#1A1A1A] uppercase tracking-[0.2em] italic">Mutual High-Impact Network</h3>
                            </div>
                            <div className="space-y-6">
                                {[1, 2].map(i => (
                                    <div key={i} className="flex gap-4 items-center group cursor-pointer">
                                        <div className="w-12 h-12 rounded-2xl bg-gray-50 overflow-hidden flex-shrink-0 border border-gray-100 group-hover:scale-105 transition-transform duration-500 shadow-sm">
                                            <img src={`https://i.pravatar.cc/150?u=alt${i}`} className="w-full h-full object-cover" alt="Artist" />
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <h4 className="text-[10px] font-black text-[#1A1A1A] uppercase tracking-tight truncate leading-none mb-1">Elite Professional {i}</h4>
                                            <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mb-2">Makeup Authority • Bangalore</p>
                                            <button className="flex items-center gap-1.5 text-[8px] font-black text-[#D4AF37] uppercase tracking-widest hover:text-black transition-colors">
                                                <MessageSquare className="w-3 h-3" /> Secure Msg
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
