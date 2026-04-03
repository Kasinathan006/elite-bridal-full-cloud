"use client";

import { useState } from "react";
import { 
    Camera, 
    MapPin, 
    User, 
    CheckCircle2, 
    ChevronRight, 
    Briefcase, 
    Crown, 
    Shield, 
    Sparkles, 
    Lock,
    Zap,
    History,
    ShieldCheck,
    Command,
    Terminal,
    ArrowUpRight,
    Search,
    Globe
} from "lucide-react";
import Link from "next/link";

export default function JoinPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        displayName: "",
        city: "",
        specialization: "Luxury Makeup Artistry",
        yearsExperience: "1-3 years"
    });

    const nextStep = () => setStep(step + 1);

    return (
        <div className="min-h-screen bg-[#FAFAFA] py-32 px-6 font-sans text-[#1A1A1A] overflow-hidden selection:bg-[#D4AF37] selection:text-[#1A1A1A]">
            <div className="container mx-auto max-w-4xl relative">
                {/* Background Decorations */}
                <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-[#D4AF37]/20 rounded-tl-3xl pointer-events-none" />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-[#D4AF37]/20 rounded-br-3xl pointer-events-none" />
                
                <div className="bg-white rounded-[5rem] p-16 md:p-24 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] border border-gray-100 relative overflow-hidden group border-b-[16px] border-b-[#1A1A1A]">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/[0.03] rounded-bl-full -mr-32 -mt-32 blur-[100px] pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
                    
                    {/* Progress Indication Protocol */}
                    <div className="flex gap-6 mb-24 relative z-10">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className="flex-1 space-y-4">
                                <div className="relative">
                                    <div
                                        className={`h-2 w-full rounded-full transition-all duration-1000 ${s <= step ? 'bg-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.5)]' : 'bg-gray-100'}`}
                                    />
                                    {s === step && (
                                        <div className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full animate-ping" />
                                    )}
                                </div>
                                <div className="flex justify-between items-center px-2">
                                    <div className="flex flex-col gap-1">
                                        <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${s <= step ? 'text-[#1A1A1A]' : 'text-gray-300'}`}>Node 0{s}</span>
                                        <span className={`text-[8px] font-black uppercase tracking-widest ${s <= step ? 'text-[#D4AF37]' : 'text-gray-200'}`}>{s === 1 ? 'Identity' : s === 2 ? 'Discipline' : 'Validation'}</span>
                                    </div>
                                    {s < step && (
                                        <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center border border-emerald-100">
                                            <ShieldCheck className="w-5 h-5 text-emerald-500" strokeWidth={3} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mb-20 text-center relative z-10">
                        <div className="inline-flex items-center gap-4 px-6 py-2 bg-[#1A1A1A] rounded-2xl mb-8 shadow-2xl transform hover:scale-105 transition-transform cursor-default">
                            <Crown className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" strokeWidth={2} />
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D4AF37] italic">Elite Enrollment Protocol V4.1</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-[0.8] mb-8">Elite Entry</h1>
                        <div className="flex flex-col items-center gap-4">
                             <p className="text-sm text-gray-400 font-bold uppercase tracking-[0.4em] italic max-w-md mx-auto">PHASE {step}: ESTABLISHING PROFESSIONAL DATA ANCHOR</p>
                             <div className="w-16 h-1 bg-[#D4AF37] rounded-full opacity-20" />
                        </div>
                    </div>

                    {step === 1 && (
                        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 relative z-10 max-w-2xl mx-auto">
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 ml-8">
                                     <div className="w-1.5 h-4 bg-[#D4AF37] rounded-full" />
                                     <label className="block text-[11px] font-black text-[#1A1A1A] uppercase tracking-[0.4em] italic">Professional Signature</label>
                                </div>
                                <div className="relative group/input shadow-2xl rounded-[2.5rem]">
                                    <div className="absolute left-8 top-1/2 -track-y-1/2 -translate-y-1/2">
                                        <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center border border-transparent group-focus-within/input:bg-[#1A1A1A] group-focus-within/input:border-[#D4AF37]/30 transition-all duration-500">
                                            <User className="text-gray-300 group-focus-within/input:text-[#D4AF37] w-6 h-6 transition-colors" strokeWidth={3} />
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="LEGAL BRAND SIGNATURE"
                                        className="w-full pl-28 pr-12 py-9 rounded-[2.5rem] bg-[#FAFAFA] border-2 border-transparent outline-none focus:bg-white focus:border-[#D4AF37]/20 focus:ring-[20px] focus:ring-[#D4AF37]/5 transition-all text-xl font-black uppercase tracking-tighter placeholder:text-gray-200"
                                    />
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 ml-8">
                                     <div className="w-1.5 h-4 bg-[#D4AF37] rounded-full" />
                                     <label className="block text-[11px] font-black text-[#1A1A1A] uppercase tracking-[0.4em] italic">Grid Coordinate (City)</label>
                                </div>
                                <div className="relative group/input shadow-2xl rounded-[2.5rem]">
                                    <div className="absolute left-8 top-1/2 -track-y-1/2 -translate-y-1/2">
                                        <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center border border-transparent group-focus-within/input:bg-[#1A1A1A] group-focus-within/input:border-[#D4AF37]/30 transition-all duration-500">
                                            <Globe className="text-gray-300 group-focus-within/input:text-[#D4AF37] w-6 h-6 transition-colors" strokeWidth={3} />
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="OPERATIONAL HUB LOCATION"
                                        className="w-full pl-28 pr-12 py-9 rounded-[2.5rem] bg-[#FAFAFA] border-2 border-transparent outline-none focus:bg-white focus:border-[#D4AF37]/20 focus:ring-[20px] focus:ring-[#D4AF37]/5 transition-all text-xl font-black uppercase tracking-tighter placeholder:text-gray-200"
                                    />
                                </div>
                            </div>
                            <div className="pt-10">
                                <button
                                    onClick={nextStep}
                                    className="w-full bg-[#1A1A1A] text-[#D4AF37] py-10 rounded-[3rem] font-black text-[13px] uppercase tracking-[0.6em] hover:scale-[1.03] active:scale-95 transition-all duration-500 flex items-center justify-center gap-6 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] group overflow-hidden relative"
                                >
                                    <div className="absolute inset-0 bg-white/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 pointer-events-none" />
                                    <span className="relative z-10 italic">Transmit Protocol Data</span>
                                    <ChevronRight className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform" strokeWidth={4} />
                                </button>
                                <div className="mt-8 flex items-center justify-center gap-3">
                                     <Lock className="w-3.5 h-3.5 text-gray-200" />
                                     <span className="text-[9px] text-gray-300 font-black uppercase tracking-[0.3em]">Encrypted Handshake Required</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-12 animate-in fade-in slide-in-from-right-12 duration-1000 relative z-10 max-w-2xl mx-auto">
                            <div className="space-y-8">
                                <div className="flex flex-col items-center gap-3 mb-4">
                                     <label className="block text-[12px] font-black text-[#1A1A1A] uppercase tracking-[0.5em] italic">Select Signature Mastery</label>
                                     <div className="w-12 h-1 bg-[#D4AF37] rounded-full" />
                                </div>
                                <div className="grid grid-cols-1 gap-5">
                                    {['Luxury Makeup Artistry', 'High-Fashion Photography', 'Heritage Draping Master', 'Couture Hair Styling'].map((role) => (
                                        <button
                                            key={role}
                                            onClick={() => setFormData({...formData, specialization: role})}
                                            className={`group p-10 rounded-[3.5rem] border-4 transition-all duration-700 text-left flex items-center justify-between relative overflow-hidden shadow-2xl ${formData.specialization === role ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-gray-50 hover:border-gray-100 bg-white/50'}`}
                                        >
                                            <div className="relative z-10 pl-4">
                                                <div className={`text-2xl font-black uppercase tracking-tighter italic transition-all duration-700 ${formData.specialization === role ? 'text-[#1A1A1A] scale-110 origin-left' : 'text-gray-300 group-hover:text-gray-400'}`}>{role}</div>
                                                <div className="flex items-center gap-3 mt-4">
                                                    <div className={`w-2 h-2 rounded-full transform transition-all duration-700 ${formData.specialization === role ? 'bg-[#D4AF37] scale-125' : 'bg-gray-100'}`} />
                                                    <span className={`text-[10px] font-black uppercase tracking-[0.25em] transition-colors duration-700 ${formData.specialization === role ? 'text-[#D4AF37]' : 'text-gray-300'}`}>Institutional Authority</span>
                                                </div>
                                            </div>
                                            <div className="relative">
                                                 <div className={`absolute inset-0 bg-[#D4AF37]/20 rounded-2.5xl blur-xl opacity-0 transition-opacity duration-700 ${formData.specialization === role ? 'opacity-100' : ''}`} />
                                                 <div className={`w-16 h-16 rounded-[1.75rem] flex items-center justify-center transition-all duration-700 border-2 relative z-10 ${formData.specialization === role ? 'bg-[#1A1A1A] text-[#D4AF37] border-white/10 shadow-2xl scale-110 rotate-0' : 'bg-gray-50 text-gray-200 border-transparent rotate-12 group-hover:rotate-0 group-hover:text-gray-400'}`}>
                                                     <Briefcase className="w-8 h-8" strokeWidth={2.5} />
                                                 </div>
                                            </div>
                                            {formData.specialization === role && (
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full -mr-16 -mt-16 blur-3xl" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="pt-10">
                                <button
                                    onClick={nextStep}
                                    className="w-full bg-[#1A1A1A] text-[#D4AF37] py-10 rounded-[3rem] font-black text-[13px] uppercase tracking-[0.6em] hover:scale-[1.03] active:scale-95 transition-all shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] group overflow-hidden relative"
                                >
                                    <div className="absolute inset-0 bg-white/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                                    <span className="relative z-10 italic uppercase">Seal Professional Domain</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="text-center py-20 animate-in zoom-in duration-1000 relative z-10">
                            <div className="relative inline-block mb-20">
                                <div className="absolute inset-0 bg-[#D4AF37]/30 rounded-full blur-[80px] animate-pulse" />
                                <div className="bg-[#1A1A1A] w-48 h-48 rounded-[5rem] flex items-center justify-center relative border-[12px] border-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] transform -rotate-12 hover:rotate-0 transition-transform duration-1000 group/check">
                                    <CheckCircle2 className="text-[#D4AF37] w-24 h-24 drop-shadow-[0_0_20px_rgba(212,175,55,0.6)]" strokeWidth={3} />
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent)] opacity-0 group-hover/check:opacity-100 transition-opacity" />
                                </div>
                                <div className="absolute -top-6 -right-6 w-20 h-20 bg-white rounded-[2rem] shadow-2xl flex items-center justify-center transform rotate-12 border border-gray-100 group-hover:rotate-0 transition-all duration-700">
                                    <ShieldCheck className="w-10 h-10 text-emerald-500" strokeWidth={3} />
                                </div>
                                <Sparkles className="absolute -bottom-10 -left-10 w-16 h-16 text-[#D4AF37]/20 animate-spin-slow" />
                            </div>
                            
                            <h2 className="text-6xl md:text-8xl font-black text-[#1A1A1A] mb-8 tracking-tighter uppercase italic leading-[0.8] drop-shadow-sm">Archive Sealed</h2>
                            <p className="text-xl text-gray-400 font-bold uppercase tracking-[0.3em] mb-24 max-w-xl mx-auto leading-relaxed italic border-x-2 border-gray-50 px-12">
                                Your professional signature has been transmitted to the inheritance board. Audit Protocol Active.
                            </p>

                            <div className="grid grid-cols-1 gap-6 max-w-md mx-auto">
                                <Link href="/dashboard" className="w-full bg-[#1A1A1A] text-[#D4AF37] py-10 rounded-[3rem] font-black text-[13px] uppercase tracking-[0.6em] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] hover:scale-110 active:scale-95 transition-all flex items-center justify-center gap-6 group/final overflow-hidden relative">
                                    <div className="absolute inset-0 bg-white/5 translate-x-full group-hover/final:translate-x-0 transition-transform duration-700" />
                                    <span className="relative z-10 italic">Access Studio</span>
                                    <Sparkles className="w-6 h-6 relative z-10 group-hover:rotate-12 group-hover:scale-125 transition-all text-[#D4AF37]" strokeWidth={2.5} />
                                </Link>
                                <div className="flex items-center justify-center gap-4 px-10 py-5 bg-[#FAFAFA] rounded-3xl border border-gray-100 shadow-inner mt-12 group/status cursor-default">
                                    <div className="relative">
                                         <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                         <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-20" />
                                    </div>
                                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-[0.4em] group-hover/status:text-emerald-600 transition-colors italic">Encryption Active: AES-256 Verified</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-20 text-center space-y-10 relative z-10">
                    <div className="flex flex-col items-center gap-4">
                         <div className="w-24 h-[1px] bg-gray-200" />
                         <p className="text-[11px] text-gray-300 font-black uppercase tracking-[0.6em] italic">Bridal Connect Official Registry • EST. 2026</p>
                    </div>
                    <div className="flex justify-center gap-12 text-[10px] text-gray-400 font-black uppercase tracking-[0.5em] italic">
                        <button className="hover:text-[#D4AF37] transition-all border-b-2 border-transparent hover:border-[#D4AF37]/20 pb-1">Safety</button>
                        <button className="hover:text-[#D4AF37] transition-all border-b-2 border-transparent hover:border-[#D4AF37]/20 pb-1">Privacy</button>
                        <button className="hover:text-[#D4AF37] transition-all border-b-2 border-transparent hover:border-[#D4AF37]/20 pb-1">Protocols</button>
                    </div>
                </div>
            </div>
            
            <style jsx>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 12s linear infinite;
                }
            `}</style>
        </div>
    );
}
