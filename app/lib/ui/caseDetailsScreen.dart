import 'package:dermoapp/common/managers/CaseDetailManager.dart';
import 'package:dermoapp/common/managers/CaseDiagnosticAutoManager.dart';
import 'package:dermoapp/common/managers/CaseDiagnosticManualManager.dart';
import 'package:dermoapp/common/ui/showSingleDialogButton.dart';
import 'package:dermoapp/common/values/servicesLocations.dart';
import 'package:dermoapp/common/widgets/mainDrawer.dart';
import 'package:dermoapp/main.dart';
import 'package:dermoapp/model/caseModel.dart';
import 'package:dermoapp/ui/caseAddImagesScreen.dart';
import 'package:dermoapp/ui/caseDiagnosticAutoScreen.dart';
import 'package:dermoapp/ui/caseDiagnosticManualScreen.dart';
import 'package:dermoapp/ui/caseListScreen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:country_icons/country_icons.dart';

class CaseDetailScreen extends StatefulWidget {
  const CaseDetailScreen(this.id, {super.key});

  final int id;

  @override
  State<StatefulWidget> createState() {
    return CaseDetailScreenState();
  }
}

class CaseDetailScreenState extends State<CaseDetailScreen> {
  CaseModel caseDetail =
      CaseModel(0, '', '', '', '', 0, '', '', List.empty(), 0);
  bool isDisabled = false;

  @override
  void initState() {
    super.initState();

    getCase(widget.id);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        drawer: const MainDrawer(
          currentSelected: 2,
        ),
        appBar: AppBar(
            title: Text(AppLocalizations.of(context).caseDetail,
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
        body: RefreshIndicator(
            onRefresh: refreshDetail,
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
                      padding: const EdgeInsets.fromLTRB(0.0, 0.0, 0.0, 15.0),
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
                if (caseDetail.cita_medica != null)
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Expanded(
                        child: Padding(
                          padding: const EdgeInsets.all(15),
                          child: Text(
                            AppLocalizations.of(context).treatmentLeft,
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
                          child: Text(AppLocalizations.of(context).requested,
                              style: const TextStyle(
                                  fontSize: 18.0,
                                  color: Color(0xFFDFDFDF),
                                  fontWeight: FontWeight.bold)),
                        ),
                      ),
                    ],
                  ),
                Container(
                    alignment: Alignment.center,
                    width: double.infinity,
                    height: 200,
                    child: caseDetail.image.isNotEmpty
                        ? Image.network(
                            (services["bucket_caso"] ?? '') + caseDetail.image,
                            width: 150,
                            height: 150,
                            fit: BoxFit.cover,
                          )
                        : Text(AppLocalizations.of(context).noImage)),
                if (caseDetail.imagenes_extra.isNotEmpty)
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
                                  (services["bucket_caso"] ?? '') + imageExtra,
                                  width: 150,
                                  height: 150,
                                  fit: BoxFit.cover,
                                )
                              : Text(AppLocalizations.of(context).noImage))
                  ],
                ),
                if (caseDetail.tipo_solucion == '')
                  Padding(
                    padding: const EdgeInsets.fromLTRB(0.0, 30.0, 0.0, 0.0),
                    child: SizedBox(
                      height: 55.0,
                      child: ElevatedButton(
                        key: const Key('btnDiagnosticAuto'),
                        style: ElevatedButton.styleFrom(
                            disabledBackgroundColor: Colors.grey),
                        onPressed: isDisabled
                            ? null
                            : () async {
                                setState(() => isDisabled = true);
                                bool result = await CaseDiagnosticAutoManager()
                                    .askDiagnosticAuto(widget.id);
                                if (result == true) {
                                  // ignore: use_build_context_synchronously
                                  showDialogSingleButton(
                                      context,
                                      AppLocalizations.of(context)
                                          .autoDiagRequested,
                                      AppLocalizations.of(context)
                                          .autoDiagGoLookAtIt,
                                      "OK");
                                } else {
                                  // ignore: use_build_context_synchronously
                                  showDialogSingleButton(
                                      context,
                                      AppLocalizations.of(context)
                                          .thereIsAnError,
                                      AppLocalizations.of(context).tryAgain,
                                      "OK");
                                  setState(() => isDisabled = false);
                                }
                              },
                        child: Text(AppLocalizations.of(context).diagnosticAuto,
                            style: const TextStyle(
                                color: Colors.white, fontSize: 22.0)),
                      ),
                    ),
                  ),
                if (caseDetail.tipo_solucion == '')
                  Padding(
                    padding: const EdgeInsets.fromLTRB(0.0, 30.0, 0.0, 0.0),
                    child: SizedBox(
                      height: 55.0,
                      child: ElevatedButton(
                        key: const Key('btnDiagnosticManual'),
                        style: ElevatedButton.styleFrom(
                            disabledBackgroundColor: Colors.grey),
                        onPressed: isDisabled
                            ? null
                            : () async {
                                setState(() => isDisabled = true);
                                bool result =
                                    await CaseDiagnosticManualManager()
                                        .askDiagnosticManual(widget.id);
                                if (result == true) {
                                  // ignore: use_build_context_synchronously
                                  showDialogSingleButton(
                                      context,
                                      AppLocalizations.of(context)
                                          .manualDiagRequestedTitle,
                                      AppLocalizations.of(context)
                                          .manualDiagRequestedText,
                                      "OK");
                                } else {
                                  // ignore: use_build_context_synchronously
                                  showDialogSingleButton(
                                      context,
                                      AppLocalizations.of(context)
                                          .thereIsAnError,
                                      AppLocalizations.of(context).tryAgain,
                                      "OK");
                                  setState(() => isDisabled = false);
                                }
                              },
                        child: Text(
                            AppLocalizations.of(context).diagnosticManual,
                            style: const TextStyle(
                                color: Colors.white, fontSize: 22.0)),
                      ),
                    ),
                  ),
                if (caseDetail.tipo_solucion == 'auto')
                  Padding(
                    padding: const EdgeInsets.fromLTRB(0.0, 30.0, 0.0, 0.0),
                    child: SizedBox(
                      height: 55.0,
                      child: ElevatedButton(
                        key: const Key('btnDiagAutoDetails'),
                        onPressed: () {
                          Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) =>
                                      CaseDiagnosticAutoScreen(widget.id)));
                        },
                        child: Text(
                            AppLocalizations.of(context).seeAutomaticDiagnostic,
                            style: const TextStyle(
                                color: Colors.white, fontSize: 22.0)),
                      ),
                    ),
                  ),
                if (caseDetail.tipo_solucion == 'medico')
                  Padding(
                    padding: const EdgeInsets.fromLTRB(0.0, 30.0, 0.0, 0.0),
                    child: SizedBox(
                      height: 55.0,
                      child: ElevatedButton(
                        key: const Key('btnDiagManualDetails'),
                        onPressed: () {
                          Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) =>
                                      CaseDiagnosticManualScreen(widget.id,
                                          caseDetail.cita_medica ?? 0)));
                        },
                        child: Text(
                            AppLocalizations.of(context).seeManualDiagnostic,
                            style: const TextStyle(
                                color: Colors.white, fontSize: 22.0)),
                      ),
                    ),
                  ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(0.0, 30.0, 0.0, 0.0),
                  child: SizedBox(
                    height: 55.0,
                    child: ElevatedButton(
                      key: const Key('btnAddImages'),
                      onPressed: () {
                        Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) =>
                                    CaseAddImagesScreen(widget.id)));
                      },
                      child: Text(AppLocalizations.of(context).caseAddImages,
                          style: const TextStyle(
                              color: Colors.white, fontSize: 22.0)),
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(0.0, 30.0, 0.0, 0.0),
                  child: SizedBox(
                    height: 55.0,
                    child: ElevatedButton(
                      key: const Key('btnBackToList'),
                      onPressed: () {
                        Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => const CaseListScreen()));
                      },
                      child: Text(AppLocalizations.of(context).backToCaseList,
                          style: const TextStyle(
                              color: Colors.white, fontSize: 22.0)),
                    ),
                  ),
                ),
              ],
            ))));
  }

  Future<void> getCase(int id) async {
    var caseResult = await CaseDetailManager().getCase(id);
    setState(() {
      caseDetail = caseResult;
    });
  }

  Future<void> refreshDetail() async {
    getCase(widget.id);
  }
}
