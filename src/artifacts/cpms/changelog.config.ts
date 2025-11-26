// CC-Extension 更新日志类型定义
// 数据源: /public/cpms_changelog.json

export interface ChangeItem {
  title: string;
  description: string;
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
  versionRules: {
    major: string;
    minor: string;
    patch: string;
  };
  currentVersion: string;
  lastUpdated: string;
  versions: VersionInfo[];
  milestones: Milestone[];
  statistics: Statistics;
}

// JSON 文件路径
export const CHANGELOG_JSON_PATH = '/cpms_changelog.json';
