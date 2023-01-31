import 'package:dermoapp/ui/termsScreen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

void main() {
  Widget makeTestableWidget({required Widget child}) {
    return MaterialApp(
      home: child,
    );
  }

  group('terms', () {
    testWidgets('Terms screen has title', (WidgetTester tester) async {
      await tester.pumpWidget(makeTestableWidget(
          child: Localizations(
              delegates: AppLocalizations.localizationsDelegates,
              locale: const Locale('en'),
              child: const TermsScreen())));

      final titleFinder = find.text('Terms of Use');

      expect(titleFinder, findsOneWidget);
    });

    testWidgets('Rejecting terms shows a dialog', (WidgetTester tester) async {
      await tester.pumpWidget(makeTestableWidget(
          child: Localizations(
              delegates: AppLocalizations.localizationsDelegates,
              locale: const Locale('en'),
              child: const TermsScreen())));

      await tester.tap(find.byKey(const Key('btnReject')));

      await tester.pump();

      expect(find.byKey(const Key('btnDialog')), findsOneWidget);
    });
  });
}
