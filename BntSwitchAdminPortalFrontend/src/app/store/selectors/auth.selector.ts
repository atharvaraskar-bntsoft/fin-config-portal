import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';

const auth = (state: IAppState) => state.auth;

export const AuthRequest = createSelector(auth, (state: any) => state.auth);
