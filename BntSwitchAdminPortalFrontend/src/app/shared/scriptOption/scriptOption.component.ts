import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SubscribeService } from '@app/services/subscribe.services';

@Component({
  selector: 'app-script-option',
  templateUrl: './scriptOption.component.html',
  styleUrls: ['./scriptOption.component.scss'],
})
export class ScriptOptionComponent implements OnInit {
  @Input() scriptItem;
  @Input() field;
  public scriptText;
  public scriptError = false;
  @Output() public oncancel = new EventEmitter<boolean>();
  @Output() public scriptData = new EventEmitter<Object>();
  @Input() public readOnlyFlag = false;
  editorOptions = {theme: 'vs-dark', language: 'text/plain'};
  constructor(private subscribeService: SubscribeService) {}

  ngOnInit() {
    if (this.scriptItem) {
      if (this.scriptItem[0]) {
        this.scriptText = this.scriptItem[0].script;
      } else {
        this.scriptText = this.scriptItem.script;
      }
    }
  }
  public saveScript() {
    if (this.scriptText) {
      this.scriptData.emit({
        type: 'groovy_executor',
        source: '${' + this.field.id + '}',
        script: this.scriptText,
        selectedFormat: 4,
        selectedOption: 'script',
        ipc: 'SCRIPT_ERROR',
      });
    } else {
      this.scriptError = true;
    }
    this.subscribeService.setServiceType(true);
  }
  public cancel() {
    this.oncancel.emit(false);
  }
}
