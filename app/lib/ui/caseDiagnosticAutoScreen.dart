import 'package:dermoapp/common/managers/CaseDiagnosticAutoManager.dart';
import 'package:dermoapp/common/widgets/mainDrawer.dart';
import 'package:dermoapp/main.dart';
import 'package:dermoapp/ui/caseDetailsScreen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:country_icons/country_icons.dart';

class CaseDiagnosticAutoScreen extends StatefulWidget {
  const CaseDiagnosticAutoScreen(this.id, {super.key});

  final int id;

  @override
  State<StatefulWidget> createState() {
    return CaseDiagnosticAutoScreenState();
  }
}

class CaseDiagnosticAutoScreenState extends State<CaseDiagnosticAutoScreen> {
  List<dynamic> caseDiagnostic = [];

  @override
  void initState() {
    super.initState();

    getCaseDiagnosticAuto(widget.id);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        drawer: const MainDrawer(
          currentSelected: 3,
        ),
        appBar: AppBar(
            title: Text(AppLocalizations.of(context).caseDiagnosticAuto,
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
                  child: Text(AppLocalizations.of(context).diagnosticAuto,
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
            SingleChildScrollView(
                scrollDirection: Axis.vertical,
                padding: const EdgeInsets.all(10),
                child: FutureBuilder(
                    future:
                        CaseDiagnosticAutoManager().getDiagnostic(widget.id),
                    builder: (context, snapshot) {
                      caseDiagnostic = snapshot.data ?? [];
                      return FittedBox(
                        child: DataTable(
                            headingTextStyle: const TextStyle(
                                color: Color(0xFFDFDFDF),
                                fontWeight: FontWeight.bold),
                            dataTextStyle:
                                const TextStyle(color: Color(0xFFDFDFDF)),
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
                                caseDiagnostic.length,
                                (index) =>
                                    getDataRow(index, caseDiagnostic[index]))),
                      );
                    })),
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
                            builder: (context) => CaseDetailScreen(widget.id)));
                  },
                  child: Text(AppLocalizations.of(context).backToCaseDetails,
                      style:
                          const TextStyle(color: Colors.white, fontSize: 22.0)),
                ),
              ),
            ),
          ],
        )));
  }

  void getCaseDiagnosticAuto(int id) async {
    var caseResult = await CaseDiagnosticAutoManager().getDiagnostic(id);
    setState(() {
      caseDiagnostic = caseResult;
    });
  }

  DataRow getDataRow(index, data) {
    return DataRow(
      cells: <DataCell>[
        DataCell(
          Text(data.diagnostico),
        ),
        DataCell(
          Text(data.certitud),
        ),
      ],
    );
  }
}
