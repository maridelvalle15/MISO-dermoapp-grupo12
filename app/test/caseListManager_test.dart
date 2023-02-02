import 'package:dermoapp/common/functions/CaseListManager.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart';
import 'package:mockito/mockito.dart';
import 'package:mockito/annotations.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'caseListManager_test.mocks.dart';

@GenerateMocks([Client])
void main() {
  WidgetsFlutterBinding.ensureInitialized();
  group('caseListManager', () {
    test('returns a list', () async {
      final client = MockClient();
      SharedPreferences.setMockInitialValues({"token": "abc123def456"});

      when(
        client.get(any),
      ).thenAnswer((_) async => Response(
          '{"message":"1234", [{"id": 110, "dateCreated": "2022-12-31","diagnosticType": "auto"},{"id": 120, "dateCreated": "2023-12-31","diagnosticType": "auto"}]}',
          200));

      expect(await getMyCases(), isA<List>());
    });
  });
}
