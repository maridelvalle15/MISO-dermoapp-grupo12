import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:mockito/annotations.dart';
import 'package:mockito/mockito.dart';
import 'package:dermoapp/common/values/servicesLocations.dart';
import 'package:dermoapp/main.dart' as app;

//import '../test/loginScreen_test.mocks.dart';
import 'login_screen_test.mocks.dart';

@GenerateNiceMocks([
  MockSpec<HttpClient>(),
  MockSpec<HttpClientRequest>(),
  MockSpec<HttpClientResponse>(),
  MockSpec<HttpHeaders>(),
])
final mockHttpClient = MockHttpClient();

class MockHttpOverrides extends HttpOverrides {
  @override
  HttpClient createHttpClient(SecurityContext? context) {
    return mockHttpClient;
  }
}

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  setUp(() {
    HttpOverrides.global = MockHttpOverrides();

    when(mockHttpClient.openUrl(any, any)).thenAnswer((invocation) {
      final url = invocation.positionalArguments[1] as Uri;
      // ... customize response based on the URL, or method in invocation.positionalArguments[0]
      final body =
          url.path.contains('login') ? responseBody : aDifferentResponseBody;
      final request = MockHttpClientRequest();
      final response = MockHttpClientResponse();
      when(request.close()).thenAnswer((_) => Future.value(response));
      when(request.addStream(any)).thenAnswer((_) async => null);
      when(request.headers).thenReturn(MockHttpHeaders());
      when(response.headers).thenReturn(MockHttpHeaders());
      when(response.handleError(any, test: anyNamed('test')))
          .thenAnswer((_) => Stream.value(body));
      when(response.statusCode).thenReturn(400);
      when(response.reasonPhrase).thenReturn('OK');
      when(response.contentLength).thenReturn(body.length);
      when(response.isRedirect).thenReturn(false);
      when(response.persistentConnection).thenReturn(false);
      return Future.value(request);
    });
  });

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

      await tester.pumpAndSettle(const Duration(seconds: 2));
    });

    /*testWidgets('Login OK goes to home', (tester) async {
      app.main();
      await tester.pumpAndSettle(const Duration(seconds: 5));

      await tester.tap(find.byKey(const Key('btnAccept')));

      await tester.pumpAndSettle(const Duration(seconds: 2));
    });*/
  });
}

final responseBody = utf8.encode(jsonEncode({
  "message": "errorrrrs",
}));

final aDifferentResponseBody = utf8.encode(jsonEncode({"message": "ayyyy"}));
