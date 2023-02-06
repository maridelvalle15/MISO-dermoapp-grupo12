import 'package:dermoapp/ui/homeScreen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

void main() {
  Widget makeTestableWidget({required Widget child}) {
    return MaterialApp(
      home: child,
    );
  }

  testWidgets('Home screen has drawer and items on it',
      (WidgetTester tester) async {
    await tester.pumpWidget(makeTestableWidget(
        child: Localizations(
            delegates: AppLocalizations.localizationsDelegates,
            locale: const Locale('en'),
            child: const HomeScreen())));

    await tester.pumpAndSettle();
    Finder iconButton = find.byType(IconButton).first;
    await tester.tap(iconButton);
    await tester.pumpAndSettle();
    Finder drawerItems = find.byType(ListTile, skipOffstage: false);
    expect(drawerItems, findsWidgets);
    expect(find.byType(Drawer, skipOffstage: false), findsOneWidget);
  });
  ;
}
