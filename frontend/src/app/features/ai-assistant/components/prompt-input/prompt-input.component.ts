import { Component, model, input, output, ElementRef, viewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-prompt-input',
  imports: [FormsModule],
  templateUrl: './prompt-input.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './prompt-input.component.scss'
})
export class PromptInputComponent {
  isTyping = input(false);
  readonly prompt = viewChild<ElementRef<HTMLTextAreaElement>>('prompt');

  readonly text = model('');

  readonly sendMessage = output<string>();

  readonly placeholder = input.required<string>();

  onEnter(event: Event): void {

    const { shiftKey } = event as KeyboardEvent;

    if (shiftKey) {
      return;
    }

    event.preventDefault();

    this.send();

  }

  send(): void {

    const message = this.text().trim();

    if (!message) {
      return;
    }
    
    this.sendMessage.emit(message);
    
    this.text.set('');
  }

  focus(): void {
    this.prompt()?.nativeElement.focus();

  }

}