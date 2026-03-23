import {
  IHeaders,
  IL1SchemaSoapTemplateTableProps,
  IL1SchemaTableProps,
} from './../../models/l1-adapter.interface';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-structured-data-table',
  templateUrl: './structured-data-table.component.html',
  styleUrls: ['./structured-data-table.component.scss'],
})
export class StructuredDataTableComponent implements OnInit, OnChanges {
  @Input() headers: IHeaders[];
  @Input() rows: IL1SchemaTableProps[] | IL1SchemaSoapTemplateTableProps[];
  @Input() totals: number;
  @Input() screen: string;
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
  }

  public trimData(data) {
    return data?.class.substring(data?.class.indexOf('_') + 1, data?.class.length);
  }
}
