import { Users, Calendar, ArrowRight, Star, Bookmark, Share2, MapPin, Crown, Grid, Sparkles, Filter, ShieldCheck } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

async function getProjectCrews() {
    try {
        const res = await fetch('http://127.0.0.1:3001/projects', { cache: 'no-store' });
        const data = await res.json();

        return data.map((project: any) => ({
            id: project.id,
            title: project.title,
            location: project.location,
            date: new Date(project.weddingDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            tags: project.style ? project.style.split(',') : [],
            crew: project.collaborators.map((c: any) => ({
                name: c.profile.displayName.split(' ')[0],
                role: c.role,
                avatar: `https://i.pravatar.cc/150?u=${c.profile.id}`
            })),
            image: project.photos?.[0]?.url || 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800'
        }));
    } catch (error) {
        console.error("Failed to fetch projects:", error);
        return [];
    }
}

export default async function ProjectsPage() {
    const projects = await getProjectCrews();

    return (
        <div className="min-h-screen bg-[#FAFAFA] pb-32 font-sans text-[#1A1A1A]">
            {/* Elite Hero Section */}
            <header className="bg-white border-b border-gray-100 relative overflow-hidden pt-24 pb-20 px-8">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full -mr-64 -mt-64 blur-[100px] opacity-60" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#1A1A1A]/[0.02] rounded-full -ml-32 -mb-32 blur-[80px]" />
                
                <div className="container mx-auto max-w-7xl relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-12">
                        <div className="space-y-6 max-w-2xl">
                            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-[#1A1A1A] rounded-full border border-white/10 shadow-2xl">
                                <Crown className="w-3.5 h-3.5 text-[#D4AF37]" strokeWidth={2.5} />
                                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#D4AF37]">Privé Registry v4.2</span>
                            </div>
                            <div className="space-y-2">
                                <h1 className="text-6xl font-black uppercase tracking-tighter italic leading-[0.9] text-[#1A1A1A]">Production <br /><span className="text-[#D4AF37] ml-8">Archives</span></h1>
                                <p className="text-xs text-gray-400 font-black uppercase tracking-[0.4em] mt-4 max-w-md leading-relaxed">Systematic curation of India's most high-impact bridal collaborations and aesthetic benchmarks.</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                            <div className="bg-white border border-gray-100 p-2 rounded-[2rem] shadow-xl flex gap-2">
                                <button className="bg-[#1A1A1A] text-white px-8 py-3 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-lg hover:scale-[1.02] active:scale-95 transition-all">All Records</button>
                                <button className="bg-gray-50 text-gray-400 px-8 py-3 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-gray-100 transition-all">Featured Only</button>
                            </div>
                            <button className="bg-[#D4AF37] text-[#1A1A1A] px-10 py-5 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-[0_20px_40px_-10px_rgba(212,175,55,0.3)] active:scale-95 flex items-center gap-3 group">
                                Submit Registry <Sparkles className="w-4 h-4 transition-transform group-hover:rotate-12" />
                            </button>
                        </div>
                    </div>

                    <div className="mt-16 flex flex-wrap gap-12 border-t border-gray-50 pt-10">
                        <div className="flex flex-col gap-1">
                            <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Total Indexed</span>
                            <span className="text-xl font-black text-[#1A1A1A]">{projects.length < 10 ? `0${projects.length}` : projects.length} Masterpieces</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Status</span>
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-xl font-black text-[#1A1A1A]">Live Feed</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Archive Type</span>
                            <span className="text-xl font-black text-[#1A1A1A]">Ultra High-Fidelity</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 max-w-7xl -mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {projects.map((project: any) => (
                        <div key={project.id} className="bg-white rounded-[3.5rem] border border-gray-100 overflow-hidden flex flex-col group hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] transition-all duration-700 relative">
                            {/* Cinematic Cover */}
                            <div className="aspect-[10/11] relative overflow-hidden bg-gray-50">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-[#1A1A1A]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                                
                                <div className="absolute top-8 right-8">
                                    <button className="w-14 h-14 bg-white/10 hover:bg-white text-white hover:text-[#1A1A1A] rounded-[1.5rem] shadow-2xl backdrop-blur-2xl border border-white/20 flex items-center justify-center transition-all duration-500 group/btn">
                                        <Bookmark className="w-5 h-5 group-hover/btn:fill-current" />
                                    </button>
                                </div>

                                <div className="absolute bottom-8 left-8 right-8 flex flex-col gap-4">
                                     <div className="flex items-center gap-3">
                                        <div className="px-5 py-2 bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[10px] font-black rounded-full uppercase tracking-[0.3em] flex items-center gap-3 shadow-2xl">
                                            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" strokeWidth={3} />
                                            {project.location}
                                        </div>
                                        <div className="px-5 py-2 bg-emerald-500/20 backdrop-blur-xl border border-emerald-500/30 text-emerald-400 text-[10px] font-black rounded-full uppercase tracking-[0.3em] flex items-center gap-2 shadow-2xl">
                                            <ShieldCheck className="w-3.5 h-3.5" />
                                            Verified
                                        </div>
                                    </div>
                                    <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-[0.95] drop-shadow-2xl">{project.title}</h2>
                                </div>
                            </div>

                            {/* Metadata & Crew */}
                            <div className="p-10 flex-grow flex flex-col bg-white">
                                <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-50">
                                    <div className="flex items-center gap-2 text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.4em]">
                                        <Star className="w-3.5 h-3.5 fill-[#D4AF37]" /> Heritage Grade
                                    </div>
                                    <span className="text-[10px] text-gray-300 font-black uppercase tracking-widest">{project.date}</span>
                                </div>
                                
                                <div className="space-y-6 mb-10">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Production Crew:</span>
                                        <span className="text-[9px] font-black text-[#1A1A1A]/40 uppercase tracking-widest italic">{project.crew.length} ARTISTS</span>
                                    </div>
                                    <div className="flex items-center justify-between bg-gray-50/50 p-6 rounded-[2rem] border border-gray-100/50 group-hover:bg-white group-hover:border-[#D4AF37]/20 transition-all duration-500">
                                        <div className="flex -space-x-4">
                                            {project.crew.slice(0, 4).map((member: any) => (
                                                <div key={member.name} className="relative group/member">
                                                    <div className="w-12 h-12 rounded-2xl border-4 border-white shadow-2xl overflow-hidden bg-gray-100 group-hover/member:scale-125 group-hover/member:z-30 group-hover/member:-translate-y-2 transition-all duration-500">
                                                        <img
                                                            src={member.avatar}
                                                            alt={member.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                            {project.crew.length > 4 && (
                                                <div className="w-12 h-12 rounded-2xl bg-white border-4 border-gray-50 flex items-center justify-center text-[10px] font-black text-gray-300 shadow-xl">
                                                    +{project.crew.length - 4}
                                                </div>
                                            )}
                                        </div>
                                        <button className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center hover:bg-[#1A1A1A] hover:text-[#D4AF37] transition-all shadow-md">
                                            <Users className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-auto flex items-center justify-between pt-8 border-t border-gray-50">
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.slice(0, 2).map((t: string) => (
                                            <span key={t} className="text-[10px] font-black text-[#1A1A1A] bg-gray-50 px-4 py-2 rounded-xl uppercase tracking-[0.2em] group-hover:bg-[#D4AF37]/10 transition-colors">#{t.trim().toUpperCase()}</span>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#1A1A1A] hover:text-[#D4AF37] transition-all group-hover:bg-white group-hover:border-[#D4AF37]/50 group-hover:text-[#D4AF37] group-hover:border">
                                            <Share2 className="w-5 h-5" />
                                        </button>
                                        <button className="w-12 h-12 rounded-2xl bg-[#1A1A1A] flex items-center justify-center text-[#D4AF37] hover:scale-110 transition-all shadow-2xl active:scale-90 group/arrow">
                                            <ArrowRight className="w-5 h-5 transition-transform group-hover/arrow:translate-x-1" strokeWidth={3} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Hover Badge */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-50">
                                <div className="w-32 h-32 bg-white/20 backdrop-blur-3xl rounded-full border border-white/30 flex items-center justify-center animate-spin-slow">
                                     <Grid className="w-8 h-8 text-white" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Action */}
                <div className="mt-32 text-center relative">
                    <div className="absolute inset-x-0 top-1/2 h-px bg-gray-100 -z-10" />
                    <button className="bg-white border border-gray-200 text-[#1A1A1A] px-16 py-6 rounded-[2.5rem] font-black text-[11px] uppercase tracking-[0.5em] hover:bg-[#1A1A1A] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all duration-500 shadow-2xl flex items-center gap-6 mx-auto group">
                        Unlock Advanced Archives <Grid className="w-5 h-5 text-gray-300 group-hover:text-[#D4AF37] group-hover:rotate-90 transition-all duration-700" />
                    </button>
                </div>
            </main>

            <style jsx>{`
                @keyframes spin-slow {
                    from { transform: translate(-50%, -50%) rotate(0deg); }
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 10s linear infinite;
                }
            `}</style>
        </div>
    );
}
