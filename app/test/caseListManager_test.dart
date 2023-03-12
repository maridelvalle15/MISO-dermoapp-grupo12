import 'package:DermoApp/common/managers/CaseListManager.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart';
import 'package:http/testing.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  group('caseListManager', () {
    test('returns a list', () async {
      final caseListManager = CaseListManager();
      SharedPreferences.setMockInitialValues({"token": "abc123def456"});

      caseListManager.client = MockClient((request) async {
        return Response(
            '{"message":"1234", "casos": [{"id": 110, "fecha": "2022-12-31 00:00:00","tipodiagnostico": "auto"},{"id": 120, "fecha": "2023-12-31","tipodiagnostico": "auto"}]}',
            200);
      });

      final caseList = await caseListManager.getMyCases();

      expect(caseList, isA<List>());
    });
  });
}
