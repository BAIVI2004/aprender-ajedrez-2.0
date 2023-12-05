import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CursosAddComponent } from './cursos-add.component';

// Describe un conjunto de pruebas para el componente CursosAddComponent
describe('CursosAddComponent', () => {
  // Variables para almacenar la instancia del componente y el ComponentFixture
  let component: CursosAddComponent;
  let fixture: ComponentFixture<CursosAddComponent>;

  // Configuración que se ejecuta antes de cada prueba
  beforeEach(async () => {
    // Configura el entorno de prueba con el componente
    await TestBed.configureTestingModule({
      declarations: [CursosAddComponent] // Declaraciones de componentes a utilizar
    }).compileComponents(); // Compila los componentes

    // Crea una instancia de ComponentFixture y obtiene la instancia del componente
    fixture = TestBed.createComponent(CursosAddComponent);
    component = fixture.componentInstance;

    // Detecta los cambios en el componente
    fixture.detectChanges();
  });

  // Prueba: 'should create'
  it('should create', () => {
    // Verifica que el componente se haya creado correctamente
    expect(component).toBeTruthy();
  });
});

