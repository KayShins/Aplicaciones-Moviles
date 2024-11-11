import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MisDatosComponent } from './mis-datos.component';
import { provideHttpClient } from '@angular/common/http';

describe('MisDatosComponent', () => {
  let component: MisDatosComponent;
  let fixture: ComponentFixture<MisDatosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers:[MisDatosComponent,provideHttpClient()],
      declarations: [ MisDatosComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MisDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
