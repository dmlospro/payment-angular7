import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterSmsComponent } from './enter-sms.component';

describe('EnterSmsComponent', () => {
  let component: EnterSmsComponent;
  let fixture: ComponentFixture<EnterSmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterSmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
