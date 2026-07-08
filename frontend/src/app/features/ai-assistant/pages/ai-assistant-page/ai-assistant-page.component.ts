import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ChatWindowComponent } from '../../components/chat-window/chat-window.component';
import { PromptInputComponent } from '../../components/prompt-input/prompt-input.component';
import { ContextPanelComponent } from '../../components/context-panel/context-panel.component';

@Component({
  selector: 'app-ai-assistant-page',
  imports: [SidebarComponent, HeaderComponent, ChatWindowComponent, PromptInputComponent, ContextPanelComponent],
  templateUrl: './ai-assistant-page.component.html',
  styleUrl: './ai-assistant-page.component.scss'
})
export class AiAssistantPageComponent {

}
