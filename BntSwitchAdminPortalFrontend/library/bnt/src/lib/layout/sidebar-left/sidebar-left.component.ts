import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  OnChanges,
  Input,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Event as RouterEvent, NavigationEnd, PRIMARY_OUTLET, Router } from '@angular/router';

import { RoutingService } from '../../services/routing.service';

import { WrapperService } from '../wrapper/wrapper.service';
import { HeaderService } from '../header/header.service';

import { LayoutStore } from '../layout.store';

import { AnimationEvent } from '../../animations/animations.interface';
import { removeListeners, removeSubscriptions } from '../../helpers';

import { SidebarLeftToggleDirective } from './sidebar-left.directive';
import { TranslateService } from '@ngx-translate/core';

export interface Item {
  id: number;
  parentId: number;
  label: any;
  route?: string;
  iconClasses?: string;
  children?: Array<Item>;
  isActive?: boolean;
  isCollapsed?: boolean;
  disableCollapse?: boolean;
}

export type Items = Array<Item>;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'rv-layout-sidebar-left',
  styleUrls: ['./sidebar-left.component.css'],
  templateUrl: './sidebar-left.component.html',
})
export class SidebarLeftComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  public menu: Array<any>;
  public sidebarHeight: number;
  public sidebarOverflow: string;
  @Input() permissions: any;
  @Input() currentLang: any = 'en_EN';
  private layout: string;
  private isSidebarLeftCollapsed: boolean;
  private isSidebarLeftExpandOnOver: boolean;
  private isSidebarLeftMouseOver: boolean;
  private windowInnerWidth: number;
  private windowInnerHeight: number;
  private collapsedItems: Items = [];
  private activatedItems: Items = [];
  private toggleListeners: Array<Function> = [];
  private listeners: Array<Function> = [];
  private itemsByIds: { [propKey: number]: Item } = {};
  private runningAnimations = 0;
  private subscriptions = [];
  private activeUrl: String;
  private initialized: boolean;
  @Input() approvalCount: boolean;
  @ViewChild('sidebarElement', { static: true })
  public sidebarElement: ElementRef;

  @ViewChildren(SidebarLeftToggleDirective)
  public sidebarLeftToggleDirectives: QueryList<SidebarLeftToggleDirective>;

  /**
   * @method constructor
   * @param  changeDetectorRef  [description]
   * @param  layoutStore        [description]
   * @param  ngZone             [description]
   * @param  renderer2          [description]
   * @param  router             [description]
   * @param  routingService     [description]
   * @param  wrapperService     [description]
   * @param  headerService      [description]
   */

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private layoutStore: LayoutStore,
    private ngZone: NgZone,
    private renderer2: Renderer2,
    private translate: TranslateService,
    private router: Router,
    private routingService: RoutingService,
    private wrapperService: WrapperService,
    private headerService: HeaderService,
  ) {}

  /**
   * @method ngOnInit
   */
  ngOnInit() {
    this.permissions = this.permissions.filter(item => {
      if (item.read || item.write || item.update || item.delete) {
        return item;
      }
    });
    this.subscriptions.push(
      this.layoutStore.sidebarLeftMenu.subscribe(value => {
        this.menu = value;
        if (this.menu) {
          this.menu = this.recursiveMenuLoad(this.menu);
          this.menu = this.recursiveMenuLoad(this.menu);
          this.menu = this.recursiveMenuLoad(this.menu);
        }
        this.monkeyPatchMenu(this.menu);
        if (this.initialized) {
          this.setMenuListeners(this.activeUrl);
          this.setSidebarListeners();
          this.setMenuTogglesListeners();
        }
        this.initialized = true;
      }),
    );
    this.subscriptions.push(
      this.layoutStore.sidebarLeftMenuActiveUrl.subscribe(value => {
        this.activeUrl = value;
        this.setMenuListeners(value);
      }),
    );
    this.subscriptions.push(
      this.routingService.events.subscribe((event: RouterEvent) => {
        if (event instanceof NavigationEnd) {
          this.activeUrl = event.url;
          this.setMenuListeners(event.url);
        }
      }),
    );

    this.setSidebarListeners();
  }

  public recursiveMenuLoad(data) {
    return data
      .map(item => {
        if (item.label === 'Approvals') {
          item['count'] = this.approvalCount;
        }
        if (item.children && item.children.length === 0) {
          return undefined;
        } else if (!item.children && item.id && item.id !== 'link_dashboard') {
          const output = this.permissions.find(permission => {
            return item.id === permission.id;
          });
          if (output) {
            return item;
          } else return undefined;
        }
        if ('children' in item && item.children.length !== 0) {
          item.children = this.recursiveMenuLoad(item.children);
        }
        return item;
      })
      .filter(t => t);
  }

  /**
   * @method ngAfterViewInit
   */
  ngAfterViewInit() {
    this.setMenuTogglesListeners();
    this.checkMenuWithoutChildren();
  }

  ngOnChanges() {
    this.translate.setDefaultLang(this.currentLang);
  }

  /**
   * @method ngOnDestroy
   */
  ngOnDestroy() {
    this.subscriptions = removeSubscriptions(this.subscriptions);
    this.listeners = removeListeners(this.listeners);
    this.toggleListeners = removeListeners(this.toggleListeners);
  }

  /**
   * [setSidebarListeners description]
   * @method setSidebarListeners
   */
  setSidebarListeners(): void {
    this.subscriptions.push(
      this.layoutStore.layout.subscribe((value: string) => {
        this.layout = value;
        this.setSidebarHeight();
      }),
    );

    this.subscriptions.push(
      this.layoutStore.windowInnerHeight.subscribe((value: number) => {
        this.windowInnerHeight = value;
        this.setSidebarHeight();
      }),
    );

    this.subscriptions.push(
      this.layoutStore.sidebarLeftMenu.subscribe(() => {
        this.changeDetectorRef.detectChanges();
      }),
    );

    this.ngZone.runOutsideAngular(() => {
      this.listeners.push(
        this.renderer2.listen(this.sidebarElement.nativeElement, 'mouseenter', () => {
          this.layoutStore.sidebarLeftMouseOver(true);
        }),
      );
      this.listeners.push(
        this.renderer2.listen(this.sidebarElement.nativeElement, 'mouseleave', () => {
          this.layoutStore.sidebarLeftMouseOver(false);
        }),
      );
    });

    this.subscriptions.push(
      this.layoutStore.windowInnerWidth.subscribe((value: number) => {
        this.windowInnerWidth = value;
        if (!this.isSidebarLeftCollapsed && this.windowInnerWidth <= 767) {
          this.layoutStore.sidebarLeftCollapsed(true);
        } else if (
          this.windowInnerWidth > 767 &&
          this.isSidebarLeftCollapsed &&
          !this.isSidebarLeftExpandOnOver
        ) {
          this.layoutStore.sidebarLeftCollapsed(false);
        }
      }),
    );

    this.subscriptions.push(
      this.layoutStore.isSidebarLeftMouseOver.subscribe((value: boolean) => {
        this.isSidebarLeftMouseOver = value;
        if (this.isSidebarLeftExpandOnOver) {
          this.layoutStore.sidebarLeftCollapsed(!value);
        }
      }),
    );

    this.subscriptions.push(
      this.layoutStore.isSidebarLeftExpandOnOver.subscribe((value: boolean) => {
        this.isSidebarLeftExpandOnOver = value;
        if (this.windowInnerWidth > 767 && this.isSidebarLeftCollapsed !== undefined) {
          this.layoutStore.sidebarLeftCollapsed(value);
        }
      }),
    );

    this.subscriptions.push(
      this.layoutStore.isSidebarLeftCollapsed.subscribe((value: boolean) => {
        this.isSidebarLeftCollapsed = value;
        if (this.windowInnerWidth <= 767) {
          if (value) {
            this.renderer2.removeClass(
              this.wrapperService.wrapperElementRef.nativeElement,
              'sidebar-open',
            );
          } else {
            this.renderer2.addClass(
              this.wrapperService.wrapperElementRef.nativeElement,
              'sidebar-open',
            );
          }
        } else {
          if (this.isSidebarLeftExpandOnOver && !this.isSidebarLeftMouseOver && !value) {
            this.layoutStore.sidebarLeftExpandOnOver(false);
          }
          if (value) {
            this.renderer2.addClass(
              this.wrapperService.wrapperElementRef.nativeElement,
              'sidebar-collapse',
            );
            if (this.isSidebarLeftExpandOnOver) {
              this.renderer2.removeClass(
                this.wrapperService.wrapperElementRef.nativeElement,
                'sidebar-expanded-on-hover',
              );
            }
          } else {
            this.renderer2.removeClass(
              this.wrapperService.wrapperElementRef.nativeElement,
              'sidebar-collapse',
            );
            if (this.isSidebarLeftExpandOnOver) {
              this.renderer2.addClass(
                this.wrapperService.wrapperElementRef.nativeElement,
                'sidebar-expanded-on-hover',
              );
            }
          }
        }
      }),
    );

    this.subscriptions.push(
      this.layoutStore.isSidebarLeftMini.subscribe((value: boolean) => {
        if (value) {
          this.renderer2.addClass(
            this.wrapperService.wrapperElementRef.nativeElement,
            'sidebar-mini',
          );
        } else {
          this.renderer2.removeClass(
            this.wrapperService.wrapperElementRef.nativeElement,
            'sidebar-mini',
          );
        }
      }),
    );
  }

  /**
   * [setMenuListeners description]
   * @method setMenuListeners
   */
  setMenuListeners(url): void {
    if (url === '/') {
      this.activeItems(url);
      this.changeDetectorRef.detectChanges();
    } else {
      const primaryOutlet = this.router.parseUrl(url).root.children[PRIMARY_OUTLET];
      if (primaryOutlet) {
        this.activeItems(primaryOutlet.toString());
        this.changeDetectorRef.detectChanges();
      }
    }
    if (this.windowInnerWidth <= 767 || this.isSidebarLeftExpandOnOver) {
      this.layoutStore.sidebarLeftCollapsed(true);
    }
  }

  /**
   * [getIconClasses description]
   * @method getIconClasses
   * @param item [description]
   * @return [description]
   */
  public getIconClasses(item: Item): string {
    if (item.iconClasses || item.iconClasses === '') {
      return item.iconClasses;
    } else {
      return '';
    }
  }

  /**
   * [visibilityStateStart description]
   * @method visibilityStateStart
   * @param event [description]
   */
  public visibilityStateStart(event: AnimationEvent): void {
    this.runningAnimations++;
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.runningAnimations--;
        if (!this.runningAnimations) {
          this.layoutStore.setSidebarLeftElementHeight(
            this.sidebarElement.nativeElement.offsetHeight,
          );
        }
      }, event.totalTime);
    });
  }

  /**
   * [uncollapseItemParents description]
   * @method uncollapseItemParents
   * @param item           [description]
   * @param isActive       [description]
   */
  private uncollapseItemParents(item: Item, isActive = false): void {
    if (isActive) {
      item.isActive = true;
      this.activatedItems.push(item);
    }
    item.isCollapsed = false;
    this.collapsedItems.push(item);
    if (item.parentId) {
      this.uncollapseItemParents(this.itemsByIds[item.parentId], isActive);
    }
  }

  /**
   * [findItemsByUrl description]
   * @method findItemsByUrl
   * @param url   [description]
   * @param items [description]
   * @param returnItems [description]
   * @return [description]
   */
  private findItemsByUrl(url: string, items: Items, returnItems: Items = []): Items {
    items.forEach((item: Item) => {
      if (url === 'routing/rule-engine/workflow') {
        url = 'routing/rule/workflow';
      } else if (url === 'routing/workflow-new/create') {
        url = 'routing/workflow-new';
      } else if (url === 'routing/l2-configuration/create') {
        url = 'routing/l2-configuration';
      } else if (url === '/') {
        url = '/';
      } else if (url === 'deployment/create-schedule-deployment') {
        url = 'deployment/deployment-schedule';
      } else if (url === 'routing/ruletags/create') {
        url = 'routing/ruletags';
      } else if ('look-up-configuration/detail'.includes(url)) {
        url = 'look-up-configuration';
      } else if ('routing/ruletags/edit'.includes(url)) {
        url = 'routing/ruletags';
      } else if ('routing/workflow-new/edit'.includes(url)) {
        url = 'routing/workflow-new';
      } else if (url === 'routing/rule-engine/route') {
        url = 'routing/rule/destination';
      } else if (url === 'routing/schedule-router/create') {
        url = 'routing/schedule-router';
      } else if (url === 'routing/multihop-services/create') {
        url = 'routing/multihop-services';
      } else if ('routing/multihop-services/edit'.includes(url)) {
        url = 'routing/multihop-services';
      } else if (url === 'routing/processor-adapter/create') {
        url = 'routing/processor-adapter';
      } else if ('routing/processor-adapter/edit'.includes(url)) {
        url = 'routing/processor-adapter';
      } else if ('magic/create'.includes(url)) {
        url = 'magic';
      } else if (url === 'adapter-configuration/imf') {
        url = 'adapter-configuration/imf';
      } else if (url === 'monitoring') {
        url = '/monitoring';
      } else if (url === 'export-list/create-entities') {
        url = 'export-list';
      } else if (url === 'extractor-ui') {
        url = '/extractor-ui';
      } else if ('export-list/view-details'.includes(url)) {
        url = 'export-list';
      } else if ('deployment/edit-schedule-deployment'.includes(url)) {
        url = 'deployment/deployment-schedule';
      }
      const output = url.split('/');
      const len = output.length;
      if (len >= 3 && output[0] === 'routing') {
        url = output[0] + '/' + output[1] + '/' + output[2];
      } else if (len >= 2) {
        url = output[0] + '/' + output[1];
      }
      if (item.route === url) {
        returnItems.push(item);
      } else if (item.children) {
        this.findItemsByUrl(url, item.children, returnItems);
      }
    });
    return returnItems;
  }

  /**
   * [activeItems description]
   * @method activeItems
   * @param url [description]
   */
  private activeItems(url: string): void {
    this.activatedItems.forEach((item: Item) => {
      item.isActive = false;
    });
    this.activatedItems = [];

    this.collapsedItems.forEach((item: Item) => {
      item.isActive = false;
      item.isCollapsed = true;
    });
    this.collapsedItems = [];

    const items = this.findItemsByUrl(url, this.menu);
    items.forEach(item => {
      item.isActive = true;
      this.uncollapseItemParents(item, true);
      this.activatedItems.push(item);
    });
  }

  /**
   * [monkeyPatchMenu description]
   * @method monkeyPatchMenu
   * @param items    [description]
   * @param parentId [description]
   */
  private monkeyPatchMenu(items: Items, parentId?: number): void {
    items.forEach((item: Item, index: number) => {
      item.id = parentId ? Number(parentId + '' + (index + 1)) : index + 1;
      if (parentId) {
        item.parentId = parentId;
      }
      if (!item.disableCollapse) {
        item.isCollapsed = true;
      }
      item.isActive = false;
      if (parentId || item.children) {
        this.itemsByIds[item.id] = item;
      }
      if (item.children) {
        this.monkeyPatchMenu(item.children, item.id);
      }
    });
  }

  /**
   * [setMenuTogglesListeners description]
   * @method setMenuTogglesListeners
   */
  private setMenuTogglesListeners(): void {
    this.toggleListeners = removeListeners(this.toggleListeners);
    this.ngZone.runOutsideAngular(() => {
      this.sidebarLeftToggleDirectives.forEach((menuToggle: SidebarLeftToggleDirective) => {
        this.toggleListeners.push(
          this.renderer2.listen(menuToggle.elementRef.nativeElement, 'click', event => {
            event.preventDefault();
            if (menuToggle.item.isCollapsed) {
              this.collapsedItems.forEach((item: Item) => {
                if (!item.disableCollapse) {
                  item.isCollapsed = true;
                }
              });
              this.collapsedItems = [];
              this.uncollapseItemParents(menuToggle.item);
            } else {
              menuToggle.item.isCollapsed = !menuToggle.item.isCollapsed;
            }
            this.changeDetectorRef.detectChanges();
          }),
        );
      });
    });
  }

  /**
   * [checkMenuWithoutChildren description]
   * @method checkMenuWithoutChildren
   */
  private checkMenuWithoutChildren(): void {
    let menuHaveChildren;
    this.menu.forEach((item: Item) => {
      if (item.children) {
        return (menuHaveChildren = true);
      }
    });
    if (!menuHaveChildren) {
      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          this.layoutStore.setSidebarLeftElementHeight(
            this.sidebarElement.nativeElement.offsetHeight,
          );
        });
      });
    }
  }

  /**
   * [setSidebarHeight description]
   * @method setSidebarHeight
   */
  private setSidebarHeight(): void {
    if (this.layout === 'fixed') {
      const height = this.windowInnerHeight - this.headerService.offsetHeight;
      if (height && height !== this.sidebarHeight) {
        this.sidebarHeight = height;
        this.sidebarOverflow = 'auto';
        this.changeDetectorRef.detectChanges();
      }
    } else if (this.sidebarHeight) {
      this.sidebarOverflow = this.sidebarHeight = null;
      this.changeDetectorRef.detectChanges();
    }
  }

  navigate(link) {
    this.router.navigate([link]);
  }
}
