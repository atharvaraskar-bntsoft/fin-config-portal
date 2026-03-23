import { Action } from '@ngrx/store';
const MOCK_ACTION = '[MOCK] ACTION';

export class MockAction implements Action {
  readonly type = MOCK_ACTION;
  // As we don't know the payload, we mark it as unknown
  readonly payload: unknown;

  constructor(payload?: unknown) {
    // Payload is optional, not every action has payload!
    this.payload = payload;
  }
}
