"use client";
import {
    Bell,
    ThumbsUp,
    MessageSquare,
    UserPlus,
    Calendar,
    MoreHorizontal,
    Briefcase,
    Shield,
    Star,
    Crown,
    Settings,
    ArrowUpRight,
    Lock,
    Zap,
    Sparkles,
    ShieldCheck,
    History,
    Activity,
    Search
} from "lucide-react";
import { useState, useEffect } from "react";

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const userRes = await fetch('http://127.0.0.1:3001/auth/demo-user');
                const user = await userRes.json();

                const res = await fetch(`http://127.0.0.1:3001/notifications/${user.id}`);
                const data = await res.json();

                if (data.length === 0) {
                    setNotifications([
                        { id: 1, type: 'FOLLOW', payload: '{"name": "Janvi Studio"}', createdAt: new Date(), isRead: false },
                        { id: 2, type: 'LIKE', payload: '{"name": "Sara Glam", "post": "Heritage Editorial Shoot..."}', createdAt: new Date(Date.now() - 3600000), isRead: true },
                        { id: 3, type: 'INQUIRY', payload: '{"name": "Karthik Frames"}', createdAt: new Date(Date.now() - 86400000), isRead: true },
                    ]);
                } else {
                    setNotifications(data);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchNotifications();
    }, []);

    const getIcon = (type: string) => {
        switch (type) {
            case 'LIKE': return <Star className="w-8 h-8 text-[#D4AF37] fill-[#D4AF37]" strokeWidth={2.5} />;
            case 'FOLLOW': return <Crown className="w-8 h-8 text-[#D4AF37]" strokeWidth={2.5} />;
            case 'INQUIRY': return <Briefcase className="w-8 h-8 text-white" strokeWidth={2.5} />;
            default: return <Bell className="w-8 h-8 text-gray-300" strokeWidth={2.5} />;
        }
    };

    const getMessage = (n: any) => {
        const p = JSON.parse(n.payload);
        switch (n.type) {
            case 'LIKE': return <span><b>{p.name}</b> ADMIRED YOUR ARCHIVE PIECE: "{p.post}"</span>;
            case 'FOLLOW': return <span><b>{p.name}</b> INITIATED A PEER CONNECTION REQUEST.</span>;
            case 'INQUIRY': return <span><b>{p.name}</b> REQUESTED VAULT-LEVEL PRODUCTION ACCESS.</span>;
            default: return "NEW SYSTEM INTELLIGENCE BROADCASTED TO YOUR NODE.";
        }
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA] pt-24 pb-32 font-sans text-[#1A1A1A] overflow-hidden">
            <div className="container mx-auto px-6 max-w-[1400px]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Sidebar - Intelligence Station */}
                    <div className="hidden lg:block lg:col-span-3 space-y-10">
                        <div className="bg-white rounded-[4.5rem] border border-gray-100 p-12 text-center shadow-[0_40px_80px_-20px_rgba(0,0,0,0.03)] relative overflow-hidden group border-b-[12px] border-b-[#1A1A1A]">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-[#D4AF37]/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-1000" />
                            <div className="relative z-10">
                                <div className="w-24 h-24 bg-[#1A1A1A] rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-2xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-700">
                                    <Bell className="w-10 h-10 text-[#D4AF37]" strokeWidth={3} />
                                </div>
                                <h2 className="text-3xl font-black uppercase tracking-[0.1em] mb-3 italic leading-none group-hover:text-[#D4AF37] transition-colors duration-500">Activity</h2>
                                <div className="flex flex-col items-center gap-1">
                                     <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.4em] leading-none mb-1">Grid Intelligence</p>
                                     <div className="w-10 h-1 bg-[#D4AF37] rounded-full opacity-20 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <button className="mt-12 w-full bg-gray-50 py-5 rounded-3xl text-[11px] font-black uppercase tracking-[0.4em] hover:bg-[#1A1A1A] hover:text-[#D4AF37] transition-all flex items-center justify-center gap-4 group/btn shadow-inner">
                                    <Settings className="w-5 h-5 group-hover/btn:rotate-90 transition-transform" /> 
                                    Protocol
                                </button>
                            </div>
                        </div>

                        <div className="bg-[#1A1A1A] rounded-[4.5rem] p-12 text-white overflow-hidden relative group shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] border border-white/5">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.1),transparent)]" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full -ml-32 -mb-32 blur-[100px]" />
                            
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-2 h-8 bg-[#D4AF37] rounded-full scale-y-75 group-hover:scale-y-100 transition-transform" />
                                    <span className="text-[12px] font-black text-[#D4AF37] uppercase tracking-[0.5em] italic">Priority Node</span>
                                </div>
                                <h4 className="text-2xl font-black uppercase italic tracking-tighter mb-6 leading-[1.1] group-hover:text-[#D4AF37] transition-colors">Encrypted<br/>Transmission</h4>
                                <p className="text-[12px] text-white/30 font-bold uppercase tracking-[0.25em] leading-relaxed italic">Your professional footprint is authenticated across the heritage grid.</p>
                                <div className="mt-12 pt-10 border-t border-white/5">
                                    <button className="text-[11px] font-black text-[#FAFAFA] uppercase tracking-[0.5em] hover:text-[#D4AF37] hover:translate-x-4 transition-all flex items-center gap-4 group/link">
                                        Authority Status <ArrowUpRight className="w-5 h-5 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" strokeWidth={3} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Feed - High Fidelity List */}
                    <div className="col-span-1 lg:col-span-6 space-y-8">
                        <div className="bg-[#1A1A1A] rounded-[3.5rem] p-5 flex justify-between items-center shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] border border-white/5 relative overflow-hidden group">
                            <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />
                            <div className="flex gap-4 relative z-10 ml-4">
                                <button className="bg-[#D4AF37] text-[#1A1A1A] px-10 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.4em] shadow-2xl active:scale-95 transition-all flex items-center gap-3 italic">
                                    <Activity className="w-4 h-4" /> Grid
                                </button>
                                <button className="text-white/20 px-10 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.4em] hover:text-[#FAFAFA] transition-all flex items-center gap-3">
                                    <Zap className="w-4 h-4" /> System
                                </button>
                            </div>
                            <button className="text-[11px] font-black uppercase tracking-[0.4em] text-[#D4AF37] mr-8 relative z-10 group/mark italic flex items-center gap-3">
                                Clear Records
                                <div className="w-8 h-px bg-[#D4AF37]/30 group-hover/mark:w-16 transition-all duration-700" />
                            </button>
                        </div>

                        {loading ? (
                            <div className="bg-white rounded-[4.5rem] border border-gray-100 p-60 text-center shadow-inner relative overflow-hidden">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03),transparent)]" />
                                <div className="relative z-10">
                                    <div className="w-28 h-28 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto mb-12 shadow-[0_0_60px_rgba(212,175,55,0.2)]" />
                                    <div className="space-y-4">
                                        <p className="text-[#1A1A1A] font-black uppercase tracking-[0.8em] text-xl italic">Auditing Logs</p>
                                        <p className="text-gray-300 font-bold uppercase tracking-[0.4em] text-[10px]">Establishing Trace Protocol...</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-[4.5rem] border border-gray-100 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.04)] overflow-hidden border-t-8 border-t-[#D4AF37]">
                                {notifications.map((n) => (
                                    <div key={n.id} className={`p-12 border-b border-gray-50 hover:bg-[#FAFAFA] cursor-pointer transition-all duration-700 group relative ${!n.isRead ? 'bg-[#D4AF37]/[0.02]' : ''}`}>
                                        <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#D4AF37] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 shadow-[0_0_20px_rgba(212,175,55,0.4)]" />
                                        <div className="flex gap-12 relative z-10">
                                            <div className="pt-2">
                                                <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center transition-all duration-700 shadow-2xl border-4 border-white ${!n.isRead ? 'bg-[#1A1A1A] rotate-0' : 'bg-gray-50 transform -rotate-12 group-hover:rotate-0 group-hover:bg-[#1A1A1A]'}`}>
                                                    {getIcon(n.type)}
                                                </div>
                                            </div>
                                            <div className="flex-grow min-w-0">
                                                <div className="space-y-6">
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex gap-8 items-center">
                                                            <div className="relative">
                                                                <div className="absolute inset-0 bg-[#D4AF37] rounded-[1.5rem] blur-xl opacity-0 group-hover:opacity-30 transition-opacity" />
                                                                <div className="w-16 h-16 rounded-[1.5rem] overflow-hidden flex-shrink-0 bg-gray-100 border-2 border-white shadow-2xl relative z-10 group-hover:scale-105 transition-transform duration-700">
                                                                    <img src={`https://i.pravatar.cc/150?u=notif${n.id}`} alt="User" className="w-full h-full object-cover" />
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col gap-2">
                                                                <div className="flex items-center gap-4">
                                                                    <span className="text-[12px] font-black text-[#D4AF37] uppercase tracking-[0.25em] italic">{n.type} VERIFIED</span>
                                                                    <ShieldCheck className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]/10" strokeWidth={2.5} />
                                                                </div>
                                                                <div className="flex items-center gap-3">
                                                                    <span className="text-[10px] text-gray-300 font-black uppercase tracking-[0.3em] leading-none mb-1">
                                                                         Trace {new Date(n.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })} • {new Date(n.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false})}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            {!n.isRead && (
                                                                <div className="w-3 h-3 rounded-full bg-[#D4AF37] animate-pulse shadow-[0_0_15px_rgba(212,175,55,0.8)]" />
                                                            )}
                                                            <button className="p-4 hover:bg-white rounded-2xl transition-all border border-transparent hover:border-gray-100 shadow-sm">
                                                                <MoreHorizontal className="w-6 h-6 text-gray-200 group-hover:text-[#1A1A1A]" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <p className="text-2xl text-[#1A1A1A] leading-tight font-black italic tracking-tighter uppercase pr-16 group-hover:text-[#D4AF37] transition-colors duration-700">
                                                        "{getMessage(n)}"
                                                    </p>
                                                    <div className="flex items-center gap-6">
                                                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.5em] italic">Vault ID: #H_{1000 + n.id}</span>
                                                        <div className="flex-grow h-px bg-gray-50 group-hover:bg-[#D4AF37]/10 transition-colors" />
                                                        <div className="flex items-center gap-2 group/action cursor-pointer">
                                                             <span className="text-[9px] font-black text-gray-200 group-hover:text-[#1A1A1A] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-700">Inspect Link</span>
                                                             <ArrowUpRight className="w-5 h-5 text-gray-100 group-hover:text-[#D4AF37] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" strokeWidth={3} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="p-16 text-center border-t border-gray-50 group/more cursor-pointer bg-[#FAFAFA]/30">
                                     <button className="relative px-12 py-5 rounded-full border-2 border-gray-100 text-[12px] font-black text-gray-300 uppercase tracking-[0.6em] group-hover/more:border-[#D4AF37] group-hover/more:text-[#1A1A1A] group-hover/more:bg-white transition-all duration-700 active:scale-95 flex items-center justify-center gap-6 mx-auto">
                                          <Search className="w-5 h-5 opacity-40" strokeWidth={3} />
                                          Legacy Archive
                                          <History className="w-5 h-5 opacity-40 group-hover/more:rotate-12 transition-transform duration-700" strokeWidth={3} />
                                     </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Sidebar - Security & Analytics */}
                    <div className="hidden lg:block lg:col-span-3 space-y-12">
                        <div className="bg-white rounded-[4.5rem] border border-gray-100 p-12 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.03)] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/[0.03] rounded-full -mr-24 -mt-24 blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-1000" />
                            <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center mb-10 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-all">
                                <Shield className="w-10 h-10 text-emerald-500" strokeWidth={2.5} />
                            </div>
                            <h4 className="text-2xl font-black uppercase italic tracking-tighter mb-4 leading-none text-[#1A1A1A] group-hover:text-emerald-600 transition-colors">Vault<br/>Encryption</h4>
                            <p className="text-[11px] text-gray-400 font-bold leading-loose uppercase tracking-widest italic group-hover:text-gray-500 transition-colors">All transmission packets are verified through our multi-signature studio protocol.</p>
                            <div className="mt-10 flex items-center gap-4 bg-emerald-50/50 p-4 rounded-3xl border border-emerald-100/50">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest leading-none italic">Secure Connection Handshake Success</span>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-[4.5rem] border border-gray-100 p-12 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.03)] overflow-hidden group relative">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1A1A1A] via-[#D4AF37] to-[#1A1A1A] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-[2000ms]" />
                            <div className="flex justify-between items-center mb-12 relative z-10">
                                <p className="text-[12px] font-black text-gray-400 uppercase tracking-[0.4em] italic leading-none">Authority</p>
                                <Sparkles className="w-5 h-5 text-[#D4AF37] animate-pulse" strokeWidth={2.5} />
                            </div>
                            <div className="space-y-12 relative z-10">
                                <div className="group/metric cursor-pointer">
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest mb-5">
                                        <span className="group-hover/metric:text-[#1A1A1A] transition-colors">Elite Conversion</span>
                                        <span className="text-[#D4AF37] italic group-hover/metric:scale-110 transition-transform">92% Rank</span>
                                    </div>
                                    <div className="h-3 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100 p-1 shadow-inner relative">
                                        <div className="h-full bg-gradient-to-r from-[#1A1A1A] to-[#D4AF37] rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-1000 origin-left transform scale-x-0 group-hover:scale-x-100" style={{ width: '92%' }} />
                                    </div>
                                </div>
                                <div className="bg-[#1A1A1A] p-8 rounded-[3rem] border border-white/5 shadow-2xl relative group-hover:translate-y-[-5px] transition-transform duration-500">
                                    <div className="absolute inset-x-0 bottom-0 h-1 bg-[#D4AF37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                                    <p className="text-[10px] text-white/40 group-hover:text-[#D4AF37] font-black leading-loose italic uppercase tracking-[0.25em] transition-colors">Your heritage expansion score is currently elite-tier, outperforming the Chennai node network.</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-12 text-center bg-[#FAFAFA] rounded-[4.5rem] border border-gray-100 shadow-inner relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[#1A1A1A] translate-y-full group-hover:translate-y-0 transition-transform duration-1000 rounded-[4rem]" />
                            <div className="relative z-10 transition-all duration-700 group-hover:scale-110">
                                <div className="p-6 bg-white rounded-full inline-block mb-10 shadow-2xl group-hover:bg-[#1A1A1A] border border-transparent group-hover:border-[#D4AF37]/30 transition-colors">
                                     <Lock className="w-8 h-8 text-[#D4AF37]" strokeWidth={3} />
                                </div>
                                <div className="space-y-4">
                                     <h4 className="text-xl font-black text-[#1A1A1A] group-hover:text-[#FAFAFA] italic tracking-tighter uppercase italic leading-none">Bridal Connect</h4>
                                     <div className="h-px w-12 bg-[#D4AF37] mx-auto opacity-30" />
                                     <p className="text-[10px] font-black uppercase tracking-[0.5em] leading-relaxed text-gray-300 group-hover:text-[#D4AF37]">
                                         Encrypted Grid<br/>
                                         EST. 2026
                                     </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
