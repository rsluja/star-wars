import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'detailInfo'
})
export class DetailInfoPipe implements PipeTransform {

  transform(detailRow:string[] , args?: any): any {
    // console.log("detail row:",detailRow);
    // console.log("detail row[0]",detailRow[0]);

    if(typeof detailRow[0] === 'string' && typeof detailRow[1] === 'string') {
      // console.log("string")
      let firstRow = this.addUppercaseAndAdjustDisplay(detailRow[0]);
      let secondRow = this.addUppercaseAndAdjustDisplay(detailRow[1]);
      // console.log("firstRow", firstRow);
      // console.log("secondRow", secondRow);
      return firstRow + ': ' + secondRow;
    }
  }

  private addUppercaseAndAdjustDisplay(detailRow) {
    let firstLetterUppercase = detailRow.charAt(0).toUpperCase();
    let restOfString = detailRow.slice(1);
    
    if(detailRow.indexOf('_') > - 1) {
      // console.log("detailRow with _ :", detailRow)
      return firstLetterUppercase + restOfString.replace('_',' ');
    } else {
      // console.log("without _ ", detailRow)
      return firstLetterUppercase + restOfString;
    }
  }

}
