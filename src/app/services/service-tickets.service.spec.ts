import { TestBed } from '@angular/core/testing';

import { ServiceTicketsService } from './service-tickets.service';

describe('ServiceTicketsService', () => {
  let service: ServiceTicketsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceTicketsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
