"use client";
import {
  Image as ImageIcon,
  Video,
  Calendar,
  Layout,
  ThumbsUp,
  MessageSquare,
  Share2,
  Send,
  MoreHorizontal,
  Plus,
  CheckCircle2,
  MapPin,
  Users,
  Heart,
  MoreVertical,
  Bookmark,
  Shield,
  Star,
  Crown,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Award,
  Zap,
  Lock,
  Flame,
  Globe,
  Bell
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

function PostCard({ post, handleLike, handleComment }: any) {
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="bg-white rounded-[3.5rem] border border-gray-100 overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] transition-all duration-700 group animate-in fade-in slide-in-from-bottom-8 relative">
      <div className="p-10 flex justify-between items-start relative z-10">
        <div className="flex gap-8">
          <div className="w-20 h-20 rounded-[2rem] overflow-hidden bg-gray-50 border-4 border-white shadow-2xl flex-shrink-0 relative group-hover:scale-105 transition-transform duration-700">
            <img src={post.author?.portfolioPhotos?.[0]?.url || `https://i.pravatar.cc/150?u=${post.author?.id}`} className="w-full h-full object-cover" alt="Author" />
            <div className="absolute inset-0 bg-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="space-y-2 pt-1">
            <div className="flex items-center gap-4">
              <Link href={`/${post.author?.username || post.author?.id}`} className="text-2xl font-black text-[#1A1A1A] uppercase tracking-tighter italic leading-none hover:text-[#D4AF37] transition-all duration-500">
                {post.author?.displayName}
              </Link>
              <Crown className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" strokeWidth={2.5} />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 group/loc cursor-pointer">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] group-hover/loc:scale-110 transition-transform" strokeWidth={3} />
                <span className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em]">{post.author?.city || 'Elite Node'}</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-gray-300 font-black uppercase tracking-widest">{new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
        <button className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center hover:bg-[#1A1A1A] hover:text-[#D4AF37] transition-all group/more">
          <MoreHorizontal className="w-6 h-6 text-gray-300 group-hover/more:text-[#D4AF37] transition-all" />
        </button>
      </div>

      <div className="px-12 pb-10 relative z-10">
        <div className="relative">
          <p className="text-2xl text-[#1A1A1A] font-black leading-[1.3] italic pr-20 uppercase tracking-tighter group-hover:text-[#D4AF37] transition-colors duration-700">
            "{post.content}"
          </p>
          <Sparkles className="absolute -right-4 -top-4 w-16 h-16 text-[#D4AF37]/5 group-hover:text-[#D4AF37]/10 transition-colors" />
        </div>
      </div>

      <div className="px-12 py-6 border-t border-gray-50 flex items-center justify-between bg-[#FAFAFA]/50 relative z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
        <div className="flex items-center gap-8">
            <div className="flex -space-x-4">
              <div className="w-10 h-10 rounded-2xl bg-[#1A1A1A] flex items-center justify-center border-4 border-white shadow-2xl z-30 transform hover:scale-110 transition-transform"><Star className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" strokeWidth={2.5} /></div>
              <div className="w-10 h-10 rounded-2xl bg-[#D4AF37] flex items-center justify-center border-4 border-white shadow-2xl z-20 transform hover:scale-110 transition-transform"><Heart className="w-5 h-5 text-white fill-white" /></div>
              <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center border-4 border-gray-50 shadow-2xl z-10 text-[11px] font-black text-gray-300 px-2 italic">+42</div>
            </div>
            <div className="flex flex-col">
                <span className="text-sm font-black text-[#1A1A1A] italic tracking-tight">{post._count?.reactions || 0} Professional Admirations</span>
                <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest leading-none mt-1">Heritage Validated Metrics</span>
            </div>
        </div>
        <div className="hidden sm:flex items-center gap-3 px-5 py-2 bg-white rounded-full border border-gray-100 shadow-sm">
             <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
             <span className="text-[9px] font-black text-[#1A1A1A] uppercase tracking-[0.4em]">Audit Passing</span>
        </div>
      </div>

      <div className="p-4 flex gap-4 bg-white relative z-10">
        <button
          onClick={() => handleLike(post.id)}
          className="flex-1 py-6 flex flex-col items-center justify-center gap-2 text-[#1A1A1A] hover:bg-[#FAFAFA] rounded-3xl transition-all group/admire active:scale-95 border border-transparent hover:border-gray-100"
        >
          <Heart className="w-6 h-6 group-hover/admire:scale-125 group-hover/admire:text-red-500 group-hover/admire:fill-red-500 transition-all duration-500" strokeWidth={2.5} />
          <span className="text-[9px] font-black uppercase tracking-[0.4em] opacity-40 group-hover/admire:opacity-100 transition-opacity italic">Admire Work</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex-1 py-6 flex flex-col items-center justify-center gap-2 text-[#1A1A1A] hover:bg-[#FAFAFA] rounded-3xl transition-all group/discuss active:scale-95 border border-transparent hover:border-gray-100"
        >
          <MessageSquare className="w-6 h-6 group-hover/discuss:scale-125 group-hover/discuss:text-[#D4AF37] transition-all duration-500" strokeWidth={2.5} />
          <span className="text-[9px] font-black uppercase tracking-[0.4em] opacity-40 group-hover/discuss:opacity-100 transition-opacity italic">Initiate Intel</span>
        </button>
        <button className="hidden md:flex flex-1 py-6 flex-col items-center justify-center gap-2 text-[#1A1A1A] hover:bg-[#FAFAFA] rounded-3xl transition-all group/broadcast active:scale-95 border border-transparent hover:border-gray-100">
          <Share2 className="w-6 h-6 group-hover/broadcast:scale-125 group-hover/broadcast:text-[#1A1A1A] transition-all duration-500" strokeWidth={2.5} />
          <span className="text-[9px] font-black uppercase tracking-[0.4em] opacity-40 group-hover/broadcast:opacity-100 transition-opacity italic">Archive Sync</span>
        </button>
      </div>

      {showComments && (
        <div className="px-12 py-12 bg-[#FAFAFA]/80 border-t border-gray-100 space-y-10 relative">
          <div className="flex gap-8 relative z-10">
            <div className="w-14 h-14 rounded-2xl overflow-hidden bg-white border-4 border-white shadow-2xl flex-shrink-0">
              <img src="https://images.unsplash.com/photo-1594744803329-a35971481358?q=80&w=200&h=200&auto=format&fit=crop" className="w-full h-full object-cover" alt="Me" />
            </div>
            <div className="flex-grow relative">
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Synchronize a professional perspective..."
                className="w-full pl-8 pr-20 py-6 bg-white border-2 border-transparent rounded-[2rem] text-sm font-black text-[#1A1A1A] placeholder:text-gray-300 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] focus:border-[#D4AF37]/20 focus:ring-[15px] focus:ring-[#D4AF37]/5 outline-none transition-all uppercase tracking-tight"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleComment(post.id, commentText);
                    setCommentText("");
                  }
                }}
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#1A1A1A] text-[#D4AF37] rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl"><Send className="w-5 h-5" strokeWidth={3} /></button>
            </div>
          </div>

          <div className="space-y-10 pl-6 border-l-2 border-[#D4AF37]/20 relative z-10">
            {post.comments?.map((c: any) => (
              <div key={c.id} className="flex gap-8 group/c animate-in fade-in slide-in-from-left-4">
                <div className="w-12 h-12 rounded-2xl overflow-hidden bg-white flex-shrink-0 shadow-2xl border-2 border-white group-hover/c:scale-110 transition-transform duration-500">
                  <img src={`https://i.pravatar.cc/150?u=${c.authorId}`} className="w-full h-full object-cover" alt="C" />
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] rounded-tl-none shadow-2xl shadow-black/[0.01] flex-grow border border-gray-50 group-hover/c:border-[#D4AF37]/30 transition-all duration-700">
                  <div className="flex justify-between items-baseline mb-3">
                    <div className="flex items-center gap-4">
                        <h4 className="text-[13px] font-black text-[#1A1A1A] uppercase tracking-tight italic">{c.author?.displayName || 'Elite Peer'}</h4>
                        <div className="px-3 py-0.5 bg-[#D4AF37]/10 rounded-full text-[8px] font-black text-[#D4AF37] uppercase tracking-widest">Validated</div>
                    </div>
                    <span className="text-[9px] text-gray-300 font-black uppercase tracking-widest">{new Date(c.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-[15px] text-[#1A1A1A]/70 leading-relaxed font-bold italic">"{c.content}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function FeedPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [postText, setPostText] = useState("");

  useEffect(() => {
    const initFeed = async () => {
      try {
        const [postsRes, userRes] = await Promise.all([
          fetch('http://127.0.0.1:3001/posts'),
          fetch('http://127.0.0.1:3001/auth/demo-user')
        ]);
        setPosts(await postsRes.json());
        setUser(await userRes.json());
      } catch (error) {
        console.error("Failed to init feed:", error);
      } finally {
        setLoading(false);
      }
    };
    initFeed();
  }, []);

  const handlePost = async () => {
    if (!postText.trim() || !user) return;
    try {
      const res = await fetch('http://127.0.0.1:3001/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authorId: user.profile?.id || user.id,
          content: postText
        })
      });
      const newPost = await res.json();
      setPosts([newPost, ...posts]);
      setPostText("");
    } catch (e) {
      console.error(e);
    }
  };

  const handleLike = async (postId: string) => {
    const authorId = user?.profile?.id || user?.id;
    if (!authorId) return;
    try {
      await fetch(`http://127.0.0.1:3001/posts/${postId}/react`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authorId, type: 'LIKE' })
      });
      const res = await fetch('http://127.0.0.1:3001/posts');
      setPosts(await res.json());
    } catch (e) { console.error(e); }
  };

  const handleComment = async (postId: string, text: string) => {
    const authorId = user?.profile?.id || user?.id;
    if (!authorId || !text.trim()) return;
    try {
      await fetch(`http://127.0.0.1:3001/posts/${postId}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authorId, text })
      });
      const res = await fetch('http://127.0.0.1:3001/posts');
      setPosts(await res.json());
    } catch (e) { console.error(e); }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-24 pb-32 font-sans text-[#1A1A1A] overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left Sidebar - Elite Credentialing */}
          <div className="hidden lg:block lg:col-span-3 space-y-10">
            <div className="bg-white rounded-[4rem] border border-gray-100 overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.03)] relative group border-b-8 border-b-[#1A1A1A]">
              <div className="h-44 bg-[#1A1A1A] relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.2),transparent)] animate-pulse shadow-inner" />
                <div className="absolute inset-0 bg-white/5 opacity-10" style={{ backgroundImage: 'radial-gradient(#FAFAFA 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                <h3 className="text-white font-black italic tracking-[0.6em] text-xs relative z-10 opacity-30 group-hover:opacity-100 transition-opacity duration-1000 uppercase">Archive Authorized</h3>
              </div>
              <div className="px-12 pb-12 -mt-20 text-center border-b border-gray-50 relative z-20">
                <div className="relative inline-block mb-8">
                    <div className="absolute inset-0 bg-[#D4AF37] rounded-full blur-[40px] opacity-20 animate-pulse scale-75" />
                    <div className="w-40 h-40 rounded-[3.5rem] border-[12px] border-white bg-gray-50 overflow-hidden mx-auto shadow-2xl relative group-hover:scale-105 transition-all duration-1000">
                        <img src="https://images.unsplash.com/photo-1594744803329-a35971481358?q=80&w=400&h=400&auto=format&fit=crop" alt="Profile" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </div>
                <h2 className="font-black text-[#1A1A1A] text-3xl tracking-tighter uppercase italic leading-none mb-4 group-hover:text-[#D4AF37] transition-colors duration-700">{user?.displayName || "Elite Authority"}</h2>
                <div className="flex items-center justify-center gap-3">
                    <Crown className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" strokeWidth={2.5} />
                    <p className="text-[11px] text-gray-400 font-black uppercase tracking-[0.4em] italic shadow-sm">Platinum Archive Status</p>
                </div>
              </div>
              <div className="p-10 bg-white space-y-8 relative z-10">
                <div className="flex justify-between items-center group/item cursor-pointer hover:bg-[#FAFAFA] p-6 rounded-[2.5rem] transition-all border border-transparent hover:border-gray-50">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-gray-300 font-black uppercase tracking-widest leading-none mb-1">Global Peer Reach</span>
                    <span className="text-sm font-black text-[#1A1A1A] uppercase tracking-tight italic">Network Nodes</span>
                  </div>
                  <div className="flex items-end flex-col">
                      <span className="text-3xl font-black text-[#1A1A1A] italic tracking-tighter leading-none">4,284</span>
                      <div className="w-8 h-1 bg-[#D4AF37] mt-2 rounded-full transform scale-x-50 group-hover/item:scale-x-100 transition-transform origin-right" />
                  </div>
                </div>
                <div className="flex justify-between items-center group/item cursor-pointer hover:bg-[#FAFAFA] p-6 rounded-[2.5rem] transition-all border border-transparent hover:border-gray-50">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-gray-300 font-black uppercase tracking-widest leading-none mb-1">Legacy Validations</span>
                    <span className="text-sm font-black text-[#1A1A1A] uppercase tracking-tight italic">Backlink Protocol</span>
                  </div>
                  <div className="flex items-end flex-col">
                      <span className="text-3xl font-black text-[#1A1A1A] italic tracking-tighter leading-none">1,284</span>
                      <div className="w-8 h-1 bg-[#D4AF37] mt-2 rounded-full transform scale-x-50 group-hover/item:scale-x-100 transition-transform origin-right" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[3.5rem] border border-gray-100 p-12 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.03)] sticky top-28 group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
              <div className="flex items-center gap-4 mb-12">
                <div className="w-1.5 h-8 bg-[#D4AF37] rounded-full scale-y-75 group-hover:scale-y-100 transition-transform" />
                <p className="text-[12px] font-black text-[#1A1A1A] uppercase tracking-[0.4em] italic leading-none">Command Hub</p>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Studio Vault", icon: Bookmark, sub: 'Isolated Records' },
                  { label: "Elite Circles", icon: Users, sub: 'Authorized Peers' },
                  { label: "Production Log", icon: Calendar, sub: 'Registry History' },
                  { label: "Trust Reports", icon: Shield, sub: 'Audit Protocols' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-2xl hover:bg-[#FAFAFA] group/nav cursor-pointer transition-all border border-transparent hover:border-gray-100">
                    <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-[1.25rem] bg-gray-50 group-hover/nav:bg-[#1A1A1A] flex items-center justify-center transition-all shadow-sm border border-transparent group-hover/nav:border-white/10 group-hover/nav:scale-105">
                            <item.icon className="w-6 h-6 text-gray-300 group-hover/nav:text-[#D4AF37] transition-all" strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[14px] font-black text-gray-500 group-hover/nav:text-[#1A1A1A] uppercase tracking-tight transition-colors">{item.label}</span>
                            <span className="text-[8px] text-gray-300 font-black uppercase tracking-widest">{item.sub}</span>
                        </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-gray-100 group-hover/nav:text-[#D4AF37] transform opacity-0 group-hover/nav:opacity-100 -translate-x-2 group-hover/nav:translate-x-0 transition-all duration-500" strokeWidth={3} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Feed - Central High-Impact Core */}
          <div className="col-span-1 lg:col-span-6 space-y-12">

            {/* Premium Broadcaster */}
            <div className="bg-[#1A1A1A] rounded-[4rem] p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] border border-white/5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.1),transparent)]" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-[80px] -mb-32 -mr-32" />
              
              <div className="flex items-center gap-8 mb-12 relative z-10">
                <div className="w-20 h-20 rounded-[2rem] overflow-hidden flex-shrink-0 bg-gray-900 border-2 border-[#D4AF37]/40 shadow-2xl transform transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-6">
                  <img src="https://images.unsplash.com/photo-1594744803329-a35971481358?q=80&w=400&h=400&auto=format&fit=crop" alt="Me" className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow relative group/field">
                    <input
                      type="text"
                      value={postText}
                      onChange={(e) => setPostText(e.target.value)}
                      placeholder="Broadcast a new artistry paradigm..."
                      className="w-full px-10 py-7 bg-white/5 border-2 border-transparent rounded-[2.5rem] text-xl font-black text-white placeholder:text-white/5 focus:outline-none focus:border-[#D4AF37]/20 focus:bg-white/[0.08] transition-all duration-700 cursor-pointer shadow-inner uppercase tracking-tighter"
                    />
                    <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-3">
                         <span className="text-[8px] font-black text-white/5 uppercase tracking-[0.3em] group-focus-within/field:opacity-0 transition-opacity">Record Live</span>
                         <Zap className="w-5 h-5 text-white/5 group-focus-within/field:text-[#D4AF37] group-focus-within/field:animate-pulse transition-colors" strokeWidth={3} />
                    </div>
                </div>
                <button
                  onClick={handlePost}
                  disabled={!postText.trim()}
                  className="bg-[#D4AF37] text-[#1A1A1A] h-20 w-20 rounded-full font-black flex items-center justify-center disabled:bg-white/5 disabled:text-white/10 disabled:cursor-not-allowed hover:scale-[1.15] active:scale-90 transition-all shadow-[0_0_50px_rgba(212,175,55,0.4)] relative overflow-hidden group/btn"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                  <Send className="w-8 h-8 relative z-10" strokeWidth={3} />
                </button>
              </div>
              <div className="flex justify-between border-t border-white/[0.03] pt-10 relative z-10">
                <button className="flex items-center gap-5 px-10 py-5 hover:bg-white/5 rounded-full text-[11px] font-black text-[#D4AF37] uppercase tracking-[0.4em] transition-all duration-500 group">
                  <ImageIcon className="w-6 h-6 group-hover:scale-125 transition-transform" strokeWidth={2.5} />
                  <span className="italic">Visual Set</span>
                </button>
                <button className="flex items-center gap-5 px-10 py-5 hover:bg-white/5 rounded-full text-[11px] font-black text-white/20 hover:text-white uppercase tracking-[0.4em] transition-all duration-500 group">
                  <Video className="w-6 h-6 group-hover:scale-125 transition-transform" strokeWidth={2.5} />
                  <span className="italic">Pro Motion</span>
                </button>
                <button className="flex items-center gap-5 px-10 py-5 hover:bg-white/5 rounded-full text-[11px] font-black text-white/20 hover:text-white uppercase tracking-[0.4em] transition-all duration-500 group">
                  <TrendingUp className="w-6 h-6 group-hover:scale-125 transition-transform" strokeWidth={2.5} />
                  <span className="italic">Analytics</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-10 px-8 py-4 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/30 to-transparent animate-shimmer" />
              <div className="flex-grow h-px bg-gray-100" />
              <div className="text-[11px] text-[#1A1A1A] font-black whitespace-nowrap uppercase tracking-[0.5em] flex items-center gap-4 italic relative z-10">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.6)]" />
                Live Heritage Transmission Active
              </div>
              <div className="flex-grow h-px bg-gray-100" />
            </div>

            {/* Post Feed Construction */}
            {loading ? (
              <div className="p-48 text-center space-y-12 bg-white rounded-[4rem] border border-gray-100 shadow-inner">
                <div className="w-24 h-24 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto shadow-[0_0_50px_rgba(212,175,55,0.3)]" />
                <div className="space-y-4">
                    <span className="text-[#1A1A1A] font-black uppercase tracking-[0.6em] text-xl italic block">Synchronizing Network</span>
                    <p className="text-[11px] text-gray-300 uppercase tracking-[0.4em] font-black">Establishing Secure High-Fidelity Link...</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-12">
                {posts.map((post: any) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    handleLike={handleLike}
                    handleComment={handleComment}
                  />
                ))}
              </div>
            )}

            <button className="w-full py-12 rounded-[3.5rem] border border-gray-200 bg-white text-[12px] font-black text-gray-300 uppercase tracking-[0.6em] hover:border-[#D4AF37] hover:text-[#1A1A1A] transition-all duration-700 shadow-2xl shadow-transparent hover:shadow-black/[0.05] active:scale-[0.99] flex items-center justify-center gap-6 group">
                <Globe className="w-6 h-6 group-hover:rotate-45 transition-transform duration-700" />
                Access Historical Archives
            </button>

          </div>

          {/* Right Sidebar - Intel & Peer Stream */}
          <div className="hidden lg:block lg:col-span-3 space-y-12">
            <div className="bg-white rounded-[4rem] border border-gray-100 p-12 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.03)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/5 rounded-full blur-[60px] -mr-24 -mt-24 pointer-events-none" />
              <div className="flex items-center justify-between mb-12 text-[#1A1A1A] relative z-10">
                <div className="flex items-center gap-4">
                     <Flame className="w-5 h-5 text-[#D4AF37] animate-bounce" />
                     <h3 className="font-black text-sm uppercase tracking-[0.3em] italic">Hot Intel</h3>
                </div>
                <button className="w-10 h-10 rounded-xl bg-[#FAFAFA] flex items-center justify-center hover:bg-[#1A1A1A] hover:text-white transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-12 relative z-10">
                {[
                  { t: "The Chennai Global Artistry Expo '26", d: "4h ago • Vault Only", icon: Award },
                  { t: "Elite Artist Certification: Tier 1 Opens", d: "2h ago • Regulatory Board", icon: ShieldCheck },
                  { t: "Real-Time 4K Virtual Trial Rooms", d: "1d ago • Studio R&D", icon: Zap }
                ].map((news, i) => (
                  <div key={i} className="group/news cursor-pointer space-y-4">
                    <div className="flex gap-6">
                        <div className="w-1.5 bg-gray-100 rounded-full h-14 group-hover/news:bg-[#D4AF37] transition-all relative overflow-hidden">
                             <div className="absolute top-0 left-0 w-full h-full bg-emerald-500 transform -translate-y-full group-hover/news:translate-y-0 transition-transform duration-1000" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-[15px] font-black text-[#1A1A1A] leading-tight uppercase tracking-tighter italic group-hover/news:text-[#D4AF37] transition-all duration-500">"{news.t}"</p>
                            <div className="flex items-center gap-3">
                                 <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">{news.d}</p>
                                 <news.icon className="w-3 h-3 text-[#D4AF37]/40" />
                            </div>
                        </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-16 py-6 rounded-[2rem] bg-[#1A1A1A] text-[#D4AF37] text-[11px] font-black uppercase tracking-[0.4em] hover:scale-105 transition-all shadow-[0_25px_50px_-10px_rgba(0,0,0,0.4)] active:scale-95 flex items-center justify-center gap-4 group/intel relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/5 -translate-x-full group-hover/intel:translate-x-0 transition-transform duration-700" />
                  <Lock className="w-4 h-4 relative z-10" strokeWidth={3} />
                  <span className="relative z-10">Vault Intelligence</span>
              </button>
            </div>

            <div className="bg-white rounded-[4rem] border border-gray-100 p-12 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.03)] group overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/[0.03] rounded-full blur-[40px] -mr-16 -mt-16" />
                <div className="flex items-center gap-4 mb-12">
                     <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                     <h3 className="text-[12px] font-black text-[#1A1A1A] uppercase tracking-[0.35em] italic">Active Nodes</h3>
                </div>
                <div className="space-y-8 relative z-10">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center justify-between group/peer cursor-pointer">
                            <div className="flex items-center gap-5">
                                <div className="relative">
                                    <div className="absolute -inset-1 bg-[#D4AF37]/20 rounded-2xl blur-lg opacity-0 group-hover/peer:opacity-100 transition-opacity" />
                                    <div className="w-14 h-14 rounded-2xl bg-gray-50 overflow-hidden shadow-2xl border-2 border-white relative group-hover/peer:scale-110 group-hover/peer:rotate-3 transition-all duration-500">
                                        <img src={`https://i.pravatar.cc/150?u=peer${i}`} className="w-full h-full object-cover" alt="Peer" />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[14px] font-black text-[#1A1A1A] uppercase tracking-tighter leading-none mb-1.5 group-hover/peer:text-[#D4AF37] transition-colors">{i === 1 ? 'Janvi S.' : i === 2 ? 'Meera K.' : 'Tanvi R.'}</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1 h-1 rounded-full bg-emerald-500" />
                                        <span className="text-[9px] text-gray-300 font-bold uppercase tracking-[0.2em] italic">Secure Connection</span>
                                    </div>
                                </div>
                            </div>
                            <button className="w-10 h-10 rounded-xl bg-[#FAFAFA] flex items-center justify-center text-gray-200 group-hover/peer:bg-[#1A1A1A] group-hover/peer:text-[#D4AF37] transition-all">
                                <Plus className="w-5 h-5" strokeWidth={3} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-12 text-center bg-gray-50 rounded-[4.5rem] border border-gray-100 shadow-inner group overflow-hidden relative">
              <div className="absolute inset-x-0 bottom-0 h-1.5 bg-[#D4AF37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left" />
              
              <div className="flex justify-center gap-8 mb-12 relative z-10">
                   <button className="text-[10px] text-gray-400 font-black uppercase tracking-[0.4em] hover:text-[#D4AF37] transition-all italic relative group/link">
                       Policy
                       <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D4AF37] group-hover/link:w-full transition-all" />
                   </button>
                   <button className="text-[10px] text-gray-400 font-black uppercase tracking-[0.4em] hover:text-[#D4AF37] transition-all italic relative group/link">
                       Safe
                       <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D4AF37] group-hover/link:w-full transition-all" />
                   </button>
              </div>

              <div className="h-[2px] bg-white mb-12 opacity-50 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
              </div>

              <div className="flex flex-col items-center gap-6 relative z-10">
                   <div className="w-20 h-1.5 bg-[#1A1A1A] rounded-full mb-2 opacity-10" />
                   <div className="space-y-4">
                       <h4 className="text-3xl font-black text-[#1A1A1A] italic tracking-tighter lowercase leading-none">bridal <span className="text-[#D4AF37]">connect</span></h4>
                       <p className="text-[11px] text-[#1A1A1A]/40 font-black uppercase tracking-[0.5em] leading-relaxed">
                          Universal Elite Registry<br/>
                          <span className="text-[9px] text-[#D4AF37] opacity-60">Global Heritage Standard</span>
                       </p>
                   </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Persistence Notifications - Micro Interactivity */}
      <div className="fixed bottom-12 right-12 z-50 flex flex-col gap-4">
           <button className="w-16 h-16 bg-[#1A1A1A] text-[#D4AF37] rounded-full shadow-[0_20px_40px_-5px_rgba(0,0,0,0.5)] flex items-center justify-center hover:scale-110 transition-all border border-white/5 active:scale-90 group">
                <Bell className="w-7 h-7 group-hover:rotate-12 transition-transform" strokeWidth={2.5} />
                <div className="absolute top-0 right-0 w-5 h-5 bg-[#D4AF37] text-[#1A1A1A] text-[9px] font-black rounded-full flex items-center justify-center border-4 border-white">2</div>
           </button>
           <button className="w-16 h-16 bg-[#D4AF37] text-[#1A1A1A] rounded-full shadow-[0_20px_40px_-10px_rgba(212,175,55,0.4)] flex items-center justify-center hover:scale-110 transition-all active:scale-90 group overflow-hidden">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <Plus className="w-8 h-8 relative z-10" strokeWidth={3} />
           </button>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite linear;
        }
      `}</style>
    </div>
  );
}
