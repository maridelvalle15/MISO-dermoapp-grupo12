import 'dart:convert';
import 'dart:io';

import 'package:dermoapp/common/helpers/getToken.dart';
import 'package:dermoapp/common/values/servicesLocations.dart';
import 'package:dermoapp/model/caseModel.dart';
import 'package:http/http.dart' as http;

class CaseDetailManager {
  http.Client client = http.Client();

  Future<CaseModel> getCase(int id) async {
    String token = await getToken() as String;
    final response = await client.get(
      Uri.parse('${services["salud"]}api/suministro-lesion/$id'),
      headers: {
        HttpHeaders.authorizationHeader: 'Bearer $token',
      },
    );

    if (response.statusCode == 200) {
      var responseJson = json.decode(response.body);

      CaseModel caseDetail = CaseModel.fromJson(responseJson);

      return caseDetail;
    } else {
      return CaseModel(
          0, '', '', null, '', null, '', '', List.empty(), null, '');
    }
  }
}
