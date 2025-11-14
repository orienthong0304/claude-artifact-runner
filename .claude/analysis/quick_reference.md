# React 项目快速参考指南

## 核心概念一览

### 路由系统
- **自动化**：基于文件系统 (vite-plugin-pages)
- **映射**：`src/artifacts/*.tsx` → `/:name`
- **嵌套**：`src/artifacts/产权/*.tsx` → `/产权/:name`
- **导航**：Directory 组件提供可视化导航

### 关键组件
1. **Directory** - 页面导航和搜索
2. **TemplateEditor** - 模板管理（多层级章节）
3. **40+ UI 组件** - Shadcn UI 完整库
4. **openrouter.ts** - AI 集成 (4 个方法)

### 数据流
```
用户输入 → AI 处理 → 实时流式输出 → 导出选项
           (OpenRouter API)    (Word/PDF/JSON)
```

---

## 最常用的代码片段

### 1. 创建新 Artifact 页面

```typescript
// src/artifacts/my-page.tsx
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

export const meta = {
  title: '我的页面标题',
  description: '页面描述',
  category: '分类',
  order: 1,  // 排序权重
};

export default function MyPage() {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>标题</CardTitle>
        </CardHeader>
      </Card>
      <Button>点击我</Button>
    </div>
  );
}
```

### 2. 使用 AI 完成功能

```typescript
// 简单调用
const result = await window.claude.complete("提示词");

// 流式读取 (实时显示)
let fullText = '';
for await (const chunk of window.claude.completeStream(prompt)) {
  fullText += chunk;
  setContent(fullText);  // 实时更新 UI
}

// 网络搜索 (带引用)
for await (const data of window.claude.completeStreamWithWebSearch(prompt)) {
  if (data.content) {
    setContent(prev => prev + data.content);
  }
  if (data.citations) {
    setCitations(data.citations);  // 显示引用链接
  }
}
```

### 3. 导入常用组件

```typescript
// UI 组件
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';

// 图标
import { Search, Plus, Trash, Settings, ChevronLeft } from 'lucide-react';

// 工具
import { cn } from '@/lib/utils';  // className 合并
```

### 4. 处理表单

```typescript
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Form() {
  const [data, setData] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 处理提交
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input 
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder="输入内容..."
      />
      <Button type="submit">提交</Button>
    </form>
  );
}
```

### 5. 使用响应式网格布局

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => (
    <Card key={item.id}>
      {/* 内容 */}
    </Card>
  ))}
</div>
```

---

## 命令速查表

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 (localhost:5173) |
| `npm run build` | 生产构建 (输出到 dist/) |
| `npm run lint` | ESLint 检查 |
| `npm run preview` | 预览生产构建 |
| `npm run deploy` | 部署到服务器 |

---

## 文件路径速查

```
核心库函数：
src/lib/
  ├─ openrouter.ts          → window.claude
  ├─ templateStorage.ts      → localStorage 操作
  ├─ des-encryption.js       → 加密工具
  └─ utils.ts               → 通用工具

UI 组件：
src/components/ui/
  ├─ button.tsx
  ├─ input.tsx
  ├─ card.tsx
  ├─ dialog.tsx
  ├─ form.tsx
  └─ ... 40+ 个

模板系统：
src/components/template/
  ├─ TemplateEditor.tsx      → 编辑器主组件
  ├─ TemplateManager.tsx     → 列表管理
  └─ SectionTree.tsx         → 章节树编辑

类型定义：
src/types/
  └─ template.ts            → ReportTemplate 类型

配置文件：
  ├─ vite.config.ts         → Vite 配置
  ├─ tailwind.config.mjs     → Tailwind 配置
  ├─ tsconfig.json           → TypeScript 配置
  └─ package.json            → 依赖管理
```

---

## 环境变量配置

创建 `.env` 文件：
```bash
VITE_OPENROUTER_API_KEY=your_key_here
VITE_SITE_URL=http://localhost:5173
VITE_SITE_NAME=Claude Artifact Runner
```

---

## 项目配置速查

### TypeScript 严格模式
目前禁用 (`strict: false`)
修改位置：`tsconfig.json` 第 16 行

### 路由基础路径
无基础路径，从根开始
修改位置：`vite.config.ts` 第 11 行

### Tailwind 前缀
无前缀 (`prefix: ""`)
修改位置：`tailwind.config.mjs` 第 13 行

### API 端点
OpenRouter: `https://openrouter.ai/api/v1`
模型: `anthropic/claude-sonnet-4.5`
修改位置：`src/lib/openrouter.ts` 第 10 行

---

## 常见问题速解

### Q: 如何隐藏某个页面？
```typescript
export const meta = {
  isHidden: true,  // 从 Directory 中隐藏
};
```

### Q: 如何排序页面？
```typescript
export const meta = {
  order: 1,  // 越小越靠前
};
```

### Q: 如何访问 AI API？
```typescript
// 全局可用
window.claude.complete(prompt)
window.claude.completeStream(prompt)
window.claude.completeWithWebSearch(prompt)
```

### Q: 如何修改 UI 样式？
```typescript
// 使用 Tailwind CSS 类名
<Button className="custom-class">
  
// 或修改组件 variant
<Button variant="destructive" size="lg">
```

### Q: 如何添加页面元数据？
```typescript
export const meta = {
  title: '页面标题',              // 必需
  description: '页面描述',         // 必需
  isHidden: false,               // 可选
  category: '分类',              // 可选
  order: 1,                      // 可选
};
```

### Q: 路由如何工作？
1. 扫描 `src/artifacts/**/*.tsx`
2. 提取 `export const meta`
3. 生成路由表
4. Directory 根据 meta 生成导航

---

## 依赖包速查

### UI 框架
- `react` - 核心框架
- `react-router-dom` - 路由管理

### UI 组件库
- `@radix-ui/*` (26个) - 无头 UI 原语
- `lucide-react` - 图标库
- `class-variance-authority` - 变体系统
- `clsx` - className 工具

### 数据和表单
- `react-hook-form` - 表单管理
- `zod` - 验证库
- `date-fns` - 日期处理

### 文档导出
- `xlsx` - Excel 支持
- `docx` - Word 支持
- `html-to-docx` - HTML 转 Word
- `html2canvas` - HTML 截图

### 图表和图形
- `echarts` - 数据可视化
- `recharts` - React 图表
- `mermaid` - 流程图

### 动画和样式
- `framer-motion` - 高级动画
- `tailwindcss` - CSS 框架
- `tailwindcss-animate` - 动画扩展
- `next-themes` - 主题管理

### AI 集成
- `openai` - OpenRouter 客户端

---

## 性能指标

| 指标 | 当前值 | 目标值 |
|------|--------|--------|
| 源代码文件 | 169 | 降低到 <150 |
| 总代码行数 | 74,201 | 优化到 <60K |
| UI 组件 | 40+ | 精简到 30 |
| Artifact 文件 | 65+ | 理想 50 左右 |
| Bundle 初始 | 缓慢 | <1MB (gzip) |

---

## 最后的建议

### 立即行动项
1. 启用 TypeScript strict 模式
2. 添加 API 密钥后端代理
3. 实现路由权限保护
4. 添加全局错误边界

### 改进计划（按优先级）
1. (高) 安全加固
2. (中) 性能优化
3. (低) 代码质量提升

### 学习资源
- Vite 文档：https://vitejs.dev
- React 文档：https://react.dev
- Shadcn UI：https://ui.shadcn.com
- Tailwind CSS：https://tailwindcss.com

