import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Forum } from '../models/Forum';
import { Observable } from 'rxjs';
import { Comment } from '../models/Comment';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  
  fourmCollectionName: string = 'Forums';
  commentCollectionName: string = 'Comments';


  constructor(private afs: AngularFirestore) { }

  readAll(){
    return this.afs.collection<Forum>(this.fourmCollectionName).valueChanges();
  }

  readAllCommentsByForum(forumId: number): Observable<Array<Comment>>{
    return this.afs.collection<Comment>(this.commentCollectionName, ref => ref.where('forumId','==',forumId).orderBy('date', 'asc').limit(25)).valueChanges();
  }

  add(comment: Comment): Promise<any>{
    return this.afs.collection<Comment>(this.commentCollectionName).add(comment);
  }
}
