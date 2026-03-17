/* eslint-disable react-refresh/only-export-components */
import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { useRoutes, useLocation } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import Directory from './artifacts/directory';
import Navbar from './components/layout/Navbar';
import LoadingSpinner from './components/layout/LoadingSpinner';
import ScrollToTop from './components/layout/ScrollToTop';
import NotFoundPage from './components/layout/NotFoundPage';
import ErrorBoundary from './components/layout/ErrorBoundary';
import './index.css'
import './lib/openrouter'; // 初始化 window.claude

// 使用懒加载导入页面 - 代码分割
const lazyPages = import.meta.glob('./artifacts/**/*.tsx') as Record<string, () => Promise<{ default: React.ComponentType }>>;

// 不显示导航栏的路由
const hideNavbarPaths = ['/admin'];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const showNavbar = !hideNavbarPaths.some(p => location.pathname.startsWith(p));

  return (
    <div className="min-h-screen flex flex-col">
      {showNavbar && <Navbar />}
      <main className="flex-1">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>
    </div>
  );
};

// 创建懒加载组件
const createLazyComponent = (importFn: () => Promise<{ default: React.ComponentType }>) => {
  const LazyComponent = lazy(importFn);
  return () => (
    <Suspense fallback={<LoadingSpinner />}>
      <LazyComponent />
    </Suspense>
  );
};

function App() {
  // 生成路由配置
  const customRoutes: RouteObject[] = [
    {
      path: '/',
      element: <Layout><Directory /></Layout>
    }
  ];

  // 处理所有页面路由
  Object.entries(lazyPages).forEach(([path]) => {
    // 从文件路径提取路由路径
    const routePath = path
      .replace('./artifacts/', '')
      .replace('.tsx', '');

    if (routePath === 'directory') return;

    // 使用懒加载的组件
    const LazyPage = createLazyComponent(lazyPages[path]);

    customRoutes.push({
      path: `/${routePath}`,
      element: <Layout><LazyPage /></Layout>
    });

    // 处理目录路由
    const pathParts = routePath.split('/');
    pathParts.forEach((_, index) => {
      if (index < pathParts.length - 1) {
        const dirPath = '/' + pathParts.slice(0, index + 1).join('/');
        if (!customRoutes.find(r => r.path === dirPath)) {
          customRoutes.push({
            path: dirPath,
            element: <Layout><Directory basePath={dirPath} /></Layout>
          });
        }
      }
    });
  });

  // 404 路由
  customRoutes.push({
    path: '*',
    element: <Layout><NotFoundPage /></Layout>
  });

  return (
    <>
      {useRoutes(customRoutes)}
      <ScrollToTop />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
