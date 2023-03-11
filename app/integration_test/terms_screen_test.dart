import 'package:flutter/foundation.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';

import 'package:dermoapp/main.dart' as app;

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  group('terms', () {
    testWidgets('Rejecting terms shows a dialog', (tester) async {
      app.main();
      await tester.pumpAndSettle(const Duration(seconds: 5));

      await tester.tap(find.byKey(const Key('btnReject')));

      await tester.pump();

      expect(find.byKey(const Key('btnDialog')), findsOneWidget);
    });

    testWidgets('Accepting terms goes to login', (tester) async {
      app.main();
      await tester.pumpAndSettle(const Duration(seconds: 5));

      await tester.tap(find.byKey(const Key('btnAccept')));

      await tester.pumpAndSettle(const Duration(seconds: 2));

      expect(find.byKey(const Key('txtEmail')), findsOneWidget);
    });
  });
}
