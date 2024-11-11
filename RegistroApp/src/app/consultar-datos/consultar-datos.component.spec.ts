import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConsultarDatosComponent } from './consultar-datos.component';
import { provideHttpClient } from '@angular/common/http';

describe('ConsultarDatosComponent', () => {
  let component: ConsultarDatosComponent;
  let fixture: ComponentFixture<ConsultarDatosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers:[ConsultarDatosComponent,provideHttpClient()],
      declarations: [ ConsultarDatosComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultarDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
