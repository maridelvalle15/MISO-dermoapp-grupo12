import 'package:dermoapp/common/managers/FormLoginManager.dart';
import 'package:dermoapp/model/userModel.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart';
import 'package:http/testing.dart';
import 'package:mockito/annotations.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'formLoginManager_test.mocks.dart';

@GenerateNiceMocks([MockSpec<BuildContext>()])
void main() {
  WidgetsFlutterBinding.ensureInitialized();
  MockBuildContext mockContext;

  group('loginManager', () {
    test('returns true if request is ok', () async {
      SharedPreferences.setMockInitialValues({});

      final SharedPreferences sharedPreferences =
          await SharedPreferences.getInstance();
      final loginManager = LoginManager();

      loginManager.client = MockClient((request) async {
        return Response('{"token":"1234", "user_id":150}', 200);
      });
      mockContext = MockBuildContext();

      final user =
          await loginManager.submitLogin(mockContext, "user@gmail.com", "1234");

      expect(user, isA<UserModel>());
    });

    test('returns false if there is an error', () async {
      final loginManager = LoginManager();

      loginManager.client = MockClient((request) async {
        return Response('{"token":"12345", "user_id":150}', 400);
      });
      mockContext = MockBuildContext();

      final user = await loginManager.submitLogin(
          mockContext, "user@gmail.com", "12345");

      expect(user, null);
    });
  });
}
