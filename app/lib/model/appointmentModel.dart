class AppointmentModel {
  final String fecha;
  final String estado;

  AppointmentModel(this.fecha, this.estado);

  AppointmentModel.fromJson(Map<dynamic, dynamic> json)
      : fecha = json['fecha'].substring(0, 10),
        estado = json['status'];
}
