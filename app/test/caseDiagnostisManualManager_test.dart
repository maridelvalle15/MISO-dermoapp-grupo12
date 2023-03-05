import 'package:dermoapp/common/managers/CaseDiagnosticManualManager.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart';
import 'package:http/testing.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();

  group('case diagnostic manual', () {
    test('ask for a diagnostic and return true if ok', () async {
      SharedPreferences.setMockInitialValues({"token": "abc123def456"});
      final caseDiagnosticManualManager = CaseDiagnosticManualManager();
      caseDiagnosticManualManager.client = MockClient((request) async {
        return Response("ok", 200);
      });

      const id = 110;
      bool result = await caseDiagnosticManualManager.askDiagnosticManual(id);
      expect(result, true);
    });

    test('returns false if there is an error', () async {
      SharedPreferences.setMockInitialValues({"token": "abc123def456"});
      final caseDiagnosticManualManager = CaseDiagnosticManualManager();
      caseDiagnosticManualManager.client = MockClient((request) async {
        return Response("error", 400);
      });

      const id = 100;
      bool result = await caseDiagnosticManualManager.askDiagnosticManual(id);
      expect(result, false);
    });

    test('get doctor diagnostic', () async {
      SharedPreferences.setMockInitialValues({"token": "abc123def456"});
      final caseDiagnosticManualManager = CaseDiagnosticManualManager();
      caseDiagnosticManualManager.client = MockClient((request) async {
        return Response('{"diagnostico": {"descripcion": "va bien"}}', 200);
      });

      const id = 110;
      String? result = await caseDiagnosticManualManager.getDiagnostic(id);

      expect(result, "va bien");
    });

    test('get null if there is no diagnostic', () async {
      SharedPreferences.setMockInitialValues({"token": "abc123def456"});
      final caseDiagnosticManualManager = CaseDiagnosticManualManager();
      caseDiagnosticManualManager.client = MockClient((request) async {
        return Response('{"diagnostico": null}', 200);
      });

      const id = 110;
      String? result = await caseDiagnosticManualManager.getDiagnostic(id);

      expect(result, null);
    });

    test('reject a diagnostic and return true if ok', () async {
      SharedPreferences.setMockInitialValues({"token": "abc123def456"});
      final caseDiagnosticManualManager = CaseDiagnosticManualManager();
      caseDiagnosticManualManager.client = MockClient((request) async {
        return Response("ok", 200);
      });

      const id = 110;
      bool result = await caseDiagnosticManualManager.refuseTreatment(id);
      expect(result, true);
    });
  });
}
