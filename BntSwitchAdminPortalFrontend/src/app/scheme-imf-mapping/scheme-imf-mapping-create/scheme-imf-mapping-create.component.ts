import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../store/state/app.state';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import {
  GetScheme,
  GetField,
  GetMap,
  GetIMF,
  GetIPC,
  SchemeImfMapperSave,
  GetElFunction,
  GetIMFVersion,
} from '@app/store/actions/scheme-imf-mapper.action';
import {
  selectScheme,
  selectField,
  selectMap,
  selectIMF,
  selectIPC,
  selectElFunction,
  selectGetIMFVersion,
} from '@app/store/selectors/scheme-imf-mapper.selectors';
import { takeUntil } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'scheme-imf-mapping-create',
  templateUrl: './scheme-imf-mapping-create.component.html',
  styleUrls: ['./scheme-imf-mapping-create.component.scss'],
})
export class SchemeImfMappingCreateComponent implements OnInit {
  public schemeList: any;
  public fieldList: any;
  public typeList = [];
  public validationList: any;
  public transformList: any;
  public conditionalList: any;
  public serviceList: any;
  public assingeValueList: any;
  public adapterDataMap: any;
  public imfList: any;
  public ipcList: any;
  public track2List: any;
  public conditionalId;
  public numberOpraters: any = [
    { text: '== equals', value: '==' },
    { text: '!= not equals', value: '!=' },
    { text: '> greater than', value: '>' },
    { text: '< less than', value: '<' },
  ];
  public isMandatory: any;
  public scheme: any;
  public field: any;
  public type: any;
  public isInBuildMapper = true;
  public isExtract = false;
  public isConditional = false;
  public isConditionalData;
  public isRequest = true;
  public isParms = false;
  public stepParms1: string;
  public stepParms2: string;
  public postLength: any;
  public postOperator: any;
  public stepValue: any;
  public stepOprator: any;
  public postName: any;
  public imfValue: any;
  public ipcValue: any;
  public resValidation: any;
  public itemList: any = {
    blockStepList: [],
    inBuiltMapperValue: '',
    isExtract: false,
    isInBuiltMapper: true,
    validationFormatList: [],
    validationFun: 'Length',
    validationName: 'Test',
    validationOprator: '=',
  };

  public validationFormatPer: Object = {
    name: '',
    operator: '',
    value: '',
  };

  public blockStepPer: Object = {
    name: '',
    operator: '',
    value: '',
  };

  public schemeImfMapper: Object = {
    fieldId: null,
    fieldType: null,
    id: null,
    imfExpression: null,
    responseImfLeg: null,
  };
  // public validationFunctions: any;
  // public functions: any;
  public imfVersionList = [];
  public imfVersion;
  public getIMFData;
  public disabled = false;
  public blockList: any;
  componetDestroyed = new Subject();

  constructor(private _store: Store<IAppState>, private translate: TranslateService) {
    if (localStorage.getItem('ImfData')) {
      const ImfData = JSON.parse(localStorage.getItem('ImfData'));
    }
    this._store.dispatch(new GetScheme());
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectScheme))
      .subscribe((response: any) => {
        if (response) {
          this.schemeList = response;
        }
      });

    this._store.dispatch(new GetMap());
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectMap))
      .subscribe((response: any) => {
        if (response) {
          this.adapterDataMap = response.AdapterdataMap;
        }
      });

    this._store.dispatch(new GetElFunction());
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectElFunction))
      .subscribe((response: any) => {
        if (response) {
          const data = response.elfunctionList;
          this.validationList = data.filter(x => x.featureType === 'validation');
          this.transformList = data.filter(x => x.featureType === 'transform');
          // this.track2List = data.filter(x => x.featureType === 'format');
        }
      });
    this._store.dispatch(new GetIMF(2));
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectIMF))
      .subscribe((response: any) => {
        if (response) {
          this.imfList = response.ImfField.map((item: Object) => {
            return {
              id: item,
              value: item,
            };
          });
        }
      });

    this._store.dispatch(new GetIPC());
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectIPC))
      .subscribe((response: any) => {
        if (response) {
          this.ipcList = response;
        }
      });

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectField))
      .subscribe((response: any) => {
        if (response) {
          this.fieldList = response.SchemaSpecification;
          if (this.getIMFData) {
            this.field = this.fieldList.filter(data => data.id === this.getIMFData.fieldId)[0];
          }
        }
      });
    // this._store.dispatch(new GetIMFVersion());
    // this._store.pipe(takeUntil(this.componetDestroyed),
    // select(selectGetIMFVersion)).subscribe((response: any) => {
    //   if (response) {
    //     this.imfVersionList = response;
    //   }
    // });
    this.blockList = [
      {
        transformArray: [{ name: 'Step', value: '', params: [] }],
        // tslint:disable-next-line: object-literal-sort-keys
        PostValidation: { validation: '', operator: '', value: '' },
        formatList: [{ operator: '', value: '' }],
        IMFvalue: '',
        IPCvalue: '',
        function: [],
        validationFunction: [],
      },
    ];
  }

  ngOnInit() {
    this.disabled = false;
    if (this.getIMFData) {
      this.getEditData();
    }
    this.typeList = [
      { id: 'REQUEST', value: 'REQUEST' },
      { id: 'RESPONSE', value: 'RESPONSE' },
    ];
    this.requestModel();
    this.type = { id: 'REQUEST', value: 'REQUEST' };
    this.track2List = [
      {
        active: true,
        expType: 'el_expression',
        expression: 'format(${35},"Track2")',
        featureType: 'transform',
        id: 7,
        name: 'track2',
        paramCount: 2,
      },
    ];
    this._store.dispatch(new GetScheme());
  }

  public changeScheme(e) {
    this.fieldList = [];
    this._store.dispatch(new GetField(e.id));
  }

  public changeField(e) {
    this.isMandatory = this.validationList.filter(x => x.name === 'isMandatory')[0];
    this.isMandatory['expression'] = this.isMandatory['expression'].replace(
      'isExist(${fieldNo}) && isNotNull(${fieldNo}',
      'isExist(${' + this.field.id + '}) && isNotNull(${' + this.field.id + '}',
    );
  }

  public changeType(e) {
    this.isRequest = !this.isRequest;
  }

  public parmsChange(block) {
    const parameter = JSON.parse(block.value['parameters']);
    parameter.signature.forEach(param => {
      block.params.push({ name: param.name, value: '' });
    });
    this.isParms = true;
  }

  public requestModel() {
    this.itemList['validationFormatList'] = [];
    this.itemList['blockStepList'] = [];

    this.validationFormatPer['name'] = 'Should confirm to format';
    this.validationFormatPer['operator'] = '';
    this.validationFormatPer['value'] = this.track2List;
    this.itemList['validationFormatList'].push(this.validationFormatPer);

    this.blockStepPer['name'] = 'Step';
    this.blockStepPer['operator'] = '=';
    this.blockStepPer['value'] = this.track2List;
    this.itemList['blockStepList'].push(this.blockStepPer);
  }

  public mapperChange(mapper: boolean) {
    if (mapper) {
      this.isInBuildMapper = true;
    } else {
      this.isInBuildMapper = false;
    }
  }

  public extractDataChange(parse: boolean) {
    if (parse) {
      this.isExtract = true;
    } else {
      this.isExtract = false;
    }

    this.itemList.isExtract = parse;
  }

  public fieldPresenceChange(value: string) {
    this.isConditional = false;
    this.isMandatory = undefined;
    this.isConditionalData = undefined;
    if (value === 'Conditional') {
      this.isConditional = true;
      this.isConditionalData = this.validationList.filter(x => x.name === 'isExists')[0];
      this.isConditionalData['expression'] = this.isConditionalData['expression'].replace(
        'isExist(${fieldNo})',
        'isExist(${' + this.conditionalId.id,
      );
    } else if (value === 'isMandatory') {
      this.isMandatory = this.validationList.filter(x => x.name === value)[0];
      this.isMandatory['expression'] = this.isMandatory['expression'].replace(
        'isExist(${fieldNo}) && isNotNull(${fieldNo}',
        'isExist(${' + this.field.id + '}) && isNotNull(${' + this.field.id + '}',
      );
    }
  }

  public addBlockStep(index: number, block) {
    if (this.isExtract) {
      block.push({ name: 'Step', value: '', params: [] });
    } else {
      this.itemList['blockStepList'].push({
        name: 'Step',
        operator: '',
        value: '',
      });
    }
  }

  public removeBlockStep(index: number, block) {
    if (this.isExtract) {
      block.pop();
    } else {
      this.itemList['blockStepList'].splice(index, 1);
    }
  }

  public addValidationFormat(index: number, item) {
    if (this.isExtract) {
      item.push({ operator: '', value: '' });
    } else {
      this.itemList['validationFormatList'].push({
        name: 'Should confirm to format',
        operator: '',
        value: '',
      });
    }
  }

  public removeValidationFormat(index: number, item) {
    if (this.isExtract) {
      item.splice(index, 1);
    } else {
      this.itemList['validationFormatList'].splice(index, 1);
    }
  }

  public save() {
    this.schemeImfMapper['messageStandard'] = this.scheme;
    this.schemeImfMapper['fieldId'] = this.field['id'];
    this.schemeImfMapper['fieldType'] = this.type['value'];
    let imfExp: any;
    const functions = [];
    const validationFunctions = [];
    if (this.isRequest) {
      imfExp = JSON.parse(this.adapterDataMap.req_blank_structure_field);
      imfExp['source'] = '${' + this.field['id'] + '}';
      if (this.isExtract) {
        const array = [];
        this.blockList.forEach(item => {
          const destinationStr = imfExp['destination'].replace(
            'imf-field-name',
            item.IMFvalue['value'],
          );
          imfExp['destination'] = destinationStr;
          item.transformArray.forEach(item1 => {
            const trimData = item1.value;
            trimData['expression'] = trimData['expression'].replace('fieldNo', this.field.id);
            item1.params.forEach(param => {
              trimData['expression'] = trimData['expression'].replace(param.name, param.value);
            });
            item.function.push({
              name: trimData['name'],
              type: trimData['expType'],
              expression: trimData['expression'],
            });
          });
          item.formatList.forEach(item1 => {
            const trimData = item1.value;
            trimData['expression'] = trimData['expression'].replace('fieldNo', this.field.id);
            item.validationFunction.push({
              name: trimData['name'],
              type: trimData['expType'],
              expression: trimData['expression'],
            });
          });
          const Data = item.PostValidation['validation'];
          Data['expression'] = Data['expression'].replace('fieldNo', this.field.id);
          item.validationFunction.push({
            name: Data['name'],
            type: Data['expType'],
            expression: Data['expression'],
          });
          imfExp['validationFunctions'] = item.validationFunction;
          imfExp['functions'] = item.function;
          imfExp['ipc'] = item.IPCvalue['value'];
          array.push(imfExp);
        });
        const obj = {
          array: array,
        };
        this.schemeImfMapper['imfExpression'] = JSON.stringify(obj);
        // Trim
        // for (let i = 0; i < this.itemList['blockStepList'].length; i++) {
        //   const trimData = this.itemList['blockStepList'][i]['value'];
        //   trimData['expression'] = this.itemList['blockStepList'][i]['operator']['value']
        //     + ' ' + this.itemList['blockStepList'][i]['value']['name'];
        //   functions.push({ 'type': trimData['expType'], 'expression': trimData['expression'] });
        // }
      } else {
        const destination = imfExp['destination'];
        const destinationStr = destination.replace(
          'request_message[imf-field-name',
          'request_message[' + this.imfValue['value'],
        );
        imfExp['destination'] = destinationStr;

        // Length
        if (this.postLength) {
          const lengthData = this.postLength;
          lengthData['expression'] =
            lengthData['name'] + '()' + this.postOperator['value'] + this.postName;
          validationFunctions.push({
            name: lengthData['name'],
            type: lengthData['expType'],
            expression: lengthData['expression'],
          });
        }
        // Track2
        for (let i = 0; i < this.itemList['validationFormatList'].length; i++) {
          if (this.itemList['validationFormatList'][i]['value']) {
            const trackData = this.itemList['validationFormatList'][i]['value'];
            trackData['expression'] = trackData['expression'].replace(
              'format(${35',
              'format(${' + this.field.id,
            );
            validationFunctions.push({
              name: trackData['name'],
              type: trackData['expType'],
              expression: trackData['expression'],
            });
          }
        }
        if (this.isMandatory) {
          functions.push({
            name: this.isMandatory.name,
            type: this.isMandatory.expType,
            expression: this.isMandatory['expression'],
          });
        } else if (this.isConditionalData) {
          functions.push({
            name: this.isConditionalData.name,
            type: this.isConditionalData.expType,
            // tslint:disable-next-line: object-literal-sort-keys
            expression: this.isConditionalData['expression'],
          });
        }
        imfExp['validationFunctions'] = validationFunctions;
        imfExp['functions'] = functions;
        imfExp['ipc'] = this.ipcValue['value'];

        this.schemeImfMapper['imfExpression'] = JSON.stringify(imfExp);
      }
    } else {
      imfExp = JSON.parse(this.adapterDataMap.res_blank_structure_field);
      imfExp['destination'] = '${' + this.field['id'] + '}';
      const source = imfExp['source'];
      const sourceStr = source.replace(
        'request_message[',
        'request_message[' + this.imfValue['value'],
      );
      imfExp['source'] = sourceStr;

      this.schemeImfMapper['imfExpression'] = JSON.stringify(imfExp);
    }

    this._store.dispatch(new SchemeImfMapperSave(this.schemeImfMapper));
  }
  // public changeVersion(version) {
  //    this._store.dispatch(new GetIMF());
  // }
  public cancel() {
    alert('cancel');
  }
  public getEditData() {
    this.disabled = true;
    this.scheme = this.getIMFData.messageStandard;
    this._store.dispatch(new GetField(this.scheme.id));
    if (this.getIMFData.requestImfExpression && !this.getIMFData.requestImfExpression.array) {
      this.getIMFData.requestImfExpression = JSON.parse(this.getIMFData.requestImfExpression);
      this.imfValue = this.getIMFData.requestImfField;
      this.ipcValue = this.getIMFData.requestImfExpression.ipc;
      // if (this.getIMFData.requestImfExpression.validationFunction) {
      //   this.getIMFData.requestImfExpression.validationFunction.forEach(validation => {
      //     const data = this.validationList.filter(x => x.name === validation.name ) { }
      //   });
      // }
    } else if (this.getIMFData.requestImfExpression && this.getIMFData.requestImfExpression.array) {
    }
  }
  public addBlockList() {
    const obj = {
      transformArray: [{ name: 'Step', value: '', params: [] }],
      // tslint:disable-next-line: object-literal-sort-keys
      PostValidation: { validation: '', operator: '', value: '' },
      formatList: [{ operator: '', value: '' }],
      IMFvalue: '',
      IPCvalue: '',
      function: [],
      validationFunction: [],
    };
    this.blockList.push(obj);
  }
  public removeBlockList() {
    this.blockList.pop();
  }
}
