import { Component, OnInit, Input } from "@angular/core";
import { SvodService } from "../../../../shared/services/svod.service";
import { DayReport } from "../../../../shared/interfaces";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-sinking-year',
  templateUrl: './sinking-year.component.html',
  styleUrls: ['./sinking-year.component.scss']
})
export class SinkingYearComponent implements OnInit {

  sinkingYear: DayReport[];

  @Input('hour_id') hour_id: number;

  constructor(
    private _svodService: SvodService,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this._svodService.getSinkingYear(this.hour_id).subscribe(sinkingYear => {
      this.sinkingYear = sinkingYear
    }, error => {
      this._toast.error(error.error.message);
    })
  }
}
