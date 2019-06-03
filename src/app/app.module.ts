// register angular
import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// #region default language
// 参考：https://ng-alain.com/docs/i18n
import { default as ngLang } from '@angular/common/locales/zh';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultInterceptor } from '@core/net/default.interceptor';
// #endregion
// #region Startup Service
import { StartupService } from '@core/startup/startup.service';
import { SimpleInterceptor } from '@delon/auth';
import { DELON_LOCALE, zh_CN as delonLang } from '@delon/theme';
// #endregion
// #region JSON Schema form (using @delon/form)
import { JsonSchemaModule } from '@shared/json-schema/json-schema.module';
import { NZ_I18N, zh_CN as zorroLang } from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
// #endregion
import { DelonModule } from './delon.module';
import { LayoutModule } from './layout/layout.module';
import { RoutesModule } from './routes/routes.module';
import { SharedModule } from './shared/shared.module';
import { GraphQLModule } from './graphql.module';

const LANG = {
  abbr: 'zh',
  ng: ngLang,
  zorro: zorroLang,
  delon: delonLang,
};
registerLocaleData(LANG.ng, LANG.abbr);
const LANG_PROVIDES = [
  { provide: LOCALE_ID, useValue: LANG.abbr },
  { provide: NZ_I18N, useValue: LANG.zorro },
  { provide: DELON_LOCALE, useValue: LANG.delon },
];
const FORM_MODULES = [JsonSchemaModule];
const INTERCEPTOR_PROVIDES = [
  { provide: HTTP_INTERCEPTORS, useClass: SimpleInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
];
// #endregion

// #region global third module
const GLOBAL_THIRD_MODULES = [];
export function StartupServiceFactory(startupService: StartupService): Function {
  return () => startupService.load();
}
const APPINIT_PROVIDES = [
  StartupService,
  {
    provide: APP_INITIALIZER,
    useFactory: StartupServiceFactory,
    deps: [StartupService],
    multi: true,
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DelonModule.forRoot(),
    CoreModule,
    SharedModule,
    LayoutModule,
    RoutesModule,
    ...FORM_MODULES,
    ...GLOBAL_THIRD_MODULES,
    GraphQLModule,
  ],
  providers: [...LANG_PROVIDES, ...INTERCEPTOR_PROVIDES, ...APPINIT_PROVIDES],
  bootstrap: [AppComponent],
})
export class AppModule {}
