export interface IImfJsonState {
  getVersions: any;
  postJson: any;
  putJson: any;
  latestJson: any;
  getImf: any;
  getImfById: any;
  getTemplateJson: any;
  getTemplateDetailsJson: any;
  normalViewJson: any;
  typeList: any;
  response: any;
}

export const initialImfJsonState: IImfJsonState = {
  getImf: null,
  getImfById: null,
  getTemplateDetailsJson: null,
  getTemplateJson: null,
  getVersions: null,
  latestJson: null,
  normalViewJson: null,
  postJson: null,
  putJson: null,
  typeList: null,
  response: null,
};
