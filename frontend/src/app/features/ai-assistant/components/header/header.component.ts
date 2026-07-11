import { Component, input, output, computed } from '@angular/core';
import { ConnectionStatus } from '../../models/connection-status.model';
import { TaskType } from '../../models/task-type.model';
import { TaskSelectorComponent } from '../task-selector/task-selector.component';
import { AssistantOption } from '../../models/assistant-option.model';

@Component({
  selector: 'app-header',
  imports: [TaskSelectorComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  connectionStatus = input<ConnectionStatus>('online');
  responseTime = input<string | null>();

  readonly selectedTask = input.required<TaskType>();

  readonly taskSelected = output<TaskType>();

  readonly assistant = input.required<AssistantOption>();

  readonly connectionLabel = computed(() => {

    switch (this.connectionStatus()) {

      case 'online':
        return '🟢 AI Online';

      case 'offline':
        return '🔴 AI Offline';

    }

  });
}
