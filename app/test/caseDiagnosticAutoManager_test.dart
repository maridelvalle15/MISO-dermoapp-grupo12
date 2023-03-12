import 'dart:convert';
import 'dart:io' as Io;

import 'package:DermoApp/common/managers/CaseDiagnosticAutoManager.dart';
import 'package:DermoApp/model/caseModel.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart';
import 'package:http/testing.dart';
import 'package:mockito/annotations.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();

  group('case diagnostic automatic', () {
    test('ask for a diagnostic and return true if ok', () async {
      SharedPreferences.setMockInitialValues({"token": "abc123def456"});
      final caseDiagnosticAutoManager = CaseDiagnosticAutoManager();
      caseDiagnosticAutoManager.client = MockClient((request) async {
        return Response("ok", 200);
      });

      const id = 110;
      bool result = await caseDiagnosticAutoManager.askDiagnosticAuto(id);
      expect(result, true);
    });

    test('returns false if there is an error', () async {
      SharedPreferences.setMockInitialValues({"token": "abc123def456"});
      final caseDiagnosticAutoManager = CaseDiagnosticAutoManager();
      caseDiagnosticAutoManager.client = MockClient((request) async {
        return Response("error", 400);
      });

      const id = 100;
      bool result = await caseDiagnosticAutoManager.askDiagnosticAuto(id);
      expect(result, false);
    });

    test('returns a list', () async {
      final caseDiagnosticAutoManager = CaseDiagnosticAutoManager();
      SharedPreferences.setMockInitialValues({"token": "abc123def456"});

      caseDiagnosticAutoManager.client = MockClient((request) async {
        return Response(
            '{"message":"1234", "diagnostico": {"caso_id": 100, "descripcion": [{"diagnostico": "varicela", "certitud": "80%"}, {"diagnostico": "rosácea", "certitud": "20%"}]}}',
            200);
      });

      final caseList = await caseDiagnosticAutoManager.getDiagnostic(110);

      expect(caseList, isA<List>());
    });

    test('returns an empty list', () async {
      final caseDiagnosticAutoManager = CaseDiagnosticAutoManager();
      SharedPreferences.setMockInitialValues({"token": "abc123def456"});

      caseDiagnosticAutoManager.client = MockClient((request) async {
        return Response('{"message":"error"}', 400);
      });

      final caseList = await caseDiagnosticAutoManager.getDiagnostic(110);

      expect(caseList, []);
    });
  });
}
