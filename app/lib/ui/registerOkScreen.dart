import 'package:dermoapp/main.dart';
import 'package:dermoapp/ui/loginScreen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class RegisterOkScreen extends StatelessWidget {
  const RegisterOkScreen(
      {super.key, required this.email, required this.password});

  final String email;
  final String password;

  @override
  Widget build(BuildContext context) {
    var drawer = const Drawer();

    return WillPopScope(
      onWillPop: () async => false,
      child: Scaffold(
          drawer: drawer,
          appBar: AppBar(
              automaticallyImplyLeading: false,
              title: Text(AppLocalizations.of(context).signupSuccesfulTitle,
                  style: const TextStyle(fontSize: 14)),
              actions: <Widget>[
                IconButton(
                  icon: Image.asset('icons/flags/png/es.png',
                      package: 'country_icons'),
                  onPressed: () => DermoApp.of(context)!
                      .setLocale(const Locale.fromSubtags(languageCode: 'es')),
                ),
                IconButton(
                  icon: Image.asset('icons/flags/png/us.png',
                      package: 'country_icons'),
                  onPressed: () => DermoApp.of(context)!
                      .setLocale(const Locale.fromSubtags(languageCode: 'en')),
                ),
              ]),
          body: Column(
            children: <Widget>[
              Container(
                  alignment: Alignment.topCenter,
                  child: const Padding(
                    padding: EdgeInsets.fromLTRB(0.0, 40.0, 0.0, 15.0),
                    child: Text("Dermoapp",
                        style: TextStyle(
                            fontSize: 32.0, color: Color(0xFFDFDFDF))),
                  )),
              Container(
                  alignment: Alignment.topCenter,
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(0.0, 40.0, 0.0, 15.0),
                    child: Text(
                        AppLocalizations.of(context).signupSuccessfulText,
                        style: const TextStyle(
                            fontSize: 26.0, color: Color(0xFFDFDFDF))),
                  )),
              Container(
                  alignment: Alignment.topCenter,
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(0.0, 40.0, 0.0, 15.0),
                    child: Text(AppLocalizations.of(context).loginDataText,
                        style: const TextStyle(
                            fontSize: 20.0, color: Color(0xFFDFDFDF))),
                  )),
              Container(
                child: Text(
                  "${AppLocalizations.of(context).email}: $email",
                  style:
                      const TextStyle(fontSize: 18.0, color: Color(0xFFDFDFDF)),
                ),
              ),
              Container(
                child: Text(
                  "${AppLocalizations.of(context).password}: $password",
                  style:
                      const TextStyle(fontSize: 18.0, color: Color(0xFFDFDFDF)),
                ),
              ),
              Padding(
                padding: const EdgeInsets.fromLTRB(0.0, 30.0, 0.0, 0.0),
                child: SizedBox(
                  height: 55.0,
                  child: ElevatedButton(
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => const LoginScreen()),
                      );
                    },
                    child: Text(AppLocalizations.of(context).loginText,
                        style: const TextStyle(
                            color: Colors.white, fontSize: 22.0)),
                  ),
                ),
              ),
            ],
          )),
    );
  }
}
