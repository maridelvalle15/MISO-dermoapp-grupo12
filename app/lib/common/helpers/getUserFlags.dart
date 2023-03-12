Map<String, String> getUserFlags(countryCode) {
  Map<String, String> flags = {"es": "es", "en": "us"};

  String? userCountryLanguage;
  // get language for user country
  if (countryCode != '') {
    userCountryLanguage = countriesLangs[countryCode];
  }

  // if found, set country for that language
  if (userCountryLanguage != null) {
    flags[userCountryLanguage] = countryCode;
  }

  return flags;
}

final countriesLangs = {
  'ar': 'es',
  'ca': 'en',
  'co': 'es',
  've': 'es',
};
