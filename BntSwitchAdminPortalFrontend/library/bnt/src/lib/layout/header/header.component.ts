import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  Renderer2,
  TemplateRef,
  ViewChild,
  OnInit,
} from '@angular/core';

import { LayoutStore } from '../layout.store';

import { HeaderService } from './header.service';

import { removeListeners, removeSubscriptions } from '../../helpers';
import { RoutingService } from '../../services/routing.service';
import { TranslateService } from '@ngx-translate/core';

/**
 * Header Logo
 */
@Component({
  selector: 'rv-layout-header-logo',
  template: '<ng-template #templateRef><ng-content></ng-content></ng-template>',
})
export class HeaderLogoComponent {
  @ViewChild('templateRef', { static: true }) public templateRef: TemplateRef<any>;
}

/**
 * Header Logo Mini
 */
@Component({
  selector: 'rv-layout-header-logo-mini',
  template: '<ng-template #templateRef><ng-content></ng-content></ng-template>',
})
export class HeaderLogoMiniComponent {
  @ViewChild('templateRef', { static: true }) public templateRef: TemplateRef<any>;
}

/**
 * Header
 */
@Component({
  selector: 'rv-layout-header',
  styleUrls: ['./header.component.css'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  public header: string;
  private isSidebarLeftCollapsed: boolean;
  private isSidebarRightCollapsed: boolean;
  private listeners = [];
  private subscriptions = [];

  @Input() isSidebarLeftToggle = true;
  @Input() isSidebarRightToggle = false;
  @Input() logoLink: string | any[] = '/';
  @Input() currentLang = 'en_EN';

  @ContentChild(HeaderLogoComponent, { static: true })
  public headerLogoComponent: HeaderLogoComponent;
  @ContentChild(HeaderLogoMiniComponent, { static: true })
  public headerLogoMiniComponent: HeaderLogoMiniComponent;

  @ViewChild('headerElement', { static: true })
  private headerElement: ElementRef;
  @ViewChild('sidebarLeftToggleElement', { static: false })
  private sidebarLeftToggleElement: ElementRef;
  @ViewChild('sidebarRightToggleElement', { static: false })
  private sidebarRightToggleElement: ElementRef;

  /**
   * @method constructor
   * @param layoutStore [description]
   * @param ngZone      [description]
   * @param renderer2   [description]
   * @param elementRef   [description]
   * @param headerService   [description]
   */
  constructor(
    private layoutStore: LayoutStore,
    private ngZone: NgZone,
    private renderer2: Renderer2,
    private elementRef: ElementRef,
    private translate: TranslateService,
    private headerService: HeaderService,
    private routingService: RoutingService,
  ) {}

  /**
   * @method ngOnInit
   */
  ngOnInit() {
    this.subscriptions.push(
      this.routingService.onChange.subscribe((value: any) => {
        if (value && value[value.length - 1]) {
          this.translate.setDefaultLang(this.currentLang);
          const title = value[value.length - 1].data['title'];
          this.translate.get([title]).subscribe(translation => {
            this.header = translation[title];
          });
        }
      }),
    );
  }

  /**
   * @method ngAfterViewInit
   */
  ngAfterViewInit() {
    this.headerService.elementRef = this.headerElement;

    if (this.sidebarLeftToggleElement) {
      this.subscriptions.push(
        this.layoutStore.isSidebarLeftCollapsed.subscribe((value: boolean) => {
          this.isSidebarLeftCollapsed = value;
        }),
      );
      this.ngZone.runOutsideAngular(() => {
        this.listeners.push(
          this.renderer2.listen(
            this.sidebarLeftToggleElement.nativeElement,
            'click',
            (event: Event) => {
              event.preventDefault();
              this.layoutStore.sidebarLeftCollapsed(!this.isSidebarLeftCollapsed);
            },
          ),
        );
      });
    }
    if (this.sidebarRightToggleElement) {
      this.subscriptions.push(
        this.layoutStore.isSidebarRightCollapsed.subscribe((value: boolean) => {
          this.isSidebarRightCollapsed = value;
        }),
      );
      this.ngZone.runOutsideAngular(() => {
        this.listeners.push(
          this.renderer2.listen(
            this.sidebarRightToggleElement.nativeElement,
            'click',
            (event: Event) => {
              event.preventDefault();
              this.layoutStore.sidebarRightCollapsed(!this.isSidebarRightCollapsed);
            },
          ),
        );
      });
    }
  }

  /**
   * @method ngOnDestroy
   */
  ngOnDestroy() {
    this.listeners = removeListeners(this.listeners);
    this.subscriptions = removeSubscriptions(this.subscriptions);
  }
}
