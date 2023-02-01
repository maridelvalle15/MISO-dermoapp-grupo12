import 'package:dermoapp/common/functions/FormLoginManager.dart';
import 'package:dermoapp/ui/registerScreen.dart';
import 'package:flutter/material.dart';
import 'package:dermoapp/main.dart';
import 'package:package_info_plus/package_info_plus.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<StatefulWidget> createState() {
    return LoginScreenState();
  }
}

class LoginScreenState extends State<LoginScreen> {
  final TextEditingController _userNameController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  var packageVersion = '';

  @override
  void initState() {
    super.initState();
    getVersion();
  }

  getVersion() async {
    PackageInfo packageInfo = await PackageInfo.fromPlatform();

    setState(() {
      packageVersion = packageInfo.version.toString();
    });
  }

  @override
  Widget build(BuildContext context) {
    final _formKey = GlobalKey<FormState>();
    return Scaffold(
      appBar: AppBar(
          automaticallyImplyLeading: false,
          title: Text(AppLocalizations.of(context).loginTitle,
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
      body: Form(
          key: _formKey,
          child: Padding(
            padding: const EdgeInsets.fromLTRB(30.0, 0.0, 30.0, 0.0),
            child: SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Container(
                      alignment: Alignment.topCenter,
                      child: const Padding(
                        padding: EdgeInsets.fromLTRB(0.0, 40.0, 0.0, 15.0),
                        child: Text("Dermoapp",
                            style: TextStyle(
                                fontSize: 32.0, color: Color(0xFFDFDFDF))),
                      )),
                  Text(AppLocalizations.of(context).email,
                      style: const TextStyle(
                          fontSize: 18.0,
                          color: Color(0xFFDFDFDF),
                          fontWeight: FontWeight.bold)),
                  Padding(
                    padding: const EdgeInsets.fromLTRB(0.0, 5.0, 0.0, 0.0),
                    child: TextFormField(
                      controller: _userNameController,
                      textCapitalization: TextCapitalization.none,
                      style: const TextStyle(
                          fontSize: 18.0, fontWeight: FontWeight.bold),
                      decoration: InputDecoration(
                          contentPadding:
                              const EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
                          enabledBorder: OutlineInputBorder(
                              borderSide:
                                  const BorderSide(color: Color(0xFFDFDFDF)),
                              borderRadius: BorderRadius.circular(6.0))),
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return AppLocalizations.of(context)
                              .validateEmptyValue;
                        }
                        return null;
                      },
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.fromLTRB(0.0, 15.0, 0.0, 0.0),
                    child: Text(AppLocalizations.of(context).password,
                        style: const TextStyle(
                            fontSize: 18.0,
                            color: Color(0xFFDFDFDF),
                            fontWeight: FontWeight.bold)),
                  ),
                  Padding(
                    padding: const EdgeInsets.fromLTRB(0.0, 5.0, 0.0, 0.0),
                    child: TextFormField(
                      controller: _passwordController,
                      obscureText: true,
                      style: const TextStyle(
                          fontSize: 18.0, fontWeight: FontWeight.bold),
                      decoration: InputDecoration(
                        contentPadding:
                            const EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
                        enabledBorder: OutlineInputBorder(
                            borderSide:
                                const BorderSide(color: Color(0xFFDFDFDF)),
                            borderRadius: BorderRadius.circular(6.0)),
                      ),
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return AppLocalizations.of(context)
                              .validateEmptyValue;
                        }
                        return null;
                      },
                    ),
                  ),
                  Column(children: [
                    Padding(
                      padding: const EdgeInsets.fromLTRB(0.0, 30.0, 0.0, 0.0),
                      child: Container(
                        height: 55.0,
                        child: ElevatedButton(
                          onPressed: () {
                            if (_formKey.currentState!.validate()) {
                              //SystemChannels.textInput.invokeMethod('TextInput.hide');
                              submitLogin(context, _userNameController.text,
                                  _passwordController.text);
                            }
                          },
                          child: Text(AppLocalizations.of(context).loginText,
                              style: const TextStyle(fontSize: 22.0)),
                        ),
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
                                  builder: (context) => const RegisterScreen()),
                            );
                          },
                          child: Text(AppLocalizations.of(context).signup,
                              style: const TextStyle(fontSize: 22.0)),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.fromLTRB(0.0, 30.0, 0.0, 0.0),
                      child: Text(
                          AppLocalizations.of(context).internetNeededToLogin,
                          textAlign: TextAlign.center,
                          style: const TextStyle(
                              fontSize: 18.0, color: Color(0xFFDFDFDF))),
                    ),
                    Padding(
                      padding: const EdgeInsets.fromLTRB(0.0, 30.0, 0.0, 0.0),
                      child: Text(
                          "${AppLocalizations.of(context).version}: $packageVersion",
                          textAlign: TextAlign.center,
                          style: const TextStyle(
                              fontSize: 18.0, color: Color(0xFFDFDFDF))),
                    ),
                  ]),
                ],
              ),
            ),
          )),
    );
  }
}
