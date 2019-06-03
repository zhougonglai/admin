import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const GET_LAUNCHES = gql`
  query getLaunches($pageIndex: Int, $pageSize: Int) {
    launches(outputCtrl: { limit: $pageSize, offset: $pageIndex }) {
      id
      cursor
      site
      details
      success
    }
  }
`;

@Component({
  selector: 'app-dashboard-analysis-view',
  templateUrl: './view.component.html',
})
export class DashboardAnalysisViewComponent implements OnInit {
  launches: Observable<Array<any>>;
  launcheState = {
    loading: false,
    pageSize: 10,
    pageIndex: 0,
  };
  constructor(private apollo: Apollo) {}

  /**
   * 翻下一页
   * @memberof DashboardAnalysisViewComponent
   */
  async nextPage() {
    this.launcheState.pageIndex += 1;
    this.launcheState.loading = true;
    await this.getLaunches();
    this.launcheState.loading = false;
  }

  /**
   * 翻上一页
   * @memberof DashboardAnalysisViewComponent
   */
  async prevPage() {
    this.launcheState.pageIndex -= 1;
    this.launcheState.loading = true;
    await this.getLaunches();
    this.launcheState.loading = false;
  }

  /**
   * 获取Launches
   * @returns {[Launches]}
   * @memberof DashboardAnalysisViewComponent
   */
  async getLaunches() {
    this.launches = await this.apollo
      .watchQuery<any>({
        query: GET_LAUNCHES,
        variables: {
          pageSize: this.launcheState.pageSize,
          pageIndex: this.launcheState.pageIndex * this.launcheState.pageSize,
        },
      })
      .valueChanges.pipe(map(({ data }) => data.launches));
  }
  ngOnInit() {
    this.launcheState.loading = true;
    this.getLaunches().then(() => {
      this.launcheState.loading = false;
    });
  }
}
