class CaseDiagnosticAutoModel {
  final String diagnostico;
  final String certitud;

  CaseDiagnosticAutoModel(this.diagnostico, this.certitud);

  CaseDiagnosticAutoModel.fromJson(Map<dynamic, dynamic> json)
      : diagnostico = json['diagnostico'],
        certitud = json['certitud'];
}
