import 'dart:io';
import 'dart:convert';

import 'package:dermoapp/common/uifunctions/showSingleDialogButton.dart';
import 'package:dermoapp/ui/caseDetailScreen.dart';
import 'package:dermoapp/ui/registerOkScreen.dart';
import 'package:http_parser/http_parser.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:shared_preferences/shared_preferences.dart';

final http.Client client = http.Client();

Future<bool> submitCase(BuildContext context, String tipolesion,
    String formalesion, String cantidadlesion, String distlesion, File? image,
    {String? extraInfo}) async {
  SharedPreferences preferences = await SharedPreferences.getInstance();
  String? token = preferences.getString("token");
  final request = http.MultipartRequest(
      'POST', Uri.parse('https://c6f0-186-80-52-161.ngrok.io/api/caso'));
  request.headers.addAll({'Authorization': 'Bearer $token'});
  request.fields['tipo'] = tipolesion;
  request.fields['forma'] = formalesion;
  request.fields['cantidad'] = cantidadlesion;
  request.fields['distribucion'] = distlesion;
  request.fields['adicional'] = extraInfo ?? '';

  File file = File(image!.path);
  var multiPartFile = await http.MultipartFile.fromPath('image', file.path,
      filename: file.path.split('/').last,
      contentType: MediaType('image', 'jpg'));
  request.files.add(multiPartFile);

  http.StreamedResponse response = await client.send(request);
  var received = await http.Response.fromStream(response);
  final responseJson = json.decode(received.body);

  if (response.statusCode == 200) {
    var caseId = responseJson["id"];

    if (!Platform.environment.containsKey('FLUTTER_TEST')) {
      // ignore: use_build_context_synchronously
      Navigator.push(
        context,
        MaterialPageRoute(
            builder: (context) => CaseDetailScreen(
                  caseId,
                  newCase: true,
                  tipo: tipolesion,
                  forma: formalesion,
                  cantidad: cantidadlesion,
                  dist: distlesion,
                  adicional: extraInfo,
                  foto: file,
                )),
      );
    }
    return true;
  } else {
    if (!Platform.environment.containsKey('FLUTTER_TEST')) {
      // ignore: use_build_context_synchronously
      showDialogSingleButton(
          context,
          AppLocalizations.of(context).thereIsAnError,
          responseJson["message"],
          "OK");
    }
    return false;
  }
}
