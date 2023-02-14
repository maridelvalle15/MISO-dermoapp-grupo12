class CaseModel {
  final int id;
  final String tipo;
  final String forma;
  final String cantidad;
  final String distrib;
  final String imagen;
  final String adicional;

  CaseModel(this.forma, this.tipo, this.id, this.cantidad, this.distrib,
      this.imagen, this.adicional);

  CaseModel.fromJson(Map<dynamic, dynamic> json)
      : id = json['id'],
        tipo = json['tipo'],
        forma = json['forma'],
        cantidad = json['cantidad'],
        distrib = json['distrib'],
        imagen = json['imagen'],
        adicional = json['adicional'];
}
