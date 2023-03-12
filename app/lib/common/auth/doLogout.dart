import 'package:shared_preferences/shared_preferences.dart';

doLogout() async {
  SharedPreferences preferences = await SharedPreferences.getInstance();

  await preferences.setString('token', "");
  await preferences.setString('email', "");
  await preferences.setString('country', "");
  await preferences.setInt('id', 0);

  preferences.remove('userEntity');
  preferences.remove('userId');
  preferences.remove('userEntityId');
  preferences.remove('userTimePeriod');
}
