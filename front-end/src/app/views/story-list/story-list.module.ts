import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoryListRoutingModule } from './story-list-routing.module';
import { StoryListComponent } from './story-list/story-list.component';
import { StoryDetailComponent } from './story-detail/story-detail.component';
import { StoryContentComponent } from './story-content/story-content.component';
import { PreventCopyDirective } from './story-content/prevent-copy.directive';


@NgModule({
  declarations: [
    StoryListComponent,
    StoryDetailComponent,
    StoryContentComponent,
    PreventCopyDirective
  ],
  imports: [
    CommonModule,
    StoryListRoutingModule
  ]
})
export class StoryListModule { }
