import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:dermoapp/main.dart' as app;

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  group('login', () {
    testWidgets('Login invalid shows message', (tester) async {
      app.main();
      await tester.pumpAndSettle(const Duration(seconds: 5));

      await tester.tap(find.byKey(const Key('btnAccept')));

      await tester.pumpAndSettle(const Duration(seconds: 2));

      await tester.enterText(find.byKey(const Key('txtEmail')), 'abc@def.com');

      await tester.enterText(find.byKey(const Key('txtPassword')), '1234');

      await tester.tap(find.byKey(const Key('btnSubmit')));

      await tester.pumpAndSettle(const Duration(seconds: 5));

      expect(find.byKey(const Key('btnDialog')), findsOneWidget);
    });

    testWidgets('Login OK goes to home', (tester) async {
      app.main();
      await tester.pumpAndSettle(const Duration(seconds: 5));

      await tester.tap(find.byKey(const Key('btnAccept')));

      await tester.pumpAndSettle(const Duration(seconds: 2));

      await tester.enterText(
          find.byKey(const Key('txtEmail')), 'mixto13@gmail.com');

      await tester.enterText(find.byKey(const Key('txtPassword')), '2eFK1Phm');

      await tester.tap(find.byKey(const Key('btnSubmit')));

      await tester.pumpAndSettle(const Duration(seconds: 5));

      expect(find.text('Bienvenid@'), findsOneWidget);

      await tester.pumpAndSettle(const Duration(seconds: 2));
    });
  });
}
