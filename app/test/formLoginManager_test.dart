import 'dart:convert';
import 'dart:io' as Io;

import 'package:dermoapp/common/functions/FormLoginManager.dart';
import 'package:dermoapp/model/json/userModel.dart';
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
      mockContext = MockBuildContext();

      when(
        client.post(any),
      ).thenAnswer(
          (_) async => Response('{"token":"1234", "user_id":"150"}', 200));

      expect(await submitLogin(mockContext, 'abc@def.com', '1234'),
          isA<UserModel>());
    });

    test('returns false if there is an error', () async {
      final client = MockClient();
      mockContext = MockBuildContext();

      when(
        client.post(any),
      ).thenAnswer((_) async => Response('{"message":"whatever"}', 404));

      expect(await submitLogin(mockContext, 'abc@def.com', '5345'), null);
    });
  });
}
