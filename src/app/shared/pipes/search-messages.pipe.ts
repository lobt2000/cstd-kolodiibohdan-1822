import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchMessages'
})
export class SearchMessagesPipe implements PipeTransform {

  transform(messages: Array<any>, value: string): Array<any> {
    if (!messages) return messages
    if (!value) return messages
    return messages.filter(mes => mes.text.toLowerCase().includes(value))
  }

}
