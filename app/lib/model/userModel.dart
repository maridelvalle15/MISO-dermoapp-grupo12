class UserModel {
  final int id;
  final String token;
  final String email;
  final String country;

  UserModel(this.token, this.email, this.id, this.country);

  UserModel.fromJson(Map<String, dynamic> json)
      : token = json['token'],
        email = json['email'],
        id = json['id'],
        country = json['country'];

  Map<String, dynamic> toJson() => {'token': token, 'email': email, 'id': id};
}
