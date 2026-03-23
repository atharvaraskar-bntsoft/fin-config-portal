import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AddRoleService } from '@app/services/add-role.service';
import {  AddRoleUrls, basePath } from '@app/config/i18n/services/request.url.config';
describe('AddRoleService', () => {
let addRoleService;
let httpTestingController: HttpTestingController;
beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [AddRoleService],
    }),
        (addRoleService = TestBed.get(AddRoleService));
    httpTestingController = TestBed.get(HttpTestingController);
});
it('should be created', () => {
    const service: AddRoleService = TestBed.get(AddRoleService);
    expect(service).toBeTruthy();
});
it('should retrieve getAddRoleList', () => {
    addRoleService.getAddRoleList(item => {
      expect(item).toBeTruthy();
      const req = httpTestingController.expectOne(`${basePath.domain}${AddRoleUrls.getRoleList}`);
      expect(req.request.method).toEqual('GET');
      req.flush({});
    });
  });
afterEach(() => {
    httpTestingController.verify();
  });
});