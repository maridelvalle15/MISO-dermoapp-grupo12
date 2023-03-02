import 'package:dermoapp/common/managers/CaseDiagnosticManualManager.dart';
import 'package:dermoapp/common/ui/showSingleDialogButton.dart';
import 'package:dermoapp/common/widgets/mainDrawer.dart';
import 'package:dermoapp/main.dart';
import 'package:dermoapp/ui/caseDetailsScreen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:country_icons/country_icons.dart';
import 'package:get/utils.dart';

class CaseDiagnosticManualScreen extends StatefulWidget {
  const CaseDiagnosticManualScreen(this.id, {super.key});

  final int id;

  @override
  State<StatefulWidget> createState() {
    return CaseDiagnosticManualScreenState();
  }
}

class CaseDiagnosticManualScreenState
    extends State<CaseDiagnosticManualScreen> {
  String? caseDiagnostic;
  bool isDisabled = false;

  @override
  void initState() {
    super.initState();

    getCaseDiagnostic(widget.id);
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
            onRefresh: refreshDiagnostic,
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
                  child: Text(
                      caseDiagnostic ??
                          AppLocalizations.of(context).noManualDiagnosticYet,
                      style: const TextStyle(
                          fontSize: 18.0, color: Color(0xFFDFDFDF))),
                ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(0.0, 30.0, 0.0, 0.0),
                  child: SizedBox(
                    height: 55.0,
                    child: ElevatedButton(
                      key: const Key('btnAccept'),
                      onPressed: () {
                        /*Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) =>
                                      CaseDiagnosticAutoScreen(widget.id)));*/
                      },
                      child: Text(AppLocalizations.of(context).acceptTreatment,
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
                      key: const Key('btnReject'),
                      onPressed: () {
                        /*Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) =>
                                      CaseDiagnosticAutoScreen(widget.id)));*/
                      },
                      child: Text(AppLocalizations.of(context).rejectTreatment,
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
            ))));
  }

  void getCaseDiagnostic(int id) async {
    var caseResult = await CaseDiagnosticManualManager().getDiagnostic(id);
    setState(() {
      caseDiagnostic = caseResult;
    });
  }

  Future<void> refreshDiagnostic() async {
    getCaseDiagnostic(widget.id);
  }
}
