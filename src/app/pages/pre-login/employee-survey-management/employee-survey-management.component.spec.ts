import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSurveyManagementComponent } from './employee-survey-management.component';

describe('EmployeeSurveyManagementComponent', () => {
  let component: EmployeeSurveyManagementComponent;
  let fixture: ComponentFixture<EmployeeSurveyManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeSurveyManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeSurveyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
