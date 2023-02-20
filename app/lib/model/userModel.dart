class UserModel {
  final int id;
  final String token;
  final String email;

  UserModel(this.token, this.email, this.id);

  UserModel.fromJson(Map<String, dynamic> json)
      : token = json['token'],
        email = json['email'],
        id = json['id'];

  Map<String, dynamic> toJson() => {'token': token, 'email': email, 'id': id};
}
