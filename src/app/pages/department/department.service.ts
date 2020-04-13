import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Department} from "./department";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  readonly url = "http://localhost:3000/departments";
  private departmentSubject: BehaviorSubject<Department[]> = new BehaviorSubject<Department[]>(null);
  private loaded: boolean = false;

  constructor(private http: HttpClient) {
  }

  getDepartments(): Observable<Department[]> {
    if (!this.loaded) {
      this.http.get<Department[]>(this.url)
        .pipe(tap(deps => console.log(deps)))
        .subscribe(this.departmentSubject);
    }
    return this.departmentSubject.asObservable();
  }

  addDepartment(d: Department): Observable<Department> {
    return this.http.post<Department>(this.url, d)
      .pipe(tap((dep: Department) => this.departmentSubject.getValue().push(dep)));
  }
}
