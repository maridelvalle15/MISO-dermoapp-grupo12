import 'dart:io';

import 'package:DermoApp/ui/caseDetailsScreen.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart';
import 'package:mockito/mockito.dart';
import 'package:mockito/annotations.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

import 'caseDetailScreen_test.mocks.dart';

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
  group('caseDetailManager', () {
    testWidgets('Displays a case', (WidgetTester tester) async {
      final client = MockClient();
      SharedPreferences.setMockInitialValues({"token": "abc123def456"});

      when(
        client.get(any),
      ).thenAnswer((_) async => Response(
          '{"message":"1234", {"id": 110, "dateCreated": "2022-12-31","diagnosticType": "auto"}}',
          200));

      await tester.pumpAndSettle();

      await tester.pumpWidget(makeTestableWidget(
          child: Localizations(
              delegates: AppLocalizations.localizationsDelegates,
              locale: const Locale('en'),
              child: const CaseDetailScreen(100))));

      await tester.pumpAndSettle();

      expect(find.text('Dermoapp'), findsOneWidget);
      expect(find.text('Description'), findsOneWidget);
    });
  });
}
