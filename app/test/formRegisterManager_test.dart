import 'dart:convert';
import 'dart:io' as Io;

import 'package:dermoapp/common/functions/FormRegisterManager.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:http/http.dart';
import 'package:mockito/mockito.dart';
import 'package:mockito/annotations.dart';
import 'package:flutter_test/flutter_test.dart';

import 'formRegisterManager_test.mocks.dart';

@GenerateMocks([Client])
@GenerateNiceMocks([MockSpec<BuildContext>(), MockSpec<StreamedResponse>()])
void main() {
  MockBuildContext mockContext;

  group('registerManager', () {
    test('returns true if request is ok', () async {
      final client = MockClient();
      var image = Io.File("image.png");
      await image.writeAsBytes(base64Decode(
          'iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAMAAABIw9uxAAADAFBMVEX///8PDxEHBwkODhAQEBIFBQcTExUGBggRERMSEhQICAoa'));
      mockContext = MockBuildContext();

      when(
        client.send(any),
      ).thenAnswer((_) async => MockStreamedResponse());

      expect(
          await submit(mockContext, 'myname', '50', 'bogota', '234657',
              'email@hey.com', 'co', 'oily', image),
          false);
    });

    test('returns false if there is an error', () async {
      final client = MockClient();
      var image = Io.File("image.png");
      await image.writeAsBytes(base64Decode(
          'iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAMAAABIw9uxAAADAFBMVEX///8PDxEHBwkODhAQEBIFBQcTExUGBggRERMSEhQICAoa'));
      mockContext = MockBuildContext();
      final response = MockStreamedResponse();

      when(client.post(Uri.parse('https://ff4c-186-80-52-161.ngrok.io/signup')))
          .thenAnswer((_) async => http.Response('{"error": "error"}', 404));

      expect(
          await submit(mockContext, 'myname', '50', 'bogota', '234657',
              'email@hey.com', 'co', 'oily', image),
          false);
    });
  });
}
