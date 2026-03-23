import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WorkflowEventService {
  private subject = new Subject<any>();
  private subjectGroup = new Subject<any>();
  private usedList = new Subject<any>();
  private usedGroupList = new Subject<any>();

  clearMessage() {
    this.subject.next();
  }

  getItems(): Observable<any> {
    return this.subject.asObservable();
  }

  getUsedItems(): Observable<any> {
    return this.usedList.asObservable();
  }

  sendItems(items: any) {
    this.subject.next(items);
  }

  sendUsedItems(items: any) {
    this.usedList.next(items);
  }

  getGroupItems(): Observable<any> {
    return this.subjectGroup.asObservable();
  }

  getGroupUsedItems(): Observable<any> {
    return this.usedGroupList.asObservable();
  }

  sendGroupItems(items: any) {
    this.subjectGroup.next(items);
  }

  sendGroupUsedItems(items: any) {
    this.usedGroupList.next(items);
  }
}
