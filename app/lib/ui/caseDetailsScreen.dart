import 'dart:convert';

import 'package:DermoApp/common/managers/CaseDetailManager.dart';
import 'package:DermoApp/common/managers/CaseDiagnosticAutoManager.dart';
import 'package:DermoApp/common/managers/CaseDiagnosticManualManager.dart';
import 'package:DermoApp/common/ui/showSingleDialogButton.dart';
import 'package:DermoApp/common/values/servicesLocations.dart';
import 'package:DermoApp/common/widgets/mainDrawer.dart';
import 'package:DermoApp/main.dart';
import 'package:DermoApp/model/caseModel.dart';
import 'package:DermoApp/ui/caseAddImagesScreen.dart';
import 'package:DermoApp/ui/caseDiagnosticAutoScreen.dart';
import 'package:DermoApp/ui/caseDiagnosticManualScreen.dart';
import 'package:DermoApp/ui/caseListScreen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:country_icons/country_icons.dart';
import 'package:get/utils.dart';
import 'package:shared_preferences/shared_preferences.dart';

class CaseDetailScreen extends StatefulWidget {
  const CaseDetailScreen(this.id, {super.key});

  final int id;

  @override
  State<StatefulWidget> createState() {
    return CaseDetailScreenState();
  }
}

class CaseDetailScreenState extends State<CaseDetailScreen> {
  CaseModel caseDetail = CaseModel(
      0, '', '', null, '', null, '', '', List.empty(), null, '', '', '');
  bool isDisabled = false;
  List diagnosticAuto = [];
  String flagEs = 'es';
  String flagEn = 'us';

  @override
  void initState() {
    super.initState();

    getCase(widget.id);
    getMyFlags();
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
                                fontSize: 18.0, color: Color(0xFFDFDFDF))),
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
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Expanded(
                      child: Padding(
                        padding: const EdgeInsets.all(15),
                        child: Text(
                          AppLocalizations.of(context).diagnosticTypeTitle,
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
                        child: Text(
                            caseDetail.tipo_solucion == ''
                                ? AppLocalizations.of(context)
                                    .diagnosticTypeUndefined
                                : (caseDetail.tipo_solucion == 'auto'
                                    ? AppLocalizations.of(context).automatic
                                    : AppLocalizations.of(context).manual),
                            style: const TextStyle(
                                fontSize: 18.0, color: Color(0xFFDFDFDF))),
                      ),
                    ),
                  ],
                ),
                if (caseDetail.tipo_solucion == '' ||
                    caseDetail.tipo_solucion == 'medico')
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Expanded(
                        child: Padding(
                          padding: const EdgeInsets.all(15),
                          child: Text(
                            AppLocalizations.of(context).diagnosticReceived,
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
                          child: Text(
                              caseDetail.diagnostico.length > 1
                                  ? caseDetail.diagnostico
                                  : AppLocalizations.of(context)
                                      .noDiagnosticYet,
                              style: const TextStyle(
                                  fontSize: 18.0, color: Color(0xFFDFDFDF))),
                        ),
                      ),
                    ],
                  ),
                if (caseDetail.tipo_solucion == 'auto')
                  SingleChildScrollView(
                      scrollDirection: Axis.vertical,
                      padding: const EdgeInsets.all(10),
                      child: FittedBox(
                        child: DataTable(
                            headingTextStyle: const TextStyle(
                                color: Color(0xFFDFDFDF),
                                fontSize: 18,
                                fontWeight: FontWeight.bold),
                            dataTextStyle: const TextStyle(
                                color: Color(0xFFDFDFDF), fontSize: 18),
                            columns: <DataColumn>[
                              DataColumn(
                                label: Text(
                                  AppLocalizations.of(context).diagnostic,
                                ),
                              ),
                              DataColumn(
                                label: Text(
                                    AppLocalizations.of(context).certainty),
                              ),
                            ],
                            rows: List.generate(
                                diagnosticAuto.length,
                                (index) =>
                                    getDataRow(index, diagnosticAuto[index]))),
                      )),
                if (caseDetail.tipo_solucion == 'medico')
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Expanded(
                        child: Padding(
                          padding: const EdgeInsets.all(15),
                          child: Text(
                            AppLocalizations.of(context).doctorAssigned,
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
                          child: Text(
                            caseDetail.nombre_medico.length > 1
                                ? caseDetail.nombre_medico
                                : AppLocalizations.of(context).noDoctorAssigned,
                            style: const TextStyle(
                                fontSize: 18.0, color: Color(0xFFDFDFDF)),
                          ),
                        ),
                      )
                    ],
                  ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Expanded(
                      child: Padding(
                        padding: const EdgeInsets.all(15),
                        child: Text(
                          AppLocalizations.of(context).caseCreationDate,
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
                        child: Text(caseDetail.fecha,
                            style: const TextStyle(
                                fontSize: 18.0, color: Color(0xFFDFDFDF))),
                      ),
                    ),
                  ],
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
                if (caseDetail.tipo_consulta.length > 1)
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Expanded(
                        child: Padding(
                          padding: const EdgeInsets.all(15),
                          child: Text(
                            AppLocalizations.of(context).appointmentTechnology,
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
                          child: Text(caseDetail.tipo_consulta,
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
                                      CaseDiagnosticManualScreen(
                                          widget.id,
                                          caseDetail.cita_medica ?? 0,
                                          caseDetail.tipo_consulta.length > 1
                                              ? caseDetail.tipo_consulta
                                              : '')));
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
                  padding: const EdgeInsets.fromLTRB(0.0, 30.0, 0.0, 20.0),
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

    if (caseResult.tipo_solucion == 'auto') formatAutoDiagnostic(caseResult);
  }

  Future<void> refreshDetail() async {
    getCase(widget.id);
  }

  void formatAutoDiagnostic(caseDetail) {
    String diagnosticStr = caseDetail.diagnostico.replaceAll("'", "\"");
    diagnosticAuto = json.decode(diagnosticStr);
  }

  DataRow getDataRow(index, data) {
    return DataRow(
      cells: <DataCell>[
        DataCell(
          Text(data["diagnostico"]),
        ),
        DataCell(
          Text(data["certitud"]),
        ),
      ],
    );
  }

  Future<void> getMyFlags() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();

    setState(() {
      flagEs = prefs.getString('es_flag') ?? 'es';
      flagEn = prefs.getString('en_flag') ?? 'us';
    });
  }
}
