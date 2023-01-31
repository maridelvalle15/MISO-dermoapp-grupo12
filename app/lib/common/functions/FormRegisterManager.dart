import 'package:dermoapp/common/uifunctions/showSingleDialogButton.dart';
import 'package:dermoapp/ui/registerOkScreen.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:io';
import 'dart:convert';

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
      'POST', Uri.parse('https://ff4c-186-80-52-161.ngrok.io/signup'));
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
  request.files.add(http.MultipartFile(
      'image', file.readAsBytes().asStream(), file.lengthSync(),
      filename: file.path.split('/').last));

  http.StreamedResponse response = await client.send(request);

  if (response.statusCode == 200) {
    var received = await http.Response.fromStream(response);
    final responseJson = json.decode(received.body);
    var password = json.decode(responseJson)["password"];

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
          context, "Hubo un error", "Por favor inténtelo de nuevo.", "OK");
    }
    return false;
  }
}
