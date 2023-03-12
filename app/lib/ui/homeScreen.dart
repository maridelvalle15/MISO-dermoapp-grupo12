import 'package:DermoApp/common/widgets/mainDrawer.dart';
import 'package:DermoApp/main.dart';
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:shared_preferences/shared_preferences.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  HomeScreenState createState() => HomeScreenState();
}

class HomeScreenState extends State<HomeScreen> {
  int? userId;
  String userEmail = '';
  String userCountry = '';

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
            Container(
              margin: const EdgeInsets.fromLTRB(30.0, 20.0, 30.0, 30.0),
              child: Text(
                AppLocalizations.of(context).currentUser,
                style: const TextStyle(fontSize: 16.0, color: Colors.white),
              ),
            ),
            Container(
              margin: const EdgeInsets.fromLTRB(30.0, 10.0, 30.0, 30.0),
              child: Text(
                '${AppLocalizations.of(context).email}: $userEmail',
                style: const TextStyle(fontSize: 16.0, color: Colors.white),
              ),
            ),
            Container(
              margin: const EdgeInsets.fromLTRB(30.0, 10.0, 30.0, 30.0),
              child: Text(
                '${AppLocalizations.of(context).id}: $userId',
                style: const TextStyle(fontSize: 16.0, color: Colors.white),
              ),
            ),
            Container(
              margin: const EdgeInsets.fromLTRB(30.0, 10.0, 30.0, 30.0),
              child: Text(
                '${AppLocalizations.of(context).country}: $userCountry',
                textAlign: TextAlign.left,
                style: const TextStyle(fontSize: 16.0, color: Colors.white),
              ),
            ),
          ],
        ));
  }

  Future<void> getUserData() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    print(prefs.getString('country'));
    setState(() {
      userId = prefs.getInt('id');
      userEmail = prefs.getString('email') ?? '';
      userCountry = prefs.getString('country') ?? '';
    });
  }
}
