import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MessageService } from '@app/services/message.service';
describe('MessageService', () => {
    let messageService;
    let httpTestingController: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [MessageService],
        }),
            (messageService = TestBed.get(MessageService));
        httpTestingController = TestBed.get(HttpTestingController);
    });
    it('should be created', () => {
        const service: MessageService = TestBed.get(MessageService);
        expect(service).toBeTruthy();
    });
});