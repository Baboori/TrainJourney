import { TestBed } from '@angular/core/testing';

import { JouneyService } from './jouney.service';

describe('JouneyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JouneyService = TestBed.get(JouneyService);
    expect(service).toBeTruthy();
  });
});
