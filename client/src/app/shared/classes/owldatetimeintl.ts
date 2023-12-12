import { OwlDateTimeIntl } from 'ng-pick-datetime';
import { Injectable } from "@angular/core";

@Injectable()

export class OwlDTIntl extends OwlDateTimeIntl {
    cancelBtnLabel = 'Закрыть'

    setBtnLabel = 'Выбрать'
}
