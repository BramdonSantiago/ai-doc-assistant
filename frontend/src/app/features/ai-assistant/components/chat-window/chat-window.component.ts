import {
  Component,
  input,
  viewChild,
  ElementRef,
  effect,
  output
} from '@angular/core';



import { ChatMessage } from '../../models/chat-message.model';
import { MessageComponent } from '../message/message.component';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-chat-window',
  imports: [MessageComponent, MarkdownModule],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent {
  messages = input.required<ChatMessage[]>();


  isTyping = input(false);
  error = input.required<string>();
  retry = output<void>();



  readonly container = viewChild.required<ElementRef<HTMLElement>>('container');

  constructor() {

    effect(() => {

      this.messages();

      queueMicrotask(() => this.scrollBottom());

    });

  }


  // ngAfterViewChecked() {
  //   this.scrollBottom();
  // }



  private scrollBottom(): void {

    const container = this.container().nativeElement;

    container.scrollTop = container.scrollHeight;

  }


}
