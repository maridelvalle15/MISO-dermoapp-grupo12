import 'dart:io';

import 'package:DermoApp/common/managers/FormCaseNewManager.dart';
import 'package:DermoApp/common/values/injuries.dart';
import 'package:DermoApp/common/widgets/mainDrawer.dart';
import 'package:DermoApp/main.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class CaseNewScreen extends StatefulWidget {
  const CaseNewScreen({super.key});

  @override
  State<StatefulWidget> createState() {
    return CaseNewScreenState();
  }
}

class CaseNewScreenState extends State<CaseNewScreen> {
  final TextEditingController _additionalInfoController =
      TextEditingController();

  final formKey = GlobalKey<FormState>();
  bool isDisabled = false;
  bool hasImage = false;
  String injuryTypeValue = injuryType.keys.toList().first;
  String injuryFormValue = injuryForm.keys.toList().first;
  String injuryQtyValue = injuryQty.keys.toList().first;
  String injuryDistValue = injuryDist.keys.toList().first;
  File? _pickedFile;

  @override
  Widget build(BuildContext context) {
    var snackBar = SnackBar(
      content: Text(AppLocalizations.of(context).submittedData),
      duration: const Duration(seconds: 2),
    );
    return Scaffold(
      drawer: const MainDrawer(currentSelected: 2),
      appBar: AppBar(
          title: Text(AppLocalizations.of(context).newCase,
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
        key: formKey,
        child: Padding(
          padding: const EdgeInsets.fromLTRB(30.0, 0.0, 30.0, 0.0),
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Container(
                    alignment: Alignment.topCenter,
                    child: const Padding(
                      padding: EdgeInsets.fromLTRB(0.0, 20.0, 0.0, 0.0),
                      child: Text("Dermoapp",
                          style: TextStyle(
                              fontSize: 40.0, color: Color(0xffdfdfdf))),
                    )),
                Container(
                    alignment: Alignment.topCenter,
                    child: Padding(
                      padding: const EdgeInsets.fromLTRB(0.0, 0.0, 0.0, 15.0),
                      child: Text(AppLocalizations.of(context).createCase,
                          style: const TextStyle(
                              fontSize: 16.0, color: Color(0xffdfdfdf))),
                    )),
                Padding(
                  padding: const EdgeInsets.fromLTRB(0.0, 15.0, 0.0, 0.0),
                  child: Text(AppLocalizations.of(context).injuryType,
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
                          key: const Key('ddInjuryType'),
                          value: injuryTypeValue,
                          icon: const Icon(Icons.arrow_downward),
                          elevation: 16,
                          style: const TextStyle(
                              fontSize: 18.0,
                              color: Color(0xFF1E3F52),
                              fontWeight: FontWeight.bold),
                          onChanged: (v) => setState(() {
                            injuryTypeValue = v as String;
                          }),
                          items: [
                            DropdownMenuItem<String>(
                              value: 'mac',
                              child:
                                  Text(AppLocalizations.of(context).typeMacula),
                            ),
                            DropdownMenuItem<String>(
                              value: 'pap',
                              child:
                                  Text(AppLocalizations.of(context).typePapula),
                            ),
                            DropdownMenuItem<String>(
                              value: 'par',
                              child:
                                  Text(AppLocalizations.of(context).typeParche),
                            ),
                            DropdownMenuItem<String>(
                              value: 'pla',
                              child:
                                  Text(AppLocalizations.of(context).typePlaca),
                            ),
                            DropdownMenuItem<String>(
                              value: 'nod',
                              child:
                                  Text(AppLocalizations.of(context).typeNodulo),
                            ),
                            DropdownMenuItem<String>(
                              value: 'amp',
                              child: Text(
                                  AppLocalizations.of(context).typeAmpolla),
                            ),
                            DropdownMenuItem<String>(
                              value: 'ulc',
                              child:
                                  Text(AppLocalizations.of(context).typeUlcera),
                            ),
                            DropdownMenuItem<String>(
                              value: 'ves',
                              child: Text(
                                  AppLocalizations.of(context).typeVesicula),
                            ),
                          ],
                        ))),
                Padding(
                  padding: const EdgeInsets.fromLTRB(0.0, 15.0, 0.0, 0.0),
                  child: Text(AppLocalizations.of(context).injuryForm,
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
                          key: const Key('ddInjuryForm'),
                          value: injuryFormValue,
                          icon: const Icon(Icons.arrow_downward),
                          elevation: 16,
                          style: const TextStyle(
                              fontSize: 18.0,
                              color: Color(0xFF1E3F52),
                              fontWeight: FontWeight.bold),
                          onChanged: (v) => setState(() {
                            injuryFormValue = v as String;
                          }),
                          items: [
                            DropdownMenuItem<String>(
                              value: 'ani',
                              child:
                                  Text(AppLocalizations.of(context).formAnillo),
                            ),
                            DropdownMenuItem<String>(
                              value: 'dom',
                              child:
                                  Text(AppLocalizations.of(context).formDomo),
                            ),
                            DropdownMenuItem<String>(
                              value: 'enr',
                              child: Text(
                                  AppLocalizations.of(context).formEnrollada),
                            ),
                            DropdownMenuItem<String>(
                              value: 'ind',
                              child: Text(
                                  AppLocalizations.of(context).formIndefinida),
                            ),
                            DropdownMenuItem<String>(
                              value: 'ova',
                              child: Text(
                                  AppLocalizations.of(context).formOvalada),
                            ),
                            DropdownMenuItem<String>(
                              value: 'red',
                              child: Text(
                                  AppLocalizations.of(context).formRedonda),
                            ),
                          ],
                        ))),
                Padding(
                  padding: const EdgeInsets.fromLTRB(0.0, 15.0, 0.0, 0.0),
                  child: Text(AppLocalizations.of(context).injuryQty,
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
                          key: const Key('ddInjuryQty'),
                          value: injuryQtyValue,
                          icon: const Icon(Icons.arrow_downward),
                          elevation: 16,
                          style: const TextStyle(
                              fontSize: 18.0,
                              color: Color(0xFF1E3F52),
                              fontWeight: FontWeight.bold),
                          onChanged: (v) => setState(() {
                            injuryQtyValue = v as String;
                          }),
                          items: [
                            DropdownMenuItem<String>(
                              value: 'dis',
                              child: Text(
                                  AppLocalizations.of(context).qtyDiseminada),
                            ),
                            DropdownMenuItem<String>(
                              value: 'mul',
                              child: Text(
                                  AppLocalizations.of(context).qtyMultiple),
                            ),
                            DropdownMenuItem<String>(
                              value: 'rec',
                              child: Text(
                                  AppLocalizations.of(context).qtyRecurrente),
                            ),
                            DropdownMenuItem<String>(
                              value: 'sol',
                              child: Text(
                                  AppLocalizations.of(context).qtySolitaria),
                            ),
                          ],
                        ))),
                Padding(
                  padding: const EdgeInsets.fromLTRB(0.0, 15.0, 0.0, 0.0),
                  child: Text(AppLocalizations.of(context).injuryDist,
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
                          key: const Key('ddInjuryDist'),
                          value: injuryDistValue,
                          icon: const Icon(Icons.arrow_downward),
                          elevation: 16,
                          style: const TextStyle(
                              fontSize: 18.0,
                              color: Color(0xFF1E3F52),
                              fontWeight: FontWeight.bold),
                          onChanged: (v) => setState(() {
                            injuryDistValue = v as String;
                          }),
                          items: [
                            DropdownMenuItem<String>(
                              value: 'asi',
                              child: Text(
                                  AppLocalizations.of(context).distAsimetrica),
                            ),
                            DropdownMenuItem<String>(
                              value: 'con',
                              child: Text(
                                  AppLocalizations.of(context).distConfluente),
                            ),
                            DropdownMenuItem<String>(
                              value: 'esp',
                              child: Text(
                                  AppLocalizations.of(context).distEsparcida),
                            ),
                            DropdownMenuItem<String>(
                              value: 'sim',
                              child: Text(
                                  AppLocalizations.of(context).distSimetrica),
                            ),
                          ],
                        ))),
                Padding(
                  padding: const EdgeInsets.fromLTRB(0.0, 15.0, 0.0, 0.0),
                  child: Text(AppLocalizations.of(context).additionalInfo,
                      style: const TextStyle(
                          fontSize: 18.0,
                          color: Color(0xFFDFDFDF),
                          fontWeight: FontWeight.bold)),
                ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(0.0, 5.0, 0.0, 0.0),
                  child: TextFormField(
                    key: const Key('txtAdditionalInfo'),
                    controller: _additionalInfoController,
                    keyboardType: TextInputType.multiline,
                    minLines: 3,
                    maxLines: 5,
                    style: const TextStyle(
                        fontSize: 18.0, fontWeight: FontWeight.bold),
                    decoration: InputDecoration(
                        contentPadding:
                            const EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
                        border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(6.0))),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(0.0, 15.0, 0.0, 0.0),
                  child: Text(AppLocalizations.of(context).injuryPhotoText,
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
                              if (formKey.currentState!.validate()) {
                                setState(() => isDisabled = true);
                                ScaffoldMessenger.of(context)
                                    .showSnackBar(snackBar);
                                bool result = await FormCaseNewManager()
                                    .submitCase(
                                        context,
                                        injuryTypeValue,
                                        injuryFormValue,
                                        injuryQtyValue,
                                        injuryDistValue,
                                        _pickedFile,
                                        extraInfo:
                                            _additionalInfoController.text);

                                if (result == false) {
                                  setState(() => isDisabled = false);
                                }
                              }
                            },
                      child: Text(AppLocalizations.of(context).createCase,
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
