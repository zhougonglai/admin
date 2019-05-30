import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SysLogComponent } from './log/log.component';
import { SysLogViewComponent } from './log/view/view.component';
import { SysRoutingModule } from './sys-routing.module';

const COMPONENTS = [SysLogComponent];
const COMPONENTS_NOROUNT = [SysLogViewComponent];

@NgModule({
  imports: [SharedModule, SysRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class SysModule {}
