import 'package:animate_gradient/animate_gradient.dart';
import 'package:flutter/material.dart';
import 'package:mediq_remake/components/glossycontainer.dart';
import 'package:mediq_remake/components/loginregisteritems.dart';

class LoginRegisterPage extends StatefulWidget {
  const LoginRegisterPage({super.key});

  @override
  State<LoginRegisterPage> createState() => _LoginRegisterPageState();
}

class _LoginRegisterPageState extends State<LoginRegisterPage> {
  late List<Widget> actionButtons;
  double mcHeight = 700;

  void changeContainerHeight(double newHeight, mcState) => mcState(() {
        mcHeight = newHeight;
      });

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SizedBox(
        height: MediaQuery.sizeOf(context).height,
        width: MediaQuery.sizeOf(context).width,
        child: AnimateGradient(
          reverse: true,
          primaryBegin: Alignment.bottomRight,
          primaryEnd: Alignment.center,
          secondaryBegin: Alignment.center,
          secondaryEnd: Alignment.topLeft,
          duration: const Duration(seconds: 10),
          primaryColors: const [
            Color(0xFF023e8a),
            Color(0xFF48cae4),
            // Color(0XFF90e0ef),
          ],
          secondaryColors: const [
            // Color(0XFF90e0ef),
            Color(0xFF9f86c0),
            Color(0xFF3a0ca3),
          ],
          child: Center(
            child: StatefulBuilder(
              builder: (c, s) => GlossyContainer(
                height: mcHeight,
                width: 500,
                strengthX: 10.0,
                strengthY: 10.0,
                color: Colors.black,
                gradient: const GlossyLinearGradient(
                    begin: Alignment.bottomRight,
                    end: Alignment.topLeft,
                    colors: [Colors.black, Color.fromARGB(255, 87, 87, 87)],
                    opacity: 0.4),
                opacity: 0.4,
                border: Border.all(color: Colors.transparent),
                borderRadius: BorderRadius.circular(12),
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(30, 50, 30, 50),
                  child: LoginRegisterItems(
                    changeContainerHeight: (newHeight) =>
                        changeContainerHeight(newHeight, s),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
