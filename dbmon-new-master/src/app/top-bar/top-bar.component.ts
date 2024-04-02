import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  dbInfo: any;
  dbNames: any;
  constructor(private http: HttpClient) { }

  async dbNameGet () {
    try {
      let url = 'https://ords.cern.ch/ords/atlr/atlas_dbmon_r/all_databases/info'
      let result = await (this.http.get(url).toPromise())
      this.dbInfo = result;
      this.dbNames = this.dbInfo.items
      console.log(this.dbNames.dbname)
    } catch (err) {
      
    }
  }


  ngOnInit(): void {
    this.dbNameGet();
  }

}
