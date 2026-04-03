"use client";
import {
    Search,
    MapPin,
    Star,
    Shield,
    Users,
    IndianRupee,
    Bookmark,
    MoreVertical,
    Crown,
    Filter,
    Zap,
    Sparkles,
    ArrowUpRight,
    SearchX,
    Fingerprint,
    ShieldCheck,
    Navigation2,
    Lock
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ArtistsPage() {
    const [artists, setArtists] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [verifiedOnly, setVerifiedOnly] = useState(false);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const res = await fetch('http://127.0.0.1:3001/search/profiles');
                const data = await res.json();
                setArtists(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Failed to fetch artists:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchArtists();
    }, []);

    const filteredArtists = artists.filter(a => {
        const matchesSearch = (a.displayName + a.city + (a.specializations || "")).toLowerCase().includes(searchTerm.toLowerCase());
        const matchesVerified = verifiedOnly ? (a.isVerified || a.isCertified) : true;
        return matchesSearch && matchesVerified;
    });

    return (
        <div className="min-h-screen bg-[#FAFAFA] pt-24 pb-32 font-sans text-[#1A1A1A] overflow-hidden">
            <div className="container mx-auto px-6 max-w-[1400px]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Sidebar - Refined Discovery Hub */}
                    <div className="hidden lg:block lg:col-span-3 space-y-10">
                        <div className="bg-white rounded-[3.5rem] border border-gray-100 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.03)] overflow-hidden group">
                            <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-[#1A1A1A] relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-3xl -mr-16 -mt-16" />
                                <h2 className="font-black text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] italic relative z-10">Vault Registry</h2>
                                <Filter className="w-4 h-4 text-[#D4AF37] relative z-10" strokeWidth={3} />
                            </div>
                            <div className="p-6 space-y-2">
                                {[
                                    { label: "Studio Dossiers", icon: Bookmark, count: 12 },
                                    { label: "Elite Verification", icon: Crown, count: "Active" },
                                    { label: "Chain Validated", icon: ShieldCheck, count: "100%" },
                                    { label: "Registry Access", icon: Lock, count: "Clear" }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between px-8 py-5 rounded-[1.75rem] hover:bg-[#FAFAFA] cursor-pointer transition-all group/item border border-transparent hover:border-gray-100">
                                        <div className="flex items-center gap-5 text-gray-400 group-hover/item:text-[#1A1A1A]">
                                            <item.icon className="w-5 h-5 transition-all group-hover/item:scale-110 group-hover/item:text-[#D4AF37]" strokeWidth={2.5} />
                                            <span className="text-[13px] font-black uppercase tracking-tight transition-colors">{item.label}</span>
                                        </div>
                                        <span className="text-[9px] font-black text-gray-200 group-hover/item:text-[#D4AF37]/50">{item.count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button className="w-full bg-[#1A1A1A] text-[#D4AF37] py-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-[10px] hover:scale-[1.02] active:scale-95 transition-all shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] flex items-center justify-center gap-5 group relative overflow-hidden">
                            <div className="absolute inset-0 bg-white/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                            <Fingerprint className="w-6 h-6 group-hover:scale-110 transition-transform relative z-10" />
                            <span className="relative z-10">Private Invitation</span>
                        </button>

                        <div className="bg-white rounded-[3rem] border border-gray-100 p-10 shadow-inner relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-[40px] -mr-16 -mt-16 group-hover:scale-150 transition-all duration-1000" />
                            <p className="text-[9px] font-black text-[#D4AF37] uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
                                <Zap className="w-4 h-4 fill-[#D4AF37]" />
                                Network Insight
                            </p>
                            <p className="text-[14px] text-[#1A1A1A] leading-relaxed italic font-black uppercase tracking-tight opacity-70">
                                "Registry artists with Platinum Status represent the top 0.1% of high-end bridal productions."
                            </p>
                        </div>
                    </div>

                    {/* Main Feed - High Fidelity List */}
                    <div className="col-span-1 lg:col-span-6 space-y-12">

                        {/* Immersive Search Box */}
                        <div className="bg-[#1A1A1A] rounded-[4rem] p-12 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] border border-white/5 relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.08),transparent)] pointer-events-none" />
                            
                            <div className="mb-12 relative z-10 flex flex-col gap-4">
                                <div className="inline-flex items-center gap-4 px-4 py-1.5 bg-white/5 rounded-full border border-white/10 w-fit">
                                     <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                                     <span className="text-[9px] font-black text-[#D4AF37] uppercase tracking-[0.5em] italic">Authority Discovery Protocol</span>
                                </div>
                                <h1 className="text-5xl font-black text-white uppercase tracking-tighter italic leading-[0.9]">Find Master <br /><span className="text-[#D4AF37]">Artistry</span></h1>
                            </div>

                            <div className="relative group/input mb-12 relative z-10 transition-all">
                                <div className="absolute left-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/5 rounded-3xl flex items-center justify-center transition-all group-focus-within/input:bg-[#D4AF37]/10 group-focus-within/input:scale-90 border border-white/10">
                                    <Search className="w-7 h-7 text-white/10 group-focus-within/input:text-[#D4AF37] transition-all" strokeWidth={3} />
                                </div>
                                <input
                                    placeholder="Enter Artist Identity, Studio Coord..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-28 pr-10 py-9 bg-white/5 border border-white/10 rounded-[2.5rem] text-xl font-black text-white focus:bg-white/[0.08] focus:border-[#D4AF37]/40 transition-all outline-none placeholder:text-white/5 tracking-tight uppercase"
                                />
                                <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[10px] font-black text-white/10 uppercase tracking-widest pointer-events-none group-focus-within/input:opacity-0 transition-opacity">Transmission Active</div>
                            </div>

                            <div className="flex flex-wrap gap-4 relative z-10">
                                <button
                                    onClick={() => setVerifiedOnly(!verifiedOnly)}
                                    className={`px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.4em] transition-all flex items-center gap-4 active:scale-95 shadow-2xl ${verifiedOnly ? 'bg-[#D4AF37] text-[#1A1A1A] border-[#D4AF37]' : 'bg-white/5 text-white/20 border border-white/10 hover:border-white/30 hover:text-white'}`}
                                >
                                    <Crown className={`w-4 h-4 ${verifiedOnly ? 'fill-[#1A1A1A]' : ''}`} strokeWidth={3} />
                                    Platinum Archive Only
                                </button>
                                <button className="px-10 py-4 bg-white/5 text-white/20 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.4em] hover:text-white hover:border-white/30 transition-all active:scale-95 flex items-center gap-3">
                                    <Navigation2 className="w-4 h-4" />
                                    Region
                                </button>
                            </div>
                        </div>

                        {/* Dynamic Registry Results */}
                        <div className="space-y-8">
                            <div className="px-10 flex items-center justify-between">
                                <div className="flex items-center gap-5">
                                     <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                                     <h3 className="font-black text-[#1A1A1A] uppercase tracking-[0.5em] text-[10px] italic">
                                        {searchTerm ? `Transmission Matches: ${filteredArtists.length}` : 'Universal Elite Registry'}
                                     </h3>
                                </div>
                                <Lock className="w-5 h-5 text-gray-100" />
                            </div>

                            {loading ? (
                                <div className="bg-white rounded-[4rem] border border-gray-100 p-48 text-center shadow-2xl flex flex-col items-center">
                                    <div className="w-20 h-20 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mb-10 shadow-2xl shadow-[#D4AF37]/30" />
                                    <p className="text-[#1A1A1A] font-black uppercase tracking-[0.6em] text-[12px] italic">Synchronizing Studio Record...</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-10">
                                    {filteredArtists.length > 0 ? filteredArtists.map((artist: any) => (
                                        <div key={artist.id} className="bg-white rounded-[4rem] border border-gray-100 p-3 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.05)] group hover:shadow-[0_50px_100px_-30px_rgba(0,0,0,0.1)] transition-all duration-1000 animate-in fade-in slide-in-from-bottom-12 relative overflow-hidden">
                                          <div className="absolute inset-x-0 h-1 bottom-0 bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left" />
                                          <Link href={`/${artist.username || artist.id}`} className="block p-10 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#D4AF37]/[0.01] rounded-full -mr-48 -mt-48 transition-transform duration-[2s] group-hover:scale-150 pointer-events-none" />
                                            <div className="flex flex-col md:flex-row gap-12 relative z-10">
                                                <div className="w-44 h-64 rounded-[2.5rem] overflow-hidden bg-gray-50 flex-shrink-0 border-4 border-white shadow-2xl group-hover:scale-[1.03] transition-transform duration-1000 relative">
                                                    <img src={artist.portfolioPhotos?.[0]?.url || 'https://images.unsplash.com/photo-1594744803329-a35971481358?q=80&w=300&h=400&auto=format&fit=crop'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" alt={artist.displayName} />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/40 to-transparent flex items-end p-5">
                                                         <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-500">
                                                            <ArrowUpRight className="w-5 h-5" strokeWidth={3} />
                                                         </div>
                                                    </div>
                                                </div>
                                                <div className="flex-grow min-w-0 flex flex-col">
                                                    <div className="flex justify-between items-start mb-8">
                                                        <div className="space-y-3">
                                                            <div className="flex items-center gap-5">
                                                                <h4 className="text-4xl font-black text-[#1A1A1A] uppercase tracking-tighter italic group-hover:text-[#D4AF37] transition-all leading-none duration-700">
                                                                    {artist.displayName}
                                                                </h4>
                                                                {artist.isVerified && <Crown className="w-7 h-7 text-[#D4AF37] fill-[#D4AF37] drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]" strokeWidth={2.5} />}
                                                            </div>
                                                            <div className="flex items-center gap-6">
                                                                <div className="flex items-center gap-3 text-[11px] font-black text-gray-400 uppercase tracking-[0.3em]">
                                                                    <MapPin className="w-4 h-4 text-[#D4AF37]" strokeWidth={3} />
                                                                    {artist.city}
                                                                </div>
                                                                <div className="px-4 py-1.5 bg-[#D4AF37]/10 rounded-full text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em] border border-[#D4AF37]/20">Platinum Tier</div>
                                                            </div>
                                                        </div>
                                                        <button className="w-14 h-14 rounded-[1.75rem] bg-gray-50 flex items-center justify-center hover:bg-[#1A1A1A] group/btn transition-all shadow-sm border border-transparent hover:border-white/10">
                                                            <Bookmark className="w-6 h-6 text-gray-300 group-hover/btn:text-[#D4AF37] transition-all" strokeWidth={2.5} />
                                                        </button>
                                                    </div>

                                                    <div className="flex flex-wrap gap-3 mb-10">
                                                        {(Array.isArray(artist.specializations) ? artist.specializations : (artist.specializations || "Bridal Mastery, Heritage Looks").split(",")).slice(0, 3).map((tag: any) => (
                                                            <span key={tag} className="px-6 py-2.5 bg-[#FAFAFA] border border-gray-100 rounded-2xl text-[11px] text-[#1A1A1A]/40 font-black tracking-widest uppercase group-hover:bg-white group-hover:border-[#D4AF37]/30 group-hover:text-[#1A1A1A] transition-all leading-none">
                                                                {typeof tag === 'string' ? tag.trim() : tag}
                                                            </span>
                                                        ))}
                                                    </div>

                                                    <div className="mt-auto flex items-center justify-between pt-10 border-t border-gray-50">
                                                        <div className="flex flex-col gap-2">
                                                            <span className="text-[10px] text-gray-300 font-black uppercase tracking-[0.4em] leading-none italic">Base Compensation Pipeline</span>
                                                            <span className="flex items-baseline gap-2 text-[#1A1A1A] font-black text-2xl tracking-tighter italic leading-none">
                                                                <IndianRupee className="w-5 h-5 text-[#D4AF37]" strokeWidth={5} />
                                                                {artist.priceMin?.toLocaleString() || '45,000'}+ <span className="text-[12px] text-gray-300 not-italic uppercase tracking-widest ml-2 font-black">Archive Ref</span>
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-4 py-4 px-10 bg-[#1A1A1A] rounded-[1.5rem] text-[#D4AF37] shadow-xl group-hover:scale-105 transition-all duration-700 hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.4)]">
                                                             <span className="text-[11px] font-black uppercase tracking-[0.4em]">Initialize Vault</span>
                                                             <ArrowUpRight className="w-5 h-5" strokeWidth={3} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                          </Link>
                                        </div>
                                    )) : (
                                        <div className="p-48 text-center bg-white rounded-[4rem] border-2 border-dashed border-gray-100 shadow-inner">
                                            <SearchX className="w-20 h-20 text-gray-100 mx-auto mb-10" strokeWidth={1} />
                                            <p className="text-gray-300 font-black italic uppercase tracking-[0.6em] text-sm">ARCHIVE ISOLATED • NO MATCHES DETECTED</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <button className="w-full py-12 rounded-[3.5rem] border-2 border-gray-100 text-[12px] font-black text-gray-300 hover:text-[#1A1A1A] hover:border-[#D4AF37] hover:bg-white transition-all uppercase tracking-[0.6em] flex items-center justify-center gap-6 active:scale-[0.98] group shadow-2xl shadow-transparent hover:shadow-black/[0.05]">
                            Expand Historical Record <ArrowUpRight className="w-6 h-6 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" strokeWidth={3} />
                        </button>

                    </div>

                    {/* Right Sidebar - Intel & Elite Access */}
                    <div className="hidden lg:block lg:col-span-3 space-y-12">
                        <div className="bg-white rounded-[3.5rem] border border-gray-100 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.03)] overflow-hidden group">
                            <div className="px-12 py-10 border-b border-gray-50 flex justify-between items-center bg-[#1A1A1A] relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-3xl -mr-16 -mt-16" />
                                <h3 className="font-black text-[10px] text-[#D4AF37] uppercase tracking-[0.4em] italic relative z-10">Analyst Wire</h3>
                                <div className="w-2.5 h-2.5 bg-[#D4AF37] rounded-full animate-pulse shadow-[0_0_10px_rgba(212,175,55,1)] relative z-10" />
                            </div>
                            <div className="p-8 space-y-10">
                                {[
                                    { title: "Traditional Heritage Red is trending", read: "1.4k" },
                                    { title: "Elite Masterclass: Bangalore Edition", read: "890" },
                                    { title: "Wedding Season 2026 Forecast", read: "2.1k" },
                                    { title: "Sustainable Bridal Kits on the rise", read: "600" }
                                ].map((news, i) => (
                                    <div key={i} className="cursor-pointer group/news flex flex-col gap-3 p-4 rounded-2xl hover:bg-[#FAFAFA] transition-all border border-transparent hover:border-gray-50">
                                        <h4 className="text-[14px] font-black text-[#1A1A1A] group-hover/news:text-[#D4AF37] transition-all leading-tight uppercase italic tracking-tight duration-500">#{news.title}</h4>
                                        <div className="flex items-center justify-between text-[8px] font-black text-gray-400 uppercase tracking-widest mt-1">
                                            <span className="opacity-50">Intelligence Report</span>
                                            <span className="flex items-center gap-2 text-gray-300"><Users className="w-2.5 h-2.5" /> {news.read} NODES</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-8 border-t border-gray-50 bg-[#FAFAFA]/50">
                                <button className="w-full py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.5em] hover:text-[#1A1A1A] transition-all italic underline underline-offset-8">Request Intelligence Dossier</button>
                            </div>
                        </div>

                        <div className="bg-[#1A1A1A] rounded-[4rem] p-12 flex flex-col items-center text-center relative overflow-hidden group shadow-[0_50px_100px_-30px_rgba(0,0,0,0.8)] border border-white/5">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(212,175,55,0.15),transparent)] pointer-events-none group-hover:opacity-150 transition-opacity duration-[2s]" />
                            <div className="absolute -top-16 -left-16 w-48 h-48 bg-[#D4AF37] rounded-full opacity-[0.03] blur-[100px]" />
                            
                            <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/5 rounded-full mb-12 relative border border-white/10 shadow-2xl">
                                <Crown className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" strokeWidth={2.5} />
                                <span className="text-[9px] text-[#D4AF37] font-black uppercase tracking-[0.5em]">Heritage Access</span>
                            </div>

                            <div className="w-32 h-32 rounded-[2.5rem] bg-white/5 mb-10 flex items-center justify-center relative border border-white/10 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-1000 shadow-3xl">
                                <Star className="w-16 h-16 text-[#D4AF37] fill-[#D4AF37] animate-pulse" />
                            </div>
                            
                            <h4 className="text-3xl font-black text-white mb-6 relative tracking-tighter uppercase italic leading-[0.9]">Registry <br /><span className="text-white/20">Commissions</span></h4>
                            <p className="text-[12px] text-white/30 mb-12 relative font-black leading-loose uppercase tracking-[0.2em] italic group-hover:text-[#D4AF37]/50 transition-colors duration-1000">UNVEIL PROTECTED PORTFOLIOS ARCHIVED BY ELITE STEWARDSHIP PROTOCOLS.</p>
                            
                            <button className="w-full bg-[#D4AF37] text-[#1A1A1A] py-7 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.5em] hover:scale-[1.03] transition-all relative transform active:scale-95 shadow-[0_25px_50px_-15px_rgba(212,175,55,0.4)] overflow-hidden group/btn">
                                <span className="relative z-10">Request Registry Clearance</span>
                                <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-700 opacity-20" />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
