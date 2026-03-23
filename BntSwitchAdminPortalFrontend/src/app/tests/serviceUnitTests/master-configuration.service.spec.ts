import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MasterConfigurationService } from '@app/services/master-configuration.service';
import { basePath, masterConfigurationUrls } from '@app/config/i18n/services/request.url.config';
import { Component } from '@angular/core';
import { url } from 'inspector';
import { id } from '@swimlane/ngx-datatable';

xdescribe('MasterConfigurationService', () => {
    let masterConfigurationService;
    let httpTestingController: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [MasterConfigurationService],
        }),
            (masterConfigurationService = TestBed.get(MasterConfigurationService));
        httpTestingController = TestBed.get(HttpTestingController);
    });
    it('should be created', () => {
        const service: MasterConfigurationService = TestBed.get(MasterConfigurationService);
        expect(service).toBeTruthy();
    });
    it('should retrieve getAllMasterConfiguration', () => {
        masterConfigurationService.getAllMasterConfiguration(url => {
          expect(url).toBeTruthy();
          const req = httpTestingController.expectOne(`${basePath.domain}${masterConfigurationUrls.getMasterAll}`);
          expect(req.request.method).toEqual('GET');
          req.flush({});
        });
      });
    //   it('should retrieve updateMasterConfiguration', () => {
    //     masterConfigurationService.updateMasterConfiguration(body => {
    //       expect(body).toBeTruthy();
    //       const req = httpTestingController.expectOne(`${basePath.domain}${masterConfigurationUrls.updateMasterConfig} + '/updateMasterConfig' +${body.id}`);
    //       expect(req.request.method).toEqual('GET');
    //       req.flush({});
    //     });
    //   });
});