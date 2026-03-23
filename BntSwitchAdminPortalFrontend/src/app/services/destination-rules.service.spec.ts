import { TestBed } from '@angular/core/testing';

import { DestinationRulesService } from './destination-rules.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

xdescribe('DestinationRulesService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }),
  );

  it('should be created', () => {
    const service: DestinationRulesService = TestBed.get(DestinationRulesService);
    expect(service).toBeTruthy();
  });
});
