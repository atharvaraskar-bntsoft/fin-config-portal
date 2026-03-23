import { Utils } from 'src/utils';
import { Injectable } from '@angular/core';
import { IHeaders } from '@app/models/l1-adapter.interface';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs/internal/Observable';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { I } from '@angular/cdk/keycodes';

@Injectable({
  providedIn: 'root',
})
export class AdapterCommonService {
  constructor(private translate: TranslateService) { }

  public fetchSchemaHeaders(isSoap?: boolean): Observable<any> {
    let headers: IHeaders[] = [];
    return this.translate
      .get(['FIELD_ID', 'FIELD_NAMES', 'LENGTH', 'TYPE', 'PAD', 'FIELD_NAME', 'FIELD_VALUE'])
      .pipe(
        map(res => {
          if (res) {
            if (isSoap) {
              headers = [{ key: res.FIELD_NAME }, { key: res.FIELD_VALUE }];
              return headers;
            }
            headers = [
              { key: res.FIELD_ID, width: '6%' },
              { key: res.FIELD_NAMES, width: '25%' },
              { key: res.LENGTH, width: '10%' },
              { key: res.TYPE, width: '10%' },
              { key: res.PAD, width: '20%' },
            ];
            return headers;
          }
        }),
      );
  }

  public saveData(adapterData: any, template: string, name: string, tabIndex: any, isEdit: boolean) {
    adapterData.masterData.adapterDto.standardMessageSpecification.messageStandard = template
      ? template
      : null;
    adapterData.masterData.adapterDto.name = name ? name : null;
    adapterData.masterData.adapterDto.adapterId = Utils.schemaSlugify(name);
    adapterData.masterData.tabIndex = tabIndex;
    if (isEdit) {
     // adapterData.networkData.persistRequired = 1;
      adapterData.schemaData.persistRequired = 1;
      if (adapterData.transformData.requestMapping) {
        adapterData.transformData.persistRequired = 1;
      }
    }
    adapterData.schemaData.persistRequired = 1;
    return adapterData;
  }

  public renderItem(
    schemaData: any,
    adapterData: any,
    rows: any,
    rowsResponse: any,
    totals: number,
    resTotals:number,
    loading: boolean,
  ) {
    let output = null;
    let resOutput = null;
    if(adapterData.networkData.properties.multiPackager){
        schemaData = adapterData.schemaData;
        if(schemaData.schema){
          output = JSON.parse(schemaData.schema);
        }
        if(schemaData.responseSchema){
           resOutput = JSON.parse(schemaData.responseSchema);
        }
        if (output) {
            rows = [...output.template.field];
            totals = rows.length;
        }
        if (resOutput) {
            rowsResponse = [...resOutput.template.field];
            resTotals = rowsResponse.length;
        }
   }else{
        schemaData = adapterData.schemaData;
        let output = JSON.parse(schemaData.schema);
                if (output.template) {
                rows = [...output.template.field];
                rowsResponse = [...output.template.field];
                totals = rows.length;
                resTotals = rows.length;
            }
       }
    loading = false;
    return { schemaData, rows, rowsResponse ,totals, resTotals ,loading };
  }

  isTopAllowed({ field }): boolean {
    const a = ['state.machine.id', 'tcp.ssl.keystore.path'];
    if (a.includes(field)) return true;
  }

  public patternFormat(format, type) {
    if (format) {
      const pattern = format.split(')');
      if (!pattern[1] && type === 'alpha') {
        return `${pattern[0]}){3,100}`;
      } else if (type === 'int' && !pattern[1]) {
        return `${pattern[0]}){1,100}`;
      } else {
        return format;
      }
    }
  }

  public isF1Valid(field: string, infoForm) {
    if (infoForm) {
      return !infoForm.controls[field].valid && infoForm.controls[field].touched;
    } else {
      return false;
    }
  }

  public displayF1FieldCss(field: string, infoForm) {
    return {
      'has-error': this.isF1Valid(field, infoForm),
      'has-feedback': this.isF1Valid(field, infoForm),
    };
  }

  public formatName(data) {
    return data.listvalues.join(' or ');
  }

  public checkFileType(data) {
    if (data.listvalues && data.listvalues.length) {
      return data.listvalues.join().toLowerCase();
    } else {
      return '.jks';
    }
  }

  public getToolTipMessage(data) {
    if (data.fileName) {
      return 'File Uploaded';
    } else if (data.listvalues && data.listvalues.length) {
      return 'Attach' + data.listvalues.join(' or ') + ' file format only';
    } else if (data.listvalues == null) {
      return 'Attach any file format';
    }
  }

  public getRenderData(netWorkDataProps, type: 'network' | 'message') {
    return netWorkDataProps.map(el => {
      el.mtype = type;
      el.custom = el.custom === 2 ? el.custom : 1;
      el.field = el.field.replaceAll(el.mtype + '--', '');
      el.field = `${el.mtype}--${el.field}`;
      return el;
    });
  }

  public dataTypeFilter(data, typeFilter: string) {
    return data
      .map(item => {
        if (item.value !== '' && item.mtype === typeFilter) {
          item.field = item.field.replaceAll(item.mtype + '--', '');
          delete item.mtype;
          delete item.custom;
          return item;
        }
      })
      .filter(item => item);
  }

  public validateAllF1Fields(formGroup: UntypedFormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.controls[field];
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof UntypedFormGroup) {
        this.validateAllF1Fields(control);
      }
    });
  }

  public togglePasswordField() {
    const x = document.getElementById('myInput') as HTMLInputElement;
    if (x.type === 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
  }

  public generateFinalData(arrayOne: any[], arrayTwo: any[], formObj: any) {
    const finalData = [...arrayOne, ...arrayTwo].sort((a, b) => b.custom - a.custom);
    finalData.forEach(el => {
      const validation = [];
      if (el.mandatory) {
        validation.push(Validators.required);
      } else {
        el.format = null;
      }
      el.value = el.value;
      el.field = el.field.replaceAll(el.mtype + '--', '');
      el.field = `${el.mtype}--${el.field}`;
      formObj[el.field] = new UntypedFormControl(el.value, validation);
    });
    return finalData;
  }

  public addAndRemoveJarFile(properties, adapterDataMap) {
    properties = properties.filter(x => x.field !== 'custom.jar.files.id' && x.field !== 'network--custom.jar.files.id');
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
}
