import 'package:dermoapp/common/auth/doLogout.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

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
          selectedColor: Colors.green,
          child: ListView(
            children: <Widget>[
              ListTile(
                contentPadding: const EdgeInsets.symmetric(horizontal: 6.0),
                leading: const Icon(Icons.home),
                title: const Text(
                  "Inicio",
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                ),
                onTap: () {
                  SystemChannels.textInput.invokeMethod('TextInput.hide');
                  Navigator.of(context).pushReplacementNamed('/home');
                },
                selected: widget.currentSelected == 1,
              ),
              /*ListTile(
              contentPadding: EdgeInsets.symmetric(horizontal: 6.0),
              leading: Icon(Icons.create),
              title: Text("Avances actividades", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),),
              onTap: () {
                Navigator.of(context).pushReplacementNamed('/ActivityProgressScreen');
              },
              selected: widget.currentSelected == 2,
            ),
            ListTile(
              contentPadding: EdgeInsets.symmetric(horizontal: 6.0),
              leading: Icon(Icons.sync),
              title: Text("Sincronizar", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),),
              onTap: () {
                Navigator.of(context).pushReplacementNamed('/SyncScreen');
              },
              selected: widget.currentSelected == 3,
            ),*/
              ListTile(
                contentPadding: const EdgeInsets.symmetric(horizontal: 6.0),
                leading: const Icon(Icons.directions_run),
                title: const Text(
                  "Salir",
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
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
