import { Injectable } from '@angular/core';
import { ServiceFirebase } from './iservicefirebase.service';
import { Departament } from '../models/departament.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DepartamentService extends ServiceFirebase<Departament>{

  constructor( firestore: AngularFirestore ) {
    super(Departament, firestore, 'departaments');
  }
}
