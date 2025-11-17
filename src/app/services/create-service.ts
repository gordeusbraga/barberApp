
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CreateServiceService {

    private apiUrl = `${environment.supabaseUrl}/rest/v1/services`;

    private httpOptions = {
        headers: new HttpHeaders({
            'apikey': environment.supabaseKey,
            'Authorization': `Bearer ${environment.supabaseKey}`,
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) { }


    public getServicos(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl, {
            headers: this.httpOptions.headers
        });
    }


    public createServico(servicoData: any): Observable<any> {
        const url = `${this.apiUrl}?select=*`;

        return this.http.post<any>(url, servicoData, this.httpOptions);
    }
    public deleteServico(id: number): Observable<any> {
        const url = `${this.apiUrl}?id=eq.${id}`;
        return this.http.delete<any>(url, this.httpOptions);
    }
    public getServicoById(id: string): Observable<any> {

        const url = `${this.apiUrl}?id=eq.${id}&select=*`;

        return this.http.get<any[]>(url, { headers: this.httpOptions.headers }).pipe(

            map(servicos => (servicos && servicos.length > 0) ? servicos[0] : null)
        );
    }

}