import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replacelabel',
})
export class ReplaceLabelPipe implements PipeTransform {
  transform(value: any, args?: any): string {
    return value.replace('%Label%', args);
  }
}
