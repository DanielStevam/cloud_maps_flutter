import 'package:flutter/material.dart';
import 'pages/map.dart';
import 'pages/list.dart';
import 'pages/splash.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'PUC Maps Cloud',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => const SplashPage(),
        '/map': (context) => const MapPage(),
        '/list': (context) => const ListPage(),
      },
    );
  }
}


