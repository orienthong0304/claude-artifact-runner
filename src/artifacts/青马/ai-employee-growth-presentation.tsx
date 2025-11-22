import React, { useState } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

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
    title: '🚀 青年员工如何利用AI赋能提升',
    subtitle: '💡 从个人成长到组织共赢',
    group: '第九组成员：洪浩东、冯梓键、谭浩淼、黄靖、丘文强、塔娜、吴嘉希',
    bgGradient: 'from-blue-600 via-purple-600 to-pink-600'
  },
  // 第2页：汇报整体框架
  {
    id: 2,
    type: 'framework',
    title: '📋 汇报整体框架',
    subtitle: '四大核心模块，层层递进',
    content: [
      { num: '01', text: '引言', desc: '从"AI会取代谁"到"AI成为职场超能力"', icon: '💭', color: 'from-blue-500 to-cyan-500' },
      { num: '02', text: '青年在AI时代的坐标', desc: '从使用者到架构师的成长路径', icon: '🎯', color: 'from-orange-500 to-red-500' },
      { num: '03', text: '场景应用与行动指南', desc: '从认知到实践的转化', icon: '⚡', color: 'from-indigo-500 to-purple-500' },
      { num: '04', text: '团队实战案例', desc: '1小时开发答题系统的完整实践', icon: '🚀', color: 'from-green-500 to-emerald-500' }
    ],
    bgGradient: 'from-slate-900 via-gray-900 to-slate-900'
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
  // 第4页：四象限坐标
  {
    id: 7,
    type: 'quadrantAxis',
    title: '🎯 青年在AI时代的坐标',
    subtitle: '从能力到深度的四条成长通道',
    xAxisLabel: '能力深度',
    yAxisLabel: 'AI掌控度',
    quadrants: [
      {
        level: 'AI 使用者 🔰',
        desc: '把AI当"高级搜索框"',
        position: 'bottom-left',
        color: 'bg-blue-500',
        actions: ['✍️ 文案草拟、邮件润色', '📊 PPT大纲生成', '🔍 快速获取信息'],
        details: {
          description: '初级阶段，将AI作为效率工具使用，快速完成日常任务，体验AI带来的便利性。适合刚接触AI的职场新人。',
          howToReach: [
            {
              step: '注册账号',
              desc: '注册ChatGPT、文心一言、通义千问等主流AI工具',
              icon: '📝',
              tips: ['选择2-3个常用平台', '了解免费版和付费版差异', '完成基础设置和个人信息']
            },
            {
              step: '学习基础提示词',
              desc: '掌握简单的指令格式和表达方式',
              icon: '💡',
              tips: ['明确告诉AI你的需求', '提供必要的背景信息', '学会追问和补充说明']
            },
            {
              step: '日常应用',
              desc: '在工作中实践使用AI完成简单任务',
              icon: '⚡',
              tips: ['每天至少使用15分钟', '从简单任务开始', '记录好用的提示词']
            }
          ],
          keySkills: [
            { skill: '基础提示词', desc: '能够清晰表达需求，让AI理解你的意图', icon: '💬' },
            { skill: '工具熟练度', desc: '熟悉2-3个AI工具的基本功能和界面', icon: '🔧' },
            { skill: '结果筛选', desc: '能够判断AI输出的质量并进行基本修改', icon: '✅' }
          ],
          examples: [
            { title: '文案撰写', desc: '用ChatGPT生成工作邮件、通知公告', icon: '📧' },
            { title: '资料总结', desc: '快速总结长文档的核心要点', icon: '📄' },
            { title: '数据查询', desc: '询问专业知识或查找资料', icon: '🔍' }
          ],
          nextLevel: '掌握多轮对话技巧，学会构建AI工作流，进阶为AI协同者'
        }
      },
      {
        level: 'AI 协同者 🤝',
        desc: '让AI成为"同桌"',
        position: 'bottom-right',
        color: 'bg-green-500',
        actions: ['💬 多轮对话迭代方案', '⚙️ 构建AI工作流', '💡 团队头脑风暴'],
        details: {
          description: '中级阶段，与AI进行深度协作，通过多轮对话优化结果，将AI集成到工作流程中，实现人机高效配合。',
          howToReach: [
            {
              step: '多轮对话训练',
              desc: '学会通过连续对话逐步优化AI输出结果',
              icon: '🔄',
              tips: ['不满意就继续追问', '提供更多上下文信息', '引导AI思考方向']
            },
            {
              step: '构建工作流',
              desc: '将AI集成到日常工作流程，形成固定模式',
              icon: '⚙️',
              tips: ['识别可自动化的环节', '制定标准化流程', '建立任务模板库']
            },
            {
              step: '协同创作',
              desc: '与AI共同完成复杂项目，发挥各自优势',
              icon: '🤝',
              tips: ['AI负责初稿，人负责优化', '结合人的创意和AI的效率', '建立反馈改进循环']
            }
          ],
          keySkills: [
            { skill: '多轮对话', desc: '通过连续交互逐步达到理想结果', icon: '💬' },
            { skill: '工作流设计', desc: '将AI嵌入工作流程，提升整体效率', icon: '🔗' },
            { skill: '协同创作', desc: '人机配合完成复杂任务', icon: '🎨' }
          ],
          examples: [
            { title: '方案优化', desc: '与AI多轮对话迭代项目方案', icon: '📋' },
            { title: '内容创作', desc: 'AI生成初稿，人工精修润色', icon: '✍️' },
            { title: '数据分析', desc: 'AI处理数据，人负责洞察解读', icon: '📊' }
          ],
          nextLevel: '深入学习提示词工程，建立知识库，成为AI调教师'
        }
      },
      {
        level: 'AI 调教师 🎓',
        desc: '把AI当"实习生"培养',
        position: 'top-left',
        color: 'bg-yellow-500',
        actions: ['📝 撰写高质量提示词', '📚 建立专属知识库', '🔧 微调预训练模型'],
        details: {
          description: '高级阶段，精通提示词工程，能够"调教"AI达到专业水平，建立个性化知识库，甚至进行模型微调。',
          howToReach: [
            {
              step: '提示词工程',
              desc: '系统学习提示词编写技巧和高级方法',
              icon: '📖',
              tips: ['学习CoT、Few-shot等技巧', '研究优秀提示词案例', '建立提示词模板库']
            },
            {
              step: '知识库构建',
              desc: '建立专业领域的AI知识库，提升准确性',
              icon: '📚',
              tips: ['整理行业专业资料', '使用RAG技术注入知识', '定期更新维护内容']
            },
            {
              step: '模型微调',
              desc: '对开源模型进行微调，打造专属AI助手',
              icon: '🔧',
              tips: ['选择合适的基础模型', '准备高质量训练数据', '学习使用LoRA等技术']
            }
          ],
          keySkills: [
            { skill: '提示词工程', desc: '精通各类提示词技巧，像写代码一样编写指令', icon: '🎯' },
            { skill: '知识管理', desc: '构建和维护专业知识库', icon: '📚' },
            { skill: '模型微调', desc: '能够对模型进行个性化训练', icon: '🔬' }
          ],
          examples: [
            { title: 'CoT提示词', desc: '使用思维链让AI逐步推理', icon: '🧠' },
            { title: 'RAG系统', desc: '构建检索增强生成系统', icon: '🔍' },
            { title: '模型微调', desc: '训练领域专属AI助手', icon: '🤖' }
          ],
          nextLevel: '学习AI系统架构，掌握平台构建，晋升为AI架构师'
        }
      },
      {
        level: 'AI 架构师 🏗️',
        desc: '从"用模型"到"造系统"',
        position: 'top-right',
        color: 'bg-purple-500',
        actions: ['🎯 规划AI解决方案', '🏢 建设企业级平台', '⚖️ 推动AI治理实践'],
        details: {
          description: '专家阶段，能够设计和构建企业级AI系统，从战略高度推动AI应用，制定治理规范，引领组织AI转型。',
          howToReach: [
            {
              step: '系统架构学习',
              desc: '掌握AI系统设计原理和企业级架构',
              icon: '🏗️',
              tips: ['学习微服务架构', '了解分布式系统', '掌握云原生技术']
            },
            {
              step: '平台建设实践',
              desc: '参与或主导企业AI平台的设计和开发',
              icon: '🏢',
              tips: ['从小项目开始积累', '关注可扩展性和稳定性', '建立监控和运维体系']
            },
            {
              step: 'AI治理体系',
              desc: '建立AI使用规范和风险管理机制',
              icon: '⚖️',
              tips: ['制定安全合规标准', '建立审核流程', '培训团队正确使用']
            }
          ],
          keySkills: [
            { skill: '系统架构', desc: '设计可扩展的AI系统架构', icon: '🏛️' },
            { skill: '技术选型', desc: '为不同场景选择最优技术方案', icon: '🎯' },
            { skill: 'AI治理', desc: '制定AI使用规范和管理制度', icon: '📜' }
          ],
          examples: [
            { title: '企业AI平台', desc: '构建统一的AI服务平台', icon: '🏢' },
            { title: '智能客服系统', desc: '设计端到端的AI解决方案', icon: '🤖' },
            { title: 'AI治理框架', desc: '建立企业AI应用管理体系', icon: '📋' }
          ],
          nextLevel: '持续学习前沿技术，引领行业AI创新应用'
        }
      }
    ],
    bgGradient: 'from-slate-900 via-teal-900 to-slate-900'
  },
  // 第8页：场景应用示例
  {
    id: 8,
    type: 'scenarios',
    title: '💼 从认知到行动的场景应用',
    subtitle: '典型工作场景中的AI赋能实践',
    scenarios: [
      {
        role: '文职人员',
        icon: '📄',
        emoji: '📝',
        before: '5天完成公文审核',
        after: '几分钟完成，准确率提升',
        tools: 'ChatGPT、Kimi、Canva AI',
        color: 'from-blue-500 to-cyan-500',
        details: {
          beforeWorkflow: [
            { step: '收集资料', desc: '手动查找历史文件，整理相关政策法规', time: '1天', icon: '📚' },
            { step: '逐字审核', desc: '人工逐句核对格式、用语、标点符号', time: '2天', icon: '🔍' },
            { step: '交叉比对', desc: '与多个部门文件进行交叉对照核实', time: '1.5天', icon: '📋' },
            { step: '反复修改', desc: '根据反馈意见多轮修改润色', time: '0.5天', icon: '✏️' }
          ],
          afterWorkflow: [
            { step: '智能上传', desc: 'ChatGPT快速识别文档结构和要点', time: '1分钟', icon: '⚡' },
            { step: 'AI审核', desc: 'Kimi自动检查格式、用语规范和逻辑性', time: '2分钟', icon: '🤖' },
            { step: '一键美化', desc: 'Canva AI生成配图和排版优化建议', time: '1分钟', icon: '🎨' },
            { step: '人工确认', desc: '快速浏览AI建议，确认关键修改点', time: '1分钟', icon: '✅' }
          ],
          benefits: [
            { label: '时间效率', value: '从5天缩短至5分钟', percent: 99, icon: '⏱️' },
            { label: '准确率', value: '从85%提升至98%', percent: 15, icon: '🎯' },
            { label: '工作负担', value: '释放90%重复性工作', percent: 90, icon: '💼' }
          ],
          tools: [
            { name: 'ChatGPT', usage: '文档理解、内容总结、初步审核', icon: '🤖' },
            { name: 'Kimi', usage: '长文档分析、格式检查、法规对照', icon: '📊' },
            { name: 'Canva AI', usage: '配图生成、排版设计、视觉优化', icon: '🎨' }
          ]
        }
      },
      {
        role: '技术人员',
        icon: '💻',
        emoji: '⚡',
        before: '陷入基础编码细节',
        after: '聚焦架构设计与优化',
        tools: 'DeepSeek-R1、Ollama',
        color: 'from-purple-500 to-pink-500',
        details: {
          beforeWorkflow: [
            { step: '查找文档', desc: '搜索API文档、Stack Overflow解决方案', time: '30分钟', icon: '🔍' },
            { step: '手写代码', desc: '逐行编写重复性代码逻辑', time: '2小时', icon: '⌨️' },
            { step: '调试错误', desc: '反复试错，修复语法和逻辑问题', time: '1小时', icon: '🐛' },
            { step: '代码优化', desc: '手动重构代码结构和性能优化', time: '1小时', icon: '⚙️' }
          ],
          afterWorkflow: [
            { step: 'AI生成', desc: 'DeepSeek-R1根据需求生成基础代码框架', time: '2分钟', icon: '🤖' },
            { step: '本地调试', desc: 'Ollama在本地环境快速验证代码逻辑', time: '5分钟', icon: '🖥️' },
            { step: 'AI优化', desc: '智能建议性能优化和最佳实践', time: '3分钟', icon: '⚡' },
            { step: '架构设计', desc: '将精力投入系统架构和业务逻辑', time: '剩余时间', icon: '🏗️' }
          ],
          benefits: [
            { label: '开发效率', value: '基础编码速度提升70%', percent: 70, icon: '🚀' },
            { label: '代码质量', value: '遵循最佳实践，减少bug', percent: 85, icon: '✨' },
            { label: '能力提升', value: '从执行者转为架构师', percent: 60, icon: '📈' }
          ],
          tools: [
            { name: 'DeepSeek-R1', usage: '代码生成、算法实现、技术选型建议', icon: '🧠' },
            { name: 'Ollama', usage: '本地部署、离线编码、数据安全', icon: '🔒' },
            { name: 'GitHub Copilot', usage: '实时代码补全、代码重构', icon: '🤝' }
          ]
        }
      },
      {
        role: '客户经理',
        icon: '📞',
        emoji: '🎯',
        before: '手动筛选客户',
        after: 'AI筛选+个性化话术',
        tools: 'AI客户分析工具',
        color: 'from-green-500 to-emerald-500',
        details: {
          beforeWorkflow: [
            { step: '数据整理', desc: '从多个系统导出客户数据并手工整合', time: '2小时', icon: '📊' },
            { step: '人工筛选', desc: '根据经验判断客户意向和价值等级', time: '3小时', icon: '🔍' },
            { step: '撰写话术', desc: '为不同客户手写沟通话术和方案', time: '1.5小时', icon: '✍️' },
            { step: '电话跟进', desc: '逐个客户电话沟通，记录反馈', time: '4小时', icon: '📞' }
          ],
          afterWorkflow: [
            { step: 'AI数据整合', desc: 'AI自动从各系统抓取并整合客户信息', time: '5分钟', icon: '🤖' },
            { step: '智能筛选', desc: '基于行为数据和历史记录AI打分排序', time: '3分钟', icon: '🎯' },
            { step: '话术生成', desc: 'AI为每个客户生成个性化沟通方案', time: '2分钟', icon: '💬' },
            { step: '精准跟进', desc: '聚焦高价值客户，提高转化率', time: '节省50%时间', icon: '🎪' }
          ],
          benefits: [
            { label: '筛选效率', value: '处理客户数量提升3倍', percent: 200, icon: '📈' },
            { label: '转化率', value: '精准定位提升转化率40%', percent: 40, icon: '💰' },
            { label: '客户体验', value: '个性化服务满意度提升', percent: 50, icon: '⭐' }
          ],
          tools: [
            { name: 'AI客户分析', usage: '客户画像、意向预测、价值评估', icon: '🎯' },
            { name: 'ChatGPT', usage: '话术生成、方案定制、邮件撰写', icon: '💬' },
            { name: 'CRM智能助手', usage: '跟进提醒、数据分析、报表生成', icon: '📊' }
          ]
        }
      },
      {
        role: '项目管理',
        icon: '📊',
        emoji: '📈',
        before: '手工整理数据报表',
        after: 'AI整合+聚焦决策',
        tools: 'AI数据分析平台',
        color: 'from-orange-500 to-red-500',
        details: {
          beforeWorkflow: [
            { step: '数据收集', desc: '从各部门收集Excel表格和文档', time: '半天', icon: '📥' },
            { step: '手工汇总', desc: '复制粘贴数据，制作综合报表', time: '1天', icon: '📋' },
            { step: '图表制作', desc: '用Excel手工绘制各类统计图表', time: '半天', icon: '📊' },
            { step: '报告撰写', desc: '整理分析结果，撰写项目总结', time: '1天', icon: '📝' }
          ],
          afterWorkflow: [
            { step: 'AI数据抓取', desc: 'AI自动从各系统抓取实时数据', time: '5分钟', icon: '🔄' },
            { step: '智能分析', desc: 'AI识别关键指标、异常数据和趋势', time: '3分钟', icon: '🧠' },
            { step: '一键生成', desc: 'AI自动生成可视化图表和报表', time: '2分钟', icon: '📊' },
            { step: '战略决策', desc: '聚焦深度分析和管理决策', time: '节省80%时间', icon: '🎯' }
          ],
          benefits: [
            { label: '数据处理', value: '报表生成时间从3天到10分钟', percent: 99, icon: '⚡' },
            { label: '准确性', value: '消除人工错误，数据100%准确', percent: 100, icon: '✅' },
            { label: '决策质量', value: '更多时间用于战略思考', percent: 80, icon: '🧠' }
          ],
          tools: [
            { name: 'AI数据分析平台', usage: '数据整合、趋势分析、预测建模', icon: '📊' },
            { name: 'ChatGPT', usage: '报告撰写、总结提炼、建议生成', icon: '📝' },
            { name: 'Tableau AI', usage: '智能可视化、交互式仪表板', icon: '📈' }
          ]
        }
      }
    ],
    bgGradient: 'from-slate-900 via-rose-900 to-slate-900'
  },
  // 第9页：团队实战案例 - 答题程序开发
  {
    id: 9,
    type: 'teamCase',
    title: '🎯 团队实战：1小时AI赋能开发答题系统',
    subtitle: '从需求到上线，见证AI如何加速开发全流程',
    timeline: [
      {
        phase: '需求理解',
        time: '5分钟',
        icon: '📋',
        color: 'from-blue-500 to-cyan-500',
        tasks: [
          { task: '分析业务场景', desc: '10个小组竞赛答题，需要抢答功能', person: '吴嘉希', aiTool: null },
          { task: '明确核心需求', desc: '题库管理、计时答题、积分统计、实时排名', person: '全员讨论', aiTool: 'ChatGPT辅助需求梳理' }
        ]
      },
      {
        phase: '功能设计',
        time: '10分钟',
        icon: '🎨',
        color: 'from-purple-500 to-pink-500',
        tasks: [
          { task: 'AI生成原型', desc: '描述需求，让AI生成页面布局建议', person: '塔娜', aiTool: 'ChatGPT生成设计方案' },
          { task: '确定技术栈', desc: 'React + TypeScript + Tailwind CSS', person: '洪浩东', aiTool: 'AI推荐技术选型' },
          { task: '规划功能模块', desc: '题库模块、答题模块、计分模块、管理模块', person: '洪浩东', aiTool: 'Claude分析架构' }
        ]
      },
      {
        phase: '数据治理',
        time: '15分钟',
        icon: '📊',
        color: 'from-green-500 to-emerald-500',
        tasks: [
          { task: 'Word转结构化', desc: '将Word题库转换为JSON格式', person: '谭浩淼', aiTool: 'ChatGPT提取和格式化' },
          { task: '数据验证', desc: '检查题目格式、答案正确性', person: '黄靖', aiTool: 'AI批量校验数据' },
          { task: '选项乱序', desc: '打乱选项顺序，避免记忆题号', person: '丘文强', aiTool: 'AI生成乱序算法' }
        ]
      },
      {
        phase: 'AI编程',
        time: '20分钟',
        icon: '💻',
        color: 'from-orange-500 to-red-500',
        tasks: [
          { task: '第一轮：基础框架', desc: '生成答题页面、题库加载、基础交互', person: '丘文强', aiTool: 'Claude Code生成代码' },
          { task: '第二轮：功能完善', desc: '添加计时器、积分系统、团队管理', person: '丘文强', aiTool: 'Claude迭代优化' },
          { task: '第三轮：UI美化', desc: '优化界面、添加动画、响应式适配', person: '丘文强', aiTool: 'AI生成样式代码' }
        ]
      },
      {
        phase: '优化测试',
        time: '5分钟',
        icon: '⚡',
        color: 'from-indigo-500 to-purple-500',
        tasks: [
          { task: '功能测试', desc: '测试答题流程、计分逻辑', person: '冯梓键', aiTool: 'AI生成测试用例' },
          { task: '性能优化', desc: '代码分割、懒加载优化', person: '丘文强', aiTool: 'AI建议优化方案' }
        ]
      },
      {
        phase: '部署上线',
        time: '5分钟',
        icon: '🚀',
        color: 'from-pink-500 to-rose-500',
        tasks: [
          { task: '构建打包', desc: 'npm run build 生成生产版本', person: '冯梓键', aiTool: null },
          { task: '服务器部署', desc: '上传到服务器，配置nginx', person: '冯梓键', aiTool: 'AI生成部署脚本' },
          { task: '域名绑定', desc: '配置域名解析，开启HTTPS', person: '冯梓键', aiTool: null }
        ]
      }
    ],
    achievements: [
      { icon: '⏱️', title: '总耗时', value: '60分钟', desc: '从零到上线完整交付' },
      { icon: '👥', title: '团队规模', value: '7人', desc: '高效分工协作' },
      { icon: '🤖', title: 'AI轮次', value: '3轮对话', desc: '快速迭代开发' },
      { icon: '📝', title: '代码量', value: '1200行', desc: 'AI生成90%代码' },
      { icon: '✨', title: '功能模块', value: '8个', desc: '完整功能体系' },
      { icon: '🎯', title: '效率提升', value: '10倍', desc: '传统开发需2周' }
    ],
    keyInsights: [
      { icon: '💡', title: '需求表达是关键', desc: '清晰的需求描述让AI准确理解意图，第一轮就生成80%可用代码' },
      { icon: '🔄', title: '迭代比完美重要', desc: '不追求一次完美，通过2-3轮快速迭代逐步完善功能' },
      { icon: '🤝', title: '人机分工明确', desc: 'AI负责代码生成和数据处理，人负责需求把控和质量审核' },
      { icon: '📚', title: '知识库价值凸显', desc: '使用Claude上下文理解能力，快速调整和优化代码' }
    ],
    bgGradient: 'from-slate-900 via-blue-900 to-slate-900'
  },
  // 第10页：真实案例展示
  {
    id: 10,
    type: 'cases',
    title: '🌟 真实案例：AI赋能的成功实践',
    subtitle: '来自工程建设、采购风控、质量监管等领域的落地应用',
    cases: [
      {
        name: '工程建设智能问答系统',
        scene: '工程知识管理与咨询服务',
        icon: '🤖',
        achievements: ['✅ 问答准确率 > 92%', '📈 人员利用率提升 25%', '💰 咨询成本降低 20%']
      },
      {
        name: '智能招投标稽核系统',
        scene: '采购风控与合规审查',
        icon: '📋',
        achievements: ['⚡ 1小时处理60家投标', '🚀 效率提升 20%', '🌐 服务全国1000+客户']
      },
      {
        name: 'AI+VR工程质监系统',
        scene: '全景数字化质量监管',
        icon: '🏗️',
        achievements: ['💎 监管成本降低 20%', '🎯 返工率降低 15%', '💼 应用项目超100亿元']
      },
      {
        name: '大鱼数智客服平台',
        scene: '全流程智能客户服务',
        icon: '💬',
        achievements: ['🤖 机器人处理70%话务', '👥 人员投入减少 56%', '📊 年合同额4376万']
      }
    ],
    bgGradient: 'from-slate-900 via-indigo-900 to-slate-900'
  },
  // 第11页：行动建议
  {
    id: 11,
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
  // 第12页：结束页
  {
    id: 12,
    type: 'ending',
    title: '谢谢聆听',
    subtitle: '让AI成为我们的职场超能力',
    message: '当最年轻的脑回路遇上最火热的大模型\n一起见证提效火花、成长捷径与组织红利',
    bgGradient: 'from-violet-600 to-purple-600'
  }
];

// 定义类型
interface Scenario {
  role: string;
  icon: string;
  emoji: string;
  before: string;
  after: string;
  tools: string;
  color: string;
  details: {
    beforeWorkflow: Array<{ step: string; desc: string; time: string; icon: string }>;
    afterWorkflow: Array<{ step: string; desc: string; time: string; icon: string }>;
    benefits: Array<{ label: string; value: string; percent: number; icon: string }>;
    tools: Array<{ name: string; usage: string; icon: string }>;
  };
}

interface QuadrantLevel {
  level: string;
  desc: string;
  position: string;
  color: string;
  actions: string[];
  details: {
    description: string;
    howToReach: Array<{ step: string; desc: string; icon: string; tips: string[] }>;
    keySkills: Array<{ skill: string; desc: string; icon: string }>;
    examples: Array<{ title: string; desc: string; icon: string }>;
    nextLevel: string;
  };
}

interface TimelinePhase {
  phase: string;
  time: string;
  icon: string;
  color: string;
  tasks: Array<{ task: string; desc: string; person: string; aiTool: string | null }>;
}

interface Achievement {
  icon: string;
  title: string;
  value: string;
  desc: string;
}

interface KeyInsight {
  icon: string;
  title: string;
  desc: string;
}

export default function AIEmployeeGrowthPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [selectedQuadrant, setSelectedQuadrant] = useState<QuadrantLevel | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isQuadrantDialogOpen, setIsQuadrantDialogOpen] = useState(false);
  const [teamCaseStep, setTeamCaseStep] = useState(0);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullScreen(false);
    }
  };

  // 监听全屏变化事件，以防用户按 ESC 退出
  React.useEffect(() => {
    const handleFullScreenChange = () => {
        setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, []);

  // 键盘导航
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentSlide > 0) {
        setCurrentSlide(currentSlide - 1);
      } else if (e.key === 'ArrowRight' && currentSlide < slides.length - 1) {
        setCurrentSlide(currentSlide + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  // 切换幻灯片时重置团队实战案例步骤
  React.useEffect(() => {
    setTeamCaseStep(0);
  }, [currentSlide]);

  const slide = slides[currentSlide];

  const renderSlide = () => {
    switch (slide.type) {
      case 'title':
        return (
          <div className={`h-full flex flex-col items-center justify-center text-white bg-gradient-to-br ${slide.bgGradient} relative overflow-hidden`}>
            {/* 科技背景效果 */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <h1 className="text-7xl font-bold mb-8 text-center px-8 animate-pulse">{slide.title}</h1>
              <p className="text-3xl mb-8 opacity-90">{slide.subtitle}</p>
              {slide.group && (
                <p className="text-xl mb-12 opacity-80 bg-white/10 px-8 py-4 rounded-full backdrop-blur-sm">{slide.group}</p>
              )}
            </div>
          </div>
        );

      case 'content':
        return (
          <div className={`h-full flex flex-col p-16 bg-gradient-to-br ${slide.bgGradient}`}>
            <h2 className="text-5xl font-bold mb-12 text-gray-800">{slide.title}</h2>
            <div className="flex-1 flex flex-col justify-center space-y-6">
              {slide.content?.map((item: { num: string; text: string; desc: string }, index: number) => (
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

      case 'framework':
        return (
          <div className={`h-full flex flex-col p-8 bg-gradient-to-br ${slide.bgGradient} text-white relative overflow-hidden`}>
            {/* 背景装饰 */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-400 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 h-full flex flex-col">
              <h2 className="text-5xl font-bold mb-2 text-center">{slide.title}</h2>
              <p className="text-xl mb-4 opacity-90 text-center">{slide.subtitle}</p>

              {/* 垂直流程图布局 */}
              <div className="flex-1 flex flex-col justify-center items-center space-y-2">
                {slide.content?.map((item: { num: string; text: string; desc: string; icon: string; color: string }, index: number) => (
                  <React.Fragment key={index}>
                    {/* 框架模块卡片 */}
                    <div className="w-[75%] transition-all hover:scale-105">
                      <div className={`bg-gradient-to-r ${item.color} bg-opacity-90 backdrop-blur-md rounded-2xl p-4 shadow-2xl border-2 border-white/30 relative overflow-hidden group`}>
                        {/* 装饰性背景光晕 */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        <div className="relative z-10 flex items-center gap-4">
                          {/* 编号徽章 */}
                          <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold backdrop-blur-sm border-2 border-white/40">
                            {item.num}
                          </div>

                          {/* 图标 */}
                          <div className="text-4xl flex-shrink-0 group-hover:animate-bounce">
                            {item.icon}
                          </div>

                          {/* 文本内容 */}
                          <div className="flex-1">
                            <h3 className="text-xl font-bold mb-1 text-white">{item.text}</h3>
                            <p className="text-sm text-white/80">{item.desc}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
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

      case 'quadrantAxis':
        return (
          <div className={`h-full flex flex-col p-8 bg-gradient-to-br ${slide.bgGradient} text-white relative overflow-hidden`}>
            {/* 背景网格 */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '50px 50px'
              }}></div>
            </div>

            <div className="relative z-10 h-full flex flex-col">
              <h2 className="text-5xl font-bold mb-2 text-center">{slide.title}</h2>
              <p className="text-xl mb-4 opacity-90 text-center">{slide.subtitle}</p>

              {/* 金字塔/阶梯式布局 */}
              <div className="flex-1 flex flex-col justify-center items-center space-y-3">
                {slide.quadrants?.map((quad: QuadrantLevel, index: number) => {
                  // 从下到上，越来越宽
                  const widths = ['w-[85%]', 'w-[75%]', 'w-[65%]', 'w-[55%]'];

                  return (
                    <div
                      key={index}
                      className={`${widths[3 - index]} transition-all hover:scale-105 cursor-pointer group`}
                      onClick={() => {
                        setSelectedQuadrant(quad);
                        setIsQuadrantDialogOpen(true);
                      }}
                    >
                      <div className={`${quad.color} bg-opacity-90 backdrop-blur-md rounded-2xl p-4 shadow-2xl border-2 border-white/40 relative overflow-hidden hover:border-white/60 transition-all`}>
                        {/* 点击提示 */}
                        

                        {/* 等级标识 */}
                        <div className="absolute top-3 left-3 w-10 h-10 bg-white/30 rounded-full flex items-center justify-center text-xl font-bold backdrop-blur-sm">
                          {index + 1}
                        </div>

                        {/* 内容布局 */}
                        <div className="flex items-center gap-4 ml-14">
                          {/* 左侧：标题和描述 */}
                          <div className="flex-shrink-0 w-64">
                            <h3 className="text-2xl font-bold mb-1 text-white">{quad.level}</h3>
                            <p className="text-sm text-white/80 font-medium">{quad.desc}</p>
                          </div>

                          {/* 右侧：行动列表 */}
                          <div className="flex-1 flex gap-3">
                            {quad.actions.map((action: string, i: number) => (
                              <div key={i} className="flex-1 bg-black/20 rounded-lg p-3 backdrop-blur-sm border border-white/20">
                                <div className="text-sm text-white/90 text-center">{action}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 底部提示 */}
              <div className="mt-4 text-center text-base opacity-70 font-medium">
                ⬆️ 成长路径：从使用到架构，步步进阶 | 点击卡片了解详细晋升路径
              </div>
            </div>
          </div>
        );

      case 'teamCase': {
        const timeline = (slide as any).timeline as TimelinePhase[];
        const totalSteps = timeline ? timeline.length + 1 : 1; // +1 for summary
        const currentPhase = timeline && teamCaseStep < timeline.length
          ? timeline[teamCaseStep]
          : null;
        const isSummary = teamCaseStep === timeline.length;

        return (
          <div className={`h-full flex flex-col p-8 bg-gradient-to-br ${slide.bgGradient} text-white relative overflow-hidden`}>
            {/* 背景装饰 */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 h-full flex flex-col">
              {/* 标题 */}
              <h2 className="text-4xl font-bold mb-2 text-center">{slide.title}</h2>
              <p className="text-lg mb-4 opacity-90 text-center">{slide.subtitle}</p>

              {/* 进度指示器 */}
              <div className="flex justify-center items-center gap-1.5 mb-3">
                {timeline?.map((phase: TimelinePhase, index: number) => (
                  <React.Fragment key={index}>
                    <div
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all text-sm ${
                        index === teamCaseStep
                          ? 'bg-white text-gray-900 scale-105 shadow-lg'
                          : index < teamCaseStep
                            ? 'bg-green-500/30 border border-green-400'
                            : 'bg-white/10 border border-white/30'
                      }`}
                    >
                      <span className="text-lg">{phase.icon}</span>
                      <span className="text-xs font-bold">{phase.phase}</span>
                      {index < teamCaseStep && <span className="text-green-400 text-xs">✓</span>}
                    </div>
                    {index < timeline.length - 1 && (
                      <div className={`h-0.5 w-4 ${index < teamCaseStep ? 'bg-green-400' : 'bg-white/30'}`}></div>
                    )}
                  </React.Fragment>
                ))}
                <div className="h-0.5 w-4 bg-white/30"></div>
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all text-sm ${
                    isSummary
                      ? 'bg-white text-gray-900 scale-105 shadow-lg'
                      : 'bg-white/10 border border-white/30'
                  }`}
                >
                  <span className="text-lg">🎯</span>
                  <span className="text-xs font-bold">总结</span>
                </div>
              </div>

              {/* 内容区域 - 添加最大高度和滚动 */}
              <div className="flex-1 flex items-center justify-center overflow-hidden">
                {!isSummary && currentPhase ? (
                  /* 阶段详情 */
                  <div className="w-full max-w-5xl h-full flex items-center py-4">
                    <div className={`bg-gradient-to-br ${currentPhase.color} rounded-3xl p-6 shadow-2xl border-4 border-white/40 w-full max-h-full overflow-y-auto`}>
                      {/* 阶段头部 */}
                      <div className="text-center mb-6">
                        <div className="text-6xl mb-3">{currentPhase.icon}</div>
                        <h3 className="text-3xl font-bold mb-2">{currentPhase.phase}</h3>
                        <div className="text-xl bg-white/20 rounded-full px-4 py-1.5 inline-block backdrop-blur-sm">
                          ⏱️ {currentPhase.time}
                        </div>
                      </div>

                      {/* 任务列表 */}
                      <div className="space-y-3">
                        {currentPhase.tasks.map((task, taskIdx) => (
                          <div key={taskIdx} className="bg-black/30 rounded-xl p-4 backdrop-blur-md border-2 border-white/20 hover:border-white/40 transition-all">
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-lg font-bold">
                                {taskIdx + 1}
                              </div>
                              <div className="flex-1">
                                <h4 className="text-xl font-bold mb-1.5">{task.task}</h4>
                                <p className="text-base opacity-90 mb-2">{task.desc}</p>
                                <div className="flex items-center gap-3 text-sm">
                                  <span className="bg-white/20 rounded-full px-3 py-0.5 backdrop-blur-sm">
                                    👤 {task.person}
                                  </span>
                                  {task.aiTool && (
                                    <span className="bg-yellow-400/40 rounded-full px-3 py-0.5 backdrop-blur-sm border-2 border-yellow-300/50">
                                      🤖 {task.aiTool}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* 总结页面 */
                  <div className="w-full h-full overflow-y-auto py-4">
                    <div className="space-y-6">
                      {/* 成果展示 */}
                      <div>
                        <h3 className="text-2xl font-bold mb-4 text-center">🏆 项目成果</h3>
                        <div className="grid grid-cols-6 gap-3">
                          {(slide as any).achievements?.map((achievement: Achievement, index: number) => (
                            <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border-2 border-white/30 hover:border-white/50 transition-all hover:scale-105">
                              <div className="text-4xl mb-2">{achievement.icon}</div>
                              <div className="text-xs font-bold mb-1 opacity-80">{achievement.title}</div>
                              <div className="text-2xl font-bold text-cyan-300 mb-1">{achievement.value}</div>
                              <div className="text-[10px] opacity-70">{achievement.desc}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 关键洞察 */}
                      <div>
                        <h3 className="text-2xl font-bold mb-4 text-center">💡 关键洞察</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {(slide as any).keyInsights?.map((insight: KeyInsight, index: number) => (
                            <div key={index} className="bg-gradient-to-br from-purple-500/30 to-pink-500/30 backdrop-blur-md rounded-xl p-4 border-2 border-purple-300/40 hover:border-purple-300/60 transition-all">
                              <div className="flex items-start gap-3">
                                <div className="text-4xl flex-shrink-0">{insight.icon}</div>
                                <div>
                                  <div className="text-lg font-bold mb-1.5">{insight.title}</div>
                                  <div className="text-sm opacity-90">{insight.desc}</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 导航按钮 */}
              <div className="flex justify-center items-center gap-4 mt-3">
                <button
                  onClick={() => setTeamCaseStep(Math.max(0, teamCaseStep - 1))}
                  disabled={teamCaseStep === 0}
                  className={`px-6 py-2 rounded-full text-base font-bold transition-all ${
                    teamCaseStep === 0
                      ? 'bg-white/10 text-white/30 cursor-not-allowed'
                      : 'bg-white/20 hover:bg-white/30 text-white cursor-pointer hover:scale-105'
                  }`}
                >
                  ← 上一步
                </button>
                <div className="text-lg font-bold bg-white/10 px-4 py-2 rounded-full">
                  {teamCaseStep + 1} / {totalSteps}
                </div>
                <button
                  onClick={() => setTeamCaseStep(Math.min(totalSteps - 1, teamCaseStep + 1))}
                  disabled={teamCaseStep === totalSteps - 1}
                  className={`px-6 py-2 rounded-full text-base font-bold transition-all ${
                    teamCaseStep === totalSteps - 1
                      ? 'bg-white/10 text-white/30 cursor-not-allowed'
                      : 'bg-white/20 hover:bg-white/30 text-white cursor-pointer hover:scale-105'
                  }`}
                >
                  下一步 →
                </button>
              </div>
            </div>
          </div>
        );
      }

      case 'scenarios':
        return (
          <div className={`h-full flex flex-col p-12 bg-gradient-to-br ${slide.bgGradient} text-white`}>
            <h2 className="text-5xl font-bold mb-2 text-center">{slide.title}</h2>
            <p className="text-xl mb-8 opacity-90 text-center">{slide.subtitle}</p>

            {/* 场景网格 - 2x2 */}
            <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-6">
              {slide.scenarios?.map((scenario: Scenario, index: number) => (
                <div
                  key={index}
                  className="relative group overflow-hidden rounded-3xl cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl"
                  onClick={() => {
                    setSelectedScenario(scenario);
                    setIsDialogOpen(true);
                  }}
                >
                  {/* 点击提示 */}
                  <div className="absolute top-2 right-2 z-10 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    点击查看详情 →
                  </div>
                  {/* 分屏对比布局 */}
                  <div className="h-full flex">
                    {/* 左半边 - 改进前 (暗色) */}
                    <div className="flex-1 bg-gradient-to-br from-gray-800 to-gray-900 p-6 flex flex-col justify-between border-r-2 border-yellow-400/30">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="text-4xl">{scenario.icon}</div>
                          <div>
                            <h3 className="text-xl font-bold">{scenario.role}</h3>
                            <div className="text-sm opacity-60">改进前</div>
                          </div>
                        </div>
                        <div className="text-sm text-red-300 bg-red-500/10 rounded-lg p-3 border border-red-500/30">
                          ❌ {scenario.before}
                        </div>
                      </div>
                      <div className="text-xs opacity-40 text-center">低效传统模式</div>
                    </div>

                    {/* 中间分隔线动画 */}
                    <div className="w-1 bg-gradient-to-b from-yellow-400 via-green-400 to-cyan-400 relative">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg">
                        <div className="text-xl">{scenario.emoji}</div>
                      </div>
                    </div>

                    {/* 右半边 - 改进后 (亮色) */}
                    <div className={`flex-1 bg-gradient-to-br ${scenario.color} p-6 flex flex-col justify-between`}>
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="text-4xl">✨</div>
                          <div>
                            <h3 className="text-xl font-bold">{scenario.role}</h3>
                            <div className="text-sm opacity-80">改进后</div>
                          </div>
                        </div>
                        <div className="text-sm text-white bg-green-500/20 rounded-lg p-3 border border-green-300/40 mb-3">
                          ✅ {scenario.after}
                        </div>
                        <div className="text-xs bg-white/20 rounded-lg p-2 backdrop-blur-sm">
                          🛠️ {scenario.tools}
                        </div>
                      </div>
                      <div className="text-xs opacity-80 text-center font-semibold">AI赋能高效</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'cases':
        return (
          <div className={`h-full flex flex-col p-12 bg-gradient-to-br ${slide.bgGradient} text-white relative overflow-hidden`}>
            {/* 背景装饰圆圈 */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-4 border-white rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border-4 border-white rounded-full"></div>
            </div>

            <div className="relative z-10 h-full flex flex-col">
              <h2 className="text-5xl font-bold mb-3 text-center">{slide.title}</h2>
              <p className="text-2xl mb-10 opacity-90 text-center">{slide.subtitle}</p>

              {/* 三列布局：左侧案例 - 中心Logo - 右侧案例 */}
              <div className="flex-1 flex items-center justify-center gap-10">

                {/* 左侧两列 */}
                <div className="flex flex-col gap-8 w-1/3">
                  {slide.cases?.slice(0, 2).map((caseItem: { name: string; scene: string; icon: string; achievements: string[] }, index: number) => (
                     <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border-2 border-white/30 hover:border-cyan-400 transition-all hover:scale-105 group">
                      {/* 图标和标题 */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="text-5xl group-hover:animate-bounce">{caseItem.icon}</div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2">{caseItem.name}</h3>
                          <p className="text-sm text-cyan-300">{caseItem.scene}</p>
                        </div>
                      </div>

                      {/* 成效列表 */}
                      <div className="space-y-3">
                        {caseItem.achievements.map((achievement: string, i: number) => (
                          <div key={i} className="flex items-start gap-3 bg-black/20 rounded-lg p-3 text-sm">
                            <span className="text-cyan-400 flex-shrink-0 text-lg">▸</span>
                            <span className="flex-1 opacity-90 leading-relaxed">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 中心徽章 */}
                <div className="flex-shrink-0 z-10 px-6">
                  <div className="bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full w-48 h-48 flex items-center justify-center shadow-2xl border-4 border-white/30 animate-pulse">
                    <div className="text-center">
                      <div className="text-6xl mb-3">🎯</div>
                      <div className="text-xl font-bold">成功案例</div>
                    </div>
                  </div>
                </div>

                {/* 右侧两列 */}
                <div className="flex flex-col gap-8 w-1/3">
                  {slide.cases?.slice(2, 4).map((caseItem: { name: string; scene: string; icon: string; achievements: string[] }, index: number) => (
                     <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border-2 border-white/30 hover:border-cyan-400 transition-all hover:scale-105 group">
                        {/* 图标和标题 */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="text-5xl group-hover:animate-bounce">{caseItem.icon}</div>
                          <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2">{caseItem.name}</h3>
                          <p className="text-sm text-cyan-300">{caseItem.scene}</p>
                          </div>
                        </div>

                        {/* 成效列表 */}
                        <div className="space-y-3">
                          {caseItem.achievements.map((achievement: string, i: number) => (
                            <div key={i} className="flex items-start gap-3 bg-black/20 rounded-lg p-3 text-sm">
                              <span className="text-cyan-400 flex-shrink-0 text-lg">▸</span>
                              <span className="flex-1 opacity-90 leading-relaxed">{achievement}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        );

      case 'action':
        return (
          <div className={`h-full flex flex-col p-16 bg-gradient-to-br ${slide.bgGradient}`}>
            <h2 className="text-5xl font-bold mb-3 text-gray-800">{slide.title}</h2>
            <p className="text-xl text-gray-600 mb-10">{slide.subtitle}</p>
            <div className="flex items-center justify-between space-x-8 mb-10 flex-1">
              {slide.steps?.map((step: { step: string; title: string; desc: string; time: string }, index: number) => (
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
    <>
      <div className={`fixed inset-0 bg-gray-900 flex items-center justify-center ${isFullScreen ? 'p-0' : 'p-8'} transition-all duration-300`}>
        {/* 演示文稿容器 */}
        <div className={`w-full h-full bg-gray-900 shadow-2xl relative overflow-hidden ${isFullScreen ? '' : 'max-w-[177.78vh] max-h-[56.25vw]'}`}>
          {renderSlide()}

          {/* 导航提示和全屏按钮 */}
          <div className="absolute bottom-4 right-4 flex items-center gap-4 z-50">
              <div className="text-white/30 text-xs">
            使用 ← → 键切换页面 ({currentSlide + 1} / {slides.length})
              </div>
               <button
                  onClick={toggleFullScreen}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 transition-all"
                  title={isFullScreen ? "退出全屏" : "全屏模式"}
              >
                  {isFullScreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
              </button>
          </div>
        </div>
      </div>

      {/* 场景详情弹框 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-50 to-blue-50">
          {selectedScenario && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-4 text-3xl">
                  <span className="text-5xl">{selectedScenario.icon}</span>
                  <div>
                    <div className="font-bold text-gray-800">{selectedScenario.role}工作流程改进</div>
                    <div className="text-sm text-gray-500 font-normal mt-1">
                      从传统模式到AI赋能的完整转变
                    </div>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-8 mt-6">
                {/* 改进前后对比流程 */}
                <div className="grid grid-cols-2 gap-6">
                  {/* 改进前 */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-red-200">
                    <h3 className="text-2xl font-bold text-red-600 mb-4 flex items-center gap-2">
                      <span>❌</span>
                      <span>改进前：传统工作模式</span>
                    </h3>
                    <div className="space-y-3">
                      {selectedScenario.details.beforeWorkflow.map((item, idx: number) => (
                        <div key={idx} className="bg-red-50 rounded-lg p-4 border-l-4 border-red-400">
                          <div className="flex items-start gap-3">
                            <span className="text-3xl">{item.icon}</span>
                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-1">
                                <h4 className="font-bold text-gray-800">{item.step}</h4>
                                <span className="text-sm font-semibold text-red-600 bg-red-100 px-2 py-1 rounded">
                                  {item.time}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">{item.desc}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 改进后 */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-200">
                    <h3 className="text-2xl font-bold text-green-600 mb-4 flex items-center gap-2">
                      <span>✅</span>
                      <span>改进后：AI赋能模式</span>
                    </h3>
                    <div className="space-y-3">
                      {selectedScenario.details.afterWorkflow.map((item, idx: number) => (
                        <div key={idx} className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
                          <div className="flex items-start gap-3">
                            <span className="text-3xl">{item.icon}</span>
                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-1">
                                <h4 className="font-bold text-gray-800">{item.step}</h4>
                                <span className="text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">
                                  {item.time}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">{item.desc}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 提升效果 */}
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <span>📊</span>
                    <span>提升效果数据</span>
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {selectedScenario.details.benefits.map((benefit, idx: number) => (
                      <div key={idx} className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                        <div className="text-4xl mb-2">{benefit.icon}</div>
                        <div className="text-lg font-bold mb-1">{benefit.label}</div>
                        <div className="text-sm mb-2">{benefit.value}</div>
                        <div className="bg-white/20 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-yellow-400 to-green-400 h-full transition-all duration-1000"
                            style={{ width: `${Math.min(benefit.percent, 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 使用工具 */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-200">
                  <h3 className="text-2xl font-bold text-purple-600 mb-4 flex items-center gap-2">
                    <span>🛠️</span>
                    <span>推荐AI工具及使用场景</span>
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {selectedScenario.details.tools.map((tool, idx: number) => (
                      <div key={idx} className="bg-purple-50 rounded-lg p-4 flex items-start gap-4">
                        <span className="text-4xl">{tool.icon}</span>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800 text-lg mb-1">{tool.name}</h4>
                          <p className="text-sm text-gray-600">{tool.usage}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* 四象限详情弹框 */}
      <Dialog open={isQuadrantDialogOpen} onOpenChange={setIsQuadrantDialogOpen}>
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-50 to-purple-50">
          {selectedQuadrant && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-4 text-3xl">
                  <div className={`${selectedQuadrant.color} w-16 h-16 rounded-2xl flex items-center justify-center text-3xl`}>
                    {selectedQuadrant.level.split(' ')[0]}
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">{selectedQuadrant.level}</div>
                    <div className="text-sm text-gray-500 font-normal mt-1">
                      {selectedQuadrant.desc}
                    </div>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                {/* 阶段描述 */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-200">
                  <div className="text-lg text-gray-700 leading-relaxed">
                    {selectedQuadrant.details.description}
                  </div>
                </div>

                {/* 如何达到这个层级 */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-200">
                  <h3 className="text-2xl font-bold text-blue-600 mb-4 flex items-center gap-2">
                    <span>🎯</span>
                    <span>如何达到这个层级</span>
                  </h3>
                  <div className="space-y-4">
                    {selectedQuadrant.details.howToReach.map((step, idx) => (
                      <div key={idx} className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-400">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="text-4xl mb-2">{step.icon}</div>
                            <div className="text-sm font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded text-center">
                              步骤 {idx + 1}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-gray-800 mb-2">{step.step}</h4>
                            <p className="text-gray-600 mb-3">{step.desc}</p>
                            <div className="space-y-1">
                              {step.tips.map((tip, tipIdx) => (
                                <div key={tipIdx} className="flex items-start gap-2 text-sm text-gray-700">
                                  <span className="text-blue-500 mt-1">▸</span>
                                  <span>{tip}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 核心技能 */}
                <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-6 text-white">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <span>💪</span>
                    <span>需要掌握的核心技能</span>
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {selectedQuadrant.details.keySkills.map((skill, idx) => (
                      <div key={idx} className="bg-white/10 backdrop-blur rounded-xl p-4">
                        <div className="text-4xl mb-3 text-center">{skill.icon}</div>
                        <h4 className="font-bold text-lg mb-2 text-center">{skill.skill}</h4>
                        <p className="text-sm opacity-90 text-center">{skill.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 实践案例 */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-orange-200">
                  <h3 className="text-2xl font-bold text-orange-600 mb-4 flex items-center gap-2">
                    <span>💡</span>
                    <span>典型实践案例</span>
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {selectedQuadrant.details.examples.map((example, idx) => (
                      <div key={idx} className="bg-orange-50 rounded-xl p-4 border-2 border-orange-200 hover:border-orange-400 transition-all">
                        <div className="text-4xl mb-3 text-center">{example.icon}</div>
                        <h4 className="font-bold text-lg text-gray-800 mb-2 text-center">{example.title}</h4>
                        <p className="text-sm text-gray-600 text-center">{example.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 下一步成长方向 */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white text-center">
                  <h3 className="text-xl font-bold mb-2 flex items-center justify-center gap-2">
                    <span>🚀</span>
                    <span>下一步成长方向</span>
                  </h3>
                  <p className="text-lg opacity-90">{selectedQuadrant.details.nextLevel}</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
