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
  countedUser: number = 0;
  countedTask: number = 0;
  pUser: number = 1;
  pTask: number = 1;
  constructor(private userService: UserService, private router: Router) { 
    if(!this.userService.isLogin) {
      this.router.navigate(['login']);
    }
  }

  handlePageChangeUser(event:number) {
    this.pUser = event;
    this.getAllUser(this.pUser);
  }

  getAllUser(page: number) {
    this.userService.getUser(page)
    .then(data => {
      this.users = data.foundUser;
      this.countedUser = data.amount;
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

  // getTaskByType() {
  //   this.userService.getTaskByType1(this.selectedOption)
  //   .then(tasks => {
  //     let jsonRes = JSON.parse(JSON.stringify(tasks));
  //     this.tasks = jsonRes;
  //     this.users = [];
  //   })
  // }
  getTaskByType() {
    this.userService.getTaskByType(this.selectedOption, this.pTask)
    .then(data => {
      let jsonRes = JSON.parse(JSON.stringify(data));
      
      if(jsonRes.foundTask) {
        this.tasks = jsonRes.foundTask;
      }
      else {
        this.tasks = [];
      }
      this.countedTask = jsonRes.amount;
      this.users = [];
    })
  }

  handlePageChangeTask(event:number) {
    this.pTask = event;
    this.getTaskByType();
  }

  ngOnInit(): void {
    if(this.userService.isLogin && localStorage.getItem('role') === 'admin') {
      this.userService.getUser(1)
      .then(data => {
        this.users = data.foundUser;
        this.countedUser = data.amount;
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
    // this.userService.getUsers(0);
  }

}
