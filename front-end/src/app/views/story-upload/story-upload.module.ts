import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserStoryComponent } from './user-story/user-story.component';
import { UserStoryChaptersComponent } from './user-story-chapters/user-story-chapters.component';

import { StoryUploadRoutingModule } from './story-upload-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptor } from 'src/app/app.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { AppGuard } from 'src/app/app.guard';

@NgModule({
  declarations: [UserStoryComponent, UserStoryChaptersComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoryUploadRoutingModule,
    NgxDatatableModule,
    ModalModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    },
    CookieService,
    AppGuard
  ],
})
export class StoryUploadModule { }
