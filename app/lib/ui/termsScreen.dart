import 'package:dermoapp/common/ui/showSingleDialogButton.dart';
import 'package:dermoapp/main.dart';
import 'package:dermoapp/ui/loginScreen.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:country_icons/country_icons.dart';

class TermsScreen extends StatefulWidget {
  const TermsScreen({super.key});

  @override
  TermsScreenState createState() => TermsScreenState();
}

class TermsScreenState extends State<TermsScreen> {
  @override
  Widget build(BuildContext context) {
    var drawer = const Drawer();
    var exitCount = 0;

    return Scaffold(
        drawer: drawer,
        appBar: AppBar(
            automaticallyImplyLeading: false,
            title: Text(AppLocalizations.of(context).termsTitle,
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
            Padding(
              padding: const EdgeInsets.fromLTRB(15.0, 15.0, 15.0, 15.0),
              child: Text(
                AppLocalizations.of(context).termsText,
                style: const TextStyle(color: Colors.white),
              ),
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(0.0, 30.0, 0.0, 0.0),
              child: SizedBox(
                height: 55.0,
                child: ElevatedButton(
                  key: const Key('btnAccept'),
                  onPressed: () {
                    Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => const LoginScreen()));
                  },
                  child: Text(AppLocalizations.of(context).acceptText,
                      style:
                          const TextStyle(color: Colors.white, fontSize: 22.0)),
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(0.0, 30.0, 0.0, 0.0),
              child: SizedBox(
                height: 55.0,
                child: ElevatedButton(
                  key: const Key('btnReject'),
                  onPressed: () {
                    if (exitCount == 0) {
                      showDialogSingleButton(
                          context,
                          AppLocalizations.of(context).refusePopupTitle,
                          AppLocalizations.of(context).refusePopupMessage,
                          AppLocalizations.of(context).refusePopupButtonLabel);
                      exitCount = 1;
                    } else {
                      SystemNavigator.pop();
                    }
                  },
                  child: Text(AppLocalizations.of(context).refuseText,
                      style:
                          const TextStyle(color: Colors.white, fontSize: 22.0)),
                ),
              ),
            ),
          ],
        ));
  }
}
