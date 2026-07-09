import { Component, input, computed } from '@angular/core';
import { ConnectionStatus } from '../../models/connection-status.model';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  connectionStatus = input<ConnectionStatus>('online');
  responseTime = input<string | null>();

  readonly connectionLabel = computed(() => {

    switch (this.connectionStatus()) {

      case 'online':
        return '🟢 AI Online';

      case 'offline':
        return '🔴 AI Offline';

    }

  });
}
