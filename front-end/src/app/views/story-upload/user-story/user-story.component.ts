import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';
import { Page } from 'src/app/models/page';
import { Story } from 'src/app/models/story';
import { StoriesService } from 'src/app/services/stories.service';
import { PnotifyService } from 'src/app/utils/pnotify.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-user-story',
  templateUrl: './user-story.component.html'
})
export class UserStoryComponent implements OnInit {

  @ViewChild('editModal', { static: false }) editModal: ModalDirective;
  action: string;
  page: Page = { pageNumber: 0, pageSize: 5 } as Page;

  columns = [
    { name: 'Storyname', prop: 'storyname', sortTable: true },
    { name: 'Description', sortTable: true },
    { name: 'Copyright', sortTable: true },
    { name: 'Imgurl', sortTable: true },
  ];

  stories: Story[] = [];
  story: Story = {id: 0} as Story;
  id: string;

  form: FormGroup;

  constructor(
    private storyService: StoriesService,
    private pnotifyService: PnotifyService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      storyname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      description: ['', Validators.required],
      copyright:['', Validators.email],
      imgurl: ['', Validators.required]
    })
   }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadStories();
  }

  // modals
  hideModal() {
    this.editModal.hide();
  }

  // show modal
  openAdd() {
    this.action = 'Add';
    this.story = { id: 0 } as Story;
    this.editModal.show();
  }

  openEdit(id) {
    event.preventDefault();
    this.action = 'Edit';
    // load data here by id, then show dialog
    this.storyService.get(id).subscribe(res => {
      this.story = res.data;
      this.editModal.show();
    });
  }

  loadStories(page = null) {
    if (page != null) {
      this.page.pageNumber = page.offset;
    }
    this.storyService.getByType(this.id, this.page).subscribe(res => {
      this.page = res.pageInfo;
      this.stories = res.data;
    });
  }

  // save
  save() {
    this.storyService.save(this.story).subscribe((res => {
      if (res.errorCode === 0) {
        this.editModal.hide();
        this.loadStories();
        this.story = {} as Story;
        this.pnotifyService.success('Info', 'Update susess');
      } else {
        this.pnotifyService.error('Info', 'Update failed');
      }
    }), err => {
      this.pnotifyService.error('Info', 'Update failed');
    });
  }

  // delete
  delete(id) {
    event.preventDefault();
    this.pnotifyService.showConfirm('Warnning', 'Are you sure?', yes => {
      if (yes) {
        this.storyService.delete(id).subscribe(res => {
          if (res.errorCode === 0) {
            this.pnotifyService.success('Info', 'Delete susess');
            this.loadStories();
          } else {
            if (res.errorCode === 200) {
              this.pnotifyService.error('Info', 'Delete failed. Data is associated with other objects.');
            } else {
              this.pnotifyService.error('Info', 'Delete failed');
            }
          }
        });
      }
    });
  }

}
