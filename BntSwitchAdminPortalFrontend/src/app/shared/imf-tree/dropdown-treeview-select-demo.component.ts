import { Component, OnInit } from '@angular/core';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { ImfJsonService } from '@app/services/imf-json.service';

@Component({
  selector: 'ngx-dropdown-treeview-select-demo',
  templateUrl: './dropdown-treeview-select-demo.component.html',
  providers: [ImfJsonService],
})
export class DropdownTreeviewSelectDemoComponent implements OnInit {
  value = 11;
  items: TreeviewItem[];
  config = TreeviewConfig.create({
    hasFilter: true,
    hasCollapseExpand: true,
  });

  constructor(private imfJsonService: ImfJsonService) {}

  ngOnInit() {
    this.items = this.imfJsonService.getImfJsonObj();
  }

  onValueChange(value: number) {
    console.log('valueChange raised with value: ' + value);
  }

  loadBooks1() {
    this.items = this.imfJsonService.getImfJsonObj();
    this.value = 11;
  }

  loadBooks2() {
    this.items = [
      new TreeviewItem({
        text: 'ABC',
        value: 123456,
      }),
    ];
    this.value = undefined;
  }
}
