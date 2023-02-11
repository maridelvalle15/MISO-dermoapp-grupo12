import 'package:shared_preferences/shared_preferences.dart';
import 'package:dermoapp/model/userModel.dart';

saveLoginInfo(Map<String, dynamic> responseJson) async {
  SharedPreferences preferences = await SharedPreferences.getInstance();

  var token =
      (responseJson.isNotEmpty) ? UserModel.fromJson(responseJson).token : "";
  var email =
      (responseJson.isNotEmpty) ? UserModel.fromJson(responseJson).email : "";
  var id = (responseJson.isNotEmpty) ? UserModel.fromJson(responseJson).id : 0;

  await preferences.setString('token', (token.isNotEmpty) ? token : "");
  await preferences.setString('email', (email.isNotEmpty) ? email : "");
  await preferences.setInt('id', id);
}
