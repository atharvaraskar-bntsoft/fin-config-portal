import {
  SubscribeService,
  ButtonAction,
  IMFTableButtonActions,
} from '@app/services/subscribe.services';
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  SimpleChanges,
  ViewEncapsulation,
  OnDestroy,
} from '@angular/core';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { each } from 'underscore';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatMenuTrigger } from '@angular/material/menu';
import { TSaveMethods } from '../imf-json-create.component';
import { AlertService } from '@app/services/alert.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Utils } from 'src/utils';

export interface IMFNode {
  name?: string;
  type: string;
  alias?: string;
  isHide?: boolean;
  pattern?: string;
  fieldName?: string;
  fieldType?: string;
  isPersist?: boolean;
  isEditable?: boolean;
  isSensitive?: boolean;
  parent?: string;
  valuetype?: string;
  nodeAdded?: boolean;
  attributes?: IMFNode[];
}

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-imf-hierarchy-tree',
  templateUrl: './imf-hierarchy-tree.component.html',
  styleUrls: ['./imf-hierarchy-tree.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ImfHierarchyTreeComponent implements OnInit, OnDestroy {
  @Input() dataSource;
  @Input() revertChanges: boolean;
  @Input() saveMethods: TSaveMethods;
  @Input() versionMethods: TSaveMethods;
  @ViewChild(MatMenuTrigger, { static: true })
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };
  currentSelectedNode;
  isNestedField: boolean;
  isItemForEdit: boolean;
  isSelectedNodes = false;
  public visibleAnimate = false;
  public visible = false;
  subscription: Subscription;
  confirmModal?: NzModalRef;

  /**
   * Transformer  of imf hierarchy tree component
   */
  private _transformer = (node: IMFNode, level: number) => {
    return {
      expandable: !!node.attributes && node.attributes.length > 0,
      name: node.fieldName ? node.fieldName : node.name,
      alias: node.alias,
      type: node.type,
      isPersist: node.isPersist,
      fieldName: node.fieldName,
      isEditable: node.isEditable,
      isHide: node.isHide,
      isSensitive: node.isSensitive,
      level: level,
      fieldType: node.fieldType,
      parent: node.parent,
      attributes: node.attributes,
      pattern: node.pattern,
      nodeAdded: node.nodeAdded,
    };
  };

  public treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable,
  );

  public treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.attributes,
  );

  flatDataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private subscribeService: SubscribeService,
    private alertService: AlertService,
    private modal: NzModalService,
  ) {
    // Invoke action regarding the changes

    this.subscription = this.subscribeService.getButtonAction().subscribe((res: ButtonAction) => {
      if (res.actions === IMFTableButtonActions.DELETE) {
        if (res.payload.parent && this.currentSelectedNode) {
          this.removeNode(this.currentSelectedNode);
        }
        this.isItemForEdit = false;
      } else if (res.actions === IMFTableButtonActions.SUBMIT) {
        if (!this.isItemForEdit) {
          if (this.isNestedField && this.currentSelectedNode) {
            this.handleNestedNodeInsertion(this.currentSelectedNode, res.payload);
          } else if (this.currentSelectedNode) {
            this.handleNodeInsertion(this.currentSelectedNode, res.payload);
          }
        } else {
          // update the Item at Specific Index;
          this.updateEditedNode(res.payload);
        }
      } else if (res.actions === IMFTableButtonActions.CANCEL) {
        // reset all the flag here
        this.isItemForEdit = false;
      }
    });
  }

  /**
   * on init
   */
  ngOnInit() {
    if (this.dataSource.attributes && this.dataSource.attributes.length > 0) {
      this.dataSource.attributes = this.childIdentity(this.dataSource.attributes, 0);
      const copiedAttributes = JSON.parse(JSON.stringify(this.dataSource.attributes));
      this.flatDataSource.data = this.setIMFField(copiedAttributes);
    }
  }

  /**
   * Updates edited node
   * @param payload
   */
  private updateEditedNode(payload) {
    const { index, dataSrc } = this.getImfIndex(this.currentSelectedNode);
    let obj: any = {};
    let isObj = false;
   // this.isItemForEdit = false;
    const data = this.flatDataSource.data;
    index.forEach((element, idx) => {
      element = Number(element);
      if (isObj || Object.keys(obj).length) {
        obj = obj.attributes[element];
      } else {
        isObj = true;
        obj = data[element];
      }
      if (idx === index.length - 2) {
        // same name handling check
        let el;
        switch (payload.type) {
          case 'fields':
            el = obj.attributes
              .filter(ele => ele.name === payload.fieldName || ele.fieldName === payload.fieldName && ele.fieldType === payload.fieldType)
              .filter(
                ele =>
                  ele.name !== this.currentSelectedNode.name ||
                  ele.fieldName !== this.currentSelectedNode.fieldName,
              );
           break;
          default:
            el = obj.attributes
              .filter(ele => ele.name === payload.fieldName || ele.fieldName === payload.fieldName && ele.fieldType === payload.fieldType)
              .filter(
                ele =>
                  ele.name !== this.currentSelectedNode.name ||
                  ele.fieldName !== this.currentSelectedNode.fieldName,
              );
            break;
        }
        if (el.length && !this.isItemForEdit) {
          let name = payload.fieldName || payload.name;
          name = name.length > 25 ? name.slice(0, 23) + '...' : name;
          this.alertService.responseMessage({
            status: 'failure',
            message: 'Field name already exist',
          });
          this.subscribeService.updateSelectedIMF(payload);
          this.isItemForEdit = true;
        } else {
            this.isItemForEdit = false;
          obj.attributes.splice([index[index.length - 1]], 1, payload);
          this.alertService.responseMessage({
            status: 'success',
            message: 'Item Updated Successfully',
          });
        }
      }
    });
    this.currentAttributeRef(false);
    this.expandNode();
  }

  /**
   * Handles node insertion
   * @param node
   * @param newIMFNode
   */
  private handleNodeInsertion(node: IMFNode, newIMFNode: IMFNode): void {
    const { index, dataSrc } = this.getImfIndex(this.currentSelectedNode);
    let obj: any = {};
    let isObj = false;
    const data = this.flatDataSource.data;
    index.forEach((element, idx) => {
      element = Number(element);
      if (isObj || Object.keys(obj).length) {
        obj = obj.attributes[element];
      } else {
        isObj = true;
        obj = data[element];
      }
      if (idx === index.length - 2) {
        if (obj.attributes[index[index.length - 1]]) {
          let el;
          switch (newIMFNode.type) {
            case 'fields':
              el = obj.attributes.find(
                elment => elment.name === newIMFNode.name || elment.fieldName === newIMFNode.name,
              );
              break;
            default:
              el = obj.attributes.find(
                elment =>
                  elment.name === newIMFNode.fieldName || elment.fieldName === newIMFNode.fieldName,
              );
              break;
          }
          if (el) {
            let name = newIMFNode.fieldName || newIMFNode.name;
            name = name.length > 25 ? name.slice(0, 23) + '...' : name;
            this.alertService.responseMessage({
              status: 'failure',
              message: 'Field name already exist',
            });
            this.subscribeService.updateSelectedIMF(newIMFNode);
          } else {
            obj.attributes.splice([index[index.length - 1]], 0, newIMFNode);
            this.alertService.responseMessage({
              status: 'success',
              message: 'Item Saved Successfully',
            });
          }
        }
      }
    });
    this.currentAttributeRef(true);
    this.expandNode();
  }

  /**
   * Handles nested node insertion
   * @param item
   * @param newItem
   */
  private handleNestedNodeInsertion(item, newItem) {
    const { index, dataSrc } = this.getImfIndex(item);
    if (item.attributes && item.attributes.length > 0) {
      let el;
      switch (newItem.type) {
        case 'fields':
          el = item.attributes.find(
            elment => elment.name === newItem.name || elment.fieldName === newItem.name,
          );
          break;
        default:
          el = item.attributes.find(
            elment => elment.name === newItem.fieldName || elment.fieldName === newItem.fieldName,
          );
          break;
      }
      if (el) {
        const name = newItem.fieldName || newItem.name;
        this.alertService.responseMessage({
          status: 'failure',
          message: 'Field name already exist',
        });
      } else {
        item.attributes.push(newItem);
        this.alertService.responseMessage({
          status: 'success',
          message: 'Item Saved Successfully',
        });
      }
    } else {
      let obj: any = {};
      let isObj = false;
      const data = this.flatDataSource.data;
      index.forEach((element, idx) => {
        element = Number(element);
        if (isObj || Object.keys(obj).length) {
          obj = obj.attributes[element];
        } else {
          isObj = true;
          obj = data[element];
        }
        if (idx + 1 === index.length) {
          obj.attributes = [];
          let el;
          switch (newItem.type) {
            case 'fields':
              el = item.attributes.find(
                elment => elment.name === newItem.name || elment.fieldName === newItem.name,
              );
              break;
            default:
              el = item.attributes.find(
                elment =>
                  elment.name === newItem.fieldName || elment.fieldName === newItem.fieldName,
              );
              break;
          }
          if (el) {
            this.alertService.responseMessage({
              status: 'failure',
              message: 'You can not add same field name',
            });
          } else {
            obj.attributes.push(newItem);
            this.alertService.responseMessage({
              status: 'success',
              message: 'Item Saved Successfully',
            });
          }
        }
      });
    }
    this.currentAttributeRef(true);
    this.isNestedField = false;
    const data = this.searchNode(this.currentSelectedNode)[0];
    data['nodeAdded'] = true;
    this.expandNode();
  }

  /**
   * Child identity of imf hierarchy tree component
   */
  public childIdentity = (value, parentVal) => {
    let par = parentVal;
    value.forEach((ele, idx) => {
      ele.parent = `${par}-${idx}`;
      if (ele.attributes && ele.attributes.length > 0) {
        if (typeof ele.attributes === 'object') {
          parentVal = idx;
          this.childIdentity(ele.attributes, `${par}-${idx}`);
        }
      }
    });
    return value;
  };

  /**
   * Determines whether child has
   */
  hasChild = (_: number, node: FlatNode) => node.expandable;

  /**
   * Determines whether click on
   * @param node
   */
  onClick(node) {
    this.isItemForEdit = true;
    this.subscribeService.updateSelectedIMF(node);
    this.currentSelectedNode = node;
    if (node.fieldName !== 'IMF' && this.isSelectedNodes) {
      this.removeSelectedClasses();
    }
  }

  /**
   * on changes
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    // Reverting the changes
    if (changes.revertChanges && changes.revertChanges.currentValue) {
      const copiedAttributes = JSON.parse(JSON.stringify(this.dataSource.attributes));
      this.flatDataSource.data = this.setIMFField(copiedAttributes);
    }
    // Save as draft method
    if (changes.saveMethods && changes.saveMethods.currentValue) {
      this.applyActions(changes.saveMethods);
    }

    // version the modified value
    if (changes.versionMethods && changes.versionMethods.currentValue) {
      this.applyActions(changes.versionMethods);
    }
  }

  updateData = attributes => {
    attributes.forEach(element => {
      if (element.hasOwnProperty('expandable')) {
        delete element.expandable;
        if (element.hasOwnProperty('attributes') && element?.attributes.length > 0) {
          return this.updateData(element?.attributes);
        }
      }
    });
    return attributes;
  };

  /**
   * Applys actions
   * @param changes
   */
  private applyActions(changes) {
    const { reducer, store, currentItem } = changes.currentValue;
    const newData = this.updateData(this.flatDataSource.data[0].attributes);
    console.log('updatedData', newData);
    const data = JSON.stringify({
      attributes: newData,
    });
    currentItem.imf = data;
    store.dispatch(new reducer(currentItem));
  }

  /**
   * Determines whether context menu on
   * @param event
   * @param item
   */
  onContextMenu(event: MouseEvent, item) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem('mouse');
    if (item.name !== 'IMF') {
      this.contextMenu.openMenu();
    }
  }

  /**
   * Adds field
   * @param item
   */
  addField(item) {
    this.isItemForEdit = false;
    item.nodeAdded = true;
    this.subscribeService.updateSelectedIMF({ type: 'field' });
    this.currentSelectedNode = item;
  }

  /**
   * Adds fields
   * @param item
   */
  addFields(item) {
    this.isItemForEdit = false;
    item.nodeAdded = true;
    this.subscribeService.updateSelectedIMF({ type: 'fields' });
    this.currentSelectedNode = item;
  }

  /**
   * Adds nested field
   * @param item
   */
  addNestedField(item) {
    this.removeSelectedClasses();
    item.nodeAdded = true;
    this.isItemForEdit = false;
    this.subscribeService.updateSelectedIMF({ type: 'field' });
    this.currentSelectedNode = item;
    this.isNestedField = true;
    this.isSelectedNodes = true;
  }

  /**
   * Adds nested fields
   * @param item
   */
  addNestedFields(item) {
    this.removeSelectedClasses();
    item.nodeAdded = true;
    this.isItemForEdit = false;
    this.subscribeService.updateSelectedIMF({ type: 'fields' });
    this.currentSelectedNode = item;
    this.isNestedField = true;
    this.isSelectedNodes = true;
  }

  /**
   * Removes node
   * @param item
   */
  removeNode(item) {
    this.isItemForEdit = false;
    const { index, dataSrc, treeLevel } = this.getImfIndex(item);
    let obj: any = {};
    let isObj = false;
    const data = this.flatDataSource.data;
    index.forEach((element, idx) => {
      element = Number(element);
      if (isObj || Object.keys(obj).length) {
        obj = obj.attributes[element];
      } else {
        isObj = true;
        obj = data[element];
      }
      if (idx === index.length - 2) {
        obj.attributes.splice(+index[idx + 1], 1);
        this.alertService.responseMessage({
          status: 'success',
          message: 'Item Deleted Successfully',
        });
      }
    });
    this.currentAttributeRef(true);
    this.cancel();
    this.expandNode();
  }

  /**
   * Removes selected classes
   */
  private removeSelectedClasses() {
    each(this.treeControl.dataNodes, node => (node['nodeAdded'] = false));
    this.isSelectedNodes = false;
  }

  // set the selected class when we successfully add the nested fields;
  /**
   * Searchs node
   * @param node
   * @returns
   */
  private searchNode(node) {
    return this.treeControl.dataNodes.filter(item => item['parent'] === node.parent);
  }

  /**
   * Gets margin
   * @param node
   * @returns
   */
  public getMargin(node) {
    const nodeLevel = this.treeFlattener.getLevel(node);
    return {
      'margin-left': `${nodeLevel * 30}px`,
      'padding-left': nodeLevel ? `${nodeLevel * 5}px` : '5px',
    };
  }

  /**
   * Currents attribute ref
   * @param [isUpdateId]
   */
  private currentAttributeRef(isUpdateId?: boolean): void {
    const { attributes } = this.flatDataSource.data[0];
    if (isUpdateId) {
      this.flatDataSource.data[0].attributes = this.childIdentity(attributes, 0);
    }
    this.flatDataSource.data = this.setIMFField(attributes);
  }

  /**
   * Opens delete dialog
   * @param node
   */
  public openDeleteDialog(node) {
    const name = node.fieldName ? node.fieldName : node.name;
    this.confirmModal = this.modal.confirm({
      nzTitle: Utils.deleteWarning(name),
      nzIconType: 'question-circle',
      nzOnOk: () => {
        this.removeNode(node);
      },
    });
  }

  /**
   * Opens imf hierarchy tree component
   */
  public open(): void {
    document.body.style.overflow = 'hidden';
    this.visible = true;
    setTimeout(() => (this.visibleAnimate = true), 200);
  }

  /**
   * Cancels imf hierarchy tree component
   */
  public cancel(): void {
    document.body.style.overflow = 'auto';
    this.visibleAnimate = false;
    setTimeout(() => (this.visible = false), 100);
  }

  /**
   * Expands node
   */
  private expandNode() {
    const modifiednode = this.treeControl.dataNodes.find(
      ele => ele['parent'] === this.currentSelectedNode.parent,
    );
    this.treeControl.expand(this.treeControl.dataNodes[0]);
    this.treeControl.expand(modifiednode);
  }

  /**
   * Sets imffield
   * @param attributes
   * @returns
   */
  private setIMFField(attributes) {
    return [
      {
        fieldName: 'IMF',
        type: '',
        attributes,
      },
    ];
  }

  /**
   * Gets imf index
   * @param item
   * @returns
   */
  private getImfIndex(item) {
    const index = item.parent.split('-');
    const dataSrc = this.dataSource.attributes.slice();
    const treeLevel = this.treeControl.getLevel(item);
    return {
      index,
      dataSrc,
      treeLevel,
    };
  }

  /**
   * on destroy
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
