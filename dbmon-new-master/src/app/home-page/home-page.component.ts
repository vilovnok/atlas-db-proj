import { Component, OnInit } from '@angular/core';
import { applyLag } from '../dbinfo';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IDb } from '../dbinfo';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})



export class HomePageComponent implements OnInit {
  applyLag = applyLag;
  
  

  ngOnInit(): void {

}
}
