import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NavbarInferiorComponent } from './navbar-inferior.component';

describe('NavbarInferiorComponent', () => {
  let component: NavbarInferiorComponent;
  let fixture: ComponentFixture<NavbarInferiorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NavbarInferiorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarInferiorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
