import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], keyword: string): any {
    return keyword ?
      items.filter((item) =>
        JSON.stringify(item).toLowerCase().includes(keyword.toLowerCase())
      ) :
      items;
  }

}