import 'dart:io';

import 'package:DermoApp/common/managers/CaseDiagnosticAutoManager.dart';
import 'package:DermoApp/common/managers/CaseDiagnosticManualManager.dart';
import 'package:DermoApp/common/ui/showSingleDialogButton.dart';
import 'package:DermoApp/common/widgets/mainDrawer.dart';
import 'package:DermoApp/main.dart';
import 'package:DermoApp/ui/caseListScreen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:country_icons/country_icons.dart';
import 'package:shared_preferences/shared_preferences.dart';

class CaseCreatedScreen extends StatefulWidget {
  CaseCreatedScreen(this.id,
      {super.key,
      this.newCase = false,
      this.tipo,
      this.forma,
      this.cantidad,
      this.dist,
      this.adicional,
      this.foto});

  final int id;
  final bool newCase;
  final String? tipo;
  final String? forma;
  final String? cantidad;
  final String? dist;
  final String? adicional;
  final File? foto;

  @override
  State<StatefulWidget> createState() {
    return CaseCreatedScreenState();
  }
}

class CaseCreatedScreenState extends State<CaseCreatedScreen> {
  bool isDisabled = false;
  String flagEs = 'es';
  String flagEn = 'us';

  @override
  void initState() {
    super.initState();

    getMyFlags();
  }

  @override
  Widget build(BuildContext context) {
    final injuryType = {
      'mac': AppLocalizations.of(context).typeMacula,
      'pap': AppLocalizations.of(context).typePapula,
      'par': AppLocalizations.of(context).typeParche,
      'pla': AppLocalizations.of(context).typePlaca,
      'nod': AppLocalizations.of(context).typeNodulo,
      'amp': AppLocalizations.of(context).typeAmpolla,
      'ulc': AppLocalizations.of(context).typeUlcera,
      'ves': AppLocalizations.of(context).typeVesicula
    };

    final injuryForm = {
      'ani': AppLocalizations.of(context).formAnillo,
      'dom': AppLocalizations.of(context).formDomo,
      'enr': AppLocalizations.of(context).formEnrollada,
      'ind': AppLocalizations.of(context).formIndefinida,
      'ova': AppLocalizations.of(context).formOvalada,
      'red': AppLocalizations.of(context).formRedonda
    };

    final injuryQty = {
      'dis': AppLocalizations.of(context).qtyDiseminada,
      'mul': AppLocalizations.of(context).qtyMultiple,
      'rec': AppLocalizations.of(context).qtyRecurrente,
      'sol': AppLocalizations.of(context).qtySolitaria
    };

    final injuryDist = {
      'asi': AppLocalizations.of(context).distAsimetrica,
      'con': AppLocalizations.of(context).distConfluente,
      'esp': AppLocalizations.of(context).distEsparcida,
      'sim': AppLocalizations.of(context).distSimetrica
    };

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
        body: SingleChildScrollView(
            child: Column(
          children: <Widget>[
            Container(
                alignment: Alignment.topCenter,
                child: const Padding(
                  padding: EdgeInsets.fromLTRB(0.0, 20.0, 0.0, 0.0),
                  child: Text("Dermoapp",
                      style:
                          TextStyle(fontSize: 40.0, color: Color(0xffdfdfdf))),
                )),
            Container(
                alignment: Alignment.topCenter,
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(0.0, 0.0, 0.0, 15.0),
                  child: Text(AppLocalizations.of(context).caseText,
                      style: const TextStyle(
                          fontSize: 16.0, color: Color(0xffdfdfdf))),
                )),
            if (widget.newCase) ...[
              Padding(
                padding: const EdgeInsets.fromLTRB(0.0, 15.0, 0.0, 10.0),
                child: Text(AppLocalizations.of(context).caseCreated,
                    style: const TextStyle(
                        fontSize: 24.0,
                        color: Color(0xFFDFDFDF),
                        fontWeight: FontWeight.bold)),
              ),
            ],
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.all(15),
                    child: Text(AppLocalizations.of(context).caseId,
                        style: const TextStyle(
                            fontSize: 18.0,
                            color: Color(0xFFDFDFDF),
                            fontWeight: FontWeight.bold)),
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
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.all(15),
                    child: Text(AppLocalizations.of(context).injuryType,
                        style: const TextStyle(
                            fontSize: 18.0,
                            color: Color(0xFFDFDFDF),
                            fontWeight: FontWeight.bold)),
                  ),
                ),
                const VerticalDivider(width: 1),
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.all(15),
                    child: Text(injuryType[widget.tipo] as String,
                        style: const TextStyle(
                          fontSize: 18.0,
                          color: Color(0xFFDFDFDF),
                        )),
                  ),
                ),
              ],
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.all(15),
                    child: Text(AppLocalizations.of(context).injuryForm,
                        style: const TextStyle(
                            fontSize: 18.0,
                            color: Color(0xFFDFDFDF),
                            fontWeight: FontWeight.bold)),
                  ),
                ),
                const VerticalDivider(width: 1),
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.all(15),
                    child: Text(injuryForm[widget.forma] as String,
                        style: const TextStyle(
                          fontSize: 18.0,
                          color: Color(0xFFDFDFDF),
                        )),
                  ),
                ),
              ],
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.all(15),
                    child: Text(AppLocalizations.of(context).injuryQty,
                        style: const TextStyle(
                            fontSize: 18.0,
                            color: Color(0xFFDFDFDF),
                            fontWeight: FontWeight.bold)),
                  ),
                ),
                const VerticalDivider(width: 1),
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.all(15),
                    child: Text(injuryQty[widget.cantidad] as String,
                        style: const TextStyle(
                          fontSize: 18.0,
                          color: Color(0xFFDFDFDF),
                        )),
                  ),
                ),
              ],
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.all(15),
                    child: Text(AppLocalizations.of(context).injuryDist,
                        style: const TextStyle(
                            fontSize: 18.0,
                            color: Color(0xFFDFDFDF),
                            fontWeight: FontWeight.bold)),
                  ),
                ),
                const VerticalDivider(width: 1),
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.all(15),
                    child: Text(injuryDist[widget.dist] as String,
                        style: const TextStyle(
                          fontSize: 18.0,
                          color: Color(0xFFDFDFDF),
                        )),
                  ),
                ),
              ],
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(10, 10, 10, 0),
              child: Text(AppLocalizations.of(context).additionalInfo,
                  style: const TextStyle(
                      fontSize: 18.0,
                      color: Color(0xFFDFDFDF),
                      fontWeight: FontWeight.bold)),
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(10, 10, 10, 10),
              child: Text(
                  widget.adicional!.isEmpty
                      ? AppLocalizations.of(context).noAdditionalInfo
                      : widget.adicional as String,
                  style: const TextStyle(
                      fontSize: 18.0, color: Color(0xFFDFDFDF))),
            ),
            Container(
                alignment: Alignment.center,
                width: double.infinity,
                height: 200,
                child: widget.foto != null
                    ? Image.file(
                        File(widget.foto!.path),
                        width: 150,
                        height: 150,
                        fit: BoxFit.cover,
                      )
                    : Text(AppLocalizations.of(context).noImageSelected)),
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
                                AppLocalizations.of(context).autoDiagRequested,
                                AppLocalizations.of(context).autoDiagGoLookAtIt,
                                "OK");
                          } else {
                            // ignore: use_build_context_synchronously
                            showDialogSingleButton(
                                context,
                                AppLocalizations.of(context).thereIsAnError,
                                AppLocalizations.of(context).tryAgain,
                                "OK");
                            setState(() => isDisabled = false);
                          }
                        },
                  child: Text(AppLocalizations.of(context).diagnosticAuto,
                      style:
                          const TextStyle(color: Colors.white, fontSize: 22.0)),
                ),
              ),
            ),
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
                          bool result = await CaseDiagnosticManualManager()
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
                                AppLocalizations.of(context).thereIsAnError,
                                AppLocalizations.of(context).tryAgain,
                                "OK");
                            setState(() => isDisabled = false);
                          }
                        },
                  child: Text(AppLocalizations.of(context).diagnosticManual,
                      style:
                          const TextStyle(color: Colors.white, fontSize: 22.0)),
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
                  child: Text(AppLocalizations.of(context).back,
                      style:
                          const TextStyle(color: Colors.white, fontSize: 22.0)),
                ),
              ),
            ),
          ],
        )));
  }

  Future<void> getMyFlags() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();

    setState(() {
      flagEs = prefs.getString('es_flag') ?? 'es';
      flagEn = prefs.getString('en_flag') ?? 'us';
    });
  }
}
