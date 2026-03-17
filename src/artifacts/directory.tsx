import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Grid, Folder, ChevronLeft, FileText, Search, LayoutGrid, List } from 'lucide-react';

const pages = import.meta.glob('./**/*.tsx', { eager: true }) as Record<string, {
  default: React.ComponentType;
  meta?: {
    title?: string;
    description?: string;
    isHidden?: boolean;
    category?: string;
    order?: number;
  };
}>;

interface DirectoryProps {
  basePath?: string;
}

interface DirectoryItem {
  type: 'file' | 'folder';
  path: string;
  title: string;
  description: string;
  meta?: {
    title?: string;
    description?: string;
    isHidden?: boolean;
    category?: string;
    order?: number;
  };
}

const Directory = ({ basePath = '' }: DirectoryProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // 生成页面和文件夹信息
  const generatePageList = (currentPath = ''): DirectoryItem[] => {
    const normalizedCurrentPath = currentPath.replace(/^\/+|\/+$/g, '');

    const allPaths = Object.entries(pages).map(([path, module]) => ({
      path: path.replace('./', ''),
      module
    })).filter(({ path }) => path !== 'directory.tsx');

    const processedItems = new Map<string, DirectoryItem>();

    allPaths.forEach(({ path, module }) => {
      if (path === 'directory.tsx') return;

      let relativePath: string;

      if (!normalizedCurrentPath) {
        relativePath = path;
      } else {
        if (!path.startsWith(normalizedCurrentPath + '/')) {
          return;
        }
        relativePath = path.slice(normalizedCurrentPath.length + 1);
      }

      const parts = relativePath.split('/');

      if (parts.length === 1) {
        if (path.endsWith('.tsx')) {
          const fileName = parts[0].replace('.tsx', '');
          if (!processedItems.has(fileName)) {
            processedItems.set(fileName, {
              type: 'file',
              path: normalizedCurrentPath ? `/${normalizedCurrentPath}/${fileName}` : `/${fileName}`,
              title: module.meta?.title || fileName,
              description: module.meta?.description || `${fileName} 页面`,
              meta: module.meta
            });
          }
        }
      } else {
        const dirName = parts[0];
        if (!processedItems.has(dirName)) {
          processedItems.set(dirName, {
            type: 'folder',
            path: normalizedCurrentPath
              ? `/${normalizedCurrentPath}/${dirName}`
              : `/${dirName}`,
            title: dirName.charAt(0).toUpperCase() + dirName.slice(1),
            description: `${dirName} 目录`
          });
        }
      }
    });

    return Array.from(processedItems.values())
      .filter(item => item.type === 'folder' || !item.meta?.isHidden)
      .sort((a, b) => {
        if (a.type === 'folder' && b.type !== 'folder') return -1;
        if (a.type !== 'folder' && b.type === 'folder') return 1;
        const orderA = a.meta?.order ?? Infinity;
        const orderB = b.meta?.order ?? Infinity;
        if (orderA !== orderB) return orderA - orderB;
        return a.title.localeCompare(b.title);
      });
  };

  const pageList = generatePageList(basePath);

  // 提取所有分类
  const categories = useMemo(() => {
    const cats = new Set<string>();
    cats.add('全部');
    pageList.forEach(item => {
      if (item.meta?.category) {
        cats.add(item.meta.category);
      }
      if (item.type === 'folder') {
        cats.add('目录');
      }
    });
    return Array.from(cats);
  }, [pageList]);

  // 过滤页面列表
  const filteredPageList = useMemo(() => {
    return pageList.filter(item => {
      // 搜索过滤
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // 分类过滤
      if (selectedCategory !== '全部') {
        if (selectedCategory === '目录') {
          return item.type === 'folder';
        }
        return item.meta?.category === selectedCategory;
      }

      return true;
    });
  }, [pageList, searchQuery, selectedCategory]);

  const handleItemClick = (item: DirectoryItem) => {
    navigate(item.type === 'folder' ? item.path : `${item.path}`);
  };

  // 统计
  const folderCount = pageList.filter(i => i.type === 'folder').length;
  const fileCount = pageList.filter(i => i.type === 'file').length;

  return (
    <div className="container mx-auto py-6 px-4">
      {/* 头部 */}
      <div className="flex items-center gap-3 mb-6">
        {basePath && (
          <button
            onClick={() => navigate(basePath.split('/').slice(0, -1).join('/') || '/')}
            className="p-2 hover:bg-accent rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        <div>
          <div className="flex items-center gap-2">
            <Grid className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold">
              {basePath ? `${decodeURIComponent(basePath.substring(1))}` : '页面目录'}
            </h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            共 {folderCount} 个目录，{fileCount} 个页面
          </p>
        </div>
      </div>

      {/* 搜索和筛选 */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 max-w-md">
          <Input
            icon={<Search className="w-4 h-4 text-muted-foreground" />}
            placeholder="搜索页面..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            className="h-9 w-9"
            onClick={() => setViewMode('grid')}
          >
            <LayoutGrid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="icon"
            className="h-9 w-9"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* 分类标签 */}
      {categories.length > 2 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(cat => (
            <Badge
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              className="cursor-pointer hover:bg-primary/80 hover:text-primary-foreground transition-colors"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>
      )}

      {/* 搜索结果提示 */}
      {searchQuery && (
        <div className="mb-4 text-sm text-muted-foreground">
          找到 {filteredPageList.length} 个结果
        </div>
      )}

      {/* 内容区域 */}
      {filteredPageList.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>没有找到匹配的页面</p>
          {searchQuery && (
            <Button
              variant="link"
              onClick={() => { setSearchQuery(''); setSelectedCategory('全部'); }}
              className="mt-2"
            >
              清除筛选条件
            </Button>
          )}
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredPageList.map((item) => (
            <Card
              key={item.path}
              className="cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-1 hover:border-primary/30 group"
              onClick={() => handleItemClick(item)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    item.type === 'folder'
                      ? 'bg-blue-50 dark:bg-blue-950'
                      : 'bg-gray-50 dark:bg-gray-900'
                  }`}>
                    {item.type === 'folder' ? (
                      <Folder className="w-5 h-5 text-blue-500" />
                    ) : (
                      <FileText className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base truncate group-hover:text-primary transition-colors">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="mt-1 text-xs line-clamp-2">
                      {item.description}
                    </CardDescription>
                    {item.meta?.category && (
                      <Badge variant="secondary" className="mt-2 text-xs">
                        {item.meta.category}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredPageList.map((item) => (
            <div
              key={item.path}
              className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-accent/50 transition-colors group"
              onClick={() => handleItemClick(item)}
            >
              {item.type === 'folder' ? (
                <Folder className="w-5 h-5 text-blue-500 flex-shrink-0" />
              ) : (
                <FileText className="w-5 h-5 text-gray-500 flex-shrink-0 group-hover:text-primary transition-colors" />
              )}
              <div className="flex-1 min-w-0">
                <span className="font-medium group-hover:text-primary transition-colors truncate block">
                  {item.title}
                </span>
                <span className="text-xs text-muted-foreground truncate block">
                  {item.description}
                </span>
              </div>
              {item.meta?.category && (
                <Badge variant="secondary" className="text-xs flex-shrink-0">
                  {item.meta.category}
                </Badge>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Directory;
