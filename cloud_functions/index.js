const functions = require("@google-cloud/functions-framework");

// Lista de locais fictícios
const locais = [
  { name: "PUC Minas - Campus Coração Eucarístico", lat: -19.92083, long: -43.99172 },
  { name: "PUC Minas - São Gabriel", lat: -19.85886, long: -43.91787 },
  { name: "PUC Minas - Barreiro", lat: -19.97857, long: -44.02023 },
];

// Função para calcular a distância entre dois pontos
function calcularDistancia(lat1, long1, lat2, long2) {
  const R = 6371; // Raio da Terra em km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLong = ((long2 - long1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distância em km
}

// Cloud Function
functions.http("getNearbyLocations", (req, res) => {
  const latitude = parseFloat(req.query.lat);
  const longitude = parseFloat(req.query.long);

  if (isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).send({
      error: "Parâmetros 'lat' e 'long' são obrigatórios e devem ser números válidos.",
    });
  }

  try {
    const locaisProximos = locais.map((local) => {
      const distancia = calcularDistancia(latitude, longitude, local.lat, local.long);
      return { ...local, distance: distancia };
    });

    locaisProximos.sort((a, b) => a.distance - b.distance);

    // Retorna os locais ordenados por distância
    res.status(200).send(locaisProximos);
  } catch (error) {
    res.status(500).send({
      error: "Ocorreu um erro ao processar a requisição.",
    });
  }
});
