import 'dart:convert';

import 'package:dermoapp/common/helpers/getToken.dart';
import 'package:dermoapp/common/values/servicesLocations.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:http/http.dart' as http;

class CaseDiagnosticManualManager {
  http.Client client = http.Client();

  Future<bool> askDiagnosticManual(int id) async {
    String token = await getToken() as String;

    Map<String, dynamic> data = {'caso_id': id};

    var body = json.encode(data);

    final response = await client.post(
        Uri.parse('${services["salud"]}api/diagnostico-medico'),
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

  Future<String?> getDiagnostic(int id) async {
    String token = await getToken() as String;

    final response = await client.get(
        Uri.parse('${services["salud"]}api/informacion-diagnostico/$id'),
        headers: {
          "Content-Type": "application/json",
          "authorization": 'Bearer $token'
        });

    if (response.statusCode == 200) {
      var responseJson = json.decode(response.body);

      var diagnosticResult = responseJson["diagnostico"] ?? "unset";

      if (diagnosticResult == "unset") {
        return null;
      }
      String diagnosticStr = responseJson["diagnostico"]["descripcion"];

      return diagnosticStr;
    } else {
      return null;
    }
  }

  Future<bool> requestTreatment(int id) async {
    String token = await getToken() as String;

    Map<String, dynamic> data = {'caso_id': id};

    var body = json.encode(data);

    final response = await client.post(
        Uri.parse('${services["salud"]}api/solicitar-cita'),
        body: body,
        headers: {
          "Content-Type": "application/json",
          "authorization": 'Bearer $token'
        });
    print(response.statusCode);
    if (response.statusCode == 200) {
      return true;
    } else {
      return false;
    }
  }

  Future<bool> refuseTreatment(int id) async {
    String token = await getToken() as String;

    Map<String, dynamic> data = {'caso_id': id};

    var body = json.encode(data);

    final response = await client.post(
        Uri.parse('${services["salud"]}api/rechazar-diagnostico'),
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
}
