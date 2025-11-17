
import { Scheduling } from './../pages/scheduling/scheduling';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';

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

    public updateAgendamentoStatus(id: number, newStatus: 'concluido' | 'cancelado'): Observable<any> {
        const url = `${this.apiUrl}?id=eq.${id}`;
        const body = { status: newStatus };
        return this.http.patch(url, body, this.httpOptions);
    }


    public getHorariosOcupados(dia: Date): Observable<string[]> {

        const dataInicio = new Date(dia);
        dataInicio.setHours(0, 0, 0, 0);


        const dataFim = new Date(dia);
        dataFim.setHours(23, 59, 59, 999);


        const url = `${this.apiUrl}?status=eq.agendado&appointment_time=gte.${dataInicio.toISOString()}&appointment_time=lte.${dataFim.toISOString()}&select=appointment_time`;


        return this.http.get<any[]>(url, { headers: this.httpOptions.headers }).pipe(
            map(agendamentos =>

                agendamentos.map(ag => {
                    const data = new Date(ag.appointment_time);
                    const horas = data.getHours().toString().padStart(2, '0');
                    const minutos = data.getMinutes().toString().padStart(2, '0');
                    return `${horas}:${minutos}`;
                })
            )
        );
    }
}