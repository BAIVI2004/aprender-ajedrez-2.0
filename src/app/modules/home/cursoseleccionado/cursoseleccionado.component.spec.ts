import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoseleccionadoComponent } from './cursoseleccionado.component';

describe('CursoseleccionadoComponent', () => {
  let component: CursoseleccionadoComponent;
  let fixture: ComponentFixture<CursoseleccionadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursoseleccionadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursoseleccionadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
