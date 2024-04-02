import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DbDataService {
  url = 'https://ords.cern.ch/ords/atlr/atlas_dbmon_r/'
  jobsUrl = 'https://ords.cern.ch/ords/atlr/atlas_dbmon_r/jobs_info/stats/atlr/all'
  jobsMetrics: any;
  basicInfo: any;
  jobsInfo: any;
  @Output() dbMetrics: any;
  keys: any[] = ['node1', 'node2', 'node3', 'node4'];
  reducedKeys: any[] = [];
  numberOfNodes = 0;


  constructor(private http: HttpClient) {
    
   }

  async basicInfoGet(dbName: string) {
    let basicInfoUrl = this.url + 'db/basic_metrics/' + dbName + '/5';
    try{
        const res = await (this.http.get(basicInfoUrl).toPromise());
        console.log(res);
        this.basicInfo = res;
        console.log('BasicInfo from service' + this.basicInfo.items[0])
    } catch(err){
        console.error(err);
    }

    this.dbMetrics = this.reduceMetrics(this.basicInfo.items);
    console.log('metric' + this.dbMetrics)
    this.numberOfNodes = this.basicInfo.items[0].cnt_nodes;


}


reduceMetrics (metrics: any) {
  let filtered = [];
  for (let i = 0; i < metrics.length; i++) {
    if (metrics[i].visible === 'Y') filtered.push(metrics[i]);
  };
  return filtered;
}

reduceNodes (): String[] {
  return this.keys.filter(x => this.keys.indexOf(x) <= (this.numberOfNodes + 1))
}



}
