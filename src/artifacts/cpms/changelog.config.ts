// CC-Extension 更新日志类型定义
// 数据源: /public/update.json

export interface ChangeItem {
  title: string;
  description?: string;
}

export interface VersionInfo {
  version: string;
  date: string;
  endDate?: string;
  milestone?: string;
  features?: ChangeItem[];
  fixes?: ChangeItem[];
  improvements?: ChangeItem[];
  docs?: ChangeItem[];
}

export interface LatestVersion extends VersionInfo {
  downloadUrl?: string;
  releaseNotes?: string;
}

export interface Announcement {
  enabled: boolean;
  title: string;
  content: string;
  type: 'info' | 'warning' | 'error' | 'success';
  dismissible: boolean;
}

export interface Milestone {
  version: string;
  title: string;
  description: string;
}

export interface Statistics {
  totalVersions: number;
  totalFeatures: number;
  totalFixes: number;
  totalImprovements: number;
}

export interface ChangelogData {
  project: string;
  description: string;
  announcement?: Announcement;
  latest: LatestVersion;
  versions: VersionInfo[];
  milestones: Milestone[];
  statistics: Statistics;
}

// JSON 文件路径
export const CHANGELOG_JSON_PATH = '/update.json';
