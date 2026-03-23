import { TestBed } from '@angular/core/testing';
import { AlertService } from '@app/services/alert.service';
import { CurrenciesService } from '@app/services/currencies.service';
import { ECurrenciesActions, GetCurrenciesSuccess } from '@app/store/actions/currencies.action';
import { CurrenciesEffects } from '@app/store/effects/currencies.effects';
import { currenciesReducers } from '@app/store/reducers/currencies.reducers';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AlertModule } from 'library/bnt/src/lib/alert/alert.module';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { Observable, of } from 'rxjs';

const initialState = {
  currencies: null,
};
const mockCurrencies = {
  status: 'success',
  message: 'null',
  data: {
    'total-record': 178,
    'page-no': 1,
    currencyList: [
      {
        id: 184,
        code: 'TJS',
        isoCode: '972',
        currencyName: 'Somoni',
        active: true,
        currencyMinorUnit: '2',
        deleted: '0',
      },
      {
        id: 183,
        code: 'STD',
        isoCode: '678',
        currencyName: 'Dobra',
        active: true,
        currencyMinorUnit: '2',
        deleted: '0',
      },
      {
        id: 182,
        code: 'LRD',
        isoCode: '430',
        currencyName: 'Liberian Dollar',
        active: true,
        currencyMinorUnit: '2',
        deleted: '0',
      },
      {
        id: 181,
        code: 'IQD',
        isoCode: '368',
        currencyName: 'Iraqi Dinar',
        active: true,
        currencyMinorUnit: '3',
        deleted: '0',
      },
      {
        id: 180,
        code: 'ERN',
        isoCode: '232',
        currencyName: 'Nakfa',
        active: true,
        currencyMinorUnit: '2',
        deleted: '0',
      },
      {
        id: 179,
        code: 'KMF',
        isoCode: '174',
        currencyName: 'Comoro Franc',
        active: true,
        currencyMinorUnit: '0',
        deleted: '0',
      },
      {
        id: 177,
        code: 'AWG',
        isoCode: '533',
        currencyName: 'Aruban Guilder',
        active: true,
        currencyMinorUnit: '2',
        deleted: '0',
      },
      {
        id: 174,
        code: 'NAF',
        isoCode: '000',
        currencyName: 'Netherlands Antilles Florin',
        active: true,
        currencyMinorUnit: '2',
        deleted: '0',
      },
      {
        id: 173,
        code: 'ZWD',
        isoCode: '716',
        currencyName: 'Zimbabwe Dollar',
        active: true,
        currencyMinorUnit: '2',
        deleted: '0',
      },
      {
        id: 172,
        code: 'ZAL',
        isoCode: '991',
        currencyName: 'South African Financial',
        active: true,
        currencyMinorUnit: '0',
        deleted: '0',
      },
      {
        id: 170,
        code: 'YER',
        isoCode: '886',
        currencyName: 'Yemeni Rial',
        active: true,
        currencyMinorUnit: '2',
        deleted: '0',
      },
      {
        id: 169,
        code: 'XPF',
        isoCode: '953',
        currencyName: 'CFP Franc',
        active: true,
        currencyMinorUnit: '0',
        deleted: '0',
      },
      {
        id: 168,
        code: 'XOF',
        isoCode: '952',
        currencyName: 'CFA Franc Bceao',
        active: true,
        currencyMinorUnit: '0',
        deleted: '0',
      },
      {
        id: 167,
        code: 'XCD',
        isoCode: '951',
        currencyName: 'East Caribbean Dollar',
        active: true,
        currencyMinorUnit: '2',
        deleted: '0',
      },
      {
        id: 166,
        code: 'XAF',
        isoCode: '950',
        currencyName: 'CFA Franc Beac',
        active: true,
        currencyMinorUnit: '0',
        deleted: '0',
      },
      {
        id: 165,
        code: 'WST',
        isoCode: '882',
        currencyName: 'Samoanian Tala',
        active: true,
        currencyMinorUnit: '2',
        deleted: '0',
      },
      {
        id: 164,
        code: 'VUV',
        isoCode: '548',
        currencyName: 'Vanuatu Vatu',
        active: true,
        currencyMinorUnit: '0',
        deleted: '0',
      },
      {
        id: 163,
        code: 'VND',
        isoCode: '704',
        currencyName: 'Vietnamese Dong',
        active: true,
        currencyMinorUnit: '0',
        deleted: '0',
      },
      {
        id: 162,
        code: 'VEB',
        isoCode: '862',
        currencyName: 'Venezuelan Bolivar',
        active: true,
        currencyMinorUnit: '2',
        deleted: '0',
      },
      {
        id: 161,
        code: 'UZS',
        isoCode: '860',
        currencyName: 'Uzbekistan Sum',
        active: true,
        currencyMinorUnit: '2',
        deleted: '0',
      },
    ],
    'total-filtered-record': 20,
  },
};
class CurrenciesServiceMock {
  getCurrencies() {
    return {};
  }
}
xdescribe('CurrenciesEffects', () => {
  let actions$: Observable<ECurrenciesActions>;
  let effects: CurrenciesEffects;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        CurrenciesEffects,
        AlertService,
        SnotifyService,
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        {
          provide: CurrenciesService,
          useClass: CurrenciesServiceMock,
        },
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
      ],
      imports: [AlertModule],
    });
    effects = TestBed.get(CurrenciesEffects);
  });

  it('should call GetCurrencies$ ', () => {
    effects.GetCurrencies$.subscribe(res => {
      expect(res).not.toBeNull();
    });
  });
});
