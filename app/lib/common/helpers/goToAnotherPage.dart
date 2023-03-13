import 'package:flutter/material.dart';

void goToAnotherPage(context, page) {
  // ignore: use_build_context_synchronously
  Navigator.push(
    context,
    MaterialPageRoute(builder: (context) => page),
  );
}
