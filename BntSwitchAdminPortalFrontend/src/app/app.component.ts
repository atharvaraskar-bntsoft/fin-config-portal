import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'bnt';
import { Store, select } from '@ngrx/store';
import { IAppState } from './store/state/app.state';
import { GetPermission } from './store/actions/permissions.action';
import { selectPermissionsData } from './store/selectors/permission.selectors';
import { selectApprovalCount } from '@app/store/selectors/approvals.selector';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { TranslateService } from '@ngx-translate/core';
import { selectStatusList } from '@app/store/selectors/status.selector';
import { CookieService } from 'ngx-cookie-service';
import { UserIdleService } from 'angular-user-idle';
import { ViewSettingGetObject } from './models/view-settings.interface';
import { Subject } from 'rxjs';
import { KeycloakProfile } from 'keycloak-js';
import { KeycloakEventType, KeycloakService } from 'keycloak-angular';
import { environment } from '../environments/environment';
import { GetDashboard } from './store/actions/dashboard.actions';
import { GetApprovalCount } from './store/actions/approvals.actions';
import { GetViewSettings } from './store/actions/view-settings.actions';
import { GetStatus } from './store/actions/status.action';
import { GetNotifications } from './store/actions/notifications.actions';
import { GetProfile } from './store/actions/profile.action';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProfileService } from './services/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public customLayout: boolean;
  userDetails: KeycloakProfile;
  public permissions: any;
  public currentLang;
  public currentLangflag = false;
  public count: number;
  currentYear = new Date();
  public errormessage: string;
  public interval: Number = 1440;
  public version: any;
  public versionDetail: any;
  public currentItem: any;
  public adaptorMenu: any;
  public token: any = '';
  public roles: any;
  componetDestroyed = new Subject();
  constructor(
    private _profileService: ProfileService,
    private spinner: NgxSpinnerService,
    private userIdle: UserIdleService,
    private _cookieService: CookieService,
    private translate: TranslateService,
    private layoutService: LayoutService,
    private _store: Store<IAppState>,
    private keycloakService: KeycloakService,
  ) {
    this.spinner.show();
    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response && response.data) {
        this.currentLang = response.data.settingDto.language;
        this.currentLang = this._cookieService.get('language') || 'en_EN';
        translate.setDefaultLang(this.currentLang);
        this.currentLangflag = true;
        // const sessionExpiryTime = this._cookieService.get('sessionExpiryTime') || '1';
        // const sessionTime = parseInt(sessionExpiryTime) * 60;
        // if (environment.production && environment.keycloak) {
        //   this.setTimeOut(sessionTime);
        // }
      }
    });

    this._store.pipe(select(selectStatusList)).subscribe((response: any) => {
      const dataJson = response;
      if (dataJson) {
        if (dataJson['status'] === 'failure') {
          this.errormessage = dataJson['message'];
        } else {
          this.currentItem = dataJson['data'];
          this.version = this.currentItem['versionDetail'];
          this.versionDetail = this.version ? this.version : null;
        }
      }
    });
  }

  async ngOnInit() {
    this.layoutService.isCustomLayout.subscribe((value: boolean) => {
      this.customLayout = value;
    });
    this._store.pipe(select(selectApprovalCount)).subscribe(count => {
      if (count) {
        this.count = count.totalRecords;
      }
    });
    if (await this.keycloakService.isLoggedIn()) {
      this.token = await this.keycloakService.getToken();
      const date = new Date();
      const minutes = 60 * 24;
      date.setTime(date.getTime() + minutes * 60 * 1000);
      const ssl = window.location.protocol === 'http:' ? false : true;
      this._cookieService.set(
        'token',
        this.token,
        date,
        environment.path,
        window.location.hostname,
        ssl,
        'Strict',
      );
      this.userDetails = await this.keycloakService.loadUserProfile();
      localStorage.setItem('userloginid', this.userDetails.id);
      this.roles = this.keycloakService.getUserRoles();

      const obj = {
        token: this.token,
        email: this.userDetails.email,
        refreshToken: this.keycloakService.getKeycloakInstance().refreshToken,
        firstName: this.userDetails.firstName,
        lastName: this.userDetails.lastName,
        username: this.userDetails.username,
        roles: this.roles,
        logIn: this.keycloakService.getKeycloakInstance().tokenParsed.auth_time.toString(),
        expiresIn: this.keycloakService.getKeycloakInstance().tokenParsed.exp.toString(),
        refreshExpiresIn: this.keycloakService
          .getKeycloakInstance()
          .refreshTokenParsed.exp.toString(),
      };
      this.setCookies(obj);
    } else {
      // const obj = {
      //   token: keycloak.token,
      //   email: keycloak.email,
      //   refreshToken: keycloak.refreshToken,
      //   firstName: keycloak.firstName,
      //   lastName: keycloak.lastName,
      //   username: keycloak.username,
      //   roles: keycloak.roles,
      //   logIn: keycloak.logIn,
      //   expiresIn: keycloak.expiresIn,
      //   refreshExpiresIn: keycloak.refreshExpiresIn,
      // };
      // this.setCookies(obj);
      console.log("Cookies set");
    }
  }

  setCookies(obj) {
    const date = new Date();
    const minutes = 60 * 24;
    date.setTime(date.getTime() + minutes * 60 * 1000);
    const ssl = window.location.protocol === 'http:' ? false : true;
    this._cookieService.set(
      'token',
      obj.token,
      date,
      environment.path,
      window.location.hostname,
      ssl,
      'Strict',
    );
    this._cookieService.set(
      'kcemail',
      obj.email,
      date,
      environment.path,
      window.location.hostname,
      ssl,
      'Strict',
    );
    this._cookieService.set(
      'refreshToken',
      obj.refreshToken,
      date,
      environment.path,
      window.location.hostname,
      ssl,
      'Strict',
    );
    this._cookieService.set(
      'kcfirstname',
      obj.firstName,
      date,
      environment.path,
      window.location.hostname,
      ssl,
      'Strict',
    );
    this._cookieService.set(
      'kclastname',
      obj.lastName,
      date,
      environment.path,
      window.location.hostname,
      ssl,
      'Strict',
    );
    this._cookieService.set(
      'kcpreferredusername',
      obj.username,
      date,
      environment.path,
      window.location.hostname,
      ssl,
      'Strict',
    );
    this._cookieService.set(
      'kcrole',
      obj.roles.join(','),
      date,
      environment.path,
      window.location.hostname,
      ssl,
      'Strict',
    );
    this._cookieService.set(
      'logIn',
      obj.logIn,
      date,
      environment.path,
      window.location.hostname,
      ssl,
      'Strict',
    );
    this._cookieService.set(
      'expiresIn',
      obj.expiresIn,
      date,
      environment.path,
      window.location.hostname,
      ssl,
      'Strict',
    );
    this._cookieService.set(
      'refreshExpiresIn',
      obj.refreshExpiresIn,
      date,
      environment.path,
      window.location.hostname,
      ssl,
      'Strict',
    );
    if (this._cookieService.get('token')) {
      this._store.dispatch(new GetPermission());
      this._store.pipe(select(selectPermissionsData)).subscribe((response: any) => {
        if (response) {
          this.permissions = response.data;
          this._store.dispatch(new GetApprovalCount());
          this._store.dispatch(new GetViewSettings());
          this._store.dispatch(new GetStatus());
          this._store.dispatch(new GetNotifications());
          this._store.dispatch(new GetProfile());
          this._store.dispatch(new GetDashboard({ interval: this.interval }));
          this.spinner.hide();
          // this.setToken();
        }
      });
    }
  }

  doLogout() {
    this.keycloakService.logout(window.location.origin + environment.baseHref);
  }

  restart() {
    this.userIdle.resetTimer();
  }

  // setToken() {
  //   this.keycloakService.keycloakEvents$.subscribe({
  //     next: e => {
  //       if (e.type == KeycloakEventType.OnTokenExpired) {
  //         // this.keycloakService.updateToken(20);
  //       }
  //     },
  //   });
  // }

  // setTimeOut(sessionTime) {
  //   this.userIdle.setConfigValues({ idle: sessionTime, timeout: sessionTime, ping: 60 });
  //   this.userIdle.startWatching();
  //   this.userIdle.onTimerStart().subscribe(count => console.log(count));
  //   // Start watch when time is up.
  //   this.userIdle.onTimeout().subscribe(() => {
  //     console.log('Time is up!');
  //     const id = localStorage.getItem('userloginid');
  //     this._profileService.GetLogout(id).subscribe(item => {
  //       if (item) {
  //         this._cookieService.delete('token', environment.path, window.location.hostname);
  //         this._cookieService.deleteAll(environment.path, window.location.hostname);
  //         document.cookie = `token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;

  //         this.keycloakService.clearToken();
  //         this.keycloakService.login();
  //         this.userIdle.stopWatching();
  //       }
  //     });
  //   });
  // }
}
