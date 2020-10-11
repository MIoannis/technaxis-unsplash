import { Component, OnInit } from '@angular/core';

import { SessionService } from '../../store/session.service';

import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  faSearch = faSearch;
  formColor = '#eee';

  constructor(private service: SessionService) { }

  ngOnInit(): void {
  }

  submit(form: NgForm): void {
    this.service.updateData(form.value.search);
  }

  formColorWhite(): void {
    this.formColor = 'white';
  }

  formColorGrey(): void {
    this.formColor = '#eee';
  }
}
