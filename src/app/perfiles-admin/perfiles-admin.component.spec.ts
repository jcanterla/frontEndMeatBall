import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PerfilesAdminComponent } from './perfiles-admin.component';

describe('PerfilesAdminComponent', () => {
  let component: PerfilesAdminComponent;
  let fixture: ComponentFixture<PerfilesAdminComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PerfilesAdminComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
