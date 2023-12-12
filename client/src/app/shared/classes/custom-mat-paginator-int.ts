import { MatPaginatorIntl } from "@angular/material";
import { Injectable } from "@angular/core";

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
    constructor() {
        super();

        this.getAndInitTranslations();
    }

    getAndInitTranslations() {
        this.itemsPerPageLabel = "Количество отображаемых данных:";
        this.nextPageLabel = "Далее";
        this.previousPageLabel = "Назад";
        this.firstPageLabel = "Первая страница";
        this.lastPageLabel = "Последняя страница";
        this.changes.next();
    }

    getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) {
            return `0 из ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} из ${length}`;
    };
}
