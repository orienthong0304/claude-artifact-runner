import { useState, useEffect, useRef } from 'react';
import { 
  Terminal, Cpu, Layers, GitBranch, 
  Database, Zap, Layout, Share2, 
  Activity, Box, FileCode, 
  
  User, Wifi
} from 'lucide-react';

// --- 辅助组件：文字解密特效 ---
const DecryptText = ({ text, className }) => {
  const [display, setDisplay] = useState('');
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
  
  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(text.split("").map((char, index) => {
        if (index < iteration) return text[index];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(""));
      
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{display}</span>;
};

// --- 辅助组件：3D 倾斜卡片 ---
const TiltCard = ({ children, className = "", intensity = 15 }) => {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -intensity;
    const rotateY = ((x - centerX) / centerX) * intensity;

    setRotate({ x: rotateX, y: rotateY });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setOpacity(0);
  };

  return (
    <div 
      ref={cardRef}
      className={`relative transition-transform duration-200 ease-out transform-gpu preserve-3d ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
      }}
    >
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 transition-opacity duration-500 pointer-events-none"
           style={{ opacity }} />
      {children}
    </div>
  );
};

// --- 主应用组件 ---
const App = () => {
  const [mounted, setMounted] = useState(false);
  const [bootSequence, setBootSequence] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 鼠标聚光灯追踪
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 模拟启动序列
  useEffect(() => {
    const timer = setTimeout(() => {
      setBootSequence(false);
      setMounted(true);
    }, 2000); // 2秒启动动画
    return () => clearTimeout(timer);
  }, []);

  const appInfo = {
    name: "CPMS Automation Core",
    description: "企业级浏览器自动化引擎 // 深度集成电信运营商业务逻辑",
    author: "OrientHong（七分-洪浩东）",
    role: "Lead Architect & Full Stack Engineer",
    version: "2.4.0",
    build: "20250318-RC",
    isStable: true
  };

  const stats = [
    { label: "核心代码行数", value: "50,000+", icon: FileCode, color: "text-blue-400" },
    { label: "源文件数量", value: "500+", icon: Box, color: "text-purple-400" },
    { label: "自动化积木", value: "40+", icon: Cpu, color: "text-emerald-400" },
    { label: "业务模组", value: "03", icon: Layout, color: "text-orange-400" },
  ];

  // 启动画面
  if (bootSequence) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono text-cyan-500 p-4">
        <div className="w-full max-w-md space-y-2">
           <div className="flex justify-between text-xs text-slate-500">
             <span>BIOS_CHECK_MEM</span>
             <span>OK</span>
           </div>
           <div className="h-1 w-full bg-slate-900 overflow-hidden">
             <div className="h-full bg-cyan-500 animate-[loading_1.5s_ease-in-out]"></div>
           </div>
           <div className="text-xs space-y-1 mt-4">
             <p>{'>'} MOUNTING_VIRTUAL_DRIVE... SUCCESS</p>
             <p>{'>'} LOADING_KERNEL_MODULES... [Vue3, React, Tailwind]</p>
             <p>{'>'} DECRYPTING_AUTHOR_SIGNATURE... <span className="text-white animate-pulse">{appInfo.author}</span></p>
             <p>{'>'} INITIALIZING_UI_INTERFACE...</p>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`min-h-screen bg-[#050505] text-slate-300 font-mono selection:bg-cyan-500/30 selection:text-cyan-100 relative overflow-x-hidden`}
    >
      
      {/* 全局鼠标聚光灯特效 */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`
        }}
      />

      {/* 背景网格与扫描线 */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0"></div>
      
      <div className="relative z-10 container mx-auto max-w-7xl p-4 md:p-8">
        
        {/* 顶部导航/标题栏 */}
        <header className="mb-12 border-b border-slate-800/50 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative">
          {/* 装饰线条 */}
          <div className="absolute -bottom-[1px] left-0 w-1/3 h-[1px] bg-gradient-to-r from-cyan-500 to-transparent"></div>
          
          <div className="relative">
            <div className="flex items-center gap-2 text-[10px] font-bold text-cyan-500 mb-2 tracking-[0.2em] uppercase">
              <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
              SYSTEM_DIAGNOSTIC_CONSOLE // V{appInfo.version}
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-2 flex flex-wrap gap-x-4">
              <span>ABOUT_</span>
              <DecryptText text="CPMS_CORE" className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600" />
            </h1>
            <div className="flex items-center gap-2 text-slate-400 text-sm md:text-base mt-4 bg-slate-900/50 w-fit px-4 py-2 rounded-r-full border-l-2 border-cyan-500">
              <Terminal size={16} className="text-cyan-500" />
              <span className="text-cyan-400 mr-2">root@dev:~$</span>
              <span className="typing-effect">exec initiate_protocol --target=browser_automation</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
             <div className="flex gap-2">
                <Badge text={`BUILD: ${appInfo.build}`} color="bg-slate-900 text-slate-400 border-slate-700" />
                <Badge text="STABLE" color="bg-emerald-950/30 text-emerald-400 border-emerald-800 shadow-[0_0_10px_rgba(16,185,129,0.2)]" />
             </div>
             <div className="text-[10px] text-slate-600 font-mono flex items-center gap-2">
                <Wifi size={10} /> UPLINK_ESTABLISHED
             </div>
          </div>
        </header>

        {/* 主要内容布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* 左侧：核心信息流 */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 统计数据 - 增加悬停发光 */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, idx) => (
                <TiltCard key={idx} className="group bg-slate-900/40 border border-slate-800 hover:border-cyan-500/50 p-5 rounded-xl overflow-hidden backdrop-blur-sm">
                  <div className="absolute -right-4 -top-4 p-4 bg-slate-800/50 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity"></div>
                  <stat.icon size={24} className={`mb-3 ${stat.color}`} />
                  <div className="text-xs text-slate-500 font-bold tracking-wider uppercase">{stat.label}</div>
                  <div className="text-2xl font-black text-white mt-1 group-hover:text-cyan-300 transition-colors">{stat.value}</div>
                  <div className="w-full bg-slate-800 h-1 mt-3 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 w-[70%] rounded-full animate-pulse"></div>
                  </div>
                </TiltCard>
              ))}
            </section>

            {/* 作者身份卡 (新增模块) */}
            <section className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-slate-950 border border-slate-800 p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-center md:items-start gap-8">
                
                {/* 头像区域 */}
                <div className="relative shrink-0">
                   <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-dashed border-slate-700 flex items-center justify-center bg-slate-900 relative overflow-hidden group-hover:border-cyan-500/50 transition-colors">
                      <User size={48} className="text-slate-600 group-hover:text-cyan-500 transition-colors" />
                      {/* 扫描线动画 */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.5)] animate-[scan_2s_linear_infinite]"></div>
                   </div>
                   <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-900 border border-cyan-500/30 px-3 py-1 rounded-full text-[10px] text-cyan-400 font-bold shadow-lg whitespace-nowrap">
                      ADMIN_ACCESS
                   </div>
                </div>

                {/* 信息区域 */}
                <div className="flex-1 text-center md:text-left w-full">
                   <div className="flex flex-col md:flex-row items-center md:items-end gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-white">{appInfo.author}</h2>
                      <span className="text-xs text-purple-400 border border-purple-500/30 px-2 py-1 rounded mb-1 bg-purple-500/10">
                        LV.99 ARCHITECT
                      </span>
                   </div>
                   <p className="text-slate-400 text-sm mb-6 max-w-lg">
                     全栈开发工程师 | 专注于复杂业务系统的自动化解决方案与架构设计。
                     <br/>致力于将 <span className="text-cyan-400">Code</span> 转化为生产力。
                   </p>
                   
                   {/* 技能矩阵 */}
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <SkillTag label="Vue/React" level="95%" />
                      <SkillTag label="Node.js" level="90%" />
                      <SkillTag label="Architecture" level="85%" />
                      <SkillTag label="DevOps" level="80%" />
                   </div>
                </div>
              </div>
            </section>

            {/* 核心架构堆栈 */}
            <section className="bg-slate-900/20 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                <div className="flex items-center gap-2 font-bold text-slate-200">
                  <Layers className="text-cyan-500" size={18} />
                  <span>SYSTEM_LAYERS_VISUALIZER</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500/20"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500/20"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500/20"></div>
                </div>
              </div>
              <div className="p-6 space-y-1">
                {[
                  { id: "L1", name: "Presentation", tech: "Vue 3 + TailwindCSS", color: "bg-purple-500" },
                  { id: "L2", name: "Service Facade", tech: "Unified Interface", color: "bg-blue-500" },
                  { id: "L3", name: "Business Logic", tech: "Workflow Manager", color: "bg-cyan-500" },
                  { id: "L4", name: "Strategy", tech: "Polymorphic Handlers", color: "bg-emerald-500" },
                  { id: "L5", name: "Data Access", tech: "Adapter Pattern", color: "bg-yellow-500" },
                  { id: "L6", name: "Persistence", tech: "Dexie (IndexedDB)", color: "bg-red-500" },
                ].map((layer, i) => (
                  <div key={i} className="group flex items-center gap-4 p-2 hover:bg-slate-800/50 rounded transition-colors cursor-crosshair">
                    <div className="font-mono text-xs font-bold text-slate-600 w-6">{layer.id}</div>
                    <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden relative">
                       <div className={`absolute inset-0 ${layer.color} opacity-30`}></div>
                       <div className={`absolute inset-0 ${layer.color} w-[0%] group-hover:w-full transition-all duration-500 ease-out shadow-[0_0_10px_currentColor]`}></div>
                    </div>
                    <div className="flex-1 flex justify-between items-center">
                       <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">{layer.name}</span>
                       <span className="text-xs text-slate-500 font-mono group-hover:text-cyan-400">{layer.tech}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* 右侧：侧边栏 */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* 实时资源监控 (模拟) */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                 <Activity size={14} className="text-green-500" />
                 Live_Resource_Monitor
              </div>
              <div className="space-y-4">
                 <ResourceBar label="CPU_USAGE" value="12%" color="bg-green-500" animate />
                 <ResourceBar label="MEM_ALLOC" value="480MB" color="bg-blue-500" width="40%" />
                 <ResourceBar label="WORKER_THREADS" value="4/8 ACTIVE" color="bg-purple-500" width="50%" />
                 <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="bg-slate-900 p-2 rounded text-center">
                       <div className="text-[10px] text-slate-500">UPTIME</div>
                       <div className="text-lg font-mono text-white">24:05:12</div>
                    </div>
                    <div className="bg-slate-900 p-2 rounded text-center">
                       <div className="text-[10px] text-slate-500">ERRORS</div>
                       <div className="text-lg font-mono text-green-500">0</div>
                    </div>
                 </div>
              </div>
            </div>

            {/* 技术难点终端 */}
            <div className="bg-black border border-slate-800 rounded-xl overflow-hidden font-mono text-xs shadow-2xl relative">
               {/* 终端反光效果 */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-slate-800/20 to-transparent pointer-events-none"></div>
              
              <div className="bg-slate-900/80 backdrop-blur p-2 border-b border-slate-800 flex items-center gap-2">
                <div className="flex gap-1.5 pl-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                </div>
                <div className="text-slate-500 ml-2 flex-1 text-center pr-8">debug_log.txt</div>
              </div>
              
              <div className="p-4 space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar text-slate-400">
                 <LogEntry type="info" time="10:00:01" msg="系统初始化..." />
                 <LogEntry type="warn" time="10:00:05" msg="检测到沙箱隔离限制" />
                 <LogEntry type="success" time="10:00:06" msg="已通过 MessageListener 建立通讯桥接" />
                 <LogEntry type="warn" time="10:00:12" msg="文件大小超过 50MB" />
                 <LogEntry type="success" time="10:00:13" msg="Dexie.js 存储适配器已激活" />
                 <LogEntry type="info" time="10:00:15" msg="工作流引擎就绪，等待指令..." />
                 <div className="animate-pulse text-cyan-500">_</div>
              </div>
            </div>
            
            {/* 致敬 Automa */}
            <TiltCard className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-xl p-6 group">
               <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-white/5 rounded-lg text-white group-hover:text-cyan-400 transition-colors">
                     <GitBranch size={20} />
                  </div>
                  <span className="text-[10px] text-slate-600 border border-slate-800 px-2 py-0.5 rounded">OPEN_SOURCE</span>
               </div>
               <h3 className="font-bold text-white mb-2">Forked from Automa</h3>
               <p className="text-xs text-slate-400 leading-relaxed mb-4">
                 继承了 Drawflow 引擎与多线程 Worker 核心，以此为基石构建了企业级业务逻辑。
               </p>
               <button className="w-full py-2 text-xs font-bold text-slate-300 bg-slate-800 hover:bg-cyan-600 hover:text-white rounded transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-[0_0_15px_rgba(8,145,178,0.4)]">
                 <Share2 size={14} />
                 ACCESS_REPO
               </button>
            </TiltCard>

          </div>
        </div>

        {/* 底部创新模块 - 玻璃拟态 */}
        <section className="mt-12">
           <div className="flex items-center gap-3 mb-6">
              <Zap className="text-yellow-400" fill="currentColor" />
              <h2 className="text-xl font-bold text-white">INNOVATION_MATRIX</h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <InnovationCard 
                icon={Layout} 
                title="策略模式架构" 
                desc="TaskStrategy 抽象层配合多态实现，业务解耦度提升 70%。"
                tags={["Architecture", "Pattern"]}
              />
              <InnovationCard 
                icon={BrainIcon} 
                title="AI 文件分类" 
                desc="基于加权评分与贪心算法，文件自动识别率达到 95%。"
                tags={["Algorithm", "Smart"]}
              />
              <InnovationCard 
                icon={Database} 
                title="无限存储适配" 
                desc="突破浏览器沙箱限制，通过 IndexedDB 实现 GB 级数据持久化。"
                tags={["Storage", "Dexie"]}
              />
              <InnovationCard 
                icon={WorkflowIcon} 
                title="并发任务引擎" 
                desc="基于状态机 (FSM) 的任务队列，支持断点续传与错误自愈。"
                tags={["Queue", "Async"]}
              />
           </div>
        </section>

        {/* 页脚 */}
        <footer className="mt-16 border-t border-slate-800 pt-8 pb-4 text-center">
          <div className="flex justify-center gap-6 text-xs font-mono text-slate-600 mb-4">
             <span className="hover:text-cyan-500 cursor-pointer transition-colors">[ DOCS ]</span>
             <span className="hover:text-cyan-500 cursor-pointer transition-colors">[ CHANGELOG ]</span>
             <span className="hover:text-cyan-500 cursor-pointer transition-colors">[ ISSUES ]</span>
          </div>
          <p className="text-xs text-slate-700 font-mono">
            © {new Date().getFullYear()} {appInfo.author}. INTERNAL_SYSTEM_ONLY.
          </p>
        </footer>

      </div>
    </div>
  );
};

// --- 子组件 ---

const SkillTag = ({ label, level }) => (
  <div className="bg-slate-900 rounded p-2 border border-slate-800 flex flex-col gap-1">
    <div className="flex justify-between text-[10px] text-slate-400">
      <span>{label}</span>
      <span>{level}</span>
    </div>
    <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
       <div className="h-full bg-cyan-600 rounded-full" style={{ width: level }}></div>
    </div>
  </div>
);

const ResourceBar = ({ label, value, color, width, animate }) => (
  <div className="space-y-1">
     <div className="flex justify-between text-xs font-mono">
        <span className="text-slate-400">{label}</span>
        <span className="text-white">{value}</span>
     </div>
     <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full ${color} ${animate ? 'animate-pulse' : ''}`} 
          style={{ width: width || value }}
        ></div>
     </div>
  </div>
);

const LogEntry = ({ type, time, msg }) => {
  const colors = {
    info: "text-blue-400",
    warn: "text-yellow-400",
    success: "text-green-400",
    error: "text-red-400"
  };
  return (
    <div className="flex gap-2 text-[11px] hover:bg-white/5 p-0.5 rounded">
      <span className="text-slate-600 shrink-0">[{time}]</span>
      <span className={`${colors[type]} font-bold shrink-0`}>{type.toUpperCase()}:</span>
      <span className="truncate">{msg}</span>
    </div>
  );
};

const InnovationCard = ({ icon: Icon, title, desc, tags }) => (
  <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-xl hover:bg-slate-800/60 transition-all duration-300 group cursor-default">
     <div className="flex items-start justify-between mb-3">
        <div className="p-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-400 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-colors">
           <Icon size={20} />
        </div>
        <div className="flex gap-1">
           {tags.map((t, i) => <span key={i} className="text-[9px] bg-slate-800 text-slate-500 px-1.5 py-0.5 rounded border border-slate-700">{t}</span>)}
        </div>
     </div>
     <h3 className="font-bold text-slate-200 mb-2 group-hover:text-cyan-300 transition-colors">{title}</h3>
     <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
  </div>
);

// 自定义图标
const BrainIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>
);
const WorkflowIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/></svg>
);

const Badge = ({ text, color }) => (
  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border tracking-wide ${color} flex items-center justify-center`}>
    {text}
  </span>
);

export default App;