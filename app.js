const map = L.map("map").setView([21.7679, 78.8718], 5);
const tileurl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>contributors, Coded by Shrey Raj';

const tiles = L.tileLayer(tileurl, { attribution });
tiles.addTo(map);

function generateList() {
  const ul = document.querySelector(".list");

  stores_list.forEach((shop) => {
    const li = document.createElement("li");
    const div = document.createElement("div");
    const a = document.createElement("a");
    const p = document.createElement("p");

    div.addEventListener("click", () => flyToStore(shop));

    div.classList.add("shop-item");
    a.innerText = shop.name;
    a.href = "#";
    p.innerText = shop.location;
    p.classList.add("shop-location");

    // li>(div>(a+p))
    div.appendChild(a);
    div.appendChild(p);
    li.appendChild(div);
    ul.appendChild(li);
  });
}

generateList();

function popContent(shop) {
  const data = 
  `<div>
      <h4>${shop.name}</h4>
      <p>${shop.location}</p>
      <div class="phone_number">
          <a href="tel:${shop.phone_number}">+91 ${shop.phone_number}</a>
      </div>
  </div>
  `
  ;
  return data ; 
}

const icon = L.icon({
  iconUrl: "pizza.png",
  iconSize: [40, 45], //[Width , Height]
});

stores_list.forEach((shop) => {
  L.marker([shop.coordinates.latitude, shop.coordinates.longitude], {
    icon: icon,
  })
    .bindPopup(
      `<div>
  <h4>${shop.name}</h4>
  <p>${shop.location}</p>
  <div class="phone_number">
      <a href="tel:${shop.phone_number}">+91 ${shop.phone_number}</a>
  </div>
</div>`,
      { offset: L.point(0, -8) }
    )
    .addTo(map);
});

//They are "flyTo" function in leaflet librarywhich accepts longitude first and then latitude
function flyToStore(store) {

  const lat = store.coordinates.longitude;
  const long = store.coordinates.latitude;

  map.flyTo([long, lat], 15, { duration: 3 });

  L.popup({ offset: L.point(0, -8) })
    .setLatLng([lat, long])
    .setContent(popContent(store))
    .openOn(map);
}
