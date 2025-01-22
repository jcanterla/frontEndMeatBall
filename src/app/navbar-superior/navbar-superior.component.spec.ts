import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NavbarSuperiorComponent } from './navbar-superior.component';

describe('NavbarSuperiorComponent', () => {
  let component: NavbarSuperiorComponent;
  let fixture: ComponentFixture<NavbarSuperiorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NavbarSuperiorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarSuperiorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
