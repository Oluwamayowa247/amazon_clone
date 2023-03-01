import 'dart:convert';
import 'package:amazon_clone/constants/error_handling.dart';
import 'package:amazon_clone/constants/global_variable.dart';
import 'package:amazon_clone/constants/utils.dart';
import 'package:amazon_clone/features/auth/screens/home/home_screen.dart';
import 'package:amazon_clone/model/user.dart';
import 'package:amazon_clone/provider/user_provider.dart';
import 'package:flutter/cupertino.dart';
import 'package:provider/provider.dart';
import "package:shared_preferences/shared_preferences.dart";
import "package:http/http.dart" as http;

class AuthService {
  //fx to signup user
  void signUpUser(
      {required String email,
      required BuildContext context,
      required String name,
      required String password}) async {
    try {
      User user = User(
        id: "id",
        name: name,
        password: password,
        email: email,
        address: "address",
        type: "type",
        token: " token",
      );

      http.Response res = await http.post(
        Uri.parse("$uri/api/signup"),
        body: user.toJson(),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );
      httpErrorHandling(
        response: res,
        context: context,
        onSuccess: (() {
          showSnackBar(
            context,
            "Account Has Been Created Successfully, Now you can login with details",
          );
        }),
      );
      //await can be used to get the completed results of an asynchronous function
      print(res.statusCode);
      print(res.body);
    } catch (e) {
      showSnackBar(
        context,
        e.toString(),
      );
    }
  }

  //Sign in user
  void signInUser(
      {required String email,
      required BuildContext context,
      required String password}) async {
    try {
      http.Response res = await http.post(
        Uri.parse("$uri/api/signin"),
        body: jsonEncode({
          'email': email,
          'password': password,
        }),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );
      httpErrorHandling(
        response: res,
        context: context,
        onSuccess: (() async {
          print(res.statusCode);
          print(res.body);
          //init shared preferences

          SharedPreferences prefs = await SharedPreferences.getInstance();
          Provider.of<UserProvider>(context, listen: false).setUser(res.body);
          await prefs.setString("auth-token", jsonDecode(res.body)['token']);
          Navigator.pushNamedAndRemoveUntil(
              context, HomeScreen.routeName, (route) => false);
        }),
      );
      print(res.statusCode);
      print(res.body);
      //await can be used to get the completed results of an asynchronous function

    } catch (e) {
      showSnackBar(
        context,
        e.toString(),
      );
    }
  }
}
