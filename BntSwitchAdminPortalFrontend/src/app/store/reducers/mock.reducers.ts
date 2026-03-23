export function createMockReducer<T>(initialState: T) {
  return function reducer(state: any = initialState, action: { payload: any }): T {
    // Everything will be stored to the store
    return { ...state, ...action.payload };
  };
}
