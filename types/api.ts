export interface Application {
  id: number;
  name: string;
  status: ApplicationStatus;
  createdAt: string;
  isPublished: boolean;
}

export type ApplicationStatus = "draft";
