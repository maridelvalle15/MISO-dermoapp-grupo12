import 'dart:io';

import 'package:dermoapp/common/managers/CaseAddImagesManager.dart';
import 'package:dermoapp/common/managers/CaseDetailManager.dart';
import 'package:dermoapp/common/ui/showSingleDialogButton.dart';
import 'package:dermoapp/common/values/servicesLocations.dart';
import 'package:dermoapp/common/widgets/mainDrawer.dart';
import 'package:dermoapp/main.dart';
import 'package:dermoapp/model/caseModel.dart';
import 'package:dermoapp/ui/caseDetailsScreen.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:country_icons/country_icons.dart';

class CaseAddImagesScreen extends StatefulWidget {
  const CaseAddImagesScreen(this.id, {super.key});

  final int id;

  @override
  State<StatefulWidget> createState() {
    return CaseAddImagesScreenState();
  }
}

class CaseAddImagesScreenState extends State<CaseAddImagesScreen> {
  CaseModel caseDetail = CaseModel(
      0, '', '', null, '', null, '', '', List.empty(), null, '', '', '');

  bool isDisabled = true;
  bool hasImage = false;
  File? _pickedFile;

  @override
  void initState() {
    super.initState();

    getCase(widget.id);
  }

  @override
  Widget build(BuildContext context) {
    final _formKey = GlobalKey<FormState>();
    var snackBar = SnackBar(
      content: Text(AppLocalizations.of(context).submittedData),
      duration: const Duration(seconds: 2),
    );

    return Scaffold(
        drawer: const MainDrawer(
          currentSelected: 3,
        ),
        appBar: AppBar(
            title: Text(AppLocalizations.of(context).uploadExtraImage,
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
                          padding:
                              const EdgeInsets.fromLTRB(0.0, 0.0, 0.0, 15.0),
                          child: Text(AppLocalizations.of(context).caseText,
                              style: const TextStyle(
                                  fontSize: 16.0, color: Color(0xffdfdfdf))),
                        )),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Expanded(
                          child: Padding(
                            padding: const EdgeInsets.all(15),
                            child: Text(
                              AppLocalizations.of(context).caseId,
                              style: const TextStyle(
                                  fontSize: 18.0,
                                  color: Color(0xFFDFDFDF),
                                  fontWeight: FontWeight.bold),
                              textAlign: TextAlign.end,
                            ),
                          ),
                        ),
                        const VerticalDivider(width: 1),
                        Expanded(
                          child: Padding(
                            padding: const EdgeInsets.all(15),
                            child: Text(widget.id.toString(),
                                style: const TextStyle(
                                    fontSize: 18.0,
                                    color: Color(0xFFDFDFDF),
                                    fontWeight: FontWeight.bold)),
                          ),
                        ),
                      ],
                    ),
                    Padding(
                      padding: const EdgeInsets.fromLTRB(10, 10, 10, 0),
                      child: Text(AppLocalizations.of(context).description,
                          style: const TextStyle(
                              fontSize: 18.0,
                              color: Color(0xFFDFDFDF),
                              fontWeight: FontWeight.bold)),
                    ),
                    Padding(
                      padding: const EdgeInsets.fromLTRB(10, 10, 10, 10),
                      child: Text(caseDetail.descripcion,
                          style: const TextStyle(
                              fontSize: 18.0, color: Color(0xFFDFDFDF))),
                    ),
                    Container(
                        alignment: Alignment.center,
                        width: double.infinity,
                        height: 200,
                        child: caseDetail.image.isNotEmpty
                            ? Image.network(
                                (services["bucket_caso"] ?? '') +
                                    caseDetail.image,
                                width: 150,
                                height: 150,
                                fit: BoxFit.cover,
                              )
                            : Text(AppLocalizations.of(context).noImage)),
                    Padding(
                      padding: const EdgeInsets.fromLTRB(10, 10, 10, 0),
                      child: Text(AppLocalizations.of(context).extraImages,
                          style: const TextStyle(
                              fontSize: 18.0,
                              color: Color(0xFFDFDFDF),
                              fontWeight: FontWeight.bold)),
                    ),
                    Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[
                        for (var imageExtra in caseDetail.imagenes_extra)
                          Container(
                              alignment: Alignment.center,
                              width: double.infinity,
                              height: 200,
                              child: imageExtra.isNotEmpty
                                  ? Image.network(
                                      (services["bucket_caso"] ?? '') +
                                          imageExtra,
                                      width: 150,
                                      height: 150,
                                      fit: BoxFit.cover,
                                    )
                                  : Text(AppLocalizations.of(context).noImage))
                      ],
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
                                      type: FileType.image,
                                      allowMultiple: false);
                              if (file != null) {
                                setState(() {
                                  _pickedFile = File(file.files.first.path!);
                                  isDisabled = false;
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
                                  const Icon(Icons.upload_file),
                                  Text(
                                    AppLocalizations.of(context).chooseImage,
                                    style: const TextStyle(
                                        color: Color(0xFFDFDFDF)),
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
                      child: SizedBox(
                        height: 55.0,
                        child: ElevatedButton(
                          key: const Key('btnUploadImages'),
                          style: ElevatedButton.styleFrom(
                              disabledBackgroundColor: Colors.grey),
                          onPressed: isDisabled
                              ? null
                              : () async {
                                  if (_formKey.currentState!.validate()) {
                                    setState(() => isDisabled = true);
                                    ScaffoldMessenger.of(context)
                                        .showSnackBar(snackBar);
                                    bool result = await CaseAddImagesManager()
                                        .uploadNewImage(context, widget.id,
                                            _pickedFile ?? File('.'));

                                    if (result == false) {
                                      setState(() => isDisabled = false);
                                      // ignore: use_build_context_synchronously
                                      showDialogSingleButton(
                                          context,
                                          AppLocalizations.of(context)
                                              .thereIsAnError,
                                          'Intente de nuevo',
                                          'OK');
                                    } else {
                                      setState(() {
                                        isDisabled = true;
                                        hasImage = false;
                                        _pickedFile = null;
                                        getCase(widget.id);
                                      });
                                      // ignore: use_build_context_synchronously
                                      showDialogSingleButton(
                                          context,
                                          AppLocalizations.of(context)
                                              .imageUploadedTitle,
                                          AppLocalizations.of(context)
                                              .imageUploadedText,
                                          'OK');
                                    }
                                  }
                                },
                          child: Text(
                              AppLocalizations.of(context).uploadExtraImage,
                              style: const TextStyle(
                                  color: Colors.white, fontSize: 22.0)),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.fromLTRB(0.0, 30.0, 0.0, 20.0),
                      child: SizedBox(
                        height: 55.0,
                        child: ElevatedButton(
                          key: const Key('btnBackToDetails'),
                          onPressed: () {
                            Navigator.push(
                                context,
                                MaterialPageRoute(
                                    builder: (context) =>
                                        CaseDetailScreen(widget.id)));
                          },
                          child: Text(
                              AppLocalizations.of(context).backToCaseDetails,
                              style: const TextStyle(
                                  color: Colors.white, fontSize: 22.0)),
                        ),
                      ),
                    ),
                  ],
                )))));
  }

  void getCase(int id) async {
    var caseResult = await CaseDetailManager().getCase(id);
    setState(() {
      caseDetail = caseResult;
    });
  }
}
