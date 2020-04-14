import {Component, OnInit} from '@angular/core';
import {Department} from "./department";
import {DepartmentService} from "./department.service";
import {MatSnackBar} from "@angular/material/snack-bar";

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

  depEdit: Department = null;

  constructor(private departmentService: DepartmentService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.departmentService.getDepartments().subscribe((deps) => {
      this.departments = deps;
    })
  }

  save() {
    if (this.depEdit) {
      this.departmentService.updateDepartments({name: this.depName, _id: this.depEdit._id})
        .subscribe((dep) => {
            this.notify('Updated');
            this.clearFields();
          },
          (error) => {
            this.notify('Error');
          });
    } else {
      this.departmentService.addDepartment({name: this.depName}).subscribe(
        (dep) => {
          console.log(dep);
          this.notify('Inserted');
          this.clearFields();
        },
        (error) => console.log(error)
      );
    }
  }

  clearFields() {
    this.depName = '';
    this.depEdit = null;
  }

  cancel() {

  }

  edit(dep: Department) {
    this.depName = dep.name;
    this.depEdit = dep;
  }

  delete(dep: Department) {
    this.departmentService.deleteDepartment(dep)
      .subscribe(() => this.notify('Deleted'),
        (error) => console.log(error));
  }

  notify(msg: string) {
    this.snackBar.open(msg, "OK", {duration: 3000});
  }

}
