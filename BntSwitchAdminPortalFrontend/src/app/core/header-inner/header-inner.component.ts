import { AfterViewInit, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import { TitleConfig } from '../../config/i18n/title.config';
import { GetProfile } from '@app/store/actions/profile.action';
import { selectProfileList } from '@app/store/selectors/profile.selector';
import { selectNotificationsList } from '@app/store/selectors/notifications.selector';
import { MessageService } from '@app/services/message.service';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { environment } from '../../../environments/environment';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { TranslateService } from '@ngx-translate/core';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { KeycloakService } from 'keycloak-angular';
import { ProfileService } from '@app/services/profile.service';
declare let jQuery: any;

@Component({
  selector: 'app-header-inner',
  styleUrls: ['./header-inner.component.css'],
  templateUrl: './header-inner.component.html',
})
export class HeaderInnerComponent implements OnInit, AfterViewInit {
  public currentLang: string;
  public Labels: any;
  public now: any;
  public permissions: any;
  public data: any = {};
  public routerLink = '/access';
  public Lables = TitleConfig;
  public notificationCount: number;
  public lastRecords: Array<any>;
  public baseUrl: string;
  public menuArray: any;
  public notificationPageId = 'link_notification';
  public isPermissionNotification = false;
  constructor(
    private readonly translate: TranslateService,
    private readonly keycloakService: KeycloakService,
    private readonly cdr: ChangeDetectorRef,
    private readonly _profileService: ProfileService,
    private readonly _messageService: MessageService,
    private readonly _store: Store<IAppState>,
  ) {
    this.baseUrl = environment.baseHref;
  }

  loadData() {
    this._messageService.data.subscribe((response: any) => {
      this._store.pipe(select(selectNotificationsList)).subscribe(result => {
        if (result) {
          this.notificationCount = result.data['checkerList'].filter(
            item => item.status === 'PENDING',
          ).length;
          this.lastRecords = result.data['checkerList']
            .filter(item => item.status === 'PENDING')
            .slice(0, 5);
          this.cdr.detectChanges();
        }
      });
    });
  }
  viewSettingData() {
    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentLang = response.data.settingDto.language;
        this.translate.setDefaultLang(this.currentLang);
      }
    });
  }
  permissionData() {
    this._store.pipe(select(selectPermissionsData)).subscribe((value: any) => {
      if (value) {
        this.permissions = value.data;
        const permission = this.permissions.find(item => item.id === this.notificationPageId);
        if (permission) {
          this.isPermissionNotification =
            permission.read &&
            permission.write &&
            permission.delete &&
            permission.read &&
            permission.check;
        }
        this.translate
          .get([
            'Users',
            'UserRoles1',
            'COUNTRIES',
            'COUNTRIES_ZONE_SCHEME',
            'InstitutionZone',
            'CountryStates',
            'Currencies',
            'DeviceTypes',
            'MASTER_CONFIGURATION',
          ])
          .subscribe(translation => {
            this.menuArray = [
              {
                link: 'settings/users',
                label: translation.Users,
                id: 'link_user',
              },
              {
                link: 'settings/user-roles',
                label: translation.UserRoles1,
                id: 'link_user_roles',
              },
              {
                link: 'settings/countries',
                label: translation.COUNTRIES,
                id: 'link_countries',
              },
              {
                link: 'settings/country-states',
                label: translation.CountryStates,
                id: 'link_country_states',
              },
              {
                link: 'settings/currencies',
                label: translation.Currencies,
                id: 'link_currencies',
              },
              {
                link: 'settings/device-types',
                label: translation.DeviceTypes,
                id: 'link_device_types',
              },
              {
                link: 'settings/master-configuration',
                label: translation.MASTER_CONFIGURATION,
                id: 'link_currencies_1',
              },
            ];
            this.permissions = this.permissions.filter(item => {
              if (item.read || item.write || item.update || item.delete) {
                return item;
              }
            });

            this.menuArray = this.menuArray
              .map(item => {
                const output = this.permissions.find(permission => {
                  return item.id === permission.id;
                });
                if (output) {
                  return item;
                }
              })
              .filter(val => val);
          });
      }
    });
  }
  ngOnInit() {
    this.permissionData();
    this.viewSettingData();
    this.loadData();
    this._store.dispatch(new GetProfile());
    this._store.pipe(select(selectProfileList)).subscribe((UserData: any) => {
      if (UserData) {
        this.data = UserData.data;
      }
    });
  }

  public projectMode() {
    if (jQuery('body').hasClass('layout-boxed')) {
      jQuery('body').removeClass('layout-boxed');
    } else {
      jQuery('body').addClass('layout-boxed');
    }
  }

  public logout() {
    const id = localStorage.getItem('userloginid');
    this._profileService.GetLogout(id).subscribe(item => {
      if (item) {
        this.keycloakService.login({
          redirectUri: window.location.origin + '/' + environment.path,
        });
      }
    });
  }

  ngAfterViewInit() {
    setInterval(() => {
      this.now = new Date();
      this.cdr.detectChanges();
    }, 1);
  }
}
