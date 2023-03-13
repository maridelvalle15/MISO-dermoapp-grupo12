import 'dart:convert';
import 'dart:io' as Io;

import 'package:DermoApp/common/managers/CaseAddImagesManager.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart';
import 'package:http/testing.dart';
import 'package:mockito/annotations.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'caseAddImagesManager_test.mocks.dart';

@GenerateNiceMocks([MockSpec<BuildContext>()])
void main() {
  WidgetsFlutterBinding.ensureInitialized();
  MockBuildContext mockContext;

  group('addNewImagesToCase', () {
    test('returns true if request is ok', () async {
      SharedPreferences.setMockInitialValues({"token": "abc123def456"});
      final newImageManager = CaseAddImagesManager();
      newImageManager.client = MockClient((request) async {
        return Response('{"foo", "bar"}', 200);
      });
      mockContext = MockBuildContext();

      const id = 110;
      var image = Io.File("image.png");
      image.writeAsBytes(base64Decode(
          'iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAMAAABIw9uxAAADAFBMVEX///8PDxEHBwkODhAQEBIFBQcTExUGBggRERMSEhQICAoa'));

      expect(
          await newImageManager.uploadNewImage(mockContext, id, image), true);
    });

    test('returns false if there is an error', () async {
      SharedPreferences.setMockInitialValues({"token": "abc123def456"});
      final newImageManager = CaseAddImagesManager();
      newImageManager.client = MockClient((request) async {
        return Response('{"foo", "bar"}', 400);
      });
      mockContext = MockBuildContext();

      const id = 120;
      var image = Io.File("image.png");
      image.writeAsBytes(base64Decode(
          'iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAMAAABIw9uxAAADAFBMVEX///8PDxEHBwkODhAQEBIFBQcTExUGBggRERMSEhQICAoa'));

      expect(
          await newImageManager.uploadNewImage(mockContext, id, image), false);
    });
  });
}
