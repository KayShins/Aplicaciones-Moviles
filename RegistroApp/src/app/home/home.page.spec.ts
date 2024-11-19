import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { ApiService } from '../services/api.service';
import { provideHttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let routerSpy : jasmine.SpyObj<Router>
  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot()],
      providers : [ApiService,provideHttpClient()]

    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe ejecutar la animación de los inputs cuando se llame a limpiar', () => {
    const inputElement = document.createElement('input');
    document.body.appendChild(inputElement);
    spyOn(component['animationCtrl'], 'create').and.callThrough();
    component.limpiar();
    expect(component['animationCtrl'].create).toHaveBeenCalled();
    document.body.removeChild(inputElement);
  });
  it('debe actualizar el valor de segment cuando onChangeSegment es llamado', () => {
    const newSegmentValue = 'mis-datos';
    component.onChangeSegment({ detail: { value: newSegmentValue } });
    expect(component.segment).toBe(newSegmentValue);
  });
  it('debe navegar a la página de login cuando se llame a Inicio', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.Inicio();
    expect(routerSpy).toHaveBeenCalledWith(['/login'],{});
  });
});
