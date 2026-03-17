import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Menu, X, Moon, Sun, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // 生成面包屑
  const pathParts = location.pathname.split('/').filter(Boolean);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo 和首页链接 */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="flex items-center gap-2 font-semibold"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Artifact Runner</span>
            </Button>

            {/* 面包屑导航 */}
            {pathParts.length > 0 && (
              <div className="hidden sm:flex items-center gap-1 text-sm text-muted-foreground">
                {pathParts.map((part, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <ChevronRight className="w-3 h-3" />
                    <button
                      onClick={() => navigate('/' + pathParts.slice(0, index + 1).join('/'))}
                      className="hover:text-foreground transition-colors truncate max-w-[120px]"
                    >
                      {decodeURIComponent(part)}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 右侧操作 */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="h-8 w-8"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {/* 移动端菜单按钮 */}
            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden h-8 w-8"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* 移动端面包屑 */}
        {mobileMenuOpen && pathParts.length > 0 && (
          <div className="sm:hidden pb-3 border-t pt-2">
            <div className="flex flex-wrap items-center gap-1 text-sm">
              <button
                onClick={() => { navigate('/'); setMobileMenuOpen(false); }}
                className="text-primary hover:underline"
              >
                首页
              </button>
              {pathParts.map((part, index) => (
                <div key={index} className="flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-muted-foreground" />
                  <button
                    onClick={() => {
                      navigate('/' + pathParts.slice(0, index + 1).join('/'));
                      setMobileMenuOpen(false);
                    }}
                    className="text-primary hover:underline"
                  >
                    {decodeURIComponent(part)}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
