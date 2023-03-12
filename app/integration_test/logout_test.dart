import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:DermoApp/main.dart' as app;

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  group('logout', () {
    testWidgets('Logout actually works', (tester) async {
      app.main();
      await tester.pumpAndSettle(const Duration(seconds: 5));

      await tester.tap(find.byKey(const Key('btnAccept')));

      await tester.pumpAndSettle(const Duration(seconds: 2));

      await tester.enterText(
          find.byKey(const Key('txtEmail')), 'mixto13@gmail.com');

      await tester.enterText(find.byKey(const Key('txtPassword')), '2eFK1Phm');

      await tester.tap(find.byKey(const Key('btnSubmit')));

      await tester.pumpAndSettle(const Duration(seconds: 4));

      Finder iconButton = find.byType(IconButton).first;
      await tester.tap(iconButton);

      await tester.pumpAndSettle();

      await tester.tap(find.byKey(const Key('btnMenuLogout')));

      await tester.pumpAndSettle(const Duration(seconds: 2));

      final emailField = find.byKey(const Key('txtEmail'));

      expect(emailField, findsOneWidget);

      final submitBtn = find.byKey(const Key('btnSubmit'));

      expect(submitBtn, findsOneWidget);
    });
  });
}
