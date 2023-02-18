import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.getToken()
        const authRequest = req.clone({
            headers: req.headers.set('Authorization', "Bearer " + authToken)
        })
        return next.handle(authRequest)
    }
}