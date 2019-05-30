import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SysLogComponent } from './log/log.component';

const routes: Routes = [{ path: 'log', component: SysLogComponent, data: { title: '订单', titleI18n: 'dashboard' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SysRoutingModule {}
