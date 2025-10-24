import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
export type User = {
    cpf: string,
    name: string,
    email: string,
    phone: string,
    password: string
}
export type Credentials = {
    email: string,
    password: string
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private userRegistered: boolean = false;
    private userLoggedIn: boolean = false;
    public userLoggedCpf: string = "";
    private users: User[] = [];
    constructor(private router: Router) { }
    public login(credentials: Credentials): boolean {
        const user = this.getUserByEmail(credentials.email);

        if (!user || user.password !== credentials.password) {
            console.log(this.users)

            console.log("Invalid email or password.");
            return false;
        }
        console.log("User logged in:", user);
        console.log(this.users)

        this.userLoggedIn = true;
        this.userLoggedCpf = user.cpf;
        if (this.userLoggedIn) {
            this.router.navigate(['/home']);
        }
        return user !== undefined;


    }

    public register(user: User): void {

        if (this.getUserByCpf(user.cpf)) {
            console.log("User with this CPF already exists.");
            return;
        }
        this.users.push(user);

        console.log("User registered:", user);
        this.userRegistered = true;

        if (this.userRegistered) {
            this.router.navigate(['/']);
        }


    }

    public getUsers(): User[] {
        return this.users;
    }

    public getUserByCpf(cpf: string): User | undefined {
        return this.users.find(u => u.cpf === cpf);
    }
    public getUserByEmail(email: string): User | undefined {
        return this.users.find(u => u.email === email);
    }






}