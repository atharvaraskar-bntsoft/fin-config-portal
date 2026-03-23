import { Component, OnInit, Input } from '@angular/core';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { MainService } from '../main.service';
import { Utils } from 'src/utils';

@Component({
  selector: 'app-custom-mapper',
  templateUrl: './custom-mapper.component.html',
  styleUrls: ['./custom-mapper.component.css']
})
export class CustomMapperComponent implements OnInit {

  @Input() setCustomMapper: boolean = false;

  @Input() isJarUpload: boolean;
  @Input() fileInfos: any;
  @Input() customMappings: any = [];
  @Input() adapterDataMap: any;
  public selectedTabIndex = 0;
  public selectedTransactionType;
  public isoTransactions: any = [];
  @Input() adapterData: any;
  public showLoader = false;
  jarFileExistWarning: any;

  constructor(private drawerRef: NzDrawerRef<string>,
    private _service: MainService) {

  }

  ngOnInit(): void {
    this.setMapper();
  }

  public uploadFile(event) {
    const fileName = event?.target?.files[0]?.name;
    const isValidName = fileName && Utils.isFileNameExist(this.fileInfos, fileName);
    if (!isValidName) {
      this.showLoader = true;
      this.jarFileExistWarning = null;
      const formData = new FormData();
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e: any) => {
          formData.set('uplodedFile', file);
          formData.set('allowed-file-type', '.jar');
          this._service.upload(formData).subscribe(item => {
            this.showLoader = false;
            if (item && item.status !== 'failure') {
              this.fileInfos.push({ id: item.data.id, name: item.data.name });
            }
          });
        };
      }
    } else {
      this.jarFileExistWarning = `${fileName} Already Exist.`;
    }
  }


  public getJarFileData(map, properties, fileInfos) {
    let output = properties.find(x => x.field === 'custom.jar.files.id' && x.datatype === 'file');
    if (!output && map && map.field === 'custom.jar.files.id') {
      output = map;
    }
    if (output) {
      output = this.addFileAndValue(output, fileInfos);
    }
    return output;
  }
  public addAndRemoveJarFile(properties, adapterDataMap) {
    properties = properties.filter(x => x.field !== 'custom.jar.files.id');
    if (adapterDataMap.fileName && adapterDataMap.value) {
      properties.push(adapterDataMap);
    }
    return properties;
  }
  public addFileAndValue(output, fileInfos) {
    const fileName = [];
    const fileValue = [];
    fileInfos.forEach(item => {
      fileName.push(item.name);
      fileValue.push(item.id);
    });
    output.fileName = fileName.join('|');
    output.value = fileValue.join('|');
    return output;
  }

  closeSetCustomMapper() {
    if (this.adapterData) {
      let output = this.getJarFileData(
        JSON.parse(this.adapterDataMap['custom.jar.files.id']),
        this.adapterData.networkData.properties.network,
        this.fileInfos,
      );
      this.adapterData.networkData.properties.network =
        this.addAndRemoveJarFile(
          this.adapterData.networkData.properties.network,
          output,
        );

      if (this.selectedTabIndex == 0) {
        this.isoTransactions.forEach(transactions => {
          if (transactions.messageIntentifier === this.selectedTransactionType) {
            transactions.request.mappings = transactions.request.mappings.filter(
              item => item.type !== 'custom_mapper',
            );
            this.customMappings = this.customMappings.filter(item => item.className);
            this.customMappings = this.customMappings.push(this.customMappings);
            // transactions.request.mappings.push(...this.customMappings);
          }
        });
      }
    }
    else {
      if (this.isoTransactions) {
        this.isoTransactions.forEach(transactions => {
          if (transactions.messageIntentifier === this.selectedTransactionType) {
            transactions.response.mappings = transactions.response.mappings.filter(
              item => item.type !== 'custom_mapper',
            );


          }
        });
      }
      this.customMappings = this.customMappings.filter(item => item.className);
      // this.customMappings = this.customMappings.push(this.customMappings);

      //this.customMappings = this.customMappings.push(this.customMappings, this.fileInfos);
    }
    // this.setCustomMapper = false;
    this.drawerRef.close({
      setCustomMapper: this.setCustomMapper,
      customMappings: this.customMappings,
      fileInfos: this.fileInfos,
      isJarUpload: this.isJarUpload
    });


  }

  public pushCustomMapperItem() {
    this.customMappings.push({
      type: 'custom_mapper',
      className: null,
      ipc: 'SYSTEM_ERROR',
    });
  }

  public pullCustomMapperItem(i) {
    this.customMappings.splice(i, 1);
  }

  public removeFile(index) {
    this.fileInfos.splice(index, 1);
  }

  setMapper() {
    // this.fileInfos = [];
    const map = JSON.parse(this.adapterDataMap['custom.jar.files.id']);
    if (this.adapterData) {
      const output = this.adapterData.networkData.properties.network.find(
        x => (x.field === 'custom.jar.files.id' || x.field === 'network--custom.jar.files.id') && x.datatype === 'file',
      );
      if (output) {
        this.isJarUpload = true;
        if (output.value !== 'BLANK') {
          const fileName = output.fileName.split('|');
          const fileValue = output.value.split('|');
          fileName.forEach((element, index) => {
            this.fileInfos.push({
              id: fileValue[index],
              name: element,
            });
          });
        }
      }
    }
    else if (map && map.field === 'custom.jar.files.id') {
      this.isJarUpload = true;
    }

    if (this.selectedTabIndex == 0) {
      const output = this.isoTransactions.find(
        transactions => transactions.messageIntentifier === this.selectedTransactionType,
      );

      if (this.customMappings.length == 0) {
        this.customMappings.push({
          type: 'custom_mapper',
          className: null,
          ipc: 'SYSTEM_ERROR',
        });
      }

    }
    else {
      const output = this.isoTransactions.find(
        transactions => transactions.messageIntentifier === this.selectedTransactionType,
      );

      if (this.customMappings.length == 0) {
        this.customMappings.push({
          type: 'custom_mapper',
          className: null,
          ipc: 'SYSTEM_ERROR',
        });
      }
    }
  }
}
