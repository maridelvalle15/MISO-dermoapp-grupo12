import 'package:dermoapp/common/uifunctions/showSingleDialogButton.dart';
import 'package:dermoapp/ui/registerOkScreen.dart';
import 'package:http_parser/http_parser.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:io';
import 'dart:convert';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

final http.Client client = http.Client();

Future<bool> submit(
    BuildContext context,
    String nombre,
    String edad,
    String ciudad,
    String cedula,
    String correo,
    String pais,
    String tipopiel,
    File? image) async {
  final request = http.MultipartRequest(
      'POST', Uri.parse('https://ae44-186-80-52-161.ngrok.io/api/registro'));
  //request.headers.addAll(<String,String>){'Authorization': 'Bearer $token'});
  request.fields['nombre'] = nombre;
  request.fields['edad'] = edad;
  request.fields['ciudad'] = ciudad;
  request.fields['cedula'] = cedula;
  request.fields['correo'] = correo;
  request.fields['tipopiel'] = tipopiel;
  request.fields['pais'] = pais;
  request.fields['tipousuario'] = 'PACIENTE';

  File file = File(image!.path);
  var multiPartFile = await http.MultipartFile.fromPath('image', file.path,
      filename: file.path.split('/').last,
      contentType: MediaType('image', 'jpg'));
  request.files.add(multiPartFile);

  http.StreamedResponse response = await client.send(request);
  var received = await http.Response.fromStream(response);
  final responseJson = json.decode(received.body);

  if (response.statusCode == 200) {
    var password = responseJson["password"];

    if (!Platform.environment.containsKey('FLUTTER_TEST')) {
      // ignore: use_build_context_synchronously
      Navigator.push(
        context,
        MaterialPageRoute(
            builder: (context) =>
                RegisterOkScreen(email: correo, password: password)),
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
