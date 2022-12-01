import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchKindergarten'
})
export class SearchKindergartenPipe implements PipeTransform {

  transform(kindergarten: Array<any>, value: string): Array<any> {
    if (!kindergarten) return kindergarten
    if (!value) return kindergarten
    return kindergarten.filter(kinder => kinder.title.toLowerCase().includes(value.toLowerCase()))
  }

}
