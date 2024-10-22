import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent  implements OnInit {

  usuarios: any[] = []; // Array para almacenar los usuarios
  errorMessage: string = ''; // Para manejar errores

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.apiService.getUsers().subscribe({
      next: (data) => {
        this.usuarios = data; // Guardar los usuarios obtenidos de la API
        console.log(this.usuarios); // Para verificar en la consola
      },
      error: (error) => {
        console.error('Error al obtener los usuarios', error);
        this.errorMessage = 'Hubo un error al cargar los usuarios.';
      }
    });
  }

}
