import { Injectable } from '@angular/core';

export interface ChildrenItem {
  state: string;
  name: string;
  type: 'link' | 'sub' | 'extLink' | 'extTabLink';
  children?: ChildrenItem[];
}

export interface Menu {
  state: string;
  name: string;
  type: 'link' | 'sub' | 'extLink' | 'extTabLink';
  icon: string;
  children?: ChildrenItem[];
}

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menu: Menu[] = [];

  getAll(): Menu[] {
    return this.menu;
  }

  set(menu: Menu[]): Menu[] {
    this.menu = this.menu.concat(menu);
    return this.menu;
  }

  add(menu: Menu) {
    this.menu.push(menu);
  }

  getMenuItemName(stateArr: string[]): string {
    return this.getMenuLevel(stateArr)[stateArr.length - 1];
  }

  getMenuLevel(stateArr: string[]): string[] {
    const tmpArr = [];
    this.menu.map(item => {
      if (item.state === stateArr[0]) {
        tmpArr.push(item.name);
        if (item.children && item.children.length) {
          item.children.forEach(itemlvl1 => {
            if (stateArr[1] && itemlvl1.state === stateArr[1]) {
              tmpArr.push(itemlvl1.name);
              if (itemlvl1.children && itemlvl1.children.length) {
                itemlvl1.children.forEach(itemlvl2 => {
                  if (stateArr[2] && itemlvl2.state === stateArr[2]) {
                    tmpArr.push(itemlvl2.name);
                  }
                });
              }
            }
          });
        }
      }
    });
    return tmpArr;
  }
}
