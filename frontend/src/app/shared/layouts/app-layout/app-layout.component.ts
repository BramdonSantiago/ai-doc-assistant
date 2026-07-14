import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../../features/ai-assistant/components/sidebar/sidebar.component';
import { ContextPanelComponent } from '../../../features/ai-assistant/components/context-panel/context-panel.component';
import { MainHeaderComponent } from '../../main-header/main-header.component';

@Component({
  selector: 'app-app-layout',
  imports: [SidebarComponent, MainHeaderComponent, RouterOutlet],
  templateUrl: './app-layout.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app-layout.component.scss'
})
export class AppLayoutComponent {

}
