import { BehaviorSubject } from 'rxjs';
const subject = new BehaviorSubject<any>('');

export const ruleEngineService = {
  getNode: () => subject.asObservable(),
  sendNode: message => subject.next({ text: message }),
};
