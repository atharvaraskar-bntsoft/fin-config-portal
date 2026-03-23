import { Component, OnInit, OnDestroy } from '@angular/core';
import { IAppState } from '@app/store/state/app.state';
import { Store, select } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { ClearState, GetByIdHistory } from '@app/store/actions/history.action';
import { selectGetByIdHistory } from '@app/store/selectors/history.selector';

@Component({
  selector: 'app-history-detail',
  styleUrls: ['./history-detail.component.scss'],
  templateUrl: './history-detail.component.html',
})
export class HistoryDetailComponent implements OnInit, OnDestroy {
  public currentLang: string;
  public Labels: any;
  public rows: any = {};
  public id: any;

  constructor(
    private _store: Store<IAppState>,
    private translate: TranslateService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { }

  public viewSettingData() {
    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentLang = response.data.settingDto.language;
        this.translate.setDefaultLang(this.currentLang);
      }
    });
  }

  public loadData() {
    this.id = this._route.snapshot.paramMap.get('id');
    this._store.dispatch(new GetByIdHistory(this.id));
    this._store.pipe(select(selectGetByIdHistory)).subscribe((data: any) => {
      if (data) {
        this.rows = data.data;
      }
    });
  }

  ngOnInit() {
    this.loadData();
    this.viewSettingData();
  }

  public allDetails(): void {
    this._router.navigate(['/deployment/history']);
  }

  ngOnDestroy() {
    this._store.dispatch(new ClearState());
  }
}
