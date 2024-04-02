import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-request',
  templateUrl: './test-request.component.html',
  styleUrls: ['./test-request.component.scss']
})
export class TestRequestComponent implements OnInit {

  constructor(private http: HttpClient) { }

  result: any;

  async getRequest() {
    try {
      const url = 'http://127.0.0.1:5000/get_test';
      const result = await(this.http.get(url).toPromise());
      this.result = result
      this.result = this.result.test
      console.log(this.result.test);
    } catch (err) {
      console.log(err);
    }
  }

  ngOnInit(): void {
  }

}
