import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  tasks: any = [];
  
  title = '';
  description=  '';

  name: any ='';

  public OPEN_STATUS = 1;
  public CLOSE_STATUS = 2;
  public RE_OPEN_STATUS = 3;
  public REMOVED_STATUS = 4;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('userName');
    this.getAlltask();
  }

  getAlltask() {
    this.userService.getAllTask().then(tasks => {
      this.tasks = tasks;
    })
    .catch(e => {
      console.log("error = " + JSON.stringify(e))
    })
  }

  createTask() {
    // console.log("create task")
    if(this.description.toString() !== "" && this.title.toString() !== "") {
      // console.log("innn create task");
      this.userService.createTask({title: this.title, description: this.description})
      .then(data => {
        console.log(data);
        this.getAlltask();
        this.description = this.title = "";
      })
      .catch(e => {
        console.log("error = " + e);
      })
    }
  }

  deleteTask(id:number) {
    this.userService.deleteTask(id)
    .then(data => {
      console.log(data);
      this.getAlltask();
    })
    .catch(e => {
      console.log("error = " + JSON.stringify(e));
    })
  }

  editTask(task: any) {
      //  console.log("edit task")
    if(task.description.toString() !== "" && task.title.toString() !== "") {
      // console.log("innn edit task");
      this.userService.editTask(task)
      .then(data => {
        console.log(data);
        this.getAlltask();
        this.description = this.title = "";
      })
      .catch(e => {
        console.log("error = " + JSON.stringify(e));
      })
    }
  }

  closeTask(id: number) {
    this.userService.closeTask(id)
    .then(data => {
      console.log(data);
      this.getAlltask();
    })
    .catch(e => {
      console.log("error = " + JSON.stringify(e));
    })
  }

  reopenTask(id: number) {
    this.userService.reopenTask(id)
    .then(data => {
      console.log(data);
      this.getAlltask();
    })
    .catch(e => {
      console.log("error = " + JSON.stringify(e));
    })
  } 
}
