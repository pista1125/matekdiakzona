import { GradeLevel } from '../types/education';

export type ActivityType =
    | 'quiz'
    | 'fractions'
    | 'algebra'
    | 'geometry'
    | 'percentages'
    | 'coloring'
    | 'divisibility'
    | 'materials'
    | 'long-division'
    | 'angle-matching'
    | 'shape-classification'
    | 'line-relationships'
    | 'divisibility-powers'
    | 'grade1-basic'
    | 'grade2-basic'
    | 'word-problems'
    | 'triangle-classification'
    | 'quadrilateral-classification';

export interface MathModule {
    id: string;
    title: string;
    description: string;
    grades: (GradeLevel | number)[]; // Supporting both number and string types for flexibility
    category: 'Algebra' | 'Geometria' | 'Számelmélet' | 'Alapműveletek' | 'Egyéb' | 'Tananyag';
    tags: string[];
    activityType: ActivityType; // Mapping to existing MathPage logic
    icon: string;
    color: string;
}

export const mathModules: MathModule[] = [
    {
        id: 'grade1-basic',
        title: 'Alapműveletek (1. osztály)',
        description: 'Összeadás és kivonás gyakorlása játékos formában.',
        grades: [1],
        category: 'Alapműveletek',
        tags: ['összeadás', 'kivonás', 'számolás', '1. osztály'],
        activityType: 'grade1-basic',
        icon: '🔢',
        color: 'from-blue-500 to-blue-600',
    },
    {
        id: 'grade1-snake',
        title: 'Matek Kígyó (1. osztály)',
        description: 'Irányítsd a kígyót és edd meg a helyes válaszokat!',
        grades: [1],
        category: 'Alapműveletek',
        tags: ['kígyó', 'játék', 'összeadás', '1. osztály'],
        activityType: 'grade1-basic', // We'll handle routing based on ID in MathPage
        icon: '🐍',
        color: 'from-emerald-500 to-emerald-600',
    },
    {
        id: 'grade1-addition',
        title: 'Számoljunk 10-ig!',
        description: 'Segíts az állatkáknak összeszámolni a jutalomfalatokat!',
        grades: [1],
        category: 'Alapműveletek',
        tags: ['állatok', 'számolás', '1. osztály'],
        activityType: 'grade1-basic',
        icon: '⭐',
        color: 'from-amber-400 to-orange-500',
    },
    {
        id: 'grade2-basic',
        title: 'Alapműveletek (2. osztály)',
        description: 'Szorzótábla és osztás alapjai.',
        grades: [2],
        category: 'Alapműveletek',
        tags: ['szorzás', 'osztás', 'szorzótábla', '2. osztály'],
        activityType: 'grade2-basic',
        icon: '✖️',
        color: 'from-blue-600 to-indigo-600',
    },
    {
        id: 'grade2-snake',
        title: 'Matek Kígyó (2. osztály)',
        description: 'Szorzótábla gyakorlása a kígyóval.',
        grades: [2],
        category: 'Alapműveletek',
        tags: ['kígyó', 'játék', 'szorzás', '2. osztály'],
        activityType: 'grade2-basic',
        icon: '🐍',
        color: 'from-rose-500 to-red-600',
    },
    {
        id: 'grade2-coloring',
        title: 'Szorzó-Színező',
        description: 'Számold ki a szorzatot és színezz ki 5 izgalmas új képet!',
        grades: [2],
        category: 'Alapműveletek',
        tags: ['színező', 'szorzás', 'kreatív', '2. osztály'],
        activityType: 'grade2-basic',
        icon: '🎨',
        color: 'from-indigo-400 to-purple-500',
    },
    {
        id: 'grade2-blocks',
        title: 'Toronyépítő',
        description: 'Építs tornyokat és hasonlítsd össze őket! Melyik a több?',
        grades: [2],
        category: 'Alapműveletek',
        tags: ['építés', 'logika', 'összehasonlítás', '2. osztály'],
        activityType: 'grade2-basic',
        icon: '🏗️',
        color: 'from-blue-400 to-cyan-500',
    },
    {
        id: 'fractions',
        title: 'Törtek',
        description: 'Törtek vizuális megjelenítése és műveletek.',
        grades: [5, 6],
        category: 'Számelmélet',
        tags: ['törtek', 'rész-egész', 'számláló', 'nevező'],
        activityType: 'fractions',
        icon: '🍕',
        color: 'from-orange-500 to-amber-600',
    },
    {
        id: 'long-division',
        title: 'Írásbeli osztás',
        description: 'Lépcsős osztás gyakorlása lépésről lépésre.',
        grades: [4, 5, 6],
        category: 'Alapműveletek',
        tags: ['osztás', 'írásbeli', 'maradékos'],
        activityType: 'long-division',
        icon: '➗',
        color: 'from-indigo-100 to-indigo-600', // Note: Using gradient colors suitable for bg-gradient-to-br
    },
    {
        id: 'divisibility',
        title: 'Oszthatóság',
        description: 'Oszthatósági szabályok és maradékos osztás.',
        grades: [5, 6],
        category: 'Számelmélet',
        tags: ['oszthatóság', 'prímszám', 'összetett szám'],
        activityType: 'divisibility',
        icon: '🔢',
        color: 'from-emerald-100 to-emerald-600',
    },
    {
        id: 'divisibility-powers',
        title: 'Hatványozás és oszthatóság',
        description: 'Hatványozás szabályai és prímtényezős felbontás.',
        grades: [6, 7],
        category: 'Számelmélet',
        tags: ['hatvány', 'kitevő', 'prímtényező', 'lnko', 'lkkt'],
        activityType: 'divisibility-powers',
        icon: '⚡',
        color: 'from-amber-400 to-orange-500',
    },
    {
        id: 'algebra',
        title: 'Algebra és egyenletek',
        description: 'Egyenletrendezés, behelyettesítés és ismeretlenek.',
        grades: [7, 8, 'high-1', 'high-2'],
        category: 'Algebra',
        tags: ['egyenlet', 'ismeretlen', 'x', 'y', 'kifejezés'],
        activityType: 'algebra',
        icon: '🔤',
        color: 'from-purple-500 to-purple-600',
    },
    {
        id: 'word-problems',
        title: 'Szöveges feladatok',
        description: 'Gyakorlati problémák matematikai megoldása.',
        grades: [3, 4, 5, 6, 7, 8],
        category: 'Egyéb',
        tags: ['szöveges', 'logika', 'értelmezés'],
        activityType: 'word-problems',
        icon: '📝',
        color: 'from-teal-500 to-teal-600',
    },
    {
        id: 'shape-classification',
        title: 'Síkidom vagy Test?',
        description: '2D és 3D alakzatok megkülönböztetése.',
        grades: [2, 3, 4],
        category: 'Geometria',
        tags: ['síkidom', 'test', 'térgeometria'],
        activityType: 'shape-classification',
        icon: '📦',
        color: 'from-emerald-500 to-emerald-600',
    },
    {
        id: 'angle-matching',
        title: 'Szögek párosítása',
        description: 'Nevezetes szögek és fajtáik felismerése.',
        grades: [5, 6],
        category: 'Geometria',
        tags: ['szög', 'hegyesszög', 'tompaszög', 'derékszög'],
        activityType: 'angle-matching',
        icon: '📐',
        color: 'from-blue-500 to-blue-600',
    },
    {
        id: 'triangle-classification',
        title: 'Háromszögek',
        description: 'Háromszögek csoportosítása oldalak és szögek szerint.',
        grades: [5, 6, 7],
        category: 'Geometria',
        tags: ['háromszög', 'egyenlő szárú', 'szabályos'],
        activityType: 'triangle-classification',
        icon: '🔺',
        color: 'from-amber-500 to-amber-600',
    },
    {
        id: 'quadrilateral-classification',
        title: 'Négyszögek',
        description: 'Négyszögek fajtái és tulajdonságaik.',
        grades: [6, 7, 8],
        category: 'Geometria',
        tags: ['négyszög', 'négyzet', 'téglalap', 'trapéz', 'deltoid'],
        activityType: 'quadrilateral-classification',
        icon: '⬜',
        color: 'from-violet-500 to-violet-600',
    },
    {
        id: 'line-relationships',
        title: 'Egyenesek helyzete',
        description: 'Párhuzamos, merőleges és kitérő egyenesek.',
        grades: [5, 6],
        category: 'Geometria',
        tags: ['egyenes', 'párhuzamos', 'merőleges'],
        activityType: 'line-relationships',
        icon: '📏',
        color: 'from-indigo-500 to-indigo-600',
    },
    {
        id: 'materials',
        title: 'Tananyagok és Könyvek',
        description: 'Tankönyvek és segédanyagok letöltése.',
        grades: [5, 6, 7, 8],
        category: 'Tananyag',
        tags: ['könyv', 'füzet', 'pdf', 'letöltés'],
        activityType: 'materials',
        icon: '📚',
        color: 'from-indigo-500 to-purple-600',
    },
    {
        id: 'percentages',
        title: 'Százalékszámítás',
        description: 'Arányok és százalékok számítása.',
        grades: [6, 7, 8],
        category: 'Számelmélet',
        tags: ['százalék', 'alap', 'láb', 'érték'],
        activityType: 'percentages',
        icon: '📊',
        color: 'from-pink-500 to-rose-500',
    },
    {
        id: 'quiz',
        title: 'Vegyes Kvíz',
        description: 'Teszteld tudásod különböző témakörökben!',
        grades: [1, 2, 3, 4, 5, 6, 7, 8, 'high-1', 'high-2', 'high-3', 'high-4', 'graduation'],
        category: 'Egyéb',
        tags: ['kvíz', 'teszt', 'vegyes'],
        activityType: 'quiz',
        icon: '❓',
        color: 'from-gray-500 to-slate-600',
    }
];
