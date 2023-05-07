import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Forum } from 'src/app/shared/models/Forum';
import { ForumService } from 'src/app/shared/services/forum.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit, OnDestroy{

  forums?: Forum[];
  forumSubscription?: Subscription;
  selectedForum?: Forum;

  constructor(private forumService: ForumService){}

  ngOnInit(): void {
    this.forumSubscription = this.forumService.readAll().subscribe({
      next: forums => {
        this.forums = forums;
      },
      error: error => {
        console.error(error);
      }
    });
  }

  emittedForum(forum: Forum){
    this.selectedForum = forum;
  }

  selectForum(forum: Forum){
    this.selectedForum = forum;
  }

  ngOnDestroy(): void {
    this.forumSubscription?.unsubscribe();
  }
}
