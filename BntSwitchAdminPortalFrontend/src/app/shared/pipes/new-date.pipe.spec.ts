import { NewDatePipe } from './new-date.pipe';

xdescribe('NewDatePipe', () => {
  it('create an instance', () => {
    const pipe = new NewDatePipe();
    expect(pipe).toBeTruthy();
  });
});
