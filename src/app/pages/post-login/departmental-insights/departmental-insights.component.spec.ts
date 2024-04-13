import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentalInsightsComponent } from './departmental-insights.component';

describe('DepartmentalInsightsComponent', () => {
  let component: DepartmentalInsightsComponent;
  let fixture: ComponentFixture<DepartmentalInsightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentalInsightsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentalInsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
