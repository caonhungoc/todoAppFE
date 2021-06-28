import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

import { User } from '../user';
import { Task } from "../task";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[] = [];
  tasks: Task[] = [];
  selectedOption: any = '';
  name: any = '';
  
  constructor(private userService: UserService, private router: Router) { 
    if(!this.userService.isLogin) {
      this.router.navigate(['login']);
    }
  }

  getAllUser() {
    this.userService.getUsers()
    .then(users => {
      this.users = users;
      this.tasks = [];
    })
    .catch(e => {
      console.log("error = " + JSON.stringify(e));
    })
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['login']);
  }

  getTaskByType() {
    this.userService.getTaskByType(this.selectedOption)
    .then(tasks => {
      let jsonRes = JSON.parse(JSON.stringify(tasks));
      this.tasks = jsonRes;
      this.users = [];
    })
  }

  ngOnInit(): void {
    if(this.userService.isLogin && localStorage.getItem('role') === 'admin') {
      this.userService.getUsers()
      .then(users => {
        this.users = users;
        this.name = localStorage.getItem('userName');
      })
      .catch(e => {
        console.log("error = " + JSON.stringify(e));
      })
    }
    else {
      alert('no permission');
      this.router.navigate(['login']);
    }
  }

}
