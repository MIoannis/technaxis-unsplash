import { Component, OnInit } from '@angular/core';
import { SessionQuery } from '../../store/session.query';

import { SearchRootObject } from '../../Interfaces/search.photos.int';

import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
  searchData: SearchRootObject;
  faHeart = faHeart;
  faArrowDown = faArrowDown;

  constructor(private query: SessionQuery) { }

  ngOnInit(): void {
    this.query.searchPhotos$.subscribe(data => this.searchData = data);
  }

}
