"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
    Shield,
    MapPin,
    Star,
    MessageSquare,
    UserPlus,
    Check,
    Share2,
    Calendar,
    Globe,
    Briefcase,
    Crown,
    Instagram,
    ArrowUpRight,
    Award,
    Heart,
    Zap,
    Sparkles,
    ShieldCheck,
    Verified,
    ExternalLink,
    Lock,
    Command,
    Terminal
} from "lucide-react";
import Link from "next/link";

export default function PublicProfilePage() {
    const { username } = useParams();
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch(`http://127.0.0.1:3001/profiles/username/${username}`);
                const data = await res.json();
                setProfile(data);
            } catch (error) {
                console.error("Fetch profile failed:", error);
            } finally {
                setLoading(false);
            }
        };
        if (username) fetchProfile();
    }, [username]);

    if (loading) return (
        <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-12 overflow-hidden">
            <div className="w-24 h-24 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mb-10 shadow-[0_0_50px_rgba(212,175,55,0.3)]" />
            <div className="text-center space-y-3">
                <p className="font-black text-[#1A1A1A] uppercase tracking-[0.8em] text-xl italic leading-none">Establishing Connection</p>
                <p className="text-[11px] text-gray-300 font-black uppercase tracking-[0.4em]">Verifying Heritage Signature...</p>
            </div>
        </div>
    );

    if (!profile) return (
        <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-6 overflow-hidden">
            <div className="max-w-2xl w-full text-center space-y-12">
                <div className="relative inline-block">
                    <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-full blur-3xl animate-pulse" />
                    <div className="bg-[#1A1A1A] w-32 h-32 rounded-[3.5rem] flex items-center justify-center mx-auto shadow-2xl relative z-10 border border-white/5">
                        <Lock className="w-12 h-12 text-[#D4AF37]" strokeWidth={2.5} />
                    </div>
                </div>
                <div>
                    <h2 className="text-5xl font-black text-[#1A1A1A] uppercase tracking-tighter italic mb-6 leading-none">Access Restriction</h2>
                    <p className="text-sm text-gray-400 font-bold uppercase tracking-[0.4em] leading-loose italic max-w-lg mx-auto">The requested professional record is currently isolated or requires higher authority synchronization.</p>
                </div>
                <Link href="/artists" className="inline-flex items-center gap-4 bg-[#1A1A1A] text-[#D4AF37] px-12 py-5 rounded-[2rem] font-black uppercase tracking-[0.4em] text-xs shadow-[0_30px_60px_-10px_rgba(0,0,0,0.4)] hover:scale-110 active:scale-95 transition-all group">
                    <ArrowUpRight className="w-5 h-5 group-hover:-rotate-45 transition-transform" strokeWidth={3} />
                    Reset Navigation
                </Link>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FAFAFA] pb-48 font-sans text-[#1A1A1A] overflow-x-hidden">
            {/* Immersive Cinematic Cover */}
            <div className="relative group/cover">
                <div className="h-[400px] md:h-[600px] bg-[#1A1A1A] relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#FAFAFA] z-20" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.15),transparent)] z-10" />
                    
                    {profile.coverPhotoUrl ? (
                        <img src={profile.coverPhotoUrl} className="w-full h-full object-cover scale-110 group-hover/cover:scale-100 transition-transform duration-[4s] ease-out opacity-60" alt="Cover" />
                    ) : (
                        <div className="w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] relative">
                             <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] to-[#D4AF37]/5" />
                        </div>
                    )}
                    
                    {/* Floating Status Bar Overlay */}
                    <div className="absolute top-16 left-16 z-30 hidden xl:flex items-center gap-8">
                        <div className="bg-black/40 backdrop-blur-3xl border border-white/10 pl-8 pr-10 py-4 rounded-[2.5rem] flex items-center gap-6 shadow-2xl group transition-all hover:bg-black/60">
                             <Crown className="w-6 h-6 text-[#D4AF37] fill-[#D4AF37] animate-pulse" strokeWidth={2} />
                             <div className="flex flex-col">
                                 <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white italic leading-none mb-1">Authenticity Rank</span>
                                 <span className="text-[12px] font-black uppercase tracking-widest text-[#D4AF37] leading-none">Elite Heritage V4.1</span>
                             </div>
                        </div>
                        <div className="bg-emerald-500/10 backdrop-blur-3xl border border-emerald-500/20 px-8 py-4 rounded-[2.5rem] flex items-center gap-4 shadow-2xl">
                             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                             <span className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-400 italic">Network Active</span>
                        </div>
                    </div>

                    {/* Quick Command Overlay */}
                    <div className="absolute bottom-32 right-16 z-30 hidden lg:block">
                        <div className="grid grid-cols-2 gap-4">
                             <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-3xl text-white text-center hover:bg-white/10 transition-colors cursor-pointer">
                                  <Terminal className="w-5 h-5 text-[#D4AF37] mx-auto mb-2" />
                                  <span className="text-[9px] font-black uppercase tracking-widest">Logs</span>
                             </div>
                             <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-3xl text-white text-center hover:bg-white/10 transition-colors cursor-pointer">
                                  <Command className="w-5 h-5 text-[#D4AF37] mx-auto mb-2" />
                                  <span className="text-[9px] font-black uppercase tracking-widest">Exec</span>
                             </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-6 max-w-[1400px]">
                    <div className="relative -mt-40 md:-mt-64 mb-20 z-40">
                        <div className="flex flex-col md:flex-row items-end gap-12">
                            <div className="relative group/avatar">
                                <div className="absolute -inset-2 bg-gradient-to-tr from-[#D4AF37] to-transparent rounded-[4.5rem] blur-2xl opacity-0 group-hover/avatar:opacity-40 transition-opacity duration-1000" />
                                <div className="w-56 h-56 md:w-80 md:h-80 rounded-[4rem] border-[16px] border-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden bg-white relative z-10 group-hover/avatar:scale-[1.03] transition-transform duration-1000">
                                    <img src={profile.portfolioPhotos?.[0]?.url || `https://i.pravatar.cc/800?u=${profile.id}`} className="w-full h-full object-cover" alt="Profile" />
                                </div>
                            </div>
                            <div className="flex-grow pb-10 space-y-6">
                                <div className="flex items-center gap-6">
                                    <h1 className="text-5xl md:text-8xl font-black text-gray-900 tracking-tighter uppercase italic leading-[0.8] drop-shadow-sm">{profile.displayName}</h1>
                                    {profile.isVerified && (
                                        <div className="bg-[#1A1A1A] p-4 rounded-2.5xl shadow-2xl transform rotate-6 hover:rotate-0 transition-all duration-700">
                                            <ShieldCheck className="w-8 h-8 text-[#D4AF37]" strokeWidth={3} />
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center gap-8">
                                    <p className="text-xl md:text-3xl text-gray-400 font-black uppercase tracking-[0.2em] italic border-l-8 border-[#D4AF37] pl-6 py-2 leading-none">
                                        {profile.tagline || `${profile.specializations} Elite Master`}
                                    </p>
                                    <div className="hidden md:flex gap-2">
                                        <div className="w-2 h-2 rounded-full bg-gray-200" />
                                        <div className="w-2 h-2 rounded-full bg-gray-200" />
                                        <div className="w-12 h-2 rounded-full bg-[#D4AF37]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {/* Primary Intel Channel */}
                        <div className="lg:col-span-8 space-y-16">
                            <div className="bg-white rounded-[5rem] border border-gray-100 p-12 md:p-20 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.03)] space-y-20 relative overflow-hidden border-t-8 border-t-[#1A1A1A]">
                                <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/[0.02] rounded-full blur-[100px] -mr-48 -mt-48" />
                                
                                <div className="flex flex-wrap items-center gap-12 text-[12px] font-black uppercase tracking-[0.4em] text-gray-400 relative z-10">
                                    <div className="flex items-center gap-4 group/loc cursor-pointer hover:text-[#1A1A1A] transition-colors">
                                        <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center group-hover/loc:bg-[#1A1A1A] transition-all">
                                            <MapPin className="w-5 h-5 text-[#D4AF37]" strokeWidth={3} />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                             <span className="leading-none">{profile.city}</span>
                                             <span className="text-[8px] text-gray-300">Station Node</span>
                                        </div>
                                    </div>
                                    <div className="w-px h-12 bg-gray-100 hidden md:block" />
                                    <div className="flex items-center gap-4 group/conn cursor-pointer hover:text-[#1A1A1A] transition-colors">
                                        <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center group-hover/conn:bg-[#1A1A1A] transition-all">
                                            <Users className="w-5 h-5 text-[#D4AF37]" strokeWidth={3} />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                             <span className="leading-none">{profile.followerCount} Linkages</span>
                                             <span className="text-[8px] text-gray-300">Peer Network</span>
                                        </div>
                                    </div>
                                    <div className="w-px h-12 bg-gray-100 hidden md:block" />
                                    <div className="flex items-center gap-4 group/auth cursor-pointer hover:text-emerald-600 transition-colors">
                                        <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center group-hover/auth:bg-[#1A1A1A] transition-all">
                                            <Award className="w-5 h-5 text-[#D4AF37]" strokeWidth={3} />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                             <span className="leading-none">Level 9.8</span>
                                             <span className="text-[8px] text-gray-300">Authority Index</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-10 relative z-10">
                                    <div className="flex items-center gap-6">
                                        <div className="w-3 h-12 bg-[#D4AF37] rounded-full" />
                                        <h2 className="text-4xl font-black text-[#1A1A1A] uppercase tracking-tighter italic leading-none">The Narrative</h2>
                                    </div>
                                    <div className="relative group/quote">
                                        <Sparkles className="absolute -left-12 -top-12 w-24 h-24 text-[#D4AF37]/5 group-hover/quote:text-[#D4AF37]/10 transition-all duration-1000" />
                                        <p className="text-2xl md:text-3xl text-gray-500 leading-[1.6] font-black italic border-l-2 border-gray-100 pl-12 py-4 relative z-10 transition-colors hover:text-[#1A1A1A]">
                                            "{profile.bio || "Redefining the luxury bridal landscape through a fusion of heritage precision and visionary artistry. Every session is a strategic alignment of visual excellence and professional discipline."}"
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-12 relative z-10">
                                    <div className="flex justify-between items-end">
                                        <div className="flex items-center gap-6">
                                            <div className="w-3 h-12 bg-[#D4AF37] rounded-full" />
                                            <h2 className="text-4xl font-black text-[#1A1A1A] uppercase tracking-tighter italic leading-none">Masterworks</h2>
                                        </div>
                                        <span className="text-[11px] font-black text-gray-300 uppercase tracking-[0.4em] italic mb-2">Vault Entry Required</span>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                                        {profile.portfolioPhotos?.[0] ? profile.portfolioPhotos.map((photo: any, i: number) => (
                                            <div key={photo.id} className="aspect-[3/4] rounded-[3rem] overflow-hidden bg-gray-50 group/img border border-gray-100 relative shadow-2xl hover:shadow-[0_60px_100px_-20px_rgba(0,0,0,0.1)] hover:-translate-y-4 transition-all duration-700 cursor-zoom-in">
                                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity z-10" />
                                                <img
                                                    src={photo.url}
                                                    className="w-full h-full object-cover scale-110 group-hover/img:scale-100 transition-transform duration-1000"
                                                    alt={photo.caption}
                                                />
                                                <div className="absolute bottom-10 left-10 right-10 z-20 translate-y-10 group-hover/img:translate-y-0 opacity-0 group-hover/img:opacity-100 transition-all duration-500">
                                                    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-5 rounded-2.5xl">
                                                         <p className="text-[10px] font-black text-white uppercase tracking-[0.3em] leading-tight italic mb-1">{photo.caption || 'Production Piece'}</p>
                                                         <div className="flex items-center gap-2">
                                                              <div className="w-1 h-1 rounded-full bg-[#D4AF37]" />
                                                              <span className="text-[8px] text-white/60 font-black uppercase tracking-widest">Heritage Series #00{i+1}</span>
                                                         </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )) : (
                                            <div className="col-span-full py-48 text-center bg-[#FAFAFA] rounded-[4rem] border-4 border-dashed border-gray-100 group/empty hover:border-[#D4AF37]/20 transition-all duration-700">
                                                <Sparkles className="w-20 h-20 text-gray-200 mx-auto mb-8 group-hover/empty:rotate-12 transition-transform duration-700" />
                                                <div className="space-y-4">
                                                    <p className="text-gray-300 font-black italic text-2xl uppercase tracking-[0.5em]">Inventory Developing</p>
                                                    <p className="text-[10px] text-gray-200 font-black uppercase tracking-[0.4em]">Establishing Visual Repository...</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* High-Fidelity Command Module */}
                        <div className="lg:col-span-4 space-y-10">
                            <div className="bg-[#1A1A1A] rounded-[4.5rem] p-12 shadow-[0_60px_100px_-20px_rgba(0,0,0,0.5)] border border-white/5 space-y-12 sticky top-32 overflow-hidden group/sidebar">
                                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,rgba(212,175,55,0.1),transparent)]" />
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-[100px] -mr-32 -mt-32" />

                                <div className="space-y-6 relative z-10">
                                    <button
                                        onClick={() => setIsFollowing(!isFollowing)}
                                        className={`w-full flex items-center justify-center gap-5 py-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-xs transition-all duration-700 border-2 relative overflow-hidden group/btn-link ${isFollowing
                                                ? "bg-white/5 border-white/10 text-white hover:border-[#D4AF37]/40"
                                                : "bg-[#D4AF37] border-[#D4AF37] text-[#1A1A1A] hover:scale-105 active:scale-95 shadow-[0_30px_60px_-10px_rgba(212,175,55,0.4)]"
                                            }`}
                                    >
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn-link:translate-y-0 transition-transform duration-500" />
                                        {isFollowing ? <ShieldCheck className="w-6 h-6 relative z-10" /> : <UserPlus className="w-6 h-6 relative z-10" strokeWidth={3} />}
                                        <span className="relative z-10">{isFollowing ? "Authorized Node" : "Initialize Link"}</span>
                                    </button>
                                    <button className="w-full flex items-center justify-center gap-5 border-2 border-white/10 text-white py-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-xs hover:bg-white/5 transition-all duration-500 active:scale-95 group/btn-msg">
                                        <MessageSquare className="w-5 h-5 text-[#D4AF37] group-hover/btn-msg:scale-125 transition-transform" strokeWidth={3} />
                                        Secure Transmission
                                    </button>
                                </div>

                                <div className="space-y-10 pt-12 border-t border-white/[0.03] relative z-10">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-black text-white uppercase tracking-[0.5em] text-[11px] italic">Registry Protocols</h3>
                                        <Terminal className="w-4 h-4 text-white/20" />
                                    </div>
                                    <div className="space-y-8">
                                        {[
                                            { icon: Zap, label: "Response Delay", val: "T[-] 15m Protocol", iconColor: "text-[#D4AF37]" },
                                            { icon: Globe, label: "Deployment Zone", val: profile.city || "Global Heritage", iconColor: "text-blue-400" },
                                            { icon: Heart, label: "Artistry Core", val: "Traditional Heritage", iconColor: "text-red-400" },
                                            { icon: Instagram, label: "Visual Node", val: `@${username}_studio`, iconColor: "text-pink-400" }
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-8 group/protocol cursor-pointer">
                                                <div className="w-14 h-14 rounded-[1.5rem] bg-white/5 flex items-center justify-center border border-white/10 group-hover/protocol:border-[#D4AF37]/50 group-hover/protocol:bg-white/10 transition-all duration-500">
                                                    <item.icon className={`w-6 h-6 ${item.iconColor}`} strokeWidth={2.5} />
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.25em] leading-none mb-1 group-hover/protocol:text-white/40 transition-colors uppercase">{item.label}</p>
                                                    <p className="text-[15px] font-black text-white tracking-tight italic group-hover/protocol:text-[#D4AF37] transition-colors">{item.val}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white/5 rounded-[3rem] p-10 border border-white/10 space-y-6 relative overflow-hidden group/card hover:bg-white/10 transition-all duration-700">
                                     <div className="absolute top-0 left-0 w-full h-1 bg-[#D4AF37] scale-x-0 group-hover/card:scale-x-100 transition-transform duration-1000 origin-left" />
                                     <div className="flex items-center justify-between">
                                         <div className="flex items-center gap-3">
                                             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                             <span className="text-[11px] font-black text-[#D4AF37] uppercase tracking-[0.2em] italic">Active Grid</span>
                                         </div>
                                         <span className="text-[8px] font-black text-white/10 uppercase tracking-widest italic group-hover/card:text-[#D4AF37]/40 transition-colors">Vault Entry Authorized</span>
                                     </div>
                                     <button className="w-full bg-white text-[#1A1A1A] py-5 rounded-2xl font-black uppercase tracking-[0.5em] text-[10px] hover:bg-[#D4AF37] hover:scale-[1.02] transition-all active:scale-95 shadow-2xl flex items-center justify-center gap-4">
                                         Rate Card Download
                                         <ArrowUpRight className="w-4 h-4" strokeWidth={3} />
                                     </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Selection Shield */}
            <style jsx>{`
                ::selection {
                    background: #D4AF37;
                    color: #1A1A1A;
                }
            `}</style>
        </div>
    );
}
