import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'environments/environment';
import { AuthService } from './authService';
import { switchMap, map, filter, shareReplay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {


    private profile$: Observable<any | null>;

    private httpOptions = {
        headers: new HttpHeaders({
            'apikey': environment.supabaseKey!,
            'Authorization': `Bearer ${environment.supabaseKey!}`
        })
    };

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {

        this.profile$ = this.authService.user$.pipe(
            filter(user => user !== undefined),
            switchMap(user => {

                if (!user) {
                    return of(null);
                }

                return this.fetchProfile(user.id);
            }),
            shareReplay(1)
        );
    }

    private fetchProfile(userId: string): Observable<any | null> {
        const url = `${environment.supabaseUrl}/rest/v1/profiles?id=eq.${userId}&select=*`;

        return this.http.get<any[]>(url, this.httpOptions).pipe(

            map(profiles => (profiles && profiles.length > 0) ? profiles[0] : null)
        );
    }


    public getCurrentProfile(): Observable<any | null> {
        return this.profile$;
    }
}