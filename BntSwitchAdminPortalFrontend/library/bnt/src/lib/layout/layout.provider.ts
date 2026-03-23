import { InjectionToken } from '@angular/core';

import { LayoutStore } from './layout.store';
import { LayoutState } from './layout.state';

/**
 * [InjectionToken description]
 */
export const LayoutConfigToken = new InjectionToken('layoutConfig');

/**
 * [layoutStoreFactory description]
 */
export function layoutStoreFactory(layoutConfig: LayoutState): LayoutStore {
  return new LayoutStore(layoutConfig);
}

/**
 * [layoutProviders description]
 */
export function layoutProvider(layoutConfig: LayoutState) {
  return [
    {
      deps: [LayoutConfigToken],
      provide: LayoutStore,
      useFactory: layoutStoreFactory,
    },
    {
      provide: LayoutConfigToken,
      useValue: layoutConfig,
    },
  ];
}
