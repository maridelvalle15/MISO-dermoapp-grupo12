import 'package:DermoApp/common/helpers/getUserFlags.dart';
import 'package:DermoApp/common/widgets/mainDrawer.dart';
import 'package:DermoApp/main.dart';
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:shared_preferences/shared_preferences.dart';

final countries = {
  'ar': 'Argentina',
  'ca': 'Canada',
  'co': 'Colombia',
  've': 'Venezuela',
};

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  HomeScreenState createState() => HomeScreenState();
}

class HomeScreenState extends State<HomeScreen> {
  int? userId;
  String userEmail = '';
  String userCountry = '';
  String flagEs = 'es';
  String flagEn = 'us';

  @override
  void initState() {
    super.initState();

    getUserData();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        drawer: const MainDrawer(currentSelected: 1),
        appBar: AppBar(
            title: Text(AppLocalizations.of(context).homeTitle,
                style: const TextStyle(fontSize: 14)),
            actions: <Widget>[
              IconButton(
                icon: Image.asset('icons/flags/png/$flagEs.png',
                    package: 'country_icons'),
                onPressed: () => DermoApp.of(context)!
                    .setLocale(const Locale.fromSubtags(languageCode: 'es')),
              ),
              IconButton(
                icon: Image.asset('icons/flags/png/$flagEn.png',
                    package: 'country_icons'),
                onPressed: () => DermoApp.of(context)!
                    .setLocale(const Locale.fromSubtags(languageCode: 'en')),
              ),
            ]),
        body: Column(
          children: <Widget>[
            Container(
              alignment: Alignment.centerLeft,
              margin: const EdgeInsets.fromLTRB(30.0, 50.0, 30.0, 30.0),
              child: Text(
                AppLocalizations.of(context).welcome,
                textAlign: TextAlign.center,
                style: const TextStyle(fontSize: 16.0, color: Colors.white),
              ),
            ),
            Container(
              alignment: Alignment.centerLeft,
              margin: const EdgeInsets.fromLTRB(30.0, 20.0, 30.0, 30.0),
              child: Text(
                AppLocalizations.of(context).currentUser,
                style: const TextStyle(fontSize: 16.0, color: Colors.white),
              ),
            ),
            Container(
              alignment: Alignment.centerLeft,
              margin: const EdgeInsets.fromLTRB(30.0, 10.0, 30.0, 30.0),
              child: Text(
                '${AppLocalizations.of(context).email}: $userEmail',
                style: const TextStyle(fontSize: 16.0, color: Colors.white),
              ),
            ),
            Container(
              alignment: Alignment.centerLeft,
              margin: const EdgeInsets.fromLTRB(30.0, 10.0, 30.0, 30.0),
              child: Text(
                '${AppLocalizations.of(context).id}: $userId',
                style: const TextStyle(fontSize: 16.0, color: Colors.white),
              ),
            ),
            Container(
              alignment: Alignment.centerLeft,
              margin: const EdgeInsets.fromLTRB(30.0, 10.0, 30.0, 30.0),
              child: Text(
                '${AppLocalizations.of(context).country}: ${countries[userCountry]}',
                style: const TextStyle(fontSize: 16.0, color: Colors.white),
              ),
            ),
          ],
        ));
  }

  Future<void> getUserData() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();

    setState(() {
      userId = prefs.getInt('id');
      userEmail = prefs.getString('email') ?? '';
      userCountry = prefs.getString('country') ?? '';
      flagEs = prefs.getString('es_flag') ?? 'es';
      flagEn = prefs.getString('en_flag') ?? 'us';
    });
  }
}
