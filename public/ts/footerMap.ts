interface Restaurant {
  location: { type: string; coordinates: [number, number] };
  name: string;
  address: string;
  postalCode: string;
}

const restaurants: Restaurant[] = [
  {
    location: { type: 'Point', coordinates: [25.018456, 60.228982] },
    name: 'Herkkutemppeli Viikki',
    address: 'Latokartanonkaari 9 A',
    postalCode: '00790',
  },
  {
    location: { type: 'Point', coordinates: [24.903147, 60.221729] },
    name: 'Herkkutemppeli Pohjois-Haaga',
    address: 'Ilkantie 3',
    postalCode: '00400',
  },
  {
    location: { type: 'Point', coordinates: [24.95576, 60.196672] },
    name: 'Herkkutemppeli Vallila',
    address: 'Hattulantie 2',
    postalCode: '00550',
  },
];

const map = L.map('map').setView([60.1699, 24.938], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);

const restaurantIcon = L.icon({
  iconUrl: '/image/restaurant-icon.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

restaurants.forEach((restaurant) => {
  const restaurantMarker = L.marker(
    [
      restaurant.location.coordinates[1],
      restaurant.location.coordinates[0],
    ],
    { icon: restaurantIcon }
  ).addTo(map);

  restaurantMarker
    .bindPopup('<h3>' + restaurant.name + '</h3>' + '<p>' + restaurant.address + '</p>')
    .openPopup();
});
