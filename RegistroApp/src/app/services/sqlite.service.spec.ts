import { TestBed } from '@angular/core/testing';

import { SqliteService } from './sqlite.service';
import { provideHttpClient } from '@angular/common/http';

describe('SqliteService', () => {
  let service: SqliteService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers : [SqliteService,provideHttpClient()]});
    service = TestBed.inject(SqliteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
