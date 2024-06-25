const GenderFeature = {
    name:   'gender',
    title:  'Род',
    values: [{value: 'masc', title: 'Мужской'}, {value: 'fem', title: 'Женский'}, {value: 'neut', title: 'Средний'}]
};

const NumberFeature = {
    name:   'number',
    title:  'Число',
    values: [{value: 'sing', title: 'Единственное'}, {value: 'plur', title: 'Множественное'}]
};

const AnimacyFeature = {
    name: 'animacy',
    title: 'Одушевленность',
    values: [{value: 'anim', title: 'Одушевленное'}, {value: 'inan', title: 'Неодушевленное'}]
};

const CaseFeature = {
    name:   'caseValue',
    title:  'Падеж',
    values: [
        {value: 'nom', title: 'Именительный'}, {value: 'gen', title: 'Родительный'}, {value: 'dat', title: 'Дательный'},
        {value: 'acc', title: 'Винительный'}, {value: 'ins', title: 'Творительный'}, {value: 'loc', title: 'Предложный'},
        {value: 'par', title: 'Разделительный'}, {value: 'voc', title: 'Звательный'}
    ]
};

const nounCaseFeature = {
    name:   'caseValue',
    title:  'Падеж',
    values: [
        {value: 'nom', title: 'Именительный'}, {value: 'gen', title: 'Родительный'}, {value: 'dat', title: 'Дательный'},
        {value: 'acc', title: 'Винительный'}, {value: 'ins', title: 'Творительный'}, {value: 'loc', title: 'Предложный'},
        {value: 'par', title: 'Разделительный'}
    ]
};


const verbCaseFeature = {
    name:   'caseValue',
    title:  'Падеж',
    values: [
        {value: 'nom', title: 'Именительный'}, {value: 'gen', title: 'Родительный'}, {value: 'dat', title: 'Дательный'},
        {value: 'acc', title: 'Винительный'}, {value: 'ins', title: 'Творительный'}, {value: 'loc', title: 'Предложный'}
    ]
};

const adjCaseFeature = {
    name:   'caseValue',
    title:  'Падеж',
    values: [
        {value: 'nom', title: 'Именительный'}, {value: 'gen', title: 'Родительный'}, {value: 'dat', title: 'Дательный'},
        {value: 'acc', title: 'Винительный'}, {value: 'ins', title: 'Творительный'}, {value: 'loc', title: 'Предложный'}
    ]
};

const pronCaseFeature = {
    name:   'caseValue',
    title:  'Падеж',
    values: [
        {value: 'nom', title: 'Именительный'}, {value: 'gen', title: 'Родительный'}, {value: 'dat', title: 'Дательный'},
        {value: 'acc', title: 'Винительный'}, {value: 'ins', title: 'Творительный'}, {value: 'loc', title: 'Предложный'}
    ]
};

const adpCaseFeature = {
    name:   'caseValue',
    title:  'Падеж',
    values: [
        {value: 'nom', title: 'Именительный'}, {value: 'gen', title: 'Родительный'}, {value: 'dat', title: 'Дательный'},
        {value: 'acc', title: 'Винительный'}, {value: 'ins', title: 'Творительный'}, {value: 'loc', title: 'Предложный'}
    ]
};

const numCaseFeature = {
    name:   'caseValue',
    title:  'Падеж',
    values: [
        {value: 'nom', title: 'Именительный'}, {value: 'gen', title: 'Родительный'}, {value: 'dat', title: 'Дательный'},
        {value: 'acc', title: 'Винительный'}, {value: 'ins', title: 'Творительный'}, {value: 'loc', title: 'Предложный'}
    ]
};

const propnCaseFeature = {
    name:   'caseValue',
    title:  'Падеж',
    values: [
        {value: 'nom', title: 'Именительный'}, {value: 'gen', title: 'Родительный'}, {value: 'dat', title: 'Дательный'},
        {value: 'acc', title: 'Винительный'}, {value: 'ins', title: 'Творительный'}, {value: 'loc', title: 'Предложный'},
        {value: 'voc', title: 'Звательный'}
    ]
};

const VerbFormFeature = {
    name: 'verbform',
    title: 'Форма глагола',
    values: [{value: 'v_conv', title: 'Деепричастная'}, {value: 'v_fin', title: 'Конечная'}, {value: 'v_inf', title: 'Инфинитивная'},
    {value: 'v_part', title: 'Причастная'}]
};

const auxVerbFormFeature = {
    name: 'verbform',
    title: 'Форма глагола',
    values: [{value: 'v_conv', title: 'Деепричастная'}, {value: 'v_fin', title: 'Конечная'}, {value: 'v_inf', title: 'Инфинитивная'}]
};

const MoodFeature = {
    name: 'mood',
    title: 'Наклонение',
    values: [{value: 'm_ind', title: 'Изъявительное'}, {value: 'm_cnd', title: 'Условное'}, {value: 'm_imp', title: 'Повелительное'}]
};

const verbMoodFeature = {
    name: 'mood',
    title: 'Наклонение',
    values: [{value: 'm_ind', title: 'Изъявительное'}, {value: 'm_imp', title: 'Повелительное'}]
};

const partMoodFeature = {
    name: 'mood',
    title: 'Наклонение',
    values: [{value: 'm_cnd', title: 'Условное'}]
};

const sconjMoodFeature = {
    name: 'mood',
    title: 'Наклонение',
    values: [{value: 'm_cnd', title: 'Условное'}]
};

const auxMoodFeature = {
    name: 'mood',
    title: 'Наклонение',
    values: [{value: 'm_ind', title: 'Изъявительное'}, {value: 'm_imp', title: 'Повелительное'}]
};

const TenseFeature = {
    name:   'tense',
    title:  'Время',
    values: [{value: 'pres', title: 'Настоящее'}, {value: 'past', title: 'Прошедшее'}, {value: 'fut', title: 'Будущее'}]
};

const auxTenseFeature = {
    name:   'tense',
    title:  'Время',
    values: [{value: 'pres', title: 'Настоящее'}, {value: 'past', title: 'Прошедшее'}]
};

const AspectFeature = {
    name:   'aspect',
    title:  'Вид',
    values: [{value: 'a_perf', title: 'Совершенный'}, {value: 'a_imp', title: 'Несовершенный'}]
};

const VoiceFeature = {
    name: 'voice',
    title: 'Залог',
    values: [{value: 'act', title: 'Действительный(Актив)'}, {value: 'pass', title: 'Страдательный(Пассив)'}, {value: 'mid', title: 'Возвратный(Рефлексив)'}]
};

const PersonFeature = {
    name: 'person',
    title: 'Лицо',
    values: [{value: '1', title: 'Первое'}, {value: '2', title: 'Второе'}, {value: '3', title: 'Третье'}]
};

const DegreeFeature = {
    name: 'degree',
    title: 'Степень',
    values: [{value: 'd_pos', title: 'Положительная'}, {value: 'd_cmp', title: 'Сравнительная'}, {value: 'd_sup', title: 'Превосходная'}]
};

const PolarityFeature = {
    name: 'polarity',
    title: 'Полярность',
    values: [{value: 'p_pos', title: 'Положительная'}, {value: 'p_neg', title: 'Отрицательная'}]
};

const advPolarityFeature = {
    name: 'polarity',
    title: 'Полярность',
    values: [{value: 'p_neg', title: 'Отрицательная'}]
};

const partPolarityFeature = {
    name: 'polarity',
    title: 'Полярность',
    values: [{value: 'p_neg', title: 'Отрицательная'}]
};

// Feature to part relation
const nounFeatures = [
    GenderFeature,
    NumberFeature,
    AnimacyFeature,
    nounCaseFeature
];

const verbFeatures = [
    GenderFeature,
    AnimacyFeature,
    NumberFeature,
    verbCaseFeature,
    VerbFormFeature,
    verbMoodFeature,
    TenseFeature,
    AspectFeature,
    VoiceFeature,
    PersonFeature,
];

const adjFeatures = [
    GenderFeature,
    NumberFeature,
    adjCaseFeature,
    DegreeFeature,
];

const advFeatures = [
    DegreeFeature,
    advPolarityFeature,
];

const partFeatures = [
    MoodFeature,
    partPolarityFeature
];

const pronFeatures = [
    GenderFeature,
    AnimacyFeature,
    NumberFeature,
    pronCaseFeature,
    PersonFeature
];

const adpFeatures = [
    GenderFeature,
    AnimacyFeature,
    adpCaseFeature,
];

const numFeatures = [
    GenderFeature,
    AnimacyFeature,
    numCaseFeature,
];

const propnFeatures = [
    GenderFeature,
    AnimacyFeature,
    NumberFeature,
    propnCaseFeature,

];

const sconjFeatures = [
    sconjMoodFeature,
];

const auxFeatures = [
    GenderFeature,
    NumberFeature,
    auxVerbFormFeature,
    auxMoodFeature,
    auxTenseFeature,
    PersonFeature
];

const features = {
    noun: nounFeatures,
    verb: verbFeatures,
    adj:  adjFeatures,
    adv: advFeatures,
    part: partFeatures,
    pron: pronFeatures,
    adp: adpFeatures,
    num: numFeatures,
    propn: propnFeatures,
    sconj: sconjFeatures,
    aux: auxFeatures,
};

const allFeatures = [
    ...features.noun,
    ...features.verb,
    ...features.adj,
    ...features.adv,
    ...features.pron,
    ...features.adp,
    ...features.num,
    ...features.propn,
    ...features.sconj,
    ...features.aux,
];

export { allFeatures, features};