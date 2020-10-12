import { Component, OnInit } from '@angular/core';

import { SessionQuery } from '../../store/session.query';
import { SessionService } from '../../store/session.service';

import { PhotosRootObject } from '../../Interfaces/photos.int';

import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  data: PhotosRootObject[];
  faHeart = faHeart;
  faArrowDown = faArrowDown;
  faTimes = faTimes;
  show = false;
  image: string;
  mouseOnButton = false;
  page: number;

  constructor(public query: SessionQuery,
              private service: SessionService) { }

  ngOnInit(): void {
    this.service.initialUpdateData(1);
    this.query.photos$.subscribe(data => this.data = data);
    this.query.page$.subscribe(page => this.page = page);
  }

  onScroll(): void {
    this.service.updatePage(this.page + 1);
    this.service.concatStore(this.page);
  }

  showPictureFirst(i): void {
    if (this.mouseOnButton === false) {
      this.image = this.data[i].urls.small;
      this.show = true;
    }
  }

  showPictureSecond(i): void {
    if (this.mouseOnButton === false) {
      this.image = this.data[i + 10].urls.small;
      this.show = true;
    }
  }

  showPictureThird(i): void {
    if (this.mouseOnButton === false) {
      this.image = this.data[i + 20].urls.small;
      this.show = true;
    }
  }

  likePhotoFirst(i): void {
    this.data[i].liked_by_user = this.data[i].liked_by_user === false;
    this.service.updateLike(this.data);
  }

  likePhotoSecond(i): void {
    this.data[i + 10].liked_by_user = this.data[i + 10].liked_by_user === false;
    this.service.updateLike(this.data);
  }

  likePhotoThird(i): void {
    this.data[i + 20].liked_by_user = this.data[i + 20].liked_by_user === false;
    this.service.updateLike(this.data);
  }

  posMouseValue(): void {
    this.mouseOnButton = true;
  }

  negMouseValue(): void {
    this.mouseOnButton = false;
  }

  hidePicture(): void {
    this.show = false;
  }
}
