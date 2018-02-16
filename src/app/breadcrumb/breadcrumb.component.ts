import {Component, Input, OnInit} from '@angular/core';

export interface BreadCrumb {
  name: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  template: `
    <div *ngFor="let crumb of crumbs">
      <div>{{crumb.name}}</div>
    </div>
  `,
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input() crumbs: BreadCrumb[];

  constructor() {
  }

  ngOnInit() {
  }

}
