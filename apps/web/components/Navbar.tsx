"use client";
import Link from "next/link";
import {
    Home,
    Users,
    Briefcase,
    MessageSquare,
    Bell,
    User,
    Grid,
    Search,
    Camera,
    Star,
    Crown,
    Settings,
    LayoutDashboard
} from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    const navItems = [
        { label: "Home", icon: Home, href: "/" },
        { label: "Artists", icon: Users, href: "/artists" },
        { label: "Bookings", icon: Briefcase, href: "/projects" },
        { label: "Inquiries", icon: MessageSquare, href: "/messaging" },
        { label: "Activity", icon: Bell, href: "/notifications" },
    ];

    return (
        <nav className="bg-[#1A1A1A] border-b border-white/5 sticky top-0 z-50 h-[90px] flex items-center shadow-2xl shadow-black/20 font-sans">
            <div className="container mx-auto px-10 flex items-center justify-between gap-12 max-w-[1600px]">
                {/* Logo Section */}
                <div className="flex items-center gap-10">
                    <Link href="/" className="flex items-center gap-4 group">
                        <div className="bg-[#D4AF37] p-2.5 rounded-2xl group-hover:rotate-12 transition-all duration-500 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                            <Crown className="text-[#1A1A1A] fill-[#1A1A1A] w-6 h-6" strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black text-xs uppercase tracking-[0.4em] text-[#D4AF37] leading-none mb-1">Elite</span>
                            <span className="font-black text-lg uppercase tracking-tighter text-white italic leading-none whitespace-nowrap">Bridal Connect</span>
                        </div>
                    </Link>

                    {/* Search Protocol */}
                    <div className="relative hidden lg:block w-[400px] group">
                        <div className="absolute inset-0 bg-white/5 rounded-2xl blur-xl group-focus-within:bg-[#D4AF37]/10 transition-all" />
                        <div className="relative flex items-center">
                            <Search className="absolute left-5 w-4 h-4 text-[#D4AF37]" strokeWidth={3} />
                            <input
                                placeholder="Universal Discovery Protocol..."
                                className="bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-8 text-xs w-full font-black text-white placeholder:text-white/20 focus:bg-white focus:text-[#1A1A1A] focus:placeholder:text-gray-400 focus:border-[#D4AF37] focus:ring-0 transition-all outline-none uppercase tracking-widest"
                            />
                        </div>
                    </div>
                </div>

                {/* Navigation Items */}
                <div className="flex items-center gap-2 h-full">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`flex flex-col items-center justify-center min-w-[100px] h-[90px] group transition-all relative ${isActive ? "text-[#D4AF37]" : "text-white/40 hover:text-white"
                                    }`}
                            >
                                <div className="relative mb-2">
                                    <item.icon className={`w-6 h-6 transition-all duration-500 ${isActive ? "scale-110 drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]" : "group-hover:scale-110 group-hover:text-white"}`} strokeWidth={isActive ? 2.5 : 2} />
                                    {item.label === "Inquiries" && (
                                        <span className="absolute -top-2 -right-3 bg-[#D4AF37] text-[#1A1A1A] text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#1A1A1A] shadow-lg animate-bounce">2</span>
                                    )}
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] hidden xl:block transition-all group-hover:tracking-[0.3em]">{item.label}</span>
                                
                                {/* Active Indicator */}
                                {isActive && (
                                    <div className="absolute bottom-0 inset-x-4 h-1 bg-[#D4AF37] rounded-t-full shadow-[0_0_15px_rgba(212,175,55,1)]" />
                                )}
                            </Link>
                        );
                    })}

                    <div className="w-[1px] h-10 bg-white/10 mx-6 hidden md:block" />

                    {/* Studio Access */}
                    <Link
                        href="/dashboard"
                        className="flex flex-col items-center justify-center min-w-[80px] h-[90px] group transition-all"
                    >
                        <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/5 transition-all overflow-hidden relative shadow-inner">
                            <LayoutDashboard className={`w-5 h-5 transition-all duration-500 ${pathname === '/dashboard' ? "text-[#D4AF37]" : "text-white/40 group-hover:text-white"}`} strokeWidth={2} />
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] mt-2 hidden xl:block ${pathname === '/dashboard' ? "text-[#D4AF37]" : "text-white/30 group-hover:text-white"}`}>Studio</span>
                    </Link>

                    {/* Partner Action */}
                    <button className="hidden sm:flex items-center justify-center bg-[#D4AF37] text-[#1A1A1A] px-8 py-3.5 rounded-2xl ml-8 hover:scale-105 active:scale-95 transition-all shadow-[0_15px_30px_-10px_rgba(212,175,55,0.4)] group overflow-hidden relative">
                        <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                        <span className="text-xs font-black uppercase tracking-[0.3em] relative z-10 italic">Privé Partner</span>
                    </button>
                </div>
            </div>
        </nav>
    );
}
