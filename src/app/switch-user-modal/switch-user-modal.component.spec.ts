import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchUserModalComponent } from './switch-user-modal.component';

describe('SwitchUserModalComponent', () => {
  let component: SwitchUserModalComponent;
  let fixture: ComponentFixture<SwitchUserModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchUserModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
