import { Component, OnInit } from '@angular/core';
import { SessionQuery } from '../../store/session.query';
import { SessionService } from '../../store/session.service';

import { Result } from '../../Interfaces/search.photos.int';

import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
  searchData: Result[];
  faHeart = faHeart;
  faArrowDown = faArrowDown;
  faTimes = faTimes;
  show = false;
  image: string;
  mouseOnButton = false;
  searchValue: string;
  page: number;

  constructor(public query: SessionQuery,
              private service: SessionService) { }

  ngOnInit(): void {
    this.query.searchPhotos$.subscribe(data => this.searchData = data);
    this.query.searchValue$.subscribe(value => this.searchValue = value);
    this.query.searchPage$.subscribe(value => this.page = value);
  }

  onScroll(): void {
    this.service.updateSearchPage(this.page + 1);
    this.service.concatSearchStore(this.searchValue, this.page);
  }

  showPictureFirst(i): void {
    if (this.mouseOnButton === false) {
      this.image = this.searchData[i].urls.small;
      this.show = true;
    }
  }

  showPictureSecond(i): void {
    if (this.mouseOnButton === false) {
      this.image = this.searchData[i + this.searchData.length / 3].urls.small;
      this.show = true;
    }
  }

  showPictureThird(i): void {
    if (this.mouseOnButton === false) {
      this.image = this.searchData[i + this.searchData.length / 3 * 2].urls.small;
      this.show = true;
    }
  }

  likePhotoFirst(i): void {
    this.searchData[i].liked_by_user = this.searchData[i].liked_by_user === false;
    this.service.updateSearchLike(this.searchData);
  }

  likePhotoSecond(i): void {
    this.searchData[i + 10].liked_by_user = this.searchData[i + 10].liked_by_user === false;
    this.service.updateSearchLike(this.searchData);
  }

  likePhotoThird(i): void {
    this.searchData[i + 20].liked_by_user = this.searchData[i + 20].liked_by_user === false;
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
