import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentBubbleComponent } from './comment-bubble.component';

describe('CommentBubbleComponent', () => {
  let component: CommentBubbleComponent;
  let fixture: ComponentFixture<CommentBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentBubbleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
