import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterInfoComponent } from './letter-info.component';

describe('LetterInfoComponent', () => {
  let component: LetterInfoComponent;
  let fixture: ComponentFixture<LetterInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LetterInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
