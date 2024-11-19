import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultarDatosComponent } from './consultar-datos.component';
import { SqliteService } from '../services/sqlite.service';
import { of } from 'rxjs';

describe('ConsultarDatosComponent', () => {
  let component: ConsultarDatosComponent;
  let fixture: ComponentFixture<ConsultarDatosComponent>;
  let sqliteServiceSpy: jasmine.SpyObj<SqliteService>;

  beforeEach(async () => {
    sqliteServiceSpy = jasmine.createSpyObj('SqliteService', ['obtenerAlumnoPorRut', 'editarAlumno', 'delete', 'read']);
    
    await TestBed.configureTestingModule({
      declarations: [ConsultarDatosComponent],
      providers: [
        { provide: SqliteService, useValue: sqliteServiceSpy } // Corregido aquí
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultarDatosComponent);
    component = fixture.componentInstance;
  });

  it('Debe consultar los datos y actualizar los campos cuando se encuentre al alumno', async () => {
  
    const mockAlumno = {
      nombre: 'Juan Perez',
      edad: '25',
      direccion: 'Calle Falsa 123',
      correo: 'juan@correo.com',
      telefono: '123456789'
    };
    sqliteServiceSpy.obtenerAlumnoPorRut.and.returnValue(Promise.resolve(mockAlumno));
    component.rut = '12345678-9';
    await component.consultarDatos();
    expect(component.nombre).toBe('Juan Perez');
    expect(component.edad).toBe('25');
    expect(component.direccion).toBe('Calle Falsa 123');
    expect(component.correo).toBe('juan@correo.com');
    expect(component.telefono).toBe('123456789');
  });

  it('si no se encuentra el alumno los campos no se actualizan', async () => {

    sqliteServiceSpy.obtenerAlumnoPorRut.and.returnValue(Promise.resolve(null));
    
    component.rut = '12345678-9'; 
    await component.consultarDatos();
    expect(component.nombre).toBe('');
    expect(component.edad).toBe('');
    expect(component.direccion).toBe('');
    expect(component.correo).toBe('');
    expect(component.telefono).toBe('');
  });

  it('si no se encuentra el alumno no se elimina', async () => {
    sqliteServiceSpy.delete.and.returnValue(Promise.resolve(null));
  
    component.rut = '12345678-9';
  
    // Act
    await component.borrado();
  
    // Assert
    expect(sqliteServiceSpy.delete).toHaveBeenCalledWith('12345678-9');
  });
});
