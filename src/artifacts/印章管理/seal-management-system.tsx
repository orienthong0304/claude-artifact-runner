import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Plus, Edit2, Trash2, Move, Download, Eye, CheckCircle, XCircle, Clock,
  FileText, AlertTriangle, ChevronRight, Filter, Bell, User, Stamp, Home, List,
  GitBranch, History, BarChart3, RotateCcw, FileCheck, Upload, Archive
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog, DialogContent, DialogDescription,
  DialogHeader, DialogTitle
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, LineChart, Line
} from 'recharts';

// ==================== 类型定义 ====================
interface Role {
  id: string;
  name: string;
  level: number;
  unit: string;
  dept: string;
  permissions: string[];
}

interface Seal {
  id: number;
  name: string;
  recordType: string;
  sealType: string;
  belongUnit: string;
  custodyUnit: string;
  custodyDept: string;
  location: string;
  keeper: string;
  status: string;
  remark: string;
  lastModified: string;
  image: string | null;
  isDeleted: boolean;
  deletedAt: string | null;
  deletedBy: string | null;
}

interface Approval {
  id: number;
  type: string;
  sealName: string;
  sealId?: number;
  applicant: string;
  applyDate: string;
  status: string;
  currentStep: number;
  steps: string[];
  reason?: string;
  comments?: { step: number; approver: string; comment: string; time: string; action: string }[];
  preChangeData?: Partial<Seal>;
}

interface UsageRecord {
  id: number;
  sealId: number;
  sealName: string;
  applicant: string;
  purpose: string;
  applyTime: string;
  useTime?: string;
  status: string;
  copies?: number;
}

interface Notification {
  id: number;
  type: 'approval' | 'change' | 'system';
  message: string;
  time: string;
  read: boolean;
}

// ==================== 静态数据 ====================
// 三级角色权限体系
const roles: Role[] = [
  // 第一层级 - 公司级
  {
    id: 'company_admin', name: '公司印章管理员', level: 1,
    unit: '公司综合部', dept: '公司综合部',
    permissions: ['view_all', 'add', 'edit', 'delete', 'move', 'export', 'approve', 'restore', 'apply']
  },
  {
    id: 'company_leader', name: '公司综合部负责人', level: 1,
    unit: '公司综合部', dept: '公司综合部',
    permissions: ['view_all', 'export', 'approve']
  },
  // 第二层级 - 分支机构级
  {
    id: 'branch_admin', name: '一分公司印章管理员', level: 2,
    unit: '第一分公司', dept: '综合部',
    permissions: ['view_branch', 'add', 'edit', 'delete', 'move', 'export', 'approve', 'apply']
  },
  {
    id: 'branch_leader', name: '一分公司负责人', level: 2,
    unit: '第一分公司', dept: '综合部',
    permissions: ['view_branch', 'export', 'approve']
  },
  // 第三层级 - 项目部级
  {
    id: 'dept_admin', name: '项目一部印章管理员', level: 3,
    unit: '第一分公司', dept: '项目一部',
    permissions: ['view_dept', 'add', 'edit', 'move', 'export', 'apply']
  },
  {
    id: 'keeper', name: '印章保管员(赵六)', level: 3,
    unit: '第一分公司', dept: '项目一部',
    permissions: ['view_own', 'pre_edit']
  },
];

// 审批流程配置
const approvalFlows: Record<string, string[]> = {
  '刻制': ['申请人', '本级领导', '上级管理员', '上级领导', '公司综合部负责人'],
  '领取': ['申请人', '本级领导', '上级管理员', '上级领导', '公司综合部负责人'],
  '更换': ['申请人', '本级领导', '上级管理员', '上级领导', '公司印章管理员'],
  '归还': ['申请人', '本级领导'],
  '销毁': ['申请人', '本级领导', '上级管理员', '上级领导', '公司综合部负责人'],
  '预变更': ['申请人', '本级管理员'],
};

// 下拉选项
const recordTypes = ['备案章', '非备案章'];
const sealTypes = ['公章', '内设机构印章', '财务专用章', '合同专用章', '发票专用章', '业务专用章', '设计专用章', '出图专用章', '其他类型'];
const belongUnits = ['中通信息', '南方设计'];
const custodyUnits = ['公司综合部', '财务部', '业财支撑中心', '市场部', '技术部', '第一分公司', '第二分公司', '第三分公司', '第七分公司'];
const custodyDepts = ['公司综合部', '财务部', '综合部', '设计一部', '设计二部', '项目一部', '项目二部', '市场部'];
const locations = ['广州市天河区', '广州市越秀区', '深圳市南山区', '深圳市福田区', '佛山市禅城区', '东莞市东城区', '珠海市香洲区', '惠州市惠城区'];
const keepers = ['李鉴熹', '王小明', '张三', '李四', '王五', '赵六', '钱七', '孙八'];
const statuses = ['在用', '暂存未用', '已停用待销毁', '已销毁', '已登报挂失'];
const changeTypes = ['刻制', '领取', '更换', '归还', '销毁'];

// 模拟印章数据
const initialSeals: Seal[] = [
  { id: 1, name: '广东南方电信规划咨询设计院有限公司', recordType: '备案章', sealType: '公章', belongUnit: '南方设计', custodyUnit: '公司综合部', custodyDept: '公司综合部', location: '广州市天河区', keeper: '李鉴熹', status: '在用', remark: '公司主章', lastModified: '2025-03-20', image: null, isDeleted: false, deletedAt: null, deletedBy: null },
  { id: 2, name: '广东南方电信规划咨询设计院有限公司财务专用章', recordType: '备案章', sealType: '财务专用章', belongUnit: '南方设计', custodyUnit: '财务部', custodyDept: '财务部', location: '广州市天河区', keeper: '王小明', status: '在用', remark: '', lastModified: '2025-03-18', image: null, isDeleted: false, deletedAt: null, deletedBy: null },
  { id: 3, name: '广东南方电信规划咨询设计院有限公司合同专用章', recordType: '备案章', sealType: '合同专用章', belongUnit: '南方设计', custodyUnit: '公司综合部', custodyDept: '公司综合部', location: '广州市天河区', keeper: '李鉴熹', status: '在用', remark: '', lastModified: '2025-03-15', image: null, isDeleted: false, deletedAt: null, deletedBy: null },
  { id: 4, name: '广东南方电信规划咨询设计院有限公司第一分公司', recordType: '备案章', sealType: '内设机构印章', belongUnit: '南方设计', custodyUnit: '第一分公司', custodyDept: '综合部', location: '深圳市南山区', keeper: '张三', status: '在用', remark: '一分公司章', lastModified: '2025-03-10', image: null, isDeleted: false, deletedAt: null, deletedBy: null },
  { id: 5, name: '广东南方电信规划咨询设计院有限公司第二分公司', recordType: '备案章', sealType: '内设机构印章', belongUnit: '南方设计', custodyUnit: '第二分公司', custodyDept: '综合部', location: '佛山市禅城区', keeper: '李四', status: '在用', remark: '二分公司章', lastModified: '2025-03-08', image: null, isDeleted: false, deletedAt: null, deletedBy: null },
  { id: 6, name: '广东南方电信规划咨询设计院有限公司出图专用章(01)', recordType: '非备案章', sealType: '出图专用章', belongUnit: '南方设计', custodyUnit: '第一分公司', custodyDept: '设计一部', location: '深圳市南山区', keeper: '王五', status: '在用', remark: '出图章01', lastModified: '2025-03-05', image: null, isDeleted: false, deletedAt: null, deletedBy: null },
  { id: 7, name: '广东南方电信规划咨询设计院有限公司出图专用章(02)', recordType: '非备案章', sealType: '出图专用章', belongUnit: '南方设计', custodyUnit: '第一分公司', custodyDept: '项目一部', location: '东莞市东城区', keeper: '赵六', status: '暂存未用', remark: '出图章02，暂存', lastModified: '2025-02-28', image: null, isDeleted: false, deletedAt: null, deletedBy: null },
  { id: 8, name: '中通服信息科技有限公司', recordType: '备案章', sealType: '公章', belongUnit: '中通信息', custodyUnit: '公司综合部', custodyDept: '公司综合部', location: '广州市天河区', keeper: '李鉴熹', status: '在用', remark: '中通信息主章', lastModified: '2025-03-01', image: null, isDeleted: false, deletedAt: null, deletedBy: null },
  { id: 9, name: '广东南方电信规划咨询设计院有限公司发票专用章', recordType: '备案章', sealType: '发票专用章', belongUnit: '南方设计', custodyUnit: '财务部', custodyDept: '财务部', location: '广州市天河区', keeper: '王小明', status: '已停用待销毁', remark: '旧章待销毁', lastModified: '2025-01-15', image: null, isDeleted: false, deletedAt: null, deletedBy: null },
  { id: 10, name: '广东南方电信规划咨询设计院有限公司旧合同章', recordType: '备案章', sealType: '合同专用章', belongUnit: '南方设计', custodyUnit: '公司综合部', custodyDept: '公司综合部', location: '广州市天河区', keeper: '李鉴熹', status: '已销毁', remark: '已于2024年销毁', lastModified: '2024-12-01', image: null, isDeleted: true, deletedAt: '2025-01-10', deletedBy: '李鉴熹' },
];

// 模拟审批数据
const initialApprovals: Approval[] = [
  {
    id: 1, type: '刻制', sealName: '广东南方电信规划咨询设计院有限公司业务专用章',
    applicant: '张三', applyDate: '2025-03-22', status: '审批中', currentStep: 2,
    steps: ['申请人', '一分公司负责人', '公司综合部管理员', '公司综合部负责人'],
    reason: '业务拓展需要新增业务专用章',
    comments: [
      { step: 1, approver: '张三', comment: '提交申请', time: '2025-03-22 09:00', action: '提交' },
      { step: 2, approver: '一分公司负责人', comment: '同意', time: '2025-03-22 14:30', action: '通过' }
    ]
  },
  {
    id: 2, type: '归还', sealName: '广东南方电信规划咨询设计院有限公司出图专用章(02)',
    applicant: '赵六', applyDate: '2025-03-21', status: '已完成', currentStep: 3,
    steps: ['申请人', '项目一部负责人'],
    reason: '项目结束，归还印章',
    comments: [
      { step: 1, approver: '赵六', comment: '项目已结束', time: '2025-03-21 10:00', action: '提交' },
      { step: 2, approver: '项目一部负责人', comment: '确认归还', time: '2025-03-21 15:00', action: '通过' }
    ]
  },
  {
    id: 3, type: '更换', sealName: '广东南方电信规划咨询设计院有限公司合同专用章',
    applicant: '李鉴熹', applyDate: '2025-03-20', status: '待审批', currentStep: 1,
    steps: ['申请人', '公司综合部负责人', '公司印章管理员'],
    reason: '印章磨损，申请更换',
    comments: []
  },
  {
    id: 4, type: '预变更', sealName: '广东南方电信规划咨询设计院有限公司出图专用章(02)',
    sealId: 7, applicant: '赵六', applyDate: '2025-03-24', status: '待审批', currentStep: 1,
    steps: ['申请人', '本级管理员'],
    reason: '修改保管地点信息',
    preChangeData: { location: '深圳市福田区', remark: '更新保管地点' }
  },
];

// 用章记录数据
const initialUsageRecords: UsageRecord[] = [
  { id: 1, sealId: 1, sealName: '广东南方电信规划咨询设计院有限公司', applicant: '张三', purpose: '合同签署', applyTime: '2025-03-24 10:30', useTime: '2025-03-24 11:00', status: '已用章', copies: 2 },
  { id: 2, sealId: 3, sealName: '广东南方电信规划咨询设计院有限公司合同专用章', applicant: '李四', purpose: '供应商合同', applyTime: '2025-03-23 14:00', useTime: '2025-03-23 15:30', status: '已用章', copies: 3 },
  { id: 3, sealId: 2, sealName: '广东南方电信规划咨询设计院有限公司财务专用章', applicant: '王小明', purpose: '财务报表', applyTime: '2025-03-23 09:00', useTime: '2025-03-23 09:30', status: '已用章', copies: 5 },
  { id: 4, sealId: 1, sealName: '广东南方电信规划咨询设计院有限公司', applicant: '钱七', purpose: '投标文件', applyTime: '2025-03-24 16:00', status: '待用章', copies: 10 },
];

// 图表颜色
const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

// ==================== 工具函数 ====================
// 权限判断函数
const canViewSeal = (role: Role, seal: Seal): boolean => {
  if (role.permissions.includes('view_all')) return true;
  if (role.permissions.includes('view_branch') && seal.custodyUnit === role.unit) return true;
  if (role.permissions.includes('view_dept') && seal.custodyDept === role.dept) return true;
  if (role.permissions.includes('view_own')) {
    const keeperName = role.name.match(/\(([^)]+)\)/)?.[1] || '';
    return seal.keeper === keeperName;
  }
  return false;
};

const canEditSeal = (role: Role, seal: Seal): boolean | 'pre_edit' => {
  if (!canViewSeal(role, seal)) return false;
  if (role.permissions.includes('edit')) return true;
  if (role.permissions.includes('pre_edit')) return 'pre_edit';
  return false;
};

const hasPermission = (role: Role, permission: string): boolean => {
  return role.permissions.includes(permission);
};

// ==================== 主组件 ====================
export default function SealManagementSystem() {
  // 状态管理
  const [currentRole, setCurrentRole] = useState<Role>(roles[0]);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [seals, setSeals] = useState<Seal[]>(initialSeals);
  const [approvals, setApprovals] = useState<Approval[]>(initialApprovals);
  const [usageRecords] = useState<UsageRecord[]>(initialUsageRecords);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ sealType: '', status: '', custodyUnit: '' });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSeal, setSelectedSeal] = useState<Seal | null>(null);
  const [showModal, setShowModal] = useState<string | null>(null);
  const [editingSeal, setEditingSeal] = useState<Partial<Seal> | null>(null);
  const [newApproval, setNewApproval] = useState<Partial<Approval> | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, type: 'approval', message: '张三提交了印章刻制申请，等待审批', time: '10分钟前', read: false },
    { id: 2, type: 'change', message: '出图专用章(02)归还流程已完成', time: '1小时前', read: true },
    { id: 3, type: 'system', message: '系统将于今晚22:00进行维护', time: '3小时前', read: false },
  ]);

  // 根据角色筛选可见印章
  const visibleSeals = useMemo(() => {
    let filtered = seals.filter(s => !s.isDeleted);

    // 根据角色权限筛选
    filtered = filtered.filter(s => canViewSeal(currentRole, s));

    // 搜索筛选
    if (searchTerm) {
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.keeper.includes(searchTerm)
      );
    }
    if (filters.sealType) filtered = filtered.filter(s => s.sealType === filters.sealType);
    if (filters.status) filtered = filtered.filter(s => s.status === filters.status);
    if (filters.custodyUnit) filtered = filtered.filter(s => s.custodyUnit === filters.custodyUnit);

    return filtered;
  }, [seals, currentRole, searchTerm, filters]);

  // 已删除的印章
  const deletedSeals = useMemo(() => {
    return seals.filter(s => s.isDeleted);
  }, [seals]);

  // 统计数据
  const stats = useMemo(() => ({
    total: visibleSeals.length,
    inUse: visibleSeals.filter(s => s.status === '在用').length,
    pending: approvals.filter(a => a.status === '审批中' || a.status === '待审批').length,
    record: visibleSeals.filter(s => s.recordType === '备案章').length,
    deleted: deletedSeals.length,
  }), [visibleSeals, approvals, deletedSeals]);

  // 添加印章
  const handleAddSeal = useCallback((sealData: Partial<Seal>) => {
    const exists = seals.some(s => s.name === sealData.name && !s.isDeleted);
    if (exists) {
      alert('警告：系统中已存在同名印章！');
      return false;
    }
    const newSeal: Seal = {
      ...sealData as Seal,
      id: Math.max(...seals.map(s => s.id)) + 1,
      lastModified: new Date().toISOString().split('T')[0],
      isDeleted: false,
      deletedAt: null,
      deletedBy: null,
    };
    setSeals([...seals, newSeal]);
    addNotification('change', `印章"${newSeal.name}"已创建`);
    return true;
  }, [seals]);

  // 编辑印章
  const handleEditSeal = useCallback((sealData: Partial<Seal>) => {
    setSeals(seals.map(s =>
      s.id === sealData.id
        ? { ...s, ...sealData, lastModified: new Date().toISOString().split('T')[0] }
        : s
    ));
    addNotification('change', `印章信息已更新`);
  }, [seals]);

  // 删除印章（软删除）
  const handleDeleteSeal = useCallback((seal: Seal) => {
    if (!['已销毁', '已登报挂失'].includes(seal.status)) {
      alert('只有状态为"已销毁"或"已登报挂失"的印章才能删除！');
      return;
    }
    if (confirm(`确定要删除印章"${seal.name}"吗？删除后将移入已删除区。`)) {
      setSeals(seals.map(s =>
        s.id === seal.id
          ? { ...s, isDeleted: true, deletedAt: new Date().toISOString(), deletedBy: currentRole.name }
          : s
      ));
      addNotification('change', `印章"${seal.name}"已被删除`);
    }
  }, [seals, currentRole]);

  // 恢复删除的印章
  const handleRestoreSeal = useCallback((seal: Seal) => {
    setSeals(seals.map(s =>
      s.id === seal.id
        ? { ...s, isDeleted: false, deletedAt: null, deletedBy: null }
        : s
    ));
    addNotification('change', `印章"${seal.name}"已恢复`);
  }, [seals]);

  // 审批操作
  const handleApprovalAction = useCallback((approvalId: number, action: 'approve' | 'reject', comment?: string) => {
    setApprovals(approvals.map(a => {
      if (a.id === approvalId) {
        const newComments = [...(a.comments || []), {
          step: a.currentStep,
          approver: currentRole.name,
          comment: comment || (action === 'approve' ? '同意' : '驳回'),
          time: new Date().toLocaleString('zh-CN'),
          action: action === 'approve' ? '通过' : '驳回'
        }];

        if (action === 'approve') {
          const newStep = a.currentStep + 1;
          const isComplete = newStep >= a.steps.length;

          // 如果是预变更审批完成，应用变更
          if (isComplete && a.type === '预变更' && a.sealId && a.preChangeData) {
            setSeals(seals.map(s =>
              s.id === a.sealId
                ? { ...s, ...a.preChangeData, lastModified: new Date().toISOString().split('T')[0] }
                : s
            ));
          }

          return { ...a, currentStep: newStep, status: isComplete ? '已完成' : '审批中', comments: newComments };
        } else {
          return { ...a, status: '已驳回', comments: newComments };
        }
      }
      return a;
    }));

    addNotification('approval', action === 'approve' ? '审批已通过' : '审批已驳回');
  }, [approvals, currentRole, seals]);

  // 提交申请
  const submitApproval = useCallback((data: Partial<Approval>) => {
    const steps = approvalFlows[data.type || '刻制'] || approvalFlows['刻制'];

    const newApp: Approval = {
      id: Math.max(...approvals.map(a => a.id)) + 1,
      type: data.type || '刻制',
      sealName: data.sealName || '',
      sealId: data.sealId,
      applicant: currentRole.name,
      applyDate: new Date().toISOString().split('T')[0],
      status: '待审批',
      currentStep: 1,
      steps,
      reason: data.reason,
      preChangeData: data.preChangeData,
      comments: [{ step: 1, approver: currentRole.name, comment: '提交申请', time: new Date().toLocaleString('zh-CN'), action: '提交' }]
    };
    setApprovals([newApp, ...approvals]);
    setShowModal(null);
    setNewApproval(null);
    addNotification('approval', `${data.type}申请已提交`);
  }, [approvals, currentRole]);

  // 添加通知
  const addNotification = useCallback((type: 'approval' | 'change' | 'system', message: string) => {
    setNotifications(prev => [{
      id: Date.now(),
      type,
      message,
      time: '刚刚',
      read: false
    }, ...prev]);
  }, []);

  // 标记通知已读
  const markNotificationRead = useCallback((id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  }, [notifications]);

  // 发起预变更
  const handlePreChange = useCallback((seal: Seal, changes: Partial<Seal>) => {
    const newApp: Approval = {
      id: Math.max(...approvals.map(a => a.id)) + 1,
      type: '预变更',
      sealName: seal.name,
      sealId: seal.id,
      applicant: currentRole.name,
      applyDate: new Date().toISOString().split('T')[0],
      status: '待审批',
      currentStep: 1,
      steps: approvalFlows['预变更'],
      reason: '印章保管员修改信息',
      preChangeData: changes,
      comments: []
    };
    setApprovals([newApp, ...approvals]);
    addNotification('approval', '预变更申请已提交，等待管理员审批');
  }, [approvals, currentRole]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* 侧边栏 */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white flex flex-col"
      >
        <div className="p-5 border-b border-blue-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Stamp className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-lg">印章管理系统</h1>
              <p className="text-xs text-blue-200">Seal Management</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {[
              { id: 'dashboard', icon: Home, label: '工作台' },
              { id: 'seals', icon: List, label: '印章信息' },
              { id: 'approvals', icon: GitBranch, label: '变更审批' },
              { id: 'usage', icon: FileCheck, label: '用章记录' },
              { id: 'deleted', icon: Archive, label: '已删除区', badge: stats.deleted },
              { id: 'history', icon: History, label: '操作日志' },
              { id: 'stats', icon: BarChart3, label: '统计分析' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${activeMenu === item.id
                    ? 'bg-white/20 text-white'
                    : 'text-blue-200 hover:bg-white/10 hover:text-white'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                {item.badge && item.badge > 0 && (
                  <Badge variant="secondary" className="bg-red-500 text-white text-xs">
                    {item.badge}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-blue-700">
          <div className="text-xs text-blue-300 mb-2">当前角色</div>
          <Select value={currentRole.id} onValueChange={(v) => setCurrentRole(roles.find(r => r.id === v) || roles[0])}>
            <SelectTrigger className="w-full bg-blue-700/50 border-blue-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {roles.map(role => (
                <SelectItem key={role.id} value={role.id}>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">{role.level}级</Badge>
                    {role.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="mt-2 text-xs text-blue-300">
            层级：{currentRole.level} | {currentRole.unit}
          </div>
        </div>
      </motion.aside>

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col">
        {/* 顶部导航 */}
        <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
          <div>
            <motion.h2
              key={activeMenu}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl font-semibold text-gray-800"
            >
              {activeMenu === 'dashboard' && '工作台'}
              {activeMenu === 'seals' && '印章信息管理'}
              {activeMenu === 'approvals' && '印章变更审批'}
              {activeMenu === 'usage' && '用章记录'}
              {activeMenu === 'deleted' && '已删除区'}
              {activeMenu === 'history' && '操作日志'}
              {activeMenu === 'stats' && '统计分析'}
            </motion.h2>
            <p className="text-sm text-gray-500">
              {currentRole.name} - {currentRole.unit}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative"
              >
                <Bell className="w-5 h-5" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </Button>

              {/* 通知面板 */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-xl border z-50"
                  >
                    <div className="p-4 border-b">
                      <h3 className="font-semibold">通知消息</h3>
                    </div>
                    <ScrollArea className="h-80">
                      {notifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => markNotificationRead(n.id)}
                          className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${!n.read ? 'bg-blue-50' : ''}`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 mt-2 rounded-full ${n.type === 'approval' ? 'bg-blue-500' :
                                n.type === 'change' ? 'bg-green-500' : 'bg-gray-500'
                              }`} />
                            <div>
                              <p className="text-sm">{n.message}</p>
                              <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </ScrollArea>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Separator orientation="vertical" className="h-8" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">{currentRole.name}</span>
            </div>
          </div>
        </header>

        {/* 内容区 */}
        <main className="flex-1 p-6 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMenu}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeMenu === 'dashboard' && (
                <Dashboard
                  stats={stats}
                  approvals={approvals}
                  usageRecords={usageRecords}
                  notifications={notifications}
                  setActiveMenu={setActiveMenu}
                  currentRole={currentRole}
                />
              )}

              {activeMenu === 'seals' && (
                <SealList
                  seals={visibleSeals}
                  currentRole={currentRole}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  filters={filters}
                  setFilters={setFilters}
                  showFilters={showFilters}
                  setShowFilters={setShowFilters}
                  onView={(seal) => { setSelectedSeal(seal); setShowModal('view'); }}
                  onEdit={(seal) => {
                    const canEdit = canEditSeal(currentRole, seal);
                    if (canEdit === 'pre_edit') {
                      setEditingSeal({ ...seal });
                      setShowModal('pre_edit');
                    } else if (canEdit) {
                      setEditingSeal({ ...seal });
                      setShowModal('edit');
                    }
                  }}
                  onDelete={handleDeleteSeal}
                  onAdd={() => {
                    setEditingSeal({
                      name: '', recordType: '备案章', sealType: '公章', belongUnit: '南方设计',
                      custodyUnit: '', custodyDept: '', location: '', keeper: '', status: '在用', remark: ''
                    });
                    setShowModal('add');
                  }}
                  onMove={(seal) => { setSelectedSeal(seal); setShowModal('move'); }}
                  onApply={(seal) => { setNewApproval({ sealName: seal.name, type: '归还', reason: '' }); setShowModal('apply'); }}
                />
              )}

              {activeMenu === 'approvals' && (
                <ApprovalList
                  approvals={approvals}
                  currentRole={currentRole}
                  onApprove={(id, comment) => handleApprovalAction(id, 'approve', comment)}
                  onReject={(id, comment) => handleApprovalAction(id, 'reject', comment)}
                  onNewApply={() => { setNewApproval({ sealName: '', type: '刻制', reason: '' }); setShowModal('apply'); }}
                />
              )}

              {activeMenu === 'usage' && (
                <UsageRecordList records={usageRecords} seals={seals} />
              )}

              {activeMenu === 'deleted' && (
                <DeletedSealList
                  seals={deletedSeals}
                  currentRole={currentRole}
                  onRestore={handleRestoreSeal}
                />
              )}

              {activeMenu === 'history' && <OperationHistory />}

              {activeMenu === 'stats' && <Statistics seals={seals} usageRecords={usageRecords} approvals={approvals} />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* 模态框 */}
      <Dialog open={showModal === 'view'} onOpenChange={() => setShowModal(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>印章详情</DialogTitle>
          </DialogHeader>
          {selectedSeal && <SealDetail seal={selectedSeal} />}
        </DialogContent>
      </Dialog>

      <Dialog open={showModal === 'add' || showModal === 'edit'} onOpenChange={() => setShowModal(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{showModal === 'add' ? '新建印章' : '编辑印章'}</DialogTitle>
          </DialogHeader>
          {editingSeal && (
            <SealForm
              seal={editingSeal}
              onChange={setEditingSeal}
              onSubmit={() => {
                const success = showModal === 'add' ? handleAddSeal(editingSeal) : (handleEditSeal(editingSeal), true);
                if (success) setShowModal(null);
              }}
              isNew={showModal === 'add'}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showModal === 'pre_edit'} onOpenChange={() => setShowModal(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>预变更申请</DialogTitle>
            <DialogDescription>
              您的修改将提交审批，审批通过后方可生效
            </DialogDescription>
          </DialogHeader>
          {editingSeal && (
            <SealForm
              seal={editingSeal}
              onChange={setEditingSeal}
              onSubmit={() => {
                const originalSeal = seals.find(s => s.id === editingSeal.id);
                if (originalSeal) {
                  handlePreChange(originalSeal, editingSeal);
                  setShowModal(null);
                }
              }}
              isNew={false}
              isPreChange={true}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showModal === 'move'} onOpenChange={() => setShowModal(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>印章移动/调拨</DialogTitle>
          </DialogHeader>
          {selectedSeal && <MoveForm seal={selectedSeal} onSubmit={() => setShowModal(null)} />}
        </DialogContent>
      </Dialog>

      <Dialog open={showModal === 'apply'} onOpenChange={() => setShowModal(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>印章变更申请</DialogTitle>
          </DialogHeader>
          {newApproval && (
            <ApplyForm
              data={newApproval}
              onChange={setNewApproval}
              onSubmit={() => submitApproval(newApproval)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ==================== 子组件 ====================

// 工作台组件
function Dashboard({
  stats,
  approvals,
  usageRecords,
  notifications,
  setActiveMenu,
  currentRole
}: {
  stats: any;
  approvals: Approval[];
  usageRecords: UsageRecord[];
  notifications: Notification[];
  setActiveMenu: (menu: string) => void;
  currentRole: Role;
}) {
  return (
    <div className="space-y-6">
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: '印章总数', value: stats.total, icon: Stamp, color: 'blue', bgColor: 'bg-blue-100', textColor: 'text-blue-600' },
          { label: '在用印章', value: stats.inUse, icon: CheckCircle, color: 'green', bgColor: 'bg-green-100', textColor: 'text-green-600' },
          { label: '待审批', value: stats.pending, icon: Clock, color: 'orange', bgColor: 'bg-orange-100', textColor: 'text-orange-600' },
          { label: '备案章', value: stats.record, icon: FileText, color: 'purple', bgColor: 'bg-purple-100', textColor: 'text-purple-600' },
          { label: '已删除', value: stats.deleted, icon: Archive, color: 'gray', bgColor: 'bg-gray-100', textColor: 'text-gray-600' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 待办事项 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">待办事项</CardTitle>
            <Button variant="link" onClick={() => setActiveMenu('approvals')}>查看全部</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {approvals.filter(a => a.status !== '已完成' && a.status !== '已驳回').slice(0, 4).map((approval, i) => (
                <motion.div
                  key={approval.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className={`w-2 h-2 rounded-full ${approval.status === '审批中' ? 'bg-orange-500' : 'bg-yellow-500'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{approval.sealName}</p>
                    <p className="text-xs text-gray-500">{approval.type} · {approval.applicant}</p>
                  </div>
                  <Badge variant={approval.status === '审批中' ? 'default' : 'secondary'}>
                    {approval.status}
                  </Badge>
                </motion.div>
              ))}
              {approvals.filter(a => a.status !== '已完成' && a.status !== '已驳回').length === 0 && (
                <p className="text-center text-gray-400 py-8">暂无待办事项</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 最近用章 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">最近用章</CardTitle>
            <Button variant="link" onClick={() => setActiveMenu('usage')}>查看全部</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {usageRecords.slice(0, 4).map((record, i) => (
                <motion.div
                  key={record.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className={`w-2 h-2 rounded-full ${record.status === '已用章' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{record.sealName}</p>
                    <p className="text-xs text-gray-500">{record.purpose} · {record.applicant}</p>
                  </div>
                  <Badge variant={record.status === '已用章' ? 'default' : 'secondary'}>
                    {record.copies}份
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 快捷入口 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">快捷操作</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: '新建印章', icon: Plus, onClick: () => setActiveMenu('seals'), disabled: !hasPermission(currentRole, 'add') },
              { label: '发起申请', icon: GitBranch, onClick: () => setActiveMenu('approvals'), disabled: !hasPermission(currentRole, 'apply') },
              { label: '导出数据', icon: Download, onClick: () => { }, disabled: !hasPermission(currentRole, 'export') },
              { label: '统计分析', icon: BarChart3, onClick: () => setActiveMenu('stats'), disabled: false },
            ].map((item, i) => (
              <Button
                key={i}
                variant="outline"
                className="h-20 flex flex-col gap-2"
                onClick={item.onClick}
                disabled={item.disabled}
              >
                <item.icon className="w-6 h-6" />
                <span>{item.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// 印章列表组件
function SealList({
  seals,
  currentRole,
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
  showFilters,
  setShowFilters,
  onView,
  onEdit,
  onDelete,
  onAdd,
  onMove,
  onApply
}: {
  seals: Seal[];
  currentRole: Role;
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  filters: any;
  setFilters: (v: any) => void;
  showFilters: boolean;
  setShowFilters: (v: boolean) => void;
  onView: (seal: Seal) => void;
  onEdit: (seal: Seal) => void;
  onDelete: (seal: Seal) => void;
  onAdd: () => void;
  onMove: (seal: Seal) => void;
  onApply: (seal: Seal) => void;
}) {
  const canAdd = hasPermission(currentRole, 'add');
  const canExport = hasPermission(currentRole, 'export');

  return (
    <div className="space-y-4">
      {/* 工具栏 */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1 relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="搜索印章名称、保管员..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={showFilters ? 'secondary' : 'outline'}
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                筛选
              </Button>
              {canAdd && (
                <Button onClick={onAdd}>
                  <Plus className="w-4 h-4 mr-2" />
                  新建印章
                </Button>
              )}
              {canExport && (
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  导出
                </Button>
              )}
            </div>
          </div>

          {/* 筛选面板 */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-4 pt-4 border-t overflow-hidden"
              >
                <div className="flex flex-wrap items-center gap-4">
                  <Select value={filters.sealType} onValueChange={(v) => setFilters({ ...filters, sealType: v })}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="全部类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">全部类型</SelectItem>
                      {sealTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Select value={filters.status} onValueChange={(v) => setFilters({ ...filters, status: v })}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="全部状态" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">全部状态</SelectItem>
                      {statuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Select value={filters.custodyUnit} onValueChange={(v) => setFilters({ ...filters, custodyUnit: v })}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="全部保管单位" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">全部保管单位</SelectItem>
                      {custodyUnits.map(u => <SelectItem key={u} value={u}>{u}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    onClick={() => setFilters({ sealType: '', status: '', custodyUnit: '' })}
                  >
                    清除筛选
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* 印章表格 */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>印章名称</TableHead>
              <TableHead>类型</TableHead>
              <TableHead>保管单位/部门</TableHead>
              <TableHead>保管员</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>最后修改</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {seals.map((seal, index) => (
              <motion.tr
                key={seal.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                className="hover:bg-gray-50"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Stamp className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate max-w-xs" title={seal.name}>{seal.name}</p>
                      <p className="text-xs text-gray-500">{seal.recordType} · {seal.belongUnit}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-600">{seal.sealType}</TableCell>
                <TableCell>
                  <p className="text-sm text-gray-800">{seal.custodyUnit}</p>
                  <p className="text-xs text-gray-500">{seal.custodyDept}</p>
                </TableCell>
                <TableCell className="text-sm text-gray-600">{seal.keeper}</TableCell>
                <TableCell>
                  <Badge variant={
                    seal.status === '在用' ? 'default' :
                      seal.status === '暂存未用' ? 'secondary' :
                        seal.status === '已停用待销毁' ? 'destructive' :
                          'outline'
                  }>
                    {seal.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-gray-500">{seal.lastModified}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" onClick={() => onView(seal)} title="查看">
                      <Eye className="w-4 h-4" />
                    </Button>
                    {canEditSeal(currentRole, seal) && (
                      <Button variant="ghost" size="icon" onClick={() => onEdit(seal)} title={canEditSeal(currentRole, seal) === 'pre_edit' ? '预变更' : '编辑'}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    )}
                    {hasPermission(currentRole, 'move') && (
                      <Button variant="ghost" size="icon" onClick={() => onMove(seal)} title="移动">
                        <Move className="w-4 h-4" />
                      </Button>
                    )}
                    {hasPermission(currentRole, 'delete') && (
                      <Button variant="ghost" size="icon" onClick={() => onDelete(seal)} title="删除">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                    {hasPermission(currentRole, 'apply') && (
                      <Button variant="ghost" size="icon" onClick={() => onApply(seal)} title="发起变更">
                        <GitBranch className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>

        <div className="px-4 py-3 bg-gray-50 border-t flex items-center justify-between">
          <p className="text-sm text-gray-500">共 {seals.length} 条记录</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">上一页</Button>
            <Button size="sm">1</Button>
            <Button variant="outline" size="sm">下一页</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

// 审批列表组件
function ApprovalList({
  approvals,
  currentRole,
  onApprove,
  onReject,
  onNewApply
}: {
  approvals: Approval[];
  currentRole: Role;
  onApprove: (id: number, comment?: string) => void;
  onReject: (id: number, comment?: string) => void;
  onNewApply: () => void;
}) {
  const [activeTab, setActiveTab] = useState('all');
  const [approvalComment, setApprovalComment] = useState('');

  const filteredApprovals = useMemo(() => {
    if (activeTab === 'all') return approvals;
    const statusMap: Record<string, string[]> = {
      'pending': ['待审批'],
      'processing': ['审批中'],
      'completed': ['已完成'],
      'rejected': ['已驳回']
    };
    return approvals.filter(a => statusMap[activeTab]?.includes(a.status));
  }, [approvals, activeTab]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">全部</TabsTrigger>
            <TabsTrigger value="pending">待审批</TabsTrigger>
            <TabsTrigger value="processing">审批中</TabsTrigger>
            <TabsTrigger value="completed">已完成</TabsTrigger>
            <TabsTrigger value="rejected">已驳回</TabsTrigger>
          </TabsList>
        </Tabs>
        {hasPermission(currentRole, 'apply') && (
          <Button onClick={onNewApply}>
            <Plus className="w-4 h-4 mr-2" />
            发起申请
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {filteredApprovals.map((approval, index) => (
          <motion.div
            key={approval.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <Badge variant={
                        approval.type === '刻制' ? 'default' :
                          approval.type === '归还' ? 'secondary' :
                            approval.type === '更换' ? 'outline' :
                              approval.type === '销毁' ? 'destructive' :
                                'default'
                      }>
                        {approval.type}
                      </Badge>
                      <h3 className="font-medium text-gray-800">{approval.sealName}</h3>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      申请人：{approval.applicant} · 申请日期：{approval.applyDate}
                    </p>
                    {approval.reason && (
                      <p className="text-sm text-gray-600 mt-2 bg-gray-50 p-2 rounded">
                        申请理由：{approval.reason}
                      </p>
                    )}
                  </div>
                  <Badge variant={
                    approval.status === '已完成' ? 'default' :
                      approval.status === '审批中' ? 'secondary' :
                        approval.status === '待审批' ? 'outline' :
                          'destructive'
                  }>
                    {approval.status}
                  </Badge>
                </div>

                {/* 审批流程 */}
                <div className="flex items-center gap-2 py-4 overflow-x-auto">
                  {approval.steps.map((step, i) => (
                    <React.Fragment key={i}>
                      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg flex-shrink-0 ${i < approval.currentStep ? 'bg-green-100' :
                          i === approval.currentStep ? 'bg-blue-100' :
                            'bg-gray-100'
                        }`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${i < approval.currentStep ? 'bg-green-500 text-white' :
                            i === approval.currentStep ? 'bg-blue-500 text-white' :
                              'bg-gray-300 text-gray-600'
                          }`}>
                          {i < approval.currentStep ? '✓' : i + 1}
                        </div>
                        <span className={`text-sm ${i < approval.currentStep ? 'text-green-700' :
                            i === approval.currentStep ? 'text-blue-700' :
                              'text-gray-500'
                          }`}>{step}</span>
                      </div>
                      {i < approval.steps.length - 1 && (
                        <ChevronRight className={`w-5 h-5 flex-shrink-0 ${i < approval.currentStep ? 'text-green-400' : 'text-gray-300'
                          }`} />
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* 审批记录 */}
                {approval.comments && approval.comments.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">审批记录</h4>
                    <div className="space-y-2">
                      {approval.comments.map((c, i) => (
                        <div key={i} className="flex items-start gap-3 text-sm">
                          <Badge variant={c.action === '通过' ? 'default' : c.action === '驳回' ? 'destructive' : 'secondary'}>
                            {c.action}
                          </Badge>
                          <div>
                            <span className="text-gray-700">{c.approver}</span>
                            <span className="text-gray-400 mx-2">·</span>
                            <span className="text-gray-500">{c.comment}</span>
                            <span className="text-gray-400 ml-2 text-xs">{c.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 预变更数据展示 */}
                {approval.type === '预变更' && approval.preChangeData && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">变更内容</h4>
                    <div className="bg-yellow-50 p-3 rounded-lg text-sm">
                      {Object.entries(approval.preChangeData).map(([key, value]) => (
                        <div key={key} className="flex gap-2">
                          <span className="text-gray-500">{key}:</span>
                          <span className="text-gray-800">{value as string}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 操作按钮 */}
                {hasPermission(currentRole, 'approve') && approval.status !== '已完成' && approval.status !== '已驳回' && (
                  <div className="mt-4 pt-4 border-t space-y-3">
                    <Textarea
                      placeholder="请输入审批意见（可选）"
                      value={approvalComment}
                      onChange={(e) => setApprovalComment(e.target.value)}
                      rows={2}
                    />
                    <div className="flex items-center gap-3">
                      <Button
                        onClick={() => { onApprove(approval.id, approvalComment); setApprovalComment(''); }}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        审批通过
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => { onReject(approval.id, approvalComment); setApprovalComment(''); }}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        驳回
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {filteredApprovals.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-gray-400">
              暂无相关审批记录
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

// 用章记录列表
function UsageRecordList({ records, seals }: { records: UsageRecord[]; seals: Seal[] }) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>用章申请记录</CardTitle>
          <CardDescription>查看所有印章的使用申请和记录</CardDescription>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>印章名称</TableHead>
              <TableHead>申请人</TableHead>
              <TableHead>用途</TableHead>
              <TableHead>份数</TableHead>
              <TableHead>申请时间</TableHead>
              <TableHead>用章时间</TableHead>
              <TableHead>状态</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record, index) => (
              <motion.tr
                key={record.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <TableCell className="font-medium">{record.sealName}</TableCell>
                <TableCell>{record.applicant}</TableCell>
                <TableCell>{record.purpose}</TableCell>
                <TableCell>{record.copies}</TableCell>
                <TableCell className="text-gray-500">{record.applyTime}</TableCell>
                <TableCell className="text-gray-500">{record.useTime || '-'}</TableCell>
                <TableCell>
                  <Badge variant={record.status === '已用章' ? 'default' : 'secondary'}>
                    {record.status}
                  </Badge>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* 用章统计 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">今日用章</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {records.filter(r => r.applyTime.startsWith('2025-03-24')).length}
            </div>
            <p className="text-sm text-gray-500">次申请</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">本周用章</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{records.length}</div>
            <p className="text-sm text-gray-500">次申请</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">待处理</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">
              {records.filter(r => r.status === '待用章').length}
            </div>
            <p className="text-sm text-gray-500">次申请</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// 已删除区
function DeletedSealList({
  seals,
  currentRole,
  onRestore
}: {
  seals: Seal[];
  currentRole: Role;
  onRestore: (seal: Seal) => void;
}) {
  return (
    <div className="space-y-4">
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>已删除区说明</AlertTitle>
        <AlertDescription>
          已删除的印章会保留在此区域，仅公司印章管理员可以恢复或永久删除。删除操作会通知上级管理员。
        </AlertDescription>
      </Alert>

      {seals.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-gray-400">
            <Archive className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>暂无已删除的印章</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>印章名称</TableHead>
                <TableHead>类型</TableHead>
                <TableHead>删除时间</TableHead>
                <TableHead>删除人</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {seals.map((seal, index) => (
                <motion.tr
                  key={seal.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Stamp className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-600">{seal.name}</p>
                        <p className="text-xs text-gray-400">{seal.belongUnit}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{seal.sealType}</TableCell>
                  <TableCell className="text-gray-500">{seal.deletedAt}</TableCell>
                  <TableCell>{seal.deletedBy}</TableCell>
                  <TableCell className="text-right">
                    {hasPermission(currentRole, 'restore') && (
                      <Button variant="outline" size="sm" onClick={() => onRestore(seal)}>
                        <RotateCcw className="w-4 h-4 mr-2" />
                        恢复
                      </Button>
                    )}
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}

// 操作日志组件
function OperationHistory() {
  const logs = [
    { id: 1, action: '新建印章', target: '广东南方...业务专用章', operator: '李鉴熹', time: '2025-03-24 14:30:22', ip: '192.168.1.100' },
    { id: 2, action: '修改印章', target: '广东南方...出图专用章(01)', operator: '张三', time: '2025-03-24 11:20:15', ip: '192.168.1.105' },
    { id: 3, action: '审批通过', target: '印章归还申请', operator: '王小明', time: '2025-03-23 16:45:33', ip: '192.168.1.102' },
    { id: 4, action: '发起申请', target: '印章刻制申请', operator: '张三', time: '2025-03-22 09:15:08', ip: '192.168.1.105' },
    { id: 5, action: '删除印章', target: '广东南方...旧发票章', operator: '李鉴熹', time: '2025-03-20 10:30:00', ip: '192.168.1.100' },
    { id: 6, action: '恢复印章', target: '广东南方...旧合同章', operator: '李鉴熹', time: '2025-03-19 15:20:00', ip: '192.168.1.100' },
    { id: 7, action: '预变更申请', target: '出图专用章(02)', operator: '赵六', time: '2025-03-18 09:00:00', ip: '192.168.1.108' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>操作日志</CardTitle>
        <CardDescription>系统所有操作的详细记录，不可消除</CardDescription>
      </CardHeader>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>操作类型</TableHead>
            <TableHead>操作对象</TableHead>
            <TableHead>操作人</TableHead>
            <TableHead>操作时间</TableHead>
            <TableHead>IP地址</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log, index) => (
            <motion.tr
              key={log.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <TableCell>
                <Badge variant={
                  log.action.includes('新建') ? 'default' :
                    log.action.includes('修改') || log.action.includes('预变更') ? 'secondary' :
                      log.action.includes('删除') ? 'destructive' :
                        log.action.includes('恢复') ? 'outline' :
                          'default'
                }>
                  {log.action}
                </Badge>
              </TableCell>
              <TableCell>{log.target}</TableCell>
              <TableCell>{log.operator}</TableCell>
              <TableCell className="text-gray-500">{log.time}</TableCell>
              <TableCell className="text-gray-400 font-mono text-sm">{log.ip}</TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

// 统计分析组件
function Statistics({ seals, usageRecords, approvals }: { seals: Seal[]; usageRecords: UsageRecord[]; approvals: Approval[] }) {
  const activeSeals = seals.filter(s => !s.isDeleted);

  // 按类型统计
  const typeData = sealTypes.map(type => ({
    name: type,
    value: activeSeals.filter(s => s.sealType === type).length
  })).filter(d => d.value > 0);

  // 按单位统计
  const unitData = custodyUnits.map(unit => ({
    name: unit.length > 6 ? unit.substring(0, 6) + '...' : unit,
    fullName: unit,
    count: activeSeals.filter(s => s.custodyUnit === unit).length
  })).filter(d => d.count > 0);

  // 按状态统计
  const statusData = statuses.map(status => ({
    name: status,
    value: activeSeals.filter(s => s.status === status).length
  })).filter(d => d.value > 0);

  // 月度变更趋势
  const trendData = [
    { month: '1月', 刻制: 2, 更换: 1, 销毁: 0 },
    { month: '2月', 刻制: 3, 更换: 2, 销毁: 1 },
    { month: '3月', 刻制: 4, 更换: 1, 销毁: 2 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 按类型分布 */}
        <Card>
          <CardHeader>
            <CardTitle>按印章类型分布</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  dataKey="value"
                >
                  {typeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 按状态分布 */}
        <Card>
          <CardHeader>
            <CardTitle>按印章状态分布</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 按保管单位统计 */}
        <Card>
          <CardHeader>
            <CardTitle>按保管单位统计</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={unitData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value, name, props) => [value, props.payload.fullName]} />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 月度变更趋势 */}
        <Card>
          <CardHeader>
            <CardTitle>月度变更趋势</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="刻制" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="更换" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="销毁" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* 汇总数据 */}
      <Card>
        <CardHeader>
          <CardTitle>数据汇总</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">{activeSeals.length}</div>
              <div className="text-sm text-gray-500">印章总数</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">{activeSeals.filter(s => s.recordType === '备案章').length}</div>
              <div className="text-sm text-gray-500">备案章</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-3xl font-bold text-orange-600">{approvals.filter(a => a.status !== '已完成' && a.status !== '已驳回').length}</div>
              <div className="text-sm text-gray-500">待处理审批</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">{usageRecords.reduce((sum, r) => sum + (r.copies || 0), 0)}</div>
              <div className="text-sm text-gray-500">本月用章次数</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// 印章详情组件
function SealDetail({ seal }: { seal: Seal }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 pb-4 border-b">
        <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center">
          <Stamp className="w-8 h-8 text-red-600" />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-800">{seal.name}</h4>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline">{seal.recordType}</Badge>
            <Badge>{seal.sealType}</Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { label: '所属单位', value: seal.belongUnit },
          { label: '保管单位', value: seal.custodyUnit },
          { label: '保管部门', value: seal.custodyDept },
          { label: '保管地点', value: seal.location },
          { label: '印章保管员', value: seal.keeper },
          { label: '印章状态', value: seal.status },
          { label: '最后修改', value: seal.lastModified },
          { label: '备注', value: seal.remark || '-' },
        ].map(item => (
          <div key={item.label}>
            <Label className="text-xs text-gray-500">{item.label}</Label>
            <p className="text-sm text-gray-800 mt-1">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t">
        <Label className="text-xs text-gray-500">印鉴样式</Label>
        <div className="mt-2 w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-200">
          {seal.image ? (
            <img src={seal.image} alt="印鉴" className="w-full h-full object-contain" />
          ) : (
            <span className="text-sm text-gray-400">暂无印鉴</span>
          )}
        </div>
      </div>
    </div>
  );
}

// 印章表单组件
function SealForm({
  seal,
  onChange,
  onSubmit,
  isNew,
  isPreChange = false
}: {
  seal: Partial<Seal>;
  onChange: (seal: Partial<Seal>) => void;
  onSubmit: () => void;
  isNew: boolean;
  isPreChange?: boolean;
}) {
  return (
    <div className="space-y-4">
      {isPreChange && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>预变更模式</AlertTitle>
          <AlertDescription>
            您的修改将提交审批，审批通过后方可生效。请仔细填写变更内容。
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label>印章名称 <span className="text-red-500">*</span></Label>
        <Input
          value={seal.name || ''}
          onChange={(e) => onChange({ ...seal, name: e.target.value })}
          placeholder="请输入印章全名（刻在章面的全部文字）"
          disabled={isPreChange}
        />
        <p className="text-xs text-gray-400">提示：请检查印章名称是否有错别字、少字多字或括号全角半角混用</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>备案类型</Label>
          <Select value={seal.recordType} onValueChange={(v) => onChange({ ...seal, recordType: v })} disabled={isPreChange}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {recordTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>印章类型</Label>
          <Select value={seal.sealType} onValueChange={(v) => onChange({ ...seal, sealType: v })} disabled={isPreChange}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {sealTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>所属单位</Label>
          <Select value={seal.belongUnit} onValueChange={(v) => onChange({ ...seal, belongUnit: v })} disabled={isPreChange}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {belongUnits.map(u => <SelectItem key={u} value={u}>{u}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>保管单位</Label>
          <Select value={seal.custodyUnit || ''} onValueChange={(v) => onChange({ ...seal, custodyUnit: v })}>
            <SelectTrigger><SelectValue placeholder="请选择" /></SelectTrigger>
            <SelectContent>
              {custodyUnits.map(u => <SelectItem key={u} value={u}>{u}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>保管部门</Label>
          <Select value={seal.custodyDept || ''} onValueChange={(v) => onChange({ ...seal, custodyDept: v })}>
            <SelectTrigger><SelectValue placeholder="请选择" /></SelectTrigger>
            <SelectContent>
              {custodyDepts.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>保管地点</Label>
          <Select value={seal.location || ''} onValueChange={(v) => onChange({ ...seal, location: v })}>
            <SelectTrigger><SelectValue placeholder="请选择" /></SelectTrigger>
            <SelectContent>
              {locations.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>印章保管员</Label>
          <Select value={seal.keeper || ''} onValueChange={(v) => onChange({ ...seal, keeper: v })}>
            <SelectTrigger><SelectValue placeholder="请选择" /></SelectTrigger>
            <SelectContent>
              {keepers.map(k => <SelectItem key={k} value={k}>{k}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>印章状态</Label>
          <Select value={seal.status || '在用'} onValueChange={(v) => onChange({ ...seal, status: v })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {statuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>备注</Label>
        <Textarea
          value={seal.remark || ''}
          onChange={(e) => onChange({ ...seal, remark: e.target.value })}
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label>印鉴样式</Label>
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-blue-300 transition-colors cursor-pointer">
          <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
          <p className="text-sm text-gray-500">点击或拖拽上传印鉴图片</p>
          <p className="text-xs text-gray-400 mt-1">要求：清晰饱满，线条无缺</p>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button variant="outline">取消</Button>
        <Button onClick={onSubmit}>
          {isNew ? '创建印章' : isPreChange ? '提交预变更' : '保存修改'}
        </Button>
      </div>
    </div>
  );
}

// 移动表单组件
function MoveForm({ seal, onSubmit }: { seal: Seal; onSubmit: () => void }) {
  const [moveType, setMoveType] = useState('transfer');
  const [targetUnit, setTargetUnit] = useState('');

  return (
    <div className="space-y-4">
      <div className="p-4 bg-gray-50 rounded-lg">
        <Label className="text-xs text-gray-500">当前印章</Label>
        <p className="font-medium text-gray-800">{seal.name}</p>
        <p className="text-sm text-gray-500 mt-1">当前保管：{seal.custodyUnit} / {seal.custodyDept}</p>
      </div>

      <div className="space-y-2">
        <Label>移动类型</Label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="moveType" value="transfer" checked={moveType === 'transfer'} onChange={() => setMoveType('transfer')} className="text-blue-600" />
            <span className="text-sm text-gray-700">平级调拨</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="moveType" value="allocate" checked={moveType === 'allocate'} onChange={() => setMoveType('allocate')} className="text-blue-600" />
            <span className="text-sm text-gray-700">上级调配</span>
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <Label>目标单位</Label>
        <Select value={targetUnit} onValueChange={setTargetUnit}>
          <SelectTrigger><SelectValue placeholder="请选择目标单位" /></SelectTrigger>
          <SelectContent>
            {custodyUnits.filter(u => u !== seal.custodyUnit).map(u => (
              <SelectItem key={u} value={u}>{u}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>审批流程说明</AlertTitle>
        <AlertDescription>
          {moveType === 'transfer'
            ? '平级调拨需经公司印章管理员、目标单位印章管理员审批通过后生效'
            : '上级调配将直接生效，移动双方均会收到消息提示'}
        </AlertDescription>
      </Alert>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button variant="outline">取消</Button>
        <Button onClick={onSubmit}>提交申请</Button>
      </div>
    </div>
  );
}

// 申请表单组件
function ApplyForm({
  data,
  onChange,
  onSubmit
}: {
  data: Partial<Approval>;
  onChange: (data: Partial<Approval>) => void;
  onSubmit: () => void;
}) {
  const steps = approvalFlows[data.type || '刻制'] || approvalFlows['刻制'];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>变更类型</Label>
        <Select value={data.type || '刻制'} onValueChange={(v) => onChange({ ...data, type: v })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {changeTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>印章名称</Label>
        <Input
          value={data.sealName || ''}
          onChange={(e) => onChange({ ...data, sealName: e.target.value })}
          placeholder="请输入印章名称"
        />
      </div>

      <div className="space-y-2">
        <Label>申请理由</Label>
        <Textarea
          value={data.reason || ''}
          onChange={(e) => onChange({ ...data, reason: e.target.value })}
          rows={3}
          placeholder="请说明变更原因"
        />
      </div>

      <div className="p-4 bg-blue-50 rounded-lg">
        <Label className="text-sm font-medium text-blue-700 mb-2 block">审批流程预览</Label>
        <div className="flex items-center gap-2 text-sm text-blue-600 flex-wrap">
          {steps.map((step, i) => (
            <React.Fragment key={i}>
              <Badge variant="secondary" className="bg-blue-100">{step}</Badge>
              {i < steps.length - 1 && <ChevronRight className="w-4 h-4" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button variant="outline">取消</Button>
        <Button onClick={onSubmit}>提交申请</Button>
      </div>
    </div>
  );
}

// 元数据导出
export const meta = {
  title: "线上印章管理系统",
  description: "完整的印章信息管理、变更审批、用章记录系统，支持三级权限体系和预变更机制",
  isHidden: false,
  category: "印章管理",
  order: 1
};
