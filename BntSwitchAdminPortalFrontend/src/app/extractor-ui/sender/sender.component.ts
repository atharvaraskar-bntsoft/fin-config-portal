import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdapterCommonService } from '@app/services/adapter-common.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { AddSenderPropertyComponent } from './add-sender-property/add-sender-property.component';

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.scss']
})

export class SenderComponent implements OnInit {

  @Output() senderForExtractor: EventEmitter<any> = new EventEmitter();
  @Input() initialJson: any;
  public loading = false;
  public currentLang: string;

  public senderData: any = [];
  public rows: any = [];
  public tableSize = 'small';
  public totals = 0;
  confirmModal?: NzModalRef;

  constructor(
    public adpaterCommonService: AdapterCommonService,
    private dialog: MatDialog,
    protected router: Router,
  ) {

  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.initialJson) {
      this.editData()
    }
  }

  editData() {
    this.senderData = this.initialJson.details.etlJson.senders;
    this.renderItem();
  }

  public renderItem() {
    this.rows = [...this.senderData];
    this.totals = this.rows.length;
    this.senderForExtractor.emit(this.rows);
  }

  public addSender() {
    this.dialog
      .open(AddSenderPropertyComponent, {
        data: {
          senderData: this.senderData,
          renderItem: this.renderItem,
        },
        width: '670px',
      })
      .afterClosed()
      .subscribe(res => {
        if (res === 'success') {
          this.renderItem();
        }
      });
  }

  removeItem(index: number) {
    this.senderData.splice(index, 1);
    this.renderItem();
  }

  editItem(data: any, index: number) {
    this.dialog
      .open(AddSenderPropertyComponent, {
        data: {
          senderData: this.senderData,
          renderItem: this.renderItem,
          currentData: data,
          index: index,
          editItem: true,
        },
        width: '670px',
      })
      .afterClosed()
      .subscribe(res => {
        if (res === 'success') {
          this.renderItem();
        }
      });
  }


}
