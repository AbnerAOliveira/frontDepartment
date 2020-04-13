import {Component, OnInit} from '@angular/core';
import {Department} from "./department";
import {DepartmentService} from "./department.service";

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  depName: string = '';
  departments: Department[] = [
    {name: 'Dep 1', _id: 'asfdadsf'},
    {name: 'Dep 2', _id: 'asfdadsf'},
    {name: 'Dep 3', _id: 'asfdadsf'},
  ];

  constructor(private departmentService: DepartmentService) {
  }

  ngOnInit() {
    this.departmentService.getDepartments().subscribe((deps) => {
      this.departments = deps;
    })
  }

  save() {
    this.departmentService.addDepartment({name: this.depName}).subscribe(
      (dep) => {
        console.log(dep);
      },
      (error) => console.log(error)
    )
  }

  clearFields() {
    this.depName = '';
  }

  cancel() {

  }

  edit(dep: Department) {

  }

  delete(dep: Department) {

  }

}
