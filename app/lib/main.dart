import 'package:DermoApp/ui/caseListScreen.dart';
import 'package:DermoApp/ui/caseNewScreen.dart';
import 'package:DermoApp/ui/homeScreen.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:DermoApp/ui/registerScreen.dart';
import 'package:DermoApp/ui/loginScreen.dart';
import 'package:DermoApp/ui/splashScreen.dart';
import 'package:DermoApp/ui/termsScreen.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const DermoApp());
}

class DermoApp extends StatefulWidget {
  const DermoApp({super.key});

  @override
  State<DermoApp> createState() => _DermoAppState();
  static _DermoAppState? of(BuildContext context) =>
      context.findAncestorStateOfType<_DermoAppState>();
}

class _DermoAppState extends State<DermoApp> {
  Locale locale = const Locale('es');

  void setLocale(Locale value) {
    setState(() {
      locale = value;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'Dermoapp',
        initialRoute: '/',
        routes: {
          '/': (context) => const SplashScreen(),
          '/terms': (context) => const TermsScreen(),
          '/login': (context) => const LoginScreen(),
          '/register': (context) => const RegisterScreen(),
          '/home': (context) => const HomeScreen(),
          '/case/new': (context) => const CaseNewScreen(),
          '/case/list': (context) => const CaseListScreen()
        },
        localizationsDelegates: AppLocalizations.localizationsDelegates,
        supportedLocales: AppLocalizations.supportedLocales,
        locale: locale,
        theme: ThemeData(
            inputDecorationTheme: const InputDecorationTheme(
                filled: true, fillColor: Color(0xFFDFDFDF)),
            scaffoldBackgroundColor: const Color(0xFF1E3F52),
            appBarTheme: const AppBarTheme(color: Color(0xFF1E3F52)),
            elevatedButtonTheme: ElevatedButtonThemeData(
                style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF1E3F52),
                    foregroundColor: const Color(0xFFDFDFDF),
                    side: const BorderSide(
                        width: 1, color: Color(0xFFDFDFDF))))));
  }
}
