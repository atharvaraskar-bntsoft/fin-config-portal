import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthUtility implements OnDestroy {
  public token: BehaviorSubject<string> = new BehaviorSubject(null);
  public passwordToken: BehaviorSubject<string> = new BehaviorSubject(null);
  public userRoles: BehaviorSubject<Object[]> = new BehaviorSubject(null);
  public currentData: BehaviorSubject<Object> = new BehaviorSubject(null);

  public subsucribeToken(callback) {
    this.token.subscribe(callback);
  }
  public passNextToken(value: string) {
    this.token.next(value);
  }
  public subscriblePasswordToken(callback) {
    this.passwordToken.subscribe(callback);
  }
  public passNextPasswordToken(value: string) {
    this.passwordToken.next(value);
  }
  ngOnDestroy() {
    this.token.unsubscribe();
    this.passwordToken.unsubscribe();
  }
}
