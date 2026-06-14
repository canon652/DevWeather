const BASE_GEO = 'https://api.openweathermap.org/geo/1.0';
const KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const searchCity = async (query) => {
  const res = await fetch(
    `${BASE_GEO}/direct?q=${encodeURIComponent(query)}&limit=6&appid=${KEY}`,
  );
  if (!res.ok) throw new Error('Ошибка поиска города');
  return res.json();
};

export const getCityName = (item) =>
  item.local_names?.ru || item.local_names?.en || item.name;

const COUNTRY_RU = {
  RU: 'Россия',     US: 'США',           GB: 'Великобритания', DE: 'Германия',
  FR: 'Франция',    IT: 'Италия',         ES: 'Испания',        CN: 'Китай',
  JP: 'Япония',     IN: 'Индия',          BR: 'Бразилия',       CA: 'Канада',
  AU: 'Австралия',  UA: 'Украина',        BY: 'Беларусь',       KZ: 'Казахстан',
  UZ: 'Узбекистан', AZ: 'Азербайджан',   GE: 'Грузия',         AM: 'Армения',
  TR: 'Турция',     PL: 'Польша',         CZ: 'Чехия',          SE: 'Швеция',
  NO: 'Норвегия',   FI: 'Финляндия',      DK: 'Дания',          NL: 'Нидерланды',
  PT: 'Португалия', GR: 'Греция',         HU: 'Венгрия',        RO: 'Румыния',
  BG: 'Болгария',   HR: 'Хорватия',       SK: 'Словакия',       AT: 'Австрия',
  CH: 'Швейцария',  BE: 'Бельгия',        EG: 'Египет',         ZA: 'ЮАР',
  MX: 'Мексика',    AR: 'Аргентина',      TH: 'Таиланд',        KR: 'Ю. Корея',
  AE: 'ОАЭ',        SA: 'Саудовская Аравия', IL: 'Израиль',     IR: 'Иран',
  PK: 'Пакистан',   ID: 'Индонезия',      MY: 'Малайзия',       PH: 'Филиппины',
  VN: 'Вьетнам',    TW: 'Тайвань',        SG: 'Сингапур',       NZ: 'Новая Зеландия',
  NL: 'Нидерланды', LV: 'Латвия',         LT: 'Литва',          EE: 'Эстония',
  MD: 'Молдова',    TJ: 'Таджикистан',    TM: 'Туркменистан',   KG: 'Кыргызстан',
  MN: 'Монголия',   RS: 'Сербия',         BA: 'Босния',         MK: 'Македония',
  AL: 'Албания',    SI: 'Словения',       ME: 'Черногория',     LU: 'Люксембург',
  MT: 'Мальта',     CY: 'Кипр',           IS: 'Исландия',       LI: 'Лихтенштейн',
  MA: 'Марокко',    TN: 'Тунис',          DZ: 'Алжир',          LY: 'Ливия',
};

export const getCityLabel = (item) => {
  const name = getCityName(item);
  const country = COUNTRY_RU[item.country] || item.country;
  return [name, country].filter(Boolean).join(', ');
};
