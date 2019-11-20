import { Injectable } from '@angular/core';
import { ServiceFirebase } from './iservicefirebase.service';
import { Employee } from '../models/employee.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends ServiceFirebase<Employee> {

  constructor(
    firestore: AngularFirestore
  ) { 
    super(Employee, firestore, 'employees');
  }
}
