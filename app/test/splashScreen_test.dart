import 'package:DermoApp/ui/splashScreen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

void main() {
  Widget makeTestableWidget({required Widget child}) {
    return MaterialApp(
      home: child,
    );
  }

  testWidgets('Splash screen has title and text', (WidgetTester tester) async {
    await tester.pumpWidget(makeTestableWidget(
        child: Localizations(
            delegates: AppLocalizations.localizationsDelegates,
            locale: const Locale('en'),
            child: const SplashScreen())));

    final titleFinder = find.text('DermoApp');
    final textFinder = find.text("Dermatological Diagnostics");

    expect(titleFinder, findsOneWidget);
    expect(textFinder, findsOneWidget);
  });
  ;
}
