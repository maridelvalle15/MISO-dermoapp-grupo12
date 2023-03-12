import 'package:shared_preferences/shared_preferences.dart';

Future<Map<String, String>> getUserFlags() async {
  SharedPreferences preferences = await SharedPreferences.getInstance();
  Map<String, String> flags = {"es": "es", "en": "us"};

  String userCountry = preferences.getString('country') ?? '';

  // get language for user country

  // if found, set country for that language

  return flags;
}

final countriesLangs = {
  'ar': 'es',
  'ca': 'en',
  'co': 'es',
  've': 'es',
};
