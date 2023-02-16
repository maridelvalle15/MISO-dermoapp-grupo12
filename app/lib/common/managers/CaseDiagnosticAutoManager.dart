import 'dart:convert';
import 'dart:io';

import 'package:dermoapp/common/helpers/getToken.dart';
import 'package:dermoapp/common/values/servicesLocations.dart';
import 'package:dermoapp/model/caseDiagnosticAutoModel.dart';
import 'package:http/http.dart' as http;

class CaseDiagnosticAutoManager {
  http.Client client = http.Client();

  Future<List<CaseDiagnosticAutoModel>> getDiagnostic(int id) async {
    String token = await getToken() as String;

    final response = await client
        .get(Uri.parse('${services["auth"]}api/diagnostico-auto/'), headers: {
      "Content-Type": "application/json",
      "authorization": 'Bearer $token'
    });

    if (response.statusCode == 200) {
      var responseJson = json.decode(response.body);

      List<CaseDiagnosticAutoModel> diagnostics = [];
      diagnostics = responseJson["diagnosticos"]
          .map<CaseDiagnosticAutoModel>(
              (json) => CaseDiagnosticAutoModel.fromJson(json))
          .toList();

      return diagnostics;
    } else {
      return [];
    }
  }
}
