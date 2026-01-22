
export interface PackshotStyle {
  id: string;
  name: string;
  description: string;
  prompt: string;
  thumbnail: string;
}

export interface GenerationResult {
  originalUrl: string;
  generatedUrl: string;
  style: PackshotStyle;
}

export enum AppStatus {
  IDLE = 'IDLE',
  UPLOADING = 'UPLOADING',
  GENERATING = 'GENERATING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
