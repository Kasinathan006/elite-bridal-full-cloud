"use client";
import {
    Search,
    MoreHorizontal,
    Edit,
    Image as ImageIcon,
    Paperclip,
    Smile,
    Send,
    ChevronDown,
    Filter,
    Shield,
    Star,
    Crown,
    ArrowUpRight,
    Lock,
    Zap,
    Sparkles
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function MessagingPage() {
    const [convos, setConvos] = useState<any[]>([]);
    const [selectedConvo, setSelectedConvo] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [user, setUser] = useState<any>(null);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initMessaging = async () => {
            try {
                const userRes = await fetch('http://127.0.0.1:3001/auth/demo-user');
                const userData = await userRes.json();
                setUser(userData);

                const convosRes = await fetch(`http://127.0.0.1:3001/messages/conversations/${userData.id}`);
                const convosData = await convosRes.json();
                setConvos(Array.isArray(convosData) ? convosData : []);
                if (convosData.length > 0) setSelectedConvo(convosData[0]);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        initMessaging();
    }, []);

    useEffect(() => {
        if (selectedConvo) {
            fetch(`http://127.0.0.1:3001/messages/${selectedConvo.id}`)
                .then(res => res.json())
                .then(data => {
                    setMessages(Array.isArray(data) ? data : []);
                    setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
                });
        }
    }, [selectedConvo]);

    const handleSend = async () => {
        if (!newMessage.trim() || !selectedConvo || !user) return;
        try {
            const res = await fetch('http://127.0.0.1:3001/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    conversationId: selectedConvo.id,
                    senderId: user.id,
                    text: newMessage
                })
            });
            const msg = await res.json();
            setMessages([...messages, msg]);
            setNewMessage("");
            setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
        } catch (e) { console.error(e); }
    };

    if (loading) return (
        <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-12">
            <div className="w-16 h-16 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mb-8 shadow-2xl shadow-[#D4AF37]/20" />
            <div className="text-center space-y-2">
                <p className="font-black text-[#1A1A1A] uppercase tracking-[0.5em] text-sm italic">Initializing Transmission</p>
                <p className="text-[10px] text-gray-300 font-black uppercase tracking-widest leading-none">Establishing Secure Handshake...</p>
            </div>
        </div>
    );

    const partner = selectedConvo?.participants.find((p: any) => p.id !== user?.id)?.profile;

    return (
        <div className="h-[calc(100vh-90px)] bg-[#FAFAFA] flex items-center justify-center p-0 md:p-12 font-sans overflow-hidden">
            <div className="container max-w-[1400px] h-full bg-white rounded-[3.5rem] border border-gray-100 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] flex overflow-hidden relative">
                
                {/* Left Pane - Discovery & Active Threads */}
                <div className="w-full md:w-[420px] border-r border-gray-50 flex flex-col h-full bg-white relative z-20 shadow-2xl shadow-black/[0.02]">
                    <div className="p-10 border-b border-gray-50 bg-[#1A1A1A] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-1000" />
                        <div className="relative z-10 flex justify-between items-center">
                            <div className="space-y-1">
                                <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic leading-none">Privé Inbox</h2>
                                <p className="text-[9px] text-[#D4AF37] font-black uppercase tracking-[0.3em]">Encrypted Handshakes</p>
                            </div>
                            <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-all group/edit shadow-xl">
                                <Edit className="w-5 h-5 transition-transform group-hover/edit:rotate-12" />
                            </button>
                        </div>
                    </div>

                    <div className="px-8 py-6 bg-[#FAFAFA] border-b border-gray-50">
                        <div className="relative group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-[#D4AF37] transition-all" strokeWidth={3} />
                            <input
                                placeholder="Filter Transmission Log..."
                                className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-[1.25rem] text-[10px] font-black text-[#1A1A1A] placeholder:text-gray-300 shadow-sm outline-none focus:ring-8 focus:ring-[#D4AF37]/5 focus:border-[#D4AF37]/20 transition-all uppercase tracking-widest"
                            />
                        </div>
                    </div>

                    <div className="overflow-y-auto flex-grow h-full custom-scrollbar bg-white">
                        {convos.length > 0 ? convos.map(c => {
                            const p = c.participants.find((part: any) => part.id !== user?.id)?.profile;
                            const isActive = selectedConvo?.id === c.id;
                            return (
                                <div
                                    key={c.id}
                                    onClick={() => setSelectedConvo(c)}
                                    className={`p-8 border-b border-gray-50 cursor-pointer flex gap-6 transition-all group/item relative overflow-hidden ${isActive ? 'bg-[#D4AF37]/[0.03]' : 'hover:bg-gray-50'}`}
                                >
                                    {isActive && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#D4AF37] z-10 shadow-[4px_0_15px_rgba(212,175,55,0.4)]" />}
                                    <div className="w-16 h-16 rounded-[1.5rem] overflow-hidden flex-shrink-0 bg-gray-50 border-2 border-white shadow-xl relative group-hover/item:scale-105 transition-transform duration-700">
                                        <img src={p?.portfolioPhotos?.[0]?.url || `https://i.pravatar.cc/150?u=${p?.id}`} alt="Partner" className="w-full h-full object-cover" />
                                        {isActive && <div className="absolute inset-0 bg-[#D4AF37]/10 animate-pulse" />}
                                    </div>
                                    <div className="flex-grow min-w-0 space-y-2">
                                        <div className="flex justify-between items-baseline">
                                            <h4 className={`text-[13px] font-black uppercase tracking-tight truncate italic ${isActive ? 'text-[#1A1A1A]' : 'text-gray-400 group-hover/item:text-[#1A1A1A]'}`}>{p?.displayName || "Elite Authority"}</h4>
                                            <span className="text-[8px] text-gray-300 font-black uppercase tracking-widest">{new Date(c.updatedAt).toLocaleDateString()}</span>
                                        </div>
                                        <p className="text-xs text-gray-400 font-bold truncate leading-tight italic opacity-60 group-hover/item:opacity-100 transition-opacity">
                                            "{c.messages?.[0]?.text || "Initializing collaboration protocol..."}"
                                        </p>
                                    </div>
                                </div>
                            );
                        }) : (
                            <div className="p-16 text-center space-y-4">
                                <div className="w-16 h-16 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                    <Sparkles className="w-8 h-8 text-gray-100" />
                                </div>
                                <p className="text-[10px] text-gray-300 font-black uppercase tracking-[0.2em] italic">Archive Isolated</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Pane - Transmission */}
                {selectedConvo ? (
                    <div className="hidden md:flex flex-col flex-grow bg-white h-full relative">
                        {/* Transmission Header */}
                        <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-white sticky top-0 z-10 shadow-sm relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl -mr-32 -mt-32 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                            <div className="flex items-center gap-6 relative z-10">
                                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gray-50 border-2 border-white shadow-2xl group-hover:scale-105 transition-transform duration-700">
                                    <img src={partner?.portfolioPhotos?.[0]?.url || `https://i.pravatar.cc/150?u=${partner?.id}`} alt="Partner" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-4">
                                        <h3 className="text-2xl font-black text-[#1A1A1A] uppercase tracking-tighter italic leading-none">{partner?.displayName}</h3>
                                        <Crown className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" strokeWidth={2.5} />
                                    </div>
                                    <div className="flex items-center gap-3 mt-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em]">Signature Validated • {partner?.city || 'Elite Node'}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4 relative z-10">
                                <button className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center hover:bg-[#1A1A1A] group/shield transition-all shadow-sm">
                                    <Shield className="w-5 h-5 text-gray-300 group-hover/shield:text-[#D4AF37]" strokeWidth={2.5} />
                                </button>
                                <button className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-all shadow-sm border border-transparent hover:border-gray-200">
                                    <MoreHorizontal className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>
                        </div>

                        {/* Transmission Thread */}
                        <div className="flex-grow overflow-y-auto p-12 space-y-12 bg-[#FCFCFC] custom-scrollbar selection:bg-[#D4AF37]/30">
                            <div className="text-center py-16 relative">
                                <div className="absolute inset-x-0 top-1/2 h-px bg-gray-100 -z-10" />
                                <div className="inline-flex items-center gap-4 px-10 py-4 bg-white border border-gray-100 rounded-[2rem] text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.5em] shadow-2xl shadow-black/[0.03]">
                                    <Lock className="w-3.5 h-3.5" strokeWidth={3} />
                                    Transmission Layer Encrypted
                                </div>
                            </div>

                            {messages.map((m: any) => {
                                const isMe = m.senderId === user?.id;
                                return (
                                    <div key={m.id} className={`flex gap-8 ${isMe ? 'flex-row-reverse' : ''} group animate-in fade-in slide-in-from-bottom-5 duration-700`}>
                                        <div className={`w-12 h-12 rounded-[1.25rem] overflow-hidden flex-shrink-0 border-4 border-white shadow-2xl ${isMe ? 'order-2 rotate-3 group-hover:rotate-0' : '-rotate-3 group-hover:rotate-0'} transition-transform duration-500`}>
                                            <img src={isMe ? 'https://images.unsplash.com/photo-1594744803329-a35971481358?q=80&w=200&h=200&auto=format&fit=crop' : (partner?.portfolioPhotos?.[0]?.url || `https://i.pravatar.cc/150?u=${partner?.id}`)} alt="Avatar" className="w-full h-full object-cover" />
                                        </div>
                                        <div className={`max-w-[70%] ${isMe ? 'items-end' : 'items-start'} flex flex-col gap-3`}>
                                            <div className={`p-8 rounded-[2rem] text-[15px] font-bold tracking-tight shadow-2xl shadow-black/[0.03] transition-all group-hover:shadow-black/[0.06] flex flex-col gap-4 ${isMe 
                                                ? 'bg-[#1A1A1A] text-white rounded-tr-none border-b-2 border-r-2 border-white/5' 
                                                : 'bg-white text-[#1A1A1A] border border-gray-100 rounded-tl-none border-b-4 border-gray-50'
                                            }`}>
                                                <p className="leading-relaxed italic whitespace-pre-wrap">{m.text}</p>
                                                <div className={`flex items-center gap-4 border-t ${isMe ? 'border-white/5' : 'border-gray-50'} pt-4`}>
                                                     <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${isMe ? 'text-white/20' : 'text-gray-300'}`}>{new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                                                     {isMe && <Zap className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37] animate-pulse" />}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={scrollRef} />
                        </div>

                        {/* High-Fidelity Composer */}
                        <div className="p-10 border-t border-gray-50 bg-white relative">
                            <div className="bg-[#FAFAFA] rounded-[2.5rem] p-6 flex flex-col gap-6 border-2 border-transparent focus-within:border-[#D4AF37]/20 focus-within:bg-white focus-within:ring-[20px] focus-within:ring-[#D4AF37]/5 transition-all duration-500 shadow-inner">
                                <textarea
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Input high-fidelity proposal or communication..."
                                    className="w-full px-6 pt-2 text-lg bg-transparent border-none outline-none resize-none font-black text-[#1A1A1A] placeholder:text-gray-200 placeholder:italic min-h-[80px] custom-scrollbar selection:bg-[#D4AF37] selection:text-[#1A1A1A]"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSend();
                                        }
                                    }}
                                />
                                <div className="flex justify-between items-center px-4">
                                    <div className="flex gap-4">
                                        <button className="w-12 h-12 rounded-2xl flex items-center justify-center text-gray-300 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-all hover:scale-110 active:scale-90"><ImageIcon className="w-6 h-6" strokeWidth={2.5} /></button>
                                        <button className="w-12 h-12 rounded-2xl flex items-center justify-center text-gray-300 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-all hover:scale-110 active:scale-90"><Paperclip className="w-6 h-6" strokeWidth={2.5} /></button>
                                        <button className="w-12 h-12 rounded-2xl flex items-center justify-center text-gray-300 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-all hover:scale-110 active:scale-90"><Smile className="w-6 h-6" strokeWidth={2.5} /></button>
                                    </div>
                                    <button
                                        disabled={!newMessage.trim()}
                                        onClick={handleSend}
                                        className="bg-[#1A1A1A] text-[#D4AF37] px-12 py-5 rounded-[1.75rem] font-black text-xs uppercase tracking-[0.4em] disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] flex items-center gap-4 group/send overflow-hidden relative"
                                    >
                                        <div className="absolute inset-0 bg-white/5 -translate-x-full group-hover/send:translate-x-0 transition-transform duration-500" />
                                        <span className="relative z-10">TRANSMIT</span> 
                                        <Send className="w-4 h-4 relative z-10 transition-transform group-hover/send:translate-x-2 group-hover/send:-translate-y-1" strokeWidth={3} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="hidden md:flex flex-col flex-grow items-center justify-center bg-[#FAFAFA] h-full text-center p-32 space-y-12">
                        <div className="relative">
                            <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-full blur-[60px] animate-pulse" />
                            <div className="w-40 h-40 rounded-[3.5rem] bg-white border border-gray-100 shadow-2xl flex items-center justify-center relative overflow-hidden group">
                               <div className="absolute inset-0 bg-[#D4AF37]/5 opacity-0 group-hover/root:opacity-100 transition-opacity" />
                               <Lock className="w-16 h-16 text-gray-100 group-hover:text-[#D4AF37] transition-all duration-1000" strokeWidth={1.5} />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-4xl font-black text-[#1A1A1A] uppercase tracking-tighter italic leading-none">Record Access Required</h3>
                            <p className="text-sm text-gray-400 max-w-sm font-black uppercase tracking-[0.3em] mx-auto leading-loose italic">Select an elite professional signature from the transmission registry to begin high-fidelity studio coordination.</p>
                        </div>
                        <div className="inline-flex items-center gap-4 px-10 py-4 bg-white border border-gray-100 rounded-full text-[10px] font-black text-[#D4AF37] tracking-[0.5em] uppercase shadow-xl opacity-80">
                           <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse shadow-[0_0_10px_rgba(212,175,55,1)]" />
                           Transmission Layer Active
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #F1F1F1;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #D4AF37;
                }
            `}</style>
        </div>
    );
}
