import 'dart:convert';
import 'dart:io' as Io;
import 'package:dermoapp/ui/caseCreatedScreen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

void main() {
  Widget makeTestableWidget({required Widget child}) {
    return MaterialApp(
      home: child,
    );
  }

  group('caseDetail', () {
    testWidgets('Fields, image and additional info are displayed',
        (WidgetTester tester) async {
      var image = Io.File("image.png");
      image.writeAsBytes(base64Decode(
          'iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAMAAABIw9uxAAADAFBMVEX///8PDxEHBwkODhAQEBIFBQcTExUGBggRERMSEhQICAoa'));

      await tester.pumpWidget(makeTestableWidget(
          child: Localizations(
              delegates: AppLocalizations.localizationsDelegates,
              locale: const Locale('en'),
              child: CaseCreatedScreen(15,
                  newCase: true,
                  tipo: 'pap',
                  forma: 'dom',
                  cantidad: 'mul',
                  dist: 'con',
                  adicional: 'otra info',
                  foto: image))));

      final createdText = find.text('Your case was created!');
      final typeText = find.text('Papule');
      final additionalText = find.text('otra info');
      final Finder imageField = find.byType(Image);

      await tester.pumpAndSettle();

      expect(createdText, findsOneWidget);
      expect(typeText, findsOneWidget);
      expect(additionalText, findsOneWidget);
      expect(imageField, findsNWidgets(3));
    });
  });
}
