import 'dart:async';
import 'dart:convert';
import 'dart:io' as Io;

import 'package:dermoapp/common/managers/FormCaseNewManager.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:http/testing.dart';
import 'package:mockito/mockito.dart';
import 'package:mockito/annotations.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'formCaseNewManager_test.mocks.dart';

@GenerateNiceMocks([MockSpec<BuildContext>()])
void main() {
  WidgetsFlutterBinding.ensureInitialized();
  MockBuildContext mockContext;

  group('caseNew', () {
    test('returns true if request is ok', () async {
      SharedPreferences.setMockInitialValues({"token": "abc123def456"});
      final formCaseManager = FormCaseNewManager();
      formCaseManager.client = MockClient.streaming((request, bodyStream) {
        return bodyStream.bytesToString().then((bodyList) {
          var controller = StreamController<List<int>>(sync: true);
          Future.sync(() {
            controller.add('{"id_caso":"1234"}'.codeUnits);
            controller.close();
          });
          return http.StreamedResponse(controller.stream, 200);
        });
      });

      var image = Io.File("image.png");
      image.writeAsBytes(base64Decode(
          'iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAMAAABIw9uxAAADAFBMVEX///8PDxEHBwkODhAQEBIFBQcTExUGBggRERMSEhQICAoa'));
      mockContext = MockBuildContext();

      expect(
          await formCaseManager.submitCase(
              mockContext, 'myname', '50', 'bogota', '234657', image),
          true);
    });

    test('returns false if there is an error', () async {
      SharedPreferences.setMockInitialValues({"token": "abc123def456"});
      final formCaseManager = FormCaseNewManager();
      formCaseManager.client = MockClient.streaming((request, bodyStream) {
        return bodyStream.bytesToString().then((bodyList) {
          var controller = StreamController<List<int>>(sync: true);
          Future.sync(() {
            controller.add('{"id_caso":"1234"}'.codeUnits);
            controller.close();
          });
          return http.StreamedResponse(controller.stream, 400);
        });
      });

      var image = Io.File("image.png");
      image.writeAsBytes(base64Decode(
          'iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAMAAABIw9uxAAADAFBMVEX///8PDxEHBwkODhAQEBIFBQcTExUGBggRERMSEhQICAoa'));
      mockContext = MockBuildContext();

      expect(
          await formCaseManager.submitCase(
              mockContext, 'myname', '50', 'bogota', '234657', image),
          false);
    });
  });
}
