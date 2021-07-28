import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    const tasks = this.getAllTasks();

    if (status) {
      return tasks.filter((task) => task.status === status);
    }

    if (search) {
      return tasks.filter(
        (task) => task.description === search || task.title === search,
      );
    }
  }

  getTaskById(id: string): Task {
    const foundTask = this.tasks.find((task) => task.id == id);

    if (!foundTask) {
      throw new NotFoundException(`Task with ID ${id} not found!`);
    }
    return foundTask;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  deleteTask(id: string): string {
    // Adicionando a validação aqui também
    this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id != id);
    return 'Task Deleted';
  }
}
