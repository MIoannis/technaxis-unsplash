import { Component, OnInit } from '@angular/core';

import { SessionQuery } from '../../store/session.query';
import { SessionService } from '../../store/session.service';

import { RootObject } from '../../Interfaces/photos.int';

import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  data: RootObject[];
  shadow = 'rgba(0, 0, 0, 0)';
  faHeart = faHeart;
  faArrowDown = faArrowDown;

  constructor(private query: SessionQuery,
              private service: SessionService) { }

  ngOnInit(): void {
    this.service.updateData();
    this.query.photos$.subscribe(data => this.data = data);
  }

  showShadow(): void {
    this.shadow = 'rgba(0, 0, 0, 0.3)';
  }

  hideShadow(): void {
    this.shadow = 'rgba(0, 0, 0, 0)';
  }
}
