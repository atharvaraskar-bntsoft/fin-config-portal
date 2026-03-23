export interface SettingDto {
  id: number;
  systemUserId: string;
  search: string;
  language: string;
  pagination: string;
}

export interface Data {
  pagination: string[];
  language: string[];
  settingDto: SettingDto;
  searchOption: string[];
}

export interface ViewSettingGetObject {
  status: string;
  message: string;
  data: Data;
}

export interface UpdateViewSettingObject {
  status: string;
  message: string;
  data?: any;
}
