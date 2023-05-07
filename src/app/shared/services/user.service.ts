import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  collectionName = 'Users';

  constructor(private afs: AngularFirestore) { }

  create(user: User){
    return this.afs.collection<User>(this.collectionName).doc(user.id).set(user);
  }

  readById(id: string){
    return this.afs.collection<User>(this.collectionName).doc(id).get();
  }

  readByUsername(username: string){
    return this.afs.collection<User>(this.collectionName, ref => ref.where('username', '==', username).limit(1)).valueChanges();
  }

  readByEmail(username: string){
    return this.afs.collection<User>(this.collectionName, ref => ref.where('username', '==', username).limit(1)).valueChanges();
  }

  readAll(){
    return this.afs.collection<User>(this.collectionName).valueChanges();
  }

  update(user: User){
    return this.afs.collection<User>(this.collectionName).doc(user.id).set(user);
  }

  delete(id: string){
    return this.afs.collection<User>(this.collectionName).doc(id).delete();
  }
}
