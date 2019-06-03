import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardAnalysisAnalysisComponent } from './analysis/analysis.component';
import { DashboardAnalysisDetailComponent } from './analysis/detail/detail.component';
import { DashboardAnalysisViewComponent } from './analysis/view/view.component';
import { DashboardComponent } from './default/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'default', pathMatch: 'full' },
  { path: 'default', component: DashboardComponent },
  {
    path: 'analysis',
    component: DashboardAnalysisAnalysisComponent,
    data: { title: 'apollo API' },
    children: [
      {
        path: '',
        component: DashboardAnalysisViewComponent,
        data: { title: '默认页' },
      },
      {
        path: 'detail/:id',
        component: DashboardAnalysisDetailComponent,
        data: { title: '详情' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
