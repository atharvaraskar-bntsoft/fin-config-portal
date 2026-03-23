import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { IAppState } from '../../store/state/app.state';
import { GetViewSettings, UpdateViewSettings } from '../../store/actions/view-settings.actions';
import {
  selectViewSettingsList,
  selectViewSettingsSucces,
} from '@app/store/selectors/view-settings.selector';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ViewSettingGetObject, UpdateViewSettingObject } from '@app/models/view-settings.interface';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-view-settings',
  styleUrls: ['./view-settings.component.scss'],
  templateUrl: './view-settings.component.html',
})
export class ViewSettingsComponent implements OnInit {
  public currentLang: string;
  public Labels: any = {};
  public language: any;
  protected defaultpagination: any;
  protected defaultlanguage: any;
  public pagination: Array<any>;
  public fg: UntypedFormGroup;
  public currentItem: any = {
    language: '',
    pagination: '',
  };
  errorMessage: string;
  constructor(
    private _store: Store<IAppState>,
    private translate: TranslateService,
    private cookieService: CookieService,
    private _router: Router,
  ) {
    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.language = response.data.language;
        this.pagination = response.data.pagination;
        this.pagination = this.pagination.filter(item => item >= 20);
        this.defaultpagination = response.data.settingDto.pagination;
        this.defaultlanguage = response.data.settingDto.language;
        this.currentLang = response.data.settingDto.language;
        translate.setDefaultLang(this.currentLang);
      }
    });
  }

  ngOnInit() {
    this._store.dispatch(new GetViewSettings());
    this.createFormGroup();
  }

  public setData(data): void {
    this.currentItem['language'] = data['language'];

    this.currentItem['pagination'] = data['pagination'];
  }

  public createFormGroup(): void {
    this.fg = new UntypedFormGroup({
      language: new UntypedFormControl(this.language),
      pagination: new UntypedFormControl(this.pagination),
    });
  }

  public setLanguageCookies() {
    const date = new Date();
    const minutes = 60 * 24;
    date.setTime(date.getTime() + minutes * 60 * 1000);
    const ssl = window.location.protocol === 'http:' ? false : true;
    this.cookieService.set(
      'language',
      this.currentItem.language,
      date,
      environment.path,
      window.location.hostname,
      ssl,
      'Strict',
    );
  }

  public onSubmit({ value }): void {
    this.setData(value);
    this.errorMessage = '';
    this._store.dispatch(new UpdateViewSettings(this.currentItem));
    this._store
      .pipe(select(selectViewSettingsSucces))
      .subscribe((response: UpdateViewSettingObject) => {
        if (response && response.status === 'failure') {
          this.errorMessage = response.message;
        } else {
          this.setLanguageCookies();
          this._store.dispatch(new GetViewSettings());
        }
      });
  }
  public f() {
    return this.fg.controls;
  }
}
