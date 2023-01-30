import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  SplashScreenState createState() => SplashScreenState();
}

class SplashScreenState extends State<SplashScreen> {
  final int splashDuration = 2;

  startTime() async {
    final prefs = await SharedPreferences.getInstance();
    int userId = prefs.getInt('id') ?? 0;

    return Timer(Duration(seconds: splashDuration), () {
      SystemChannels.textInput.invokeMethod('TextInput.hide');
      // verify if it's already logged in, then redirect to home or terms/login
      if (userId != 0) {
        Navigator.of(context).pushReplacementNamed('/HomeScreen');
      } else {
        Navigator.of(context).pushReplacementNamed('/terms');
      }
    });
  }

  @override
  void initState() {
    super.initState();
    startTime();
  }

  @override
  Widget build(BuildContext context) {
    var drawer = const Drawer();

    return Scaffold(
        drawer: drawer,
        body: Container(
            decoration: const BoxDecoration(color: Color(0xFF1E3F52)),
            child: Column(
              children: <Widget>[
                Container(
                  margin: const EdgeInsets.fromLTRB(15.0, 100.0, 15.0, 30.0),
                  decoration: const BoxDecoration(color: Color(0xFF1E3F52)),
                  alignment: const FractionalOffset(0.5, 0.3),
                  child: const Text("DermoApp",
                      style: TextStyle(fontSize: 40.0, color: Colors.white)),
                ),
                Container(
                  margin: const EdgeInsets.fromLTRB(30.0, 50.0, 30.0, 30.0),
                  child: Text(
                    AppLocalizations.of(context).splashText,
                    textAlign: TextAlign.center,
                    style: const TextStyle(fontSize: 16.0, color: Colors.white),
                  ),
                ),
              ],
            )));
  }
}
