class CaseDiagnosticAutoModel {
  final int casoId;
  final String diagnostico;
  final String certitud;

  CaseDiagnosticAutoModel(this.casoId, this.diagnostico, this.certitud);

  CaseDiagnosticAutoModel.fromJson(Map<dynamic, dynamic> json)
      : casoId = json['caso_id'],
        diagnostico = json['diagnostico'],
        certitud = json['certitud'];
}
