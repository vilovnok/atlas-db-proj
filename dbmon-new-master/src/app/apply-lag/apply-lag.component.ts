import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-apply-lag',
  templateUrl: './apply-lag.component.html',
  styleUrls: ['./apply-lag.component.scss']
})
export class ApplyLagComponent implements OnInit {
  applyLagInfo: any;

  constructor(private http: HttpClient) { }

  async applyLag () {
    
    try {
      let url = "https://ords.cern.ch/ords/atlr/atlas_dbmon_r/db/apply_lag/atlr";
      let result = await (this.http.get(url).toPromise());
      this.applyLagInfo = result;
      
    } catch (err) {
      console.log(err)
    }
  }

  secondLagAlert(lag: number): object {
    if (lag > 600) {
      return {background: "#981A37"}
    } else if (this.applyLagInfo.items[0] > 300) {
      return {background: "#DAA520"}
    } else {
      return {background: "#229369"}
    }
  }

  statusAlert(status: string): object {
    if (status == 'ENABLED') {
      return {background: "#229369"}
    } else {
      return {background: "#981A37"}
    }
  }

  ngOnInit(): void {
    this.applyLag();
  }

}
