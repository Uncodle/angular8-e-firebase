import { Injectable } from '@angular/core';
import { ServiceFirebase } from './iservicefirebase.service';

import { Request } from './../models/request.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RequestService extends ServiceFirebase<Request> {
  constructor(firestore: AngularFirestore) {
    super(Request, firestore, 'requests');
   }
}
