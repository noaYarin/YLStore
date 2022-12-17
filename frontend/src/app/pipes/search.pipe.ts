import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], keyword: string): any {
    if (Array.isArray(items) && typeof keyword == 'string') {
      return items.filter(item => {
        return Object.keys(item).some(key => {
          if (typeof item[key] == 'string') {
            return item[key].toLowerCase().includes(keyword.toLowerCase());
          }
          return false;
        })
      })
    }
    return items;
  }

}