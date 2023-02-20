import 'dart:async';
import 'dart:convert';
import 'dart:io' as Io;

import 'package:dermoapp/common/managers/FormRegisterManager.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:http/testing.dart';
import 'package:mockito/annotations.dart';
import 'package:flutter_test/flutter_test.dart';

import 'formRegisterManager_test.mocks.dart';

@GenerateNiceMocks([MockSpec<BuildContext>()])
void main() {
  MockBuildContext mockContext;

  group('registerManager', () {
    test('returns true if response is 200', () async {
      final registerManager = FormRegisterManager();
      registerManager.client = MockClient.streaming((request, bodyStream) {
        return bodyStream.bytesToString().then((bodyList) {
          var controller = StreamController<List<int>>(sync: true);
          Future.sync(() {
            controller.add('{"password":"1234"}'.codeUnits);
            controller.close();
          });
          return http.StreamedResponse(controller.stream, 200);
        });
      });

      var image = Io.File("image.png");
      image.writeAsBytes(base64Decode(
          'iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAMAAABIw9uxAAADAFBMVEX///8PDxEHBwkODhAQEBIFBQcTExUGBggRERMSEhQICAoa'));
      mockContext = MockBuildContext();

      final registered = await registerManager.submit(mockContext, 'myname',
          '50', 'bogota', '234657', 'email@hey.com', 'co', 'oily', image);

      expect(registered, true);
    });

    test('returns false if there is an error', () async {
      final registerManager = FormRegisterManager();
      registerManager.client = MockClient.streaming((request, bodyStream) {
        return bodyStream.bytesToString().then((bodyList) {
          var controller = StreamController<List<int>>(sync: true);
          Future.sync(() {
            controller.add('{"password":"1234"}'.codeUnits);
            controller.close();
          });
          return http.StreamedResponse(controller.stream, 400);
        });
      });

      var image = Io.File("image.png");
      image.writeAsBytes(base64Decode(
          'iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAMAAABIw9uxAAADAFBMVEX///8PDxEHBwkODhAQEBIFBQcTExUGBggRERMSEhQICAoa'));
      mockContext = MockBuildContext();

      final registered = await registerManager.submit(mockContext, 'myname',
          '50', 'bogota', '234657', 'email@hey.com', 'co', 'oily', image);

      expect(registered, false);
    });
  });
}
