const form= document.querySelector('form');
const radiusKM=document.querySelector('input');
const myIcon = new L.Icon({
  iconUrl: '../images/marcelo.jpg',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [35, 51],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

navigator.geolocation.getCurrentPosition(
  position=>{console.log(position.coords.longitude, position.coords.latitude);
    const mymap = L.map('mapid').setView([position.coords.latitude, position.coords.longitude], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: "Marcelo's World of Wonder",
    }).addTo(mymap);

    L.marker([position.coords.latitude, position.coords.longitude],{icon:myIcon}).bindTooltip('You are here').addTo(mymap);
    const restaurantLayers=L.layerGroup().addTo(mymap);

    form.addEventListener('submit', ev=>{
      ev.preventDefault();
      const inputValue=radiusKM.value;
      fetch('/shops/getByDistance',{
        method:'post',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({radius:inputValue, longitude:position.coords.longitude, latitude:position.coords.latitude})
      })
      .then(res=>res.json())
      .then(data=>{
        restaurantLayers.clearLayers();
        for(let i=0; i<data.length; i++){
          let toolTipContent=`<h4>${data[i].name}</h4><p>Cheapest Dish:${data[i].cheapestDish}€</p>
          <p>Distance from you:${Math.round(data[i].dist.calculated)}mts</p>`

          L.marker([data[i].location.coordinates[1], data[i].location.coordinates[0]])
          .bindTooltip(toolTipContent).openTooltip()
          .addTo(restaurantLayers);
        }
        mymap.setView([position.coords.latitude, position.coords.longitude], 6);
      })
    })

  })
