import { Component, OnInit } from '@angular/core';
import { SessionQuery } from '../../store/session.query';
import { SessionService } from '../../store/session.service';

import { SearchRootObject } from '../../Interfaces/search.photos.int';

import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
  searchData: SearchRootObject;
  faHeart = faHeart;
  faArrowDown = faArrowDown;
  faTimes = faTimes;
  show = false;
  image: string;
  mouseOnButton = false;

  constructor(public query: SessionQuery,
              private service: SessionService) { }

  ngOnInit(): void {
    this.query.searchPhotos$.subscribe(data => this.searchData = data);
  }

  showPictureFirst(i): void {
    if (this.mouseOnButton === false) {
      this.image = this.searchData.results[i].urls.small;
      this.show = true;
    }
  }

  showPictureSecond(i): void {
    if (this.mouseOnButton === false) {
      this.image = this.searchData.results[i + 10].urls.small;
      this.show = true;
    }
  }

  showPictureThird(i): void {
    if (this.mouseOnButton === false) {
      this.image = this.searchData.results[i + 20].urls.small;
      this.show = true;
    }
  }

  likePhotoFirst(i): void {
    this.searchData.results[i].liked_by_user = this.searchData.results[i].liked_by_user === false;
    this.service.updateSearchLike(this.searchData);
  }

  likePhotoSecond(i): void {
    this.searchData.results[i + 10].liked_by_user = this.searchData.results[i + 10].liked_by_user === false;
    this.service.updateSearchLike(this.searchData);
  }

  likePhotoThird(i): void {
    this.searchData.results[i + 20].liked_by_user = this.searchData.results[i + 20].liked_by_user === false;
    this.service.updateSearchLike(this.searchData);
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
