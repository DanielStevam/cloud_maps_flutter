import 'package:flutter/material.dart';
import '../data/puc_units.dart';

class ListPage extends StatelessWidget {
  const ListPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Unidades da PUC'),
      ),
      body: ListView.separated(
        padding: const EdgeInsets.all(8.0),
        itemCount: pucUnits.length,
        separatorBuilder: (context, index) => const Divider(),
        itemBuilder: (context, index) {
          final unit = pucUnits[index];
          return Card(
            elevation: 2.0,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(8.0),
            ),
            child: ListTile(
              leading: const Icon(
                Icons.location_city,
                color: Colors.blue,
                size: 36.0,
              ),
              title: Text(
                unit['name']!,
                style: const TextStyle(fontWeight: FontWeight.bold),
              ),
              subtitle: Text(
                unit['address']!,
                style: const TextStyle(fontSize: 14.0),
              ),
              trailing: const Icon(
                Icons.arrow_forward_ios,
                color: Colors.grey,
                size: 16.0,
              ),
              onTap: () {
                showDialog(
                  context: context,
                  builder: (BuildContext context) {
                    return AlertDialog(
                      title: Text(unit['name']!),
                      content: Text('Endereço:\n${unit['address']}'),
                      actions: [
                        TextButton(
                          onPressed: () {
                            Navigator.of(context).pop();
                          },
                          child: const Text('Fechar'),
                        ),
                      ],
                    );
                  },
                );
              },
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.pushNamed(context, '/map'); // Navega de volta ao mapa
        },
        child: const Icon(Icons.map),
      ),
    );
  }
}
