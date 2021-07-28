import { TaskStatus } from '../task.model';

export class UpdateClassDto {
  title: string;
  description: string;
  status: TaskStatus;
}
