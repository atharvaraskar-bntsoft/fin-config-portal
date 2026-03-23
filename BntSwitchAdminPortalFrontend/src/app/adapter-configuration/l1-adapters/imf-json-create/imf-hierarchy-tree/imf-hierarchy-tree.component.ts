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
  xmlAttributes?: IMFNode[];
  fieldsType?: string;
}

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
declare var jQuery: any;

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
  @Input() source = 'request';
  @Input() name: string
  @Input() readOnlyFlag = false;
  @Input() xmlOverHttp: boolean = false;
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

  xmlAttributesIndex: number = null;

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
      xmlAttributes: node.xmlAttributes,
      pattern: node.pattern,
      nodeAdded: node.nodeAdded,
      fieldsType: node.fieldsType
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
        if (res.payload['xmlType'] == 'xmlHttp') {
          this.handleXmlAttributesInsertion(res.payload, res.actions);
        }
        this.isItemForEdit = false;
      } else if (res.actions === IMFTableButtonActions.SUBMIT) {
        if (!this.isItemForEdit) {
          if (this.isNestedField && this.currentSelectedNode) {
            this.handleNestedNodeInsertion(this.currentSelectedNode, res.payload);
          } else if (this.currentSelectedNode && res.payload['xmlType'] === 'xmlHttp') {
            this.handleXmlAttributesInsertion(res.payload, res.actions);
          } else if (this.currentSelectedNode) {
            this.handleNodeInsertion(res.payload);
          }
        } else {
          // update the Item at Specific Index;
          if(res.payload['xmlType'] == 'xmlHttp') {
            this.handleXmlAttributesInsertion(res.payload, res.actions);
          } else {
            this.updateEditedNode(res.payload);
          }
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
      const copiedAttributes = this.dataSource.attributes;
      if (this.source == 'request') {
        this.flatDataSource.data = this.setRequestIMFField(copiedAttributes);
      } else if (this.source == 'response') {
        this.flatDataSource.data = this.setResponseIMFField(copiedAttributes);
      }
    }
  }

  /**
   * Handles XML Attributes insertion
   * Handles XML Attributes insertion & updation
    * @param node
    * @param newIMFNode
  */
   private handleXmlAttributesInsertion(newIMFNode: IMFNode, actions: any): void {
    const { index } = this.getImfIndex(this.currentSelectedNode);
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
          for (let item of obj.attributes) {
            if (item.name === this.currentSelectedNode.name || item.fieldName === this.currentSelectedNode.fieldName) {
              if (item['xmlAttributes'] && item['xmlAttributes'].length > 0) {
                let xmlUnique = true;
                if(actions !== 2){
                    item.xmlAttributes.forEach(xmlitem => {
                        delete xmlitem.name;
                        delete xmlitem.xmlType;
                        if(xmlitem.fieldName.trim() === newIMFNode.fieldName.trim()){
                            xmlUnique = false;
                            this.alertService.responseMessage({
                                status: 'failure',
                                message: 'Xml attributes name should be unique',
                            });
                        }
                    });
                }
                let el = item['xmlAttributes'].find(ele => ele.name === newIMFNode.name || ele.fieldName === newIMFNode.fieldName);
                if (el) {
                  if (actions === 2) {
                    let deleteIndex = item['xmlAttributes'].findIndex(e => e.fieldName === newIMFNode.fieldName);
                    item['xmlAttributes'].splice(deleteIndex, 1);
                    this.alertService.responseMessage({
                      status: 'success',
                      message: 'Item Delete Successfully',
                    });
                  }else if(actions === 0)  {
                  if (this.isItemForEdit) {
                    // for update
                    this.isItemForEdit = false;
                    if(xmlUnique){
                        item['xmlAttributes'].splice(this.xmlAttributesIndex, 1, newIMFNode);
                        this.alertService.responseMessage({
                        status: 'success',
                        message: 'Item Updated Successfully',
                        });
                   }
                  } else {
                    if(xmlUnique){
                        item['xmlAttributes'].push(newIMFNode);
                        this.alertService.responseMessage({
                        status: 'success',
                        message: 'Item Saved Successfully',
                        });
                     }
                  }
                }
               }
              } else {
                item['xmlAttributes'] = [];
                    item['xmlAttributes'].push(newIMFNode);
                    this.alertService.responseMessage({
                    status: 'success',
                    message: 'Item Saved Successfully',
                    });
              }
            }
          }
        }
      }
    });
    this.currentAttributeRef(false);
    this.expandNode();
  }

  /**
   * Updates edited node
   * @param payload
   */
  private updateEditedNode(payload) {
    const { index } = this.getImfIndex(this.currentSelectedNode);
    let obj: any = {};
    let isObj = false;
    //this.isItemForEdit = false;
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
        el = obj.attributes
        .filter(
          ele =>
            (ele.name === payload.fieldName || ele.fieldName === payload.fieldName) &&
            ele.fieldType === payload.fieldType,
        )
        .filter(
          ele =>
            ele.name !== this.currentSelectedNode.name ||
            ele.fieldName !== this.currentSelectedNode.fieldName,
        );
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
  private handleNodeInsertion(newIMFNode: IMFNode): void {
    const { index } = this.getImfIndex(this.currentSelectedNode);
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
          if (newIMFNode.type === 'fields') {
              el = obj.attributes.find(
                elment => elment.name === newIMFNode.name || elment.fieldName === newIMFNode.name,
              );
            }else{

              el = obj.attributes.find(
                elment =>
                  elment.name === newIMFNode.fieldName || elment.fieldName === newIMFNode.fieldName,
              );
            }
          if (el) {
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
    const { index } = this.getImfIndex(item);
    if (item.attributes && item.attributes.length > 0) {
      let el;
      if (newItem.type === 'fields') {
          el = item.attributes.find(
            elment => elment.name === newItem.name || elment.fieldName === newItem.name,
          );
          } else{
          el = item.attributes.find(
            elment => elment.name === newItem.fieldName || elment.fieldName === newItem.fieldName,
          );
      }
      if (el) {
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
           if (newItem.type === 'fields') {
              el = item.attributes.find(
                elment => elment.name === newItem.name || elment.fieldName === newItem.name,
              );
           }else{
              el = item.attributes.find(
                elment =>
                  elment.name === newItem.fieldName || elment.fieldName === newItem.fieldName,
              );
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
    node.type = node.type ? node.type : 'field';
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
    if (this.dataSource.attributes && this.dataSource.attributes.length > 0) {
      this.dataSource.attributes = this.childIdentity(this.dataSource.attributes, 0);
      const copiedAttributes = JSON.parse(JSON.stringify(this.dataSource.attributes));
      if (this.source == 'request') {
        this.flatDataSource.data = this.setRequestIMFField(copiedAttributes);
      } else if (this.source == 'response') {
        this.flatDataSource.data = this.setResponseIMFField(copiedAttributes);
      }
    }

    if (changes.revertChanges && changes.revertChanges.currentValue) {
      const copiedAttributes = JSON.parse(JSON.stringify(this.dataSource.attributes));
      if (this.source == 'request') {
        this.flatDataSource.data = this.setRequestIMFField(copiedAttributes);
      } else if (this.source == 'response') {
        this.flatDataSource.data = this.setResponseIMFField(copiedAttributes);
      }
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
    jQuery("div.mat-menu-panel").closest(".cdk-overlay-container").css('z-index', '1001');
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
   * Adds fields
   * @param item
   */
  addXmlAttribute(item) {
    this.isItemForEdit = false;
    item.nodeAdded = true;
    this.subscribeService.updateSelectedIMF({ type: 'field',xmlType:'xmlHttp' , fieldType: 'STRING' });
    this.currentSelectedNode = item;
  }

  onClickXmlAtt(node: any, xml: any, index: number) {
    this.xmlAttributesIndex = index;
    this.isItemForEdit = true;
    xml['xmlType'] = 'xmlHttp';
    this.subscribeService.updateSelectedIMF(xml);
    this.currentSelectedNode = node;
    if (node.fieldName !== 'IMF' && this.isSelectedNodes) {
      this.removeSelectedClasses();
    }
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
    const { index } = this.getImfIndex(item);
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
    this.treeControl.expand(this.treeControl.dataNodes[0]);
    // this.expandNode();
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
    let sendItems = {};
    sendItems["attributes"] = attributes;
    sendItems["source"] = this.source;
    sendItems["name"] = this.name;
    if (this.source == 'request') {
      this.flatDataSource.data = this.setRequestIMFField(attributes);
      this.subscribeService.sendItems(sendItems);
    } else if (this.source == 'response') {
      this.flatDataSource.data = this.setResponseIMFField(attributes);
      this.subscribeService.sendItems(sendItems);
    }
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
   * Sets request imffield
   * @param attributes
   * @returns
   */
  private setRequestIMFField(attributes) {
    return [
      {
        fieldName: 'incomingPackager',
        type: '',
        attributes
      },
    ];
  }

  /**
   * Sets response imffield
   * @param attributes
   * @returns
   */
  private setResponseIMFField(attributes) {
    return [
      {
        fieldName: 'outgoingPackager',
        type: '',
        attributes
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
    return {
      index
    };
  }

  /**
   * on destroy
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
