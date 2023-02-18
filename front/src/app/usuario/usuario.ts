export class Usuario {
  id: number;
  email: string;
  password: string;
  nombre: string;
  direccion:string;
  ubicacion_id: number;
  roles:string;

  constructor(
    id: number,
    email: string,
    password: string,
    nombre: string,
    direccion:string,
    ubicacion_id:number,
    roles:string,
  ){
      this.id = id;
      this.email = email;
      this.password = password;
      this.nombre = nombre;
      this.direccion = direccion;
      this.ubicacion_id = ubicacion_id;
      this.roles = roles;
  }
}
