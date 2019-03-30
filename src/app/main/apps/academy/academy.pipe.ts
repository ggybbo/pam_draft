import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translevel'
})
export class TransLevelPipe implements PipeTransform {
  transform(value: number): number {
    if (!value) {
      return 100;
    } else {
      return Math.floor(value / 1000) + 1;
    }
  }
}
