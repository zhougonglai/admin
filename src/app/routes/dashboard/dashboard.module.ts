import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { DashboardAnalysisAnalysisComponent } from './analysis/analysis.component';
import { DashboardAnalysisDetailComponent } from './analysis/detail/detail.component';
import { DashboardAnalysisViewComponent } from './analysis/view/view.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './default/dashboard.component';

const COMPONENTS = [
  DashboardComponent,
  DashboardAnalysisAnalysisComponent,
  DashboardAnalysisViewComponent,
  DashboardAnalysisDetailComponent,
];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, DashboardRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class DashboardModule {}
