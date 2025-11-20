import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const meta = {
  title: "青年员工AI赋能提升汇报",
  description: "青年员工如何利用AI赋能提升 - 从个人成长到组织共赢",
  isHidden: false,
  category: "演示",
  order: 100
};

const slides = [
  // 第1页：标题页
  {
    id: 1,
    type: 'title',
    title: '青年员工如何利用AI赋能提升',
    subtitle: '从个人成长到组织共赢',
    footer: '第九组 / 汇报人 / 2025年',
    bgGradient: 'from-blue-600 to-purple-600'
  },
  // 第2页：汇报整体框架
  {
    id: 2,
    type: 'content',
    title: '汇报整体框架',
    content: [
      { num: '01', text: '引言', desc: '从"AI会取代谁"到"AI成为职场超能力"' },
      { num: '02', text: '青年群体AI使用行为', desc: '数字原住民的智能化生活新常态' },
      { num: '03', text: 'AI发展全景分析', desc: '站在爆发的临界点，把握红利窗口' },
      { num: '04', text: '青年在AI时代的坐标', desc: '从使用者到架构师的成长路径' },
      { num: '05', text: '场景应用与行动指南', desc: '从认知到实践的转化' }
    ],
    bgGradient: 'from-slate-50 to-slate-100'
  },
  // 第3页：引言
  {
    id: 3,
    type: 'quote',
    title: '引言',
    quote: '当"AI 会取代谁"的问号还在热搜上徘徊，一群 95 后、00 后的青年员工已经悄悄把问号拉直，变成了感叹号',
    highlights: [
      '让 AI 写文案、跑数据、做设计',
      '把加班到凌晨的周报压缩到一杯咖啡的工夫',
      '让最年轻的脑回路遇上最火热的大模型'
    ],
    bgGradient: 'from-indigo-50 to-blue-50'
  },
  // 第4页：青年群体AI使用行为
  {
    id: 4,
    type: 'data',
    title: '青年群体AI使用行为',
    subtitle: '数字原住民引领智能化生活新常态',
    stats: [
      { value: '96.8%', label: '将AI视为生活必备工具', color: 'text-blue-600' },
      { value: '41.5%', label: '20-29岁网民使用率', color: 'text-purple-600' },
      { value: '81.2%', label: 'AI应用聚焦三大场景', color: 'text-indigo-600' }
    ],
    points: [
      '对话交互：智能助手整理会议纪要',
      '创意生成：AI生成创意策划方案',
      '知识管理：快速分析财报风险点'
    ],
    bgGradient: 'from-purple-50 to-pink-50'
  },
  // 第5页：AI发展全景
  {
    id: 5,
    type: 'timeline',
    title: 'AI发展全景分析',
    subtitle: '国家规划的智能化进程',
    timeline: [
      { year: '2027', title: '2年后 - 深度融合', desc: '七成民众用上智能设备，AI渗透六大领域' },
      { year: '2030', title: '5年后 - 核心引擎', desc: '九成设备自带"智能大脑"，成为经济增长核心' },
      { year: '2035', title: '10年后 - 智能普惠', desc: '全面智能普惠时代，为现代化建设注入核心动力' }
    ],
    market: '中国生成式AI市场规模从210亿元增至1820亿元，复合增长率47.8%',
    bgGradient: 'from-cyan-50 to-blue-50'
  },
  // 第6页：AI红利窗口
  {
    id: 6,
    type: 'benefits',
    title: 'AI红利窗口分析',
    subtitle: '三大维度把握职场机遇',
    benefits: [
      {
        icon: '⚡',
        title: '工作提效红利',
        desc: '简化流程，释放精力',
        examples: ['文职：公文审核时间缩短90%', '技术：用AI降低编程门槛', '业务：AI处理80%重复咨询']
      },
      {
        icon: '🎯',
        title: '能力强化红利',
        desc: '人机协同，构建护城河',
        examples: ['T型复合能力：专业深度+AI广度', '人文决策能力：共情与判断', 'AI工作流设计师']
      },
      {
        icon: '🚀',
        title: '岗位转型红利',
        desc: '从执行者到设计者',
        examples: ['成为不可替代的核心角色', '主导流程优化获晋升', '开拓新职业发展路径']
      }
    ],
    bgGradient: 'from-amber-50 to-orange-50'
  },
  // 第7页：四象限坐标
  {
    id: 7,
    type: 'quadrant',
    title: '青年在AI时代的坐标',
    subtitle: '从能力到深度的四条成长通道',
    quadrants: [
      {
        level: '① AI 使用者',
        desc: '把AI当"高级搜索框"',
        color: 'bg-blue-100 border-blue-300',
        actions: ['文案草拟、邮件润色', 'PPT大纲生成', '快速获取信息']
      },
      {
        level: '② AI 协同者',
        desc: '让AI成为"同桌"',
        color: 'bg-green-100 border-green-300',
        actions: ['多轮对话迭代方案', '构建AI工作流', '团队头脑风暴']
      },
      {
        level: '③ AI 调教师',
        desc: '把AI当"实习生"培养',
        color: 'bg-yellow-100 border-yellow-300',
        actions: ['撰写高质量提示词', '建立专属知识库', '微调预训练模型']
      },
      {
        level: '④ AI 架构师',
        desc: '从"用模型"到"造系统"',
        color: 'bg-purple-100 border-purple-300',
        actions: ['规划AI解决方案', '建设企业级平台', '推动AI治理实践']
      }
    ],
    bgGradient: 'from-teal-50 to-cyan-50'
  },
  // 第8页：场景应用示例
  {
    id: 8,
    type: 'scenarios',
    title: '从认知到行动的场景应用',
    subtitle: '典型工作场景中的AI赋能实践',
    scenarios: [
      {
        role: '文职人员',
        before: '5天完成公文审核',
        after: '几分钟完成，准确率提升',
        tools: 'ChatGPT、Kimi、Canva AI'
      },
      {
        role: '技术人员',
        before: '陷入基础编码细节',
        after: '聚焦架构设计与优化',
        tools: 'DeepSeek-R1、Ollama'
      },
      {
        role: '客户经理',
        before: '手动筛选客户',
        after: 'AI筛选+个性化话术',
        tools: 'AI客户分析工具'
      },
      {
        role: '项目管理',
        before: '手工整理数据报表',
        after: 'AI整合+聚焦决策',
        tools: 'AI数据分析平台'
      }
    ],
    bgGradient: 'from-rose-50 to-pink-50'
  },
  // 第9页：行动建议
  {
    id: 9,
    type: 'action',
    title: '青年员工行动指南',
    subtitle: '立即开始的三步走策略',
    steps: [
      {
        step: 'Step 1',
        title: '快速上手',
        desc: '选择1-2个AI工具，每天使用15分钟',
        time: '第1周'
      },
      {
        step: 'Step 2',
        title: '深度整合',
        desc: '将AI融入日常工作流，建立人机协同模式',
        time: '第2-4周'
      },
      {
        step: 'Step 3',
        title: '能力跃迁',
        desc: '学习提示词工程，打造专属AI助手',
        time: '第2-3月'
      }
    ],
    tips: '记住：AI不会取代你，但会用AI的人会取代不会用的人',
    bgGradient: 'from-emerald-50 to-teal-50'
  },
  // 第10页：结束页
  {
    id: 10,
    type: 'ending',
    title: '谢谢聆听',
    subtitle: '让AI成为我们的职场超能力',
    message: '当最年轻的脑回路遇上最火热的大模型\n一起见证提效火花、成长捷径与组织红利',
    bgGradient: 'from-violet-600 to-purple-600'
  }
];

export default function AIEmployeeGrowthPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // 键盘导航
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const slide = slides[currentSlide];

  const renderSlide = () => {
    switch (slide.type) {
      case 'title':
        return (
          <div className={`h-full flex flex-col items-center justify-center text-white bg-gradient-to-br ${slide.bgGradient}`}>
            <h1 className="text-6xl font-bold mb-6 text-center px-8">{slide.title}</h1>
            <p className="text-2xl mb-12 opacity-90">{slide.subtitle}</p>
            <p className="text-lg opacity-75">{slide.footer}</p>
          </div>
        );

      case 'content':
        return (
          <div className={`h-full flex flex-col p-16 bg-gradient-to-br ${slide.bgGradient}`}>
            <h2 className="text-5xl font-bold mb-12 text-gray-800">{slide.title}</h2>
            <div className="flex-1 flex flex-col justify-center space-y-6">
              {slide.content?.map((item: any, index: number) => (
                <div key={index} className="flex items-start space-x-6 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-4xl font-bold text-blue-600 min-w-[60px]">{item.num}</div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">{item.text}</h3>
                    <p className="text-lg text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'quote':
        return (
          <div className={`h-full flex flex-col justify-center p-16 bg-gradient-to-br ${slide.bgGradient}`}>
            <h2 className="text-4xl font-bold mb-8 text-gray-800">{slide.title}</h2>
            <blockquote className="text-3xl font-medium text-gray-700 leading-relaxed mb-12 border-l-8 border-blue-500 pl-8 italic">
              "{slide.quote}"
            </blockquote>
            <div className="grid grid-cols-1 gap-4">
              {slide.highlights?.map((highlight: string, index: number) => (
                <div key={index} className="flex items-center space-x-4 bg-white rounded-xl p-6 shadow-md">
                  <span className="text-3xl">✓</span>
                  <span className="text-xl text-gray-700">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'data':
        return (
          <div className={`h-full flex flex-col p-16 bg-gradient-to-br ${slide.bgGradient}`}>
            <h2 className="text-5xl font-bold mb-3 text-gray-800">{slide.title}</h2>
            <p className="text-xl text-gray-600 mb-10">{slide.subtitle}</p>
            <div className="grid grid-cols-3 gap-6 mb-10">
              {slide.stats?.map((stat: any, index: number) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg text-center">
                  <div className={`text-6xl font-bold mb-4 ${stat.color}`}>{stat.value}</div>
                  <div className="text-lg text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">三大核心应用场景</h3>
              <div className="space-y-3">
                {slide.points?.map((point: string, index: number) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
                    <span className="text-xl text-gray-700">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'timeline':
        return (
          <div className={`h-full flex flex-col p-16 bg-gradient-to-br ${slide.bgGradient}`}>
            <h2 className="text-5xl font-bold mb-3 text-gray-800">{slide.title}</h2>
            <p className="text-xl text-gray-600 mb-10">{slide.subtitle}</p>
            <div className="flex-1 flex items-center justify-between space-x-6 mb-8">
              {slide.timeline?.map((item: any, index: number) => (
                <div key={index} className="flex-1">
                  <div className="bg-white rounded-2xl p-6 shadow-lg h-full">
                    <div className="text-5xl font-bold text-blue-600 mb-4">{item.year}</div>
                    <h3 className="text-2xl font-semibold mb-3 text-gray-800">{item.title}</h3>
                    <p className="text-lg text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-6 shadow-lg text-center">
              <p className="text-2xl font-semibold">{slide.market}</p>
            </div>
          </div>
        );

      case 'benefits':
        return (
          <div className={`h-full flex flex-col p-16 bg-gradient-to-br ${slide.bgGradient}`}>
            <h2 className="text-5xl font-bold mb-3 text-gray-800">{slide.title}</h2>
            <p className="text-xl text-gray-600 mb-10">{slide.subtitle}</p>
            <div className="grid grid-cols-3 gap-6 flex-1">
              {slide.benefits?.map((benefit: any, index: number) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg flex flex-col">
                  <div className="text-6xl mb-4">{benefit.icon}</div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">{benefit.title}</h3>
                  <p className="text-lg text-gray-600 mb-4">{benefit.desc}</p>
                  <div className="mt-auto space-y-2">
                    {benefit.examples.map((example: string, i: number) => (
                      <div key={i} className="text-sm text-gray-600 flex items-start">
                        <span className="mr-2">•</span>
                        <span>{example}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'quadrant':
        return (
          <div className={`h-full flex flex-col p-16 bg-gradient-to-br ${slide.bgGradient}`}>
            <h2 className="text-5xl font-bold mb-3 text-gray-800">{slide.title}</h2>
            <p className="text-xl text-gray-600 mb-10">{slide.subtitle}</p>
            <div className="grid grid-cols-2 gap-6 flex-1">
              {slide.quadrants?.map((quad: any, index: number) => (
                <div key={index} className={`${quad.color} border-2 rounded-2xl p-8 shadow-lg`}>
                  <h3 className="text-3xl font-bold mb-3 text-gray-800">{quad.level}</h3>
                  <p className="text-xl text-gray-700 mb-6 font-medium">{quad.desc}</p>
                  <div className="space-y-2">
                    {quad.actions.map((action: string, i: number) => (
                      <div key={i} className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-gray-700 rounded-full"></span>
                        <span className="text-lg text-gray-700">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'scenarios':
        return (
          <div className={`h-full flex flex-col p-16 bg-gradient-to-br ${slide.bgGradient}`}>
            <h2 className="text-5xl font-bold mb-3 text-gray-800">{slide.title}</h2>
            <p className="text-xl text-gray-600 mb-10">{slide.subtitle}</p>
            <div className="grid grid-cols-2 gap-6 flex-1">
              {slide.scenarios?.map((scenario: any, index: number) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-2xl font-bold mb-4 text-blue-600">{scenario.role}</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="font-semibold text-gray-700">改进前：</span>
                      <span className="text-gray-600">{scenario.before}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-2xl text-green-600">
                      <span>↓</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">改进后：</span>
                      <span className="text-gray-600">{scenario.after}</span>
                    </div>
                    <div className="pt-3 border-t border-gray-200">
                      <span className="font-semibold text-gray-700">工具：</span>
                      <span className="text-blue-600">{scenario.tools}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'action':
        return (
          <div className={`h-full flex flex-col p-16 bg-gradient-to-br ${slide.bgGradient}`}>
            <h2 className="text-5xl font-bold mb-3 text-gray-800">{slide.title}</h2>
            <p className="text-xl text-gray-600 mb-10">{slide.subtitle}</p>
            <div className="flex items-center justify-between space-x-8 mb-10 flex-1">
              {slide.steps?.map((step: any, index: number) => (
                <React.Fragment key={index}>
                  <div className="flex-1 bg-white rounded-2xl p-8 shadow-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-4">{step.step}</div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-800">{step.title}</h3>
                    <p className="text-lg text-gray-600 mb-4">{step.desc}</p>
                    <div className="text-sm font-semibold text-blue-600">{step.time}</div>
                  </div>
                  {index < slide.steps.length - 1 && (
                    <div className="text-4xl text-blue-600">→</div>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl p-8 shadow-lg text-center">
              <p className="text-3xl font-bold">{slide.tips}</p>
            </div>
          </div>
        );

      case 'ending':
        return (
          <div className={`h-full flex flex-col items-center justify-center text-white bg-gradient-to-br ${slide.bgGradient}`}>
            <h1 className="text-7xl font-bold mb-8">{slide.title}</h1>
            <p className="text-3xl mb-12 opacity-90">{slide.subtitle}</p>
            <p className="text-xl text-center opacity-80 whitespace-pre-line max-w-4xl">{slide.message}</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl">
        {/* 演示文稿容器 */}
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <div className="relative h-full">
            {renderSlide()}
          </div>
        </div>

        {/* 控制栏 */}
        <div className="mt-6 flex items-center justify-between">
          <Button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            variant="outline"
            size="lg"
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>上一页</span>
          </Button>

          {/* 页码指示器 */}
          <div className="flex items-center space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide
                    ? 'bg-blue-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-600 font-medium">
              {currentSlide + 1} / {slides.length}
            </span>
            <Button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              variant="default"
              size="lg"
              className="flex items-center space-x-2"
            >
              <span>下一页</span>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* 键盘提示 */}
        <div className="mt-4 text-center text-sm text-gray-500">
          提示：可以使用键盘 ← → 方向键切换页面
        </div>
      </div>
    </div>
  );
}
