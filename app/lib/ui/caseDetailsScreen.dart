import 'dart:io';

import 'package:dermoapp/common/managers/CaseDetailManager.dart';
import 'package:dermoapp/common/widgets/mainDrawer.dart';
import 'package:dermoapp/main.dart';
import 'package:dermoapp/model/caseModel.dart';
import 'package:dermoapp/ui/caseAddImagesScreen.dart';
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
  CaseModel caseDetail = CaseModel('', '', 0, '', '', '', '');

  @override
  void initState() {
    super.initState();

    getCase(widget.id);
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
                    child: Text(injuryType[caseDetail.tipo] ?? '',
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
                    child: Text(injuryForm[caseDetail.forma] ?? '',
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
                    child: Text(injuryQty[caseDetail.cantidad] ?? '',
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
                    child: Text(injuryDist[caseDetail.distrib] ?? '',
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
                  caseDetail.adicional.isEmpty
                      ? AppLocalizations.of(context).noAdditionalInfo
                      : caseDetail.adicional,
                  style: const TextStyle(
                      fontSize: 18.0, color: Color(0xFFDFDFDF))),
            ),
            Container(
                alignment: Alignment.center,
                width: double.infinity,
                height: 200,
                child: caseDetail.imagen.isNotEmpty
                    ? Image.network(
                        caseDetail.imagen,
                        width: 150,
                        height: 150,
                        fit: BoxFit.cover,
                      )
                    : const Text('')),
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
                  key: const Key('btnBackToList'),
                  onPressed: () {
                    Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => const CaseListScreen()));
                  },
                  child: Text(AppLocalizations.of(context).backToCaseList,
                      style:
                          const TextStyle(color: Colors.white, fontSize: 22.0)),
                ),
              ),
            ),
          ],
        )));
  }

  void getCase(int id) async {
    var caseResult = await CaseDetailManager().getCase(id);
    setState(() {
      caseDetail = caseResult;
    });
  }
}
