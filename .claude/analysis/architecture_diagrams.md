# 架构图表和可视化

## 1. 项目依赖关系图

```
┌─────────────────────────────────────────────────────────────┐
│                     浏览器应用 (index.html)                   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
        ┌────────────────────────────────┐
        │      ReactDOM 入口            │
        │    (src/main.tsx)             │
        │  - 扫描 artifacts/**/*.tsx     │
        │  - 生成路由表                  │
        └────────┬───────────────────────┘
                 │
        ┌────────┴──────────────────────┐
        │                               │
        ▼                               ▼
    ┌────────────┐           ┌──────────────────┐
    │  Directory │           │  Artifact Pages  │
    │ 页面导航   │           │   (65+ files)    │
    │  Component │           │   - slides       │
    └────────────┘           │   - demos        │
        │                    │   - tools        │
        │                    └──────────────────┘
        │                               │
        └───────────────┬───────────────┘
                        │
        ┌───────────────┴────────────────┐
        │                                │
        ▼                                ▼
    ┌─────────────────┐      ┌────────────────────┐
    │  UI Components  │      │  Core Libraries    │
    │  (src/comp/ui/) │      │  (src/lib/)        │
    │                 │      │                    │
    │  - button       │      │  - openrouter.ts   │
    │  - input        │      │  - templateStore   │
    │  - card         │      │  - des-encrypt     │
    │  - dialog       │      │  - utils           │
    │  - form         │      └────────────────────┘
    │  - ... 40+      │                │
    └─────────────────┘                │
                                       ▼
                            ┌──────────────────────┐
                            │  External APIs       │
                            │                      │
                            │  OpenRouter API      │
                            │  - complete()        │
                            │  - completeStream()  │
                            │  - web search        │
                            └──────────────────────┘
```

## 2. 路由系统流程图

```
文件系统 (src/artifacts/)
        │
        ├─ 产权/
        │  ├─ template-editor.tsx
        │  ├─ ai-content-factory-pro.tsx
        │  └─ ...
        │
        ├─ ai-consulting/
        │  ├─ ai-consulting-lecture.tsx
        │  └─ ...
        │
        ├─ index.tsx
        ├─ about.tsx
        └─ ... 60+ 个根级文件
        │
        ▼
    Vite Plugin Pages
    (自动扫描)
        │
        ├─ import.meta.glob('./artifacts/**/*.tsx')
        │
        ├─ 解析文件路径
        │  ├─ src/artifacts/about.tsx → /about
        │  ├─ src/artifacts/产权/template-editor.tsx → /产权/template-editor
        │  └─ src/artifacts/ai-consulting/ → /ai-consulting/ (目录)
        │
        ▼
    main.tsx (路由配置)
        │
        ├─ 动态生成路由数组
        │  ├─ { path: '/about', element: <Layout><About /></Layout> }
        │  ├─ { path: '/产权/template-editor', element: ... }
        │  └─ { path: '/ai-consulting', element: <Directory /> }
        │
        ▼
    React Router
    useRoutes(customRoutes)
        │
        ├─ 客户端导航
        │  └─ navigate('/产权/template-editor')
        │
        ▼
    页面渲染
```

## 3. Directory 组件工作流

```
用户进入主页
    │
    ▼
Directory 组件加载
    │
    ├─ 初始化 basePath (默认='')
    │
    ├─ import.meta.glob('./**/*.tsx', { eager: true })
    │  └─ 急加载所有 artifacts 模块
    │
    ▼
生成页面列表 (generatePageList)
    │
    ├─ 获取当前路径的所有直接子项
    │
    ├─ 区分 'file' 和 'folder'
    │  ├─ parts.length === 1 → 直接文件
    │  └─ parts.length > 1 → 子目录
    │
    ├─ 读取元数据 (module.meta)
    │  ├─ title
    │  ├─ description
    │  ├─ isHidden
    │  ├─ category
    │  └─ order
    │
    ▼
排序和过滤
    │
    ├─ 1. 文件夹优先 (type === 'folder')
    ├─ 2. 按 order 排序 (元数据)
    ├─ 3. 按标题字典序排序 (localeCompare)
    ├─ 4. 隐藏 isHidden=true 的项
    │
    ▼
渲染 UI
    │
    ├─ 搜索框 <Input icon={Search} />
    │  └─ 过滤 pageList.filter(item => includes(title/description))
    │
    ├─ Grid 布局 (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
    │
    ├─ Card 卡片
    │  ├─ 图标 (Folder/FileText)
    │  ├─ 标题 (CardTitle)
    │  ├─ 描述 (CardDescription)
    │  └─ onClick → navigate(path)
    │
    ├─ 返回按钮 (ChevronLeft)
    │  └─ 分割 basePath 导航
    │
    ▼
点击项目
    │
    ├─ 文件夹 → navigate('/产权') → 重新加载 Directory
    │
    └─ 文件 → navigate('/产权/template-editor') → 加载对应 Artifact
```

## 4. OpenRouter API 集成架构

```
┌─────────────────────────────────────────────────────────┐
│  浏览器应用 (Artifacts)                                  │
│                                                         │
│  调用 window.claude.complete(prompt)                    │
│  或   window.claude.completeStream(prompt)              │
│  或   window.claude.completeWithWebSearch(prompt)       │
└────────────────────┬────────────────────────────────────┘
                     │
    ┌────────────────▼────────────────────┐
    │  openrouter.ts 初始化               │
    │                                    │
    │  const openai = new OpenAI({        │
    │    baseURL: 'https://openrouter...  │
    │    apiKey: VITE_OPENROUTER_API_KEY  │
    │    dangerouslyAllowBrowser: true    │
    │  })                                │
    │                                    │
    │  挂载到 window 对象                 │
    └────────────────┬────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
    ┌─────────────────┐    ┌──────────────────────┐
    │ 方法 1: 完成    │    │ 方法 3: 网络搜索     │
    │                │    │                      │
    │ complete()     │    │ completeWithWebSearch()
    │ 一次性返回     │    │                      │
    │                │    │ endpoint: /responses │
    │ temperature=0.7│    │ plugins: [{id:'web'}]│
    │ max_tokens=2000│    │                      │
    └────────┬───────┘    └──────────┬───────────┘
             │                       │
        ┌────▼────┐            ┌─────▼──────┐
        │ OpenAI  │            │ OpenRouter │
        │ Python  │            │ Responses  │
        │ Client  │            │ API        │
        └────┬────┘            └─────┬──────┘
             │                       │
             │    ┌──────────────────┤
             │    │                  │
             ▼    ▼                  ▼
    ┌────────────────────────────────────────┐
    │  OpenRouter API Server (openrouter.ai) │
    │                                        │
    │  model: 'anthropic/claude-sonnet-4.5' │
    │  max_output_tokens: 20000              │
    │  temperature: 0.7                      │
    └────────────┬───────────────────────────┘
                 │
                 ▼
        ┌──────────────────┐
        │  Anthropic API   │
        │                  │
        │  Claude Sonnet   │
        │  4.5 Model       │
        └──────────────────┘

方法 2 和 4 是流式版本：
- completeStream()：异步生成器
- completeStreamWithWebSearch()：SSE 实时推送
- for await (const chunk of stream) { ... }
```

## 5. 数据流动 (AI 内容工厂示例)

```
用户界面 (ai-content-factory-pro.tsx)
    │
    ├─ 选择模板
    │  └─ 用户从 defaultTemplates 选择
    │
    ├─ 填写基本信息
    │  ├─ 报告名称
    │  ├─ 行业类别
    │  └─ 系统提示词
    │
    ▼
生成内容
    │
    ├─ 遍历每个 section
    │
    ├─ 构建提示词
    │  const prompt = `
    │    系统: ${systemRole}
    │    报告: ${templateConfig.name}
    │    章节: ${section.title}
    │    ${section.prompt}
    │  `
    │
    ├─ 调用 AI
    │  for await (const chunk of window.claude.completeStreamWithWebSearch(prompt)) {
    │    if (chunk.content) {
    │      setResponse(prev => prev + chunk.content);  // 实时显示
    │    }
    │    if (chunk.citations) {
    │      setCitations(chunk.citations);              // 引用链接
    │    }
    │  }
    │
    ▼
实时渲染
    │
    ├─ markdown 内容逐字显示
    ├─ 引用链接显示
    ├─ 进度指示器
    │
    ▼
导出选项
    │
    ├─ 导出为 Word (.docx)
    │  └─ html-to-docx 库
    │
    ├─ 导出为 PDF
    │  └─ html2canvas + jsPDF
    │
    └─ 导出为 JSON
       └─ localStorage 保存
```

## 6. 模板系统架构

```
┌─────────────────────────────────────────┐
│  TemplateEditor.tsx (编辑器组件)        │
│                                        │
│  ├─ 模板列表视图 (TemplateManager)      │
│  │  ├─ 列出所有模板                     │
│  │  ├─ 创建/编辑/删除按钮               │
│  │  └─ 预览模板                        │
│  │                                    │
│  └─ 模板编辑视图 (TemplateEditor)       │
│     ├─ 基本信息表单                     │
│     │  ├─ name, description            │
│     │  ├─ category, industry           │
│     │  └─ systemRole                   │
│     │                                  │
│     └─ 章节编辑 (SectionTree)           │
│        ├─ 树形结构                     │
│        ├─ 添加/删除/排序章节             │
│        ├─ 编辑提示词 (prompt)           │
│        └─ 多层级嵌套                    │
│
└────────────────┬─────────────────────────┘
                 │
                 ▼
        ┌────────────────┐
        │ ReportTemplate │
        │ Config Type    │
        │                │
        │ {             │
        │  id            │
        │  name          │
        │  sections: [{  │
        │    id          │
        │    title       │
        │    prompt      │
        │    level       │
        │    order       │
        │    children    │
        │  }]            │
        │  metadata      │
        │  outputFormat  │
        │ }              │
        └────────┬───────┘
                 │
                 ▼
        ┌──────────────────┐
        │ templateStorage  │
        │ (localStorage)   │
        │                  │
        │ STORAGE_KEY =    │
        │ 'report-temp...  │
        │                  │
        │ 存储格式:        │
        │ {                │
        │  version         │
        │  templates: []   │
        │  activeTemplate  │
        │  lastUpdated     │
        │ }                │
        └──────────────────┘
```

## 7. 组件树结构

```
<App>  (main.tsx)
│
├─ <BrowserRouter>
│  │
│  └─ <Routes>
│     │
│     ├─ <Route path="/" element={<Directory />}>
│     │
│     ├─ <Route path="/about" element={<Layout><About /></Layout>}>
│     │
│     ├─ <Route path="/产权/*" element={<Layout><产权Pages /></Layout>}>
│     │  ├─ /产权/template-editor.tsx
│     │  ├─ /产权/ai-content-factory-pro.tsx
│     │  └─ /产权/...
│     │
│     ├─ <Route path="/ai-consulting/*" element={<Layout><AIPages /></Layout>}>
│     │
│     └─ ... 更多路由
│
├─ <Layout>  (空容器组件)
│  └─ {children}
│
内部组件树 (以 Directory 为例):
<Directory basePath={string}>
  ├─ <div className="container">
  │  ├─ <Grid>
  │  │  ├─ <Button>  (返回按钮)
  │  │  └─ <h1>      (标题)
  │  │
  │  ├─ <Input icon={Search} />  (搜索框)
  │  │
  │  ├─ <div className="grid grid-cols-3">
  │  │  └─ {filteredPageList.map(item =>
  │  │       <Card key={item.path}>
  │  │         ├─ <CardHeader>
  │  │         │  ├─ {item.type === 'folder' ? <Folder /> : <FileText />}
  │  │         │  ├─ <CardTitle>{item.title}</CardTitle>
  │  │         │  └─ <CardDescription>{item.description}</CardDescription>
  │  │         └─ </CardHeader>
  │  │       </Card>
  │  │     )}
```

## 8. TypeScript 类型系统概览

```
核心类型文件: src/types/template.ts

├─ TemplateSection (章节节点)
│  ├─ id: string
│  ├─ title: string          (如 "一、市场概况")
│  ├─ prompt: string         (生成提示词)
│  ├─ level: 1 | 2 | 3       (标题级别)
│  ├─ order: number
│  ├─ children?: TemplateSection[]  (递归子章节)
│  ├─ isRequired?: boolean
│  └─ placeholder?: string
│
├─ ReportTemplateConfig (完整模板配置)
│  ├─ id: string
│  ├─ name: string
│  ├─ description: string
│  ├─ category: string       (如 "产权", "金融")
│  ├─ industry: string
│  ├─ systemRole: string     (系统角色)
│  ├─ sections: TemplateSection[]
│  ├─ metadata: {
│  │  ├─ createdAt: string (ISO)
│  │  ├─ updatedAt: string (ISO)
│  │  ├─ version: string
│  │  └─ tags: string[]
│  │}
│  └─ outputFormat: {
│     ├─ useWebSearch: boolean
│     └─ formatInstructions: string
│  }
│
└─ TemplateLibrary (存储格式)
   ├─ version: string
   ├─ templates: ReportTemplateConfig[]
   ├─ activeTemplateId: string | null
   └─ lastUpdated: string (ISO)

自定义 Artifact 元数据:
export const meta = {
  title: string;
  description: string;
  isHidden?: boolean;
  category?: string;
  order?: number;
}
```

---

## 9. 性能优化机会

```
┌──────────────────────────────────────────┐
│        性能分析与优化点                   │
└──────────────────────────────────────────┘

当前问题                          建议优化
────────────────────────────────────────────

❌ 急加载所有 artifacts        → ✅ 改为 eager: false
   (65+ 文件进行 eager: true)      使用 lazy loading

❌ Directory 搜索无缓存          → ✅ useMemo 缓存
   每次打字都重新遍历 pageList     避免重复计算

❌ 完整加载 40+ UI 组件          → ✅ 按需导入
   即使未使用也被打包              Tree-shaking

❌ window.claude 全局挂载        → ✅ 自定义 Hook
   增加内存占用                  useAI() Hook

❌ localStorage 单线程存储       → ✅ IndexedDB
   大量模板时性能下降              支持异步 + 更大容量

❌ 网络搜索 SSE 不稳定          → ✅ 重试机制
   断线重连                       断点续传

❌ Main.tsx 路由重复生成        → ✅ 统一配置
   与 vite-plugin-pages 冗余      去除重复逻辑
```

---

## 10. 安全风险评估

```
┌──────────────────────────────────┐
│        安全风险矩阵               │
└──────────────────────────────────┘

风险等级    问题                    影响          缓解方案
─────────────────────────────────────────────────────
高         API Key 暴露           令牌泄露       后端代理
          (VITE_OPENROUTER_API_KEY) 滥用调用       
          
高         无身份验证             任何人可      Auth 中间件
          访问 admin.tsx         修改配置       令牌验证

中         localStorage          跨标签页      自定义存储
          数据不同步            数据不一致      方案

中         类型检查宽松          运行时异常     启用 strict
          (strict: false)       难以调试

中         无错误边界            单点故障       Error Boundary
                               影响整体        全局异常处理

低         bundle 过大           首屏加载慢     代码分割
                               用户体验        按需加载

低         没有日志系统          难以调试       集成日志库
                               问题追踪        Sentry/LogRocket
```

