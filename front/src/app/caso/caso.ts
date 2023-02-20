export class Caso{
  id: any;
  descripcion: string;
  //tipo_lesion: LesionTipo;
  //forma: LesionForma;
  numero_lesiones:number;
  //distribucion:LesionDistribucion,
  image:string;
  tipo_solucion:string;
  paciente_id:number;
  nombre_paciente:string;
  medico_asignado:number;
  tipo_piel:string;
  especialidad_asociada:string;
  fecha:string;

  constructor(
    id: any,
    descripcion: string,
    //tipo_lesion: LesionTipo,
    //forma: LesionForma,
    numero_lesiones:number,
    //distribucion:LesionDistribucion,
    image:string,
    tipo_solucion:string,
    paciente_id:number,
    nombre_paciente:string,
    medico_asignado:number,
    tipo_piel:string,
    especialidad_asociada:string,
    fecha:string,
  ){
    this.id = id;
    this.descripcion= descripcion;
    //this.tipo_lesion= tipo_lesion;
    //this.forma= forma;
    this.numero_lesiones=numero_lesiones;
    //this.distribucion=distribucion;
    this.image=image;
    this.tipo_solucion=tipo_solucion;
    this.paciente_id=paciente_id;
    this.nombre_paciente=nombre_paciente;
    this.medico_asignado=medico_asignado;
    this.tipo_piel=tipo_piel;
    this.especialidad_asociada=especialidad_asociada;
    this.fecha=fecha;
  }

}
