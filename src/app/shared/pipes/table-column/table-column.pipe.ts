import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableColumn'
})
export class TableColumnPipe implements PipeTransform {

  transform(headerName: any): any {
    let firstLetterUppercase = headerName.charAt(0).toUpperCase();
    let restOfString = headerName.slice(1);
    
    if(headerName.indexOf('_') > - 1) {
      return firstLetterUppercase + restOfString.replace('_',' ');
    } else {
      return firstLetterUppercase + restOfString;
    }
  }

}
