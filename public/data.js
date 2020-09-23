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
      SIUnit: ['ac', 'ha', 'sq m', 'sq km', 'sq ft', 'sq in', 'sq yd', 'sq mi']
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
      name:'base',
      desc: 'A number base is the number of digits or combination of digits that a system of counting uses to represent numbers. A base can be any whole number greater than 0. The most commonly used number system is the decimal system, commonly known as base 10.',
      types: ['decimal', 'binary', 'octal', 'hexadecimal'],
      'inputType': ['number', 'number', 'number', 'text'],
    },
  }

  let dateData = {
    'addDate':'Know what date it will be when you add year(s), month(s) or day(s) to a date. Never miss track of date.',
    'subtractDate':'Know what date it will be when you subtract year(s), month(s) or day(s) to a date. Never miss track of date.',
    'howLongUntil':'Get to know the difference between two dates - In real time. 🌍'
  }

  let otherAppData = {
    'appside':{
      desc:'APPSIDE is an app with a collecton of games like quiz, tictactoe, memory game etc. The games are addictive and most of them are available offline.',  
      url: 'https://appside.com'
    },
    'comingSoon':{
      desc: 'COMING SOON Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam labore fuga iste ut aliquam saepe libero voluptas quam dolorem veritatis!',
      url: 'https://comingSoon.com'
    }
  }

  export {convData, baseData, dateData, otherAppData};