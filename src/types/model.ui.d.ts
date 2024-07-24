export interface LocaleResource {
  [string]: any;
}

interface MenuItemConfig {
  title: string;
  key: string;
  path?: string;
  iconName?: string;
  submenu?: MenuItemConfig[];
}

export interface AppMenuConfig {
  title: string;
  children: MenuItemConfig[];
}

export interface HomeMenuItemConfig {
  title: string;
  description: string;
  path: string;
}

interface AsrConfig {
  name: string;
  url: string;
}

interface SymptomCheckerConfig {
  url: string;
}

export interface DashboardMenuConfigResult {
  menu: AppMenuConfig[];
  home: HomeMenuItemConfig[];
  asr: AsrConfig[];
  symptomChecker: SymptomCheckerConfigResult;
}

interface NormalRange {
  value: string;
  description: string;
}

interface InputDataConfig {
  key: string;
  value: string;
  unit: string;
  required: boolean;
  fieldType: string;
  maxLength?: string;
  minValue: string;
  maxValue: string;
  dropdownValue?: string[];
  range: NormalRange[];
  placeholder?: string;
}

export interface InputGroupConfigResult {
  groupName: string;
  data: InputDataConfig[];
}

export interface LabGroupConfig {
  group: string;
  value: string[];
}
