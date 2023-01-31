import 'package:dermoapp/ui/registerOkScreen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

void main() {
  Widget makeTestableWidget({required Widget child}) {
    return MaterialApp(
      home: child,
    );
  }

  group('registerOK', () {
    testWidgets('Email and password are displayed',
        (WidgetTester tester) async {
      await tester.pumpWidget(makeTestableWidget(
          child: Localizations(
              delegates: AppLocalizations.localizationsDelegates,
              locale: const Locale('en'),
              child: const RegisterOkScreen(
                  email: 'abc@xyz.com', password: 'asd456'))));

      final emailText = find.text('E-mail address: abc@xyz.com');
      final passwordText = find.text('Password: asd456');

      expect(emailText, findsOneWidget);
      expect(passwordText, findsOneWidget);
    });
  });
}
