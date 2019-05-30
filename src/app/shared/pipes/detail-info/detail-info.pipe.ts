import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'detailInfo'
})
export class DetailInfoPipe implements PipeTransform {

  transform(detailRow:string[]): any {

    if(typeof detailRow[0] === 'string' && typeof detailRow[1] === 'string') {
      let firstRow = this.addUppercaseAndAdjustDisplay(detailRow[0]);
      let secondRow = this.addUppercaseAndAdjustDisplay(detailRow[1]);
      return firstRow + ': ' + secondRow;
    }
  }

  private addUppercaseAndAdjustDisplay(detailRow) {
    let firstLetterUppercase = detailRow.charAt(0).toUpperCase();
    let restOfString = detailRow.slice(1);
    
    if(detailRow.indexOf('_') > - 1) {
      return firstLetterUppercase + restOfString.replace('_',' ');
    } else {
      return firstLetterUppercase + restOfString;
    }
  }

}
