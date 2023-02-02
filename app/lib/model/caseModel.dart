class CaseModel {
  final int id;
  final String date;
  final String diagnosticType;

  CaseModel(this.date, this.diagnosticType, this.id);

  CaseModel.fromJson(Map<dynamic, dynamic> json)
      : date = json['dateCreated'],
        diagnosticType = json['diagnosticType'],
        id = json['id'];

  //Map<String, dynamic> toJson() => {'token': token, 'email': email, 'id': id};
}
