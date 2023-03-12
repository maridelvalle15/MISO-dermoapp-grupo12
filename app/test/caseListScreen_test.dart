import 'dart:io';

import 'package:DermoApp/ui/caseListScreen.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart';
import 'package:mockito/mockito.dart';
import 'package:mockito/annotations.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

import 'caseListScreen_test.mocks.dart';

@GenerateMocks([Client])
void main() {
  Widget makeTestableWidget({required Widget child}) {
    return MaterialApp(
      home: child,
    );
  }

  setUpAll(() {
    // ↓ required to avoid HTTP error 400 mocked returns
    HttpOverrides.global = null;
  });
  group('caseListManager', () {
    testWidgets('Displays a list of cases', (WidgetTester tester) async {
      final client = MockClient();
      SharedPreferences.setMockInitialValues({"token": "abc123def456"});

      when(
        client.get(any),
      ).thenAnswer((_) async => Response(
          '{"message":"1234", [{"id": 110, "dateCreated": "2022-12-31","diagnosticType": "auto"},{"id": 120, "dateCreated": "2023-12-31","diagnosticType": "auto"}]}',
          200));

      await tester.pumpAndSettle();

      await tester.pumpWidget(makeTestableWidget(
          child: Localizations(
              delegates: AppLocalizations.localizationsDelegates,
              locale: const Locale('en'),
              child: const CaseListScreen())));

      await tester.pumpAndSettle();

      //expect(find.byKey(const Key('btnCaseDetails')), findsNWidgets(2));
      expect(find.text('My cases'), findsNWidgets(2));
    });
  });
}
