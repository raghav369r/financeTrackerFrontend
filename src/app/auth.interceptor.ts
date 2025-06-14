import { HttpInterceptorFn } from '@angular/common/http';
import { TOKEN } from './config/constants';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let token = localStorage.getItem(TOKEN);

  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(req);
};
