import 'dart:convert';
import 'dart:io';

import 'package:dermoapp/common/helpers/getToken.dart';
import 'package:dermoapp/common/values/servicesLocations.dart';
import 'package:dermoapp/model/caseDiagnosticAutoModel.dart';
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

  Future<List<CaseDiagnosticAutoModel>> getDiagnostic(int id) async {
    String token = await getToken() as String;

    final response = await client.get(
        Uri.parse('${services["salud"]}api/diagnostico-automatico'),
        headers: {
          "Content-Type": "application/json",
          "authorization": 'Bearer $token'
        });
    print(response.statusCode);
    if (response.statusCode == 200) {
      var responseJson = json.decode(response.body);
      print(responseJson);
      List<CaseDiagnosticAutoModel> diagnostic = [];
      diagnostic = responseJson["diagnostico"]
          .map<CaseDiagnosticAutoModel>(
              (json) => CaseDiagnosticAutoModel.fromJson(json))
          .toList();

      return diagnostic;
    } else {
      return [];
    }
  }
}
