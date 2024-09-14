import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirebaseCheckComponentComponent } from './firebase-check-component.component';

describe('FirebaseCheckComponentComponent', () => {
  let component: FirebaseCheckComponentComponent;
  let fixture: ComponentFixture<FirebaseCheckComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirebaseCheckComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirebaseCheckComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
