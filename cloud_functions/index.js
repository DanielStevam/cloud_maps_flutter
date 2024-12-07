const express = require('express');
const app = express();
const port = 3000;

app.get('/getNearbyPucMinas', (req, res) => {
  const latitude = parseFloat(req.query.lat);
  const longitude = parseFloat(req.query.long);

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Parâmetros lat e long são obrigatórios.' });
  }

  const unidades = [
    { name: "PUC Minas Coração Eucarístico", lat: -19.922680620050986, long: -43.99248771529495 }, //-19.922680620050986, -43.99248771529495
    { name: "PUC Minas Barreiro", lat: -19.976850738901657, long: -44.02570328361257 }, //-19.976850738901657, -44.02570328361257
    { name: "PUC Minas São Gabriel", lat: -19.859212250699805, long: -43.91893993432448 }, //-19.859212250699805, -43.91893993432448
    { name: "PUC Minas Praça da Liberdade", lat: -19.933604500137246, long: -43.93636851898288 }, //-19.933604500137246, -43.93636851898288
    { name: "PUC Minas Betim", lat: -19.954869887659402, long: -44.19841164597313 }, //-19.954869887659402, -44.19841164597313
    { name: "PUC Minas Contagem", lat: -19.938943653023856, long: -44.076079332478095 }, //-19.938943653023856, -44.076079332478095
    { name: "PUC Minas Poços de Caldas", lat: -21.799842733232577, long: -46.59946373242829 }, //-21.799842733232577, -46.59946373242829
    { name: "PUC Minas Uberlândia", lat: -18.923924050308642, long: -48.294707529401755 }, //-18.923924050308642, -48.294707529401755
    { name: "PUC Minas Arcos", lat: -20.298368742405373, long: -45.54333204412018 }, //-20.298368742405373, -45.54333204412018
];

  // Calcular distâncias e filtrar unidades dentro de 100 metros
  const proximasUnidades = unidades
    .map((unidade) => ({
      ...unidade,
      distancia: calcularDistancia(latitude, longitude, unidade.lat, unidade.long),
    }))
    .filter((unidade) => unidade.distancia <= 100) // Verificando se está a menos de 100 metros
    .sort((a, b) => a.distancia - b.distancia);

  // Verificar se há uma unidade dentro de 100 metros
  if (proximasUnidades.length === 0) {
    return res.status(404).json({ message: 'Nenhuma unidade da PUC Minas encontrada dentro de 100 metros.' });
  }

  // Retornar a unidade mais próxima
  res.status(200).json({
    message: `Bem-vindo à PUC Minas unidade ${proximasUnidades[0].name}`,
  });
});

function calcularDistancia(lat1, long1, lat2, long2) {
  const R = 6371000; // Raio da Terra em metros
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLong = ((long2 - long1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Retorna a distância em metros
}

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
