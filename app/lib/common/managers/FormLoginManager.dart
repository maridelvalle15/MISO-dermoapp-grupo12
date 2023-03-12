import 'dart:convert';
import 'dart:io';

import 'package:dermoapp/common/auth/saveLoginInfo.dart';
import 'package:dermoapp/common/helpers/goToAnotherPage.dart';
import 'package:dermoapp/common/values/servicesLocations.dart';
import 'package:dermoapp/model/userModel.dart';
import 'package:dermoapp/ui/homeScreen.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import '../ui/showSingleDialogButton.dart';
import 'package:flutter/foundation.dart' show kIsWeb;

class LoginManager {
  http.Client client = http.Client();

  Future<UserModel?> submitLogin(
      BuildContext context, String correo, String clave) async {
    Map<String, String> data = {
      'correo': correo,
      'password': clave,
    };

    var body = json.encode(data);

    final response = await client.post(
        Uri.parse('${services["auth"]}api/login'),
        body: body,
        headers: {"Content-Type": "application/json"});

    final loginResponseJson = json.decode(response.body);

    if (response.statusCode == 200) {
      Map<String, dynamic> responseJson = {"email": correo};
      responseJson["token"] = loginResponseJson["token"];
      responseJson["id"] = loginResponseJson["user_id"];
      responseJson["country"] = loginResponseJson["codigo_pais"];
      saveLoginInfo(responseJson);
      if (kIsWeb) {
        goToAnotherPage(context, const HomeScreen());
      } else {
        if (!Platform.environment.containsKey('FLUTTER_TEST')) {
          goToAnotherPage(context, const HomeScreen());
        }
      }

      return UserModel.fromJson(responseJson);
    } else {
      if (kIsWeb) {
        // ignore: use_build_context_synchronously
        showDialogSingleButton(
            context,
            AppLocalizations.of(context).thereIsAnError,
            loginResponseJson["message"],
            "OK");
      } else {
        if (!Platform.environment.containsKey('FLUTTER_TEST')) {
          showDialogSingleButton(
              context,
              AppLocalizations.of(context).thereIsAnError,
              loginResponseJson["message"],
              "OK");
        }
      }
      return null;
    }
  }
}
