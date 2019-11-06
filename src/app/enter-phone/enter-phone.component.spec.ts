import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterPhoneComponent } from './enter-phone.component';

describe('EnterPhoneComponent', () => {
  let component: EnterPhoneComponent;
  let fixture: ComponentFixture<EnterPhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterPhoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
