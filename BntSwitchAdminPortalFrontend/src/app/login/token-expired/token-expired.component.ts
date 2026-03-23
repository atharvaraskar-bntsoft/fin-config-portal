import { Component, OnInit } from "@angular/core";
import { TitleConfig } from "../../config/i18n/title.config";
import { environment } from "../../../environments/environment";
import { selectViewSettingsList } from "@app/store/selectors/view-settings.selector";
import { select, Store } from "@ngrx/store";
import { IAppState } from "@app/store/state/app.state";
import { TranslateService } from "@ngx-translate/core";
import { ViewSettingGetObject } from "@app/models/view-settings.interface";
import { CookieService } from 'ngx-cookie-service';
import { KeycloakService } from 'keycloak-angular';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { ProfileService } from "@app/services/profile.service";

@Component({
  selector: "app-token-expired",
  styleUrls: ["./token-expired.component.scss"],
  templateUrl: "./token-expired.component.html",
})
export class TokenExpiredComponent implements OnInit {
  public currentLang: string;
  public Labels: any;
  public titleConfig = TitleConfig;
  constructor(
    private _store: Store<IAppState>,
    private translate: TranslateService,
    private _cookieService: CookieService,
    private keycloakService: KeycloakService,
    private _profileService: ProfileService,
  ) {
    this._store
      .pipe(select(selectViewSettingsList))
      .subscribe((response: ViewSettingGetObject) => {
        if (response) {
          this.currentLang = response.data.settingDto.language;
          translate.setDefaultLang(this.currentLang);
        }
      });
  }

  ngOnInit() {}

  async redirectToLogin() {
    const id = localStorage.getItem("userloginid");
    this._profileService.GetLogout(id).subscribe((item) => {
      if (item) {
        this.keycloakService.login({
          redirectUri: window.location.origin + environment.baseHref
        });
      }
    })
    // this._cookieService.delete(
    //   "token",
    //   environment.path,
    //   window.location.hostname
    // );
    // this._cookieService.deleteAll(environment.path, window.location.hostname);
    // this.delete_cookie("token");
    // await this.keycloakService.logout(window.location.origin + environment.baseHref);
  }

  private delete_cookie(name) {
    document.cookie = name + `=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  }
}
