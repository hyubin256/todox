
interface Task {
  _id: string;
  title: string;
  status: string;
  createdAt: Date;
  completedAt: Date;
  updatedAt: Date;
}

export type { Task };
