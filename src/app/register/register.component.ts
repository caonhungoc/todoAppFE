import { Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../services/user.service';

// import { User } from './../user';

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
  x: Array<string> = new Array<string>();////

  error = '';

  date = new Date();

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
    this.userService.createUser(userInfor)
    .then(data => {
      // this.data.email;
      // this.error = data.toString();
      let jsonRes = JSON.parse(JSON.stringify(data))
      // this.error = JSON.stringify(jsonRes.email);
      this.error = jsonRes.email;
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
