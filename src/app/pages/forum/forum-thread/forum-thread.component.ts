import { Component, Input, OnDestroy, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { Comment } from 'src/app/shared/models/Comment';
import { User } from 'src/app/shared/models/User';
import { Forum } from 'src/app/shared/models/Forum';
import { Subscription } from 'rxjs';
import { ForumService } from 'src/app/shared/services/forum.service';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-forum-thread',
  templateUrl: './forum-thread.component.html',
  styleUrls: ['./forum-thread.component.scss']
})
export class ForumThreadComponent implements OnInit, OnDestroy, OnChanges{
  @Input() forum?: Forum;
  @Output() forumEmitter: EventEmitter<Forum> = new EventEmitter();

  currentUser?: User;

  comments?: Array<Comment>;
  commentSubscription?: Subscription; 

  comment = new FormControl('', [Validators.required]);

  constructor(private forumService: ForumService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user') as string) as User;

    this.commentSubscription = this.forumService.readAllCommentsByForum(this.forum?.id as number).subscribe({
      next: comments => {
        this.comments = comments;
      },
      error: error => {
        console.error(error);
      }
    });
  }

  openSnackBar(message: string, action: string){
    this.snackBar.open(message, action, {duration: 3000});
  }

  addComment(input: HTMLTextAreaElement){
    if(!this.comment?.valid){
      this.openSnackBar('Comment must contain at least 1 charcter!','close');
      return;
    }

    const comment: Comment = {
      forumId: this.forum?.id as number,
      sender: this.currentUser as User,
      date: Timestamp.fromDate(new Date()),
      message: this.comment?.value as string
    };

    this.forumService.add(comment).then( _ => {
      this.openSnackBar('Comment added successfully!','close');
      input.value = "";
      this.goToBottom();
    }).catch( error => {
      console.error(error);
      this.openSnackBar(error,'close');
    })
  }

  goToBottom(){
    const element = document.getElementById('bottom');
    element?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  }

  backToForums(){
    this.forum = undefined;
    this.forumEmitter.emit(this.forum);
  }

  ngOnChanges(){
    this.forumEmitter.emit(this.forum);
    this.goToBottom();
  }

  ngOnDestroy(){
    this.commentSubscription?.unsubscribe();
  }
}
