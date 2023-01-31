import 'dart:io';

import 'package:dermoapp/common/functions/FormRegisterManager.dart';
import 'package:dermoapp/main.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

final countries = {
  'ar': 'argentina',
  'br': 'brazil',
  'ca': 'canada',
  'co': 'colombia',
  'fr': 'france',
  'de': 'germany',
  'mx': 'mexico',
  'es': 'spain',
  've': 'venezuela',
  'us': 'usa',
};

final skinTypes = {
  'normal': 'normalSkin',
  'dry': 'drySkin',
  'oily': 'oilySkin',
  'mixed': 'mixedSkin',
  'sensitive': 'sensitiveSkin'
};

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  State<StatefulWidget> createState() {
    return RegisterScreenState();
  }
}

class RegisterScreenState extends State<RegisterScreen> {
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _ageController = TextEditingController();
  final TextEditingController _cityController = TextEditingController();
  final TextEditingController _personIdController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();

  bool isDisabled = false;
  bool hasImage = false;
  String countryValue = countries.keys.toList()[3];
  String skinValue = skinTypes.keys.toList().first;
  File? _pickedFile;

  @override
  Widget build(BuildContext context) {
    final _formKey = GlobalKey<FormState>();
    var snackBar = SnackBar(
      content: Text(AppLocalizations.of(context).submittedData),
      duration: const Duration(seconds: 2),
    );
    return Scaffold(
      appBar: AppBar(
          title: Text(AppLocalizations.of(context).signup,
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
                      padding: EdgeInsets.fromLTRB(0.0, 20.0, 0.0, 15.0),
                      child: Text("Dermoapp",
                          style: TextStyle(
                              fontSize: 40.0, color: Color(0xffdfdfdf))),
                    )),
                Padding(
                  padding: const EdgeInsets.fromLTRB(0.0, 15.0, 0.0, 0.0),
                  child: Text(AppLocalizations.of(context).fullName,
                      style: const TextStyle(
                          fontSize: 18.0,
                          color: Color(0xFFDFDFDF),
                          fontWeight: FontWeight.bold)),
                ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(0.0, 5.0, 0.0, 0.0),
                  child: TextFormField(
                    key: const Key('txtName'),
                    controller: _nameController,
                    textCapitalization: TextCapitalization.none,
                    autovalidateMode: AutovalidateMode.onUserInteraction,
                    style: const TextStyle(
                        fontSize: 18.0,
                        color: Colors.black,
                        fontWeight: FontWeight.bold),
                    decoration: InputDecoration(
                        contentPadding:
                            const EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
                        enabledBorder: OutlineInputBorder(
                            borderSide:
                                const BorderSide(color: Color(0xFFDFDFDF)),
                            borderRadius: BorderRadius.circular(6.0))),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return AppLocalizations.of(context).validateEmptyValue;
                      }
                      return null;
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(0.0, 15.0, 0.0, 0.0),
                  child: Text(AppLocalizations.of(context).age,
                      style: const TextStyle(
                          fontSize: 18.0,
                          color: Color(0xFFDFDFDF),
                          fontWeight: FontWeight.bold)),
                ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(0.0, 5.0, 0.0, 0.0),
                  child: TextFormField(
                    key: const Key('txtAge'),
                    controller: _ageController,
                    keyboardType: TextInputType.number,
                    autovalidateMode: AutovalidateMode.onUserInteraction,
                    style: const TextStyle(
                        fontSize: 18.0, fontWeight: FontWeight.bold),
                    decoration: InputDecoration(
                        contentPadding:
                            const EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
                        border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(6.0))),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return AppLocalizations.of(context).validateEmptyValue;
                      }
                      return null;
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(0.0, 15.0, 0.0, 0.0),
                  child: Text(AppLocalizations.of(context).personId,
                      style: const TextStyle(
                          fontSize: 18.0,
                          color: Color(0xFFDFDFDF),
                          fontWeight: FontWeight.bold)),
                ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(0.0, 5.0, 0.0, 0.0),
                  child: TextFormField(
                    key: const Key('txtId'),
                    controller: _personIdController,
                    keyboardType: TextInputType.number,
                    style: const TextStyle(
                        fontSize: 18.0, fontWeight: FontWeight.bold),
                    decoration: InputDecoration(
                        contentPadding:
                            const EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
                        border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(6.0))),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return AppLocalizations.of(context).validateEmptyValue;
                      }
                      return null;
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(0.0, 15.0, 0.0, 0.0),
                  child: Text(AppLocalizations.of(context).email,
                      style: const TextStyle(
                          fontSize: 18.0,
                          color: Color(0xFFDFDFDF),
                          fontWeight: FontWeight.bold)),
                ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(0.0, 5.0, 0.0, 0.0),
                  child: TextFormField(
                    key: const Key('txtEmail'),
                    controller: _emailController,
                    style: const TextStyle(
                        fontSize: 18.0, fontWeight: FontWeight.bold),
                    decoration: InputDecoration(
                        contentPadding:
                            const EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
                        border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(6.0))),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return AppLocalizations.of(context).validateEmptyValue;
                      }
                      return null;
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(0.0, 15.0, 0.0, 0.0),
                  child: Text(AppLocalizations.of(context).country,
                      style: const TextStyle(
                          fontSize: 18.0,
                          color: Color(0xFFDFDFDF),
                          fontWeight: FontWeight.bold)),
                ),
                Padding(
                    padding: const EdgeInsets.fromLTRB(0.0, 5.0, 0.0, 0.0),
                    child: Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                            color: Color(0xFFDFDFDF),
                            borderRadius: BorderRadius.circular(6.0)),
                        child: DropdownButton(
                          key: const Key('ddCountry'),
                          value: countryValue,
                          icon: const Icon(Icons.arrow_downward),
                          elevation: 16,
                          style: const TextStyle(
                              fontSize: 18.0,
                              color: Color(0xFF1E3F52),
                              fontWeight: FontWeight.bold),
                          onChanged: (v) => setState(() {
                            countryValue = v as String;
                          }),
                          items: [
                            DropdownMenuItem<String>(
                              value: 'ar',
                              child:
                                  Text(AppLocalizations.of(context).argentina),
                            ),
                            DropdownMenuItem<String>(
                              value: 'br',
                              child: Text(AppLocalizations.of(context).brazil),
                            ),
                            DropdownMenuItem<String>(
                              value: 'ca',
                              child: Text(AppLocalizations.of(context).canada),
                            ),
                            DropdownMenuItem<String>(
                              value: 'co',
                              child:
                                  Text(AppLocalizations.of(context).colombia),
                            ),
                            DropdownMenuItem<String>(
                              value: 'fr',
                              child: Text(AppLocalizations.of(context).france),
                            ),
                            DropdownMenuItem<String>(
                              value: 'de',
                              child: Text(AppLocalizations.of(context).germany),
                            ),
                            DropdownMenuItem<String>(
                              value: 'mx',
                              child: Text(AppLocalizations.of(context).mexico),
                            ),
                            DropdownMenuItem<String>(
                              value: 'es',
                              child: Text(AppLocalizations.of(context).spain),
                            ),
                            DropdownMenuItem<String>(
                              value: 'us',
                              child: Text(AppLocalizations.of(context).usa),
                            ),
                            DropdownMenuItem<String>(
                              value: 've',
                              child:
                                  Text(AppLocalizations.of(context).venezuela),
                            ),
                          ],
                        ))),
                Padding(
                  padding: const EdgeInsets.fromLTRB(0.0, 15.0, 0.0, 0.0),
                  child: Text(AppLocalizations.of(context).city,
                      style: const TextStyle(
                          fontSize: 18.0,
                          color: Color(0xFFDFDFDF),
                          fontWeight: FontWeight.bold)),
                ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(0.0, 5.0, 0.0, 0.0),
                  child: TextFormField(
                    key: const Key('txtCity'),
                    controller: _cityController,
                    style: const TextStyle(
                        fontSize: 18.0, fontWeight: FontWeight.bold),
                    decoration: InputDecoration(
                        contentPadding:
                            const EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
                        border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(6.0))),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return AppLocalizations.of(context).validateEmptyValue;
                      }
                      return null;
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(0.0, 15.0, 0.0, 0.0),
                  child: Text(AppLocalizations.of(context).skinType,
                      style: const TextStyle(
                          fontSize: 18.0,
                          color: Color(0xFFDFDFDF),
                          fontWeight: FontWeight.bold)),
                ),
                Padding(
                    padding: const EdgeInsets.fromLTRB(0.0, 5.0, 0.0, 0.0),
                    child: Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                            color: Color(0xFFDFDFDF),
                            borderRadius: BorderRadius.circular(6.0)),
                        child: DropdownButton(
                          key: const Key('ddSkin'),
                          value: skinValue,
                          icon: const Icon(Icons.arrow_downward),
                          elevation: 16,
                          style: const TextStyle(
                              fontSize: 18.0,
                              color: Color(0xFF1E3F52),
                              fontWeight: FontWeight.bold),
                          onChanged: (v) => setState(() {
                            skinValue = v as String;
                          }),
                          items: [
                            DropdownMenuItem<String>(
                              value: 'normal',
                              child:
                                  Text(AppLocalizations.of(context).normalSkin),
                            ),
                            DropdownMenuItem<String>(
                              value: 'oily',
                              child:
                                  Text(AppLocalizations.of(context).oilySkin),
                            ),
                            DropdownMenuItem<String>(
                              value: 'dry',
                              child: Text(AppLocalizations.of(context).drySkin),
                            ),
                            DropdownMenuItem<String>(
                              value: 'mixed',
                              child:
                                  Text(AppLocalizations.of(context).mixedSkin),
                            ),
                            DropdownMenuItem<String>(
                              value: 'sensitive',
                              child: Text(
                                  AppLocalizations.of(context).sensitiveSkin),
                            )
                          ],
                        ))),
                Padding(
                  padding: const EdgeInsets.fromLTRB(0.0, 15.0, 0.0, 0.0),
                  child: Text(AppLocalizations.of(context).skinPhotoText,
                      style: const TextStyle(
                          fontSize: 18.0,
                          color: Color(0xFFDFDFDF),
                          fontWeight: FontWeight.bold)),
                ),
                FormField<File>(validator: (val) {
                  if (hasImage == false) {
                    return AppLocalizations.of(context).validateChooseImage;
                  }
                }, builder: (formFieldState) {
                  return Column(
                    children: [
                      GestureDetector(
                        key: const Key('btnImage'),
                        onTap: () async {
                          FilePickerResult? file = await FilePicker.platform
                              .pickFiles(
                                  type: FileType.image, allowMultiple: false);
                          if (file != null) {
                            setState(() {
                              _pickedFile = File(file.files.first.path!);
                            });
                            hasImage = true;
                          }
                        },
                        child: Container(
                          margin: const EdgeInsets.all(8),
                          padding: const EdgeInsets.symmetric(
                              horizontal: 32, vertical: 8),
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(8),
                            color: const Color(0xff707070).withOpacity(0.1),
                          ),
                          child: Column(
                            children: [
                              Icon(Icons.upload_file),
                              Text(
                                AppLocalizations.of(context).chooseImage,
                                style:
                                    const TextStyle(color: Color(0xFFDFDFDF)),
                              )
                            ],
                          ),
                        ),
                      ),
                      Container(
                          alignment: Alignment.center,
                          width: double.infinity,
                          height: 200,
                          color: Colors.grey[300],
                          child: _pickedFile != null
                              ? Image.file(
                                  File(_pickedFile!.path),
                                  width: 150,
                                  height: 150,
                                  fit: BoxFit.cover,
                                )
                              : Text(AppLocalizations.of(context)
                                  .noImageSelected)),
                      if (formFieldState.hasError)
                        Padding(
                          padding: const EdgeInsets.only(left: 8, top: 10),
                          child: Text(
                            formFieldState.errorText!,
                            style: TextStyle(
                                fontStyle: FontStyle.normal,
                                fontSize: 13,
                                color: Colors.red[700],
                                height: 0.5),
                          ),
                        )
                    ],
                  );
                }),
                Padding(
                  padding: const EdgeInsets.fromLTRB(0.0, 30.0, 0.0, 0.0),
                  child: Container(
                    height: 55.0,
                    child: ElevatedButton(
                      key: const Key('btnSubmit'),
                      style: ElevatedButton.styleFrom(
                          disabledBackgroundColor: Colors.grey),
                      onPressed: isDisabled
                          ? null
                          : () async {
                              if (_formKey.currentState!.validate()) {
                                setState(() => isDisabled = true);
                                ScaffoldMessenger.of(context)
                                    .showSnackBar(snackBar);
                                bool result = await submit(
                                    context,
                                    _nameController.text,
                                    _ageController.text,
                                    _cityController.text,
                                    _personIdController.text,
                                    _emailController.text,
                                    countryValue,
                                    skinValue,
                                    _pickedFile);

                                if (result == false) {
                                  setState(() => isDisabled = false);
                                }
                              }
                            },
                      child: Text(AppLocalizations.of(context).signup,
                          style: const TextStyle(
                              color: Colors.white, fontSize: 22.0)),
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(0.0, 30.0, 0.0, 30.0),
                  child: Container(
                    height: 55.0,
                    child: ElevatedButton(
                      onPressed: () {
                        Navigator.pop(context);
                      },
                      child: Text(AppLocalizations.of(context).back,
                          style: const TextStyle(
                              color: Colors.white, fontSize: 22.0)),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
