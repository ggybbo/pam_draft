import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'replaceSingleQuotation' })
export class ReplaceSingleQuotation implements PipeTransform {
  transform(value: string): string {
    return value.replace(/'/g, '');
  }
}
