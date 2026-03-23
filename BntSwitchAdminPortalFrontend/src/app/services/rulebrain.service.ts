import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class RuleBrainService {
  public currentItem: BehaviorSubject<Object> = new BehaviorSubject(null);
  public versionItem: BehaviorSubject<Object> = new BehaviorSubject(null);
  public rule: BehaviorSubject<Object> = new BehaviorSubject(null);
  public ruleList: BehaviorSubject<Object> = new BehaviorSubject(null);
  public conditionsList: BehaviorSubject<Object[]> = new BehaviorSubject(null);
  public destinationsList: BehaviorSubject<Object[]> = new BehaviorSubject(null);
  public conditionChanged: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public ruleJson: BehaviorSubject<Object> = new BehaviorSubject(null);
  public reBuildAfterDragAndDrop: BehaviorSubject<Object> = new BehaviorSubject(null);
  public readyForRebuildFormGroup: BehaviorSubject<Object> = new BehaviorSubject(null);
  public conditionsVariationsList: BehaviorSubject<Object[]> = new BehaviorSubject(null);
  public router: BehaviorSubject<Object> = new BehaviorSubject(null);
  public itemsList: BehaviorSubject<Object[]> = new BehaviorSubject([]);
  public requestDataSubject: BehaviorSubject<Object> = new BehaviorSubject({
    orderData: {
      direction: 0,
      name: '',
    },
  });
  constructor() {}

  // public saveRule(data): void {

  //   this.send( 'postRule', data)
  //     .subscribe((res) => {

  //       let dataJson = res;

  //       if ( dataJson[ 'status' ] === 'success' ) {

  //         this.conditionsList.next( dataJson[ 'data' ] );

  //       } else {

  //       //  this.notificationService.errorNotify( dataJson[ 'message' ] );

  //       }

  //     });

  // }

  // public getDataItem(body?, id?) {

  //     this.send('getDataItem', body, id).subscribe(dataJson => {
  //       this.itemsList.next(dataJson);
  //     });

  // }
}
