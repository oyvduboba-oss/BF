import React, { useState, useMemo, useEffect } from 'react';
import {
  BookOpen,
  Sparkles,
  Puzzle,
  SlidersHorizontal,
  Search,
  ShoppingCart,
  Check,
  X,
  ChevronRight,
  Eye,
  Download,
  Truck,
  Heart,
  Filter,
  ArrowRight,
  Clock,
  FileText,
  CheckCircle2,
  HelpCircle,
  Layers,
  GraduationCap,
  Volume2,
  Calendar,
  Smile,
  ShieldCheck,
  Star,
  ExternalLink,
  RotateCcw,
  Plus,
  Minus,
  Mail,
  User,
  Phone,
  MapPin,
  FileDown
} from 'lucide-react';

// --- INITIAL MOCK DATA ---
const PRODUCTS = [
  // === ШКОЛЬНЫЕ УРОКИ (1-4 классы) ===
  {
    id: 'lesson-1',
    mode: 'lessons',
    title: 'Окружающий мир 4 класс: Природные зоны России',
    subtitle: 'Интерактивная презентация + 3 двусторонних рабочих листа с проверочным тестом',
    category: 'Окружающий мир',
    grade: '4 класс',
    format: 'Презентация PPTX + PDF',
    deliveryType: 'digital',
    price: 390,
    oldPrice: 550,
    rating: 4.9,
    reviewsCount: 38,
    badge: 'Хит ФГОС',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    tags: ['4 класс', 'Окружающий мир', 'PPTX + PDF', 'ФГОС 3.0'],
    pages: '38 слайдов + 6 стр PDF',
    includes: [
      'Анимированная презентация PowerPoint (.pptx) с возможностью редактирования',
      'Рабочий лист для закрепления темы (черно-белый и цветной варианты)',
      'Мини-тест для быстрой проверки знаний за 7 минут',
      'Методические рекомендации и готовые ответы для учителя'
    ],
    coverGradient: 'from-amber-100 via-emerald-50 to-teal-100',
    icon: '🌍',
    description: 'Комплексный урок, разбитый по природным зонам (тундра, тайга, смешанные леса, степи, пустыни). Яркие реалистичные иллюстрации, интерактивные викторины внутри презентации и готовая раздатка для учеников.'
  },
  {
    id: 'lesson-2',
    mode: 'lessons',
    title: 'Математика 2 класс: Таблица умножения на 2 и 3 в королевстве Чисел',
    subtitle: 'Сюжетный интерактивный квест-урок с соревновательной механикой',
    category: 'Математика',
    grade: '2 класс',
    format: 'Интерактивный квест',
    deliveryType: 'digital',
    price: 350,
    oldPrice: 480,
    rating: 5.0,
    reviewsCount: 52,
    badge: 'Квест-игра',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    tags: ['2 класс', 'Математика', 'Квест', 'Интерактив'],
    pages: '42 слайда + карточки',
    includes: [
      'Интерактивная презентация с ветвящимся сюжетом и звуковыми эффектами',
      'Маршрутные листы учеников для командной или индивидуальной работы',
      'Сертификаты знатоков таблицы умножения для печати',
      'Инструкция по проведению урока за 40 минут'
    ],
    coverGradient: 'from-blue-100 via-indigo-50 to-sky-100',
    icon: '🏰',
    description: 'Превратите скучное заучивание таблицы умножения в захватывающее спасение числового королевства. Ученики решают примеры, чтобы открывать двери замков и побеждать числовых драконов.'
  },
  {
    id: 'lesson-3',
    mode: 'lessons',
    title: 'Русский язык 3 класс: Правописание безударных гласных в корне слова',
    subtitle: 'Комплект пятиминуток и станция орфографической зоркости',
    category: 'Русский язык',
    grade: '3 класс',
    format: 'Рабочий лист',
    deliveryType: 'digital',
    price: 290,
    oldPrice: 420,
    rating: 4.8,
    reviewsCount: 29,
    badge: 'Тренажер',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    tags: ['3 класс', 'Русский язык', 'Рабочие листы', 'Печать'],
    pages: '16 листов А4',
    includes: [
      '12 карточек-пятиминуток с дифференцированными заданиями',
      'Опорные наглядные схемы-памятки для доски и тетрадей',
      'Дидактический материал для словарной работы',
      'Ключи для самопроверки учениками'
    ],
    coverGradient: 'from-violet-100 via-pink-50 to-rose-100',
    icon: '✍️',
    description: 'Материал решает главную боль учителя 3 класса — частые ошибки в безударных гласных. Авторская методика ступенчатого подбора проверочных слов с наглядными алгоритмами.'
  },
  {
    id: 'lesson-4',
    mode: 'lessons',
    title: 'Разговоры о важном: «Традиции моей семьи — опора страны»',
    subtitle: 'Оформление классного кабинета, презентация и рабочие листы для беседы',
    category: 'Внеурочка',
    grade: '1-4 классы',
    format: 'Презентация PPTX + PDF',
    deliveryType: 'digital',
    price: 320,
    oldPrice: 450,
    rating: 4.9,
    reviewsCount: 44,
    badge: 'Комплект недели',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    tags: ['1-4 классы', 'Внеурочка', 'Оформление доски', 'Семья'],
    pages: '28 слайдов + 8 стр декора',
    includes: [
      'Готовая презентация с видео-паузами и вопросами для дискуссии',
      'Флажки-растяжка и тематические плакаты для оформления школьной доски',
      'Бланки генеалогического древа для домашнего творчества с родителями',
      'Сценарий проведения классного часа'
    ],
    coverGradient: 'from-amber-100 via-orange-50 to-yellow-100',
    icon: '🏡',
    description: 'Готовый эстетичный комплект для проведения внеурочного занятия. Никаких аляповатых картинок — стильная, теплая авторская иллюстрация в стилистике ТЕЗАИКИ.'
  },
  {
    id: 'lesson-5',
    mode: 'lessons',
    title: 'Литературное чтение 1–2 класс: Сказки народов России и читательский дневник',
    subtitle: 'Интерактивная игра-викторина + шаблоны для первого осмысленного анализа текста',
    category: 'Литература',
    grade: '1 класс',
    format: 'Квест/Игра',
    deliveryType: 'digital',
    price: 340,
    oldPrice: 450,
    rating: 4.8,
    reviewsCount: 22,
    badge: 'Читательский дневник',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    tags: ['1 класс', '2 класс', 'Литература', 'Чтение'],
    pages: '24 стр + викторина',
    includes: [
      'Красочный читательский дневник первоклассника (верстка под брошюру)',
      'Интерактивная презентация-викторина по 5 ключевым народным сказкам',
      'Карточки с вопросами на понимание мотивов персонажей',
      'Листы самооценки читательской активности'
    ],
    coverGradient: 'from-teal-100 via-cyan-50 to-sky-100',
    icon: '📖',
    description: 'Прививает интерес к чтению через игру и творческие заметки. Удобно использовать на уроках внеклассного чтения или в период каникул.'
  },
  {
    id: 'lesson-6',
    mode: 'lessons',
    title: 'Математика 1 класс: Состав чисел первого десятка без зубрежки',
    subtitle: 'Наглядные числовые домики, карточки-гармошки и карточки для доски',
    category: 'Математика',
    grade: '1 класс',
    format: 'Рабочий лист',
    deliveryType: 'digital',
    price: 280,
    oldPrice: 390,
    rating: 4.9,
    reviewsCount: 65,
    badge: 'Базовый навык',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    tags: ['1 класс', 'Математика', 'Состав числа', 'Печать'],
    pages: '20 листов А4',
    includes: [
      'Комплект наглядных числовых домиков от 2 до 10 для доски',
      'Индивидуальные карточки-гармошки для каждого ученика',
      'Математические раскраски с самопроверкой',
      'Методичка с 6 быстрыми играми на устный счет'
    ],
    coverGradient: 'from-indigo-100 via-sky-50 to-blue-100',
    icon: '🔢',
    description: 'Надежный визуальный фундамент для понимания состава числа в 1 классе. Ученики трогают, раскладывают и видят закономерности вместо механического заучивания.'
  },

  // === РЕЧЬ, PECS И СЕНСОРИКА ===
  {
    id: 'speech-1',
    mode: 'speech',
    title: 'Альбом автоматизации звука [Р]: 45 игровых дорожек и пятиминуток',
    subtitle: 'Логопедический сборник упражнений: от изолированного звука до скороговорок',
    category: 'Логопедия и речь',
    age: '5–6 лет',
    soundFocus: 'Звуки [Р]/[Л]',
    format: 'Электронный PDF',
    deliveryType: 'digital',
    price: 420,
    oldPrice: 590,
    rating: 5.0,
    reviewsCount: 87,
    badge: 'Топ логопедов',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    tags: ['Звук [Р]', '5-6 лет', 'Автоматизация', 'PDF А4'],
    pages: '48 страниц А4',
    includes: [
      'Изолированные звуковые дорожки-бродилки («Заведи моторчик»)',
      'Слоговые лабиринты и ритмические ряды для переключения',
      'Лото на автоматизацию звука [Р] в начале, середине и конце слова',
      'Чистоговорки с опорой на авторские пиктограммы'
    ],
    coverGradient: 'from-emerald-100 via-teal-50 to-green-100',
    icon: '🦁',
    description: 'Продуманная до мелочей логопедическая тетрадь. Четкая градация сложности, отсутствие визуального шума, лаконичные векторные иллюстрации, облегчающие концентрацию ребенка.'
  },
  {
    id: 'speech-2',
    mode: 'speech',
    title: 'Визуальное расписание «Сначала — Потом» + 72 базовые карточки PECS',
    subtitle: 'Планшет структурирования дня для дома, детского сада и школы',
    category: 'PECS и расписания',
    age: '3–4 года',
    soundFocus: 'Расписание/Рутина',
    format: 'Готовое изделие на липучках',
    deliveryType: 'physical',
    hasPhysicalOption: true,
    price: 1450,
    pdfPrice: 490,
    oldPrice: 1950,
    rating: 4.9,
    reviewsCount: 63,
    badge: 'Сенсорный хит',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    tags: ['PECS', 'Расписание', 'Липучки', 'РАС / СДВГ', 'Готовое'],
    pages: 'Планшет + 72 карточки',
    assemblyDifficulty: 'Готово к использованию (ламинация 150 мкм)',
    includes: [
      'Плотный пластиковый планшет «Сначала — Потом — Награда» с лентой велкро',
      '72 карточки 4.5×4.5 см (режим дня, гигиена, еда, занятия, отдых, поощрения)',
      'Скругленные безопасные углы, матовая ламинация без бликов',
      'Методическое руководство по вводу визуальной поддержки от ABA-куратора'
    ],
    coverGradient: 'from-slate-100 via-indigo-50 to-sky-100',
    icon: '📋',
    description: 'Незаменимый инструмент для снижения тревожности и профилактики нежелательного поведения у детей с РАС, ЗПР и нормотипичных дошкольников. Спокойная палитра ТЕЗАИКА не перегружает нервную систему.'
  },
  {
    id: 'speech-3',
    mode: 'speech',
    title: 'Тактильный альбом на липучках: «Времена года, погода и одежда»',
    subtitle: 'Развивающий альбом с липучками для малышей: одеваем героев по сезону',
    category: 'Игры на липучках',
    age: '1.5–3 года',
    soundFocus: 'Запуск речи',
    format: 'Готовое пособие на липучках',
    deliveryType: 'physical',
    hasPhysicalOption: true,
    price: 1890,
    pdfPrice: 550,
    oldPrice: 2400,
    rating: 5.0,
    reviewsCount: 94,
    badge: 'Ручная сборка',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    tags: ['Игры на липучках', '1.5-3 года', 'Сенсорика', 'Одежда'],
    pages: '10 страниц + 48 деталей',
    assemblyDifficulty: 'Толстая ламинация 175 мкм, прочные липучки d=15мм',
    includes: [
      '10 страниц формата А5 на разъемных металлических кольцах',
      '48 съемных элементов на самоклеящихся велкро-кругах',
      'Мальчик и девочка для подбора одежды по погоде',
      'Сортеры сезонных признаков (листья, снежинки, плоды)'
    ],
    coverGradient: 'from-amber-100 via-rose-50 to-orange-100',
    icon: '🧣',
    description: 'Учит ориентироваться в сезонных изменениях, развивает щипковый захват, расширяет глагольный и предметный словарь. Не боится слюны, воды и сминания.'
  },
  {
    id: 'speech-4',
    mode: 'speech',
    title: 'Логопедический тренажер: Шипящие звуки [Ш], [Ж], [Щ] без запинки',
    subtitle: 'Комплект артикуляционной гимнастики и игр на дифференциацию',
    category: 'Логопедия и речь',
    age: '5–6 лет',
    soundFocus: 'Шипящие (Ш, Ж, Щ)',
    format: 'Электронный PDF',
    deliveryType: 'digital',
    price: 380,
    oldPrice: 500,
    rating: 4.8,
    reviewsCount: 31,
    badge: 'Дифференциация',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    tags: ['Шипящие', 'Звук Ш', 'Звук Ж', 'PDF', 'Логопедия'],
    pages: '36 страниц А4',
    includes: [
      'Карточки артикуляционной разминки («Чашечка», «Вкусное варенье» и др.)',
      'Игры на противопоставление оппозиционных звуков (С — Ш, З — Ж)',
      'Нейродинамические дорожки с хлопками и шагами',
      'Стихотворные чистоговорки с картинками-подсказками'
    ],
    coverGradient: 'from-teal-100 via-emerald-50 to-cyan-100',
    icon: '🐍',
    description: 'Пошаговый путеводитель от правильной артикуляционной позы до автоматизма в связной речи. Помогает избежать смешения свистящих и шипящих звуков.'
  },
  {
    id: 'speech-5',
    mode: 'speech',
    title: 'Коммуникативная книга PECS: 120 карточек + лента предложений',
    subtitle: 'Комплексный инструмент альтернативной коммуникации (I–IV этапы PECS)',
    category: 'PECS и расписания',
    age: '3–4 года',
    soundFocus: 'Коммуникация и эмоции',
    format: 'Готовое изделие на липучках',
    deliveryType: 'physical',
    hasPhysicalOption: true,
    price: 2650,
    pdfPrice: 790,
    oldPrice: 3400,
    rating: 5.0,
    reviewsCount: 41,
    badge: 'Профессиональное',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    tags: ['PECS I-IV', 'Альтернативная речь', 'РАС', 'Готовое'],
    pages: 'Книга 4 разворота + 120 карточек',
    assemblyDifficulty: 'Плотный износостойкий пластик, усиленные липучки',
    includes: [
      'Папка из безопасного гибкого полипропилена с цветными разделителями',
      'Съемная лента предложений («Я ХОЧУ...»)',
      '120 карточек (еда, действия, игрушки, люди, чувства, помощь)',
      'Ремешок для ношения на плече ребенком'
    ],
    coverGradient: 'from-purple-100 via-indigo-50 to-blue-100',
    icon: '🗣️',
    description: 'Эталонное пособие для детей с безречьем и трудностями вербальной коммуникации. Четкие, реалистичные пиктограммы соответствуют международному протоколу PECS.'
  },
  {
    id: 'speech-6',
    mode: 'speech',
    title: 'Игры на липучках для малышей: «Кто что ест и чей малыш?» (1.5–3 года)',
    subtitle: 'Базовый сенсорный тренажер окружающего мира и первых звукоподражаний',
    category: 'Игры на липучках',
    age: '1.5–3 года',
    soundFocus: 'Запуск речи',
    format: 'Готовое пособие на липучках',
    deliveryType: 'physical',
    hasPhysicalOption: true,
    price: 1290,
    pdfPrice: 390,
    oldPrice: 1700,
    rating: 4.9,
    reviewsCount: 76,
    badge: 'Первые слова',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    tags: ['Липучки', '1.5-3 года', 'Животные', 'Запуск речи'],
    pages: '6 плотных планшетов',
    assemblyDifficulty: 'Крупные детали d=5-7 см для безопасности',
    includes: [
      '6 ламинированных двусторонних планшетов с фермой и лесом',
      '24 объемные съемные детали на липучках',
      'Гид по звукоподражаниям для мамы («Му-му», «Гав-гав», «Хрум-хрум»)',
      'Хлопковый мешочек для хранения съемных элементов'
    ],
    coverGradient: 'from-rose-100 via-amber-50 to-yellow-100',
    icon: '🐣',
    description: 'Идеальная первая развивающая игра на липучках. Способствует раннему запуску фразовой речи, стимулирует мелкую моторику и обогащает пассивный словарь малыша.'
  }
];

export default function App() {
  // --- APPLICATION STATE ---
  const [activeMode, setActiveMode] = useState('lessons'); // 'lessons' | 'speech'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSort, setSelectedSort] = useState('popular'); // 'popular' | 'price-asc' | 'price-desc'

  // Lessons filters
  const [selectedGrade, setSelectedGrade] = useState('Все');
  const [selectedSubject, setSelectedSubject] = useState('Все');
  const [selectedFormat, setSelectedFormat] = useState('Все');

  // Speech & Sensory filters
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [selectedAge, setSelectedAge] = useState('Все');
  const [selectedFocus, setSelectedFocus] = useState('Все');
  const [selectedDelivery, setSelectedDelivery] = useState('Все'); // 'Все' | 'digital' | 'physical'

  // Cart & Drawer State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');

  // Modals
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('form'); // 'form' | 'success'
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'sbp'
  });

  // Toast notification
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // --- FILTER LOGIC ---
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Must match active mode
      if (product.mode !== activeMode) return false;

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const inTitle = product.title.toLowerCase().includes(query);
        const inSub = product.subtitle.toLowerCase().includes(query);
        const inTags = product.tags.some((t) => t.toLowerCase().includes(query));
        if (!inTitle && !inSub && !inTags) return false;
      }

      // Lessons specific filters
      if (activeMode === 'lessons') {
        if (selectedGrade !== 'Все' && !product.grade.includes(selectedGrade)) {
          return false;
        }
        if (selectedSubject !== 'Все' && product.category !== selectedSubject) {
          return false;
        }
        if (selectedFormat !== 'Все' && !product.format.includes(selectedFormat)) {
          return false;
        }
      }

      // Speech & Sensory specific filters
      if (activeMode === 'speech') {
        if (selectedCategory !== 'Все' && product.category !== selectedCategory) {
          return false;
        }
        if (selectedAge !== 'Все' && product.age !== selectedAge) {
          return false;
        }
        if (selectedFocus !== 'Все' && product.soundFocus !== selectedFocus) {
          return false;
        }
        if (selectedDelivery !== 'Все' && product.deliveryType !== selectedDelivery) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (selectedSort === 'popular') return b.reviewsCount - a.reviewsCount;
      if (selectedSort === 'price-asc') return a.price - b.price;
      if (selectedSort === 'price-desc') return b.price - a.price;
      return 0;
    });
  }, [
    activeMode,
    searchQuery,
    selectedSort,
    selectedGrade,
    selectedSubject,
    selectedFormat,
    selectedCategory,
    selectedAge,
    selectedFocus,
    selectedDelivery
  ]);

  // Reset filters for current mode
  const handleResetFilters = () => {
    setSearchQuery('');
    if (activeMode === 'lessons') {
      setSelectedGrade('Все');
      setSelectedSubject('Все');
      setSelectedFormat('Все');
    } else {
      setSelectedCategory('Все');
      setSelectedAge('Все');
      setSelectedFocus('Все');
      setSelectedDelivery('Все');
    }
  };

  // --- CART OPERATIONS ---
  const addToCart = (product, chosenType = null) => {
    // If product has physical option, handle selected variant
    const type = chosenType || product.deliveryType;
    const finalPrice =
      type === 'digital' && product.pdfPrice ? product.pdfPrice : product.price;

    const cartItemId = `${product.id}-${type}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          ...product,
          cartItemId,
          deliveryTypeChosen: type,
          activePrice: finalPrice,
          quantity: 1
        }
      ];
    });

    showToast(`«${product.title.slice(0, 32)}...» добавлен в корзину`);
  };

  const updateQuantity = (cartItemId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  // Cart Totals
  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.activePrice * item.quantity, 0);
  }, [cart]);

  const discountAmount = Math.round(cartSubtotal * appliedDiscount);
  const cartTotal = Math.max(0, cartSubtotal - discountAmount);

  const hasDigitalInCart = cart.some((i) => i.deliveryTypeChosen === 'digital');
  const hasPhysicalInCart = cart.some((i) => i.deliveryTypeChosen === 'physical');
  const totalItemCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  const applyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    if (promoCode.trim().toUpperCase() === 'TEZAIKA10') {
      setAppliedDiscount(0.1);
      showToast('Скидка 10% успешно применена!');
    } else {
      setPromoError('Неверный промокод (попробуйте TEZAIKA10)');
    }
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.email) {
      alert('Пожалуйста, укажите имя и email для получения материалов');
      return;
    }
    setCheckoutStep('success');
  };

  return (
    <div className="min-h-screen bg-[#F7F4EC] text-[#17263A] flex flex-col font-sans selection:bg-[#9BAA8E]/30 selection:text-[#17263A]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#17263A] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10 animate-bounce text-sm">
          <CheckCircle2 className="w-5 h-5 text-[#9BAA8E]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Announcement Bar */}
      <div className="bg-[#17263A] text-white/90 text-xs py-2 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#9BAA8E] animate-pulse"></span>
            <span>Студия учебных материалов <strong>ТЕЗАИКА</strong> • Новые комплекты к учебной четверти</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-white/70">
            <a
              href="https://vk.ru/tezaika"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition flex items-center gap-1.5"
            >
              <span>Сообщество ВКонтакте</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-white/30">|</span>
            <span className="text-amber-300 font-medium">Промокод на первый заказ: TEZAIKA10</span>
          </div>
        </div>
      </div>

      {/* Persistent Direction Switcher Bar */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-[#E5E0D5] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Logo & Subtitle */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#17263A] flex items-center justify-center text-white font-bold text-lg shadow-sm">
                Т
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-[#17263A] block leading-none">
                  ТЕЗАИКА
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#17263A]/60 font-semibold">
                  студия учебных материалов
                </span>
              </div>
            </div>

            {/* Mobile Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="sm:hidden relative p-2.5 rounded-xl bg-[#F7F4EC] text-[#17263A] border border-[#E5E0D5]"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#9BAA8E] text-[#17263A] font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {totalItemCount}
                </span>
              )}
            </button>
          </div>

          {/* Core Segmented Mode Switcher */}
          <div className="bg-[#EBE7DD] p-1 rounded-2xl flex items-center w-full sm:w-auto max-w-lg shadow-inner">
            <button
              onClick={() => {
                setActiveMode('lessons');
                handleResetFilters();
              }}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 py-2 px-5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeMode === 'lessons'
                  ? 'bg-[#17263A] text-white shadow-md'
                  : 'text-[#17263A]/70 hover:text-[#17263A]'
              }`}
            >
              <GraduationCap className={`w-4 h-4 ${activeMode === 'lessons' ? 'text-[#9BAA8E]' : ''}`} />
              <span>Школьные уроки (1–4 кл)</span>
            </button>

            <button
              onClick={() => {
                setActiveMode('speech');
                handleResetFilters();
              }}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 py-2 px-5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeMode === 'speech'
                  ? 'bg-[#17263A] text-white shadow-md'
                  : 'text-[#17263A]/70 hover:text-[#17263A]'
              }`}
            >
              <Puzzle className={`w-4 h-4 ${activeMode === 'speech' ? 'text-[#9BAA8E]' : ''}`} />
              <span>Речь, PECS и Сенсорика</span>
            </button>
          </div>

          {/* Desktop Right Controls: Cart */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#17263A] text-white hover:bg-[#1f334d] transition shadow-sm text-sm font-medium"
            >
              <ShoppingCart className="w-4 h-4 text-[#9BAA8E]" />
              <span>Корзина</span>
              {totalItemCount > 0 ? (
                <span className="bg-[#9BAA8E] text-[#17263A] font-bold text-xs px-2 py-0.5 rounded-full">
                  {totalItemCount} • {cartTotal} ₽
                </span>
              ) : (
                <span className="text-white/60 text-xs">0 ₽</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Adaptive Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-10 border-b border-[#E5E0D5]/70 bg-gradient-to-b from-[#FAF8F3] to-[#F7F4EC]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Text Proposition */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBE7DD] border border-[#E0DACB] text-xs font-semibold text-[#17263A]">
                {activeMode === 'lessons' ? (
                  <>
                    <BookOpen className="w-3.5 h-3.5 text-[#9BAA8E]" />
                    <span>ФГОС 3.0 • Редактируемые PPTX и готовые PDF</span>
                  </>
                ) : (
                  <>
                    <Puzzle className="w-3.5 h-3.5 text-[#9BAA8E]" />
                    <span>Мягкая сенсорная палитра • Международные стандарты PECS • Ламинация 150 мкм</span>
                  </>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-[#17263A]">
                {activeMode === 'lessons' ? (
                  <>
                    Готовые интерактивные уроки, экономящие <span className="underline decoration-[#9BAA8E] decoration-wavy decoration-2">часы подготовки</span> учителя
                  </>
                ) : (
                  <>
                    Методические пособия по речи, <span className="underline decoration-[#9BAA8E] decoration-wavy decoration-2">карточки PECS</span> и игры на липучках
                  </>
                )}
              </h1>

              <p className="text-base sm:text-lg text-[#17263A]/80 max-w-2xl leading-relaxed">
                {activeMode === 'lessons' ? (
                  'Выверенная методическая канва, презентации с интерактивными кнопками и рабочие листы без пестрого клипарта. Проводите современные уроки, от которых дети не отвлекаются.'
                ) : (
                  'Разработано дефектологами и логопедами. Спокойная природная палитра без визуальной перегрузки — идеальна для автоматизации звуков, нормотипичных детей, а также детей с РАС и СДВГ.'
                )}
              </p>

              {/* Highlights Checklist */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activeMode === 'lessons' ? (
                  <>
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/70 border border-[#E5E0D5]">
                      <CheckCircle2 className="w-4 h-4 text-[#9BAA8E] shrink-0" />
                      <span className="text-xs font-medium">Редактируемые .pptx</span>
                    </div>
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/70 border border-[#E5E0D5]">
                      <CheckCircle2 className="w-4 h-4 text-[#9BAA8E] shrink-0" />
                      <span className="text-xs font-medium">Печать без лишней краски</span>
                    </div>
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/70 border border-[#E5E0D5]">
                      <CheckCircle2 className="w-4 h-4 text-[#9BAA8E] shrink-0" />
                      <span className="text-xs font-medium">Мгновенная ссылка на почту</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/70 border border-[#E5E0D5]">
                      <CheckCircle2 className="w-4 h-4 text-[#9BAA8E] shrink-0" />
                      <span className="text-xs font-medium">Выбор: PDF или готовое</span>
                    </div>
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/70 border border-[#E5E0D5]">
                      <CheckCircle2 className="w-4 h-4 text-[#9BAA8E] shrink-0" />
                      <span className="text-xs font-medium">Скругленные безопасные углы</span>
                    </div>
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/70 border border-[#E5E0D5]">
                      <CheckCircle2 className="w-4 h-4 text-[#9BAA8E] shrink-0" />
                      <span className="text-xs font-medium">Сенсорно-спокойные тона</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right Column: Hero Visual Card / Quick Switcher Promo */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-[#E5E0D5] relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#9BAA8E]">
                    {activeMode === 'lessons' ? 'Для учителей и репетиторов' : 'Для логопедов и родителей'}
                  </span>
                  <span className="bg-[#17263A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Гарантия ТЕЗАИКА
                  </span>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-lg text-[#17263A]">
                    {activeMode === 'lessons'
                      ? 'Вам не нужно тратить воскресные вечера на слайды'
                      : 'Материалы, в которых ребенок не теряется в пестроте'}
                  </h4>
                  <p className="text-xs text-[#17263A]/70 leading-relaxed">
                    {activeMode === 'lessons'
                      ? 'Все презентации открываются в PowerPoint, легко адаптируются под ваш темп урока и включают ключи для быстрой проверки.'
                      : 'Каждая карточка PECS протестирована на прочность. Плотная ламинация выдерживает многократную дезинфекцию.'}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#E5E0D5] flex items-center justify-between text-xs font-medium">
                  <span className="text-[#17263A]/70">В каталоге направления:</span>
                  <span className="font-bold text-[#17263A]">
                    {activeMode === 'lessons' ? '6 авторских программ' : '6 наборов и альбомов'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area: Catalog & Filters */}
      <main className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full space-y-6">
        {/* Search & Global Filter Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5E0D5] flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-[#17263A]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                activeMode === 'lessons'
                  ? 'Поиск по теме, предмету или классу...'
                  : 'Поиск по звуку, возрасту, PECS...'
              }
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-[#F7F4EC] border border-[#E5E0D5] focus:outline-none focus:border-[#9BAA8E] transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Stats & Sorting */}
          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            <span className="text-xs text-[#17263A]/70 font-medium whitespace-nowrap">
              Найдено: <strong className="text-[#17263A]">{filteredProducts.length}</strong> пособий
            </span>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#17263A]/60 hidden sm:inline">Сортировка:</span>
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="bg-[#F7F4EC] border border-[#E5E0D5] text-xs font-medium rounded-xl px-3 py-2 text-[#17263A] focus:outline-none focus:border-[#9BAA8E]"
              >
                <option value="popular">По популярности</option>
                <option value="price-asc">Сначала дешевле</option>
                <option value="price-desc">Сначала дороже</option>
              </select>

              <button
                onClick={handleResetFilters}
                title="Сбросить все фильтры"
                className="p-2 rounded-xl bg-[#F7F4EC] text-[#17263A]/70 hover:text-[#17263A] border border-[#E5E0D5] transition"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Specialized Filter Panels per Direction */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5E0D5] space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#17263A]">
            <SlidersHorizontal className="w-4 h-4 text-[#9BAA8E]" />
            <span>Параметры отбора материалов ТЕЗАИКА</span>
          </div>

          {/* MODE 1: LESSONS FILTERS */}
          {activeMode === 'lessons' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {/* Filter 1: Класс */}
              <div>
                <label className="text-xs font-bold text-[#17263A]/70 block mb-2">Класс обучения:</label>
                <div className="flex flex-wrap gap-1.5">
                  {['Все', '1 класс', '2 класс', '3 класс', '4 класс'].map((g) => (
                    <button
                      key={g}
                      onClick={() => setSelectedGrade(g)}
                      className={`text-xs px-3 py-1.5 rounded-xl font-medium transition ${
                        selectedGrade === g
                          ? 'bg-[#17263A] text-white shadow-xs'
                          : 'bg-[#F7F4EC] text-[#17263A]/80 hover:bg-[#EBE7DD]'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter 2: Предмет */}
              <div>
                <label className="text-xs font-bold text-[#17263A]/70 block mb-2">Предметная область:</label>
                <div className="flex flex-wrap gap-1.5">
                  {['Все', 'Математика', 'Русский язык', 'Окружающий мир', 'Литература', 'Внеурочка'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSubject(s)}
                      className={`text-xs px-3 py-1.5 rounded-xl font-medium transition ${
                        selectedSubject === s
                          ? 'bg-[#17263A] text-white shadow-xs'
                          : 'bg-[#F7F4EC] text-[#17263A]/80 hover:bg-[#EBE7DD]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter 3: Формат */}
              <div>
                <label className="text-xs font-bold text-[#17263A]/70 block mb-2">Формат на выходе:</label>
                <div className="flex flex-wrap gap-1.5">
                  {['Все', 'Презентация PPTX', 'Рабочий лист', 'Квест/Игра'].map((f) => (
                    <button
                      key={f}
                      onClick={() => setSelectedFormat(f)}
                      className={`text-xs px-3 py-1.5 rounded-xl font-medium transition ${
                        selectedFormat === f
                          ? 'bg-[#17263A] text-white shadow-xs'
                          : 'bg-[#F7F4EC] text-[#17263A]/80 hover:bg-[#EBE7DD]'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MODE 2: SPEECH & SENSORY FILTERS */}
          {activeMode === 'speech' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
              {/* Filter 1: Раздел */}
              <div>
                <label className="text-xs font-bold text-[#17263A]/70 block mb-2">Специализация:</label>
                <div className="flex flex-wrap gap-1.5">
                  {['Все', 'Логопедия и речь', 'PECS и расписания', 'Игры на липучках'].map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCategory(c)}
                      className={`text-xs px-3 py-1.5 rounded-xl font-medium transition ${
                        selectedCategory === c
                          ? 'bg-[#17263A] text-white shadow-xs'
                          : 'bg-[#F7F4EC] text-[#17263A]/80 hover:bg-[#EBE7DD]'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter 2: Возраст */}
              <div>
                <label className="text-xs font-bold text-[#17263A]/70 block mb-2">Возраст ребенка:</label>
                <div className="flex flex-wrap gap-1.5">
                  {['Все', '1.5–3 года', '3–4 года', '5–6 лет'].map((a) => (
                    <button
                      key={a}
                      onClick={() => setSelectedAge(a)}
                      className={`text-xs px-3 py-1.5 rounded-xl font-medium transition ${
                        selectedAge === a
                          ? 'bg-[#17263A] text-white shadow-xs'
                          : 'bg-[#F7F4EC] text-[#17263A]/80 hover:bg-[#EBE7DD]'
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter 3: Навык / Звук */}
              <div>
                <label className="text-xs font-bold text-[#17263A]/70 block mb-2">Прорабатываемый навык:</label>
                <div className="flex flex-wrap gap-1.5">
                  {['Все', 'Звуки [Р]/[Л]', 'Шипящие (Ш, Ж, Щ)', 'Запуск речи', 'Расписание/Рутина', 'Коммуникация и эмоции'].map((f) => (
                    <button
                      key={f}
                      onClick={() => setSelectedFocus(f)}
                      className={`text-xs px-2.5 py-1.5 rounded-xl font-medium transition ${
                        selectedFocus === f
                          ? 'bg-[#17263A] text-white shadow-xs'
                          : 'bg-[#F7F4EC] text-[#17263A]/80 hover:bg-[#EBE7DD]'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter 4: Тип поставки */}
              <div>
                <label className="text-xs font-bold text-[#17263A]/70 block mb-2">Исполнение:</label>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSelectedDelivery('Все')}
                    className={`text-xs px-3 py-1.5 rounded-xl font-medium transition ${
                      selectedDelivery === 'Все'
                        ? 'bg-[#17263A] text-white'
                        : 'bg-[#F7F4EC] text-[#17263A]/80'
                    }`}
                  >
                    Все
                  </button>
                  <button
                    onClick={() => setSelectedDelivery('digital')}
                    className={`text-xs px-3 py-1.5 rounded-xl font-medium flex items-center gap-1 transition ${
                      selectedDelivery === 'digital'
                        ? 'bg-[#17263A] text-white'
                        : 'bg-[#F7F4EC] text-[#17263A]/80'
                    }`}
                  >
                    <FileDown className="w-3 h-3 text-[#9BAA8E]" />
                    <span>PDF для сборки</span>
                  </button>
                  <button
                    onClick={() => setSelectedDelivery('physical')}
                    className={`text-xs px-3 py-1.5 rounded-xl font-medium flex items-center gap-1 transition ${
                      selectedDelivery === 'physical'
                        ? 'bg-[#17263A] text-white'
                        : 'bg-[#F7F4EC] text-[#17263A]/80'
                    }`}
                  >
                    <Truck className="w-3 h-3 text-amber-500" />
                    <span>Готовое изделие</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E5E0D5] space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#F7F4EC] mx-auto flex items-center justify-center text-2xl">
              🔍
            </div>
            <h3 className="text-lg font-bold text-[#17263A]">По выбранным фильтрам ничего не найдено</h3>
            <p className="text-sm text-[#17263A]/60 max-w-md mx-auto">
              Попробуйте смягчить критерии поиска или нажмите кнопку сброса фильтрации.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-xl bg-[#17263A] text-white text-sm font-semibold hover:bg-[#1f334d] transition inline-flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Сбросить все фильтры</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const inCart = cart.some((c) => c.id === product.id);

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl border border-[#E5E0D5] overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Card Visual Header / Cover */}
                  <div
                    className={`relative p-6 bg-gradient-to-br ${product.coverGradient} flex flex-col justify-between min-h-[170px] border-b border-[#E5E0D5]/50`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border shadow-2xs ${product.badgeColor}`}>
                        {product.badge}
                      </span>

                      {/* Delivery badge */}
                      {product.deliveryType === 'digital' ? (
                        <span className="bg-[#17263A]/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 backdrop-blur-xs">
                          <FileDown className="w-3 h-3 text-[#9BAA8E]" />
                          <span>PDF онлайн</span>
                        </span>
                      ) : (
                        <span className="bg-[#17263A] text-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                          <Truck className="w-3 h-3" />
                          <span>Готовое на липучках</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-end justify-between mt-4">
                      <div className="text-4xl filter drop-shadow-sm select-none">{product.icon}</div>
                      <div className="text-right">
                        <span className="text-[11px] font-semibold text-[#17263A]/70 block">
                          {product.pages}
                        </span>
                        <div className="flex items-center gap-1 text-xs font-bold text-[#17263A]">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                          <span>{product.rating}</span>
                          <span className="text-[#17263A]/40 font-normal">({product.reviewsCount})</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1.5">
                        {product.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#F7F4EC] text-[#17263A]/70"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="font-bold text-base text-[#17263A] group-hover:text-[#9BAA8E] transition-colors leading-snug">
                        {product.title}
                      </h3>

                      <p className="text-xs text-[#17263A]/70 line-clamp-2 leading-relaxed">
                        {product.subtitle}
                      </p>
                    </div>

                    {/* Footer Controls & Price */}
                    <div className="pt-3 border-t border-[#E5E0D5]/70 space-y-3">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl font-extrabold text-[#17263A]">
                              {product.price} ₽
                            </span>
                            {product.oldPrice && (
                              <span className="text-xs text-[#17263A]/40 line-through font-medium">
                                {product.oldPrice} ₽
                              </span>
                            )}
                          </div>
                          {product.hasPhysicalOption && (
                            <span className="text-[10px] text-emerald-700 block font-medium">
                              или PDF версия за {product.pdfPrice} ₽
                            </span>
                          )}
                        </div>

                        {/* Quick View Button */}
                        <button
                          onClick={() => setQuickViewProduct(product)}
                          className="text-xs font-semibold text-[#17263A]/70 hover:text-[#17263A] flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-[#F7F4EC] transition"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Детали</span>
                        </button>
                      </div>

                      {/* Main Add Button */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => addToCart(product)}
                          className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs ${
                            inCart
                              ? 'bg-[#9BAA8E] text-[#17263A] hover:bg-[#8CA07D]'
                              : 'bg-[#17263A] text-white hover:bg-[#20344d]'
                          }`}
                        >
                          {inCart ? (
                            <>
                              <Check className="w-4 h-4 stroke-[3]" />
                              <span>В корзине (добавить еще)</span>
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-4 h-4 text-[#9BAA8E]" />
                              <span>В корзину • {product.price} ₽</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Brand Synergy & VK Community Section */}
        <div className="bg-gradient-to-r from-[#17263A] to-[#253B55] text-white rounded-3xl p-8 sm:p-10 shadow-xl overflow-hidden relative mt-12">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#9BAA8E]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Сообщество единомышленников ТЕЗАИКА</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Следите за новинками и получайте бесплатные раздатки в ВКонтакте
            </h2>
            <p className="text-sm text-white/80 leading-relaxed max-w-xl">
              Каждую неделю мы выкладываем бесплатные пятиминутки для уроков и логопедические дорожки. Обсуждаем сложные педагогические кейсы и делимся шаблонами.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <a
                href="https://vk.ru/tezaika"
                target="_blank"
                rel="noreferrer"
                className="bg-[#9BAA8E] text-[#17263A] font-bold text-sm px-6 py-3 rounded-xl hover:bg-[#8ea07f] transition flex items-center gap-2 shadow-md"
              >
                <span>Перейти в группу vk.com/tezaika</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <span className="text-xs text-white/60">
                Более 5 000 учителей и специалистов уже с нами
              </span>
            </div>
          </div>

          {/* Decorative Background Elements */}
          <div className="absolute -right-10 -bottom-10 w-80 h-80 rounded-full bg-[#9BAA8E]/10 pointer-events-none blur-2xl"></div>
          <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:block opacity-10 text-9xl font-black select-none pointer-events-none">
            ТЕЗАИКА
          </div>
        </div>
      </main>

      {/* QUICK VIEW MODAL */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-[#E5E0D5] max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className={`p-6 bg-gradient-to-r ${quickViewProduct.coverGradient} border-b border-[#E5E0D5] flex items-start justify-between`}>
              <div className="space-y-1 pr-6">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${quickViewProduct.badgeColor}`}>
                  {quickViewProduct.badge}
                </span>
                <h3 className="text-xl font-bold text-[#17263A] leading-tight">
                  {quickViewProduct.title}
                </h3>
                <p className="text-xs text-[#17263A]/70">
                  {quickViewProduct.subtitle}
                </p>
              </div>
              <button
                onClick={() => setQuickViewProduct(null)}
                className="p-2 rounded-xl bg-white/80 hover:bg-white text-[#17263A] transition shadow-xs"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm">
              {/* Product description */}
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#17263A]/60 mb-2">
                  Описание и методическая задача
                </h4>
                <p className="text-xs text-[#17263A]/80 leading-relaxed bg-[#F7F4EC] p-3.5 rounded-xl border border-[#E5E0D5]">
                  {quickViewProduct.description}
                </p>
              </div>

              {/* What's Inside */}
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#17263A]/60 mb-2">
                  Что входит в комплект:
                </h4>
                <ul className="space-y-2">
                  {quickViewProduct.includes.map((inc, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-xs text-[#17263A]">
                      <CheckCircle2 className="w-4 h-4 text-[#9BAA8E] shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specs & Velcro assembly info if physical */}
              {quickViewProduct.assemblyDifficulty && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                  <span className="font-bold block">Спецификация тактильного пособия:</span>
                  <p>{quickViewProduct.assemblyDifficulty}</p>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#E5E0D5]">
                {quickViewProduct.tags.map((t, idx) => (
                  <span key={idx} className="text-xs bg-[#F7F4EC] px-2.5 py-1 rounded-lg text-[#17263A]/70">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Footer with Actions */}
            <div className="p-4 bg-[#F7F4EC] border-t border-[#E5E0D5] flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[#17263A]/60 block font-medium">Стоимость:</span>
                <span className="text-2xl font-black text-[#17263A]">
                  {quickViewProduct.price} ₽
                </span>
              </div>

              <div className="flex items-center gap-2">
                {quickViewProduct.hasPhysicalOption && (
                  <button
                    onClick={() => {
                      addToCart(quickViewProduct, 'digital');
                      setQuickViewProduct(null);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-white border border-[#17263A]/20 hover:border-[#17263A] text-xs font-bold text-[#17263A] transition"
                  >
                    Купить PDF ({quickViewProduct.pdfPrice} ₽)
                  </button>
                )}

                <button
                  onClick={() => {
                    addToCart(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#17263A] hover:bg-[#1f334d] text-white text-xs font-bold transition flex items-center gap-2 shadow-md"
                >
                  <ShoppingCart className="w-4 h-4 text-[#9BAA8E]" />
                  <span>В корзину</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SLIDE-OVER CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-[#E5E0D5]">
              {/* Drawer Header */}
              <div className="p-5 border-b border-[#E5E0D5] flex items-center justify-between bg-[#F7F4EC]">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-[#17263A]" />
                  <h3 className="font-extrabold text-base text-[#17263A]">
                    Ваша корзина
                  </h3>
                  <span className="bg-[#9BAA8E] text-[#17263A] text-xs font-bold px-2 py-0.5 rounded-full">
                    {totalItemCount}
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-xl text-[#17263A]/60 hover:text-[#17263A] hover:bg-white transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body: Cart Items */}
              <div className="p-5 flex-1 overflow-y-auto space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-3">
                    <div className="w-16 h-16 rounded-full bg-[#F7F4EC] flex items-center justify-center text-2xl">
                      🛒
                    </div>
                    <p className="font-bold text-[#17263A]">Корзина пока пуста</p>
                    <p className="text-xs text-[#17263A]/60 max-w-xs">
                      Добавляйте материалы из школьного каталога или раздела логопедии — всё оформится в один заказ!
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="mt-2 text-xs font-bold text-[#17263A] bg-[#F7F4EC] px-4 py-2 rounded-xl hover:bg-[#EBE7DD] transition"
                    >
                      Вернуться к покупкам
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Delivery summary notice if mixed */}
                    <div className="space-y-2">
                      {hasDigitalInCart && (
                        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 flex items-center gap-2">
                          <FileDown className="w-4 h-4 text-emerald-700 shrink-0" />
                          <span>Цифровые материалы (PDF/PPTX) отправляются на email моментально.</span>
                        </div>
                      )}
                      {hasPhysicalInCart && (
                        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-center gap-2">
                          <Truck className="w-4 h-4 text-amber-700 shrink-0" />
                          <span>Физические пособия собираются вручную (1–2 рабочих дня). Доставка СДЭК.</span>
                        </div>
                      )}
                    </div>

                    {/* Items List */}
                    <div className="divide-y divide-[#E5E0D5]">
                      {cart.map((item) => (
                        <div key={item.cartItemId} className="py-3.5 flex gap-3">
                          <div className="w-12 h-12 rounded-xl bg-[#F7F4EC] flex items-center justify-center text-2xl shrink-0 border border-[#E5E0D5]">
                            {item.icon}
                          </div>
                          <div className="flex-1 space-y-1">
                            <h4 className="text-xs font-bold text-[#17263A] leading-tight">
                              {item.title}
                            </h4>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-semibold text-[#9BAA8E]">
                                {item.deliveryTypeChosen === 'digital' ? 'PDF файл' : 'Готовое пособие'}
                              </span>
                              <span className="text-[10px] text-[#17263A]/40">•</span>
                              <span className="text-xs font-extrabold text-[#17263A]">
                                {item.activePrice} ₽
                              </span>
                            </div>

                            {/* Quantity control */}
                            <div className="flex items-center justify-between pt-1">
                              <div className="flex items-center border border-[#E5E0D5] rounded-lg overflow-hidden bg-[#F7F4EC]">
                                <button
                                  onClick={() => updateQuantity(item.cartItemId, -1)}
                                  className="px-2 py-0.5 hover:bg-white text-xs font-bold text-[#17263A]"
                                >
                                  -
                                </button>
                                <span className="px-2 text-xs font-bold text-[#17263A]">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.cartItemId, 1)}
                                  className="px-2 py-0.5 hover:bg-white text-xs font-bold text-[#17263A]"
                                >
                                  +
                                </button>
                              </div>

                              <button
                                onClick={() => removeFromCart(item.cartItemId)}
                                className="text-[11px] text-red-500 hover:text-red-700 font-medium"
                              >
                                Удалить
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Drawer Footer: Promocode & Checkout */}
              {cart.length > 0 && (
                <div className="p-5 border-t border-[#E5E0D5] bg-[#F7F4EC] space-y-4">
                  {/* Promo Input */}
                  <form onSubmit={applyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Промокод (напр. TEZAIKA10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 text-xs px-3 py-2 rounded-xl bg-white border border-[#E5E0D5] uppercase font-mono tracking-wider focus:outline-none focus:border-[#9BAA8E]"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 rounded-xl bg-[#17263A] text-white text-xs font-bold hover:bg-[#1f334d] transition"
                    >
                      Применить
                    </button>
                  </form>
                  {promoError && (
                    <p className="text-[11px] text-red-600 font-medium">{promoError}</p>
                  )}
                  {appliedDiscount > 0 && (
                    <div className="text-[11px] text-emerald-700 font-medium flex items-center justify-between">
                      <span>Скидка 10% по промокоду:</span>
                      <span>-{discountAmount} ₽</span>
                    </div>
                  )}

                  {/* Calculations */}
                  <div className="space-y-1.5 pt-2 border-t border-[#E5E0D5]">
                    <div className="flex justify-between text-xs text-[#17263A]/70">
                      <span>Подытог:</span>
                      <span>{cartSubtotal} ₽</span>
                    </div>
                    <div className="flex justify-between text-base font-black text-[#17263A]">
                      <span>Итого к оплате:</span>
                      <span>{cartTotal} ₽</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                      setCheckoutStep('form');
                    }}
                    className="w-full py-3 rounded-2xl bg-[#17263A] text-white font-bold text-sm hover:bg-[#1f334d] transition flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>Перейти к оформлению</span>
                    <ArrowRight className="w-4 h-4 text-[#9BAA8E]" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CHECKOUT MODAL */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-[#E5E0D5]">
            <div className="p-5 bg-[#17263A] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#9BAA8E]" />
                <h3 className="font-bold text-base">
                  {checkoutStep === 'form' ? 'Быстрое оформление заказа' : 'Заказ успешно оплачен!'}
                </h3>
              </div>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="p-1 rounded-lg text-white/60 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {checkoutStep === 'form' ? (
              <form onSubmit={handleCheckoutSubmit} className="p-6 space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-[#17263A] block mb-1 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#9BAA8E]" />
                      <span>Ваше имя:</span>
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Например, Анна Сергеевна"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#F7F4EC] border border-[#E5E0D5] focus:outline-none focus:border-[#9BAA8E]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#17263A] block mb-1 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#9BAA8E]" />
                      <span>Email для отправки материалов:</span>
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="teacher@school.ru"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#F7F4EC] border border-[#E5E0D5] focus:outline-none focus:border-[#9BAA8E]"
                    />
                    <span className="text-[10px] text-[#17263A]/60 block mt-1">
                      Ссылки на скачивание PDF и презентаций придут на этот адрес сразу после оплаты.
                    </span>
                  </div>

                  {hasPhysicalInCart && (
                    <>
                      <div>
                        <label className="text-xs font-bold text-[#17263A] block mb-1 flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-amber-600" />
                          <span>Телефон (для трек-номера СДЭК):</span>
                        </label>
                        <input
                          required
                          type="tel"
                          placeholder="+7 (999) 000-00-00"
                          value={customerInfo.phone}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#F7F4EC] border border-[#E5E0D5] focus:outline-none focus:border-[#9BAA8E]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-[#17263A] block mb-1 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-amber-600" />
                          <span>Пункт выдачи СДЭК или адрес:</span>
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="Город, адрес удобного ПВЗ СДЭК"
                          value={customerInfo.address}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#F7F4EC] border border-[#E5E0D5] focus:outline-none focus:border-[#9BAA8E]"
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* Payment method selector */}
                <div className="pt-2">
                  <label className="text-xs font-bold text-[#17263A] block mb-2">Способ оплаты:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setCustomerInfo({ ...customerInfo, paymentMethod: 'sbp' })}
                      className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition ${
                        customerInfo.paymentMethod === 'sbp'
                          ? 'border-[#17263A] bg-[#17263A] text-white'
                          : 'border-[#E5E0D5] bg-[#F7F4EC] text-[#17263A]'
                      }`}
                    >
                      <span>СБП (без комиссии)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCustomerInfo({ ...customerInfo, paymentMethod: 'card' })}
                      className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition ${
                        customerInfo.paymentMethod === 'card'
                          ? 'border-[#17263A] bg-[#17263A] text-white'
                          : 'border-[#E5E0D5] bg-[#F7F4EC] text-[#17263A]'
                      }`}
                    >
                      <span>Банковская карта РФ</span>
                    </button>
                  </div>
                </div>

                {/* Total and Submit */}
                <div className="pt-4 border-t border-[#E5E0D5] flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#17263A]/60 block font-medium">Итого к оплате:</span>
                    <span className="text-xl font-black text-[#17263A]">{cartTotal} ₽</span>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-[#17263A] text-white font-bold text-xs hover:bg-[#1f334d] transition shadow-md"
                  >
                    Оплатить заказ
                  </button>
                </div>
              </form>
            ) : (
              /* Success Screen */
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center text-3xl">
                  ✓
                </div>
                <h4 className="font-extrabold text-xl text-[#17263A]">
                  Спасибо за доверие к ТЕЗАИКЕ!
                </h4>
                <p className="text-xs text-[#17263A]/70 leading-relaxed max-w-sm mx-auto">
                  Чек и персональная ссылка на скачивание цифровых материалов отправлены на почту <strong>{customerInfo.email}</strong>.
                  {hasPhysicalInCart && (
                    <span className="block mt-2 text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200">
                      Менеджер свяжется с вами по телефону для подтверждения ПВЗ СДЭК в течение 2 часов.
                    </span>
                  )}
                </p>

                <div className="pt-4 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setCart([]);
                      setIsCheckoutOpen(false);
                      setCheckoutStep('form');
                    }}
                    className="w-full py-2.5 rounded-xl bg-[#17263A] text-white font-bold text-xs hover:bg-[#1f334d] transition"
                  >
                    Вернуться в каталог
                  </button>
                  <a
                    href="https://vk.ru/tezaika"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-[#9BAA8E] hover:underline"
                  >
                    Присоединиться к нашему клубу в VK
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#17263A] text-white/70 text-xs py-10 border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-black text-lg">
              <div className="w-7 h-7 rounded-lg bg-[#9BAA8E] text-[#17263A] flex items-center justify-center text-sm font-black">
                Т
              </div>
              <span>ТЕЗАИКА</span>
            </div>
            <p className="text-white/60 leading-relaxed text-[11px]">
              Студия авторских методических пособий, интерактивных уроков по ФГОС и тактильных материалов для речевого и сенсорного развития.
            </p>
          </div>

          <div>
            <h5 className="font-bold text-white mb-3 text-xs uppercase tracking-wider">
              Школьные уроки
            </h5>
            <ul className="space-y-2 text-[11px]">
              <li><button onClick={() => { setActiveMode('lessons'); setSelectedGrade('1 класс'); }} className="hover:text-white transition">1 класс: Начало пути</button></li>
              <li><button onClick={() => { setActiveMode('lessons'); setSelectedGrade('2 класс'); }} className="hover:text-white transition">2 класс: Таблицы и правила</button></li>
              <li><button onClick={() => { setActiveMode('lessons'); setSelectedGrade('3 класс'); }} className="hover:text-white transition">3 класс: Орфография</button></li>
              <li><button onClick={() => { setActiveMode('lessons'); setSelectedGrade('4 класс'); }} className="hover:text-white transition">4 класс: Подготовка к ВПР</button></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white mb-3 text-xs uppercase tracking-wider">
              Речь и Сенсорика
            </h5>
            <ul className="space-y-2 text-[11px]">
              <li><button onClick={() => { setActiveMode('speech'); setSelectedCategory('Логопедия и речь'); }} className="hover:text-white transition">Постановка звуков [Р], [Л], [Ш]</button></li>
              <li><button onClick={() => { setActiveMode('speech'); setSelectedCategory('PECS и расписания'); }} className="hover:text-white transition">Визуальные расписания и PECS</button></li>
              <li><button onClick={() => { setActiveMode('speech'); setSelectedCategory('Игры на липучках'); }} className="hover:text-white transition">Развивающие альбомы на липучках</button></li>
              <li><button onClick={() => { setActiveMode('speech'); setSelectedFocus('Запуск речи'); }} className="hover:text-white transition">Ранний запуск речи (1.5–3 года)</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-bold text-white mb-3 text-xs uppercase tracking-wider">
              Контакты и сообщество
            </h5>
            <p className="text-[11px] text-white/60 leading-relaxed">
              Официальное сообщество: <br />
              <a href="https://vk.ru/tezaika" target="_blank" rel="noreferrer" className="text-[#9BAA8E] hover:underline font-semibold">
                vk.com/tezaika
              </a>
            </p>
            <div className="pt-1 text-[10px] text-white/40">
              © {new Date().getFullYear()} ТЕЗАИКА. Все права защищены.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}