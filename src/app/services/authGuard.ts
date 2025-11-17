
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './authService';
import { map, take, filter } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {

    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.user$.pipe(

        filter(user => user !== undefined),


        take(1),

        map(user => {

            if (user) {
                return true;
            }


            return router.createUrlTree(['/']);
        })
    );
};