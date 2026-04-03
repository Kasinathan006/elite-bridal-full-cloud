"use client";
import {
    Calendar,
    MessageSquare,
    User,
    Clock,
    CheckCircle,
    ChevronRight,
    LayoutDashboard,
    Settings,
    Shield,
    Briefcase,
    Bookmark,
    FileText,
    BarChart3,
    Bell,
    Users,
    Users as UsersIcon,
    Star,
    Crown,
    ArrowUpRight,
    Sparkles,
    Zap,
    IndianRupee,
    TrendingUp
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function DashboardPage() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const userRes = await fetch('http://127.0.0.1:3001/auth/demo-user');
                const user = await userRes.json();
                if (!user) return;

                const [bookingsRes, convosRes] = await Promise.all([
                    fetch(`http://127.0.0.1:3001/bookings/${user.id}`),
                    fetch(`http://127.0.0.1:3001/messages/conversations/${user.id}`)
                ]);

                const bookings = await bookingsRes.json();
                const conversations = await convosRes.json();

                setData({
                    user,
                    bookings: Array.isArray(bookings) ? bookings : [],
                    conversations: Array.isArray(conversations) ? conversations : []
                });
            } catch (error) {
                console.error("Dashboard fetch failed:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboard();
    }, []);

    if (loading) return <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-12">
        <div className="w-16 h-16 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin shadow-2xl shadow-[#D4AF37]/20" />
        <div className="mt-8 text-center space-y-2">
            <p className="font-black text-[#1A1A1A] uppercase tracking-[0.5em] text-sm italic">Authenticating Studio Vault</p>
            <p className="text-[10px] text-gray-300 font-black uppercase tracking-widest">Loading High-Fidelity Management Suite...</p>
        </div>
    </div>;

    if (!data) return (
        <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-6">
            <div className="max-w-xl w-full bg-white rounded-[3.5rem] p-16 shadow-2xl border border-gray-100 text-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-1000" />
                <div className="bg-[#1A1A1A] w-24 h-24 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-2xl transform group-hover:rotate-6 transition-transform">
                    <Lock className="w-12 h-12 text-[#D4AF37]" strokeWidth={2.5} />
                </div>
                <h2 className="text-4xl font-black text-[#1A1A1A] uppercase tracking-tighter italic leading-none mb-4">Access Denied</h2>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-[0.2em] leading-loose italic mb-12">RECOGNIZED SIGNATURE REQUIRED FOR VAULT ENTRY.</p>
                <div className="space-y-4">
                    <Link href="/join" className="block w-full bg-[#1A1A1A] text-[#D4AF37] py-6 rounded-[2rem] font-black uppercase tracking-[0.4em] text-xs shadow-2xl hover:scale-105 active:scale-95 transition-all outline-none">Initialize Credentials</Link>
                    <button className="text-[10px] font-black text-gray-300 uppercase tracking-widest hover:text-[#1A1A1A] transition-colors">Request Support</button>
                </div>
            </div>
        </div>
    );

    const { user, bookings = [], conversations = [] } = data;

    return (
        <div className="min-h-screen bg-[#FAFAFA] pt-12 pb-24 font-sans text-[#1A1A1A]">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* Left Sidebar */}
                    <div className="hidden lg:block lg:col-span-3 space-y-8">
                        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl shadow-black/[0.02] overflow-hidden group">
                            <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-[#1A1A1A]">
                                <h2 className="font-black text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] italic leading-none">Studio Control</h2>
                                <LayoutDashboard className="w-4 h-4 text-[#D4AF37]" strokeWidth={3} />
                            </div>
                            <div className="p-4 space-y-2">
                                {[
                                    { label: "Commission Ledger", icon: Briefcase, count: bookings.length },
                                    { label: "Elite Connections", icon: Users, count: "156" },
                                    { label: "Studio Private Chat", icon: MessageSquare, count: conversations.length },
                                    { label: "Archive Vault", icon: Bookmark, count: 12 },
                                    { label: "Production Log", icon: Calendar, count: 1 },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between px-6 py-4 rounded-2xl hover:bg-gray-50 cursor-pointer transition-all group/item">
                                        <div className="flex items-center gap-5 text-gray-500 group-hover/item:text-[#1A1A1A]">
                                            <item.icon className="w-5 h-5 transition-all group-hover/item:scale-110 group-hover/item:text-[#D4AF37]" />
                                            <span className="text-[13px] font-black uppercase tracking-tight transition-colors">{item.label}</span>
                                        </div>
                                        <span className="text-[10px] font-black text-gray-300 group-hover/item:text-[#1A1A1A] tabular-nums">{item.count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#1A1A1A] rounded-[3rem] p-10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] relative overflow-hidden group border border-white/5">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 group-hover:scale-125 transition-all duration-1000">
                                <Crown className="w-24 h-24 text-[#D4AF37]" strokeWidth={1} />
                            </div>
                            <div className="relative z-10 space-y-8">
                                <div className="flex items-center gap-3">
                                    <TrendingUp className="w-4 h-4 text-[#D4AF37]" strokeWidth={3} />
                                    <h2 className="font-black text-[10px] text-[#D4AF37] uppercase tracking-[0.3em]">Influence Map</h2>
                                </div>
                                <div>
                                    <div className="flex justify-between text-[10px] font-black text-white/30 uppercase tracking-widest mb-6">
                                        <span>Heritage Authority</span>
                                        <span className="text-[#D4AF37]">+32.4%</span>
                                    </div>
                                    <div className="flex items-end gap-2 h-20">
                                        {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                                            <div key={i} className="flex-1 bg-white/5 rounded-t-xl relative group/bar overflow-hidden">
                                                <div
                                                    className="absolute bottom-0 left-0 right-0 bg-[#D4AF37] transition-all duration-1000 shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                                                    style={{ height: `${h}%` }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-[10px] text-white/30 font-black leading-loose italic border-t border-white/5 pt-6 uppercase tracking-widest">Digital heritage is trending in the South Indian segment.</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-[3rem] border border-gray-100 p-10 shadow-inner group overflow-hidden relative">
                            <div className="absolute inset-x-0 bottom-0 h-1 bg-[#D4AF37] transform translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                            <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] mb-8 text-center">Protocol status</p>
                            <div className="flex flex-col items-center gap-4">
                                <div className="inline-flex items-center gap-3 font-black text-[11px] text-[#1A1A1A] bg-gray-50 px-6 py-3 rounded-full border border-gray-100 shadow-sm relative overflow-hidden group/status">
                                    <div className="absolute inset-0 bg-[#D4AF37] -translate-x-full group-hover/status:translate-x-0 transition-transform duration-500 opacity-10" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                    <p className="relative uppercase tracking-widest">BOOKINGS ACTIVE</p>
                                </div>
                                <span className="text-[8px] text-gray-400 font-black uppercase tracking-[0.2em]">Priority response enabled</span>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="col-span-1 lg:col-span-9 space-y-12">

                        {/* Profile Summary */}
                        <div className="bg-white rounded-[3.5rem] border border-gray-100 p-10 shadow-2xl shadow-black/[0.03] flex flex-col md:flex-row justify-between items-center gap-10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full -mr-40 -mt-40 blur-3xl group-hover:scale-125 transition-transform duration-1000" />
                            <div className="flex items-center gap-8 relative z-10">
                                <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden bg-gray-50 border-[10px] border-white shadow-2xl shadow-black/10 flex-shrink-0 group-hover:scale-105 transition-transform duration-700">
                                    <img src="https://images.unsplash.com/photo-1594744803329-a35971481358?q=80&w=200&h=200&auto=format&fit=crop" alt="Profile" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-4 mb-3">
                                        <h1 className="text-4xl font-black text-[#1A1A1A] tracking-tighter uppercase italic leading-none">{user.displayName}</h1>
                                        <Crown className="w-7 h-7 text-[#D4AF37] fill-[#D4AF37]" strokeWidth={2.5} />
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em]">Elite Heritage Artist</p>
                                        <div className="w-1 h-1 rounded-full bg-gray-200" />
                                        <p className="text-[10px] text-[#D4AF37] font-black uppercase tracking-[0.3em]">Platinum Authority Since 2024</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4 relative z-10">
                                <button className="bg-white border-2 border-gray-100 text-[#1A1A1A] px-10 py-5 rounded-[1.75rem] font-black uppercase tracking-[0.2em] hover:border-[#1A1A1A] transition-all text-[10px] shadow-sm active:scale-95">
                                    Browse Archive
                                </button>
                                <button className="bg-[#1A1A1A] text-[#D4AF37] px-10 py-5 rounded-[1.75rem] font-black uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all text-[10px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)]">
                                    Access Settings
                                </button>
                            </div>
                        </div>

                        {/* High-Priority Bookings */}
                        <div className="space-y-6">
                            <div className="flex justify-between items-end px-8">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                         <div className="w-1 h-3 bg-[#D4AF37] rounded-full" />
                                         <span className="text-[9px] font-black text-[#D4AF37] uppercase tracking-[0.5em] italic">Private Commissions</span>
                                    </div>
                                    <h2 className="text-3xl font-black text-[#1A1A1A] uppercase tracking-tighter italic leading-none">Upcoming Engagements</h2>
                                </div>
                                <Link href="/artists" className="text-[10px] font-black text-[#D4AF37] underline-offset-8 uppercase tracking-[0.3em] flex items-center gap-2 hover:translate-x-2 transition-transform">
                                    New Inquiry <ArrowUpRight className="w-4 h-4" />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                {bookings.length > 0 ? bookings.slice(0, 3).map((b: any) => (
                                    <div key={b.id} className="bg-white rounded-[3rem] border border-gray-100 p-8 shadow-2xl shadow-black/[0.03] hover:shadow-black/[0.06] hover:border-[#D4AF37]/30 transition-all duration-700 group flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
                                        <div className="absolute top-0 left-0 bottom-0 w-1 bg-[#D4AF37] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                                        <div className="flex items-center gap-8 w-full">
                                            <div className="w-24 h-24 rounded-[2rem] bg-gray-50 overflow-hidden flex-shrink-0 border-2 border-white shadow-xl group-hover:scale-105 transition-transform duration-700">
                                                <img src={b.artistProfile.portfolioPhotos?.[0]?.url || 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=200&h=200&auto=format&fit=crop'} alt="Venue" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-grow space-y-4">
                                                <div>
                                                    <h4 className="text-2xl font-black text-[#1A1A1A] uppercase tracking-tighter italic leading-none group-hover:text-[#D4AF37] transition-colors mb-2">{b.artistProfile.displayName} Legacy Handshake</h4>
                                                    <div className="flex items-center gap-6">
                                                        <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                                            <Calendar className="w-4 h-4 text-[#D4AF37]" strokeWidth={3} />
                                                            {new Date(b.date).toLocaleDateString()}
                                                        </div>
                                                        <div className="w-1 h-1 rounded-full bg-gray-100" />
                                                        <div className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                                                            <Shield className="w-4 h-4 text-emerald-500/50" strokeWidth={3} />
                                                            Bonded Handshake
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="pt-2">
                                                    <span className={`px-6 py-2 rounded-xl text-[9px] font-black tracking-[0.3em] uppercase border ${b.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-[#D4AF37]/5 text-[#D4AF37] border-[#D4AF37]/20 p-2 shadow-[0_4px_10px_rgba(212,175,55,0.1)]'
                                                        }`}>
                                                        PROTOCOL: {b.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 w-full md:w-auto relative z-10">
                                            <button className="flex-grow md:flex-none bg-gray-50 text-gray-400 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#1A1A1A] hover:text-[#D4AF37] transition-all">
                                                Intel
                                            </button>
                                            <button className="flex-grow md:flex-none bg-[#1A1A1A] text-[#D4AF37] px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/30">
                                                Manage Handshake
                                            </button>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="bg-white rounded-[4rem] p-32 border-2 border-dashed border-gray-100 text-center flex flex-col items-center gap-8 group">
                                        <div className="w-20 h-20 bg-gray-50 rounded-[2.5rem] flex items-center justify-center border border-gray-100 shadow-inner group-hover:rotate-12 transition-transform">
                                            <Briefcase className="w-10 h-10 text-gray-200" />
                                        </div>
                                        <div className="space-y-4">
                                            <p className="text-gray-300 font-black italic text-xl uppercase tracking-[0.2em] leading-tight">Registry Silence Detected</p>
                                            <p className="text-[10px] text-gray-300 font-bold uppercase tracking-[0.3em]">Expand your network to reactivate engagement.</p>
                                        </div>
                                        <button className="bg-[#1A1A1A] text-[#D4AF37] px-10 py-5 rounded-full font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl active:scale-95 transition-transform">Browse Authorities</button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Recent Messages */}
                        <div className="bg-[#1A1A1A] rounded-[3.5rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] border border-black/10 relative group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-[80px]" />
                            <div className="p-10 border-b border-white/5 flex items-center justify-between relative z-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center shadow-inner">
                                        <MessageSquare className="w-6 h-6 text-[#D4AF37]" strokeWidth={2.5} />
                                    </div>
                                    <h3 className="font-black text-white uppercase tracking-[0.3em] text-sm italic">Privé Inbox</h3>
                                </div>
                                <div className="flex items-center gap-3">
                                     <span className="text-[9px] text-white/30 font-black uppercase tracking-widest italic">Live Transmission Active</span>
                                     <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                                </div>
                            </div>
                            <div className="p-4 space-y-4 relative z-10">
                                {conversations.map((c: any) => (
                                    <div key={c.id} className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:bg-white/5 hover:border-[#D4AF37]/30 cursor-pointer flex items-center gap-8 group/msg transition-all duration-500">
                                        <div className="w-20 h-20 rounded-[1.75rem] overflow-hidden bg-[#D4AF37]/5 border-2 border-white/10 flex items-center justify-center font-black text-[#D4AF37] text-3xl flex-shrink-0 shadow-2xl group-hover/msg:rotate-6 transition-transform">
                                            {c.participants.find((p: any) => p.id !== user.id)?.profile?.displayName[0] || "A"}
                                        </div>
                                        <div className="flex-grow min-w-0 space-y-2">
                                            <div className="flex justify-between items-baseline">
                                                <h4 className="text-2xl font-black text-white group-hover/msg:text-[#D4AF37] transition-colors italic tracking-tighter uppercase leading-none">{c.participants.find((p: any) => p.id !== user.id)?.profile?.displayName || "Artist"}</h4>
                                                <span className="text-[9px] text-white/20 font-black uppercase tracking-widest">{new Date(c.updatedAt).toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-gray-500 truncate font-bold flex items-center gap-3 italic text-sm tracking-tight group-hover/msg:text-white/60 transition-colors">
                                                <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37] opacity-20" />
                                                "{c.messages[0]?.text || "No messages yet..."}"
                                            </p>
                                        </div>
                                        <div className="px-4 opacity-0 group-hover/msg:opacity-100 transition-opacity">
                                             <ArrowUpRight className="w-6 h-6 text-[#D4AF37]" strokeWidth={3} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-8 border-t border-white/5 bg-black/[0.05]">
                                <button className="w-full py-6 rounded-[2rem] bg-white/5 border border-white/10 text-[10px] font-black text-white hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all uppercase tracking-[0.5em] flex items-center justify-center gap-4 group/btn">
                                    Initialize Messenger <Sparkles className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
