class CaseModel {
  final int id;
  final String fecha;
  final String tipodiagnostico;

  CaseModel(this.fecha, this.tipodiagnostico, this.id);

  CaseModel.fromJson(Map<dynamic, dynamic> json)
      : fecha = json['fecha'].substring(0, 10),
        tipodiagnostico = json['tipodiagnostico'],
        id = json['id'];

  //Map<String, dynamic> toJson() => {'token': token, 'email': email, 'id': id};
}
