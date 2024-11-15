import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = () => {
  const router = inject(Router);

  const token = sessionStorage.getItem('access_token');
  if (token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
