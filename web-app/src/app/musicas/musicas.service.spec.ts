import { TestBed } from '@angular/core/testing';

import { MusicaService } from './musicas.service';

describe('MusicasService', () => {
  let service: MusicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
