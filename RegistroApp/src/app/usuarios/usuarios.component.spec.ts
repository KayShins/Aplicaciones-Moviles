import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UsuariosComponent } from './usuarios.component';
import { provideHttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { of } from 'rxjs';
describe('UsuariosComponent', () => {
  let component: UsuariosComponent;
  let fixture: ComponentFixture<UsuariosComponent>;
  let apiService: ApiService;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers : [UsuariosComponent, provideHttpClient(), ApiService],
      declarations: [ UsuariosComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
