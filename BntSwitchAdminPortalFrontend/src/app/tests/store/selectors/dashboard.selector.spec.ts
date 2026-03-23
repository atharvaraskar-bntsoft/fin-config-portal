import { TestBed } from '@angular/core/testing';
import { selectCurrenciesList } from '@app/store/selectors/currencies.selector';
import {
  selectDashboardList,
  selectSelectedDashboard,
} from '@app/store/selectors/dashboard.selector';
import { IDashboardState } from '@app/store/state/dashboard.state';
import { provideMockStore } from '@ngrx/store/testing';

const mockDashboard: IDashboardState = {
  dashboard: [
    {
      blockType: 'full',
      title: 'Transactions Velocity - Status',
      actionLink: '/',
      actionTitle: '',
      content: {
        type: 'line',
        coordinates: [
          {
            text: 'TOTAL',
            xcoordinats: [],
            ycoordinats: [],
          },
          {
            text: 'APPROVED',
            xcoordinats: [],
            ycoordinats: [],
          },
          {
            text: 'FAILED',
            xcoordinats: [],
            ycoordinats: [],
          },
        ],
        xCoordinateType: 'date',
        yCoordinateType: null,
      },
    },
  ],

  selectedDashboard: null,
};
const initialState = mockDashboard;
describe('Currencies Selectors', () => {
  TestBed.configureTestingModule({
    providers: [provideMockStore({ initialState })],
  });
 
  it('should return selectDashboardList', () => {
    const state: any = {
      dashboard: initialState,
    };
    
    expect(selectDashboardList(state)).toEqual(initialState);
  });
  it('should return selectDashboardList', () => {
    const state: any = {
      dashboard: initialState,
    };
   
    expect(selectSelectedDashboard(state)).toEqual(initialState.selectedDashboard);
  });
});
