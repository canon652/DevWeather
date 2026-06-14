# DevWeather 🌤

Умная метеостанция с аналитикой — портфолио-проект.

## Что умеет

- Поиск любого города в мире (Nominatim / OpenStreetMap)
- Определение местоположения по геолокации браузера
- Текущая погода: температура, ощущаемая, описание, иконка
- 6 метрик: влажность, ветер, давление, видимость, облачность
- Почасовой график температуры на 24 часа (Recharts)
- Анимированная дуга восхода/заката солнца (SVG)
- Прогноз на 7 дней
- Сравнение погоды до 3 городов одновременно
- Избранные города с сортировкой
- Переключение °C / °F
- Светлая / тёмная тема
- Кэширование запросов (30 мин, localStorage)
- Адаптивная вёрстка (mobile-first)

## Стек

- **React 18** + **Vite**
- **Tailwind CSS** — glassmorphism UI, динамические фоны
- **Recharts** — графики температуры
- **React Router v6** — 3 страницы (Dashboard, Compare, Saved)
- **OpenWeatherMap API** — погода и прогноз
- **Nominatim API** — геокодирование (без ключа)

## Запуск

```bash
# 1. Клонировать репозиторий
git clone https://github.com/canon652/devweather.git
cd devweather

# 2. Установить зависимости
npm install

# 3. Создать .env и вставить API ключ OpenWeatherMap
echo "VITE_WEATHER_API_KEY=ваш_ключ" > .env

# 4. Запустить dev-сервер
npm run dev
```

Получить бесплатный API ключ: [openweathermap.org](https://openweathermap.org) → Sign Up → API Keys

## Структура

```
src/
├── api/          # Запросы к OpenWeatherMap и Nominatim
├── hooks/        # useWeather, useLocalStorage, useGeolocation
├── context/      # SettingsContext (тема, единицы)
├── utils/        # Форматирование, кэш, логика фона
├── components/   # SearchBar, WeatherCard, HourlyChart, WeekForecast…
└── pages/        # Dashboard, Compare, Saved
```
