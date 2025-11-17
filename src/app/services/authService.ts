
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
    createClient,
    SupabaseClient,
    User as SupabaseUser
} from '@supabase/supabase-js';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';


export type User = {
    cpf: string;
    name: string;
    email: string;
    phone: string;
    password: string;
};

export type Credentials = {
    email: string;
    password: string;
};

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private supabase: SupabaseClient;

    private currentUser = new BehaviorSubject<SupabaseUser | null | undefined>(undefined);

    constructor(private router: Router) {

        this.supabase = createClient(
            environment.supabaseUrl,
            environment.supabaseKey
        );


        this.loadUserSession();
    }


    async loadUserSession() {
        const { data } = await this.supabase.auth.getSession();
        this.currentUser.next(data.session?.user ?? null);
    }


    get user$(): Observable<SupabaseUser | null | undefined> {
        return this.currentUser.asObservable();
    }


    public async login(credentials: Credentials) {

        const { data, error } = await this.supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
        });

        if (error) {
            console.error('Erro no login:', error.message);
            throw error;
        }


        this.currentUser.next(data.user);
        this.router.navigate(['/home']);
        return data;
    }


    public async register(user: User) {

        const { data, error } = await this.supabase.auth.signUp({
            email: user.email,
            password: user.password,
            options: {

                data: {
                    name: user.name,
                    cpf: user.cpf,
                    phone: user.phone,
                },
            },
        });

        if (error) {
            console.error('Erro no registro:', error.message);
            throw error;
        }


        this.router.navigate(['/']);
        return data;
    }


    public async logout() {
        const { error } = await this.supabase.auth.signOut();

        if (error) {
            console.error('Erro no logout:', error.message);
            throw error;
        }


        this.currentUser.next(null);
        this.router.navigate(['/']);
    }
}