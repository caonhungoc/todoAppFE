import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

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
  
  constructor(private userService: UserService) { }

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

  getTaskByType() {
    this.userService.getTaskByType(this.selectedOption)
    .then(tasks => {
      let jsonRes = JSON.parse(JSON.stringify(tasks));
      this.tasks = jsonRes;
      this.users = [];
    })
  }

  ngOnInit(): void {
    this.userService.getUsers()
    .then(users => {
      this.users = users;
    })
    .catch(e => {
      console.log("error = " + JSON.stringify(e));
    })
  }

}
