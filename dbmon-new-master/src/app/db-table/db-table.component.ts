import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { IDb } from '../dbinfo';


@Component({
  selector: 'app-db-table',
  templateUrl: './db-table.component.html',
  styleUrls: ['./db-table.component.scss']
})
export class DbTableComponent implements OnInit {
  @Input() dbName!: String;

  

  constructor(private http: HttpClient) { }

  //url = 'https://ords.cern.ch/ords/atlr/atlas_dbmon_r/db/basic_metrics/' + this.dbName + '/5';
  //jobsUrl = 'https://ords.cern.ch/ords/atlr/atlas_dbmon_r/jobs_info/stats/' + this.dbName + '/all'

  

  jobsMetrics: any;
  baseInfo: any;
  jobsInfo: any;
  dbMetrics: any;
  keys: string[] = ['node1', 'node2', 'node3', 'node4'];
  reducedKeys: string[] = [];
  numberOfNodes = 0;
  dbStatus: any;
  applyLagInfo: any;
  dbIsUp = {
    status: true,
    message: 'UP'
  }
  
  async getBaseInfo(){
    
    try{
        let url = 'https://ords.cern.ch/ords/atlr/atlas_dbmon_r/db/basic_metrics/' + this.dbName + '/5';
        const result = await (this.http.get(url).toPromise());
        console.log(result);
        this.baseInfo = result;
        console.log(this.baseInfo.items[0])
    } catch(err){
        console.error(err);
    }

    this.dbMetrics = this.reduceMetrics(this.baseInfo.items);
    console.log('metric' + this.dbMetrics)
    this.numberOfNodes = this.baseInfo.items[0].cnt_nodes
    this.reducedKeys = this.reduceNodes();

}

async getBaseJobInfo(){
  try{
      let jobsUrl = 'https://ords.cern.ch/ords/atlr/atlas_dbmon_r/jobs_info/stats/' + this.dbName + '/all'
      const diagnostics = await (this.http.get(jobsUrl).toPromise());
      // wait for asynchronous request
      console.log(diagnostics);
      this.jobsInfo = diagnostics;
      console.log(this.jobsInfo.items[0])
  } catch(err){
      // request failed
      console.error(err);
  }
  

}

jobsStyle(): object {
    if (this.jobsInfo.items[0].failed_jobs > 0) {
      if (this.dbName == 'intr' || this.dbName == 'int8r') return {background: "#DAA520"}
      else return {background: "#981A37"}
      
    } else {
      return {background: "#229369"}
    }
}

reduceMetrics (metrics: any) {
  let filtered = [];
  for (let i = 0; i < metrics.length; i++) {
    if (metrics[i].visible === 'Y') filtered.push(metrics[i]);
  };
  return filtered;
}

reduceNodes (): string[] {
  console.log('Number of nodes: ' + this.numberOfNodes)
  return this.keys.slice(0, this.numberOfNodes)
  
}

async dbUpInfoGet () {
  
  try {
    let dbUpUrl = 'https://ords.cern.ch/ords/atlr/atlas_dbmon_r/db/state/' + this.dbName;
    let result = await (this.http.get(dbUpUrl).toPromise());
    this.dbStatus = result;
    if (this.dbStatus.items[0].status == '1') {
      console.log('Status: ' + this.dbStatus.items[0].status)
      this.dbIsUp.status = true;
      this.dbIsUp.message = 'UP';
    } else {
      this.dbIsUp.status = false;
      this.dbIsUp.message = 'DOWN';
    }
  } catch(err) {
    console.log(err);
    this.dbIsUp.status = false;
    this.dbIsUp.message = 'DOWN';
  }
}

dbIsUpStyle (): object {
  if (this.dbIsUp.status) {
    
    return {background: '#229369'}
  } else {
    return {background: '#981A37'}
  }
}

async applyLagGetInfo () {
  try {
    let url = 'https://ords.cern.ch/ords/atlr/atlas_dbmon_r/db/apply_lag/' + this.dbName;
    let result = await (this.http.get(url).toPromise());
    this.applyLagInfo = result;
  } catch (err) {
    console.log(err)
  }
}

lagAlert() {
  if (this.applyLagInfo.items[0].apply_lag > 600) {
    return {background: "#981A37"}
  } else if (this.applyLagInfo.items[0] > 300) {
    return {background: "#DAA520"}
  } else {
    return {background: "#229369"}
  }
}

  ngOnInit(): void {
    console.log(this.dbName)
    this.getBaseInfo();
    this.getBaseJobInfo();
    this.dbUpInfoGet();
    this.applyLagGetInfo();
  }

}


