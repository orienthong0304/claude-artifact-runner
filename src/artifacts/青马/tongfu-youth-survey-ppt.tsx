import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Users, Briefcase, TrendingUp, Award, Heart, Target, Maximize, Minimize } from 'lucide-react';

interface Slide {
  type: string;
  content: JSX.Element;
}

const PPTPresentation: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const slides: Slide[] = [
    // 封面 - 调整配色，降低饱和度
    {
      type: 'cover',
      content: (
        <div className="h-full bg-gradient-to-br from-red-500 via-red-600 to-orange-600 text-white flex flex-col items-center justify-center p-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10 text-center">
            <h1 className="text-7xl font-bold mb-12">2025年</h1>
            <h2 className="text-6xl font-bold mb-16 leading-tight">
              中国通服广东公司<br/>青年思想动态调研报告
            </h2>
            <div className="mt-20 text-2xl">
              <p className="mb-3">中国通服广东公司团委</p>
              <p className="text-xl">2025年</p>
            </div>
          </div>
        </div>
      )
    },

    // 目录
    {
      type: 'toc',
      content: (
        <div className="h-full bg-gradient-to-br from-gray-50 to-gray-100 p-16">
          <h2 className="text-5xl font-bold text-red-700 mb-16 border-b-4 border-red-600 pb-6">目录</h2>
          <div className="grid grid-cols-3 gap-10">
            <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all border-l-4 border-red-600">
              <div className="text-7xl font-bold text-red-600 mb-6">01</div>
              <h3 className="text-3xl font-bold text-gray-800">调研概况</h3>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all border-l-4 border-red-600">
              <div className="text-7xl font-bold text-red-600 mb-6">02</div>
              <h3 className="text-3xl font-bold text-gray-800">主要调研发现</h3>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all border-l-4 border-red-600">
              <div className="text-7xl font-bold text-red-600 mb-6">03</div>
              <h3 className="text-3xl font-bold text-gray-800">结论与建议</h3>
            </div>
          </div>
        </div>
      )
    },

    // 调研概况 - P3
    {
      type: 'overview',
      content: (
        <div className="h-full bg-gradient-to-br from-white to-gray-50 p-14">
          <h2 className="text-5xl font-bold text-red-700 mb-10 border-b-4 border-red-600 pb-4 inline-block">调研概况</h2>
          <div className="bg-blue-50 p-8 rounded-lg mb-10 border-l-4 border-blue-600">
            <p className="text-2xl text-gray-700 leading-relaxed mb-4">
              本次调研旨在全面了解中国通服广东公司青年员工的思想动态、工作状态、成长需求，为公司优化青年人才培养机制提供依据。
            </p>
            <p className="text-xl text-gray-700 font-semibold">
              调研覆盖<span className="text-red-600 text-2xl mx-2">13个专业公司团委、广东公司本部及研究总院青年</span>，共回收有效样本 <span className="text-red-600 text-3xl mx-2">2,214份</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-red-600 mb-6 flex items-center">
                <Users className="mr-3 w-8 h-8" /> 年龄结构
              </h3>
              <div className="text-center mb-4">
                <p className="text-lg font-bold text-gray-700">青年群体为绝对主体</p>
              </div>
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-lg font-semibold">30岁及以下</span>
                    <span className="text-red-600 font-bold text-2xl">51.89%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-4">
                    <div className="bg-red-600 h-4 rounded-full" style={{width: '51.89%'}}></div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-purple-50 p-4 rounded">
                    <div className="text-gray-600 text-sm">24岁以下</div>
                    <div className="text-2xl font-bold text-purple-600">8.67%</div>
                  </div>
                  <div className="bg-red-50 p-4 rounded">
                    <div className="text-gray-600 text-sm">25-30岁</div>
                    <div className="text-2xl font-bold text-red-600">43.22%</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded">
                    <div className="text-gray-600 text-sm">31-35岁</div>
                    <div className="text-2xl font-bold text-blue-600">48.11%</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-red-600 mb-6 flex items-center">
                <Briefcase className="mr-3 w-8 h-8" /> 成长阶段（工作年限）
              </h3>
              <div className="text-center mb-4">
                <p className="text-lg font-bold text-gray-700">各成长阶段员工比较均衡</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded">
                  <span className="text-base">新员工（1年以内）</span>
                  <span className="text-xl font-bold text-purple-600">4.47%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 rounded">
                  <span className="text-base">入门期（1-3年）</span>
                  <span className="text-xl font-bold text-red-600">19.65%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded">
                  <span className="text-base">成长期（4-6年）</span>
                  <span className="text-xl font-bold text-orange-600">24.21%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                  <span className="text-base">成熟期（7-9年）</span>
                  <span className="text-xl font-bold text-blue-600">23.44%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <span className="text-base">影响期（10年及以上）</span>
                  <span className="text-xl font-bold text-gray-600">28.23%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // 调研概况-2 - P4
    {
      type: 'overview2',
      content: (
        <div className="h-full bg-gradient-to-br from-white to-gray-50 p-14">
          <h2 className="text-5xl font-bold text-red-700 mb-10 border-b-4 border-red-600 pb-4 inline-block">调研概况（续）</h2>

          <div className="grid grid-cols-3 gap-8 mb-8">
            <div className="bg-white p-7 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-red-600 mb-5">政治面貌</h3>
              <div className="text-center mb-3">
                <p className="text-base font-bold text-gray-700">共青团员和中国党员占比过半</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded">
                  <span className="text-sm">中共党员</span>
                  <span className="text-xl font-bold text-blue-600">26.29%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 rounded">
                  <span className="text-sm">共青团员</span>
                  <span className="text-xl font-bold text-red-600">28.64%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded">
                  <span className="text-sm">群众</span>
                  <span className="text-xl font-bold text-orange-600">44.9%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded">
                  <span className="text-sm">民主党派</span>
                  <span className="text-lg font-bold text-purple-600">0.18%</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-7 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-red-600 mb-5">岗位分布</h3>
              <div className="text-center mb-3">
                <p className="text-base font-bold text-gray-700">生产交付领域员工占比较大</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded">
                  <span className="text-base">生产交付</span>
                  <div className="flex items-center">
                    <div className="w-28 bg-gray-200 rounded-full h-3 mr-3">
                      <div className="bg-red-600 h-3 rounded-full" style={{width: '50.81%'}}></div>
                    </div>
                    <span className="font-bold text-red-600 text-lg">50.81%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded">
                  <span className="text-base">职能支撑</span>
                  <div className="flex items-center">
                    <div className="w-28 bg-gray-200 rounded-full h-3 mr-3">
                      <div className="bg-orange-500 h-3 rounded-full" style={{width: '32.02%'}}></div>
                    </div>
                    <span className="font-bold text-orange-600 text-lg">32.02%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded">
                  <span className="text-base">技术研发</span>
                  <div className="flex items-center">
                    <div className="w-28 bg-gray-200 rounded-full h-3 mr-3">
                      <div className="bg-blue-500 h-3 rounded-full" style={{width: '10.25%'}}></div>
                    </div>
                    <span className="font-bold text-blue-600 text-lg">10.25%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded">
                  <span className="text-base">市场营销</span>
                  <div className="flex items-center">
                    <div className="w-28 bg-gray-200 rounded-full h-3 mr-3">
                      <div className="bg-green-500 h-3 rounded-full" style={{width: '6.91%'}}></div>
                    </div>
                    <span className="font-bold text-green-600 text-lg">6.91%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-7 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-red-600 mb-5">岗位级别</h3>
              <div className="text-center mb-3">
                <p className="text-base font-bold text-gray-700">基层员工为主</p>
              </div>
              <div className="relative h-40 mb-3">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#fee2e2" strokeWidth="40"/>
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#dc2626" strokeWidth="40"
                    strokeDasharray={`${70.91 * 5.03} ${100 * 5.03}`}
                    transform="rotate(-90 100 100)"/>
                  <text x="100" y="95" textAnchor="middle" className="text-2xl font-bold fill-red-600">70.91%</text>
                  <text x="100" y="115" textAnchor="middle" className="text-sm fill-gray-600">十岗及以下</text>
                </svg>
              </div>
              <div className="text-xs space-y-1">
                <div className="flex justify-between"><span>九岗</span><span className="font-bold">18.25%</span></div>
                <div className="flex justify-between"><span>八岗</span><span className="font-bold">7.45%</span></div>
                <div className="flex justify-between"><span>七岗</span><span className="font-bold">2.08%</span></div>
                <div className="flex justify-between"><span>六岗及以上</span><span className="font-bold">1.31%</span></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="bg-white p-7 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-red-600 mb-5">文化程度</h3>
              <div className="text-center mb-3">
                <p className="text-base font-bold text-gray-700">本科学历为主</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded">
                  <span className="text-sm">本科</span>
                  <span className="text-xl font-bold text-red-600">79.27%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                  <span className="text-sm">硕士</span>
                  <span className="text-lg font-bold text-blue-600">11.79%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <span className="text-sm">专科</span>
                  <span className="text-lg font-bold text-gray-600">8.67%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded">
                  <span className="text-sm">博士</span>
                  <span className="text-base font-bold text-purple-600">0.27%</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-7 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-red-600 mb-5">性别分布</h3>
              <div className="text-center mb-3">
                <p className="text-base font-bold text-gray-700">男性员工占比较高</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <span className="text-base font-semibold">男</span>
                  <span className="text-2xl font-bold text-blue-600">64.77%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-pink-50 rounded-lg">
                  <span className="text-base font-semibold">女</span>
                  <span className="text-2xl font-bold text-pink-600">35.23%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // 主要发现1-青年状态 - P5
    {
      type: 'findings1',
      content: (
        <div className="h-full bg-gradient-to-br from-white to-gray-50 p-12">
          <h2 className="text-4xl font-bold text-red-700 mb-8 border-b-4 border-red-600 pb-4 inline-block">主要调研发现（一）：工作状态与思维特征</h2>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-green-600 mb-6 flex items-center">
                <TrendingUp className="mr-3 w-8 h-8" /> 对当前工作岗位的想法
              </h3>
              <div className="space-y-4">
                <div className="bg-green-50 p-5 rounded-lg border-l-4 border-green-600">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">是理想的工作，能获得乐趣和成就感</span>
                    <span className="text-4xl font-bold text-green-600">57.14%</span>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-base">不是理想的工作，但会努力做好</span>
                    <span className="text-2xl font-bold text-blue-600">29.86%</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gray-50 p-3 rounded text-center">
                    <div className="text-xl font-bold text-gray-600">5.6%</div>
                    <div className="text-xs text-gray-600 mt-1">喜欢但没信心</div>
                  </div>
                  <div className="bg-orange-50 p-3 rounded text-center">
                    <div className="text-xl font-bold text-orange-600">4.16%</div>
                    <div className="text-xs text-gray-600 mt-1">有跳槽想法</div>
                  </div>
                  <div className="bg-red-50 p-3 rounded text-center">
                    <div className="text-xl font-bold text-red-600">3.25%</div>
                    <div className="text-xs text-gray-600 mt-1">希望换岗位</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-blue-600 mb-6 flex items-center">
                <Award className="mr-3 w-8 h-8" /> 突出的思维能力（可选三项）
              </h3>
              <div className="space-y-3">
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                  <div className="flex justify-between items-center">
                    <span className="text-base">分析问题能举一反三、触类旁通</span>
                    <span className="text-2xl font-bold text-blue-600">70.96%</span>
                  </div>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">善于指出问题的关键及缺漏</span>
                    <span className="text-xl font-bold text-green-600">60.89%</span>
                  </div>
                </div>
                <div className="bg-purple-50 p-3 rounded">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">表达意见时能保持客观公正</span>
                    <span className="text-xl font-bold text-purple-600">51.54%</span>
                  </div>
                </div>
                <div className="bg-orange-50 p-3 rounded">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">能提出独出心裁、出乎意料的见解</span>
                    <span className="text-xl font-bold text-orange-600">32.57%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-purple-600 mb-6">面对工作任务的精神状态</h3>
              <div className="space-y-3">
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-semibold">压力大，但有信心解决困难</span>
                    <span className="text-3xl font-bold text-green-600">48.92%</span>
                  </div>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">精神饱满，处理事情游刃有余</span>
                    <span className="text-2xl font-bold text-blue-600">22.45%</span>
                  </div>
                </div>
                <div className="bg-orange-50 p-3 rounded">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">偶尔有快要崩溃的感觉</span>
                    <span className="text-xl font-bold text-orange-600">15.27%</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-red-50 p-2 rounded text-center">
                    <div className="text-lg font-bold text-red-600">10.7%</div>
                    <div className="text-xs text-gray-600 mt-1">越来越不感兴趣</div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded text-center">
                    <div className="text-lg font-bold text-gray-600">2.66%</div>
                    <div className="text-xs text-gray-600 mt-1">工作压力小</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-orange-600 mb-6">遇到困难的解决方式</h3>
              <div className="space-y-4">
                <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-600">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-orange-600 mb-3">60.07%</div>
                    <div className="text-xl font-semibold text-gray-700">与同事沟通，协同解决</div>
                    <div className="text-sm text-gray-600 mt-2">团队协作是主流选择</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded text-center">
                    <div className="text-3xl font-bold text-blue-600">21.95%</div>
                    <div className="text-sm text-gray-600 mt-2">自我摸索解决</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded text-center">
                    <div className="text-3xl font-bold text-purple-600">17.98%</div>
                    <div className="text-sm text-gray-600 mt-2">寻求领导帮助</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // 主要发现2-职业发展 - P6
    {
      type: 'findings2',
      content: (
        <div className="h-full bg-gradient-to-br from-white to-gray-50 p-8 flex flex-col">
          <h2 className="text-3xl font-bold text-red-700 mb-4 border-b-4 border-red-600 pb-3 inline-block">主要调研发现（二）：职业发展与需求</h2>

          <div className="grid grid-cols-2 gap-5 mb-4 flex-1">
            <div className="bg-white p-5 rounded-xl shadow-lg flex flex-col">
              <h3 className="text-xl font-bold text-red-600 mb-3">职业发展主要问题</h3>
              <div className="space-y-2 flex-1">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded">
                  <span className="text-base">缺少职业发展规划</span>
                  <span className="text-2xl font-bold text-red-600">70.14%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded">
                  <span className="text-base">家庭问题影响工作</span>
                  <span className="text-xl font-bold text-orange-600">23.98%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                  <span className="text-base">业务能力不匹配</span>
                  <span className="text-xl font-bold text-blue-600">21.41%</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-lg flex flex-col">
              <h3 className="text-xl font-bold text-green-600 mb-3">最有效的激励方式</h3>
              <div className="space-y-2 flex-1">
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-lg border-l-4 border-green-600">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-base">增加收入</span>
                    <span className="text-2xl font-bold text-green-600">94.49%</span>
                  </div>
                </div>
                <div className="bg-blue-50 p-2 rounded flex justify-between items-center">
                  <span className="text-base">升岗</span>
                  <span className="font-bold text-blue-600 text-lg">62.33%</span>
                </div>
                <div className="bg-purple-50 p-2 rounded flex justify-between items-center">
                  <span className="text-base">学习和培训机会</span>
                  <span className="font-bold text-purple-600 text-lg">43.27%</span>
                </div>
                <div className="bg-orange-50 p-2 rounded flex justify-between items-center">
                  <span className="text-base">领导重视与关心</span>
                  <span className="font-bold text-orange-600 text-lg">32.11%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 mb-4 flex-1">
            <div className="bg-white p-5 rounded-xl shadow-lg flex flex-col">
              <h3 className="text-xl font-bold text-purple-600 mb-3">团委工作期望</h3>
              <div className="space-y-2 flex-1">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-base">提升业务能力</span>
                    <span className="text-2xl font-bold text-purple-600">66.08%</span>
                  </div>
                  <div className="bg-purple-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{width: '66.08%'}}></div>
                  </div>
                </div>
                <div className="p-2 bg-blue-50 rounded flex justify-between items-center">
                  <span className="text-base">组织文体活动</span>
                  <span className="font-bold text-blue-600 text-lg">60.39%</span>
                </div>
                <div className="p-2 bg-green-50 rounded flex justify-between items-center">
                  <span className="text-base">推优入党</span>
                  <span className="font-bold text-green-600 text-lg">38.71%</span>
                </div>
                <div className="p-2 bg-yellow-50 rounded flex justify-between items-center">
                  <span className="text-base">维护权益</span>
                  <span className="font-bold text-yellow-600 text-lg">34.19%</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-lg flex flex-col">
              <h3 className="text-xl font-bold text-orange-600 mb-3">喜欢的领导形象（可选三项）</h3>
              <div className="space-y-2 flex-1">
                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-3 rounded-lg border-l-4 border-orange-600">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-semibold">经常鼓励并及时与下属沟通反馈</span>
                    <span className="text-2xl font-bold text-orange-600">51.49%</span>
                  </div>
                </div>
                <div className="bg-blue-50 p-2 rounded flex justify-between items-center">
                  <span className="text-sm">对下属工作表现评估公平公正</span>
                  <span className="font-bold text-blue-600 text-lg">39.3%</span>
                </div>
                <div className="bg-purple-50 p-2 rounded flex justify-between items-center">
                  <span className="text-sm">业务能力强到令我心服口服</span>
                  <span className="font-bold text-purple-600 text-lg">37.53%</span>
                </div>
                <div className="bg-green-50 p-2 rounded flex justify-between items-center">
                  <span className="text-sm">给下属尽可能多的工作自主权</span>
                  <span className="font-bold text-green-600 text-lg">37.44%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-50 to-pink-50 p-3 rounded-lg border-l-4 border-red-600">
            <div className="flex items-start">
              <Target className="text-red-600 mr-2 flex-shrink-0 mt-0.5 w-6 h-6" />
              <div>
                <p className="font-bold text-red-700 mb-1 text-base">关键发现</p>
                <p className="text-sm text-gray-700">青年员工高度重视职业发展规划（70.14%），对收入（94.49%）和晋升（62.33%）有强烈期望，期待领导给予沟通反馈（51.49%）和公平评估（39.3%），团委需在能力提升和职业发展方面提供更多支持。</p>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // 主要发现3-战略认知 - P7
    {
      type: 'findings3',
      content: (
        <div className="h-full bg-gradient-to-br from-white to-gray-50 p-8 flex flex-col">
          <h2 className="text-3xl font-bold text-red-700 mb-4 border-b-4 border-red-600 pb-3 inline-block">主要调研发现（三）：企业认知与创新环境</h2>

          <div className="grid grid-cols-2 gap-5 mb-3 flex-1">
            <div className="bg-white p-5 rounded-xl shadow-lg flex flex-col">
              <h3 className="text-xl font-bold text-blue-600 mb-3">关注企业信息情况</h3>
              <div className="space-y-2 flex-1">
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-semibold">主动关注</span>
                    <span className="text-3xl font-bold text-blue-600">51.36%</span>
                  </div>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">偶尔浏览</span>
                    <span className="text-2xl font-bold text-green-600">40.24%</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-50 p-2 rounded text-center">
                    <div className="text-xl font-bold text-gray-600">6.55%</div>
                    <div className="text-xs text-gray-600 mt-1">仅被动接收</div>
                  </div>
                  <div className="bg-red-50 p-2 rounded text-center">
                    <div className="text-lg font-bold text-red-600">1.85%</div>
                    <div className="text-xs text-gray-600 mt-1">完全不看</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-lg flex flex-col">
              <h3 className="text-xl font-bold text-orange-600 mb-3">跨部门交流学习意愿</h3>
              <div className="space-y-2 flex-1">
                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-600">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-semibold">非常愿意，希望拓展技能和视野</span>
                    <span className="text-3xl font-bold text-orange-600">47.56%</span>
                  </div>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">视具体情况而定，如时间允许可尝试</span>
                    <span className="text-2xl font-bold text-blue-600">45.12%</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-50 p-2 rounded text-center">
                    <div className="text-xl font-bold text-gray-600">6.64%</div>
                    <div className="text-xs text-gray-600 mt-1">兴趣不大</div>
                  </div>
                  <div className="bg-red-50 p-2 rounded text-center">
                    <div className="text-lg font-bold text-red-600">0.68%</div>
                    <div className="text-xs text-gray-600 mt-1">完全不愿意</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-lg mb-3">
            <h3 className="text-xl font-bold text-green-600 mb-3 flex items-center">
              <TrendingUp className="mr-2 w-6 h-6" /> 创新环境与工作效率
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-purple-50 p-3 rounded-lg">
                <div className="text-xs text-gray-600 mb-1">国企稳定性吸引力</div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs">福利体系完善</span>
                    <span className="text-lg font-bold text-purple-600">79.77%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs">长期就业保障</span>
                    <span className="text-base font-bold text-blue-600">72.54%</span>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-xs text-gray-600 mb-1">体制机制对创新影响</div>
                <div className="text-center py-2">
                  <div className="text-2xl font-bold text-green-600">51.54%</div>
                  <div className="text-xs text-gray-600 mt-1">认为鼓励创新<br/>提供容错空间</div>
                </div>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <div className="text-xs text-gray-600 mb-1">影响工作效率因素</div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs">缺工具资源</span>
                    <span className="text-base font-bold text-orange-600">50.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs">任务不明确</span>
                    <span className="text-base font-bold text-red-600">49.86%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-lg border-l-4 border-blue-600">
              <div className="text-sm font-bold text-blue-700 mb-1">营造企业氛围的关键</div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">建立良好激励机制，提升认同感和归属感</span>
                <span className="text-2xl font-bold text-blue-600">51.76%</span>
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-lg border-l-4 border-green-600">
              <div className="text-sm font-bold text-green-700 mb-1">领导干部以身作则</div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">带领广大员工创造良好企业氛围</span>
                <span className="text-2xl font-bold text-green-600">25.2%</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-2 rounded-lg border-l-4 border-yellow-600">
            <p className="text-sm font-semibold text-gray-800">
              <span className="text-yellow-700">核心发现：</span>
              青年对企业信息关注度高（91.6%），愿意跨部门交流学习（92.68%），重视国企稳定性（福利体系79.77%、就业保障72.54%），认可创新环境（51.54%），期待完善激励机制（51.76%）和提供充足资源（50.5%）以提升工作效率。
            </p>
          </div>
        </div>
      )
    },

    // 结论与建议 - P8
    {
      type: 'conclusion',
      content: (
        <div className="h-full bg-gradient-to-br from-white to-gray-50 p-8 flex flex-col">
          <h2 className="text-3xl font-bold text-red-700 mb-4 border-b-4 border-red-600 pb-3 inline-block">结论与建议</h2>

          <div className="grid grid-cols-2 gap-5 mb-4">
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-5 rounded-xl shadow-lg border-l-4 border-red-600">
              <h3 className="text-2xl font-bold text-red-700 mb-3">总体结论</h3>
              <div className="space-y-2 text-gray-700 text-base">
                <p className="flex items-start">
                  <span className="text-red-600 mr-2 text-xl">•</span>
                  <span>青年员工整体呈现<strong className="text-red-600">积极向上、重视成长、关注实践</strong>的特点</span>
                </p>
                <p className="flex items-start">
                  <span className="text-red-600 mr-2 text-xl">•</span>
                  <span>对公司战略与改革有较高认知度</span>
                </p>
                <p className="flex items-start">
                  <span className="text-red-600 mr-2 text-xl">•</span>
                  <span>在<strong className="text-orange-600">岗位适配、职业规划、导师机制、改革落地支持</strong>等方面仍存在需求</span>
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl shadow-lg border-l-4 border-blue-600">
              <h3 className="text-2xl font-bold text-blue-700 mb-3">关键特征</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-lg text-center shadow">
                  <div className="text-2xl font-bold text-red-600">积极向上</div>
                  <div className="text-xs text-gray-600 mt-1">96.69%工作状态积极</div>
                </div>
                <div className="bg-white p-3 rounded-lg text-center shadow">
                  <div className="text-2xl font-bold text-green-600">重视成长</div>
                  <div className="text-xs text-gray-600 mt-1">70.14%需要发展规划</div>
                </div>
                <div className="bg-white p-3 rounded-lg text-center shadow">
                  <div className="text-2xl font-bold text-blue-600">关注实践</div>
                  <div className="text-xs text-gray-600 mt-1">53.03%偏好实战学习</div>
                </div>
                <div className="bg-white p-3 rounded-lg text-center shadow">
                  <div className="text-2xl font-bold text-purple-600">期待支持</div>
                  <div className="text-xs text-gray-600 mt-1">多方面需要保障</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-lg flex-1">
            <h3 className="text-2xl font-bold text-green-700 mb-3 flex items-center">
              <Target className="mr-2 w-7 h-7" /> 重点工作建议
            </h3>
            <div className="grid grid-cols-3 gap-3 h-full">
              <div className="bg-red-50 p-3 rounded-lg border-t-4 border-red-600">
                <div className="text-base font-bold text-red-700 mb-2">1. 强化思想引领</div>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 深化战略宣贯与解读</li>
                  <li>• 讲好青年奋斗故事</li>
                  <li>• 青马工程扩面提质</li>
                </ul>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg border-t-4 border-blue-600">
                <div className="text-base font-bold text-blue-700 mb-2">2. 搭建成长平台</div>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 完善导师配置机制</li>
                  <li>• 强化项目实战锻炼</li>
                  <li>• 优化职业发展通道</li>
                </ul>
              </div>
              <div className="bg-green-50 p-3 rounded-lg border-t-4 border-green-600">
                <div className="text-base font-bold text-green-700 mb-2">3. 激发创新活力</div>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 深化青年创新创效</li>
                  <li>• 组建青年突击队</li>
                  <li>• 完善激励机制</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg border-t-4 border-orange-600">
                <div className="text-base font-bold text-orange-700 mb-2">4. 优化改革支持</div>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 加强专项培训</li>
                  <li>• 提供实操指导</li>
                  <li>• 明确政策导向</li>
                </ul>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg border-t-4 border-purple-600">
                <div className="text-base font-bold text-purple-700 mb-2">5. 关心关爱青年</div>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 开展压力疏导</li>
                  <li>• 解决急难愁盼</li>
                  <li>• 丰富文体活动</li>
                </ul>
              </div>
              <div className="bg-pink-50 p-3 rounded-lg border-t-4 border-pink-600">
                <div className="text-base font-bold text-pink-700 mb-2">6. 加强团的建设</div>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 强化基层组织</li>
                  <li>• 提升团干能力</li>
                  <li>• 创新工作方式</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // 致谢页 - P9 更新日期
    {
      type: 'thanks',
      content: (
        <div className="h-full bg-gradient-to-br from-red-500 via-red-600 to-orange-600 text-white flex flex-col items-center justify-center p-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="absolute top-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10 text-center">
            <Heart className="w-28 h-28 mx-auto mb-10 text-red-200" />
            <h1 className="text-7xl font-bold mb-10">感谢您的聆听</h1>
            <div className="text-3xl mb-16 space-y-5">
              <p>倾听青年心声诉求</p>
              <p>解决青年急难愁盼</p>
            </div>
            <div className="mt-20 text-2xl opacity-90">
              <p>中国通服广东公司团委</p>
              <p className="mt-3">2025年11月</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`进入全屏模式失败: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // 键盘事件监听
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
        case 'PageUp':
          prevSlide();
          break;
        case 'ArrowRight':
        case 'PageDown':
        case ' ': // 空格键
          event.preventDefault();
          nextSlide();
          break;
        case 'Home':
          setCurrentSlide(0);
          break;
        case 'End':
          setCurrentSlide(slides.length - 1);
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
        case 'Escape':
          if (document.fullscreenElement) {
            document.exitFullscreen();
            setIsFullscreen(false);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, toggleFullscreen, slides.length]);

  // 监听全屏状态变化
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="w-full h-screen bg-gray-900 flex flex-col relative">
      {/* 幻灯片内容区域 */}
      <div className="flex-1 relative bg-white">
        {slides[currentSlide].content}
      </div>

      {/* 全屏按钮 - 固定在右下角 */}
      <button
        onClick={toggleFullscreen}
        className="fixed bottom-6 right-6 p-4 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg transition-all z-50 opacity-80 hover:opacity-100"
        title={isFullscreen ? "退出全屏 (F)" : "进入全屏 (F)"}
      >
        {isFullscreen ? <Minimize className="w-6 h-6" /> : <Maximize className="w-6 h-6" />}
      </button>

      {/* 页码指示器 - 固定在底部中央 */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg z-50 opacity-80 hover:opacity-100 transition-opacity">
        <span className="text-sm font-medium">
          {currentSlide + 1} / {slides.length}
        </span>
      </div>

      {/* 导航提示 - 固定在左下角 */}
      <div className="fixed bottom-6 left-6 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50 opacity-60 hover:opacity-100 transition-opacity text-xs">
        <div className="space-y-1">
          <div>← → 切换幻灯片</div>
          <div>F 全屏切换</div>
        </div>
      </div>
    </div>
  );
};

export const meta = {
  title: "通服青年调研报告",
  description: "2025年中国通服广东公司青年思想动态调研报告",
  category: "青马",
  order: 1
};

export default PPTPresentation;
