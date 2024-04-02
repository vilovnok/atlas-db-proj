import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-db-details',
  templateUrl: './db-details.component.html',
  styleUrls: ['./db-details.component.scss']
})
export class DbDetailsComponent implements OnInit, DoCheck {
  dbName: String = 'base';
  dbMetric: any;
  numberOfNodes: number = 2;
  keys = ['node1', 'node2', 'node3', 'node4'];
  jobsInfo: any;
  sessionDistr: any;
  sessionPages: number = 0;
  sessionPagesArray = [1];
  constructor(private route: ActivatedRoute, private http: HttpClient) { }



  async getMetrics() {
    try {
      const url = 'https://ords.cern.ch/ords/atlr/atlas_dbmon_r/db/basic_metrics/' + this.dbName + '/5';
      const result = await(this.http.get(url).toPromise());
      this.dbMetric = result;
      this.numberOfNodes = this.dbMetric.items[0].cnt_nodes;
      this.keys = this.keys.slice(0, this.numberOfNodes);
      console.log(this.dbMetric.items[0])
    } catch (err) {
      console.log(err)
    }
  }

  async getJobsInfo() {
    try {
      const url = 'https://ords.cern.ch/ords/atlr/atlas_dbmon_r/jobs_info/stats/' + this.dbName + '/all';
      const result = await(this.http.get(url).toPromise());
      this.jobsInfo = result;
    } catch (err) {
      console.log(err);
    }
  }

  jobsStyles(): object {
    if (this.jobsInfo.items[0].failed_jobs > 0) {
      if (this.dbName == "INTR" || this.dbName == "INT8R") return {background: "#DAA520"}
      else return {background: "#981A37"};
    } else {
      return {background: "#229369"};
    }
  }

  async getSessionDistr() {
    try {
      let url = 'https://ords.cern.ch/ords/atlr/atlas_dbmon_r/db/session_distribution/' + this.dbName;
      let result = await(this.http.get(url).toPromise());
      this.sessionDistr = result;

      this.sessionPages = Math.round(this.sessionDistr.items.length / 9);
      console.log(this.sessionPages);
      for(let i = 2; i < this.sessionPages + 1; i++) {
        this.sessionPagesArray.push(i);
      }
      console.log(this.sessionPagesArray)
    } catch (err) {
      console.log(err)
    }
  }

  showPage(): void {
    console.log(1)
  }

  ngOnInit(): void {
    this.dbName = String(this.route.snapshot.paramMap.get('dbName'));
    this.getMetrics();
    this.getJobsInfo();
    this.getSessionDistr();
    console.log("NgOnInit: " + this.dbName)
  }

  ngDoCheck(): void {
    this.dbName = String(this.route.snapshot.paramMap.get('dbName'));
    console.log("NgDoCheck" + this.dbName);
    //this.getMetrics();
  }

}
