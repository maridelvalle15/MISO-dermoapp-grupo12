import 'dart:convert';
import 'dart:io' as Io;

import 'package:DermoApp/common/managers/CaseDetailManager.dart';
import 'package:DermoApp/model/caseModel.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart';
import 'package:http/testing.dart';
import 'package:mockito/annotations.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();

  group('caseDetail', () {
    test('returns a model if request is ok', () async {
      SharedPreferences.setMockInitialValues({"token": "abc123def456"});
      final caseDetailManager = CaseDetailManager();
      caseDetailManager.client = MockClient((request) async {
        return Response(
            '{"id": 100, "descripcion": "bla", "image": "Sample_abc.jpg", "nombre_paciente": "pedro perez", "tipo_piel": "normal", "fecha": "2023-01-01 00:00:00", "imagenes_extra": [], "tipo_consulta": "", "diagnostico": "", "nombre_medico_asignado": ""}',
            200);
      });

      const id = 110;
      CaseModel result = await caseDetailManager.getCase(id);
      expect(result, isA<CaseModel>());
      expect(result.id, 100);
    });

    test('returns false if there is an error', () async {
      SharedPreferences.setMockInitialValues({"token": "abc123def456"});
      final caseDetailManager = CaseDetailManager();
      caseDetailManager.client = MockClient((request) async {
        return Response('{"error": "there was an error}', 400);
      });

      const id = 110;
      CaseModel result = await caseDetailManager.getCase(id);
      expect(result.id, 0);
    });
  });
}
