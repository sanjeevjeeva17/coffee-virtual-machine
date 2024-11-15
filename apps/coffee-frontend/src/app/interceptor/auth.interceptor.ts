import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const adminToken = sessionStorage.getItem('access_token');

  if (req.url.endsWith('/api/resources/load') && adminToken) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${adminToken}`),
    });
    return next(authReq);
  }

  return next(req);
};
