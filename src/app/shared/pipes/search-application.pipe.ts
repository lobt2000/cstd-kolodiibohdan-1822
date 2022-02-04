import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchApplication'
})
export class SearchApplicationPipe implements PipeTransform {

  transform(application: Array<any>, value: string): Array<any> {
    if (!application) return application
    if (!value) return application
    return application.filter(apply => apply.childName.toLowerCase().includes(value.toLowerCase()) || apply.childYear == value || apply.typeOfReg.formTitleType.toLowerCase().includes(value.toLowerCase()))
  }
}
