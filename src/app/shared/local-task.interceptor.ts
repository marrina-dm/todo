import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable, tap} from "rxjs";

@Injectable()
export class LocalTaskInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event) => {
        if (req.url.includes('/api/tasks') && event instanceof HttpResponse) {
          localStorage.setItem('tasks', JSON.stringify(event.body));
        }
      })
    );
  }

}
