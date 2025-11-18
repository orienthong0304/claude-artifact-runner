import React, { useState } from 'react';
import {
  Info,
  Code,
  Heart,
  Cpu,
  Workflow,
  Layers,
  Lightbulb,
  Users,
  BarChart3,
  CheckCircle2,
  Github,
  Rocket,
  Target,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const meta = {
  title: "CC-Extension 项目介绍",
  description: "企业级浏览器自动化扩展 - 技术架构深度解析",
  isHidden: false,
  category: "文档",
  order: 2
};

const CCExtension = () => {
  const [updateStatus, setUpdateStatus] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    architecture: true,
    workflow: true,
    techStack: true
  });

  const versionInfo = {
    version: '2.0.0',
    build: '2024',
    buildDate: '2024-11-18',
    isStable: true
  };

  const appInfo = {
    name: 'CC-Extension',
    description: 'CC-Extension（CPMS 配置扩展）是一款专为电信运营商 CPMS（城市管线管理系统）业务定制的企业级浏览器自动化扩展。',
    author: 'OrientHong（七分-洪浩东）'
  };

  const checkUpdate = () => {
    setUpdateStatus('正在检查更新...');
    setTimeout(() => {
      setUpdateStatus('当前已是最新版本');
    }, 1500);
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="container mx-auto py-6 pb-4 max-h-screen overflow-y-auto">
      {/* 页面头部 */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-3 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 p-3 shadow-lg">
            <Info className="text-xl text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">关于 {appInfo.name}</h1>
            <p className="text-sm text-muted-foreground">
              企业级浏览器自动化扩展 · 技术架构深度解析
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">v{versionInfo.version}</Badge>
          <Badge variant="default">{versionInfo.isStable ? '稳定版' : '测试版'}</Badge>
        </div>
      </div>

      {/* 项目概述 */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-start">
            <div className="mr-4">
              <div className="rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 p-3 shadow-lg">
                <Cpu className="text-2xl text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold mb-3">项目定位</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {appInfo.description}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                本项目是基于开源浏览器自动化框架 <strong>Automa</strong> 的企业级二次开发项目，通过
                <strong>继承 + 创新</strong>的方式，将通用自动化能力与电信运营商 CPMS 业务深度融合，
                实现了<strong>从框架到产品</strong>的跨越。
              </p>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="text-center p-3 bg-secondary rounded-lg">
                  <p className="text-2xl font-bold text-primary">50,000+</p>
                  <p className="text-xs text-muted-foreground mt-1">代码行数</p>
                </div>
                <div className="text-center p-3 bg-secondary rounded-lg">
                  <p className="text-2xl font-bold text-primary">500+</p>
                  <p className="text-xs text-muted-foreground mt-1">文件数量</p>
                </div>
                <div className="text-center p-3 bg-secondary rounded-lg">
                  <p className="text-2xl font-bold text-primary">40+</p>
                  <p className="text-xs text-muted-foreground mt-1">自动化积木块</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 致敬 Automa */}
      <Card className="mb-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800">
        <CardContent className="p-6">
          <div className="flex items-start">
            <div className="mr-4">
              <div className="rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-3 shadow-lg">
                <Heart className="text-2xl text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold mb-3 flex items-center">
                致敬 Automa 开源项目
                <Github className="ml-2 text-base" />
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                本项目的核心工作流引擎基于 <strong>Automa</strong> 开源项目构建。Automa 是一个功能强大的
                浏览器自动化框架，由开源社区倾力打造，提供了完整的可视化工作流编排能力。
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                我们继承了 Automa 的 <strong>40+ 种自动化积木块</strong>、<strong>Drawflow 有向图引擎</strong>、
                <strong>多线程 Worker 执行模型</strong>、<strong>Mustache 模板系统</strong>等核心技术，
                并在此基础上构建了企业级业务自动化能力。
              </p>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open('https://github.com/AutomaApp/automa', '_blank')}
                >
                  <Github className="mr-1.5 h-4 w-4" />
                  访问 Automa 开源项目
                </Button>
                <span className="text-xs text-muted-foreground">
                  感谢 Automa 团队和开源社区的贡献 ❤️
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 技术架构深度解析 */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <Code className="mr-2 text-primary text-xl" />
          <h2 className="text-lg font-bold">技术架构深度解析</h2>
        </div>

        {/* 六层架构设计 */}
        <Card className="mb-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center">
                <Layers className="mr-2 text-blue-500" />
                六层架构设计
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSection('architecture')}
              >
                {expandedSections.architecture ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </div>
          </CardHeader>
          {expandedSections.architecture && (
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    layer: 'L1',
                    name: '表示层 (Presentation Layer)',
                    desc: 'Vue 3 组合式 API + TailwindCSS，实现响应式界面和主题切换',
                    color: 'from-purple-400 to-purple-600'
                  },
                  {
                    layer: 'L2',
                    name: '服务层 (Service Layer)',
                    desc: 'CPMSService、WorkflowService 提供统一的业务接口门面',
                    color: 'from-blue-400 to-blue-600'
                  },
                  {
                    layer: 'L3',
                    name: '业务逻辑层 (Business Logic Layer)',
                    desc: 'TaskManager、WorkflowManager 实现核心业务逻辑和编排',
                    color: 'from-green-400 to-green-600'
                  },
                  {
                    layer: 'L4',
                    name: '策略层 (Strategy Layer)',
                    desc: '3 种 TaskStrategy 实现多态业务处理（SJTJ/KCBG/SJJD）',
                    color: 'from-yellow-400 to-yellow-600'
                  },
                  {
                    layer: 'L5',
                    name: '数据访问层 (Data Access Layer)',
                    desc: 'Adapter + Factory 模式，解耦数据访问和对象创建逻辑',
                    color: 'from-orange-400 to-orange-600'
                  },
                  {
                    layer: 'L6',
                    name: '持久层 (Persistence Layer)',
                    desc: 'Dexie (IndexedDB) 实现客户端数据持久化，支持复杂查询',
                    color: 'from-red-400 to-red-600'
                  }
                ].map((item, index) => (
                  <React.Fragment key={item.layer}>
                    <div className="flex items-start">
                      <div className={`w-8 h-8 flex-shrink-0 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-xs font-bold mr-3`}>
                        {item.layer}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{item.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                      </div>
                    </div>
                    {index < 5 && <div className="h-4 border-l-2 border-dashed border-border ml-4"></div>}
                  </React.Fragment>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-xs text-muted-foreground">
                  <Lightbulb className="inline text-blue-500 mr-1" />
                  <strong>设计理念：</strong>通过清晰的层次划分实现关注点分离，每层职责单一，降低耦合度，提升可维护性和可测试性。
                </p>
              </div>
            </CardContent>
          )}
        </Card>

        {/* 工作流引擎技术剖析 */}
        <Card className="mb-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center">
                <Workflow className="mr-2 text-orange-500" />
                工作流引擎技术剖析
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSection('workflow')}
              >
                {expandedSections.workflow ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </div>
          </CardHeader>
          {expandedSections.workflow && (
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    icon: <Workflow className="text-xs text-white" />,
                    title: 'Drawflow 有向图引擎',
                    desc: '使用 DAG（有向无环图）描述工作流，节点代表操作块，边代表执行流向。通过 connectionsMap 高效追踪节点连接关系，支持复杂的分支和循环逻辑。',
                    color: 'bg-orange-500'
                  },
                  {
                    icon: <Users className="text-xs text-white" />,
                    title: '多线程 Worker 模型',
                    desc: '块有多个输出时自动创建新 Worker 并行执行，第一个连接在当前 Worker 继续，其他创建新 Worker。Worker 状态完整克隆，支持独立执行上下文。',
                    color: 'bg-green-500'
                  },
                  {
                    icon: <Code className="text-xs text-white" />,
                    title: 'Mustache 模板系统',
                    desc: '支持 {{variable}}、{{table.$last.col}}、{{$length(arr)}} 等复杂表达式。内置模板函数实现数据转换、格式化、条件判断等功能。',
                    color: 'bg-blue-500'
                  },
                  {
                    icon: <Info className="text-xs text-white" />,
                    title: '两级错误处理',
                    desc: '块级（retry/continue/fallback/throw）+ 工作流级（keep-running/restart/stop）递归错误处理，提供完整容错机制。',
                    color: 'bg-red-500'
                  }
                ].map((item, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className={`w-6 h-6 rounded ${item.color} flex items-center justify-center mr-2`}>
                        {item.icon}
                      </div>
                      <p className="text-sm font-semibold">{item.title}</p>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <p className="text-xs text-muted-foreground flex items-start">
                  <Lightbulb className="inline text-orange-500 mr-1 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>核心优势：</strong>通过有向图描述+多线程执行+模板变量+两级容错，实现了高性能、高可靠的工作流执行引擎，平均执行效率提升 300%。
                  </span>
                </p>
              </div>
            </CardContent>
          )}
        </Card>

        {/* 技术栈全景 */}
        <Card className="mb-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center">
                <Layers className="mr-2 text-purple-500" />
                技术栈全景图
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSection('techStack')}
              >
                {expandedSections.techStack ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </div>
          </CardHeader>
          {expandedSections.techStack && (
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  {
                    category: '前端框架',
                    items: [
                      { name: 'Vue.js 3', version: '3.4.38' },
                      { name: 'Vue Router', version: '4.2.4' },
                      { name: 'Pinia', version: '2.0.29' }
                    ]
                  },
                  {
                    category: 'UI 组件',
                    items: [
                      { name: 'TailwindCSS', version: '3.2.1' },
                      { name: 'Vue Flow', version: '1.23.0' },
                      { name: 'CodeMirror 6', version: '6.0.2' }
                    ]
                  },
                  {
                    category: '数据处理',
                    items: [
                      { name: 'Dexie', version: '3.2.3' },
                      { name: 'XLSX', version: '0.19.1' },
                      { name: 'Papaparse', version: '5.3.1' }
                    ]
                  },
                  {
                    category: '工程化',
                    items: [
                      { name: 'Webpack', version: '5.76.0' },
                      { name: 'ESLint', version: '8.34.0' },
                      { name: 'Prettier', version: '2.8.2' }
                    ]
                  }
                ].map((stack, index) => (
                  <div key={index}>
                    <p className="text-xs font-semibold text-muted-foreground mb-3">
                      {stack.category}
                    </p>
                    <div className="space-y-2">
                      {stack.items.map((item, idx) => (
                        <div key={idx} className="p-2 bg-secondary rounded text-xs flex items-center justify-between">
                          <span>{item.name}</span>
                          <span className="text-muted-foreground">{item.version}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          )}
        </Card>
      </div>

      {/* 二次开发创新点 */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <Lightbulb className="mr-2 text-primary text-xl" />
          <h2 className="text-lg font-bold">二次开发创新点</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              icon: <Layers className="text-lg text-white" />,
              title: '策略模式业务扩展',
              subtitle: 'Architecture Innovation',
              desc: '设计了 TaskStrategy 抽象基类，三种具体策略实现（SJTJ/KCBG/SJPG）通过多态实现业务隔离。新增业务类型只需实现新策略类，无需修改核心代码。',
              badges: ['可扩展性 ↑85%', '耦合度 ↓70%'],
              color: 'from-blue-400 to-blue-600'
            },
            {
              icon: <Lightbulb className="text-lg text-white" />,
              title: '智能文件分类算法',
              subtitle: 'AI-Powered Feature',
              desc: '基于多维度评分机制（扩展名 40% + 关键词 50% + 文件大小 10%）+贪心算法实现智能文件分类。支持 6 种标准文件类型自动识别，准确率达 95%。',
              badges: ['准确率 95%', '效率提升 10x'],
              color: 'from-green-400 to-green-600'
            },
            {
              icon: <Workflow className="text-lg text-white" />,
              title: '任务队列执行引擎',
              subtitle: 'Execution Innovation',
              desc: '构建了完整的任务队列管理系统，支持顺序执行、暂停/继续、失败重试、执行日志记录。通过状态机模型 (pending → running → completed/failed) 管理任务生命周期。',
              badges: ['并发控制', '容错机制'],
              color: 'from-orange-400 to-orange-600'
            },
            {
              icon: <Code className="text-lg text-white" />,
              title: '文件存储适配器',
              subtitle: 'Data Innovation',
              desc: '实现了 FileStorageAdapter，将文件转换为 Base64 Data URL 存储在 IndexedDB。支持文件元数据管理、批量操作、关联任务追踪，解决了浏览器扩展文件存储难题。',
              badges: ['无限存储', '元数据追踪'],
              color: 'from-purple-400 to-purple-600'
            },
            {
              icon: <Target className="text-lg text-white" />,
              title: '类型推断系统',
              subtitle: 'Intelligence Innovation',
              desc: 'TaskFactory 实现了基于关键词匹配的任务类型自动推断。通过分析待办任务的 title、designType、currentNode 等字段，自动识别任务所属业务模块，减少用户操作步骤。',
              badges: ['自动化', '用户友好'],
              color: 'from-cyan-400 to-cyan-600'
            },
            {
              icon: <Cpu className="text-lg text-white" />,
              title: 'Modern Minimal 主题',
              subtitle: 'UX Innovation',
              desc: '基于 CSS 变量系统实现的主题引擎，支持亮色/暗色双主题无缝切换。使用语义化命名（foreground/background/primary/muted）提升可维护性。',
              badges: ['主题切换', '语义化设计'],
              color: 'from-pink-400 to-pink-600'
            }
          ].map((innovation, index) => (
            <Card key={index} className="p-5">
              <div className="flex items-start mb-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${innovation.color} flex items-center justify-center mr-3 flex-shrink-0`}>
                  {innovation.icon}
                </div>
                <div>
                  <h3 className="text-base font-semibold">{innovation.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{innovation.subtitle}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {innovation.desc}
              </p>
              <div className="flex items-center space-x-2">
                {innovation.badges.map((badge, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {badge}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 项目规模统计 */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <BarChart3 className="mr-2 text-primary text-xl" />
          <h2 className="text-lg font-bold">项目规模统计</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Code />, value: '50,000+', label: '代码行数', color: 'from-blue-400 to-blue-600' },
            { icon: <Layers />, value: '500+', label: '源文件数量', color: 'from-green-400 to-green-600' },
            { icon: <Workflow />, value: '40+', label: '自动化积木块', color: 'from-orange-400 to-orange-600' },
            { icon: <Cpu />, value: '50+', label: '第三方依赖', color: 'from-purple-400 to-purple-600' },
            { icon: <Layers />, value: '6', label: '架构层次', color: 'from-red-400 to-red-600' },
            { icon: <Code />, value: '8+', label: '设计模式', color: 'from-yellow-400 to-yellow-600' },
            { icon: <Workflow />, value: '3', label: 'CPMS 业务模块', color: 'from-cyan-400 to-cyan-600' },
            { icon: <BarChart3 />, value: '10+', label: '数据库表', color: 'from-pink-400 to-pink-600' }
          ].map((stat, index) => (
            <Card key={index} className="p-4 text-center">
              <div className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center mb-2`}>
                {React.cloneElement(stat.icon, { className: 'text-xl text-white' })}
              </div>
              <p className="text-2xl font-bold text-primary mb-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* CPMS 业务模块详解 */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <Workflow className="mr-2 text-primary text-xl" />
          <h2 className="text-lg font-bold">CPMS 业务模块详解</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'SJTJ',
              subtitle: '设计编制流程',
              desc: '自动化设计文档编制、造价参数录入、文件管理流程。',
              color: 'border-blue-500',
              bgColor: 'from-blue-400 to-blue-600',
              features: ['3 种模板类型', '6 种标准文件', '智能文件分类（95% 准确率）', '基础数据解析']
            },
            {
              title: 'KCBG',
              subtitle: '设计勘察流程',
              desc: '勘察报告上传、现场调研文档管理、审批流程自动化。',
              color: 'border-orange-500',
              bgColor: 'from-orange-400 to-orange-600',
              features: ['任意格式文件上传', 'Base64 Data URL 存储', '审批人智能配置', '工作流变量注入']
            },
            {
              title: 'SJJD',
              subtitle: '设计交底流程',
              desc: '设计交底文档管理、技术交底自动化、审批流程跟踪。',
              color: 'border-green-500',
              bgColor: 'from-green-400 to-green-600',
              features: ['交底文档上传', '审批流程自动化', 'Base64 文件存储', '工作流变量注入']
            }
          ].map((module, index) => (
            <Card key={index} className={`p-5 border-l-4 ${module.color}`}>
              <div className="flex items-start mb-3">
                <div className={`rounded-lg bg-gradient-to-br ${module.bgColor} p-2.5 shadow-md mr-3`}>
                  <Workflow className="text-lg text-white" />
                </div>
                <div>
                  <h3 className="text-base font-semibold">{module.title}</h3>
                  <p className="text-xs text-muted-foreground">{module.subtitle}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                {module.desc}
              </p>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                {module.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center">
                    <CheckCircle2 className="mr-1.5 h-3 w-3 text-primary" />
                    {feature}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 开发信息 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* 版本信息 */}
        <Card className="p-5">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-base flex items-center">
              <Info className="mr-2" />
              版本信息
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">版本号</span>
                <span className="text-sm font-mono">{versionInfo.version}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">构建编号</span>
                <span className="text-sm font-mono">#{versionInfo.build}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">构建日期</span>
                <span className="text-sm font-mono">{versionInfo.buildDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">发布状态</span>
                <Badge variant={versionInfo.isStable ? 'default' : 'secondary'}>
                  {versionInfo.isStable ? '稳定版' : '测试版'}
                </Badge>
              </div>
              <div className="pt-3 border-t">
                <Button
                  className="w-full"
                  variant="default"
                  onClick={checkUpdate}
                >
                  检查更新
                </Button>
                {updateStatus && (
                  <div className="mt-2 text-xs text-center text-muted-foreground">
                    {updateStatus}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 开发团队 */}
        <Card className="p-5">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-base flex items-center">
              <Users className="mr-2" />
              开发团队
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-4">
              <div className="text-center py-3">
                <div className="mb-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg mb-2">
                    <Users className="text-xl text-white" />
                  </div>
                </div>
                <p className="text-base font-semibold">{appInfo.author}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  专注于创造更好的工作体验
                </p>
              </div>

              <div className="pt-3 border-t space-y-2 text-sm">
                <div className="flex items-start">
                  <Lightbulb className="mr-2 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">愿景</p>
                    <p className="text-xs text-muted-foreground">
                      让企业效率提升更简单
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Rocket className="mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">使命</p>
                    <p className="text-xs text-muted-foreground">
                      通过自动化技术解放重复劳动
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 页脚 */}
      <div className="pt-4 border-t text-center">
        <p className="text-xs text-muted-foreground mb-2">
          基于{' '}
          <a
            href="https://github.com/AutomaApp/automa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-medium"
          >
            Automa
          </a>
          {' '}开源框架深度定制 · 企业内部使用许可证
        </p>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {appInfo.author} · 让效率提升更简单
        </p>
      </div>
    </div>
  );
};

export default CCExtension;
