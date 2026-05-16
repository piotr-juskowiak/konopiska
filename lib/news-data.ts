export type NewsItem = {
  slug: string
  title: string
  url: string
  date: string
  timestamp: number
  image: string
  excerpt: string
  body: string[]
  category?: string
  readingTime?: number
}

function makeSlug(url: string) {
  // Last two segments of konopiska URL: ".../slug/id"
  const parts = url.split("/").filter(Boolean)
  const id = parts[parts.length - 1]
  const name = parts[parts.length - 2] ?? "artykul"
  return `${name}-${id}`
}

const raw: Omit<NewsItem, "slug" | "readingTime">[] = [
  {
    title: "Zielona Pracownia w SP w ZSP im. Jana Pawła II w Kopalni – EkoStrefa",
    url: "https://www.konopiska.pl/aktualnosci/zielona-pracownia-w-sp-w-zsp-im-jana-pawla-ii-w-kopalni-ekostrefa/6322",
    date: "15.05.2026",
    timestamp: 1778861960,
    image: "https://www.konopiska.pl/img/media/500x250/500x250-WFOSiGW.jpg.webp",
    excerpt:
      "29 kwietnia 2026 r. zawarto umowę dotacji z Wojewódzkim Funduszem Ochrony Środowiska i Gospodarki Wodnej w Katowicach na nową pracownię edukacyjną.",
    body: [
      "29 kwietnia 2026 r. Gmina Konopiska podpisała z Wojewódzkim Funduszem Ochrony Środowiska i Gospodarki Wodnej w Katowicach umowę dotacji nr 311/2026/317/EE/ap/D na realizację zadania „EkoStrefa” w Szkole Podstawowej w Zespole Szkolno-Przedszkolnym im. Jana Pawła II w Kopalni.",
      "Środki pozwolą stworzyć nowoczesną, w pełni wyposażoną pracownię przyrodniczą, w której uczniowie będą rozwijać kompetencje przyrodnicze, ekologiczne i badawcze.",
      "W ramach projektu zaplanowano zakup pomocy dydaktycznych, mikroskopów, modeli oraz aranżację sali z elementami naturalnymi — tak, by przestrzeń uczyła samym wyglądem.",
    ],
    category: "Ekologia",
  },
  {
    title: "Otwarte spotkanie profilaktyczne i bezpłatne badania z okazji Dnia Mamy oraz Dnia Taty",
    url: "https://www.konopiska.pl/aktualnosci/zapraszamy-na-otwarte-spotkanie-profilaktyczne-z-i-bezplatne-badania-dla-mieszkancow-powiatu-czestochowskiego-z-okazji-dnia-mamy-oraz-dnia-taty/6321",
    date: "14.05.2026",
    timestamp: 1778775560,
    image: "https://www.konopiska.pl/img/media/500x250/500x250-Plakat-dm.jpg.webp",
    excerpt:
      "Zapraszamy mieszkańców powiatu częstochowskiego na bezpłatne badania i prelekcje. „Zadbaj o siebie, Mamo i Tato”.",
    body: [
      "Z okazji Dnia Mamy oraz Dnia Taty zapraszamy mieszkańców powiatu częstochowskiego na otwarte spotkanie profilaktyczne pt. „Zadbaj o siebie, Mamo i Tato”.",
      "W programie m.in. bezpłatne badania, konsultacje ze specjalistami oraz prelekcje na temat zdrowego stylu życia, profilaktyki nowotworowej i zdrowia psychicznego.",
      "Udział jest bezpłatny — wystarczy wcześniejsza rejestracja telefoniczna lub mailowa w wyznaczonym terminie.",
    ],
    category: "Zdrowie",
  },
  {
    title: "Gmina Konopiska z dofinansowaniem na Zieloną Pracownię w Kopalni",
    url: "https://www.konopiska.pl/aktualnosci/gmina-konopiska-z-dofinansowaniem-na-zielona-pracownie-w-kopalni/6320",
    date: "12.05.2026",
    timestamp: 1778602760,
    image:
      "https://www.konopiska.pl/img/media/500x250/500x250-Zielona-Pracownia-w-Kopalni_WWW,-FB_page-0001.jpg.webp",
    excerpt:
      "Umowa z WFOŚiGW w Katowicach na dofinansowanie zadania „Zielona Pracownia” oficjalnie podpisana.",
    body: [
      "Gmina Konopiska oficjalnie pozyskała dofinansowanie z Wojewódzkiego Funduszu Ochrony Środowiska i Gospodarki Wodnej w Katowicach na realizację „Zielonej Pracowni” w Kopalni.",
      "Projekt obejmuje kompleksową modernizację sali lekcyjnej oraz zakup wyposażenia, które umożliwi prowadzenie zajęć w nowoczesny, ekologiczny sposób.",
      "To kolejna inwestycja w edukację przyrodniczą na terenie gminy, wpisująca się w długofalową strategię ekologiczną samorządu.",
    ],
    category: "Fundusze",
  },
  {
    title: "Zmiany w ramach Komunikacji Jurajskiej od 18 maja",
    url: "https://www.konopiska.pl/aktualnosci/zmiany-w-ramach-komunikacji-jurajskiej-od-18-maja/6318",
    date: "11.05.2026",
    timestamp: 1778516360,
    image: "https://www.konopiska.pl/img/media/500x250/500x250-Baner1GminaKonopiska.jpg.webp",
    excerpt:
      "Linia 104: kurs 6:35 Częstochowa–Starcza zostaje przyspieszony na 6:30. Sprawdź pełen rozkład zmian.",
    body: [
      "Od 18 maja 2026 r. w ramach Komunikacji Jurajskiej wchodzą w życie zmiany rozkładu jazdy.",
      "Linia 104: kurs 6:35 Częstochowa–Starcza zostaje przyspieszony na 6:30, a kurs 7:23 Starcza–Częstochowa rusza o 7:18.",
      "Aktualne rozkłady dostępne są na przystankach oraz na stronie operatora — pasażerów prosimy o sprawdzenie godzin przed podróżą.",
    ],
    category: "Transport",
  },
  {
    title: "Aleksandryjski Ogród Nauki oficjalnie otwarty",
    url: "https://www.konopiska.pl/aktualnosci/aleksandryjski-ogrod-nauki-oficjalnie-otwarty/6319",
    date: "11.05.2026",
    timestamp: 1778516360,
    image: "https://www.konopiska.pl/img/media/500x250/500x250-aleksandryjski-ogród-nauki.png.webp",
    excerpt:
      "5 maja 2026 r. uroczyście otwarto Ekopracownię pod chmurką w Zespole Szkolno-Przedszkolnym im. Jana Kochanowskiego.",
    body: [
      "5 maja 2026 r. odbyło się oficjalne otwarcie Aleksandryjskiego Ogrodu Nauki — Ekopracowni pod chmurką w Zespole Szkolno-Przedszkolnym im. Jana Kochanowskiego.",
      "Nowa przestrzeń łączy edukację, rekreację i kontakt z naturą. Uczniowie zyskali plenerowe stanowiska do obserwacji przyrody i eksperymentów.",
      "W otwarciu uczestniczyli przedstawiciele samorządu, dyrekcja, nauczyciele i społeczność szkolna.",
    ],
    category: "Edukacja",
  },
  {
    title: "Ostatnie dni rekrutacji podstawowej — PROJEKT LOWE",
    url: "https://www.konopiska.pl/aktualnosci/ostatnie-dni-rekrutacji-podstawowej-projekt-lowe/6317",
    date: "08.05.2026",
    timestamp: 1778257160,
    image: "https://www.konopiska.pl/img/media/500x250/500x250-Baner1GminaKonopiska.jpg.webp",
    excerpt:
      "Do 13 maja 2026 r. można dołączyć do Lokalnego Ośrodka Wiedzy i Edukacji. Darmowe kursy i warsztaty czekają.",
    body: [
      "Trwają ostatnie dni rekrutacji podstawowej do Lokalnego Ośrodka Wiedzy i Edukacji (LOWE) w Gminie Konopiska.",
      "Do 13 maja 2026 r. można zgłosić się na bezpłatne kursy i warsztaty obejmujące kompetencje cyfrowe, językowe, artystyczne i obywatelskie.",
      "Projekt skierowany jest do dorosłych mieszkańców gminy, którzy chcą rozwijać swoje umiejętności w przyjaznej atmosferze.",
    ],
    category: "Edukacja",
  },
  {
    title: "Porozumienie o współpracy ze Stowarzyszeniem YAVA z Częstochowy",
    url: "https://www.konopiska.pl/aktualnosci/porozumienie-o-wspolpracy-pomiedzy-stowarzyszeniem-yava-zs-w-czestochowie-a-gmina-konopiska/6316",
    date: "08.05.2026",
    timestamp: 1778257160,
    image: "https://www.konopiska.pl/img/media/500x250/500x250-d1a49047-66b3-4c68-b4f6-2920225295b8.jpeg.webp",
    excerpt:
      "6 maja 2026 roku w Urzędzie Gminy odbyło się pierwsze spotkanie dotyczące współpracy społecznej.",
    body: [
      "6 maja 2026 r. w Urzędzie Gminy Konopiska odbyło się pierwsze spotkanie poświęcone współpracy ze Stowarzyszeniem YAVA z siedzibą w Częstochowie.",
      "Strony omówiły kierunki wspólnych działań na rzecz społeczności lokalnej — w obszarach kultury, edukacji i integracji międzypokoleniowej.",
      "Porozumienie otwiera drogę do realizacji wspólnych projektów grantowych w kolejnych miesiącach.",
    ],
    category: "Społeczność",
  },
  {
    title: "Dofinansowanie dla stowarzyszeń z terenu Gminy Konopiska",
    url: "https://www.konopiska.pl/aktualnosci/dofinansowanie-dla-stowarzyszen-z-terenu-gminy-konopiska/6314",
    date: "07.05.2026",
    timestamp: 1778170760,
    image: "https://www.konopiska.pl/img/media/500x250/500x250-ChatGPT-Image-7-maj-2026-o-08_55_16.png.webp",
    excerpt:
      "Organizacje z gminy otrzymały wsparcie w konkursie Województwa Śląskiego „Kultywowanie Tradycji Lokalnych”.",
    body: [
      "Organizacje pozarządowe z terenu Gminy Konopiska otrzymały dofinansowanie w ramach otwartego konkursu ofert Województwa Śląskiego „Kultywowanie Tradycji Lokalnych”.",
      "Wsparcie pozwoli zrealizować projekty dotyczące folkloru, dziedzictwa kulturowego i lokalnej tożsamości.",
      "Gratulujemy wszystkim beneficjentom i czekamy na efekty ich pracy w kolejnych miesiącach.",
    ],
    category: "Fundusze",
  },
  {
    title: "Konkurs wiedzy o Gminie Konopiska „Moja Mała Ojczyzna”",
    url: "https://www.konopiska.pl/aktualnosci/konkurs-wiedzy-o-gminie-konopiska-moja-mala-ojczyzna/6304",
    date: "07.05.2026",
    timestamp: 1778170760,
    image: "https://www.konopiska.pl/img/media/500x250/500x250-mmo.jpg.webp",
    excerpt:
      "Rada Gminy oraz GCKiS zapraszają młodzież klas VII, VIII oraz I klas szkół ponadpodstawowych do konkursu.",
    body: [
      "Rada Gminy Konopiska we współpracy z Urzędem Gminy oraz Gminnym Centrum Kultury i Sportu zaprasza młodzież do udziału w konkursie „Moja Mała Ojczyzna”.",
      "Adresatami są uczniowie klas VII i VIII szkół podstawowych oraz I klas szkół ponadpodstawowych.",
      "Na laureatów czekają atrakcyjne nagrody, a najlepsze prace zostaną zaprezentowane podczas gminnych uroczystości.",
    ],
    category: "Kultura",
  },
  {
    title: "Projekt „Promykowe dzieci”",
    url: "https://www.konopiska.pl/aktualnosci/projekt-promykowe-dzieci/6315",
    date: "07.05.2026",
    timestamp: 1778170760,
    image: "https://www.konopiska.pl/img/media/500x250/500x250-placówka_promyk_poziom.jpg.webp",
    excerpt:
      "Placówka Wsparcia Dziennego „Promyk” otrzymała dotację 40 000 zł z budżetu Województwa Śląskiego.",
    body: [
      "Placówka Wsparcia Dziennego „Promyk” w Konopiskach otrzymała dotację w wysokości 40 000 zł z budżetu Województwa Śląskiego.",
      "Środki zostaną przeznaczone na realizację projektu „Promykowe dzieci” — bogatego programu zajęć rozwojowych, wsparcia i wycieczek edukacyjnych.",
      "To istotne wzmocnienie oferty skierowanej do dzieci z lokalnych rodzin, korzystających z systematycznego wsparcia placówki.",
    ],
    category: "Społeczność",
  },
  {
    title: "Nadchodzące wydarzenia — lato 2026 w Gminie Konopiska",
    url: "https://www.konopiska.pl/aktualnosci/nadchodzace-wydarzenia/6308",
    date: "29.04.2026",
    timestamp: 1777479560,
    image: "https://www.konopiska.pl/img/media/500x250/500x250-Nadchodzące-wydarzenia-(1080-x-1920-px)(2).jpg.webp",
    excerpt:
      "Bieg Pamięci Bohaterów Monte Cassino, Ekopiknik, Runmageddon Lite, Festiwal Światła i Wody, Beach Party z TEDE — rezerwuj terminy.",
    body: [
      "Lato 2026 zapowiada się w Gminie Konopiska wyjątkowo bogato. W kalendarzu znalazły się m.in. Bieg Pamięci Bohaterów Monte Cassino, Ekopiknik oraz Runmageddon Lite.",
      "Nie zabraknie również Festiwalu Światła i Wody, koncertów plenerowych oraz Beach Party z gościem specjalnym — TEDE.",
      "Szczegółowe daty i programy poszczególnych wydarzeń będą sukcesywnie publikowane w mediach gminnych.",
    ],
    category: "Wydarzenia",
  },
  {
    title: "80 lat historii, pasji i ludzi — Jubileusz GLKS LOT Konopiska",
    url: "https://www.konopiska.pl/aktualnosci/80-lat-historii-pasji-i-ludzi-jubileusz-glks-lot-konopiska/6296",
    date: "18.04.2026",
    timestamp: 1776529160,
    image: "https://www.konopiska.pl/img/media/500x250/500x250-IMG_1472-Duży.jpeg.webp",
    excerpt:
      "Klub sportowy GLKS LOT Konopiska świętuje 80-lecie istnienia. Historia, sport i ludzie tworzący lokalną legendę.",
    body: [
      "GLKS LOT Konopiska — klub sportowy z bogatą historią — obchodzi 80-lecie istnienia.",
      "Przez osiem dekad klub kształtował kolejne pokolenia zawodników, działaczy i kibiców, stając się ważnym elementem lokalnej tożsamości.",
      "Uroczystości jubileuszowe to okazja do wspomnień, podziękowań i wytyczania ambitnych planów na kolejne lata.",
    ],
    category: "Sport",
  },
  {
    title: "Delegacja Gminy Konopiska z wizytą w Sejmie",
    url: "https://www.konopiska.pl/aktualnosci/delegacja-gminy-konopiska-z-wizyta-w-sejmie/6295",
    date: "17.04.2026",
    timestamp: 1776442760,
    image: "https://www.konopiska.pl/img/media/500x250/500x250-sejm1.jpg.webp",
    excerpt:
      "Przedstawiciele samorządu odwiedzili Sejm RP, dzieląc się obserwacjami z parlamentarnych obrad.",
    body: [
      "Delegacja Gminy Konopiska odwiedziła Sejm Rzeczypospolitej Polskiej, biorąc udział w obradach plenarnych oraz spotkaniach z parlamentarzystami.",
      "Wizyta była okazją do rozmów o sprawach samorządowych, dostępie do programów rządowych oraz inwestycji w regionie.",
      "Doświadczenia z wizyty zostaną wykorzystane w bieżącej pracy samorządu gminnego.",
    ],
    category: "Samorząd",
  },
  {
    title: "Rocker Music Festival vol. 2",
    url: "https://www.konopiska.pl/aktualnosci/rocker-music-festival-vol2/6305",
    date: "25.04.2026",
    timestamp: 1777133960,
    image: "https://www.konopiska.pl/img/media/500x250/500x250-IMG_1921.JPG.webp",
    excerpt:
      "Druga edycja festiwalu rockowego w Konopiskach — energia, scena i społeczność muzyczna.",
    body: [
      "Druga edycja Rocker Music Festival w Konopiskach przyciągnęła miłośników mocniejszego brzmienia z całego regionu.",
      "Na scenie wystąpiły zespoły lokalne oraz goście z odleglejszych zakątków Polski. Publiczność dopisała frekwencją i energią.",
      "Organizatorzy zapowiadają, że trzecia edycja festiwalu odbędzie się już za rok — z jeszcze mocniejszym line-upem.",
    ],
    category: "Kultura",
  },
]

export const newsItems: NewsItem[] = raw.map((n) => {
  const wordCount = n.body.join(" ").split(/\s+/).length
  return {
    ...n,
    slug: makeSlug(n.url),
    readingTime: Math.max(2, Math.round(wordCount / 180)),
  }
})

export function getArticleBySlug(slug: string): NewsItem | undefined {
  return newsItems.find((n) => n.slug === slug)
}

export const categories = [
  "Wszystkie",
  "Ekologia",
  "Edukacja",
  "Wydarzenia",
  "Samorząd",
  "Kultura",
  "Sport",
  "Transport",
  "Zdrowie",
  "Fundusze",
  "Społeczność",
]

export function formatPolishDate(input: string) {
  const [d, m, y] = input.split(".").map(Number)
  const months = [
    "stycznia",
    "lutego",
    "marca",
    "kwietnia",
    "maja",
    "czerwca",
    "lipca",
    "sierpnia",
    "września",
    "października",
    "listopada",
    "grudnia",
  ]
  return `${d} ${months[m - 1]} ${y}`
}
