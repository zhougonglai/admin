import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

const GET_LAUNCH = gql`
  query getLaunch($id: ID!) {
    launch(id: $id) {
      id
      cursor
      site
      details
      success
      mission {
        name
        missionPatchSmall
        missionPatchLarge
      }
      rocket {
        id
        name
        type
      }
    }
  }
`;

@Component({
  selector: 'app-dashboard-analysis-detail',
  templateUrl: './detail.component.html',
})
export class DashboardAnalysisDetailComponent implements OnInit {
  launch$: Observable<any>;
  constructor(private route: ActivatedRoute, private router: Router, private apollo: Apollo) {}

  getLaunch(id) {
    return this.apollo
      .watchQuery<any>({
        query: GET_LAUNCH,
        variables: { id },
      })
      .valueChanges.pipe(map(({ data }) => data.launch));
  }

  onBack() {
    this.router.navigate(['/dashboard/analysis']);
  }

  ngOnInit() {
    this.launch$ = this.route.paramMap.pipe(switchMap((params: ParamMap) => this.getLaunch(params.get('id'))));
    console.log(this.launch$);
  }
}
