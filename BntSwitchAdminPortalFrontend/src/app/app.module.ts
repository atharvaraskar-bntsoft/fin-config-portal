import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, DoBootstrap } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { adminLteConf } from './admin-lte.conf';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { appReducers } from './store/reducers/app.reducers';
import { effects } from './store/effects';
import { services } from './services';
import { CommonRequestInsterceotor } from './common/common.request.Interceptor';
import { CoreModule } from './core/core.module';
import { ModalModule } from 'angular-custom-modal';
import { SharedModule } from './shared/shared.module';
import { LayoutModule, ChartJsModule } from 'bnt';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { AuthGuard } from '@app/services/guards/auth-guard.service';
import { LoginGuard } from '@app/services/guards/login-guard.service';
import { UserIdleModule } from 'angular-user-idle';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { environment } from '../environments/environment';
import { initializer } from './utils/app-init';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthService } from '@app/services/auth.service';
import { NgZorroModule } from './shared/ng-zorro-module';
import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';
import { HelpPageComponent } from './help-page/help-page.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { UserIdleService } from 'angular-user-idle';
import { ProfileService } from './services/profile.service';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { ShareConfigurationsComponent } from './share-configurations/share-configurations.component';
import { DownloadComponent } from './share-configurations/download/download.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CommonModule } from '@angular/common';           // Required for Angular common directives
import { NgSelectModule } from '@ng-select/ng-select';
import { UploadComponent } from './share-configurations/upload/upload.component';
import { LoaderComponent } from './share-configurations/loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
  // Required for <ng-select>




const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])
export function appInitializerFactory(translate: TranslateService, cookieService: CookieService) {
  return () => {
    const language = cookieService.get('language') || 'en_EN';
    translate.setDefaultLang(language);
    registerLocaleData(en);
    return translate.use(language).toPromise();
  };
}
export default function debug(reducer: any) {
  return function (state: any, action: any) {
    return reducer(state, action);
  };
}

const runtimeChecks = {
  strictStateImmutability: false,
  strictActionImmutability: false,
};
const metaReducers = [debug];

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, HomeComponent, HelpPageComponent, ShareConfigurationsComponent, DownloadComponent, UploadComponent, LoaderComponent],
  imports: [
    HttpClientModule,
    NgxSpinnerModule,
    KeycloakAngularModule,
    UserIdleModule.forRoot({ idle: 60, timeout: 60, ping: 60 }),
    BrowserAnimationsModule,
    SnotifyModule,
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    RxReactiveFormsModule,
    ReactiveFormsModule,
    ChartJsModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    ModalModule,
    MonacoEditorModule.forRoot(), // use forRoot() in main app module only.
    LayoutModule.forRoot(adminLteConf),
    !environment.production
      ? StoreModule.forRoot(appReducers, {
          metaReducers,
          runtimeChecks,
        })
      : StoreModule.forRoot(appReducers, {
          runtimeChecks,
        }),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    NzTreeSelectModule,
    NgZorroModule,
	NgxDatatableModule, 
	FormsModule,        // <---- must include
	    NgSelectModule,     // <---- must include
	    NgxDatatableModule,
		MatProgressSpinnerModule
  ],
  providers: [
    ...services,
    AuthGuard,
    LoginGuard,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    {
      provide: NZ_I18N,
      useValue: en_US,
    },
    SnotifyService,
    {
      provide: NZ_I18N,
      useValue: en_US,
    },
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: CommonRequestInsterceotor,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService, AuthService, CookieService],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService, CookieService],
      multi: true,
    },
    { provide: NZ_ICONS, useValue: icons }
  ],
})
export class AppModule {}
