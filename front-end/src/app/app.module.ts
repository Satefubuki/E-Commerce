import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoryListModule } from './views/story-list/story-list.module';
import { StoryUploadModule } from './views/story-upload/story-upload.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { UserActionModule } from './views/user-action/user-action.module';
import { FormsModule } from '@angular/forms';
import { AppInterceptor } from './app.interceptor';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppGuard } from './app.guard';
import {FileUploadModule} from 'ng2-file-upload/file-upload/file-upload.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FileUploadModule,
    AppRoutingModule,
    StoryListModule,
    StoryUploadModule,
    UserActionModule,
    HttpClientModule,
    NgxDatatableModule,
    MDBBootstrapModule.forRoot()
    
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AppInterceptor,
    multi: true
  },
    CookieService,
    AppGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
