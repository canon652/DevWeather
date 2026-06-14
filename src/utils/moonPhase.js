const KNOWN_NEW_MOON = new Date(2000, 0, 6); // 6 января 2000
const LUNATION = 29.53058867;

export const getMoonPhase = (date = new Date()) => {
  const daysSince = (date - KNOWN_NEW_MOON) / (1000 * 60 * 60 * 24);
  const age = ((daysSince % LUNATION) + LUNATION) % LUNATION;
  const phase = age / LUNATION;

  let name, emoji, tip;
  if (phase < 0.03 || phase >= 0.97) {
    name = 'Новолуние'; emoji = '🌑'; tip = 'Начало лунного цикла. Хорошо начинать новые дела.';
  } else if (phase < 0.22) {
    name = 'Растущий серп'; emoji = '🌒'; tip = 'Луна растёт. Благоприятно для роста и развития.';
  } else if (phase < 0.28) {
    name = 'Первая четверть'; emoji = '🌓'; tip = 'Половина пути к полнолунию. Время действовать.';
  } else if (phase < 0.47) {
    name = 'Прибывающая Луна'; emoji = '🌔'; tip = 'Сила Луны нарастает. Хорошее время для планов.';
  } else if (phase < 0.53) {
    name = 'Полнолуние'; emoji = '🌕'; tip = 'Пик лунного цикла. Эмоции обострены.';
  } else if (phase < 0.72) {
    name = 'Убывающая Луна'; emoji = '🌖'; tip = 'Время завершать дела и освобождаться от лишнего.';
  } else if (phase < 0.78) {
    name = 'Последняя четверть'; emoji = '🌗'; tip = 'Время подводить итоги.';
  } else {
    name = 'Убывающий серп'; emoji = '🌘'; tip = 'Луна убывает. Покой и отдых.';
  }

  return { day: Math.round(age) + 1, name, emoji, tip };
};
