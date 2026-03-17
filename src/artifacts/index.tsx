import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, Layers, Zap, Globe, Code } from 'lucide-react';

export const meta = {
  title: "首页",
  description: "Artifact Runner 展示平台首页",
  isHidden: true,
};

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Layers className="w-6 h-6" />,
      title: "丰富的组件展示",
      description: "包含数十个精心设计的页面和交互组件"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "即时预览",
      description: "基于文件系统路由，自动生成页面和目录"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "响应式设计",
      description: "支持桌面和移动端，适配各种屏幕尺寸"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "开发友好",
      description: "TypeScript + React + Tailwind，快速开发"
    },
  ];

  return (
    <div className="min-h-[calc(100vh-3.5rem)]">
      {/* Hero 区域 */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Artifact Runner
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            一个强大的 React 组件与页面展示平台，基于文件系统自动路由，
            快速预览和管理你的所有 Artifact 作品。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" onClick={() => navigate('/directory')} className="gap-2">
              浏览所有页面
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/admin')}>
              管理后台
            </Button>
          </div>
        </div>
      </section>

      {/* 特性区域 */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">平台特性</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <Card key={i} className="text-center hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="mx-auto p-3 bg-primary/10 rounded-xl w-fit mb-2">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 快速入口 */}
      <section className="py-12 px-4 bg-muted/50">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">快速访问</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: 'AI 应用场景', path: '/ai-application-scenarios' },
              { label: 'AI 演示', path: '/ai-demo' },
              { label: '数据平台', path: '/data-platform' },
              { label: '效率工具', path: '/efficiency' },
              { label: '示例合集', path: '/examples' },
            ].map(item => (
              <Button
                key={item.path}
                variant="secondary"
                onClick={() => navigate(item.path)}
                className="gap-1"
              >
                {item.label}
                <ArrowRight className="w-3 h-3" />
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* 底部 */}
      <footer className="py-8 px-4 border-t text-center text-sm text-muted-foreground">
        <p>Artifact Runner &copy; 2025 — 由 React + Vite + Tailwind 构建</p>
      </footer>
    </div>
  );
};

export default HomePage;
