export class Usuario {
  id: number;
  email: string;
  password: string;
  nombre: string;
  direccion:string;
  ubicacion_id: Ubicacion;
  roles:Rol;

  constructor(
    id: number,
    email: string,
    password: string,
    nombre: string,
    direccion:string,
    ubicacion_id:Ubicacion,
    roles:Rol,
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

export class Ubicacion{
  id: number;
  pais: string;
  ciudad: string;

  constructor(
    id: number,
    pais: string,
    ciudad: string,
  ){
      this.id = id;
      this.pais = pais;
      this.ciudad = ciudad;
  }

}

export class Especialidad{
  id: number;
  nombre: string;

  constructor(
    id: number,
    nombre: string,
  ){
      this.id = id;
      this.nombre = nombre;
  }

}

export class Rol{
  id: number;
  nombre: string;

  constructor(
    id: number,
    nombre: string,
  ){
      this.id = id;
      this.nombre = nombre;
  }

}

export class UsuarioRol{
  id: number;
  usuario_id: Usuario;
  rol_id: Rol;

  constructor(
    id: number,
    usuario_id: Usuario,
    rol_id: Rol

  ){
      this.id = id;
      this.usuario_id = usuario_id;
      this.rol_id = rol_id
  }

}

export class UsuarioMedico{
  id: number;
  licencia: string;
  especialidad: Especialidad;

  constructor(
    id: number,
    licencia: string,
    especialidad: Especialidad

  ){
      this.id = id;
      this.licencia = licencia;
      this.especialidad = especialidad;
  }

}

