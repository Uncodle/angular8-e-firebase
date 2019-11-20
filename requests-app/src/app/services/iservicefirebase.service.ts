import { Model } from './../core/model';
import { ICrud } from '../core/icrud.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { plainToClass } from 'class-transformer';

@Injectable({
    providedIn: 'root'
})
export abstract class ServiceFirebase<T extends Model> implements ICrud<T>{
    ref: AngularFirestoreCollection<T>;
    constructor(
        protected type: { new(): T},
        protected firestore: AngularFirestore,
        public path: string
    ){
        this.ref = this.firestore.collection<T>(this.path);
    }

    get(id: string): Observable<T> {
        let doc = this.ref.doc<T>(id);
        return doc.get().pipe(
            map(
                snapshot => this.docToClass(snapshot)
            )
        );
    }

    docToClass(snapshot): T {
        let doc = {
            id: snapshot.id,
            ...(snapshot.data() as T)
        }

        let typed = plainToClass(this.type, doc);
        return typed;
    }

    list(): Observable<T[]> {
        return this.ref.valueChanges();
    }

    createOrUpdate(item: T, id?: string): Promise<T | void> {
        
        if( id === null ){
            return this.ref.doc(id).set(item).then( response => {
               console.log(response); 
           });
        }
        
        return this.ref.add(item).then( response => {
            item.id = response.id;
            this.ref.doc(response.id).set(item)
        });
    }

    delete(id: string): Promise<void> {
       return this.ref.doc(id).delete();
    }
}