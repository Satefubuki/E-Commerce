import { Component, OnInit } from '@angular/core';
import { Story } from 'src/app/models/story';
import { StoriesService } from 'src/app/services/stories.service';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent implements OnInit {
  stories: [Story];

  constructor(private storiesService: StoriesService) { }

  ngOnInit() {
    this.loadStories();
  }

  loadStories() {
    this.storiesService.list2().subscribe(res => {
      this.stories = res.data;
      console.log(this.stories);
    });
  }

}
