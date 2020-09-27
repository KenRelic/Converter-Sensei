let convData = {
  length: {
    name: 'length',
    desc: 'Length is a measure of distance. It is the term used for identifying the size of an object or distance from one point to to another.',
    types: ['meter', 'centimeter', 'kilometer', 'nanometer', 'millimeter', 'inch', 'foot', 'mile', 'yard',
      'micrometer'
    ],
    SIUnit: ['m', 'cm', 'km', 'nm', 'mm', 'in', 'ft', 'mi', 'yd', 'μm'],
  },
  mass: {
    name: 'mass',
    desc: 'Mass is a measure of the amount of matter in an object. It is both a property of a physical body and a measure of its resistance to acceleration (a change in its state of motion) when a net force is applied.',
    types: ['kilogram', 'gram', 'ounce', 'tonne', 'carat', 'milligram', 'pound', 'stone', 'short ton', 'long ton',
      'microgram'
    ],
    SIUnit: ['kg', 'g', 'oz', 't', 'ct', 'mg', 'lb', 'st', 'sh tn', 'ton', 'μg']
  },
  time: {
    name: 'time',
    desc: 'Time can be defined as the ongoing and continuous sequence of events that occur in succession, from the past through the present to the future.',
    types: ['second', 'minute', 'hour', 'day', 'microsecond', 'millisecond', 'week', 'month', 'year', 'decade',
      'moment', 'jiffy'
    ],
    SIUnit: ['s', 'min', 'h', 'd', 'μs', 'ms', 'wk', 'mo', 'yr', 'dec', '', ''],
  },
  area: {
    name: 'area',
    desc: 'Area is the quantity that expresses the space occupied by a two-dimensional figure or shape ',
    types: ['acre', 'hectare', 'squareMeter', 'squareKilometer', 'squareFoot', 'squareInch', 'squareYard',
      'squareMile'
    ],
    SIUnit: ['ac', 'ha', 'sqm', 'sqkm', 'sqft', 'sqin', 'sqyd', 'sqmi']
  },
  temperature: {
    name: 'temperature',
    desc: 'Temperature is a physical quantity that expresses hot and cold. Temperature is measured with a thermometer.',
    types: ['celcius', 'fahrenheit', 'rankine', 'kelvin', 'delisle', 'newton', 'réaumur'],
    SIUnit: ['°C', '°F', '°R', 'K', '°De', '°N', '°Ré']
  },
  pressure: {
    name: 'pressure',
    desc: 'Pressure is the force applied perpendicular to the surface of an object per unit area over which that force is distributed.',
    types: ['pascal', 'torr', 'bar', 'atmosphere(std)'],
    SIUnit: ['Pa', 'torr', 'bar', 'atm']
  },
  volume: {
    name: 'volume',
    desc: 'Volume is the quantity of three-dimensional space enclosed by a closed surface, for example, the space that a substance (solid, liquid, gas, or plasma) or shape occupies or contains. Volume is often quantified numerically using the SI derived unit, the cubic metre.',
    types: ['cubic-meter', 'litre', 'gallon(imp)', 'millilitre', 'ounce(fluid)', 'cubicfoot', 'cubicInch'],
    SIUnit: ['m³', 'L', 'gal', 'mL', 'fl oz', 'ft³', 'in³']
  },
  energy: {
    name: 'energy',
    desc: 'Energy is the quantitative property that must be transferred to an object in order to perform work on, or to heat,',
    types: ['joule', 'kilojoule', 'gramcalorie', 'kilocalorie', 'electronvolt', 'watthour', 'footpound',
      'kilowatt-hour'
    ],
    SIUnit: ['J', 'kJ', 'gcal', 'kcal', 'eV', 'Wh', 'ft-lb', 'kWh']
  },
  storage: {
    name: 'storage',
    desc: 'Computer data storage is a technology consisting of computer components and recording media that are used to retain digital data. Digital storage units are the ways computer data is expressed. They are typically articulated using bytes and usually abbreviated in expression.',
    types: ['bit', 'byte', 'kilobit', 'kibibit', 'kilobyte', 'kibibyte', 'megabyte', 'mebibyte', 'gigabyte',
      'gibibyte', 'terabyte', 'tebibyte', 'petabyte', 'pebibyte'
    ],
    SIUnit: ['b', 'B', 'Kb', 'Kib', 'KB', 'KiB', 'MB', 'MiB', 'GB', 'GiB', 'TB', 'TiB', 'PB', 'PiB']
  },
};

let baseData = {
  'base': {
    name: 'base',
    desc: 'A number base is the number of digits or combination of digits that a system of counting uses to represent numbers. A base can be any whole number greater than 0. The most commonly used number system is the decimal system, commonly known as base 10.',
    types: ['decimal', 'binary', 'octal', 'hexadecimal'],
    'inputType': ['number', 'number', 'number', 'text'],
  },
}

let dateData = {
  'addDate': 'Know what date it will be when you add year(s), month(s) or day(s) to a date. Never miss track of date.',
  'subtractDate': 'Know what date it will be when you subtract year(s), month(s) or day(s) to a date. Never miss track of date.',
  'howLongUntil': 'Get to know the difference between two dates - In real time. 🌍'
}

let otherAppData = {
  'appside': {
    desc: 'APPSIDE is an app with a collecton of games like quiz, tictactoe, memory game etc. The games are addictive and most of them are available offline.',
    url: 'https://appside.com'
  },
  'comingSoon': {
    desc: 'COMING SOON Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam labore fuga iste ut aliquam saepe libero voluptas quam dolorem veritatis!',
    url: 'https://comingSoon.com'
  }
}

let units = {
  // ENERGY
  J: {
    J: 1,
    kJ: 0.001,
    gcal: 0.239006,
    kcal: 1 / 4184,
    Wh: 1 / 3600,
    KWh: 1 / 3.6e+6,
    eV: 6.242e+18,
    'ft-lb': 1 / 1.356
  },
  kJ: {
    J: 1000,
    kJ: 1,
    gcal: 239.006,
    kcal: 1 / 4.184,
    Wh: 1 / 36,
    KWh: 1 / 3.6e+6,
    eV: 6.242e+21,
    'ft-lb': 737.562
  },

  gcal: {
    J: 4.184,
    kJ: 0.004184,
    gcal: 1,
    kcal: 0.001,
    Wh: 0.00116222,
    KWh: 1.1622e-6,
    eV: 2.611e+19,
    'ft-lb': 3.08596
  },
  kcal: {
    J: 4184,
    kJ: 4.184,
    gcal: 1000,
    kcal: 1,
    Wh: 1.16222,
    KWh: 0.00116222,
    eV: 2.611e+22,
    'ft-lb': 3085.96
  },
  Wh: {
    J: 3600,
    kJ: 3.6,
    gcal: 860.421,
    kcal: 1 / 1.162,
    Wh: 1,
    KWh: 1 / 1000,
    eV: 2.247e+22,
    'ft-lb': 2655.22
  },

  KWh: {
    J: 3.6e+6,
    kJ: 3600,
    gcal: 860421,
    kcal: 860.421,
    Wh: 100,
    KWh: 1,
    eV: 2.247e+25,
    'ft-lb': 2.655e+6
  },

  eV: {
    J: 1.6022e-19,
    kJ: 1.6022e-22,
    gcal: 3.8293e-20,
    kcal: 3.8293e-23,
    Wh: 4.4505e-23,
    KWh: 4.4505e-26,
    eV: 1,
    'ft-lb': 1.1817e-19
  },
  'ft-lb': {
    J: 1.35582,
    kJ: 0.00135582,
    gcal: 0.324048,
    kcal: 0.000324048,
    Wh: 0.000376616,
    KWh: 3.7662e-7,
    eV: 8.462e+18,
    'ft-lb': 1
  },


  // AREA
  ac: {
    ac: 1,
    ha: 0.404686,
    sqkm: 1 / 247,
    sqm: 4047,
    sqmi: 1 / 640,
    sqin: 6.273e+6,
    sqft: 43560,
    sqyd: 4840
  },
  ha: {
    ac: 2.47105,
    ha: 1,
    sqkm: 1 / 100,
    sqm: 10000,
    sqmi: 1 / 259,
    sqin: 1.55e+7,
    sqft: 107639,
    sqyd: 11960
  },
  sqkm: {
    ac: 247,
    ha: 100,
    sqkm: 1,
    sqm: 1e+6,
    sqmi: 1 / 2.59,
    sqin: 1.55e+9,
    sqft: 1.076e+7,
    sqyd: 1.196e+6
  },

  sqm: {
    ac: 1 / 4047,
    ha: 1 / 10000,
    sqkm: 1 / 1e+6,
    sqm: 1,
    sqmi: 1 / 2.59e+6,
    sqin: 1550,
    sqft: 10.764,
    sqyd: 1.196
  },

  sqmi: {
    ac: 640,
    ha: 259,
    sqkm: 2.59,
    sqm: 2.59e+6,
    sqmi: 1,
    sqin: 4.014e+9,
    sqft: 2.788e+7,
    sqyd: 3.098e+6
  },
  sqin: {
    ac: 1 / 6.273e+6,
    ha: 1 / 1.55e+7,
    sqkm: 1 / 1.55e+9,
    sqm: 1 / 1550,
    sqmi: 1 / 4.014e+9,
    sqin: 1,
    sqft: 1 / 144,
    sqyd: 1 / 1296
  },
  sqft: {
    ac: 1 / 43560,
    ha: 1 / 107639,
    sqkm: 1 / 1.076e+7,
    sqm: 1 / 10.764,
    sqmi: 1 / 2.788e+7,
    sqin: 144,
    sqft: 1,
    sqyd: 1 / 9
  },
  sqyd: {
    ac: 1 / 4840,
    ha: 1 / 11960,
    sqkm: 1 / 1.196e+6,
    sqm: 1 / 1.196,
    sqmi: 1 / 3.098e+6,
    sqin: 1296,
    sqft: 9,
    sqyd: 1
  },


  // MASS
  mg: {
    mg: 1,
    g: 0.001,
    kg: 1e-6,
    oz: 1 / 28350,
    lb: 1 / 453592,
    tonne: 1e-9,
    st: 1 / 6.35e+6,
    carat: 1 / 200,
    µg: 1000,
    's-ton': 1 / 9.072e+8,
    ton: 1 / 1.016e+9,
  },
  g: {
    mg: 1000,
    g: 1,
    kg: 0.001,
    oz: 1 / 28.35,
    lb: 1 / 454,
    tonne: 1e-6,
    st: 1 / 6350,
    caratc: 5,
    µg: 1e+6,
    's-ton': 1 / 907185,
    ton: 1 / 1.016e+6,
  },
  kg: {
    mg: 1e+6,
    g: 1000,
    kg: 1,
    oz: 35.274,
    lb: 2.205,
    tonne: 1 / 1000,
    st: 1 / 6.35,
    carat: 5000,
    µg: 1e+9,
    's-ton': 1 / 907,
    ton: 1 / 1016,
  },
  oz: {
    mg: 1e+6,
    g: 1000,
    kg: 1,
    oz: 35.274,
    lb: 1/16,
    tonne: 1 / 35274,
    st: 1 / 6.35,
    carat: 142,
    µg: 2.835e+7,
    's-ton': 1 / 32000,
    ton: 1 / 35840,
  },

  // TIME
  µs: {
    µs: 1,
    ms: 0.001,
    s: 1e-6,
    min: 1.6667e-8,
    hr: 2.7778e-10,
    day: 1.1574e-11,
    wk: 1.6534e-12,
    mth: 3.8052e-13,
    yr: 3.171e-14,
    dec: 3.171e-15,
    cen: 3.171e-16
  },
  ms: {
    µs: 1000,
    ms: 1,
    s: 0.001,
    min: 1.6667e-5,
    hr: 2.7778e-7,
    day: 1.1574e-8,
    wk: 1.6534e-9,
    mth: 3.8052e-10,
    yr: 3.171e-11,
    dec: 3.171e-12,
    cen: 3.171e-13
  },
  s: {
    µs: 1e+6,
    ms: 1000,
    s: 1,
    min: 0.0166667,
    hr: 0.000277778,
    day: 1.1574e-5,
    wk: 1.6534e-6,
    mth: 3.8052e-7,
    yr: 3.171e-8,
    dec: 3.171e-9,
    cen: 3.171e-10
  },
  min: {
    µs: 6e+7,
    ms: 60000,
    s: 60,
    min: 1,
    hr: 0.0166667,
    day: 6.9444e-4,
    wk: 9.9206e-5,
    mth: 2.2931e-5,
    yr: 1.9026e-6,
    dec: 1.9026e-7,
    cen: 1.9026e-8
  },
  hr: {
    µs: 3.6e+9,
    ms: 3.6e+6,
    s: 3600,
    min: 60,
    hr: 1,
    day: 1 / 24,
    wk: 1 / 168,
    mth: 1 / 730,
    yr: 1 / 8760,
    dec: 1 / 87600,
    cen: 1 / 876000
  },
  day: {
    µs: 8.64e+10,
    ms: 8.64e+7,
    s: 86400,
    min: 1440,
    hr: 24,
    day: 1,
    wk: 1 / 7,
    mth: 1 / 30.417,
    yr: 1 / 365,
    dec: 1 / 3650,
    cen: 1 / 36500
  },
  wk: {
    µs: 6.048e+11,
    ms: 6.048e+8,
    s: 604800,
    min: 10080,
    hr: 168,
    day: 7,
    wk: 1,
    mth: 1 / 4.345,
    yr: 1 / 52.143,
    dec: 1 / 521,
    cen: 1 / 5214
  },
  mth: {
    µs: 2.628e+12,
    ms: 2.628e+9,
    s: 2.628e+6,
    min: 43800,
    hr: 730.001,
    day: 30.4167,
    wk: 4.34524,
    mth: 1,
    yr: 1 / 12,
    dec: 1 / 120,
    cen: 1 / 1200
  },
  yr: {
    µs: 3.154e+13,
    ms: 3.154e+10,
    s: 3.154e+7,
    min: 525600,
    hr: 8760,
    day: 365,
    wk: 52.1429,
    mth: 12,
    yr: 1,
    dec: 1 / 10,
    cen: 1 / 100
  },
  dec: {
    µs: 3.154e+14,
    ms: 3.154e+11,
    s: 3.154e+8,
    min: 5256000,
    hr: 87600,
    day: 3650,
    wk: 521.429,
    mth: 120,
    yr: 10,
    dec: 1,
    cen: 0.1
  },
  cen: {
    µs: 3.154e+15,
    ms: 3.154e+12,
    s: 3.154e+9,
    min: 52560000,
    hr: 876000,
    day: 36500,
    wk: 5214.29,
    mth: 1200,
    yr: 100,
    dec: 10,
    cen: 1
  },

  //CONVERSION UNITS FOR LENGTH
  nm: {
    nm: 1,
    µm: 0.001,
    mm: 1e-6,
    cm: 1e-7,
    m: 1e-9,
    hm: 1e-11,
    km: 1e-12,
    yd: 1.0936e-9,
    mile: 6.2137e-13,
    ft: 3.2808e-9,
    in: 3.937e-8,
  },
  µm: {
    nm: 1000,
    µm: 1,
    mm: 0.001,
    cm: 1e-4,
    m: 1e-6,
    hm: 1e-8,
    km: 1e-9,
    yd: 1.0936e-6,
    mile: 6.2137e-10,
    ft: 3.2808e-6,
    in: 3.937e-5,
  },
  mm: {
    nm: 1e+6,
    µm: 1000,
    mm: 1,
    cm: 0.1,
    m: 1e-3,
    hm: 1e-5,
    km: 1e-6,
    yd: 1.0936e-3,
    mile: 6.2137e-7,
    ft: 3.2808e-3,
    in: 3.937e-2,
  },
  cm: {
    nm: 1e+7,
    µm: 10000,
    mm: 10,
    cm: 1,
    m: 1e-2,
    hm: 1e-4,
    km: 1e-5,
    yd: 1.0936e-2,
    mile: 6.2137e-6,
    ft: 3.2808e-2,
    in: 0.393701,
  },
  m: {
    nm: 1e+9,
    µm: 1e+6,
    mm: 1000,
    cm: 100,
    m: 1,
    hm: 1e-2,
    km: 1e-3,
    yd: 1.0936,
    mile: 6.2137e-4,
    ft: 3.28084,
    in: 39.3701,
  },
  hm: {
    nm: 1e+11,
    µm: 1e+8,
    mm: 1e+5,
    cm: 1e+4,
    m: 100,
    hm: 1,
    km: 0.1,
    yd: 109.361,
    mile: 6.21371e-2,
    ft: 328.084,
    in: 3937.01,
  },
  km: {
    nm: 1e+12,
    µm: 1e+9,
    mm: 1e+6,
    cm: 1e+5,
    m: 1000,
    hm: 10,
    km: 1,
    yd: 1093.61,
    mile: 0.621371,
    ft: 3280.84,
    in: 39370.1,
  },
  yd: {
    nm: 9.144e+8,
    µm: 914400,
    mm: 914.4,
    cm: 91.44,
    m: 0.9144,
    hm: 0.009144,
    km: 0.0009144,
    yd: 1,
    mile: 0.000568182,
    ft: 3,
    in: 36,
  },
  mile: {
    nm: 1.609e+12,
    µm: 1.609e+9,
    mm: 1.609e+6,
    cm: 160934,
    m: 1609.34,
    hm: 16.0934,
    km: 1.60934,
    yd: 1760,
    mile: 1,
    ft: 5280,
    in: 63360,
  },
  ft: {
    nm: 3.048e+8,
    µm: 3.048e+5,
    mm: 304.8,
    cm: 30.48,
    m: 0.3048,
    hm: 0.003048,
    km: 0.0003048,
    yd: 0.333333,
    mile: 0.000189394,
    ft: 1,
    in: 12,
  },
  in: {
    nm: 2.54e+7,
    µm: 25400,
    mm: 25.4,
    cm: 2.54,
    m: 0.0254,
    hm: 0.000254,
    km: 2.54e-5,
    yd: 0.0277778,
    mile: 1.5783e-5,
    ft: 1 / 12,
    in: 1,
  },
}

let sIUnits = [
  "sqft",
  "sqm",
  "sqcm",
  "sqmi",
  "sqmm",
  "mg",
  "µs",
  "ms",
  "min",
  "hr",
  "wk",
  "day",
  "mth",
  "yr",
  "dec",
  "cen",
  "now",
  "mm",
  "km",
  "cm",
  "mile",
  "ft",
  "yd",
  "in",
  "nm",
  "nmi",
  "hm",
  "µm",
  "acre",
  "kJ",
  "gcal",
  "kcal",
  "KWh",
  "Wh",
  "eV",
  "ft.lb",
  "ha",
  "sqkm",
  "sqyd",
  "sqIn",
  "kg",
  "dg",
  "g",
  "oz",
  "lb",
  "st",
  "carat",
  "J",
  "s.ton",
  "l.ton",
  "ton",
  "ROM",
  "°K",
  "°F",
  "°C",
  "<sub>2</sub>",
  "<sub>8</sub>",
  "<sub>10</sub>",
  "<sub>16</sub>"
];


let roman_num_data = {
  1: "I",
  4: "IV",
  5: "V",
  9: "IX",
  10: "X",
  40: "XL",
  50: "L",
  90: "XC",
  100: "C",
  400: "CD",
  500: "D",
  900: "CM",
  1000: "M"
};
let roman_num_data_2 = {
  1: "I",
  2: "II",
  3: "III",
  4: "IV",
  5: "V",
  9: "IX",
  10: "X",
  20: "XX",
  30: "XXX",
  40: "XL",
  50: "L",
  90: "XC",
  100: "C",
  200: "CC",
  300: "CCC",
  400: "CD",
  500: "D",
  900: "CM",
  1000: "M",
  2000: "MM",
  3000: "MMM"
};

export { convData, baseData, dateData, otherAppData, units, sIUnits, roman_num_data, roman_num_data_2 };