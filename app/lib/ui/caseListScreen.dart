import 'package:dermoapp/common/managers/CaseListManager.dart';
import 'package:dermoapp/common/widgets/mainDrawer.dart';
import 'package:dermoapp/main.dart';
import 'package:dermoapp/ui/caseDetailsScreen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:country_icons/country_icons.dart';

class CaseListScreen extends StatefulWidget {
  const CaseListScreen({super.key});

  @override
  State<StatefulWidget> createState() {
    return CaseListScreenState();
  }
}

class CaseListScreenState extends State<CaseListScreen> {
  List results = [];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        drawer: const MainDrawer(
          currentSelected: 3,
        ),
        appBar: AppBar(
            title: Text(AppLocalizations.of(context).myCases,
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
                  child: Text(AppLocalizations.of(context).myCases,
                      style: const TextStyle(
                          fontSize: 16.0, color: Color(0xffdfdfdf))),
                )),
            SingleChildScrollView(
                scrollDirection: Axis.vertical,
                padding: const EdgeInsets.all(10),
                child: FutureBuilder(
                    future: CaseListManager().getMyCases(),
                    builder: (context, snapshot) {
                      results = snapshot.data ?? [];
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
                                  AppLocalizations.of(context).id,
                                ),
                              ),
                              DataColumn(
                                label: Text(
                                  AppLocalizations.of(context).caseDate,
                                ),
                              ),
                              DataColumn(
                                label: Text(AppLocalizations.of(context)
                                    .diagnosticType),
                              ),
                              DataColumn(
                                label: Text(
                                    AppLocalizations.of(context).caseDetails),
                              ),
                            ],
                            rows: List.generate(results.length,
                                (index) => getDataRow(index, results[index]))),
                      );
                    })),
          ],
        )));
  }

  DataRow getDataRow(index, data) {
    int caseId = data.id;

    String diagnosticType = data.tipodiagnostico == 'auto'
        ? AppLocalizations.of(context).automatic
        : data.tipodiagnostico == 'manual'
            ? AppLocalizations.of(context).manual
            : '';
    return DataRow(
      cells: <DataCell>[
        DataCell(
          Text('$caseId'),
        ),
        DataCell(
          Text(data.fecha),
        ),
        DataCell(
          Text(diagnosticType),
        ),
        DataCell(
          ElevatedButton(
            key: const Key('btnCaseDetails'),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) => CaseDetailScreen(caseId)),
              );
            },
            child: Text(AppLocalizations.of(context).caseDetails,
                style: const TextStyle(
                    color: Colors.white,
                    fontSize: 14.0,
                    fontWeight: FontWeight.normal)),
          ),
        ),
      ],
    );
  }
}
