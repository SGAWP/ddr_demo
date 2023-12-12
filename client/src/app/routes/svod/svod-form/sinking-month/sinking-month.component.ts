import { Component, OnInit, Input } from "@angular/core";
import { SvodService } from "../../../../shared/services/svod.service";
import { DayReport } from "../../../../shared/interfaces";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-sinking-month',
  templateUrl: './sinking-month.component.html',
  styleUrls: ['./sinking-month.component.scss']
})
export class SinkingMonthComponent implements OnInit {

  sinkingMonth: DayReport[];

  @Input('hour_id') hour_id: number;

  constructor(
    private _svodService: SvodService,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this._svodService.getSinkingMonth(this.hour_id).subscribe(sinkingMonth => {
      this.sinkingMonth = sinkingMonth
    }, error => {
      this._toast.error(error.error.message);
    })
  }
}
