import 'package:dermoapp/ui/caseNewScreen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

void main() {
  Widget makeTestableWidget({required Widget child}) {
    return MaterialApp(
      home: child,
    );
  }

  group('signup', () {
    testWidgets('Signup has 4 dropdowns', (WidgetTester tester) async {
      await tester.pumpWidget(makeTestableWidget(
          child: Localizations(
              delegates: AppLocalizations.localizationsDelegates,
              locale: const Locale('en'),
              child: const CaseNewScreen())));

      final dropdownFinder = find.byType(DropdownButton<String>);

      expect(dropdownFinder, findsNWidgets(4));
    });

    testWidgets('Signup has submit button', (WidgetTester tester) async {
      await tester.pumpWidget(makeTestableWidget(
          child: Localizations(
              delegates: AppLocalizations.localizationsDelegates,
              locale: const Locale('en'),
              child: const CaseNewScreen())));

      final dropdownFinder = find.byKey(const Key('btnSubmit'));

      expect(dropdownFinder, findsOneWidget);
    });
  });
}
