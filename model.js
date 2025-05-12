// model.js

// URL base de la API de horóscopo diario
const API_URL =
  "https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily";

/**
 * Llama a la API usando un proxy para evitar problemas CORS.
 * Si la solicitud falla o la respuesta no es OK, retorna el horóscopo local.
 * @param {string} sign - El nombre del signo zodiacal (e.g. "aries").
 * @returns {Promise<string>} La predicción del día.
 */
export async function getDailyHoroscope(sign) {
  try {
    // Construye URL del proxy con la consulta original
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
      `${API_URL}?sign=${sign}&day=TODAY`
    )}`;
    const response = await fetch(proxyUrl);

    if (!response.ok) {
      // Si la API falla, caemos al fallback local
      return getLocalHoroscope(sign);
    }

    // La respuesta viene anidada en .contents
    const data = await response.json();
    const horoscopeData = JSON.parse(data.contents);
    // Si la API devolvió datos, los usamos; si no, fallback local
    return horoscopeData.data?.horoscope_data || getLocalHoroscope(sign);
  } catch (error) {
    console.error("Error fetching horoscope:", error);
    return getLocalHoroscope(sign);
  }
}

/**
 * Predicciones locales como respaldo en caso de fallo de la API.
 * @param {string} sign - El nombre del signo zodiacal.
 * @returns {string} Texto de predicción.
 */
function getLocalHoroscope(sign) {
  const horoscopes = {
    aries:
      "Hoy es un día para tomar iniciativa. Las oportunidades están frente a ti.",
    taurus:
      "La paciencia será tu virtud hoy. Las cosas buenas llegan a quienes esperan.",
    gemini: "Tu curiosidad te llevará a descubrir cosas interesantes hoy.",
    cancer: "Las emociones estarán a flor de piel. Escucha tu intuición.",
    leo: "Es tu momento para brillar. Tu carisma natural atraerá atención positiva.",
    virgo:
      "Los detalles marcarán la diferencia hoy. Tu meticulosidad será apreciada.",
    libra: "El equilibrio será clave en tus relaciones. Busca la armonía.",
    scorpio:
      "Tu intensidad puede impresionar a otros hoy. Usa tu poder con sabiduría.",
    sagittarius:
      "La aventura te llama. Considera probar algo nuevo o planificar un viaje.",
    capricorn:
      "Tu disciplina dará frutos hoy. Sigue trabajando hacia tus metas.",
    aquarius:
      "Tus ideas innovadoras sorprenderán a los demás. Comparte tus pensamientos.",
    pisces:
      "Tu creatividad está en su punto más alto. Expresa tus sentimientos.",
  };

  return (
    horoscopes[sign] || "Las estrellas tienen un mensaje especial para ti hoy."
  );
}

/**
 * Calcula el signo zodiacal según día y mes.
 * @param {number} day - Día del mes.
 * @param {number} month - Mes (1–12).
 * @returns {{sign: string, emoji: string}} Objeto con clave de signo y emoji.
 */
export function getZodiacSign(day, month) {
  const zodiac = [
    {
      sign: "aries",
      emoji: "♈",
      dates: [
        [21, 3],
        [19, 4],
      ],
    },
    {
      sign: "taurus",
      emoji: "♉",
      dates: [
        [20, 4],
        [20, 5],
      ],
    },
    {
      sign: "gemini",
      emoji: "♊",
      dates: [
        [21, 5],
        [20, 6],
      ],
    },
    {
      sign: "cancer",
      emoji: "♋",
      dates: [
        [21, 6],
        [22, 7],
      ],
    },
    {
      sign: "leo",
      emoji: "♌",
      dates: [
        [23, 7],
        [22, 8],
      ],
    },
    {
      sign: "virgo",
      emoji: "♍",
      dates: [
        [23, 8],
        [22, 9],
      ],
    },
    {
      sign: "libra",
      emoji: "♎",
      dates: [
        [23, 9],
        [22, 10],
      ],
    },
    {
      sign: "scorpio",
      emoji: "♏",
      dates: [
        [23, 10],
        [21, 11],
      ],
    },
    {
      sign: "sagittarius",
      emoji: "♐",
      dates: [
        [22, 11],
        [21, 12],
      ],
    },
    {
      sign: "capricorn",
      emoji: "♑",
      dates: [
        [22, 12],
        [19, 1],
      ],
    },
    {
      sign: "aquarius",
      emoji: "♒",
      dates: [
        [20, 1],
        [18, 2],
      ],
    },
    {
      sign: "pisces",
      emoji: "♓",
      dates: [
        [19, 2],
        [20, 3],
      ],
    },
  ];

  for (const z of zodiac) {
    const [startDate, endDate] = z.dates;
    if (
      (month === startDate[1] && day >= startDate[0]) ||
      (month === endDate[1] && day <= endDate[0])
    ) {
      return z;
    }
  }
  // Por defecto, retorna Aries si no hay coincidencia
  return { sign: "aries", emoji: "♈" };
}
