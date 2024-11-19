import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';


describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no queden peticiones pendientes al finalizar cada prueba
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return user data when gestUser is called', () => {
    const mockUser = { id: 1, name: 'John Doe' };

    service.gestUser(1).subscribe((data) => {
      expect(data).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${service.apiURL}/users/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser); // Simula la respuesta con los datos de mockUser
  });

  it('should return list of users when getUsers is called', () => {
    const mockUsers = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }];

    service.getUsers().subscribe((data) => {
      expect(data).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(`${service.apiURL}/users/`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers); // Simula la respuesta con los datos de mockUsers
  });

  
});
