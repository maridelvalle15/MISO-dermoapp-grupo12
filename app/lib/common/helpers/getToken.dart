import 'package:shared_preferences/shared_preferences.dart';

getToken() async {
  SharedPreferences preferences = await SharedPreferences.getInstance();

  String? getToken = preferences.getString("token");
  return getToken;
}
