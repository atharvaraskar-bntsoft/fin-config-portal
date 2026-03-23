import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { AlertService } from '@app/services/alert.service';

@Component({
  selector: 'app-reversible-dialog',
  templateUrl: './reversible-dialog.component.html',
  styleUrls: ['./reversible-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ReversibleDialogComponent implements OnInit {
  errorCount = 0;
  public jsonData;
  public reversalCondition;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ReversibleDialogComponent>,
    private _alertService: AlertService,
  ) {}

  ngOnInit(): void {
    if (this.data.nodes && (!Array.isArray(this.data.nodes) || this.data.nodes.length > 0)) {
      this.reversalCondition = JSON.parse(JSON.stringify(this.data.nodes));
    }
  }

  deleteElement($) {
    console.log($);
  }

  public getSelectedReversalLeft(index: number) {
    this.data.menuListReversal[index]['status'] = !this.data.menuListReversal[index]['status'];
  }

  public getReversalElement() {
    const selectedItems = this.data.selectedMenuListReversal;
    const selectList = this.data.menuListReversal.filter((listElement: any) => listElement.status);
    this.data.selectedMenuListReversal = selectedItems.concat(selectList);
    this.data.menuListReversal = this.data.menuListReversal.filter(
      (listElement: any) => !listElement.status,
    );
    this.data.selectedMenuListReversal.map((item: any) => (item.status = false));
  }

  public removeReversalElement() {
    const selectedItems = this.data.menuListReversal;
    const selectList = this.data.selectedMenuListReversal.filter(
      (listElement: any) => listElement.status,
    );
    this.data.menuListReversal = selectedItems.concat(selectList);
    this.data.selectedMenuListReversal = this.data.selectedMenuListReversal.filter(
      (listElement: any) => !listElement.status,
    );
    this.data.menuListReversal.map((item: any) => (item.status = false));
    //  this.menuList.sort((a, b) => a['name'].localeCompare(b['name']));
  }

  public getSelectedRightTraversal(index: number) {
    this.data.selectedMenuListReversal = this.data.selectedMenuListReversal.map(it => {
      it.status = false;
      return it;
    });
    this.data.selectedMenuListReversal[index]['status'] =
      !this.data.selectedMenuListReversal[index]['status'];
  }

  public closeReversalModal(operation?: string) {
    this.errorCount = 0;
    const data = JSON.parse(JSON.stringify(this.data.nodes));
    this.checkRulesAvailable(data);
    if (
      operation === 'save' &&
      (!this.data.selectedMenuListReversal.length || !this.data.nodes.length || this.errorCount)
    ) {
      const messages = {
        condn: 'Please Select All the Required Fields from the Condition',
        default: 'Please select all the required conditions and services',
      };
      this._alertService.responseMessage({
        status: 'failure',
        message: this.errorCount ? messages.condn : messages.default,
      });
      return false;
    }
    const services = this.data.selectedMenuListReversal.map(({ name }) => name);
    const result = {
      reverseCondition: this.data.nodes,
      services,
    };
    this.dialogRef.close(result);
  }

  private checkRulesAvailable(params) {
    params.reduce((acc, val) => {
      if (val.group) {
        val.nodes = val.nodes[0].nodes;
      }
      if (val.nodes) {
        this.checkRulesAvailable(val.nodes);
      }
      if (!val.key || !val.relation || !val.value) {
        this.errorCount++;
      }
      delete val.error;
      delete val.validation_Type;
    }, []);
  }
  public getRule(val) {
    if (!this.data.selectedMenuListReversal.length) {
      this._alertService.responseMessage({
        status: 'failure',
        message: 'Please Select all the Required Services',
      });
      return false;
    }
    const services = this.data.selectedMenuListReversal.map(({ name }) => name);
    const result = {
      reverseCondition: val.condition,
      services,
    };
    this.dialogRef.close(result);
  }
}
