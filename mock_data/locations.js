// id would be a mongo id when using actual data
const locations = [
    {
        id: "loc-1",
        name: "West Side Charity",
        verified: true,
        location: {
            latitude: 25.749453720964627,
            longitude: -80.43116023876958,
        },
        needed: ["Clothes", "Toiletries", "Food"],
    },
    {
        id: "loc-2",
        name: "House of the Charitable Mother, Rosalia",
        verified: true,
        location: {
            latitude: 25.762711286682713,
            longitude: -80.41442325489555,
        },
        needed: ["Clothes", "Toiletries", "Food", "Furniture", "Love"],
    },
    {
        id: "loc-3",
        name: "Help N' Stuff",
        verified: true,
        location: { latitude: 25.7296096113518, longitude: -80.42653963518707 },
        needed: ["Beds", "Pillows", "Sheets"],
    },
    {
        id: "loc-4",
        name: "Maybe Helpful, Plenty Loveful",
        location: {
            latitude: 25.729040404646806,
            longitude: -80.4424467748986,
        },
    },
    {
        id: "loc-5",
        name: "A Little Bit of Anything for Everybody",
        location: {
            latitude: 25.72873235951904,
            longitude: -80.40869443206228,
        },
        needed: [
            "Apples",
            "Oranges",
            "Tomatoes",
            "Lettuce",
            "Tangerine",
            "Tangerong",
            "Tango-Foxtrot",
            "Dolls",
        ],
    },
    {
        id: "loc-6",
        name: "Juicy Donations",
        location: { latitude: 25.750648336254542, longitude: -80.427481457967 },
        needed: ["Apples", "Oranges", "Tomatoes"],
    },
    {
        id: "loc-7",
        name: "Fairly Generous House",
        needed: [
            "Obtuse",
            "Rubber Goose",
            "Green Moose",
            "Guava Juice",
            "Giant Snake",
            "Birthday Cake",
            "Large Fries",
            "Chocolate Shake",
        ],
    },
    {
        id: "loc-8",
        name: "The Best Charity",
        needed: ["Papers", "Rocks", "Scissors"],
    },
    {
        id: "loc-9",
        name: "Few Favorite Things",
        verified: true,
        location: {
            latitude: 25.70224358854062,
            longitude: -80.45539867970086,
        },
        needed: [
            "Raindrops on Roses",
            "Whiskers on Kittens",
            "Bright Copper Kettles",
            "Warm Woolen Mittens",
        ],
    },
    {
        id: "loc-10",
        name: "One Left Standing Charitable Donations",
        location: {
            latitude: 25.71282498502033,
            longitude: -80.45157511715661,
        },
        needed: ["Able Bodies", "Blood", "Sweat", "Tears"],
    },
];

export default locations;
