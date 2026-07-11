import { Component, input, output, computed } from '@angular/core';
import { TaskType } from '../../models/task-type.model';
import { ASSISTANT_OPTIONS } from './../constants/assistant-options.constant';

@Component({
  selector: 'app-task-selector',
  templateUrl: './task-selector.component.html',
  styleUrl: './task-selector.component.scss'
})
export class TaskSelectorComponent {

  readonly assistants = ASSISTANT_OPTIONS;

  readonly selectedTask = input.required<TaskType>();

  readonly taskSelected = output<TaskType>();


  onChange(event: Event): void {

    const value =
      (event.target as HTMLSelectElement).value as TaskType;

    this.taskSelected.emit(value);

  }


}