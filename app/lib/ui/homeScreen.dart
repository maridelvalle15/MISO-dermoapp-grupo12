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
    var drawer = const Drawer();

    return Scaffold(
        drawer: drawer,
        appBar: AppBar(
            title: Text(AppLocalizations.of(context).homeTitle,
                style: const TextStyle(fontSize: 14)),
            actions: <Widget>[
              TextButton(
                child: const Text("ES", style: TextStyle(color: Colors.black)),
                onPressed: () => DermoApp.of(context)!
                    .setLocale(const Locale.fromSubtags(languageCode: 'es')),
              ),
              TextButton(
                child: const Text("EN", style: TextStyle(color: Colors.black)),
                onPressed: () => DermoApp.of(context)!
                    .setLocale(const Locale.fromSubtags(languageCode: 'en')),
              ),
            ]),
        body: Column(
          children: <Widget>[
            Container(
              decoration: const BoxDecoration(color: Colors.white),
              child: Text("esta es tu casita"),
            ),
          ],
        ));
  }
}
