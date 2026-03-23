import { AuthService } from '@app/services/auth.service';
import { KeycloakService } from 'keycloak-angular';
import { timezone } from '../shared/timezone';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';

export function initializer(
  keycloak: KeycloakService,
  authService: AuthService,
  cookieService: CookieService,
): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise((resolve, reject) => {
      authService.metaInformation().subscribe(async item => {
        try {
          const timezonekey = timezone[item.data['timezone-info']];
          if(environment.keycloak){
            await keycloak.init({
              config: item.data['keycloak-info'],
              initOptions: {
                onLoad: 'login-required',
                checkLoginIframe: false,
              },
              bearerExcludedUrls: [],
            });
          }
          const date = new Date();
          const minutes = 60 * 24;
          date.setTime(date.getTime() + minutes * 60 * 1000);
          const ssl = window.location.protocol === 'http:' ? false : true;
          cookieService.set(
            'timezone',
            JSON.stringify(timezonekey),
            date,
            environment.path,
            window.location.hostname,
            ssl,
            'Strict',
          );
          var intervalForTxnlog = item.data['intervalForTxnlog'] || 1;
          cookieService.set(
            'intervalForTxnlog',
            intervalForTxnlog,
            date,
            environment.path,
            window.location.hostname,
            ssl,
            'Strict',
          );
          var sessionExpiryTime = item.data['sessionExpiryTime'] || 1;
          cookieService.set(
            'sessionExpiryTime',
            sessionExpiryTime,
            date,
            environment.path,
            window.location.hostname,
            ssl,
            'Strict',
          );
          resolve(true);
        } catch (error) {
          reject(error);
        }
      });
    });
  };
}
