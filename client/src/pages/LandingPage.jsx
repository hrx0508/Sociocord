// import React, { useState, useEffect, useRef } from 'react';
// import {
//   MessageSquare,
//   Bot,
//   Zap,
//   Users,
//   ShieldCheck,
//   Smartphone,
//   Play,
//   ArrowRight,
//   Sparkles,
//   Search,
//   CheckCircle2,
//   X,
//   Send,
//   Layers,
//   Activity,
//   Menu
// } from 'lucide-react';

// const STATS = [
//   {
//     id: 1,
//     icon: Users,
//     value: '500K+',
//     label: 'Active Users',
//     glowColor: 'group-hover:shadow-[0_0_25px_rgba(0,210,255,0.45)]',
//     iconColor: 'text-cyan-400',
//     borderColor: 'hover:border-cyan-400/40',
//     badgeBg: 'bg-cyan-500/10 border-cyan-400/30'
//   },
//   {
//     id: 2,
//     icon: MessageSquare,
//     value: '8K+',
//     label: 'Communities',
//     glowColor: 'group-hover:shadow-[0_0_25px_rgba(168,85,247,0.45)]',
//     iconColor: 'text-purple-400',
//     borderColor: 'hover:border-purple-400/40',
//     badgeBg: 'bg-purple-500/10 border-purple-400/30'
//   },
//   {
//     id: 3,
//     icon: Zap,
//     value: '1.2M+',
//     label: 'Messages/Day',
//     glowColor: 'group-hover:shadow-[0_0_25px_rgba(59,130,246,0.45)]',
//     iconColor: 'text-blue-400',
//     borderColor: 'hover:border-blue-400/40',
//     badgeBg: 'bg-blue-500/10 border-blue-400/30'
//   },
//   {
//     id: 4,
//     icon: ShieldCheck,
//     value: '99.9%',
//     label: 'Uptime',
//     glowColor: 'group-hover:shadow-[0_0_25px_rgba(129,140,248,0.45)]',
//     iconColor: 'text-indigo-400',
//     borderColor: 'hover:border-indigo-400/40',
//     badgeBg: 'bg-indigo-500/10 border-indigo-400/30'
//   }
// ];

// const FEATURES = [
//   {
//     id: 'f1',
//     icon: MessageSquare,
//     title: 'Real-time Chat',
//     subtitle: 'Text, Voice & Video',
//     color: 'from-cyan-500/20 to-blue-500/10',
//     iconColor: 'text-cyan-400',
//     borderHover: 'hover:border-cyan-400/50'
//   },
//   {
//     id: 'f2',
//     icon: Bot,
//     title: 'AI Assistant',
//     subtitle: 'Summarize, Search, Suggest',
//     color: 'from-purple-500/20 to-pink-500/10',
//     iconColor: 'text-purple-400',
//     borderHover: 'hover:border-purple-400/50'
//   },
//   {
//     id: 'f3',
//     icon: Zap,
//     title: 'Razorpay Nitro',
//     subtitle: 'Premium Features',
//     color: 'from-indigo-500/20 to-purple-500/10',
//     iconColor: 'text-indigo-400',
//     borderHover: 'hover:border-indigo-400/50'
//   },
//   {
//     id: 'f4',
//     icon: Layers,
//     title: 'Custom Communities',
//     subtitle: 'For every interest',
//     color: 'from-pink-500/20 to-rose-500/10',
//     iconColor: 'text-pink-400',
//     borderHover: 'hover:border-pink-400/50'
//   },
//   {
//     id: 'f5',
//     icon: Smartphone,
//     title: 'Cross-Platform',
//     subtitle: 'Web & Mobile',
//     color: 'from-blue-500/20 to-cyan-500/10',
//     iconColor: 'text-blue-400',
//     borderHover: 'hover:border-blue-400/50'
//   }
// ];

// const COMMUNITY_NODES = [
//   { id: 'n1', name: 'Elena Vance', role: 'Staff Eng', x: 26, y: 32, ring: 'ring-cyan-400', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces' },
//   { id: 'n2', name: 'Marcus Lin', role: 'Game Dev', x: 12, y: 52, ring: 'ring-indigo-400', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces' },
//   { id: 'n3', name: 'Sarah Chen', role: 'AI Researcher', x: 42, y: 78, ring: 'ring-purple-400', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces' },
//   { id: 'n4', name: 'David Croft', role: 'Crypto Architect', x: 88, y: 35, ring: 'ring-pink-400', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces' }
// ];

// export default function LandingPage() {
//   const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState('Home');
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [toastMessage, setToastMessage] = useState(null);
//   const [aiTypingState, setAiTypingState] = useState('Idle');
//   const [aiQuery, setAiQuery] = useState('Summarize #announcements for the last 24h');
//   const [chatPreviewList, setChatPreviewList] = useState([
//     { role: 'user', text: 'Summarize #tech-builders updates.' },
//     { role: 'ai', text: '3 Pull Requests merged today: WebSocket real-time audio rooms deployed; Nitro subscription tiers updated.' }
//   ]);
//   const canvasRef = useRef(null);

//   // Background dynamic star constellation canvas
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     let animationFrameId;

//     let width = (canvas.width = canvas.parentElement.offsetWidth);
//     let height = (canvas.height = canvas.parentElement.offsetHeight);

//     const handleResize = () => {
//       if (!canvas || !canvas.parentElement) return;
//       width = canvas.width = canvas.parentElement.offsetWidth;
//       height = canvas.height = canvas.parentElement.offsetHeight;
//     };

//     window.addEventListener('resize', handleResize);

//     const stars = Array.from({ length: 42 }).map(() => ({
//       x: Math.random() * width,
//       y: Math.random() * height,
//       vx: (Math.random() - 0.5) * 0.35,
//       vy: (Math.random() - 0.5) * 0.35,
//       size: Math.random() * 1.6 + 0.6,
//       color: Math.random() > 0.5 ? '#38bdf8' : '#c084fc'
//     }));

//     const render = () => {
//       ctx.clearRect(0, 0, width, height);

//       // Draw faint connections
//       for (let i = 0; i < stars.length; i++) {
//         for (let j = i + 1; j < stars.length; j++) {
//           const dx = stars[i].x - stars[j].x;
//           const dy = stars[i].y - stars[j].y;
//           const dist = Math.sqrt(dx * dx + dy * dy);

//           if (dist < 110) {
//             const alpha = (1 - dist / 110) * 0.16;
//             ctx.beginPath();
//             ctx.moveTo(stars[i].x, stars[i].y);
//             ctx.lineTo(stars[j].x, stars[j].y);
//             ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
//             ctx.lineWidth = 0.75;
//             ctx.stroke();
//           }
//         }
//       }

//       // Draw stars
//       stars.forEach((s) => {
//         s.x += s.vx;
//         s.y += s.vy;
//         if (s.x < 0 || s.x > width) s.vx *= -1;
//         if (s.y < 0 || s.y > height) s.vy *= -1;

//         ctx.beginPath();
//         ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
//         ctx.fillStyle = s.color;
//         ctx.shadowBlur = 6;
//         ctx.shadowColor = s.color;
//         ctx.fill();
//         ctx.shadowBlur = 0;
//       });

//       animationFrameId = requestAnimationFrame(render);
//     };

//     render();

//     return () => {
//       cancelAnimationFrame(animationFrameId);
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   const triggerToast = (msg) => {
//     setToastMessage(msg);
//     setTimeout(() => setToastMessage(null), 3500);
//   };

//   const handleSendAi = (e) => {
//     e.preventDefault();
//     if (!aiQuery.trim()) return;
//     const q = aiQuery;
//     setChatPreviewList((prev) => [...prev, { role: 'user', text: q }]);
//     setAiQuery('');
//     setAiTypingState('Thinking...');

//     setTimeout(() => {
//       setChatPreviewList((prev) => [
//         ...prev,
//         {
//           role: 'ai',
//           text: `Analysis complete: High community engagement (+44%). Community members highlighted the seamless AI integration and fast streaming audio!`
//         }
//       ]);
//       setAiTypingState('Idle');
//     }, 1000);
//   };

//   return (
//     <div className="relative min-h-screen bg-[#030614] text-slate-100 font-sans selection:bg-purple-600 selection:text-white overflow-x-hidden">
      
//       {/* Background Ambience and Glowing Nebulas */}
//       <div 
//         className="fixed inset-0 pointer-events-none z-0"
//         style={{
//           backgroundImage: `
//             radial-gradient(circle at 75% 32%, rgba(139, 92, 246, 0.28) 0%, transparent 45%),
//             radial-gradient(circle at 88% 68%, rgba(56, 189, 248, 0.2) 0%, transparent 50%),
//             radial-gradient(circle at 18% 38%, rgba(59, 130, 246, 0.16) 0%, transparent 45%),
//             radial-gradient(circle at 50% 92%, rgba(168, 85, 247, 0.18) 0%, transparent 55%)
//           `
//         }}
//       />

//       {/* Floating Canvas Constellation */}
//       <canvas
//         ref={canvasRef}
//         className="fixed inset-0 pointer-events-none z-0 opacity-60 w-full h-full"
//       />

//       {/* Header Container */}
//       <header className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
//         <div className="flex items-center justify-between">
          
//           {/* Logo */}
//           <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('Home')}>
//             <div className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 p-[2px] shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-300">
//               <div className="w-full h-full bg-[#070b1f] rounded-[10px] flex items-center justify-center">
//                 <svg
//                   className="w-6 h-6 text-cyan-300 transform transition-transform group-hover:rotate-12 duration-300"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2.5"
//                 >
//                   <path
//                     d="M12 2a9 9 0 0 1 9 9c0 3.5-2 6.5-5 8l-4 3-4-3C5 17.5 3 14.5 3 11a9 9 0 0 1 9-9z"
//                     fill="url(#headerLogoGrad)"
//                     stroke="none"
//                   />
//                   <path
//                     d="M8 11.5c.8-1.7 2.4-2.5 4-2.5s3.2.8 4 2.5c-.8 1.7-2.4 2.5-4 2.5s-3.2-.8-4-2.5z"
//                     stroke="#38bdf8"
//                     strokeWidth="2"
//                     fill="none"
//                   />
//                   <circle cx="12" cy="11.5" r="1.5" fill="#ffffff" />
//                   <defs>
//                     <linearGradient id="headerLogoGrad" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
//                       <stop stopColor="#9333ea" />
//                       <stop offset="0.5" stopColor="#3b82f6" />
//                       <stop offset="1" stopColor="#00d2ff" />
//                     </linearGradient>
//                   </defs>
//                 </svg>
//               </div>
//             </div>
//             <span className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow">
//               Sociocord
//             </span>
//           </div>

//           {/* Navigation Links */}
//           <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
//             {['Home', 'Communities', 'Features', 'Pricing'].map((item) => {
//               const isActive = activeTab === item;
//               return (
//                 <button
//                   key={item}
//                   onClick={() => setActiveTab(item)}
//                   className={`relative transition-colors duration-200 py-1 ${
//                     isActive ? 'text-white font-semibold' : 'text-slate-400 hover:text-slate-100'
//                   }`}
//                 >
//                   {item}
//                   {isActive && (
//                     <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-violet-500 via-indigo-400 to-cyan-400 rounded-full" />
//                   )}
//                 </button>
//               );
//             })}
//           </nav>

//           {/* Right Action buttons */}
//           <div className="flex items-center gap-4 sm:gap-6">
//             <button
//               onClick={() => triggerToast('Sociocord SSO Portal opened.')}
//               className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200"
//             >
//               Login
//             </button>
//             <button
//               onClick={() => triggerToast('Welcome aboard! Account creation initiated.')}
//               className="relative group overflow-hidden rounded-full p-[1px] font-semibold text-sm transition-all duration-300 hover:scale-105"
//             >
//               <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-400 rounded-full blur-[2px] opacity-80 group-hover:opacity-100" />
//               <span className="relative flex items-center justify-center px-6 py-2.5 rounded-full bg-gradient-to-r from-violet-700 via-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-600/40">
//                 Get Started
//               </span>
//             </button>

//             {/* Mobile burger button */}
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="md:hidden p-2 rounded-xl bg-slate-800/40 border border-white/10 text-slate-300 hover:text-white"
//             >
//               <Menu className="w-5 h-5" />
//             </button>
//           </div>
//         </div>

//         {/* Mobile Dropdown */}
//         {mobileMenuOpen && (
//           <div className="md:hidden mt-4 rounded-2xl bg-[#090e24]/90 backdrop-blur-2xl p-5 border border-white/10 shadow-2xl flex flex-col gap-3">
//             {['Home', 'Communities', 'Features', 'Pricing'].map((item) => (
//               <button
//                 key={item}
//                 onClick={() => {
//                   setActiveTab(item);
//                   setMobileMenuOpen(false);
//                 }}
//                 className={`text-left py-2 px-3 rounded-lg text-sm ${
//                   activeTab === item ? 'bg-indigo-600/20 text-cyan-300 font-semibold' : 'text-slate-300 hover:bg-white/5'
//                 }`}
//               >
//                 {item}
//               </button>
//             ))}
//             <div className="h-[1px] bg-white/10 my-1" />
//             <button
//               onClick={() => {
//                 triggerToast('Welcome aboard!');
//                 setMobileMenuOpen(false);
//               }}
//               className="w-full py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold text-sm"
//             >
//               Get Started
//             </button>
//           </div>
//         )}
//       </header>

//       {/* Main Hero & Content Container */}
//       <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-14 flex flex-col justify-between">
        
//         {/* Hero Section Grid */}
//         <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center min-h-[520px]">
          
//           {/* Left Hero Column */}
//           <div className="lg:col-span-6 flex flex-col items-start text-left z-10 pt-2 lg:pt-0">
//             <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
//               Find your people.<br />
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-cyan-200">
//                 Build your world.
//               </span>
//             </h1>

//             <p className="text-slate-300/85 text-base sm:text-lg max-w-xl font-normal leading-relaxed mb-8">
//               Sociocord is where communities, conversations and opportunities come together — powered by AI, with features that go beyond just chat.
//             </p>

//             {/* Action buttons */}
//             <div className="flex flex-wrap items-center gap-4 sm:gap-5 w-full sm:w-auto">
//               <button
//                 onClick={() => triggerToast('Registration portal opening...')}
//                 className="group relative px-7 sm:px-8 py-3.5 rounded-full font-semibold text-white text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden shadow-[0_4px_25px_rgba(124,58,237,0.55)] hover:shadow-[0_6px_35px_rgba(124,58,237,0.75)] hover:-translate-y-0.5"
//                 style={{
//                   background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #2563eb 100%)'
//                 }}
//               >
//                 <span>Get Started Free</span>
//                 <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
//               </button>

//               <button
//                 onClick={() => setIsVideoModalOpen(true)}
//                 className="px-6 sm:px-7 py-3.5 rounded-full font-medium text-slate-200 text-sm sm:text-base bg-[#0a122e]/60 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 hover:text-white hover:bg-slate-800/60 transition-all duration-300 flex items-center justify-center gap-3 group shadow-lg"
//               >
//                 <span className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center group-hover:bg-cyan-400/20 group-hover:scale-110 transition-all">
//                   <Play className="w-2.5 h-2.5 text-cyan-400 ml-0.5 fill-cyan-400" />
//                 </span>
//                 <span>Watch Demo</span>
//               </button>
//             </div>
//           </div>

//           <div className="lg:col-span-6 relative w-full h-[450px] sm:h-[530px] flex items-center justify-center">
            
//             {/* SVG Glowing Constellation Network Lines */}
//             <svg
//               className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0"
//               viewBox="0 0 600 500"
//               preserveAspectRatio="xMidYMid meet"
//             >
//               <defs>
//                 <linearGradient id="neonCyanPurple" x1="0%" y1="0%" x2="100%" y2="100%">
//                   <stop offset="0%" stopColor="#00d2ff" stopOpacity="0.8" />
//                   <stop offset="60%" stopColor="#8b5cf6" stopOpacity="0.5" />
//                   <stop offset="100%" stopColor="#ec4899" stopOpacity="0.2" />
//                 </linearGradient>
//                 <linearGradient id="neonBlueGlow" x1="0%" y1="100%" x2="100%" y2="0%">
//                   <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
//                   <stop offset="60%" stopColor="#00d2ff" stopOpacity="0.7" />
//                   <stop offset="100%" stopColor="#a855f7" stopOpacity="0.9" />
//                 </linearGradient>
//                 <filter id="svgGlow" x="-20%" y="-20%" width="140%" height="140%">
//                   <feGaussianBlur stdDeviation="3.5" result="blur" />
//                   <feMerge>
//                     <feMergeNode in="blur" />
//                     <feMergeNode in="SourceGraphic" />
//                   </feMerge>
//                 </filter>
//               </defs>

//               {/* Constellation lines linking elements */}
//               <path
//                 d="M 150 250 C 230 180, 310 160, 420 100"
//                 fill="none"
//                 stroke="url(#neonCyanPurple)"
//                 strokeWidth="1.8"
//                 strokeDasharray="4 3"
//                 filter="url(#svgGlow)"
//               />
//               <path
//                 d="M 420 100 C 370 210, 390 280, 430 350"
//                 fill="none"
//                 stroke="url(#neonBlueGlow)"
//                 strokeWidth="2"
//                 filter="url(#svgGlow)"
//               />
//               <path
//                 d="M 230 380 C 310 370, 360 330, 430 350"
//                 fill="none"
//                 stroke="url(#neonCyanPurple)"
//                 strokeWidth="1.4"
//                 opacity="0.6"
//               />
//               <path
//                 d="M 150 250 C 180 320, 200 350, 230 380"
//                 fill="none"
//                 stroke="url(#neonBlueGlow)"
//                 strokeWidth="1.2"
//                 strokeDasharray="3 3"
//               />
//               <path
//                 d="M 430 350 C 490 320, 520 220, 530 150"
//                 fill="none"
//                 stroke="url(#neonCyanPurple)"
//                 strokeWidth="1.2"
//                 opacity="0.5"
//               />
//             </svg>

//             {/* Faceted 3D Glowing Crystalline Mountain Cluster at bottom right */}
//             <div className="absolute -bottom-6 right-2 sm:right-6 w-64 h-64 sm:w-80 sm:h-80 pointer-events-none z-0">
//               <div className="absolute inset-0 bg-gradient-to-t from-purple-700/50 via-indigo-600/30 to-cyan-400/20 blur-2xl rounded-full" />
//               <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_35px_rgba(139,92,246,0.65)]">
//                 {/* Back facets */}
//                 <polygon points="100,20 20,80 100,105" fill="rgba(30, 27, 75, 0.7)" stroke="#818cf8" strokeWidth="0.8" />
//                 <polygon points="20,80 40,150 100,105" fill="rgba(24, 24, 60, 0.75)" stroke="#6366f1" strokeWidth="0.8" />
//                 {/* Main front facets */}
//                 <polygon points="100,20 170,90 130,170 40,150 20,80" fill="rgba(67, 24, 154, 0.55)" stroke="#a855f7" strokeWidth="1.2" />
//                 <polygon points="100,20 130,170 100,105" fill="rgba(37, 99, 235, 0.45)" stroke="#38bdf8" strokeWidth="1.2" />
//                 <polygon points="100,105 170,90 130,170" fill="rgba(147, 51, 234, 0.6)" stroke="#c084fc" strokeWidth="1.2" />
//                 {/* Radiant vertices */}
//                 <circle cx="100" cy="20" r="3.5" fill="#ffffff" filter="url(#svgGlow)" />
//                 <circle cx="170" cy="90" r="2.5" fill="#38bdf8" />
//                 <circle cx="130" cy="170" r="2" fill="#c084fc" />
//               </svg>
//             </div>

//             {/* Card 1 (Top-Right): Floating AI Assistant Badge with Speech Prompt */}
//             <div
//               onClick={() => setIsVideoModalOpen(true)}
//               className="absolute top-2 sm:top-6 right-2 sm:right-6 bg-[#0a1128]/75 backdrop-blur-xl rounded-2xl p-2.5 sm:p-3 flex items-center gap-3 border border-cyan-500/30 shadow-[0_0_25px_rgba(0,210,255,0.25)] hover:border-cyan-400 hover:scale-105 transition-all duration-300 z-20 cursor-pointer animate-bounce"
//               style={{ animationDuration: '6s' }}
//             >
//               <div className="relative w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-500 shadow-md shadow-cyan-500/40 flex-shrink-0">
//                 <div className="w-full h-full bg-[#080d22] rounded-full flex items-center justify-center font-black text-cyan-300 text-sm">
//                   A*
//                 </div>
//                 <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#090e24] rounded-full" />
//               </div>
//               <div className="pr-1">
//                 <p className="text-xs sm:text-sm text-slate-100 font-medium">Summarize this server for me...</p>
//                 <div className="flex items-center gap-1 text-[10px] text-cyan-400 font-medium mt-0.5">
//                   <Sparkles className="w-3 h-3 text-cyan-300" />
//                   <span>AI response generated in 0.4s</span>
//                 </div>
//               </div>
//             </div>

//             {/* Card 2 (Mid-Right): Tech Builders Community Badge */}
//             <div
//               onClick={() => triggerToast('Joined Tech Builders community!')}
//               className="absolute top-28 sm:top-32 right-6 sm:right-12 bg-[#0c1433]/80 backdrop-blur-xl rounded-2xl p-3 sm:p-3.5 border border-purple-500/30 shadow-xl hover:border-purple-400 hover:scale-105 transition-all duration-300 z-20 w-64 sm:w-72 cursor-pointer"
//             >
//               <div className="flex items-center gap-3">
//                 <img
//                   src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"
//                   alt="Tech Builders Owner"
//                   className="w-11 h-11 rounded-full object-cover border-2 border-purple-400/60 shadow-md shadow-purple-500/40"
//                 />
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center gap-1.5">
//                     <h4 className="text-sm font-semibold text-white truncate">Tech Builders</h4>
//                     <span className="w-2 h-2 rounded-full bg-cyan-400" />
//                   </div>
//                   <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
//                     <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
//                     <span>12.4K members</span>
//                   </p>
//                 </div>
//                 <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 hover:bg-indigo-500/40 transition-colors">
//                   Join
//                 </span>
//               </div>
//             </div>

//             {/* Card 3 (Center-Left): New message @Aarav Card */}
//             <div
//               onClick={() => triggerToast('Direct message opened with @Aarav')}
//               className="absolute top-64 sm:top-64 left-8 sm:left-16 bg-[#0a112c]/85 backdrop-blur-xl rounded-2xl py-2.5 px-3.5 border border-blue-500/30 shadow-lg hover:border-blue-400 hover:scale-105 transition-all duration-300 z-20 flex items-center gap-3 cursor-pointer"
//             >
//               <div className="relative">
//                 <img
//                   src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
//                   alt="Aarav"
//                   className="w-9 h-9 rounded-full object-cover border border-cyan-400/60"
//                 />
//                 <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#090e24]" />
//               </div>
//               <div>
//                 <p className="text-[11px] text-slate-400 font-medium">New message</p>
//                 <p className="text-xs text-white font-semibold flex items-center gap-1">
//                   <span className="text-cyan-300 font-bold">@Aarav:</span> "Let's launch today!"
//                 </p>
//               </div>
//             </div>

//             {/* Stacked Member Avatars Pill (Bottom Right) */}
//             <div className="absolute bottom-20 sm:bottom-24 right-10 sm:right-28 bg-[#090f26]/80 backdrop-blur-md rounded-full py-1.5 px-3 border border-white/10 flex items-center gap-2 z-20 shadow-lg">
//               <div className="flex -space-x-2">
//                 {[
//                   'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop',
//                   'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop',
//                   'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=60&h=60&fit=crop',
//                   'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop'
//                 ].map((src, i) => (
//                   <img
//                     key={i}
//                     src={src}
//                     alt="Member"
//                     className="inline-block h-6 w-6 rounded-full ring-2 ring-[#0c1226] object-cover"
//                   />
//                 ))}
//               </div>
//               <span className="text-[11px] font-semibold text-cyan-300">+2.4k</span>
//             </div>

//             {/* Standalone Circular Constellation Nodes */}
//             {COMMUNITY_NODES.map((node) => (
//               <div
//                 key={node.id}
//                 onClick={() => setSelectedUser(node)}
//                 style={{ top: `${node.y}%`, left: `${node.x}%` }}
//                 className="absolute z-10 group cursor-pointer -translate-x-1/2 -translate-y-1/2"
//               >
//                 <div className="relative">
//                   <span className="absolute inset-0 rounded-full bg-cyan-400 blur-sm opacity-50 group-hover:opacity-100 transition-opacity" />
//                   <img
//                     src={node.img}
//                     alt={node.name}
//                     className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-full ring-2 ${node.ring} object-cover shadow-lg group-hover:scale-125 transition-transform duration-200`}
//                   />
//                 </div>
//               </div>
//             ))}

//           </div>
//         </section>

//         <section className="w-full my-8">
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//             {STATS.map((stat) => {
//               const IconComp = stat.icon;
//               return (
//                 <div
//                   key={stat.id}
//                   className={`bg-[#0a102a]/65 backdrop-blur-xl rounded-2xl p-4 sm:p-5 flex items-center gap-4 border border-white/10 ${stat.borderColor} ${stat.glowColor} transition-all duration-300 hover:-translate-y-1 group shadow-[0_10px_30px_rgba(0,0,0,0.35)]`}
//                 >
//                   <div
//                     className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-inner ${stat.badgeBg} group-hover:scale-110 transition-transform`}
//                   >
//                     <IconComp className={`w-6 h-6 ${stat.iconColor}`} />
//                   </div>
//                   <div>
//                     <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
//                       {stat.value}
//                     </div>
//                     <p className="text-xs text-slate-400 font-medium">{stat.label}</p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </section>

//         <section className="w-full my-6 sm:my-8">
//           <div className="mb-5 flex items-center justify-between">
//             <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
//               Everything you need in one place
//             </h2>
//             <span className="text-xs text-indigo-400 font-semibold tracking-wide uppercase px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 hidden sm:inline-block">
//               All-in-One Platform
//             </span>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
//             {FEATURES.map((feat) => {
//               const IconItem = feat.icon;
//               return (
//                 <div
//                   key={feat.id}
//                   onClick={() => triggerToast(`Feature chosen: ${feat.title}`)}
//                   className={`bg-[#0a102a]/60 backdrop-blur-xl rounded-2xl p-4 sm:p-5 flex flex-col justify-between border border-white/10 ${feat.borderHover} transition-all duration-300 hover:-translate-y-1.5 hover:bg-[#10183b]/75 cursor-pointer group shadow-lg`}
//                 >
//                   <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-white/5 to-white/10 border border-white/10 flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform">
//                     <IconItem className={`w-5 h-5 ${feat.iconColor}`} />
//                   </div>
//                   <div>
//                     <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
//                       {feat.title}
//                     </h3>
//                     <p className="text-xs text-slate-400 mt-1 font-normal">{feat.subtitle}</p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </section>

//         <footer className="w-full pt-8 pb-3 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 border-t border-white/5 gap-3">
//           <div className="flex items-center gap-2">
//             <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
//             <span className="text-slate-400">All services operational • End-to-End Encrypted</span>
//           </div>
//           <div className="flex items-center gap-6">
//             <button onClick={() => triggerToast('Privacy Policy')} className="hover:text-slate-300 transition-colors">
//               Privacy
//             </button>
//             <button onClick={() => triggerToast('Terms of Service')} className="hover:text-slate-300 transition-colors">
//               Terms
//             </button>
//             <button onClick={() => triggerToast('Security Audit 2026')} className="hover:text-slate-300 transition-colors">
//               Security
//             </button>
//             <span>&copy; 2026 Sociocord Inc.</span>
//           </div>
//         </footer>

//       </main>

//       {isVideoModalOpen && (
//         <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
//           <div className="relative w-full max-w-3xl bg-[#090f26] rounded-3xl p-6 border border-white/15 shadow-2xl">
//             <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
//               <div className="flex items-center gap-2">
//                 <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
//                 <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
//                 <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
//                 <h3 className="text-sm font-semibold text-white ml-2 flex items-center gap-2">
//                   <Sparkles className="w-4 h-4 text-cyan-400" />
//                   Sociocord AI Server Co-Pilot Demo
//                 </h3>
//               </div>
//               <button
//                 onClick={() => setIsVideoModalOpen(false)}
//                 className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             {/* Interactive Simulated AI Terminal */}
//             <div className="bg-[#040714] rounded-2xl p-4 border border-white/10 flex flex-col gap-3 min-h-[260px] max-h-[380px] overflow-y-auto">
//               {chatPreviewList.map((msg, i) => (
//                 <div
//                   key={i}
//                   className={`flex gap-3 text-xs leading-relaxed ${
//                     msg.role === 'user' ? 'justify-end' : 'justify-start'
//                   }`}
//                 >
//                   {msg.role === 'ai' && (
//                     <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
//                       AI
//                     </div>
//                   )}
//                   <div
//                     className={`p-3 rounded-xl max-w-md ${
//                       msg.role === 'user'
//                         ? 'bg-indigo-600 text-white font-medium rounded-tr-none'
//                         : 'bg-slate-800/80 text-slate-200 border border-white/10 rounded-tl-none'
//                     }`}
//                   >
//                     {msg.text}
//                   </div>
//                 </div>
//               ))}
//               {aiTypingState !== 'Idle' && (
//                 <div className="text-xs text-cyan-400 flex items-center gap-2 italic">
//                   <Activity className="w-3.5 h-3.5 animate-spin" />
//                   Summarizing channel context...
//                 </div>
//               )}
//             </div>

//             {/* Interactive Query Input */}
//             <form onSubmit={handleSendAi} className="mt-4 flex gap-2">
//               <input
//                 type="text"
//                 value={aiQuery}
//                 onChange={(e) => setAiQuery(e.target.value)}
//                 placeholder="Ask Sociocord AI anything about your server..."
//                 className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
//               />
//               <button
//                 type="submit"
//                 className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-xs font-semibold flex items-center gap-1.5 hover:opacity-95"
//               >
//                 <span>Send</span>
//                 <Send className="w-3.5 h-3.5" />
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* User Node Profile Popover */}
//       {selectedUser && (
//         <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
//           <div className="bg-[#0b122e] border border-cyan-400/40 rounded-2xl p-5 max-w-xs w-full text-center relative shadow-2xl">
//             <button
//               onClick={() => setSelectedUser(null)}
//               className="absolute top-3 right-3 text-slate-400 hover:text-white"
//             >
//               <X className="w-4 h-4" />
//             </button>
//             <img
//               src={selectedUser.img}
//               alt={selectedUser.name}
//               className="w-16 h-16 rounded-full mx-auto ring-4 ring-cyan-400/50 mb-3 object-cover"
//             />
//             <h4 className="text-base font-bold text-white">{selectedUser.name}</h4>
//             <p className="text-xs text-cyan-400 font-medium mb-3">{selectedUser.role}</p>
//             <div className="flex gap-2">
//               <button
//                 onClick={() => {
//                   triggerToast(`Messaged ${selectedUser.name}`);
//                   setSelectedUser(null);
//                 }}
//                 className="flex-1 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white"
//               >
//                 Message
//               </button>
//               <button
//                 onClick={() => {
//                   triggerToast(`Profile viewed: ${selectedUser.name}`);
//                   setSelectedUser(null);
//                 }}
//                 className="flex-1 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-white/10"
//               >
//                 Profile
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Toast Notification */}
//       {toastMessage && (
//         <div className="fixed bottom-6 right-6 z-50 bg-[#0c1538]/90 backdrop-blur-xl border border-cyan-400/40 px-4 py-3 rounded-xl text-xs font-medium text-cyan-200 flex items-center gap-2 shadow-2xl animate-fade-in">
//           <CheckCircle2 className="w-4 h-4 text-cyan-400" />
//           <span>{toastMessage}</span>
//         </div>
//       )}

//     </div>
//   );
// }



import {
  ArrowRight,
  Bot,
  Check,
  ChevronRight,
  MessageCircle,
  Play,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const stats = [
  {
    value: "500K+",
    label: "Active Users",
    icon: Users,
  },
  {
    value: "8K+",
    label: "Communities",
    icon: MessageCircle,
  },
  {
    value: "1.2M+",
    label: "Messages/Day",
    icon: MessageCircle,
  },
  {
    value: "99.9%",
    label: "Uptime",
    icon: ShieldCheck,
  },
];

const features = [
  {
    icon: MessageCircle,
    title: "Real-time Chat",
    description: "Text, Voice & Video",
  },
  {
    icon: Sparkles,
    title: "AI Assistant",
    description: "Summarize, Search, Suggest",
  },
  {
    icon: Rocket,
    title: "Razorpay Nitro",
    description: "Premium Features",
  },
  {
    icon: Users,
    title: "Custom Communities",
    description: "For every interest",
  },
  {
    icon: Zap,
    title: "Cross-Platform",
    description: "Web & Mobile",
  },
];

const floatingPeople = [
  {
    name: "Tech Builders",
    subtitle: "12.4K members",
    avatar: "TB",
    position: "top-[22%] right-[8%]",
  },
  {
    name: "New message",
    subtitle: "@harsh",
    avatar: "HM",
    position: "top-[42%] right-[17%]",
  },
];

function GlowOrb({ className }) {
  return (
    <div
      className={`absolute rounded-full blur-[100px] opacity-40 pointer-events-none ${className}`}
    />
  );
}

function Avatar({ text, size = "md" }) {
  const sizes = {
    sm: "h-8 w-8 text-[10px]",
    md: "h-11 w-11 text-xs",
    lg: "h-14 w-14 text-sm",
  };

  return (
    <div
      className={`${sizes[size]} flex shrink-0 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 font-bold text-white shadow-[0_0_25px_rgba(74,144,255,.35)]`}
    >
      {text}
    </div>
  );
}

function FloatingCard({ data, index }) {
  return (
    <motion.div
      className={`absolute ${data.position} z-20 hidden w-[245px] rounded-2xl border border-blue-400/25 bg-[#08132c]/80 p-4 shadow-[0_20px_50px_rgba(0,0,0,.35)] backdrop-blur-xl lg:block`}
      initial={{ opacity: 0, x: 40 }}
      animate={{
        opacity: 1,
        x: 0,
        y: [0, index % 2 === 0 ? -8 : 8, 0],
      }}
      transition={{
        opacity: { duration: 0.8, delay: 0.5 + index * 0.15 },
        x: { duration: 0.8, delay: 0.5 + index * 0.15 },
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <div className="flex items-center gap-3">
        <Avatar text={data.avatar} />

        <div>
          <p className="text-sm font-semibold text-white">
            {data.name}
          </p>
          <p className="mt-1 text-xs text-blue-200/60">
            {data.subtitle}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function NetworkLines() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-60">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 900 650"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M50 500 C170 350 170 420 300 280 S500 150 610 250 S750 400 900 190"
          stroke="url(#line1)"
          strokeWidth="1"
        />

        <path
          d="M100 120 C220 250 280 210 370 390 S570 470 680 330 S780 180 880 300"
          stroke="url(#line2)"
          strokeWidth="1"
        />

        <path
          d="M200 620 C300 500 350 460 470 480 S680 580 840 430"
          stroke="url(#line3)"
          strokeWidth="1"
        />

        <defs>
          <linearGradient id="line1" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#1677ff" stopOpacity="0" />
            <stop offset=".5" stopColor="#42b7ff" />
            <stop offset="1" stopColor="#9b4dff" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="line2">
            <stop stopColor="#9b4dff" stopOpacity="0" />
            <stop offset=".5" stopColor="#4c7dff" />
            <stop offset="1" stopColor="#00d9ff" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="line3">
            <stop stopColor="#00c6ff" stopOpacity="0" />
            <stop offset=".5" stopColor="#7047ff" />
            <stop offset="1" stopColor="#00c6ff" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {[
        ["left-[15%] top-[25%]", "bg-blue-400"],
        ["left-[43%] top-[17%]", "bg-purple-400"],
        ["left-[61%] top-[40%]", "bg-cyan-400"],
        ["left-[78%] top-[22%]", "bg-purple-400"],
        ["left-[71%] top-[68%]", "bg-blue-400"],
        ["left-[35%] top-[73%]", "bg-cyan-400"],
      ].map(([position, color], i) => (
        <motion.div
          key={i}
          className={`absolute ${position} h-1.5 w-1.5 rounded-full ${color} shadow-[0_0_15px_currentColor]`}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.8, 1.5, 0.8],
          }}
          transition={{
            duration: 2 + i * 0.4,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="relative min-h-[470px] w-full lg:min-h-[560px]">
      <GlowOrb className="right-[10%] top-[10%] h-64 w-64 bg-blue-600" />
      <GlowOrb className="bottom-[10%] right-[20%] h-72 w-72 bg-purple-600" />

      <NetworkLines />

      {/* Central AI orb */}
      <motion.div
        className="absolute left-[50%] top-[17%] z-20 flex h-28 w-28 -translate-x-1/2 items-center justify-center rounded-full border border-cyan-300/40 bg-gradient-to-br from-cyan-400/70 via-blue-600/70 to-purple-700/80 shadow-[0_0_70px_rgba(0,174,255,.55)] backdrop-blur-xl"
        animate={{
          y: [0, -12, 0],
          boxShadow: [
            "0 0 45px rgba(0,174,255,.35)",
            "0 0 80px rgba(115,70,255,.65)",
            "0 0 45px rgba(0,174,255,.35)",
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Bot className="h-12 w-12 text-white" />

        <div className="absolute inset-[-12px] rounded-full border border-cyan-400/20" />
        <div className="absolute inset-[-24px] rounded-full border border-purple-400/10" />
      </motion.div>

      {/* AI message */}
      <motion.div
        className="absolute right-[3%] top-[9%] z-30 hidden rounded-2xl border border-purple-400/20 bg-[#101544]/75 px-5 py-4 text-sm text-white shadow-xl backdrop-blur-xl sm:block"
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <span className="text-purple-300">✦</span>
        <span className="ml-2">Summarize this server for me...</span>
      </motion.div>

      {floatingPeople.map((person, index) => (
        <FloatingCard key={person.name} data={person} index={index} />
      ))}

      {/* Small avatars */}
      <div className="absolute bottom-[28%] left-[15%] z-20">
        <Avatar text="AK" size="md" />
      </div>

      <div className="absolute right-[2%] top-[39%] z-20">
        <Avatar text="RS" size="md" />
      </div>

      <div className="absolute bottom-[20%] left-[42%] z-20">
        <Avatar text="JD" size="md" />
      </div>

      {/* Glowing center shape */}
      <motion.div
        className="absolute bottom-[8%] right-[18%] h-44 w-60 rotate-[-10deg] rounded-[40%] bg-gradient-to-br from-blue-600/30 via-purple-500/50 to-cyan-400/20 blur-[2px]"
        animate={{
          rotate: [-10, -5, -10],
          scale: [1, 1.06, 1],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* Connection circles */}
      <div className="absolute bottom-[12%] left-[30%] h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_25px_#22d3ee]" />
      <div className="absolute right-[25%] top-[63%] h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_20px_#a855f7]" />
    </div>
  );
}

function StatCard({ stat, index }) {
  const Icon = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -5 }}
      className="group rounded-2xl border border-blue-400/15 bg-[#07152d]/70 p-4 backdrop-blur-xl transition-colors hover:border-blue-400/35"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/30 to-purple-600/30 text-blue-300">
          <Icon size={20} />
        </div>

        <div>
          <p className="text-lg font-bold text-white">{stat.value}</p>
          <p className="text-xs text-blue-200/50">{stat.label}</p>
        </div>
      </div>
    </motion.div>
  );
}

function FeatureCard({ feature, index }) {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      whileHover={{
        y: -7,
        scale: 1.015,
      }}
      className="group min-w-[220px] flex-1 rounded-2xl border border-blue-400/15 bg-[#07152d]/75 p-4 backdrop-blur-xl transition-all hover:border-purple-400/40 hover:bg-[#0b1d3c]"
    >
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/30 to-purple-600/30 text-blue-300 transition-all group-hover:from-blue-500/40 group-hover:to-purple-500/40">
        <Icon size={21} />
      </div>

      <h3 className="text-sm font-semibold text-white">
        {feature.title}
      </h3>

      <p className="mt-1 text-xs text-blue-100/45">
        {feature.description}
      </p>

      <ChevronRight
        size={15}
        className="mt-4 text-blue-400 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
      />
    </motion.div>
  );
}

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#020817] text-white">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(50,60,190,.16),transparent_35%),radial-gradient(circle_at_30%_70%,rgba(30,90,220,.1),transparent_30%)]" />

        <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:70px_70px]" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-blue-400/10 bg-[#020817]/75 backdrop-blur-2xl">
        <nav className="mx-auto flex h-[72px] w-[92%] max-w-[1400px] items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 shadow-[0_0_25px_rgba(101,65,255,.4)]">
              <span className="text-xl font-black italic">S</span>
            </div>

            <span className="text-lg font-bold tracking-tight">
              Sociocord
            </span>
          </a>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-10 md:flex">
            {["Home", "Communities", "Features", "Pricing"].map(
              (item, index) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`relative text-sm font-medium transition-colors hover:text-white ${
                    index === 0
                      ? "text-white"
                      : "text-blue-100/55"
                  }`}
                >
                  {item}

                  {index === 0 && (
                    <span className="absolute -bottom-[27px] left-0 h-[2px] w-full bg-gradient-to-r from-blue-500 to-purple-500" />
                  )}
                </a>
              )
            )}
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden text-sm text-blue-100/60 transition hover:text-white sm:block">
              Login
            </button>

            <button className="rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 px-5 py-2.5 text-sm font-semibold shadow-[0_0_25px_rgba(100,70,255,.3)] transition hover:scale-105">
              Get Started
            </button>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section
        id="home"
        className="relative mx-auto w-[92%] max-w-[1400px]"
      >
        <div className="grid min-h-[620px] items-center lg:grid-cols-[.9fr_1.1fr]">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-30 pt-16 lg:pt-0"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/5 px-3 py-1.5 text-xs text-blue-200/70 backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
              The next generation of communities
            </div>

            <h1 className="max-w-[680px] text-5xl font-black leading-[.98] tracking-[-.04em] sm:text-6xl lg:text-[68px]">
              Find your{" "}
              <span className="bg-gradient-to-r from-white via-blue-300 to-blue-500 bg-clip-text text-transparent">
                people.
              </span>
              <br />
              Build your{" "}
              <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
                world.
              </span>
            </h1>

            <p className="mt-7 max-w-[590px] text-base leading-7 text-blue-100/55 sm:text-lg">
              Sociocord is where communities, conversations and
              opportunities come together — powered by AI, with
              features that go beyond just chat.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400 px-6 py-3.5 text-sm font-bold shadow-[0_0_35px_rgba(75,80,255,.35)]"
              >
                Get Started Free
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 rounded-xl border border-blue-400/30 bg-blue-500/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-xl transition hover:border-blue-300/60"
              >
                <Play size={17} className="fill-cyan-400 text-cyan-400" />
                Watch Demo
              </motion.button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5 text-xs text-blue-100/40">
              <span className="flex items-center gap-2">
                <Check size={14} className="text-cyan-400" />
                Free to start
              </span>

              <span className="flex items-center gap-2">
                <Check size={14} className="text-cyan-400" />
                No credit card
              </span>

              <span className="flex items-center gap-2">
                <Check size={14} className="text-cyan-400" />
                AI powered
              </span>
            </div>
          </motion.div>

          {/* Right visual */}
          <HeroVisual />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 pb-16 md:grid-cols-4 md:gap-5">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="mx-auto w-[92%] max-w-[1400px] pb-20"
      >
        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[.25em] text-blue-400">
              Everything you need
            </p>

            <h2 className="text-2xl font-bold sm:text-3xl">
              Everything you need in one place
            </h2>
          </div>

          <button className="hidden items-center gap-1 text-sm text-blue-400 hover:text-blue-300 sm:flex">
            Explore all
            <ArrowRight size={15} />
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto mb-10 w-[92%] max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-blue-400/15 bg-gradient-to-r from-blue-950/60 via-purple-950/50 to-blue-950/60 p-8 text-center sm:p-12"
        >
          <div className="absolute left-1/2 top-0 h-40 w-96 -translate-x-1/2 rounded-full bg-purple-600/20 blur-[90px]" />

          <div className="relative">
            <p className="mb-3 text-sm font-medium text-blue-400">
              Your community is waiting
            </p>

            <h2 className="text-3xl font-bold sm:text-4xl">
              Build something people
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {" "}
                belong to.
              </span>
            </h2>

            <button className="mt-7 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 px-7 py-3 font-semibold shadow-[0_0_30px_rgba(80,70,255,.3)] transition hover:scale-105">
              Create your community
            </button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}