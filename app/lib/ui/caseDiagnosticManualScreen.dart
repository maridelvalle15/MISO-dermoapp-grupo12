import 'package:DermoApp/common/managers/CaseDiagnosticManualManager.dart';
import 'package:DermoApp/common/ui/showSingleDialogButton.dart';
import 'package:DermoApp/common/widgets/mainDrawer.dart';
import 'package:DermoApp/main.dart';
import 'package:DermoApp/model/appointmentModel.dart';
import 'package:DermoApp/ui/caseDetailsScreen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:country_icons/country_icons.dart';
import 'package:shared_preferences/shared_preferences.dart';

class CaseDiagnosticManualScreen extends StatefulWidget {
  CaseDiagnosticManualScreen(this.id, this.citaMedica, this.tipoConsulta,
      {super.key});
  final int id;
  int citaMedica;
  String tipoConsulta;

  @override
  State<StatefulWidget> createState() {
    return CaseDiagnosticManualScreenState();
  }
}

class CaseDiagnosticManualScreenState
    extends State<CaseDiagnosticManualScreen> {
  String? caseDiagnostic;
  bool isDisabled = true;
  bool hasAppointment = false;
  AppointmentModel caseAppointment = AppointmentModel('', '');
  String flagEs = 'es';
  String flagEn = 'us';

  @override
  void initState() {
    super.initState();

    getCaseDiagnostic(widget.id);
    getMyFlags();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        drawer: const MainDrawer(
          currentSelected: 2,
        ),
        appBar: AppBar(
            title: Text(AppLocalizations.of(context).diagnosticManual,
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
                      child: Text(AppLocalizations.of(context).doctorDiagnostic,
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
                if (hasAppointment)
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Expanded(
                        child: Padding(
                          padding: const EdgeInsets.all(15),
                          child: Text(
                            AppLocalizations.of(context).appointmentStatus,
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
                          child: Text(caseAppointment.estado,
                              style: const TextStyle(
                                  fontSize: 18.0,
                                  color: Color(0xFFDFDFDF),
                                  fontWeight: FontWeight.bold)),
                        ),
                      ),
                    ],
                  ),
                if (hasAppointment)
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Expanded(
                        child: Padding(
                          padding: const EdgeInsets.all(15),
                          child: Text(
                            AppLocalizations.of(context).appointmentDate,
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
                          child: Text(caseAppointment.fecha,
                              style: const TextStyle(
                                  fontSize: 18.0,
                                  color: Color(0xFFDFDFDF),
                                  fontWeight: FontWeight.bold)),
                        ),
                      ),
                    ],
                  ),
                if (hasAppointment && widget.tipoConsulta.length > 1)
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
                          child: Text(widget.tipoConsulta,
                              style: const TextStyle(
                                  fontSize: 18.0,
                                  color: Color(0xFFDFDFDF),
                                  fontWeight: FontWeight.bold)),
                        ),
                      ),
                    ],
                  ),
                if (widget.citaMedica == 0)
                  Padding(
                    padding: const EdgeInsets.fromLTRB(0.0, 30.0, 0.0, 0.0),
                    child: SizedBox(
                      height: 55.0,
                      child: ElevatedButton(
                        key: const Key('btnAccept'),
                        style: ElevatedButton.styleFrom(
                            disabledBackgroundColor: Colors.grey),
                        onPressed: isDisabled
                            ? null
                            : () async {
                                setState(() => isDisabled = true);
                                bool result =
                                    await CaseDiagnosticManualManager()
                                        .requestTreatment(widget.id);
                                if (result == true) {
                                  // ignore: use_build_context_synchronously
                                  showDialogSingleButton(
                                      context,
                                      AppLocalizations.of(context)
                                          .appointmentRequestedTitle,
                                      AppLocalizations.of(context)
                                          .appointmentRequestedText,
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
                            AppLocalizations.of(context).acceptTreatment,
                            style: const TextStyle(
                                color: Colors.white, fontSize: 22.0)),
                      ),
                    ),
                  ),
                if (widget.citaMedica == 0)
                  Padding(
                    padding: const EdgeInsets.fromLTRB(0.0, 30.0, 0.0, 0.0),
                    child: SizedBox(
                      height: 55.0,
                      child: ElevatedButton(
                        key: const Key('btnReject'),
                        style: ElevatedButton.styleFrom(
                            disabledBackgroundColor: Colors.grey),
                        onPressed: isDisabled
                            ? null
                            : () async {
                                setState(() => isDisabled = true);
                                bool result =
                                    await CaseDiagnosticManualManager()
                                        .refuseTreatment(widget.id);
                                if (result == true) {
                                  // ignore: use_build_context_synchronously
                                  showDialogSingleButton(
                                      context,
                                      AppLocalizations.of(context)
                                          .manualTreatmentRejectedTitle,
                                      AppLocalizations.of(context)
                                          .manualTreatmentRejectedText,
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
                            AppLocalizations.of(context).rejectTreatment,
                            style: const TextStyle(
                                color: Colors.white, fontSize: 22.0)),
                      ),
                    ),
                  ),
                if (hasAppointment && widget.tipoConsulta.length < 2)
                  Padding(
                    padding: const EdgeInsets.fromLTRB(0.0, 30.0, 0.0, 0.0),
                    child: SizedBox(
                      height: 55.0,
                      child: ElevatedButton(
                        key: const Key('btnAppointmentOnSite'),
                        style: ElevatedButton.styleFrom(
                            disabledBackgroundColor: Colors.grey),
                        onPressed: isDisabled
                            ? null
                            : () async {
                                setState(() => isDisabled = true);
                                bool result =
                                    await CaseDiagnosticManualManager()
                                        .requestOnSiteAppointment(widget.id);
                                if (result == true) {
                                  // ignore: use_build_context_synchronously
                                  showDialogSingleButton(
                                      context,
                                      AppLocalizations.of(context)
                                          .onSiteAppointmentRequestedTitle,
                                      AppLocalizations.of(context)
                                          .onSiteAppointmentRequestedText,
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
                            AppLocalizations.of(context).onSiteAppointment,
                            style: const TextStyle(
                                color: Colors.white, fontSize: 22.0)),
                      ),
                    ),
                  ),
                if (hasAppointment && widget.tipoConsulta.length < 2)
                  Padding(
                    padding: const EdgeInsets.fromLTRB(0.0, 30.0, 0.0, 0.0),
                    child: SizedBox(
                      height: 55.0,
                      child: ElevatedButton(
                        key: const Key('btnAppointmentOnline'),
                        style: ElevatedButton.styleFrom(
                            disabledBackgroundColor: Colors.grey),
                        onPressed: isDisabled
                            ? null
                            : () async {
                                setState(() => isDisabled = true);
                                bool result =
                                    await CaseDiagnosticManualManager()
                                        .requestOnlineAppointment(widget.id);
                                if (result == true) {
                                  // ignore: use_build_context_synchronously
                                  showDialogSingleButton(
                                      context,
                                      AppLocalizations.of(context)
                                          .onlineAppointmentRequestedTitle,
                                      AppLocalizations.of(context)
                                          .onlineAppointmentRequestedText,
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
                            AppLocalizations.of(context).onlineAppointment,
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
      isDisabled = caseDiagnostic == null;
    });

    if (caseDiagnostic != null) getCaseAppointment(id);
  }

  void getCaseAppointment(int id) async {
    var caseAppointmentResult =
        await CaseDiagnosticManualManager().getAppointmentDetails(id);
    setState(() {
      caseAppointment = caseAppointmentResult;
      hasAppointment = caseAppointmentResult.estado.length > 1;
    });
  }

  Future<void> refreshDiagnostic() async {
    getCaseDiagnostic(widget.id);
  }

  Future<void> getMyFlags() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();

    setState(() {
      flagEs = prefs.getString('es_flag') ?? 'es';
      flagEn = prefs.getString('en_flag') ?? 'us';
    });
  }
}
