const btn = document.querySelector("button");

const apiKey = `5da3ea1c435447d19cefc9f3c9d78e54`;

btn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    btn.innerText = "Your Browser Do Not Suppert";
  }
});

function onSuccess(position) {
  btn.innerText = "Browser is Detect Your Location Now...";
  let { latitude, longitude } = position.coords;
  let URL = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longitude}&key=${apiKey}`;
  setTimeout(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        let { continent, country, city, suburb, postcode } =
          result.results[0].components;
        // console.log(continent, country, city, suburb, postcode);
        btn.innerText = `${continent}, ${country} ${city}, ${suburb}, Post Code: ${postcode}`;
      });

    btn.disabled = true;
  }, 2000);
}

function onError(error) {
  console.log(error);
  if (error.code == 1) {
    btn.innerText = error.message;
  } else if (error.code == 2) {
    btn.innerText = "Your Browser Do Not Suppert";
  } else {
    btn.innerText = "Somthing is Wrong!";
  }

  btn.disabled = true;
}
