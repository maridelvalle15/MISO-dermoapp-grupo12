import 'package:dermoapp/common/auth/doLogout.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class MainDrawer extends StatefulWidget {
  final int currentSelected;

  const MainDrawer({Key? key, required this.currentSelected}) : super(key: key);

  @override
  _MainDrawerState createState() => _MainDrawerState();
}

class _MainDrawerState extends State<MainDrawer> {
  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Container(
        padding: const EdgeInsets.all(15.0),
        child: ListTileTheme(
          selectedColor: const Color(0xFF1E3F52),
          child: ListView(
            children: <Widget>[
              ListTile(
                contentPadding: const EdgeInsets.symmetric(horizontal: 6.0),
                leading: const Icon(Icons.home),
                title: Text(
                  AppLocalizations.of(context).home,
                  style: const TextStyle(
                      fontSize: 20, fontWeight: FontWeight.bold),
                ),
                onTap: () {
                  SystemChannels.textInput.invokeMethod('TextInput.hide');
                  Navigator.of(context).pushReplacementNamed('/home');
                },
                selected: widget.currentSelected == 1,
              ),
              ListTile(
                contentPadding: const EdgeInsets.symmetric(horizontal: 6.0),
                leading: const Icon(Icons.enhanced_encryption),
                title: Text(
                  AppLocalizations.of(context).newCase,
                  style: const TextStyle(
                      fontSize: 20, fontWeight: FontWeight.bold),
                ),
                onTap: () {
                  SystemChannels.textInput.invokeMethod('TextInput.hide');
                  Navigator.of(context).pushReplacementNamed('/case/new');
                },
                selected: widget.currentSelected == 2,
              ),
              ListTile(
                contentPadding: const EdgeInsets.symmetric(horizontal: 6.0),
                leading: const Icon(Icons.enhanced_encryption),
                title: Text(
                  AppLocalizations.of(context).myCases,
                  style: const TextStyle(
                      fontSize: 20, fontWeight: FontWeight.bold),
                ),
                onTap: () {
                  SystemChannels.textInput.invokeMethod('TextInput.hide');
                  Navigator.of(context).pushReplacementNamed('/case/list');
                },
                selected: widget.currentSelected == 3,
              ),
              ListTile(
                contentPadding: const EdgeInsets.symmetric(horizontal: 6.0),
                leading: const Icon(Icons.directions_run),
                title: Text(
                  AppLocalizations.of(context).logout,
                  style: const TextStyle(
                      fontSize: 20, fontWeight: FontWeight.bold),
                ),
                onTap: () {
                  doLogout();
                  Navigator.of(context).pushReplacementNamed('/login');
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
