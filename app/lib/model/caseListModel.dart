class CaseListModel {
  final int id;
  final String fecha;
  final String tipodiagnostico;

  CaseListModel(this.fecha, this.tipodiagnostico, this.id);

  CaseListModel.fromJson(Map<dynamic, dynamic> json)
      : fecha = json['fecha'].substring(0, 10),
        tipodiagnostico = json['tipodiagnostico'],
        id = json['id'];
}
