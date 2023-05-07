import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {

  transform(value: number): string {
    const num: string = value < 0.001 ? "0.000" : value.toString();
    // splits into groups of 3, then joins them with ','
    let wholeDigits = num.split('.')[0].match(/.{1,3}(?=(.{3})*$)/g)?.join(',');
    let fractionDigits = num.split('.')[1];
    if(fractionDigits){
      // cuts the fraction digits after the first 3 digits
      fractionDigits = fractionDigits.slice(0, 3);
    }else{
      fractionDigits = "";
    }
    while(fractionDigits.length < 3){
      fractionDigits = fractionDigits + "0"
    }
    return wholeDigits + "." + fractionDigits;
  }

}
