import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForumRoutingModule } from './forum-routing.module';
import { ForumComponent } from './forum.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ForumThreadComponent } from './forum-thread/forum-thread.component';
import { DateFormatPipe } from 'src/app/shared/pipes/date-format.pipe';


@NgModule({
  declarations: [
    ForumComponent,
    DateFormatPipe,
    ForumThreadComponent
  ],
  imports: [
    CommonModule,
    ForumRoutingModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatInputModule,
    FlexLayoutModule,
    MatDividerModule,
    MatButtonModule
  ]
})
export class ForumModule { }
