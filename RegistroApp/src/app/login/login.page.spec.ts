import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { Router } from '@angular/router';
import { state } from '@angular/animations';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let routerSpy: jasmine.SpyObj<Router>;
  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Si el Login es exitoso navega a /home',async () =>{
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const routerSpy = spyOn(TestBed.inject(Router), 'navigate');
    component.user={ usuario : 'Juan', password : '1234'};
    await component.ingresar();

    expect(routerSpy).toHaveBeenCalledWith(['/home'],{
      state:{username : 'Juan', password:'1234'}
    })
  })
  it('Mostrar Alerta si el login es invalido', () => {
    spyOn(window, 'alert');
    component.user = { usuario: 'WrongUser', password: 'WrongPass' };

    component.ingresar();

    expect(window.alert).toHaveBeenCalledWith('Usuario o contraseña incorrecta');

  });

  it('Navegar a pagina para recuperar contraseña si el usuario existe', () => {
    component.user = { usuario: 'Juan', password: '' };
    const routerSpy = spyOn(TestBed.inject(Router), 'navigate');
    component.Recuperar();
  
    expect(routerSpy).toHaveBeenCalledWith(['/recuperar'], {
      state: { username: 'Juan' },
    });
  });
});
