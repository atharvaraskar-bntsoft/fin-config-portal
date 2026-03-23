import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TooltipDirective } from './tooltip.directive';

@Component({
  template: ` <div class="col-md-3" style="color: rgba(0, 0, 0, 0.65)">
      <label class="required" tooltip="Some text" placement="right" delay="500">Text</label>
    </div>
    <div class="col-md-3" style="color: rgba(0, 0, 0, 0.65)">
      <label class="required" tooltip="Some text2" placement="top" delay="100">Text</label>
    </div>
    <div class="col-md-3" style="color: rgba(0, 0, 0, 0.65)">
      <label class="required" tooltip="Some text3" placement="bottom" delay="500">Text</label>
    </div>
    <div class="col-md-3" style="color: rgba(0, 0, 0, 0.65)">
      <label class="required" tooltip="Some text4" placement="left" delay="500">Text</label>
    </div>
    <div>test</div>`,
})
class TestComponent {}

describe('TooltipDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let des: DebugElement[]; // the three elements w/ the directive
  let bareDiv: DebugElement; // the <h2> w/o the directive

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TooltipDirective, TestComponent],
    }).createComponent(TestComponent);

    fixture.detectChanges(); // initial binding

    // all elements with an attached TooltipDirective
    des = fixture.debugElement.queryAll(By.directive(TooltipDirective));

    // the div without the TooltipDirective
    bareDiv = fixture.debugElement.query(By.css('div:not([tooltip])'));
  });

  it('should have 1 element with tooltip ', () => {
    expect(des.length).toBe(4);
  });

  it('should contain tooltip with delay 500 ', () => {
    const dir = des[0].injector.get(TooltipDirective) as TooltipDirective;
    const delay = des[0].nativeElement.getAttribute('delay');
    expect(delay).toBe(dir.delay);
  });

  it('should contain tooltip with placement right ', () => {
    const dir = des[0].injector.get(TooltipDirective) as TooltipDirective;
    const placement = des[0].nativeElement.getAttribute('placement');
    expect(placement).toBe(dir.placement);
  });

  it('should not have `TooltipDirective` in 5th div providerTokens', () => {
    expect(bareDiv.providerTokens).not.toContain(TooltipDirective);
  });

  it('should show tooltip', () => {
    // easier to work with nativeElement
    const div = des[0].nativeElement as HTMLInputElement;

    div.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();

    expect(des[0].nativeElement.getAttribute('tooltip')).toBe('Some text');
  });

  it('should show tooltip 2 3 4', () => {
    // easier to work with nativeElement
    const div1 = des[1].nativeElement as HTMLInputElement;

    div1.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();

    expect(des[1].nativeElement.getAttribute('tooltip')).toBe('Some text2');

    const div2 = des[2].nativeElement as HTMLInputElement;

    div2.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();

    expect(des[2].nativeElement.getAttribute('tooltip')).toBe('Some text3');

    const div3 = des[3].nativeElement as HTMLInputElement;

    div3.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();

    expect(des[3].nativeElement.getAttribute('tooltip')).toBe('Some text4');
  });
  it('should hide tooltip', fakeAsync(() => {
    const div = des[0].nativeElement as HTMLInputElement;

    div.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();

    expect(des[0].nativeElement.getAttribute('tooltip')).toBe('Some text');

    div.dispatchEvent(new Event('mouseleave'));
    //@TODO:: check how delay can be tested
    tick(500);
    fixture.detectChanges();

    expect(des[0].nativeElement).not.toEqual(By.css('.ng-tooltip-show'));
  }));
  it('should contain tooltip with placement left ', () => {
    const dir = des[3].injector.get(TooltipDirective) as TooltipDirective;
    const placement = des[3].nativeElement.getAttribute('placement');
    expect(placement).toBe(dir.placement);
  });

  it('should contain tooltip with placement top ', () => {
    const dir = des[1].injector.get(TooltipDirective) as TooltipDirective;
    const placement = des[1].nativeElement.getAttribute('placement');
    expect(placement).toBe(dir.placement);
  });
  it('should contain tooltip with placement bottom ', () => {
    const dir = des[2].injector.get(TooltipDirective) as TooltipDirective;
    const placement = des[2].nativeElement.getAttribute('placement');
    expect(placement).toBe(dir.placement);
  });
});
