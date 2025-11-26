import { useState, useEffect, useRef } from 'react';
import {
  Terminal, Cpu, Layers, GitBranch,
  Database, Zap, Layout, Share2,
  Activity, Box, FileCode,
  Wifi, Clock, TrendingUp,
  CheckCircle2, ArrowRight,
  Repeat, Target, Sparkles, MousePointer,
  Timer, Rocket, Users, BarChart3, Download,
  History, ChevronDown, ChevronUp, Tag, Wrench, Bug, BookOpen, Flag
} from 'lucide-react';
import { ChangelogData, VersionInfo, ChangeItem, CHANGELOG_JSON_PATH } from './changelog.config';

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

// --- 辅助组件：动态计数器 ---
const AnimatedCounter = ({ end, suffix = "", duration = 2000, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          setTimeout(() => {
            let start = 0;
            const step = end / (duration / 16);
            const timer = setInterval(() => {
              start += step;
              if (start >= end) {
                setCount(end);
                clearInterval(timer);
              } else {
                setCount(Math.floor(start));
              }
            }, 16);
          }, delay);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, delay, started]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// --- 主应用组件 ---
const App = () => {
  const [mounted, setMounted] = useState(false);
  const [bootSequence, setBootSequence] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeCompare, setActiveCompare] = useState<'manual' | 'auto'>('manual');

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
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // 自动切换对比模式
  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setActiveCompare(prev => prev === 'manual' ? 'auto' : 'manual');
    }, 4000);
    return () => clearInterval(interval);
  }, [mounted]);

  const appInfo = {
    name: "CC-Extension",
    description: "CPMS 网页自动化流程工具 // 告别繁琐，效率拉满",
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

  const efficiencyData = [
    {
      task: "设计交底",
      manual: { steps: 16, time: "1分26秒" },
      auto: { steps: 8, time: "31秒" },
      multiTask: "每增1任务仅+1步"
    },
    {
      task: "设计勘察",
      manual: { steps: 7, time: "35秒" },
      auto: { steps: 5, time: "12秒" },
      multiTask: "双任务仅需24秒"
    },
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
             <p>{'>'} INITIALIZING_CC_EXTENSION...</p>
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
          <div className="absolute -bottom-[1px] left-0 w-1/3 h-[1px] bg-gradient-to-r from-cyan-500 to-transparent"></div>

          <div className="relative">
            <div className="flex items-center gap-2 text-[10px] font-bold text-cyan-500 mb-2 tracking-[0.2em] uppercase">
              <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
              AUTOMATION_CONSOLE // V{appInfo.version}
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-2 flex flex-wrap gap-x-4">
              <span>CC-</span>
              <DecryptText text="EXTENSION" className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600" />
            </h1>
            <div className="flex items-center gap-2 text-slate-400 text-sm md:text-base mt-4 bg-slate-900/50 w-fit px-4 py-2 rounded-r-full border-l-2 border-cyan-500">
              <Terminal size={16} className="text-cyan-500" />
              <span className="text-cyan-400 mr-2">root@cpms:~$</span>
              <span className="typing-effect">网页自动化流程工具 // 效率拉满</span>
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

        {/* 产品截图展示区 - 新增 */}
        <section className="mb-12">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
              {/* 浏览器标题栏模拟 */}
              <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors cursor-pointer"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-400 transition-colors cursor-pointer"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-400 transition-colors cursor-pointer"></div>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-slate-800 rounded-lg px-4 py-1.5 text-xs text-slate-400 flex items-center gap-2 max-w-md w-full">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>CPMS 工作平台 - 自动化任务管理与执行</span>
                  </div>
                </div>
                <div className="w-16"></div>
              </div>

              {/* 截图展示 */}
              <div className="relative">
                <img
                  src="/cc-extension.png"
                  alt="CC-Extension 工作平台界面"
                  className="w-full h-auto"
                />
                {/* 悬浮标注 */}
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm border border-cyan-500/30 rounded-lg px-3 py-2 text-xs">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <Sparkles size={14} />
                    <span>智能任务队列</span>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm border border-emerald-500/30 rounded-lg px-3 py-2 text-xs">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Rocket size={14} />
                    <span>一键批量执行</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 截图说明与下载按钮 */}
          <div className="mt-6 text-center space-y-4">
            <p className="text-slate-500 text-sm">
              ↑ CC-Extension 主界面 - 支持多任务并行处理，智能识别文件类型
            </p>
            {/* 下载按钮 */}
            <a
              href="https://drive.weixin.qq.com/s?k=AHsA5QeVABExQe0GK5"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white font-bold rounded-xl hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500 transition-all duration-300 shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] hover:scale-105 transform"
            >
              <Download size={24} />
              <span className="text-lg">立即下载 CC-Extension</span>
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">免费</span>
            </a>
          </div>
        </section>

        {/* 核心价值主张 - 新增 */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-slate-800 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                告别繁琐操作，<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">效率成倍提升</span>
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                使用 CC-Extension 网页自动化工具，让宝贵的人力资源从繁琐事务中解放出来，
                聚焦于更具创造性、战略性和高价值的核心任务。
              </p>
            </div>

            {/* 核心数据展示 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-black text-cyan-400 mb-2">
                  <AnimatedCounter end={50} suffix="%" />
                </div>
                <div className="text-sm text-slate-400">步骤减少</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-black text-emerald-400 mb-2">
                  <AnimatedCounter end={33} suffix="%" delay={200} />
                </div>
                <div className="text-sm text-slate-400">效率提升</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-black text-purple-400 mb-2">
                  <AnimatedCounter end={95} suffix="%" delay={400} />
                </div>
                <div className="text-sm text-slate-400">文件识别率</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-black text-orange-400 mb-2">
                  ∞
                </div>
                <div className="text-sm text-slate-400">并行任务数</div>
              </div>
            </div>
          </div>
        </section>

        {/* 效率对比展示 - 新增 */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="text-cyan-400" />
            <h2 className="text-xl font-bold text-white">EFFICIENCY_COMPARISON</h2>
            <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">效率对比</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {efficiencyData.map((item, idx) => (
              <div key={idx} className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
                <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
                  <span className="font-bold text-white">{item.task}</span>
                  <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                    {item.multiTask}
                  </span>
                </div>
                <div className="p-4 space-y-4">
                  {/* 手动操作 */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400 flex items-center gap-2">
                        <MousePointer size={14} className="text-red-400" />
                        手动操作
                      </span>
                      <span className="text-red-400">{item.manual.steps} 步 / {item.manual.time}</span>
                    </div>
                    <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-1000"
                        style={{ width: '100%' }}
                      ></div>
                    </div>
                  </div>

                  {/* 自动化操作 */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400 flex items-center gap-2">
                        <Zap size={14} className="text-emerald-400" />
                        CC-Extension
                      </span>
                      <span className="text-emerald-400">{item.auto.steps} 步 / {item.auto.time}</span>
                    </div>
                    <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all duration-1000"
                        style={{ width: `${(item.auto.steps / item.manual.steps) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 流程对比动画 - 新增 */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Repeat className="text-purple-400" />
            <h2 className="text-xl font-bold text-white">WORKFLOW_COMPARISON</h2>
            <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">流程对比</span>
          </div>

          <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6">
            {/* 切换按钮 */}
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={() => setActiveCompare('manual')}
                className={`px-6 py-2 rounded-lg font-bold text-sm transition-all duration-300 flex items-center gap-2 ${
                  activeCompare === 'manual'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                    : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600'
                }`}
              >
                <MousePointer size={16} />
                传统手动操作
              </button>
              <button
                onClick={() => setActiveCompare('auto')}
                className={`px-6 py-2 rounded-lg font-bold text-sm transition-all duration-300 flex items-center gap-2 ${
                  activeCompare === 'auto'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                    : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600'
                }`}
              >
                <Zap size={16} />
                CC-Extension 自动化
              </button>
            </div>

            {/* 流程展示 */}
            <div className="relative">
              {activeCompare === 'manual' ? (
                <div className="space-y-3 animate-fadeIn">
                  <div className="text-sm text-slate-500 mb-4 text-center">设计交底流程 - 手动操作 (16步)</div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['搜索待办', '选择待办', '点击上传', '选择附件类型', '选择任务', '选择文件', '点击加号', '选择类型', '选择任务', '选择文件', '勾选确认', '选择时间', '输入人员', '点击提交', '选择审核人', '完成'].map((step, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg text-xs text-red-300"
                        style={{ animationDelay: `${i * 100}ms` }}
                      >
                        <span className="w-5 h-5 bg-red-500/20 rounded-full flex items-center justify-center text-red-400 font-bold">{i + 1}</span>
                        {step}
                        {i < 15 && <ArrowRight size={12} className="text-red-500/50" />}
                      </div>
                    ))}
                  </div>
                  <div className="text-center mt-6 text-red-400 font-mono">
                    <Timer className="inline mr-2" size={16} />
                    预计耗时: 1分26秒
                  </div>
                </div>
              ) : (
                <div className="space-y-3 animate-fadeIn">
                  <div className="text-sm text-slate-500 mb-4 text-center">设计交底流程 - 自动化 (8步)</div>
                  <div className="flex flex-wrap justify-center gap-3">
                    {['选择流程类型', '选择任务', '任务配置', '上传文件', '输入参会人员', '选择时间', '选择审批人', '保存提交'].map((step, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 rounded-lg text-sm text-emerald-300"
                        style={{ animationDelay: `${i * 150}ms` }}
                      >
                        <span className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 font-bold">{i + 1}</span>
                        {step}
                        {i < 7 && <ArrowRight size={14} className="text-emerald-500/50" />}
                      </div>
                    ))}
                  </div>
                  <div className="text-center mt-6 text-emerald-400 font-mono">
                    <Rocket className="inline mr-2" size={16} />
                    预计耗时: 31秒 | 多任务同时进行，每多一个仅+1步！
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 主要内容布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* 左侧：核心信息流 */}
          <div className="lg:col-span-8 space-y-8">

            {/* 统计数据 */}
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

            {/* 作者身份卡 */}
            <section className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-slate-950 border border-slate-800 p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-center md:items-start gap-8">

                {/* 头像区域 */}
                <div className="relative shrink-0">
                   <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-cyan-500/30 bg-slate-900 relative overflow-hidden group-hover:border-cyan-500/50 transition-colors shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                      <img
                        src="/myself.jpg"
                        alt="洪浩东"
                        className="w-full h-full object-cover object-center"
                      />
                      {/* 扫描线动画 */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.5)] animate-[scan_2s_linear_infinite]"></div>
                      {/* 悬停遮罩 */}
                      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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

            {/* 实时资源监控 */}
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

            {/* 核心优势卡片 - 新增 */}
            <div className="bg-gradient-to-b from-cyan-950/30 to-slate-950 border border-cyan-500/20 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4 text-xs font-bold text-cyan-500 uppercase tracking-wider">
                 <Target size={14} />
                 Core_Advantages
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-2 bg-slate-900/50 rounded-lg">
                  <CheckCircle2 size={18} className="text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-sm font-bold text-white">多任务并行</div>
                    <div className="text-xs text-slate-400">批量处理，效率成倍增长</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-2 bg-slate-900/50 rounded-lg">
                  <CheckCircle2 size={18} className="text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-sm font-bold text-white">智能文件识别</div>
                    <div className="text-xs text-slate-400">95%准确率自动分类</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-2 bg-slate-900/50 rounded-lg">
                  <CheckCircle2 size={18} className="text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-sm font-bold text-white">一键批量提交</div>
                    <div className="text-xs text-slate-400">告别重复操作</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-2 bg-slate-900/50 rounded-lg">
                  <CheckCircle2 size={18} className="text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-sm font-bold text-white">断点续传</div>
                    <div className="text-xs text-slate-400">错误自愈，稳定可靠</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 技术难点终端 */}
            <div className="bg-black border border-slate-800 rounded-xl overflow-hidden font-mono text-xs shadow-2xl relative">
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

        {/* 底部创新模块 */}
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

        {/* 更新日志展示 */}
        <ChangelogSection />

        {/* 用户价值总结 - 新增 */}
        <section className="mt-12">
          <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
            <div className="max-w-3xl mx-auto">
              <Users className="mx-auto mb-4 text-cyan-400" size={40} />
              <h3 className="text-2xl font-bold text-white mb-4">
                为什么选择 CC-Extension？
              </h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                CC-Extension 网页自动化工具，确实能显著提高整体工作效率。
                这不仅意味着我们可以用<span className="text-cyan-400 font-bold">更少的时间完成重复性工作</span>，
                更重要的是，它使得<span className="text-emerald-400 font-bold">宝贵的人力资源能够从繁琐事务中解放出来</span>，
                聚焦于更具创造性、战略性和高价值的核心任务上，
                从而为业务带来<span className="text-purple-400 font-bold">突破性的增长</span>。
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm mb-8">
                <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full">
                  <Clock size={16} className="text-cyan-400" />
                  <span className="text-slate-300">节省时间</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full">
                  <TrendingUp size={16} className="text-emerald-400" />
                  <span className="text-slate-300">提升效率</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full">
                  <Sparkles size={16} className="text-purple-400" />
                  <span className="text-slate-300">解放生产力</span>
                </div>
              </div>
              {/* 底部下载按钮 */}
              <a
                href="https://drive.weixin.qq.com/s?k=AHsA5QeVABEERNiaGL"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-xl hover:from-emerald-400 hover:to-cyan-400 transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_40px_rgba(16,185,129,0.6)] hover:scale-105 transform"
              >
                <Download size={24} />
                <span className="text-lg">开始使用 CC-Extension</span>
                <ArrowRight size={20} />
              </a>
            </div>
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

      {/* 自定义动画样式 */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        @keyframes loading {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

// --- 更新日志组件 ---
const ChangelogSection = () => {
  const [changelogData, setChangelogData] = useState<ChangelogData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedVersions, setExpandedVersions] = useState<string[]>([]);
  const [showAllVersions, setShowAllVersions] = useState(false);

  // 从 JSON 文件加载数据
  useEffect(() => {
    fetch(CHANGELOG_JSON_PATH)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load changelog');
        return res.json();
      })
      .then((data: ChangelogData) => {
        setChangelogData(data);
        // 默认展开最新版本
        if (data.versions.length > 0) {
          setExpandedVersions([data.versions[0].version]);
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const toggleVersion = (version: string) => {
    setExpandedVersions(prev =>
      prev.includes(version)
        ? prev.filter(v => v !== version)
        : [...prev, version]
    );
  };

  if (loading) {
    return (
      <section className="mt-12">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full"></div>
          <span className="ml-3 text-slate-400">加载更新日志...</span>
        </div>
      </section>
    );
  }

  if (error || !changelogData) {
    return (
      <section className="mt-12">
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
          <Bug className="mx-auto mb-2 text-red-400" size={24} />
          <p className="text-red-400">加载更新日志失败: {error}</p>
        </div>
      </section>
    );
  }

  const displayVersions = showAllVersions
    ? changelogData.versions
    : changelogData.versions.slice(0, 3);

  return (
    <section className="mt-12">
      <div className="flex items-center gap-3 mb-6">
        <History className="text-cyan-400" />
        <h2 className="text-xl font-bold text-white">CHANGELOG_HISTORY</h2>
        <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">更新日志</span>
        <span className="text-xs text-cyan-500/60 ml-auto">v{changelogData.currentVersion}</span>
      </div>

      {/* 统计总览 */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Tag size={16} className="text-cyan-400" />
            <span className="text-xs text-slate-400">版本数</span>
          </div>
          <div className="text-2xl font-bold text-cyan-400">{changelogData.statistics.totalVersions}</div>
        </div>
        <div className="bg-slate-900/50 border border-emerald-500/20 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles size={16} className="text-emerald-400" />
            <span className="text-xs text-slate-400">新增功能</span>
          </div>
          <div className="text-2xl font-bold text-emerald-400">{changelogData.statistics.totalFeatures}</div>
        </div>
        <div className="bg-slate-900/50 border border-red-500/20 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Bug size={16} className="text-red-400" />
            <span className="text-xs text-slate-400">Bug 修复</span>
          </div>
          <div className="text-2xl font-bold text-red-400">{changelogData.statistics.totalFixes}</div>
        </div>
        <div className="bg-slate-900/50 border border-blue-500/20 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Wrench size={16} className="text-blue-400" />
            <span className="text-xs text-slate-400">功能改进</span>
          </div>
          <div className="text-2xl font-bold text-blue-400">{changelogData.statistics.totalImprovements}</div>
        </div>
      </div>

      {/* 版本列表 */}
      <div className="space-y-4">
        {displayVersions.map((version, idx) => (
          <VersionCard
            key={version.version}
            version={version}
            isExpanded={expandedVersions.includes(version.version)}
            onToggle={() => toggleVersion(version.version)}
            isLatest={idx === 0}
          />
        ))}
      </div>

      {/* 展开/收起按钮 */}
      {changelogData.versions.length > 3 && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowAllVersions(!showAllVersions)}
            className="inline-flex items-center gap-2 px-6 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-sm text-slate-300 transition-all duration-300"
          >
            {showAllVersions ? (
              <>
                <ChevronUp size={16} />
                收起历史版本
              </>
            ) : (
              <>
                <ChevronDown size={16} />
                查看全部 {changelogData.versions.length} 个版本
              </>
            )}
          </button>
        </div>
      )}

      {/* 里程碑 */}
      <div className="mt-8 bg-slate-900/30 border border-slate-800 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Flag size={16} className="text-purple-400" />
          <h3 className="text-sm font-bold text-white">项目里程碑</h3>
        </div>
        <div className="relative">
          <div className="absolute left-2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-cyan-500 to-emerald-500"></div>
          <div className="space-y-3 pl-8">
            {changelogData.milestones.slice().reverse().map((milestone) => (
              <div key={milestone.version} className="relative">
                <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-slate-900 border-2 border-cyan-500"></div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">{milestone.version}</span>
                  <span className="text-sm font-medium text-white">{milestone.title}</span>
                  <span className="text-xs text-slate-500">- {milestone.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// 版本卡片组件
const VersionCard = ({ version, isExpanded, onToggle, isLatest }: {
  version: VersionInfo;
  isExpanded: boolean;
  onToggle: () => void;
  isLatest: boolean;
}) => {
  // 格式化日期范围显示
  const dateDisplay = version.endDate
    ? `${version.date} ~ ${version.endDate}`
    : version.date;

  return (
    <div className={`bg-slate-900/50 border rounded-xl overflow-hidden transition-all duration-300 ${
      isLatest ? 'border-cyan-500/50' : 'border-slate-800'
    }`}>
      {/* 版本头部 */}
      <button
        onClick={onToggle}
        className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors"
      >
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Tag size={16} className={isLatest ? 'text-cyan-400' : 'text-slate-500'} />
            <span className={`font-bold font-mono ${isLatest ? 'text-cyan-400' : 'text-white'}`}>
              v{version.version}
            </span>
            {isLatest && (
              <span className="text-[10px] bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-500/30">
                LATEST
              </span>
            )}
          </div>
          <span className="text-xs text-slate-500">{dateDisplay}</span>
          {version.milestone && (
            <span className="text-[10px] bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded border border-purple-500/20">
              {version.milestone}
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs">
            {version.features && version.features.length > 0 && (
              <span className="flex items-center gap-1 text-emerald-400">
                <Sparkles size={12} />
                {version.features.length}
              </span>
            )}
            {version.fixes && version.fixes.length > 0 && (
              <span className="flex items-center gap-1 text-red-400">
                <Bug size={12} />
                {version.fixes.length}
              </span>
            )}
            {version.improvements && version.improvements.length > 0 && (
              <span className="flex items-center gap-1 text-blue-400">
                <Wrench size={12} />
                {version.improvements.length}
              </span>
            )}
            {version.docs && version.docs.length > 0 && (
              <span className="flex items-center gap-1 text-purple-400">
                <BookOpen size={12} />
                {version.docs.length}
              </span>
            )}
          </div>
          {isExpanded ? (
            <ChevronUp size={18} className="text-slate-500" />
          ) : (
            <ChevronDown size={18} className="text-slate-500" />
          )}
        </div>
      </button>

      {/* 版本详情 */}
      {isExpanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-slate-800 pt-4 animate-fadeIn">
          {version.features && version.features.length > 0 && (
            <ChangeCategory
              icon={Sparkles}
              title="新增功能"
              items={version.features}
              color="emerald"
            />
          )}
          {version.fixes && version.fixes.length > 0 && (
            <ChangeCategory
              icon={Bug}
              title="Bug 修复"
              items={version.fixes}
              color="red"
            />
          )}
          {version.improvements && version.improvements.length > 0 && (
            <ChangeCategory
              icon={Wrench}
              title="功能改进"
              items={version.improvements}
              color="blue"
            />
          )}
          {version.docs && version.docs.length > 0 && (
            <ChangeCategory
              icon={BookOpen}
              title="文档更新"
              items={version.docs}
              color="purple"
            />
          )}
        </div>
      )}
    </div>
  );
};

// 变更分类组件
const ChangeCategory = ({ icon: Icon, title, items, color }: {
  icon: any;
  title: string;
  items: ChangeItem[];
  color: 'emerald' | 'red' | 'blue' | 'purple';
}) => {
  const colorClasses = {
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    red: 'text-red-400 bg-red-500/10 border-red-500/20',
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  };

  const dotColors = {
    emerald: 'bg-emerald-500',
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
  };

  return (
    <div>
      <div className={`inline-flex items-center gap-2 px-2 py-1 rounded text-xs font-bold mb-2 ${colorClasses[color]}`}>
        <Icon size={12} />
        {title}
      </div>
      <ul className="space-y-2 pl-4">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm">
            <span className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${dotColors[color]}`}></span>
            <div>
              <span className="text-slate-200 font-medium">{item.title}</span>
              {item.description && (
                <span className="text-slate-500 ml-2">- {item.description}</span>
              )}
            </div>
          </li>
        ))}
      </ul>
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
