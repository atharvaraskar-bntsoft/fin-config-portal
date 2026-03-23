export enum IImportStatus {
  Ready = 'Ready',
  Requested = 'Requested',
  Started = 'Started',
  Failed = 'Failed',
  Completed = 'Completed',
  Success = 'Success',
}

export interface ImportFileState {
  status: IImportStatus;
  error: string | null;
  progress: number | null;
  data: { data: null };
}

export const initialImportFileState: ImportFileState = {
  data: null,
  error: null,
  progress: null,
  status: IImportStatus.Ready,
};
