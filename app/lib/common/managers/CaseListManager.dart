import 'dart:convert';
import 'dart:io';

import 'package:dermoapp/common/helpers/getToken.dart';
import 'package:dermoapp/common/values/servicesLocations.dart';
import 'package:dermoapp/model/caseModel.dart';
import 'package:http/http.dart' as http;

class CaseListManager {
  http.Client client = http.Client();

  Future<List> getMyCases() async {
    String token = await getToken() as String;
    final response = await client.get(
      Uri.parse('$services["salud"]api/suministro-lesion'),
      headers: {
        HttpHeaders.authorizationHeader: 'Bearer $token',
      },
    );

    if (response.statusCode == 200) {
      var responseJson = json.decode(response.body);

      List<dynamic> cases = [];
      cases = responseJson["casos"]
          .map<CaseModel>((json) => CaseModel.fromJson(json))
          .toList();

      return cases;
    } else {
      return List.empty();
    }
  }
}
