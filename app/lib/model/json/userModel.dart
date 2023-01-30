class UserModel {
  final int id;
  final String name;
  final String token;
  final String email;

  UserModel(this.name, this.token, this.email, this.id);

  UserModel.fromJson(Map<String, dynamic> json)
      : name = json['name'],
        token = json['token'],
        email = json['email'],
        id = json['id'];

  Map<String, dynamic> toJson() =>
      {'name': name, 'token': token, 'email': email, 'id': id};
}
