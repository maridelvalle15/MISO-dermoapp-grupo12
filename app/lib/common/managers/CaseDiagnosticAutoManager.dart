import 'dart:convert';
import 'dart:io';

import 'package:dermoapp/common/helpers/getToken.dart';
import 'package:dermoapp/common/values/servicesLocations.dart';
import 'package:dermoapp/model/caseDiagnosticAutoModel.dart';
import 'package:get/utils.dart';
import 'package:http/http.dart' as http;

class CaseDiagnosticAutoManager {
  http.Client client = http.Client();

  Future<bool> askDiagnosticAuto(int id) async {
    String token = await getToken() as String;

    Map<String, dynamic> data = {'caso_id': id};

    var body = json.encode(data);

    final response = await client.post(
        Uri.parse('${services["salud"]}api/diagnostico-automatico'),
        body: body,
        headers: {
          "Content-Type": "application/json",
          "authorization": 'Bearer $token'
        });

    if (response.statusCode == 200) {
      return true;
    } else {
      return false;
    }
  }

  Future<List> getDiagnostic(int id) async {
    String token = await getToken() as String;

    final response = await client.get(
        Uri.parse('${services["salud"]}api/informacion-diagnostico/$id'),
        headers: {
          "Content-Type": "application/json",
          "authorization": 'Bearer $token'
        });

    if (response.statusCode == 200) {
      var responseJson = json.decode(response.body);

      List diagnostics = [];
      if (responseJson["diagnostico"]["descripcion"].length <= 2) {
        diagnostics = [
          {"diagnostico": "Indeterminado", "certitud": "100%"}
        ];
      } else {
        String diagnosticStr =
            responseJson["diagnostico"]["descripcion"].replaceAll("'", "\"");
        diagnostics = json.decode(diagnosticStr);
      }

      List<dynamic> diagnostic = [];
      diagnostic = diagnostics
          .map<CaseDiagnosticAutoModel>(
              (json) => CaseDiagnosticAutoModel.fromJson(json))
          .toList();

      return diagnostic;
    } else {
      return [];
    }
  }
}
