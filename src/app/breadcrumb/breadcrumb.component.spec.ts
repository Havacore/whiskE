import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {BreadCrumb, BreadcrumbComponent} from './breadcrumb.component';

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreadcrumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the one breadcrumb passed in', () => {
    component.crumbs = [{name: 'Dashboard', url: '/dashboard'}];
    fixture.detectChanges();
    const de = fixture.debugElement;
    expect(de.nativeElement.textContent).toContain('Dashboard');
    expect(fixture).toMatchSnapshot();
  });
});
