export interface Application {
  id: number;
  name: string;
  status: ApplicationStatus;
  createdAt: string;
  isPublished: boolean;
  productsID: number[];
}

export type ApplicationStatus = "draft";
