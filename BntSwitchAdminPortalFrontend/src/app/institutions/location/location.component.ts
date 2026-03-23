import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../store/state/app.state';
import { selectLocation, selectLocationResponse } from '../../store/selectors/location.selector';
import { GetLocation, ClearState } from '../../store/actions/location.action';
import { Router, ActivatedRoute } from '@angular/router';
import { GetFilterData, ClearFilterData } from '@app/store/actions/filter.actions';
import { selectFilterData } from '@app/store/selectors/filter.selectors';
import { ClearStateAction, UploadResetAction } from '../../store/actions/import-file.action';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { ImportFileService } from '@app/services/import-file.service';
import { TranslateService } from '@ngx-translate/core';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
declare var jQuery: any;

@Component({
  selector: 'app-location',
  styleUrls: ['./location.component.scss'],
  templateUrl: './location.component.html',
})
export class LocationComponent implements OnInit, OnDestroy {
  @ViewChild('date', { static: true }) date: TemplateRef<any>;
  @ViewChild('expiry', { static: true }) expiry: TemplateRef<any>;
  @ViewChild('name', { static: true }) name: TemplateRef<any>;
  @ViewChild('locked', { static: true }) locked: TemplateRef<any>;
  @ViewChild('actions', { static: true }) actions: TemplateRef<any>;
  @ViewChild('posSafetyFlag', { static: true }) posSafetyFlag: TemplateRef<any>;
  @ViewChild('myTable', { static: true }) table;

  public currentPagination = '20';
  public currentLang: string;
  title = 'Location Details';
  public Labels: any = {};
  public columns: any;
  public rows: any = [];
  public id: any;
  public visible = false;
  public searchData: any = [];
  confirmModal?: NzModalRef;
  public temp: any;
  public locationData: any;
  public visibleAnimate = false;
  public rowId: any;
  public statusLoading: Boolean = false;
  public visiblePopUp = false;
  public visiblePopUpAnimate = false;
  public errorMessage: string;
  public successMessage: string;
  public disableSuccess = '';
  public disableError = '';
  public enableSuccess: string;
  public enableError: string;
  public mapView = false;
  public markers = [];
  public zoom = 2;
  public currentElement: any = [];
  public coordinates = [];
  public url = '/location/filter';
  public importUrl = '/institution/validate';
  public addressList: any;
  public groupList: any;
  public institutionList: any;
  public statusList: any;
  public _filters: Array<any> = [];
  public place: any = '';
  public permission: any = {};
  public permissions: any = {};
  public lat = 51.673858;
  public lng = 7.815982;
  public filter: any = {};
  public permissionObject = {
    check: null,
    delete: null,
    id: '',
    read: null,
    update: null,
    write: null,
  };
  public previous;
  public locationId = 'link_location';
  public loading = true;
  public totalRecords: Number;
  private _page = 1;
  public s: string;
  public rowData: any;
  public objectData: any;
  public resetFlag = false;
  readonly headerHeight = 40;
  readonly rowHeight = 72;
  readonly pageLimit = 15;
  public request: Boolean = true;
  public resetButtonFlag: Boolean = false;
  public searchResetButton: Boolean = true;
  componetDestroyed = new Subject();
  isvisibleView: boolean;
  idView: any;

  constructor(
    private _store: Store<IAppState>,
    private _router: Router,
    private _route: ActivatedRoute,
    private importService: ImportFileService,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    this._route.queryParams.pipe(takeUntil(this.componetDestroyed)).subscribe(params => {
      if (params) {
        const output = Object.keys(params);
        output.forEach(item => {
          this.resetFlag = true;
          this._filters[item] = params[item];
        });
        if (this._filters) {
          this.filter.merchantGroup = this._filters['merchantGroup'];
          this.filter.merchant = this._filters['merchant'];
        }
      }
      this._transFilters();
    });
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectViewSettingsList))
      .subscribe((response: ViewSettingGetObject) => {
        if (response) {
          this.currentPagination = response.data.settingDto.pagination;
          this.currentLang = response.data.settingDto.language;
          this.loadPage(this._page);
          this.translate.setDefaultLang(this.currentLang);
        }
      });

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectLocationResponse))
      .subscribe((response: any) => {
        if (response) {
          this.statusLoading = false;
          this.currentElement.map(item => {
            if (response.data !== null && item.id === response.data.id) {
              this._store.dispatch(new ClearState());
              if (response.status === 'success' && response.data !== null) {
                item.locked = response.data.locked;
              }
            }
          });
        }
      });

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectLocation))
      .subscribe((Location: any) => {
        if (Location) {
          this.request = true;
          this.rowData = Location.data;
          if (this._page === 1) {
            this.rows = this.rowData.locationList;
          } else if (this.rows.length !== 0) {
            this.rows = this.rows.concat(this.rowData.locationList);
          }

          if (this.rows && this.rowData['total-record'] === this.rows.length) {
            this.request = false;
          }
          this.totalRecords = this.rowData['total-record'];
          this.loading = false;
          this.getCoordinates();
        }
      });
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectPermissionsData))
      .subscribe((response: any) => {
        if (response) {
          this.permission = response.data.find(item => item.id === this.locationId);
          this.permissionObject = this.permission;
        }
      });
    this._store.dispatch(new GetFilterData(this.url));
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectFilterData))
      .subscribe(filter => {
        if (filter && filter !== null && filter.status !== 'failure') {
          this.addressList = filter.data.address;
          this.groupList = filter.data.merchantGroup;
          this.institutionList = filter.data.merchant;
          this.statusList = filter.data.status;
          this._store.dispatch(new ClearFilterData());
        }
      });
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectLocationResponse))
      .subscribe((response: any) => {
        this._store.dispatch(new ClearState());
        if (response) {
          if (response && response.status === 'success') {
            this.visible = false;
            this.visibleAnimate = false;
            this.loadPage(this._page);
          }
        }
      });
    this.id = this._route.snapshot.paramMap.get('id');
    this.translate
      .get(['NAME', 'STATUS', 'POS_SAFETY_CHECK', 'ACTIVE_SINCE', 'ACTIVE_TO', 'ACTION'])
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe(translation => {
        this.columns = [
          {
            prop: 'name',
            name: translation.NAME,
            cellTemplate: this.name,
            Searchable: true,
          },
          {
            prop: 'locked',
            name: translation.STATUS,
            cellTemplate: this.locked,
          },
          {
            prop: 'posSafetyFlag',
            name: translation.POS_SAFETY_CHECK,
            cellTemplate: this.posSafetyFlag,
          },

          {
            prop: 'activateOn',
            name: translation.ACTIVE_SINCE,
            cellTemplate: this.date,
          },
          {
            prop: 'expiryOn',
            name: translation.ACTIVE_TO,
            cellTemplate: this.expiry,
          },
          {
            prop: 'actions',
            name: translation.ACTION,
            cellTemplate: this.actions,
            sortable: false,
          },
        ];
        this.searchData = this.columns
          .map(value => {
            if (value.Searchable) {
              return value.prop;
            }
          })
          .filter(item => item);
      });
  }
  viewDetail(data: any) {
    this.idView = data;
    this.isvisibleView = true;
  }
  closeView(event: any): void {
    this.isvisibleView = false;
  }
  createview(event: any) {
    this.isvisibleView = false;
  }

  public resetFilterSearch() {
    this.filter = {};
    this._filters = [];
    this.place = '';
    this._page = 1;
    this.loadPage(this._page);
  }

  clickedMarker(infowindow) {
    if (this.previous) {
      this.previous.close();
    }
    this.previous = infowindow;
  }

  public mapClicked(event: any): void {
    this.markers.push({
      draggable: true,
      lat: event.coords.lat,
      lng: event.coords.lng,
    });
  }

  public getCoordinates(): void {
    if (this.rows !== null) {
      const coordData = [].concat(...this.rows);
      this.coordinates = coordData
        .map((item: any) => {
          const sample = {
            lat: item.coordinates.lat,
            lng: item.coordinates.lng,
            data: item,
          };
          return sample;
        })
        .filter((item: any) => item.lat !== null);
    }
  }

  public changeViewToMap() {
    this.mapView = true;
  }

  public changeViewToList() {
    this.mapView = false;
  }

  public locationDetails(row): void {
    this._router.navigate(['institutions/locations/locations-info', row.id]);
  }

  public open(): void {
    document.body.style.overflow = 'hidden';
    this.visible = true;
    setTimeout(() => (this.visibleAnimate = true), 200);
  }

  public cancel(): void {
    document.body.style.overflow = 'auto';
    this.visibleAnimate = false;
    setTimeout(() => (this.visible = false), 100);
  }

  public importButton(): void {
    this.openPopUp();
  }

  public openPopUp(): void {
    document.body.style.overflow = 'hidden';
    this.visiblePopUp = true;
    setTimeout(() => (this.visiblePopUpAnimate = true), 200);
  }

  public cancelPopUp(): void {
    this._page = 1;
    this.loadPage(this._page);
    document.body.style.overflow = 'auto';
    this.visiblePopUpAnimate = false;
    setTimeout(() => (this.visiblePopUp = false), 100);
    this._store.dispatch(new ClearStateAction());
  }
  public getFilterStatus(eventData: HTMLSelectElement) {
    if (!eventData) {
      delete this._filters['status'];
    } else {
      this._filters['status'] = eventData.id;
    }
    this._page = 1;
    this.loadPage(this._page);
  }
  public getFilterAddress(eventData: any) {
    let city;
    let country;
    if (!eventData) {
      delete this._filters['address'];
    } else {
      [city, country] = eventData.name;
      this._filters['address'] = city + ',' + country;
    }
    this._page = 1;
    this.loadPage(this._page);
  }
  public getFilterInstitution(eventData: HTMLSelectElement) {
    if (!eventData) {
      delete this._filters['merchant'];
    } else {
      this._filters['merchant'] = eventData.id;
    }
    this._page = 1;
    this.loadPage(this._page);
  }

  public getFilterNameData(eventData: any) {
    if (this.place) {
      this.searchResetButton = false;
      if (!eventData) {
        delete this._filters['name'];
      } else {
        if (eventData.currentTarget.value && eventData.currentTarget.value !== '') {
          this._filters['name'] = eventData.currentTarget.value;
        } else {
          this.resetSearch();
        }
      }
      this._page = 1;
      this.loadPage(this._page);
    }
  }

  private _transFilters(): Object {
    const output = Object.keys(this._filters);
    if (output.length) {
      this.resetButtonFlag = true;
    } else {
      this.resetButtonFlag = false;
    }
    return output
      .map(item => {
        return item + ':' + this._filters[item];
      })
      .join(',');
  }

  public resetSearch() {
    this.place = '';
    delete this._filters['name'];
    this._page = 1;
    this.loadPage(this._page);
    this.searchResetButton = true;
  }
  public resetUpload() {
    this._store.dispatch(new ClearStateAction());
    this._store.dispatch(new UploadResetAction());
    this.importService.clearData();
  }

  public onScroll(offsetY: any) {
    const THis = this;
    jQuery('.datatable-body').on('scroll', function () {
      let div = jQuery(this).get(0);
      if (div.scrollTop + div.clientHeight >= div.scrollHeight) {
        if (THis.request) {
          THis._page = ++THis._page;
          THis.loadPage(THis._page);
        }
      }
    });
  }

  private loadPage(pagenumber: number) {
    this._store.dispatch(
      new GetLocation({
        filter: this._transFilters(),
        page: pagenumber,
        'page-size': this.currentPagination,
      }),
    );
    this.request = false;
  }

  public reset(event): void {
    delete this._filters[event];
    if (this._filters.length === 0) {
      this.resetFlag = false;
    } else {
      this.resetFlag = true;
    }
    this.loadPage(this._page);
  }

  public resetAll(): void {
    this.resetFlag = false;
    this._filters = [];
    this.loadPage(this._page);
  }

  ngOnDestroy(): void {
    this.componetDestroyed.next();
    this.componetDestroyed.complete();
    this.componetDestroyed.unsubscribe();
  }
}
