import 'package:flutter/material.dart';

import '../model/user.dart';

class UserProvider extends ChangeNotifier {
  User _user = User(
      email: "",
      id: "",
      name: "",
      password: "",
      address: "",
      type: "",
      token: "");
// making _user private private
      User get user => _user;

      void setUser(String user){
        _user = User.fromJson(user);
        notifyListeners();
      }
}
