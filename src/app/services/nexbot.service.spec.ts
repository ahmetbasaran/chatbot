import { TestBed } from '@angular/core/testing';

import { NexbotService } from './nexbot.service';

describe('NexbotService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NexbotService = TestBed.get(NexbotService);
    expect(service).toBeTruthy();
  });
});
