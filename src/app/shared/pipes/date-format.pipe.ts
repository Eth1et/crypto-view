import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    const date = new Date(value);
    const formattedDate = date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    const formattedTime = date.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true });
    return `${formattedDate} ${formattedTime}`;
  }

}
