import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RelatorioService {


    private rpcUrl = `${environment.supabaseUrl}/rest/v1/rpc`;

    private httpOptions = {
        headers: new HttpHeaders({
            'apikey': environment.supabaseKey,
            'Authorization': `Bearer ${environment.supabaseKey}`,
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) { }


    public getMonthlySummary(): Observable<any> {

        return this.http.post<any[]>(`${this.rpcUrl}/get_monthly_summary`, {}, this.httpOptions).pipe(

            map(data => (data && data.length > 0) ? data[0] : { total_revenue: 0, total_completed: 0 })
        );
    }

    public getWeeklyRevenue(): Observable<any[]> {
        return this.http.post<any[]>(`${this.rpcUrl}/get_weekly_revenue`, {}, this.httpOptions);
    }
}