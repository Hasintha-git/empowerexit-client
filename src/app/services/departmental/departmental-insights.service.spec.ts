import { TestBed } from '@angular/core/testing';

import { DepartmentalInsightsService } from './departmental-insights.service';

describe('DepartmentalInsightsService', () => {
  let service: DepartmentalInsightsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmentalInsightsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
