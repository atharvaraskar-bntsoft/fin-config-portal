export interface ITagsList {
  name: string;
  service_type: string;
  service: string;
  condition: ICondition;
  active: number;
  deleted: number;
  tag: string;
}

export interface ICondition {
  type: string;
  connditions: IConditions[];
}

export interface IConditions {
  type: string;
  fieldName: string;
  value: string;
}
