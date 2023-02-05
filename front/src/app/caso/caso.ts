export class Caso{
  id: number;
  informacion: string;
  //tipo_lesion: LesionTipo;
  //forma: LesionForma;
  numero_lesiones:number;
  //distribucion:LesionDistribucion,
  imagen_caso:string;
  tipo_solucion:string;
  paciente_id:number;
  nombrepaciente:string;
  medico_asignado:number;
  tipo_piel:string;
  especialidad_asociada:string;
  fecha:string;

  constructor(
    id: number,
    informacion: string,
    //tipo_lesion: LesionTipo,
    //forma: LesionForma,
    numero_lesiones:number,
    //distribucion:LesionDistribucion,
    imagen_caso:string,
    tipo_solucion:string,
    paciente_id:number,
    nombrepaciente:string,
    medico_asignado:number,
    tipo_piel:string,
    especialidad_asociada:string,
    fecha:string,
  ){
    this.id = id;
    this.informacion= informacion;
    //this.tipo_lesion= tipo_lesion;
    //this.forma= forma;
    this.numero_lesiones=numero_lesiones;
    //this.distribucion=distribucion;
    this.imagen_caso=imagen_caso;
    this.tipo_solucion=tipo_solucion;
    this.paciente_id=paciente_id;
    this.nombrepaciente=nombrepaciente;
    this.medico_asignado=medico_asignado;
    this.tipo_piel=tipo_piel;
    this.especialidad_asociada=especialidad_asociada;
    this.fecha=fecha;
  }

}
export class LesionTipo{
  id: number;
  codigo: string;
  nombre: string;

  constructor(
    id: number,
    codigo: string,
    nombre: string,
  ){
    this.id = id;
    this.codigo= codigo;
    this.nombre= nombre;
  }

}

export class LesionForma{
  id: number;
  codigo: string;
  nombre: string;

  constructor(
    id: number,
    codigo: string,
    nombre: string,
  ){
    this.id = id;
    this.codigo= codigo;
    this.nombre= nombre;
  }

}

export class LesionDistribucion{
  id: number;
  codigo: string;
  nombre: string;

  constructor(
    id: number,
    codigo: string,
    nombre: string,
  ){
    this.id = id;
    this.codigo= codigo;
    this.nombre= nombre;
  }

}
