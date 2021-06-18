import { Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userInfor = {    
    name : '',
    email : '',
    password : '',
    rePassword : '',
  }

  error = '';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private userService: UserService) { }

  ngOnInit(): void {
    // const url = `${this.url}`;
    // this.http.get<any>(url, this.httpOptions).pipe(
    //   tap(data => {this.log(`added + ${data}`); this.error = data}),
    //   catchError(this.handleError<any>('addUser'))
    // );
  }

  register(userInfor: any) {
    if (userInfor.password !== userInfor.rePassword) {
      this.error = "password should be the same";
      return;
    }
    this.error = '';
    this.userService.createUSer(userInfor)
    .then(data => {

      this.error = data.toString();
    })
    .catch(e => {
      this.error = e;
    })
  }

  private log(message: string) {
    console.log(message);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
