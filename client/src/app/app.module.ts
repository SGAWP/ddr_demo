import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './layouts/layout.module';
import { RoutesRoutingModule } from './routes/routing.module';
import { AppComponent } from './app.component';
import { TokenInterceptor } from "./shared/classes/token.interceptor";

import { StartupService } from './shared/services/startup.service';

import { registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/ru";

export function StartupServiceFactory(startupService: StartupService) {
  return () => startupService.load();
}

registerLocaleData(localeFr, "ru");

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    LayoutModule,
    RoutesRoutingModule
  ],
  providers: [
    StartupService,
    {
      provide: APP_INITIALIZER,
      useFactory: StartupServiceFactory,
      deps: [StartupService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    },
    { provide: LOCALE_ID, useValue: "ru" }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
