import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminNavbarsuperiorComponent } from './admin-navbarsuperior.component';

describe('AdminNavbarsuperiorComponent', () => {
  let component: AdminNavbarsuperiorComponent;
  let fixture: ComponentFixture<AdminNavbarsuperiorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AdminNavbarsuperiorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminNavbarsuperiorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
