
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SchedulingService {


    private apiUrl = `${environment.supabaseUrl}/rest/v1/appointments`;

    private httpOptions = {
        headers: new HttpHeaders({
            'apikey': environment.supabaseKey,
            'Authorization': `Bearer ${environment.supabaseKey}`,
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) { }


    public createAgendamento(agendamentoData: any): Observable<any> {

        return this.http.post<any>(this.apiUrl, agendamentoData, this.httpOptions);
    }

    public getAgendamentosPorCliente(clientId: string): Observable<any[]> {

        const url = `${this.apiUrl}?client_id=eq.${clientId}&status=eq.agendado&select=*,services(*)`;

        return this.http.get<any[]>(url, { headers: this.httpOptions.headers });
    }

    public getAllAgendamentos(): Observable<any[]> {


        const url = `${this.apiUrl}?select=*,services(*),profiles(name)`;


        return this.http.get<any[]>(url, { headers: this.httpOptions.headers });
    }


    public updateAgendamentoStatus(id: number, status: 'concluido' | 'cancelado'): Observable<any> {
        const url = `${this.apiUrl}?id=eq.${id}`;
        const body = { status: status };
        return this.http.patch(url, body, this.httpOptions);
    }


}