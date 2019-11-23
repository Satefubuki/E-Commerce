import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoriesChapter } from 'src/app/models/stories-chapter';
import { ChapterContent } from 'src/app/models/chapter-content';
import { StoryChaptersService } from 'src/app/services/story-chapters.service';
import { ChapterContentService } from 'src/app/services/chapter-content.service';
import { StoriesService } from 'src/app/services/stories.service';
import { Story } from 'src/app/models/story';

@Component({
  selector: 'app-story-content',
  templateUrl: './story-content.component.html',
  styleUrls: ['./story-content.component.css']
})
export class StoryContentComponent implements OnInit {

  story: Story;
  chapters: [StoriesChapter];
  chapContent: ChapterContent;
  content: string;

  constructor(
    private route: ActivatedRoute,
    private storiesService: StoriesService,
    private storyChaptersService: StoryChaptersService,
    private chapterContentService: ChapterContentService
  ) { }

  ngOnInit() {
    const storyId: number = Number(this.route.snapshot.paramMap.get('id'));
    const chapId: number = Number(this.route.snapshot.paramMap.get('chapId'));

    this.storiesService.get(storyId).subscribe(res => {
      this.story = res.data;
    });

    this.storyChaptersService.listByStoryId(storyId).subscribe(res => {
      this.chapters = res.data;
    });

    this.chapterContentService.get(chapId).subscribe(res => {
      this.chapContent = res.data;
      this.content = this.chapContent.content;
    });

  }

}
