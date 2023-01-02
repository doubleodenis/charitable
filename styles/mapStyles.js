const WATER_COLOR = "#72d2e0";
const HIGHWAY_COLOR = "#e39568";
const BACKGROUND_COLOR = "#fff8f0";
const LOCAL_ROAD_COLOR = "#ffd5bd";

const mapStyles = [
    {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "landscape.man_made",
        elementType: "geometry.fill",
        stylers: [
            {
                color: BACKGROUND_COLOR,
            },
        ],
    },
    {
        featureType: "landscape.natural",
        elementType: "geometry.fill",
        stylers: [
            {
                color: BACKGROUND_COLOR,
            },
        ],
    },
    {
        featureType: "poi",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "road",
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [
            {
                color: HIGHWAY_COLOR,
            },
        ],
    },
    {
        featureType: "road.local",
        elementType: "geometry.fill",
        stylers: [
            {
                color: LOCAL_ROAD_COLOR,
            },
        ],
    },
    {
        featureType: "transit",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "water",
        stylers: [
            {
                color: WATER_COLOR,
            },
        ],
    },
];

export default mapStyles;
