import { CanActivateFn, Router } from '@angular/router';
import { AutenticacionService } from '../services/autenticacion.service';
import { inject } from '@angular/core';
export const authguardGuard: CanActivateFn = (route, state) => {
  const autenticacion = inject(AutenticacionService);
  const router = inject(Router);
  if(autenticacion.isLogged()){
    return true;
  }
  else{
    const url = router.createUrlTree(['/login']);
    return url
  }
};
