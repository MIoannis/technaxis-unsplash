import { Component, OnInit } from '@angular/core';

import { SessionQuery } from '../../store/session.query';
import { SessionService } from '../../store/session.service';

import { PhotosRootObject } from '../../Interfaces/photos.int';

import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  data: PhotosRootObject[];
  faHeart = faHeart;
  faArrowDown = faArrowDown;

  constructor(public query: SessionQuery,
              private service: SessionService) { }

  ngOnInit(): void {
    this.service.initialUpdateData();
    this.query.photos$.subscribe(data => this.data = data);
  }
}
