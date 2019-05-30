import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';

class Data {
  today: number;
  yesterday: number;
}

class Trend {
  list: Array<number>;
  contrast: Array<number>;
  contribution: Array<string>;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  today = new Date().toLocaleDateString();
  webSite: [];
  salesData: [];
  offlineChartData: [];
  todoList: any[];
  news: any[];

  uv: Data;
  pv: Data;
  vv: Data;
  cv: Data;
  trend: Trend;

  constructor(private http: _HttpClient) {}

  ngOnInit() {
    this.http
      .get(`${environment.MOCK_URL}/chart`)
      .subscribe(({ visitData, salesData, offlineChartData, uv, pv, vv, cv, trend, todoList, news }) => {
        this.webSite = visitData.slice(0, 10);
        this.salesData = salesData;
        this.offlineChartData = offlineChartData;
        this.uv = uv;
        this.pv = pv;
        this.vv = vv;
        this.cv = cv;
        this.trend = trend;
        this.todoList = todoList;
        this.news = news;
      });
  }
}
