import 'package:amazon_clone/constants/global_variable.dart';
import 'package:amazon_clone/screens/auth/auth_screen.dart';
import 'package:amazon_clone/provider/user_provider.dart';
import 'package:amazon_clone/router.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(MultiProvider(providers: [
    ChangeNotifierProvider(
      create: (context) => UserProvider(),
    ),
  ], child: const MyApp()));
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'Amazon Clone',
        theme: ThemeData(
          backgroundColor: GlobalVariables.backgroundColor,
          colorScheme: const ColorScheme.light(
            primary: GlobalVariables.secondaryColor,
          ),
          appBarTheme: const AppBarTheme(
            elevation: 0,
            iconTheme: IconThemeData(color: Colors.black),
          ),
        ),
        onGenerateRoute: (settings) => generateRoute(settings),
        home: AuthScreen()
        //  Scaffold(
        //   appBar: AppBar(
        //     title: const Text("Hello"),
        //   ),
        //   body: Column(
        //     children: [
        //       Center(
        //         child: Text(
        //           'Hello there 😀',
        //         ),
        //       ),
        //       Builder(builder: (context) {
        //         return ElevatedButton(
        //           onPressed: (() {
        //             Navigator.pushNamed(context, AuthScreen.routeName);
        //           }),
        //           child: Text('Clicked!'),
        //         );
        //       })
        //     ],
        //   ),
        // ),
        );
  }
}
