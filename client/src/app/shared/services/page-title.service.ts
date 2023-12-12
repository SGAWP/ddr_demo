import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Injectable({
    providedIn: "root"
})
export class PageTitleService {
    constructor(private _titleService: Title) { }

    setTitle(new_title: string): void {
        this._titleService.setTitle(new_title ? `МУБР: ${new_title}` : "МУБР");
    }
}
