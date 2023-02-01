import 'dart:convert';

import 'package:dermoapp/common/auth/saveLoginInfo.dart';
import 'package:dermoapp/model/json/userModel.dart';
import 'package:dermoapp/ui/homeScreen.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import '../uifunctions/showSingleDialogButton.dart';

Future<UserModel?> submitLogin(
    BuildContext context, String correo, String clave) async {
  Map<String, String> body = {
    'email': correo,
    'password': clave,
  };
  final response = await http
      .post(Uri.parse('https://ff4c-186-80-52-161.ngrok.io/login'), body: body);

  if (response.statusCode == 200) {
    final loginResponseJson = json.decode(response.body);
    final processedResponse = json.decode(loginResponseJson);

    Map<String, dynamic> responseJson = {"email": correo};
    responseJson["token"] = processedResponse["token"];
    responseJson["id"] = processedResponse["id"];

    saveLoginInfo(responseJson);
    // ignore: use_build_context_synchronously
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => const HomeScreen()),
    );
    return UserModel.fromJson(responseJson);
  } else {
    // ignore: use_build_context_synchronously
    showDialogSingleButton(
        context, "No se puede ingresar", "Usuario y/o clave incorrecta.", "OK");
    return null;
  }
}
