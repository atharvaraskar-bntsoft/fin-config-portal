import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })

// tslint:disable-next-line: class-name
export class ruleEngineService {
  public nodeList: BehaviorSubject<Object[]> = new BehaviorSubject([]);

  sendMessage(node: any) {
    this.nodeList.next(node);
  }
}
