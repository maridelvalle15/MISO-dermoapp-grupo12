class CaseModel {
  final int id;
  final String descripcion;
  final String image;
  final String? tipo_solucion;
  final String nombre_paciente;
  final int? medico_asignado;
  final String tipo_piel;
  final String fecha;
  final List imagenes_extra;
  final int? cita_medica;

  CaseModel(
      this.id,
      this.descripcion,
      this.image,
      this.tipo_solucion,
      this.nombre_paciente,
      this.medico_asignado,
      this.tipo_piel,
      this.fecha,
      this.imagenes_extra,
      this.cita_medica);

  CaseModel.fromJson(Map<dynamic, dynamic> json)
      : id = json['id'],
        descripcion = json['descripcion'],
        image = json['image'],
        tipo_solucion = json['tipo_solucion'],
        nombre_paciente = json['nombre_paciente'],
        medico_asignado = json['medico_asignado'],
        tipo_piel = json['tipo_piel'],
        fecha = json['fecha'],
        imagenes_extra = json['imagenes_extra'],
        cita_medica = json['cita_medica'];
}
