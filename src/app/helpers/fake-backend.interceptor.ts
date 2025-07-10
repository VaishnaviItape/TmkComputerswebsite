import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    return of(null).pipe(mergeMap(handleRoute)).pipe(materialize()).pipe(delay(500)).pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/users') && method === 'GET':
          return getUsers();
        default:
          return next.handle(request);
      }
    }

    // route functions

    function authenticate() {
      const { username, password } = body;
      if (username === 'admin' && password === 'admin') {
        return ok({
          id: 1,
          username: 'admin',
          token: 'fake-jwt-token'
        });
      } else {
        return error('Username or password is incorrect');
      }
    }

    function getUsers() {
      if (!isLoggedIn()) return unauthorized();
      return ok([
        { id: 1, username: 'admin' },
        { id: 2, username: 'user' }
      ]);
    }

    // helper functions

    function ok(body?: any) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message: string) {
      return throwError(() => ({ status: 400, error: { message } }));
    }

    function unauthorized() {
      return throwError(() => ({ status: 401, error: { message: 'Unauthorized' } }));
    }

    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }
  }
}
