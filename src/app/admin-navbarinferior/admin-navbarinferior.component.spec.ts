import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminNavbarinferiorComponent } from './admin-navbarinferior.component';

describe('AdminNavbarinferiorComponent', () => {
  let component: AdminNavbarinferiorComponent;
  let fixture: ComponentFixture<AdminNavbarinferiorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AdminNavbarinferiorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminNavbarinferiorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
