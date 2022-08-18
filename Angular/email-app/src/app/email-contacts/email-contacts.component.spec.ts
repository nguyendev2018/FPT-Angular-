import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailContactsComponent } from './email-contacts.component';

describe('EmailContactsComponent', () => {
  let component: EmailContactsComponent;
  let fixture: ComponentFixture<EmailContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailContactsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
