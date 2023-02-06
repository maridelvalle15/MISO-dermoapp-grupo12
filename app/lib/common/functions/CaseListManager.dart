import 'dart:convert';
import 'dart:io';

import 'package:dermoapp/common/functions/getToken.dart';
import 'package:dermoapp/model/caseModel.dart';
import 'package:http/http.dart' as http;

final http.Client client = http.Client();

Future<List> getMyCases() async {
  String token = await getToken() as String;
  final response = await client.get(
    Uri.parse('https://c6f0-186-80-52-161.ngrok.io/api/caso'),
    headers: {
      HttpHeaders.authorizationHeader: 'Bearer $token',
    },
  );

  if (response.statusCode == 200) {
    var responseJson = json.decode(response.body);

    List<dynamic> cases = [];
    for (final caseResponseTag in responseJson) {
      if (caseResponseTag["cases"] != null) {
        cases = caseResponseTag["cases"]
            .map<CaseModel>((json) => CaseModel.fromJson(json))
            .toList();
        break;
      }
    }

    return cases;
  } else {
    return List.empty();
  }
}
