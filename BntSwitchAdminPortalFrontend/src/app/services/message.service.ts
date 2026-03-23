import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MessageService {
  public data: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  public send(response): void {
    this.data.next(response);
  }
}
