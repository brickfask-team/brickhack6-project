const primaryApiKey = 'a974d0eda82f4ecb9b70b6a1857cc39b';
const secondaryApiKey = 'd311e5cd018e48e8ae545128f9bcca35';
let query = '';
let productSku = '';
let searchUrl = `https://api.wegmans.io/products/search?query=${query}&api-version=2018-10-18&subscription-key=${secondaryApiKey}`; 
let beerUrl = `https://api.wegmans.io/products/categories/6941-2521` +
  `?api-version=2018-10-18&subscription-key=${primaryApiKey}`;
let storeUrl = `https://api.wegmans.io/stores?Subscription-Key=${primaryApiKey}&api-version=2018-10-18`;

const user_location = document.getElementById('user_loc');
const btn = document.getElementById('btn');
const input = document.querySelector('[type="text"]');
let inputValue = '';

btn.addEventListener('click', () => {
  query = input.value;
  searchUrl = `https://api.wegmans.io/products/search?query=${query}&api-version=2018-10-18&subscription-key=${secondaryApiKey}`; 
  getSearchResults();
  getStores();
  // getAvailability();
});

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPosition);
  }
}

function getPosition(position) {
  user_location.innerHTML = position.coords.latitude + ' ' + position.coords.longitude;
}

getLocation();

function getDistance(lat1, lon1, lat2, lon2) {
  var R = 3963; // Radius of the earth in miles
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

function getStores() {
  fetch(storeUrl)
    .then(res => res.json())
    .then(data => {
      const stores = data.stores;
      getLocation();
      const user_latitude = user_location.innerText.split(' ')[0];
      const user_longitude = user_location.innerText.split(' ')[1];
      for (let i = 0; i < stores.length; i++) {
        stores[i].distance = getDistance(user_latitude, user_longitude, stores[i].latitude, stores[i].longitude);
      }
      stores.sort((store1, store2) => {
        return store1.distance - store2.distance;
      });
      let store_index = 0;
      for (let i = 0; i < stores.length; i++) {
        if (stores[i].distance < 10 && store_index < 10) {
          let store_distance = Math.round(stores[i].distance * 10) / 10;
          // addListElement(stores[i].number + ' ' + stores[i].name + ' ' + store_distance);
          store_index++;
        }
      }
    });
}

function getSearchResults() {
  fetch(searchUrl)
    .then(res => res.json())
    .then(data => {
      console.log(searchUrl);
      console.log(query);
      let results = data["results"];
      for (let i = 0; i < results.length; i++) {
        addListElement(results[i].name);
      }
    });
}

function compareStock() {
  for (let i = 0; i < 90; i++) {
    fetch(`https://api.wegmans.io/products/${results[i].sku}/availabilities?api-version=2018-10-18&Subscription-Key=${primaryApiKey}`, {
      mode: 'cors',
      header: {'Access-Control-Allow-Origin':'*'}})
      .then(res1 => res1.json())
      .then(info => {
        let isAvailable = info['chain']['isAvailable'];
        if(isAvailable) {
          for (let i = 0; i < info['stores'].length; i++) {
            for (let j = 0; j < 10; j++) {
              let closeNumber = skuArray[j].textContent.split(' ')[0];
              console.log(closeNumber);
              if (info['stores']['store'] == closeNumber) {
                let p = document.createElement('p');
                p.appendChild(document.createTextNode(closeNumber));
                document.appendChild(p);
                closeStores.push(info['stores']['store']);
              }
            }
          }
        }
      });
  }
}

function addListElement(product) {
  let ul = document.getElementsByTagName('ul');
  ul.innerHTML = '';
  let li = document.createElement('li');
  li.appendChild(document.createTextNode(product));
  ul[0].appendChild(li);
}

