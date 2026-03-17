import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Star, Award, Flag, Search, MessageSquare, ChevronLeft, ChevronRight, X, Camera, CheckCircle, HelpCircle, Send, ChevronUp, ChevronDown } from 'lucide-react';

export const meta = {
  title: "博物馆游戏化学习",
  description: "博物馆互动游戏化学习体验，支持任务探索和知识问答",
  category: "展示",
};

// 添加全局样式
const globalStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes glowing {
    0% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.5); }
    50% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.8); }
    100% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.5); }
  }
  
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out forwards;
  }
  
  .animate-glowing {
    animation: glowing 2s infinite;
  }
  
  .bg-shimmer {
    background: linear-gradient(90deg, 
      rgba(255,255,255,0.03) 25%, 
      rgba(255,255,255,0.08) 50%, 
      rgba(255,255,255,0.03) 75%);
    background-size: 200% 100%;
    animation: shimmer 3s infinite;
  }
  
  .bg-gray-850 {
    background-color: #1a1c23;
  }
  
  .bg-gray-750 {
    background-color: #252836;
  }
  
  .bg-gray-650 {
    background-color: #2d303e;
  }
  
  .hover-scale {
    transition: transform 0.3s ease;
  }
  
  .hover-scale:hover {
    transform: scale(1.05);
  }
`;

// 模拟任务数据
const questsData: Quest[] = [
  {
    id: 1,
    title: '秦汉时期的军事武器',
    type: '史实探寻',
    description: '寻找并了解秦汉时期的军事武器，完成相关历史知识挑战。',
    points: 150,
    image: '',
    progress: 2,
    totalSteps: 5,
    difficulty: 'medium',
    location: '一楼西侧 兵器展厅',
    estimatedTime: '25分钟',
    completed: false,
    steps: [
      { 
        id: 1, 
        title: '找到一件弩机', 
        hint: '提示：位于兵器展厅第三个展柜，是秦朝攻城的主要远程武器。', 
        type: 'find',
        completed: true,
        capturedImages: []
      },
      { 
        id: 2, 
        title: '完成关于汉代戈的问答挑战', 
        hint: '认真阅读展示牌上的信息，了解其结构特点和使用方式。', 
        type: 'quiz',
        completed: true,
        quiz: {
          question: '汉代戈与长剑相比有什么特点？',
          options: [
            '更轻便，适合骑兵使用',
            '既可刺又可钩拉，使用更灵活',
            '全部由青铜制造，不含铁元素',
            '主要用于仪式，不用于实战'
          ],
          answer: 1
        }
      },
      { 
        id: 3, 
        title: '拍摄三种不同的秦汉兵器', 
        hint: '寻找剑、戈、矛三种不同类型的兵器并拍照记录。', 
        type: 'photo',
        completed: false,
        capturedImages: []
      },
      { 
        id: 4, 
        title: '了解陶俑兵器的历史', 
        hint: '找到兵马俑展区，使用DeepSeek向导询问兵马俑武器的制作工艺。', 
        type: 'conversation',
        completed: false
      },
      { 
        id: 5, 
        title: '完成秦汉兵器发展挑战', 
        hint: '将秦汉时期的四种主要兵器按照出现时间正确排序。', 
        type: 'arrange',
        completed: false,
        items: ['矛', '戈', '弩', '剑'],
        correctOrder: ['戈', '矛', '剑', '弩']
      }
    ]
  },
  {
    id: 2,
    title: '古代瓷器工艺探秘',
    type: '工艺解析',
    description: '探索中国古代瓷器的发展历程，了解不同朝代的制瓷工艺特点。',
    points: 200,
    image: '',
    progress: 0,
    totalSteps: 4,
    difficulty: 'hard',
    location: '二楼 瓷器馆',
    estimatedTime: '30分钟',
    completed: false,
    steps: []
  },
  {
    id: 3,
    title: '丝绸之路寻宝',
    type: '文化交流',
    description: '追寻丝绸之路的文化足迹，发现中西方文化交流的历史印记。',
    points: 120,
    image: '',
    progress: 4,
    totalSteps: 4,
    difficulty: 'easy',
    location: '一楼东侧 丝路文化展',
    estimatedTime: '20分钟',
    completed: true,
    steps: []
  }
] as const;

// 模拟用户数据
const userData = {
  id: 1,
  name: '小明',
  age: 12,
  avatar: '',
  level: 3,
  points: 580,
  completedQuests: 7,
  badges: [
    { id: 1, name: '历史探索者', icon: '🏺', description: '完成5个历史类任务' },
    { id: 2, name: '艺术鉴赏家', icon: '🎨', description: '识别10种不同风格的艺术品' }
  ],
  rank: 12,
  totalUsers: 156,
  friends: [
    { id: 1, name: '小红', avatar: '', level: 4, online: true },
    { id: 2, name: '小华', avatar: '', level: 2, online: false },
    { id: 3, name: '小李', avatar: '', level: 5, online: true },
  ]
};

// 排行榜数据
const leaderboardData = [
  { id: 1, name: '王思博', avatar: '', level: 8, points: 2450 },
  { id: 2, name: '李梦琪', avatar: '', level: 7, points: 1920 },
  { id: 3, name: '张天宇', avatar: '', level: 6, points: 1740 },
  { id: 4, name: '陈晓', avatar: '', level: 5, points: 1685 },
  { id: 5, name: '郑雨', avatar: '', level: 5, points: 1580 }
];

// 知识库简介
const knowledgeCategories = [
  { id: 1, title: '兵器与军事', icon: '⚔️', count: 24 },
  { id: 2, title: '陶瓷工艺', icon: '🏺', count: 31 },
  { id: 3, title: '书画艺术', icon: '🖌️', count: 28 },
  { id: 4, title: '古代文明', icon: '🏛️', count: 42 },
  { id: 5, title: '民俗文化', icon: '��', count: 19 }
];

// 定义步骤类型
interface BaseStep {
  id: number;
  title: string;
  hint: string;
  type: string;
  completed: boolean;
}

interface FindStep extends BaseStep {
  type: 'find';
  capturedImages: string[];
}

interface QuizStep extends BaseStep {
  type: 'quiz';
  quiz: {
    question: string;
    options: string[];
    answer: number;
  };
}

interface PhotoStep extends BaseStep {
  type: 'photo';
  capturedImages: string[];
}

interface ConversationStep extends BaseStep {
  type: 'conversation';
}

interface ArrangeStep extends BaseStep {
  type: 'arrange';
  items: string[];
  correctOrder: string[];
}

type Step = FindStep | QuizStep | PhotoStep | ConversationStep | ArrangeStep;

interface Quest {
  id: number;
  title: string;
  type: string;
  description: string;
  points: number;
  image: string;
  progress: number;
  totalSteps: number;
  difficulty: string;
  location: string;
  estimatedTime: string;
  completed: boolean;
  steps: Step[];
}

const MuseumGamifiedLearning: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'quests' | 'map' | 'knowledge' | 'profile'>('quests');
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [activeQuests, setActiveQuests] = useState<Quest[]>(questsData);
  const [currentStep, setCurrentStep] = useState<Step | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [aiAssistantActive, setAiAssistantActive] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [aiConversation, setAiConversation] = useState<Array<{role: string, content: string}>>([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [animatePoints, setAnimatePoints] = useState(false);
  
  // 效果：点击任务时的动画
  useEffect(() => {
    if (selectedQuest && currentStep && currentStep.completed) {
      setAnimatePoints(true);
      setTimeout(() => setAnimatePoints(false), 2000);
    }
  }, [selectedQuest, currentStep]);
  
  // 选择任务并显示详情
  const selectQuest = (quest: Quest) => {
    setSelectedQuest(quest);
    if (quest.steps && quest.steps.length > 0) {
      // 查找第一个未完成的步骤
      const nextStep = quest.steps.find(step => !step.completed);
      setCurrentStep(nextStep || quest.steps[0]);
    }
  };
  
  // 返回任务列表
  const backToQuests = () => {
    setSelectedQuest(null);
    setCurrentStep(null);
    setCameraActive(false);
    setShowHint(false);
    setAiAssistantActive(false);
  };
  
  // 显示下一个步骤
  const goToNextStep = () => {
    if (!selectedQuest || !currentStep) return;
    
    const currentIndex = selectedQuest.steps.findIndex(step => step.id === currentStep.id);
    if (currentIndex < selectedQuest.steps.length - 1) {
      setCurrentStep(selectedQuest.steps[currentIndex + 1]);
    }
  };
  
  // 显示上一个步骤
  const goToPrevStep = () => {
    if (!selectedQuest || !currentStep) return;
    
    const currentIndex = selectedQuest.steps.findIndex(step => step.id === currentStep.id);
    if (currentIndex > 0) {
      setCurrentStep(selectedQuest.steps[currentIndex - 1]);
    }
  };
  
  // 完成当前步骤
  const completeCurrentStep = () => {
    if (!selectedQuest || !currentStep) return;
    
    // 更新任务数据
    const updatedQuests = activeQuests.map(quest => {
      if (quest.id === selectedQuest.id) {
        const updatedSteps = quest.steps.map(step => {
          if (step.id === currentStep.id) {
            return { ...step, completed: true };
          }
          return step;
        });
        
        const newProgress = updatedSteps.filter(step => step.completed).length;
        const completed = newProgress === quest.totalSteps;
        
        return { 
          ...quest, 
          steps: updatedSteps,
          progress: newProgress,
          completed
        };
      }
      return quest;
    });
    
    setActiveQuests(updatedQuests);
    
    // 更新当前选中的任务
    const updatedQuest = updatedQuests.find(q => q.id === selectedQuest.id);
    if (updatedQuest) {
      setSelectedQuest(updatedQuest);
      
      // 更新当前步骤
      const updatedStep = updatedQuest.steps.find(s => s.id === currentStep.id);
      if (updatedStep) {
        setCurrentStep(updatedStep);
      }
    }
  };
  
  // 触发拍照功能
  const triggerCamera = () => {
    setCameraActive(true);
  };
  
  // 模拟拍照
  const capturePhoto = () => {
    if (!selectedQuest || !currentStep) return;
    
    // 模拟拍照动作，添加一张"照片"
    const updatedQuests = activeQuests.map(quest => {
      if (quest.id === selectedQuest.id) {
        const updatedSteps = quest.steps.map(step => {
          if (step.id === currentStep.id) {
            if (step.type === 'photo' || step.type === 'find') {
              const updatedImages = [...(step.capturedImages || []), `/api/placeholder/100/100?random=${Math.random()}`];
              const completed = updatedImages.length >= 3; // 假设需要3张照片
              
              return { 
                ...step, 
                capturedImages: updatedImages,
                completed
              };
            }
            return step;
          }
          return step;
        });
        
        const newProgress = updatedSteps.filter(step => step.completed).length;
        
        return { 
          ...quest, 
          steps: updatedSteps,
          progress: newProgress
        };
      }
      return quest;
    });
    
    setActiveQuests(updatedQuests);
    
    // 更新当前选中的任务
    const updatedQuest = updatedQuests.find(q => q.id === selectedQuest.id);
    if (!updatedQuest) return;
    setSelectedQuest(updatedQuest);
    
    // 更新当前步骤
    const updatedStep = updatedQuest.steps.find(s => s.id === currentStep.id);
    if (!updatedStep) return;
    setCurrentStep(updatedStep);
    
    // 如果拍够了照片，关闭相机
    if ((updatedStep.type === 'photo' || updatedStep.type === 'find') && updatedStep.capturedImages?.length >= 3) {
      setCameraActive(false);
    }
  };
  
  // 发送AI助手对话
  const sendToAiAssistant = () => {
    if (!aiInput.trim()) return;
    
    // 添加用户消息
    setAiConversation([
      ...aiConversation,
      { role: 'user', content: aiInput }
    ]);
    
    // 清空输入框
    setAiInput('');
    
    // 模拟AI回复
    setTimeout(() => {
      let response = '';
      
      if (aiInput.toLowerCase().includes('兵马俑') || aiInput.toLowerCase().includes('武器')) {
        response = '兵马俑的武器是采用真实武器的比例制作而成的。陶俑武器主要包括铜剑、铜戟、铜戈、铜弩、铜矛等。这些武器的制作工艺精湛，部分武器表面还涂有防锈的铬酸盐层，展现了秦朝先进的冶金技术。';
      } else if (aiInput.toLowerCase().includes('制作') || aiInput.toLowerCase().includes('工艺')) {
        response = '兵马俑武器的制作工艺分为多个步骤：首先冶炼合金，然后使用模具铸造武器基本形状，接着进行锻打和打磨，最后进行表面处理。秦朝已经掌握了精确的标准化生产技术，使得这些武器尺寸统一，便于大规模装备军队。';
      } else {
        response = '兵马俑是中国古代军阵墓葬的一部分，其中的武器装备反映了秦朝军事力量的强大。每种兵种的俑像都配备有相应的武器，例如步兵持有长戈和剑，弩兵配备弩机，骑兵则装备有更轻便的武器。您想了解关于兵马俑武器的哪些具体信息呢？';
      }
      
      // 添加AI回复
      setAiConversation([
        ...aiConversation,
        { role: 'user', content: aiInput },
        { role: 'assistant', content: response }
      ]);
      
      // 如果是对话类型任务且包含关键词，标记为完成
      if (
        selectedQuest && 
        currentStep && 
        currentStep.type === 'conversation' && 
        (aiInput.toLowerCase().includes('兵马俑') || aiInput.toLowerCase().includes('武器'))
      ) {
        completeCurrentStep();
      }
    }, 1000);
  };
  
  // 渲染任务列表项
  const renderQuestItem = (quest: Quest) => {
    return (
      <div 
        key={quest.id}
        className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-700 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl shadow-md"
        onClick={() => selectQuest(quest)}
      >
        <div className="relative h-32 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center">
          <div className="absolute top-2 right-2 bg-blue-600 text-xs px-2 py-1 rounded-full shadow-lg backdrop-blur-sm bg-opacity-80">
            {quest.points} 积分
          </div>
          <div className="text-4xl drop-shadow-md">
            {quest.type === '史实探寻' ? '⚔️' : 
             quest.type === '工艺解析' ? '🏺' : 
             '🎨'}
          </div>
          {quest.completed && (
            <div className="absolute inset-0 bg-green-900 bg-opacity-70 backdrop-blur-sm flex items-center justify-center">
              <CheckCircle size={40} className="text-green-400 drop-shadow-lg animate-pulse" />
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex justify-between mb-2">
            <h3 className="font-bold text-lg">{quest.title}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full shadow-sm ${
              quest.difficulty === 'easy' ? 'bg-gradient-to-r from-green-600 to-green-500' : 
              quest.difficulty === 'medium' ? 'bg-gradient-to-r from-yellow-600 to-yellow-500' : 
              'bg-gradient-to-r from-red-600 to-red-500'
            }`}>
              {quest.difficulty === 'easy' ? '简单' : 
               quest.difficulty === 'medium' ? '中等' : 
               '困难'}
            </span>
          </div>
          <p className="text-sm text-gray-400 mb-3 line-clamp-2">{quest.description}</p>
          <div className="flex items-center text-xs text-gray-300 mb-2">
            <MapPin size={12} className="mr-1" />
            <span className="mr-3">{quest.location}</span>
            <Clock size={12} className="mr-1" />
            <span>{quest.estimatedTime}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-2 rounded-full ${quest.completed ? 'bg-gradient-to-r from-green-500 to-emerald-400' : 'bg-gradient-to-r from-blue-600 to-indigo-500'}`} 
              style={{ width: `${(quest.progress / quest.totalSteps) * 100}%`, transition: 'width 0.5s ease-in-out' }}
            ></div>
          </div>
          <div className="flex justify-between text-xs mt-1 text-gray-400">
            <span>{quest.progress} / {quest.totalSteps}</span>
            <span>{Math.floor((quest.progress / quest.totalSteps) * 100)}%</span>
          </div>
        </div>
      </div>
    );
  };
  
  // 渲染任务列表页面
  const renderQuestsList = () => {
    return (
      <div className="flex-1 overflow-y-auto bg-gray-900 text-white">
        <div className="p-4 sticky top-0 bg-gradient-to-b from-gray-900 to-gray-900/95 backdrop-blur-sm z-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="bg-gradient-to-r from-blue-400 to-indigo-300 text-transparent bg-clip-text">探索挑战</span>
            <div className="ml-2 w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
          </h2>
          <div className="relative mb-4">
            <input 
              type="text" 
              placeholder="搜索挑战..." 
              className="w-full bg-gray-800 text-white py-3 px-4 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700 shadow-inner transition-all duration-300 focus:shadow-blue-500/20"
            />
            <Search size={18} className="absolute left-3 top-3.5 text-gray-400" />
          </div>
          
          <div className="flex overflow-x-auto pb-3 space-x-2">
            <button className="bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-500 hover:to-indigo-400 text-white px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
              全部
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 border border-gray-700">
              历史
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 border border-gray-700">
              艺术
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 border border-gray-700">
              科技
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 border border-gray-700">
              文化
            </button>
          </div>
        </div>
        
        <div className="p-4 space-y-4">
          {activeQuests.map((quest, index) => (
            <div key={quest.id} className="animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
              {renderQuestItem(quest)}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // 渲染相机界面
  const renderCamera = () => {
    return (
      <div className="flex flex-col h-full">
        <div className="bg-black flex-1 relative">
          {/* 相机预览区域 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full bg-gray-900 flex items-center justify-center">
              <Camera size={48} className="text-gray-600 animate-pulse" />
            </div>
          </div>
          
          {/* 相机控制界面 */}
          <div className="absolute inset-x-0 top-0 p-4 flex justify-between items-center bg-gradient-to-b from-black to-transparent">
            <button 
              className="p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
              onClick={() => setCameraActive(false)}
            >
              <X size={24} />
            </button>
            <div className="bg-black bg-opacity-50 px-4 py-2 rounded-full backdrop-blur-sm shadow-lg">
              <span className="text-sm">拍摄秦汉兵器照片 ({currentStep?.type === 'photo' ? (currentStep.capturedImages?.length || 0) : 0}/3)</span>
            </div>
          </div>
          
          {/* AR识别提示 */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-64 h-64 border-2 border-blue-400 rounded-lg border-dashed animate-pulse"></div>
              <div className="absolute -bottom-12 left-0 right-0 text-center">
                <span className="bg-black bg-opacity-50 px-4 py-2 rounded-full text-sm inline-block backdrop-blur-sm shadow-lg">
                  将兵器对准框内自动识别
                </span>
              </div>
            </div>
          </div>
          
          {/* 拍照按钮 */}
          <div className="absolute inset-x-0 bottom-0 p-8 flex justify-center bg-gradient-to-t from-black to-transparent">
            <button 
              className="w-16 h-16 rounded-full bg-white border-4 border-gray-800 hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 shadow-lg"
              onClick={capturePhoto}
            ></button>
          </div>
        </div>
      </div>
    );
  };
  
  // 渲染AI助手界面
  const renderAiAssistant = () => {
    return (
      <div className="flex flex-col h-full">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 flex items-center sticky top-0 z-10 shadow-md">
          <button 
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 mr-3 transition-all duration-300 hover:scale-110"
            onClick={() => setAiAssistantActive(false)}
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h2 className="font-bold text-lg">DeepSeek AI助手</h2>
            <p className="text-xs text-gray-400">专业解答历史文物问题</p>
          </div>
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-900 to-gray-950">
          <div className="bg-blue-500 bg-opacity-10 border border-blue-500 border-opacity-20 rounded-lg p-4 mb-4 shadow-inner">
            <p className="text-sm text-blue-200">
              {currentStep?.type === 'conversation' ? currentStep.hint : '有什么关于文物的问题想问我？'}
            </p>
          </div>
          
          {aiConversation.map((msg, idx) => (
            <div 
              key={idx}
              className={`mb-4 max-w-[75%] ${msg.role === 'user' ? 'ml-auto' : ''} animate-fadeIn`}
            >
              <div className={`p-4 rounded-lg shadow-md ${
                msg.role === 'user' 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white' 
                  : 'bg-gradient-to-r from-gray-700 to-gray-750 border border-gray-600'
              }`}>
                <p className="text-sm">{msg.content}</p>
              </div>
              <div className="text-xs text-gray-500 mt-1 ml-2">
                {msg.role === 'user' ? '刚刚' : '1分钟前'}
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 bg-gradient-to-r from-gray-800 to-gray-900 border-t border-gray-700 sticky bottom-0 shadow-lg">
          <div className="flex">
            <input 
              type="text"
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              placeholder="输入您的问题..."
              className="flex-1 bg-gray-700 text-white px-4 py-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-t border-b border-l border-gray-600"
            />
            <button 
              className="bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-500 hover:to-indigo-400 px-6 rounded-r-lg transition-all duration-300 flex items-center shadow-md hover:shadow-lg transform hover:scale-105"
              onClick={sendToAiAssistant}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  // 渲染地图页面
  const renderMap = () => {
    return (
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">探索地图</h2>
        <div className="bg-gray-800 rounded-lg overflow-hidden relative">
          <img src="/api/placeholder/800/600" alt="Museum Map" className="w-full" />
          
          {/* 标记点 */}
          <div className="absolute left-1/4 top-1/3">
            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center animate-pulse">
              <MapPin size={14} />
            </div>
          </div>
          
          <div className="absolute right-1/3 top-1/2">
            <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center">
              <CheckCircle size={14} />
            </div>
          </div>
          
          <div className="absolute left-1/2 bottom-1/4">
            <div className="w-6 h-6 rounded-full bg-yellow-600 flex items-center justify-center animate-ping">
              <Star size={14} />
            </div>
          </div>
          
          {/* 地图控制 */}
          <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
            <button className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
              <ChevronLeft size={24} />
            </button>
            <button className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
              +
            </button>
            <button className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
              -
            </button>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="font-semibold mb-2">附近的挑战</h3>
          <div className="space-y-2">
            {activeQuests.slice(0, 2).map(quest => (
              <div 
                key={quest.id}
                className="bg-gray-800 rounded-lg p-3 flex items-center"
                onClick={() => selectQuest(quest)}
              >
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-3">
                  <MapPin size={16} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{quest.title}</h4>
                  <p className="text-xs text-gray-400">{quest.location}</p>
                </div>
                <div className="text-sm text-gray-400">
                  <span>50米</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  // 渲染知识库页面
  const renderKnowledge = () => {
    return (
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">探索知识库</h2>
        <div className="relative mb-4">
          <input 
            type="text" 
            placeholder="搜索知识..." 
            className="w-full bg-gray-700 text-white py-2 px-4 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
          {knowledgeCategories.map(category => (
            <div 
              key={category.id}
              className="bg-gray-800 rounded-lg p-3 flex items-center"
            >
              <div className="text-2xl mr-2">{category.icon}</div>
              <div>
                <h3 className="font-medium text-sm">{category.title}</h3>
                <p className="text-xs text-gray-400">{category.count} 个知识点</p>
              </div>
            </div>
          ))}
        </div>
        
        <h3 className="font-semibold mb-2">最近学习</h3>
        <div className="space-y-3 mb-6">
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="flex justify-between mb-1">
              <h4 className="font-medium text-sm">青铜器铸造技术</h4>
              <span className="text-xs bg-blue-600 px-2 rounded-full">历史</span>
            </div>
            <p className="text-xs text-gray-400 mb-2">学习了中国古代失蜡法铸造青铜器的工艺流程。</p>
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">3小时前</span>
              <button className="text-blue-400">继续学习</button>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="flex justify-between mb-1">
              <h4 className="font-medium text-sm">丝绸之路与文化交流</h4>
              <span className="text-xs bg-green-600 px-2 rounded-full">文化</span>
            </div>
            <p className="text-xs text-gray-400 mb-2">了解了丝绸之路如何促进中西方文明交流。</p>
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">昨天</span>
              <button className="text-blue-400">继续学习</button>
            </div>
          </div>
        </div>
        
        <h3 className="font-semibold mb-2">推荐学习</h3>
        <div className="space-y-3">
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="flex justify-between mb-1">
              <h4 className="font-medium text-sm">唐代壁画与彩塑艺术</h4>
              <span className="text-xs bg-purple-600 px-2 rounded-full">艺术</span>
            </div>
            <p className="text-xs text-gray-400 mb-2">探索敦煌莫高窟的唐代艺术特色。</p>
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">10分钟</span>
              <button className="text-blue-400">开始学习</button>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="flex justify-between mb-1">
              <h4 className="font-medium text-sm">古代音乐乐器发展史</h4>
              <span className="text-xs bg-yellow-600 px-2 rounded-full">音乐</span>
            </div>
            <p className="text-xs text-gray-400 mb-2">从石器时代到明清时期的乐器演变。</p>
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">15分钟</span>
              <button className="text-blue-400">开始学习</button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // 渲染个人资料页面
  const renderProfile = () => {
    return (
      <div className="p-4">
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gray-700 overflow-hidden mr-4">
              <img src={userData.avatar} alt={userData.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="font-bold text-lg">{userData.name}</h2>
              <div className="flex items-center">
                <span className="bg-blue-600 text-xs px-2 py-0.5 rounded-full mr-2">Lv.{userData.level}</span>
                <span className="text-sm text-gray-300">{userData.age}岁</span>
              </div>
            </div>
            <button className="ml-auto bg-gray-700 px-3 py-1 rounded-lg text-sm">
              编辑
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-gray-700 rounded-lg p-3 flex flex-col items-center">
              <span className="text-xl font-bold">{userData.points}</span>
              <span className="text-xs text-gray-400">积分</span>
            </div>
            <div className="bg-gray-700 rounded-lg p-3 flex flex-col items-center">
              <span className="text-xl font-bold">{userData.completedQuests}</span>
              <span className="text-xs text-gray-400">完成任务</span>
            </div>
            <div className="bg-gray-700 rounded-lg p-3 flex flex-col items-center">
              <span className="text-xl font-bold">{userData.badges.length}</span>
              <span className="text-xs text-gray-400">徽章</span>
            </div>
          </div>
          
          <div className="flex justify-between">
            <button 
              className="bg-gray-700 px-3 py-2 rounded-lg text-sm flex items-center"
            >
              <Award size={16} className="mr-1" />
              我的徽章
            </button>
            <button 
              className="bg-gray-700 px-3 py-2 rounded-lg text-sm flex items-center"
              onClick={() => setShowLeaderboard(!showLeaderboard)}
            >
              <Flag size={16} className="mr-1" />
              排行榜
            </button>
          </div>
        </div>
        
        {showLeaderboard ? (
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">探索者排行榜</h3>
              <button 
                className="text-sm text-gray-400"
                onClick={() => setShowLeaderboard(false)}
              >
                关闭
              </button>
            </div>
            
            <div className="space-y-3">
              {leaderboardData.map((user, index) => (
                <div 
                  key={user.id}
                  className={`flex items-center p-2 rounded-lg ${index < 3 ? 'bg-gray-700' : ''}`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                    index === 0 ? 'bg-yellow-500' :
                    index === 1 ? 'bg-gray-400' :
                    index === 2 ? 'bg-yellow-700' : 'bg-gray-700'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden mr-3">
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{user.name}</h4>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-400 mr-2">Lv.{user.level}</span>
                      <span className="text-xs text-gray-400">{user.points} 积分</span>
                    </div>
                  </div>
                  {user.id === userData.id && (
                    <span className="bg-blue-600 text-xs px-2 py-0.5 rounded-full">你</span>
                  )}
                </div>
              ))}
              
              <div className="border-t border-gray-700 mt-2 pt-2">
                <div className="flex items-center p-2 rounded-lg bg-blue-900 bg-opacity-20">
                  <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center mr-3 flex-shrink-0">
                    {userData.rank}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden mr-3">
                    <img src={userData.avatar} alt={userData.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{userData.name}</h4>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-400 mr-2">Lv.{userData.level}</span>
                      <span className="text-xs text-gray-400">{userData.points} 积分</span>
                    </div>
                  </div>
                  <span className="bg-blue-600 text-xs px-2 py-0.5 rounded-full">你</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-3">我的徽章</h3>
            <div className="flex flex-wrap gap-3">
              {userData.badges.map(badge => (
                <div 
                  key={badge.id}
                  className="w-24 bg-gray-700 rounded-lg p-3 flex flex-col items-center"
                >
                  <div className="text-3xl mb-1">{badge.icon}</div>
                  <h4 className="text-xs font-medium text-center">{badge.name}</h4>
                </div>
              ))}
              <div className="w-24 bg-gray-700 bg-opacity-50 rounded-lg p-3 flex flex-col items-center border-2 border-dashed border-gray-600">
                <div className="text-3xl mb-1 text-gray-500">🔒</div>
                <h4 className="text-xs font-medium text-center text-gray-500">继续探索</h4>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="font-semibold mb-3">我的朋友</h3>
          <div className="space-y-2">
            {userData.friends.map(friend => (
              <div 
                key={friend.id}
                className="flex items-center p-2 rounded-lg hover:bg-gray-700"
              >
                <div className="relative mr-3">
                  <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
                    <img src={friend.avatar} alt={friend.name} className="w-full h-full object-cover" />
                  </div>
                  {friend.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-gray-800"></div>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium">{friend.name}</h4>
                  <span className="text-xs text-gray-400">Lv.{friend.level}</span>
                </div>
                <button className="text-sm text-blue-400">邀请</button>
              </div>
            ))}
            <button className="w-full bg-gray-700 p-2 rounded-lg text-sm">
              查找更多朋友
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  // 渲染任务详情页面
  const renderQuestDetail = () => {
    if (!selectedQuest) return null;
    
    return (
      <div className="flex flex-col h-screen bg-gray-900 text-white">
        {/* 任务标题和返回按钮 */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 flex items-start sticky top-0 z-10 shadow-md">
          <button 
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 mr-3 transition-all duration-300 hover:scale-110"
            onClick={backToQuests}
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex-1">
            <h2 className="font-bold text-xl mb-1">{selectedQuest.title}</h2>
            <p className="text-sm text-gray-400">{selectedQuest.description}</p>
          </div>
        </div>
        
        {/* 任务进度条 */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 pb-4 shadow-md">
          <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
            <div 
              className={`h-2.5 rounded-full transition-all duration-700 ease-in-out ${selectedQuest.completed ? 'bg-gradient-to-r from-green-500 to-emerald-400' : 'bg-gradient-to-r from-blue-600 to-indigo-500'}`} 
              style={{ width: `${(selectedQuest.progress / selectedQuest.totalSteps) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm mt-2 text-gray-400">
            <span>{selectedQuest.progress} / {selectedQuest.totalSteps} 完成</span>
            <span>{Math.floor((selectedQuest.progress / selectedQuest.totalSteps) * 100)}%</span>
          </div>
        </div>

        {/* 当前步骤内容 */}
        {currentStep && !cameraActive && !aiAssistantActive && (
          <div className="flex-1 overflow-y-auto p-4">
            <div className="bg-gradient-to-b from-gray-800 to-gray-850 rounded-lg p-4 mb-4 shadow-lg border border-gray-700">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-lg">{currentStep.title}</h3>
                {currentStep.completed ? (
                  <span className="bg-gradient-to-r from-green-500 to-emerald-400 text-white text-xs px-3 py-1 rounded-full shadow-sm animate-pulse">已完成</span>
                ) : (
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white text-xs px-3 py-1 rounded-full shadow-sm">进行中</span>
                )}
              </div>
              
              {/* 步骤内容 */}
              <div className="bg-gray-750 rounded-lg p-4 mb-4 shadow-inner border border-gray-700">
                {/* 根据不同步骤类型显示不同内容 */}
                {currentStep.type === 'find' && (
                  <div>
                    <p className="text-sm text-gray-300 mb-4">找到指定的文物，并使用AR眼镜进行识别。</p>
                    <button 
                      className={`w-full py-3 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        currentStep.completed 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-400 cursor-not-allowed shadow-md' 
                          : 'bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-500 hover:to-indigo-400 shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
                      }`}
                      onClick={() => !currentStep.completed && completeCurrentStep()}
                      disabled={currentStep.completed}
                    >
                      {currentStep.completed ? '已识别' : '我找到了，点击识别'}
                    </button>
                  </div>
                )}
                
                {currentStep.type === 'quiz' && currentStep.quiz && (
                  <div>
                    <p className="text-sm font-semibold mb-3">{currentStep.quiz.question}</p>
                    <div className="space-y-2 mb-4">
                      {currentStep.quiz.options.map((option, index) => (
                        <button 
                          key={index}
                          className={`w-full text-left p-3 rounded-lg text-sm transition-all duration-300 ${
                            currentStep.completed ? 
                              index === currentStep.quiz.answer ? 'bg-gradient-to-r from-green-500 to-emerald-400 shadow-md' : 'bg-gray-700' 
                              : 'bg-gray-700 hover:bg-gray-600 transform hover:scale-[1.01] hover:shadow-md'
                          }`}
                          onClick={() => !currentStep.completed && index === currentStep.quiz.answer && completeCurrentStep()}
                          disabled={currentStep.completed}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {currentStep.type === 'photo' && (
                  <div>
                    <p className="text-sm text-gray-300 mb-3">
                      {currentStep.capturedImages && currentStep.capturedImages.length > 0 ? 
                        `已拍摄 ${currentStep.capturedImages.length} / 3 张照片` : 
                        '请拍摄指定的展品照片'
                      }
                    </p>
                    
                    {currentStep.capturedImages && currentStep.capturedImages.length > 0 && (
                      <div className="flex space-x-2 mb-3 overflow-x-auto pb-2">
                        {currentStep.capturedImages.map((img, idx) => (
                          <div key={idx} className="w-20 h-20 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0 shadow-md transform hover:scale-105 transition-transform duration-300">
                            <img src={img} alt={`Captured ${idx+1}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <button 
                      className="bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-500 hover:to-indigo-400 w-full py-2 rounded-lg flex items-center justify-center mb-3 shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                      onClick={triggerCamera}
                      disabled={currentStep.completed}
                    >
                      <Camera size={18} className="mr-2" />
                      {currentStep.completed ? '已完成拍摄' : '打开相机'}
                    </button>
                  </div>
                )}
                
                {currentStep.type === 'conversation' && (
                  <div>
                    <p className="text-sm text-gray-300 mb-3">使用DeepSeek AI助手询问相关问题</p>
                    <button 
                      className="bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-500 hover:to-indigo-400 w-full py-2 rounded-lg flex items-center justify-center mb-3 shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                      onClick={() => setAiAssistantActive(true)}
                      disabled={currentStep.completed}
                    >
                      <MessageSquare size={18} className="mr-2" />
                      {currentStep.completed ? '对话已完成' : '打开AI助手'}
                    </button>
                  </div>
                )}
                
                {currentStep.type === 'arrange' && (
                  <div>
                    <p className="text-sm text-gray-300 mb-3">按照时间顺序排列以下兵器：</p>
                    <div className="space-y-2 mb-4">
                      {currentStep.items.map((item, index) => (
                        <div 
                          key={index}
                          className="bg-gray-700 p-3 rounded-lg flex justify-between items-center shadow-sm hover:shadow-md transition-all duration-300 border border-gray-600"
                        >
                          <span>{item}</span>
                          <div className="flex space-x-2">
                            <button className="p-1 bg-gray-600 hover:bg-gray-500 rounded-full transition-colors duration-300">
                              <ChevronUp size={16} />
                            </button>
                            <button className="p-1 bg-gray-600 hover:bg-gray-500 rounded-full transition-colors duration-300">
                              <ChevronDown size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button 
                      className="bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-500 hover:to-indigo-400 w-full py-2 rounded-lg flex items-center justify-center mb-3 shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                      onClick={() => !currentStep.completed && completeCurrentStep()}
                      disabled={currentStep.completed}
                    >
                      {currentStep.completed ? '已完成排序' : '确认排序'}
                    </button>
                  </div>
                )}
              </div>
              
              {/* 提示按钮 */}
              <div className="mt-4">
                <button 
                  className="text-yellow-400 hover:text-yellow-300 flex items-center text-sm transition-colors duration-300"
                  onClick={() => setShowHint(!showHint)}
                >
                  <HelpCircle size={16} className="mr-2" />
                  {showHint ? '隐藏提示' : '查看提示'}
                </button>
                
                {showHint && (
                  <div className="mt-3 p-4 bg-yellow-500 bg-opacity-10 border border-yellow-500 border-opacity-20 rounded-lg shadow-inner animate-fadeIn">
                    <p className="text-sm text-yellow-200">{currentStep.hint}</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* 步骤导航 */}
            <div className="flex justify-between mb-4">
              <button 
                className={`px-4 py-2 rounded-lg flex items-center transition-all duration-300 ${
                  selectedQuest.steps.findIndex(s => s.id === currentStep.id) > 0 
                    ? 'bg-gray-700 hover:bg-gray-600 shadow-md hover:shadow-lg transform hover:scale-105' 
                    : 'bg-gray-800 cursor-not-allowed opacity-50'
                }`}
                onClick={goToPrevStep}
                disabled={selectedQuest.steps.findIndex(s => s.id === currentStep.id) === 0}
              >
                <ChevronLeft size={18} className="mr-1" />
                上一步
              </button>
              <button 
                className={`px-4 py-2 rounded-lg flex items-center transition-all duration-300 ${
                  selectedQuest.steps.findIndex(s => s.id === currentStep.id) < selectedQuest.steps.length - 1 
                    ? 'bg-gray-700 hover:bg-gray-600 shadow-md hover:shadow-lg transform hover:scale-105' 
                    : 'bg-gray-800 cursor-not-allowed opacity-50'
                }`}
                onClick={goToNextStep}
                disabled={selectedQuest.steps.findIndex(s => s.id === currentStep.id) === selectedQuest.steps.length - 1}
              >
                下一步
                <ChevronRight size={18} className="ml-1" />
              </button>
            </div>
            
            {/* 所有步骤列表 */}
            <div className="bg-gradient-to-b from-gray-800 to-gray-850 rounded-lg p-4 shadow-lg border border-gray-700">
              <h3 className="font-semibold text-lg mb-4">任务进度</h3>
              <div className="space-y-2">
                {selectedQuest.steps.map(step => (
                  <div 
                    key={step.id}
                    className={`p-4 rounded-lg flex items-center cursor-pointer transition-all duration-300 ${
                      currentStep.id === step.id 
                        ? 'bg-blue-500 bg-opacity-20 border border-blue-500 border-opacity-30 shadow-md' 
                        : 'bg-gray-700 hover:bg-gray-650 border border-gray-600 hover:border-gray-500 transform hover:scale-[1.01]'
                    }`}
                    onClick={() => setCurrentStep(step)}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 transition-colors duration-300 shadow-md ${
                      step.completed ? 'bg-gradient-to-r from-green-500 to-emerald-400' : 'bg-gray-600'
                    }`}>
                      {step.completed ? 
                        <CheckCircle size={16} className="text-white" /> : 
                        <span>{selectedQuest.steps.findIndex(s => s.id === step.id) + 1}</span>
                      }
                    </div>
                    <div className="flex-1">
                      <h4 className={`text-sm ${step.completed ? 'line-through text-gray-400' : ''}`}>
                        {step.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 相机界面 */}
        {cameraActive && (
          <div className="flex-1 bg-black">
            {renderCamera()}
          </div>
        )}

        {/* AI助手界面 */}
        {aiAssistantActive && (
          <div className="flex-1 bg-gray-900">
            {renderAiAssistant()}
          </div>
        )}
      </div>
    );
  };

  // 渲染主界面
  const renderMainContent = () => {
    switch (activeTab) {
      case 'quests':
        return renderQuestsList();
      case 'map':
        return renderMap();
      case 'knowledge':
        return renderKnowledge();
      case 'profile':
        return renderProfile();
      default:
        return renderQuestsList();
    }
  };

  // 底部导航栏
  const renderBottomNav = () => {
    return (
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-t border-gray-700 flex justify-around items-center p-2 shadow-lg">
        <button 
          className={`flex flex-col items-center p-2 rounded-lg transition-all duration-300 ${activeTab === 'quests' ? 'text-blue-400 bg-gray-700 bg-opacity-50 transform scale-110' : 'text-gray-400 hover:text-gray-300'}`}
          onClick={() => setActiveTab('quests')}
        >
          <Flag size={20} className={activeTab === 'quests' ? 'animate-pulse' : ''} />
          <span className="text-xs mt-1">任务</span>
        </button>
        <button 
          className={`flex flex-col items-center p-2 rounded-lg transition-all duration-300 ${activeTab === 'map' ? 'text-blue-400 bg-gray-700 bg-opacity-50 transform scale-110' : 'text-gray-400 hover:text-gray-300'}`}
          onClick={() => setActiveTab('map')}
        >
          <MapPin size={20} className={activeTab === 'map' ? 'animate-pulse' : ''} />
          <span className="text-xs mt-1">地图</span>
        </button>
        <button 
          className={`flex flex-col items-center p-2 rounded-lg transition-all duration-300 ${activeTab === 'knowledge' ? 'text-blue-400 bg-gray-700 bg-opacity-50 transform scale-110' : 'text-gray-400 hover:text-gray-300'}`}
          onClick={() => setActiveTab('knowledge')}
        >
          <Star size={20} className={activeTab === 'knowledge' ? 'animate-pulse' : ''} />
          <span className="text-xs mt-1">知识库</span>
        </button>
        <button 
          className={`flex flex-col items-center p-2 rounded-lg transition-all duration-300 ${activeTab === 'profile' ? 'text-blue-400 bg-gray-700 bg-opacity-50 transform scale-110' : 'text-gray-400 hover:text-gray-300'}`}
          onClick={() => setActiveTab('profile')}
        >
          <Award size={20} className={activeTab === 'profile' ? 'animate-pulse' : ''} />
          <span className="text-xs mt-1">我的</span>
        </button>
      </div>
    );
  };

  return (
    <>
      <style>{globalStyles}</style>
      <div className="flex flex-col h-screen bg-gray-900 text-white">
        {selectedQuest ? (
          // 任务详情页面
          renderQuestDetail()
        ) : (
          <>
            {/* 主界面 */}
            {renderMainContent()}
            {/* 底部导航 */}
            {renderBottomNav()}
          </>
        )}
        
        {/* 积分动画 */}
        {animatePoints && (
          <div className="fixed top-4 right-4 bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-4 py-2 rounded-lg shadow-xl animate-bounce z-50 flex items-center animate-glowing">
            <Star size={16} className="mr-2 animate-spin" />
            +{selectedQuest?.points} 积分
          </div>
        )}
      </div>
    </>
  );
};

export default MuseumGamifiedLearning;
