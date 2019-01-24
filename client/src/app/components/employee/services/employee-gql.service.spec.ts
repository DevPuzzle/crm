import { TestBed } from '@angular/core/testing';

import { EmployeeGQLService } from './employee-gql.service';

describe('EmployeeGQLService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeGQLService = TestBed.get(EmployeeGQLService);
    expect(service).toBeTruthy();
  });
});
