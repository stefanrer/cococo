const translateDictionary = {
  "Коллокации": "Collocations",
  "Коллигации": "Colligations",
  "Конструкции": "Constructions",
  "Поиск": "Search",
  "Отмена": "Cancel",
  "Ок": "Ok",
  "Больше": "More",
  "О НАС": "ABOUT US",
  "РАСШИРЕННЫЙ ПОИСК": "ADVANCED SEARCH",
  "ОБЫЧНЫЙ ПОИСК": "SIMPLE SEARCH",
  "ТОКЕН": "TOKEN",
  "ЛЕММА": "LEMMA",
  "ENG": "RUS",
  "Введите слово": "Enter a word",
  "ЧАСТЬ РЕЧИ:": "PART OF SPEECH:",
  "Все": "All",
  "Существительное": "Noun",
  "СУЩЕСТВИТЕЛЬНОЕ": "NOUN",
  "Предлог": "Preposition",
  "ПРЕДЛОГ": "PREPOSITION",
  "Прилагательное": "Adjective",
  "ПРИЛАГАТЕЛЬНОЕ": "ADJECTIVE",
  "Глагол": "Verb",
  "VERB": "VERB",
  "Знак препинания": "Punctuation mark",
  "Числительное": "Numeral",
  "ЧИСЛИТЕЛЬНОЕ": "NUMERAL",
  "Имя собственное": "Proper name",
  "ИМЯ СОБСТВЕННОЕ": "PROPER NAME",
  "Союз": "Union",
  "СОЮЗ": "UNION",
  "Наречие": "Adverb",
  "НАРЕЧИЕ": "ADVERB",
  "Символ": "Symbol",
  "Частица": "Particle",
  "ЧАСТИЦА": "PARTICLE",
  "Подчинительный союз": "Subordinating conjunction",
  "ПОДЧИНИТЕЛЬНЫЙ СОЮЗ": "SUBORDINATING CONJUNCTION",
  "Местоимение": "Pronoun",
  "МЕСТОИМЕНИЕ": "PRONOUN",
  "Вспомогательный глагол": "Auxiliary verb",
  "ВСПОМОГАТЕЛЬНЫЙ ГЛАГОЛ": "AUXILIARY VERB",
  "Определитель": "Determinant",
  "Другое": "Other",
  "ДРУГОЕ": "OTHER",
  "Паддинг": "Padding",
  "Междометие": "Interjection",
  "Хельсинкский университет, 2015—2024": "UNIVERSITY OF HELSINKI, 2015—2024"
}

const parts = {
  "NOUN": "СУЩЕСТВИТЕЛЬНОЕ",
  "ADP": "ПРЕДЛОГ",
  "ADJ": "ПРИЛАГАТЕЛЬНОЕ",
  "VERB": "ГЛАГОЛ",
  "NUM": "ЧИСЛИТЕЛЬНОЕ",
  "PROPN": "ИМЯ СОБСТВЕННОЕ",
  "CCONJ": "СОЮЗ",
  "ADV": "НАРЕЧИЕ",
  "PART": "ЧАСТИЦА",
  "SCONJ": "ПОДЧИНИТЕЛЬНЫЙ СОЮЗ",
  "PRON": "МЕСТОИМЕНИЕ",
  "AUX": "ВСПОМОГАТЕЛЬНЫЙ ГЛАГОЛ",
  "OTHER": "ДРУГОЕ"
}

const partsTranslated = {
  "NOUN": "NOUN",
  "ADP": "PREPOSITION",
  "ADJ": "ADJECTIVE",
  "VERB": "VERB",
  "NUM": "NUMERAL",
  "PROPN": "PROPER NAME",
  "CCONJ": "UNION",
  "ADV": "ADVERB",
  "PART": "PARTICLE",
  "SCONJ": "SUBORDINATING CONJUNCTION",
  "PRON": "PRONOUN",
  "AUX": "AUXILIARY VERB",
  "OTHER": "OTHER"
}

const reverseDictionary = Object.fromEntries(
            Object.entries(translateDictionary).map(([k, v]) => [v, k])
);

export { translateDictionary, reverseDictionary, parts, partsTranslated};