import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { DbTableComponent } from './db-table/db-table.component';
import { ApplyLagComponent } from './apply-lag/apply-lag.component';
import { RouterModule } from '@angular/router';
import { DbDetailsComponent } from './db-details/db-details.component';
import { TestRequestComponent } from './test-request/test-request.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    HomePageComponent,
    DbTableComponent,
    ApplyLagComponent,
    DbDetailsComponent,
    TestRequestComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path: '', component: HomePageComponent},
      {path: 'db/:dbName', component: DbDetailsComponent},
      {path: 'test_request', component: TestRequestComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
