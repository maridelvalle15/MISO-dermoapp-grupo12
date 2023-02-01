import 'package:dermoapp/common/widgets/mainDrawer.dart';
import 'package:dermoapp/main.dart';
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  HomeScreenState createState() => HomeScreenState();
}

class HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        drawer: const MainDrawer(currentSelected: 1),
        appBar: AppBar(
            title: Text(AppLocalizations.of(context).homeTitle,
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
              margin: const EdgeInsets.fromLTRB(30.0, 50.0, 30.0, 30.0),
              child: Text(
                AppLocalizations.of(context).welcome,
                textAlign: TextAlign.center,
                style: const TextStyle(fontSize: 16.0, color: Colors.white),
              ),
            ),
          ],
        ));
  }
}
