import 'dart:convert';
import 'dart:io';

import 'package:dermoapp/common/auth/saveLoginInfo.dart';
import 'package:dermoapp/model/json/userModel.dart';
import 'package:dermoapp/ui/homeScreen.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import '../uifunctions/showSingleDialogButton.dart';

final http.Client client = http.Client();

Future<UserModel?> submitLogin(
    BuildContext context, String correo, String clave) async {
  Map<String, String> data = {
    'correo': correo,
    'password': clave,
  };

  var body = json.encode(data);

  final response = await client.post(Uri.parse('http://.../api/login'),
      body: body, headers: {"Content-Type": "application/json"});

  final loginResponseJson = json.decode(response.body);

  if (response.statusCode == 200) {
    //final processedResponse = json.decode(loginResponseJson);

    Map<String, dynamic> responseJson = {"email": correo};
    responseJson["token"] = loginResponseJson["token"];
    responseJson["id"] = loginResponseJson["user_id"];

    if (!Platform.environment.containsKey('FLUTTER_TEST')) {
      saveLoginInfo(responseJson);
      // ignore: use_build_context_synchronously
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => const HomeScreen()),
      );
    }
    return UserModel.fromJson(responseJson);
  } else {
    if (!Platform.environment.containsKey('FLUTTER_TEST')) {
      // ignore: use_build_context_synchronously
      showDialogSingleButton(
          context,
          AppLocalizations.of(context).thereIsAnError,
          loginResponseJson["message"],
          "OK");
    }
    return null;
  }
}
