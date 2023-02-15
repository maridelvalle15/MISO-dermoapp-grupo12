import 'package:dermoapp/ui/caseAddImagesScreen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

void main() {
  Widget makeTestableWidget({required Widget child}) {
    return MaterialApp(
      home: child,
    );
  }

  group('AddImagesForm', () {
    testWidgets('Has a description title', (WidgetTester tester) async {
      await tester.pumpWidget(makeTestableWidget(
          child: Localizations(
              delegates: AppLocalizations.localizationsDelegates,
              locale: const Locale('en'),
              child: const CaseAddImagesScreen(110))));

      final additionalText = find.text('Description');

      expect(additionalText, findsOneWidget);
    });

    testWidgets('Has a submit button', (WidgetTester tester) async {
      await tester.pumpWidget(makeTestableWidget(
          child: Localizations(
              delegates: AppLocalizations.localizationsDelegates,
              locale: const Locale('en'),
              child: const CaseAddImagesScreen(110))));

      final dropdownFinder = find.byKey(const Key('btnUploadImages'));

      expect(dropdownFinder, findsOneWidget);
    });
  });
}
