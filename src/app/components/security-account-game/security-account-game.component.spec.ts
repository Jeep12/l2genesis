import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityAccountGameComponent } from './security-account-game.component';

describe('SecurityAccountGameComponent', () => {
  let component: SecurityAccountGameComponent;
  let fixture: ComponentFixture<SecurityAccountGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityAccountGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityAccountGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
