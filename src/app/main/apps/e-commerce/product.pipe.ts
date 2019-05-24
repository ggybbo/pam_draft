import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'objecttoArray' })
export class ObjectToArray implements PipeTransform {
  transform(value: object): any {
    return Object.values(value);
  }
}
