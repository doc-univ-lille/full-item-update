import { TestBed } from '@angular/core/testing';

import { AlmaService } from './alma.service';

describe('AlmaServiceService', () => {
  let service: AlmaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlmaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
