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
  final String tipo_consulta;
  final String diagnostico;
  final String nombre_medico;

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
      this.cita_medica,
      this.tipo_consulta,
      this.diagnostico,
      this.nombre_medico);

  CaseModel.fromJson(Map<dynamic, dynamic> json)
      : id = json['id'],
        descripcion = json['descripcion'],
        image = json['image'],
        tipo_solucion = json['tipo_solucion'],
        nombre_paciente = json['nombre_paciente'],
        medico_asignado = json['medico_asignado'],
        tipo_piel = json['tipo_piel'],
        fecha = json['fecha'].substring(0, 10),
        imagenes_extra = json['imagenes_extra'],
        cita_medica = json['cita_id'],
        tipo_consulta = json['tipo_consulta'],
        diagnostico = json['diagnostico'],
        nombre_medico = json['nombre_medico_asignado'];
}
