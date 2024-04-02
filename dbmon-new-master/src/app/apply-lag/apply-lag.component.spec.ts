import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyLagComponent } from './apply-lag.component';

describe('ApplyLagComponent', () => {
  let component: ApplyLagComponent;
  let fixture: ComponentFixture<ApplyLagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyLagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyLagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
