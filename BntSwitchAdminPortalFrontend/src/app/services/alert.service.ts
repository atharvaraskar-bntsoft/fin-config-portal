import { Injectable } from '@angular/core';
import { SnotifyService, SnotifyPosition, SnotifyToastConfig } from 'ng-snotify';
import { BehaviorSubject } from 'rxjs';

export interface IIsBtnDisabled {
  url?: string;
  isEnable: boolean;
}

@Injectable()
export class AlertService {
  style = 'material';
  timeout = 2000;
  position: SnotifyPosition = SnotifyPosition.rightTop;
  progressBar = true;
  closeClick = true;
  newTop = true;
  filterDuplicates = false;
  backdrop = -1;
  dockMax = 1;
  blockMax = 1;
  pauseHover = true;
  titleMaxLength = 15;
  bodyMaxLength = 80;
  subject = new BehaviorSubject<boolean>(true);
  isSaveBtnEnabled: BehaviorSubject<IIsBtnDisabled> = new BehaviorSubject<IIsBtnDisabled>({
    isEnable: true,
  });

  getConfig(): SnotifyToastConfig {
    this.snotifyService.setDefaults({
      global: {
        maxAtPosition: this.blockMax,
        maxOnScreen: this.dockMax,
        newOnTop: this.newTop,
      },
    });
    return {
      backdrop: this.backdrop,
      bodyMaxLength: this.bodyMaxLength,
      closeOnClick: this.closeClick,
      pauseOnHover: this.pauseHover,
      position: this.position,
      showProgressBar: this.progressBar,
      timeout: this.timeout,
      titleMaxLength: this.titleMaxLength,
    };
  }

  constructor(private snotifyService: SnotifyService) { }

  responseMessage(response) {
    switch (response.status) {
      case 'failure':
        this.snotifyService.error(response.message, this.getConfig());
        break;
      case 'success':
        this.snotifyService.success(response.message, this.getConfig());
        break;
      case 'simple':
        this.snotifyService.simple(response.message, this.getConfig());
        break;
      default:
        this.snotifyService.info(response.message, this.getConfig());
    }
  }

  onWarning(message: string) {
    this.snotifyService.warning(message, this.getConfig());
  }

  onSuccess(message: string) {
    this.snotifyService.success(message, this.getConfig());
  }

  getLoader() {
    return this.subject.asObservable();
  }

  setLoader(value) {
    this.subject.next(value);
  }

  getIsBtnDisable() {
    return this.isSaveBtnEnabled.asObservable();
  }

  setIsBtnDisable(value: IIsBtnDisabled) {
    this.isSaveBtnEnabled.next(value);
  }
}
