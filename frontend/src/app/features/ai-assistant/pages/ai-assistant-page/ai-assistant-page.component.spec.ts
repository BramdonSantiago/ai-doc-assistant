import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiAssistantPageComponent } from './ai-assistant-page.component';

describe('AiAssistantPageComponent', () => {
  let component: AiAssistantPageComponent;
  let fixture: ComponentFixture<AiAssistantPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiAssistantPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiAssistantPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
