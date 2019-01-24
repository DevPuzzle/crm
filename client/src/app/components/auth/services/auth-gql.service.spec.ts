import { TestBed } from '@angular/core/testing';

import { AuthGQLService } from './auth-gql.service';

describe('AuthGQLService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthGQLService = TestBed.get(AuthGQLService);
    expect(service).toBeTruthy();
  });
});
