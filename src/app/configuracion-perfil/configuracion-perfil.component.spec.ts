import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfiguracionPerfilComponent } from './configuracion-perfil.component';

describe('ConfiguracionPerfilComponent', () => {
  let component: ConfiguracionPerfilComponent;
  let fixture: ComponentFixture<ConfiguracionPerfilComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ConfiguracionPerfilComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfiguracionPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
