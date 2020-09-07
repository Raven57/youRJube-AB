import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallVideoCardComponent } from './small-video-card.component';

describe('SmallVideoCardComponent', () => {
  let component: SmallVideoCardComponent;
  let fixture: ComponentFixture<SmallVideoCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallVideoCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallVideoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
