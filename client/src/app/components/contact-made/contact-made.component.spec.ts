import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactMadeComponent } from './contact-made.component';

describe('ContactMadeComponent', () => {
  let component: ContactMadeComponent;
  let fixture: ComponentFixture<ContactMadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactMadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactMadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
