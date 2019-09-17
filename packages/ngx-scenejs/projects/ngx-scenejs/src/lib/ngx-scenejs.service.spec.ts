import { TestBed } from '@angular/core/testing';

import { NgxScenejsService } from './ngx-scenejs.service';

describe('NgxScenejsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxScenejsService = TestBed.get(NgxScenejsService);
    expect(service).toBeTruthy();
  });
});
