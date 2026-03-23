import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@app/services/alert.service';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ExtractorService } from '../../services/extractor.service';
import { MainService } from '../mapper/main.service';

@Component({
  selector: 'app-extractor-create',
  templateUrl: './extractor-create.component.html',
  styleUrls: []
})
export class ExtractorCreateComponent implements OnInit {
  @Input() constantArray: any;
  isSpinning = false;
  componetDestroyed = new Subject();
  subscription = new Subscription();
  editId: any = null;
  public parsetlJson: any = null;
  public transformJsonList: any = null;
  public parsePackageJson: any = null;
  private subscriptions = []; // for memory leakage
  public initialJson = {
    "jobName": null,
    "jobDesc": null,
    "jobGroup": null,
    "type": null,
    "active": 1,
    "saveDarft": "1",
    "details": {
      "batchMode": null,
      "cronExp": null,
      "batchSize": null,
      "repeatTime": null,
      "imfId": {
        "id": null
      },
      "mapping": null,
      "jobClass": null,
      "packager": null,
      "etlJson": {
        "type": "",
        "reader": {
          "type": null,
          "readFrom": null,
          "readIndex": null,
          "filterCondition": null
        },
        "senders": [],
        "transformer": {
          "type": "jsonTransformer",
          "input": {
            "header": null,
            "mapper": "mapper.json",
            "packager": "packager.json"
          },
          "transformerType": "JSON"
        }
      }
    }
  }

  jobFormEdit: any;
  schemaFormEdit: any;
  senderEdit: any;
  transformEdit: any;

  panels = [
    {
      active: true,
      name: 'Job Configuration (Step 1)',
      disabled: false,
      type: 'job'
    },
    {
      active: false,
      disabled: true,
      name: 'Schema and Condition (Step 2)',
      type: 'schema-condition'
    },
    {
      active: false,
      disabled: true,
      name: 'Transform (Step 3)',
      type: 'transform'
    },
    {
      active: false,
      disabled: true,
      name: 'Sender (Step 4)',
      type: 'sender'
    }
  ];

  public id = null;
  conditionDropDown: any;
  jsonData: [];
  imfId: any;
  //public transformFlag:boolean = false;
  constructor(private _extractorService: ExtractorService,
    public __alertService: AlertService,
    private _router: Router,
    private activeRouter: ActivatedRoute,
    private _service: MainService) { }

  ngOnInit(): void {
    this.getByIdExtract();
  }

  getByIdExtract() {
    this.editId = this.activeRouter.snapshot.params.id;
    if (this.editId) {
      this.isSpinning = true;
      this._extractorService.getByIdExtractor(this.editId)
        .pipe(takeUntil(this.componetDestroyed)).subscribe((item) => {
          this.isSpinning = false;
          if (item && item.status == 'success') {
            this.initialJson = item.data;
            //this.imfId = item.data.details.imfId;
            //this.transformFlag = true;
            this.initialJson.details.packager = JSON.parse(item.data.details.packager);
            this.initialJson.details.etlJson = JSON.parse(item.data.details.etlJson);
            this.initialJson.details.mapping = JSON.parse(item.data.details.mapping);
            if (item.data.details.imfId && item.data.details.imfId?.id) {
              this.getImfData(item.data.details.imfId.id);
            }
            for (let obj of this.panels) {
              obj.disabled = false;
            };
          }
        })
    }
  }


  jobForm(res: any) {
    if (res) {
      this.initialJson.jobName = res.value.jobName;
      this.initialJson.jobGroup = res.value.jobGroup;
      this.initialJson.jobDesc = res.value.jobDesc;
      this.initialJson.type = res.value.type;
      this.initialJson.active = res.value.active;
      this.panels[0].active = false;
      this.panels[1].disabled = false;
      this.panels[1].active = true;
    }
  }

  schemaForm(data: any) {
    if (data && data.packager && data.packager.attributes.length > 0) {
      this.initialJson.details.etlJson.reader.readFrom = data.readFrom;
      this.initialJson.details.batchMode = data.batchMode;
      this.initialJson.details.etlJson.reader.readIndex = data.readIndex;
      this.initialJson.details.batchSize = data.batchSize;
      this.initialJson.details.etlJson.reader.type = data.type;
      this.initialJson.details.packager = data.packager;
      this.transformJsonList = data.packager;
      this.initialJson.details.jobClass = data.class;
      this.initialJson.details.cronExp = data.cronExp;
      this.initialJson.details.imfId = data.imfId;
      this.initialJson.details.repeatTime = data.repeatTime;
      this.initialJson.details.etlJson.reader.filterCondition = data.filterCondition;
      this.conditionDropDown = data.packager.attributes.map(item => {
        return item.name;
      })
      if (data.imfId && data.imfId?.id) {
        this.getImfData(data.imfId.id);
      }
      this.panels[1].active = false;
      this.panels[2].disabled = false;
      this.panels[2].active = true;
    }
  }

  saveTransform(data: any) {
    if (data) {
      this.initialJson.details.mapping = data;
      // this.transformFlag = false;

      this.panels[2].active = false;
      this.panels[3].disabled = false;
      this.panels[3].active = true;
    }
  }

  getSenderData(event: any) {
    this.initialJson.details.etlJson.senders = event;
  }

  getImfData(imfId) {
    if (imfId) {
      this.subscriptions.push(
        this._extractorService.getMessageContextList(imfId).subscribe(item => {
          this.jsonData = item?.data?.messageContextFieldsByVersion;
        }),
      );
    }
  }

  onSubmit(value: any) {
    let finalJSON = JSON.parse(JSON.stringify(this.initialJson));
    finalJSON.details.packager = JSON.stringify(finalJSON.details.packager);
    finalJSON.details.etlJson = JSON.stringify(finalJSON.details.etlJson);
    finalJSON.details.mapping = JSON.stringify(finalJSON.details.mapping);
    finalJSON.saveDarft = "1";
    if (value == 1) {
      finalJSON.saveDarft = "0";
    }
    if (this.editId) {
      finalJSON.id = this.editId
      this._extractorService.putExtractor(finalJSON).pipe(takeUntil(this.componetDestroyed)).subscribe((item) => {
        if (item.status == 'success') {
          this.__alertService.responseMessage({
            status: 'success',
            message: 'Success',
          });
          this._router.navigate(['/extractor-ui']);
        }
        else {
          this.__alertService.responseMessage({
            status: 'failure',
            message: 'Failure',
          });
        }
      })
    }
    else {
      this._extractorService.postExtractor(finalJSON).pipe(takeUntil(this.componetDestroyed)).subscribe((item) => {
        if (item.status == 'success') {
          this.__alertService.responseMessage({
            status: 'success',
            message: 'Success',
          });
          this._router.navigate(['/extractor-ui']);
        }
        else {
          this.__alertService.responseMessage({
            status: 'failure',
            message: 'Failure',
          });
        }
      })
    }
  }

  ngOnDestroy() {
    this.componetDestroyed.next();
    this.componetDestroyed.complete();
    this.componetDestroyed.unsubscribe();
    this.subscription.unsubscribe();
  }
}
