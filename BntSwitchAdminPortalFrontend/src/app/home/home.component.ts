import { Component, AfterContentInit } from '@angular/core';
import * as Prism from 'prismjs';
import { GetDashboard } from '../store/actions/dashboard.actions';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../store/state/app.state';
import { selectDashboardList } from '../store/selectors/dashboard.selector';
import { TranslateService } from '@ngx-translate/core';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html',
})
export class HomeComponent implements AfterContentInit {
  public currentLang: string;
  /**
   * @method AfterContentInit
   */
  public chartjsData: any;
  public rows: any;
  public interval: Number = 1440;

  constructor(private _store: Store<IAppState>, private translate: TranslateService) {
    this._store.pipe(select(selectDashboardList)).subscribe((data: any) => {
      if (data.dashboard !== null) {
        this.rows = data.dashboard ? data.dashboard : null;
      }
    });
    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentLang = response.data.settingDto.language;
        translate.setDefaultLang(this.currentLang);
      }
    });
  }

  ngAfterContentInit() {
    Prism.highlightAll();
  }

  public timeInterval() {
    this._store.dispatch(new GetDashboard({ interval: this.interval }));
  }
}
