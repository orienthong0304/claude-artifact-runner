import React from 'react';
import {
  Download,
  Zap,
  Shield,
  Workflow,
  Sparkles,
  ArrowRight,
  Github,
  Code,
  Layers,
  BarChart3,
  CheckCircle2,
  Cpu,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export const meta = {
  title: "CC-Extension 项目介绍",
  description: "企业级浏览器自动化扩展 - 让重复劳动成为历史",
  isHidden: false,
  category: "文档",
  order: 2
};

const CCExtension = () => {
  return (
    <div className="min-h-screen overflow-y-auto bg-gradient-to-b from-background via-background to-muted/20">

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-orange-500/20 to-pink-500/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* 徽章 */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">企业级浏览器自动化解决方案</span>
            </div>

            {/* 主标题 */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              CC-Extension
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-4">
              让重复劳动成为历史
            </p>

            <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              专为电信运营商 CPMS 系统打造的智能自动化扩展，基于 Automa 深度定制，
              让复杂的业务流程一键完成，效率提升 300%+
            </p>

            {/* CTA 按钮 */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="text-base px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
                onClick={() => window.open('https://example.com/download/cc-extension.zip', '_blank')}
              >
                <Download className="mr-2 h-5 w-5" />
                立即下载
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 py-6"
                onClick={() => window.open('https://github.com/AutomaApp/automa', '_blank')}
              >
                <Github className="mr-2 h-5 w-5" />
                致敬 Automa
              </Button>
            </div>

            {/* 数据统计 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto">
              {[
                { value: '50,000+', label: '代码行数', icon: Code },
                { value: '40+', label: '自动化积木块', icon: Workflow },
                { value: '300%', label: '效率提升', icon: Zap },
                { value: '95%', label: '识别准确率', icon: Star }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-3">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 产品截图展示 */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border">
              {/* 浏览器窗口装饰 */}
              <div className="bg-muted/80 backdrop-blur-sm px-4 py-3 flex items-center gap-2 border-b border-border">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 text-center">
                  <div className="inline-block bg-background px-4 py-1 rounded-md text-xs text-muted-foreground">
                    chrome-extension://cc-extension
                  </div>
                </div>
              </div>

              {/* 截图 */}
              <div className="bg-background">
                <img
                  src="/cc-extension.png"
                  alt="CC-Extension 产品截图"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 核心特性 */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">为什么选择 CC-Extension？</h2>
            <p className="text-lg text-muted-foreground">六大核心优势，重新定义业务自动化</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Zap,
                title: '闪电般的执行速度',
                desc: '多线程 Worker 并行执行，平均效率提升 300%，让复杂流程秒级完成',
                gradient: 'from-yellow-400 to-orange-500'
              },
              {
                icon: Shield,
                title: '企业级稳定可靠',
                desc: '两级错误处理机制，自动重试与容错，确保业务流程万无一失',
                gradient: 'from-blue-400 to-cyan-500'
              },
              {
                icon: Workflow,
                title: '可视化流程编排',
                desc: '基于 Drawflow 有向图引擎，拖拽式工作流设计，无需编程即可定制',
                gradient: 'from-purple-400 to-pink-500'
              },
              {
                icon: Sparkles,
                title: '智能文件分类',
                desc: '多维度评分算法，6 种标准文件类型自动识别，准确率高达 95%',
                gradient: 'from-green-400 to-emerald-500'
              },
              {
                icon: Layers,
                title: '六层架构设计',
                desc: '清晰的层次划分实现关注点分离，每层职责单一，易于维护和扩展',
                gradient: 'from-red-400 to-rose-500'
              },
              {
                icon: Cpu,
                title: '现代技术栈',
                desc: 'Vue 3 + TypeScript + Dexie，完整的工程化体系，代码质量有保障',
                gradient: 'from-indigo-400 to-blue-500'
              }
            ].map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border">
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 技术亮点 */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">技术创新亮点</h2>
            <p className="text-lg text-muted-foreground">基于 Automa 的深度定制与创新</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: '策略模式业务扩展',
                subtitle: 'Architecture Innovation',
                desc: '设计 TaskStrategy 抽象基类，三种具体策略（SJTJ/KCBG/SJJD）实现业务隔离，可扩展性提升 85%',
                badges: ['可扩展性 ↑85%', '耦合度 ↓70%'],
                color: 'border-l-blue-500'
              },
              {
                title: '智能文件分类算法',
                subtitle: 'AI-Powered Feature',
                desc: '多维度评分机制（扩展名 40% + 关键词 50% + 文件大小 10%）+ 贪心算法，准确率达 95%',
                badges: ['准确率 95%', '效率提升 10x'],
                color: 'border-l-green-500'
              },
              {
                title: '任务队列执行引擎',
                subtitle: 'Execution Innovation',
                desc: '完整的任务队列管理，支持顺序执行、暂停/继续、失败重试，通过状态机管理生命周期',
                badges: ['并发控制', '容错机制'],
                color: 'border-l-orange-500'
              },
              {
                title: '文件存储适配器',
                subtitle: 'Data Innovation',
                desc: 'FileStorageAdapter 将文件转换为 Base64 存储在 IndexedDB，支持元数据管理和批量操作',
                badges: ['无限存储', '元数据追踪'],
                color: 'border-l-purple-500'
              }
            ].map((innovation, index) => (
              <Card key={index} className={`border-l-4 ${innovation.color} hover:shadow-lg transition-all`}>
                <CardContent className="p-6">
                  <div className="mb-3">
                    <h3 className="text-lg font-semibold mb-1">{innovation.title}</h3>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">{innovation.subtitle}</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {innovation.desc}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {innovation.badges.map((badge, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CPMS 业务模块 */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">CPMS 业务模块</h2>
            <p className="text-lg text-muted-foreground">三大核心流程全覆盖</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: 'SJTJ',
                subtitle: '设计编制流程',
                desc: '自动化设计文档编制、造价参数录入、文件管理流程',
                features: ['3 种模板类型', '6 种标准文件', '智能文件分类', '基础数据解析'],
                gradient: 'from-blue-400 to-blue-600'
              },
              {
                title: 'KCBG',
                subtitle: '设计勘察流程',
                desc: '勘察报告上传、现场调研文档管理、审批流程自动化',
                features: ['任意格式上传', 'Base64 存储', '审批人配置', '变量注入'],
                gradient: 'from-orange-400 to-orange-600'
              },
              {
                title: 'SJJD',
                subtitle: '设计交底流程',
                desc: '设计交底文档管理、技术交底自动化、审批流程跟踪',
                features: ['交底文档上传', '审批流程自动化', 'Base64 存储', '变量注入'],
                gradient: 'from-green-400 to-green-600'
              }
            ].map((module, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className={`w-full h-2 rounded-full bg-gradient-to-r ${module.gradient} mb-4`}></div>
                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-1">{module.title}</h3>
                    <p className="text-sm text-muted-foreground">{module.subtitle}</p>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {module.desc}
                  </p>
                  <div className="space-y-2">
                    {module.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 致敬 Automa */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
        <div className="container mx-auto px-6">
          <Card className="max-w-4xl mx-auto border-purple-200 dark:border-purple-800">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mb-6">
                <Github className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">致敬 Automa 开源项目</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed max-w-2xl mx-auto">
                本项目基于 <strong>Automa</strong> 开源项目深度定制。感谢 Automa 团队提供的强大工作流引擎、
                40+ 自动化积木块、Drawflow 有向图引擎等核心技术，让企业级自动化成为可能。
              </p>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.open('https://github.com/AutomaApp/automa', '_blank')}
              >
                <Github className="mr-2 h-5 w-5" />
                访问 Automa 开源项目
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 下载 CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-5"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">准备好提升您的工作效率了吗？</h2>
            <p className="text-lg text-muted-foreground mb-8">
              立即下载 CC-Extension，让重复劳动成为历史
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="text-lg px-10 py-7 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all"
                onClick={() => window.open('https://example.com/download/cc-extension.zip', '_blank')}
              >
                <Download className="mr-2 h-6 w-6" />
                立即下载扩展
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                免费使用
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                企业级稳定
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                持续更新
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-2">
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
            <p>© {new Date().getFullYear()} OrientHong（七分-洪浩东） · 让效率提升更简单</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CCExtension;
