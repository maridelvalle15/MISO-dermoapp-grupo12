import { Caso } from "./caso";

export class CasoDetail extends Caso{
  casos: Array<Caso>=[];

  constructor(id:number,informacion:string,numero_lesiones:number,imagen_caso:string,tipo_solucion:string,paciente_id:number,nombrepaciente:string,medico_asignado:number,tipo_piel:string,especialidad_asociada:string,fecha:string,casos: Array<Caso>){
    super(id,informacion,numero_lesiones,imagen_caso,tipo_solucion,paciente_id,nombrepaciente,medico_asignado,tipo_piel,especialidad_asociada,fecha);
    this.casos = casos;
  }
}


