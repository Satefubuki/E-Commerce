import { Component, OnInit } from '@angular/core';
import { StoriesChapter } from 'src/app/models/stories-chapter';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-user-story-chapters',
  templateUrl: './user-story-chapters.component.html'
})
export class UserStoryChaptersComponent implements OnInit {
  ngOnInit(): void {
  }

  // storiesChapter = StoriesChapter.list;
  // storyChapters = [];

  // public Editor = ClassicEditor;
  // editorData = '';

  // storyForm = new FormGroup({
  //   id: new FormControl(this.storiesChapter.length + 1),
  //   storyId: new FormControl(Number(this.route.snapshot.paramMap.get('id'))),
  //   name: new FormControl(''),
  //   content: new FormControl(''),
  // });

  // constructor(
  //   private route: ActivatedRoute
  // ) { }

  // ngOnInit() {
  //   this.init();
  // }

  // private init() {
  //   const stotyId: number = Number(this.route.snapshot.paramMap.get('id'));
  //   this.storiesChapter.forEach(element => {
  //     if (element.storyId === stotyId) {
  //       this.storyChapters.push(element);
  //     }
  //   });
  // }

  // save() {
  //   this.storiesChapter.push(this.storyForm.value);
  //   console.log(this.storiesChapter);
  //   this.init();
  // }

}
