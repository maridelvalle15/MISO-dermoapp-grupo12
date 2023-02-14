import 'dart:convert';
import 'dart:io';

import 'package:dermoapp/common/helpers/getToken.dart';
import 'package:dermoapp/common/values/servicesLocations.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class CaseAddImagesManager {
  http.Client client = http.Client();

  Future<bool> uploadNewImage(BuildContext context, int id, File image) async {
    String token = await getToken() as String;
    String imagenb64 = base64Encode(image.readAsBytesSync());

    Map<String, dynamic> data = {'id_caso': id, 'imagen': imagenb64};

    var body = json.encode(data);

    final response = await client.put(
        Uri.parse('${services["auth"]}api/nuevaimagen'),
        body: body,
        headers: {
          "Content-Type": "application/json",
          "authorization": 'Bearer $token'
        });

    if (response.statusCode == 200) {
      return true;
    } else {
      return false;
    }
  }
}
