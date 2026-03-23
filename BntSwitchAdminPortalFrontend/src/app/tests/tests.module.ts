import { ActionReducerMap, MetaReducer, StoreModule, ReducerManager } from '@ngrx/store';
import { ModuleWithProviders, APP_INITIALIZER, NgModule } from '@angular/core';
import { createMockReducer } from '@app/store/reducers/mock.reducers';

const reducers: ActionReducerMap<unknown> = {};
const metaReducers: MetaReducer<unknown>[] = [];
@NgModule({
  imports: [
    // For every mockStoreModule we will initialize the root reducers
    StoreModule.forRoot(reducers, { metaReducers }),
  ],
  //   exports: {
  //     StoreModule,
  //   },
})
export class MockStoreModule {
  // In the imports there is no option to work with variables, so we will initialize
  // the feature through a forRoot method
  static forRoot(featureName: string, initialState: unknown): ModuleWithProviders<MockStoreModule> {
    return {
      ngModule: MockStoreModule,
      providers: [
        {
          // ReducerManager is provided by @ngrx/store
          deps: [ReducerManager],
          multi: true,
          provide: APP_INITIALIZER,
          // Before the test is initialize we will take care of the initialisation of
          // the mockReducer
          useFactory: initReducer(featureName, initialState),
        },
      ],
    };
  }
}

export function initReducer(featureName: string, initialState: unknown) {
  return (reducer: ReducerManager) => {
    return () =>
      // A factory requires to return a promise
      new Promise((resolve, reject) => {
        // Use the reducemanager to add the feature, with mocked out reducer
        reducer.addReducer(featureName, createMockReducer(initialState));
        resolve('mocked reducer');
      });
  };
}
