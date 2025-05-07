function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  for (var i = 0; i < uiBathrooms.length; i++) {
      if (uiBathrooms[i].checked) {
          return parseInt(uiBathrooms[i].value);
      }
  }
  return -1; // Invalid Value
}

function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");
  for (var i = 0; i < uiBHK.length; i++) {
      if (uiBHK[i].checked) {
          return parseInt(uiBHK[i].value);
      }
  }
  return -1; // Invalid Value
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");
  var sqft = document.getElementById("uiSqft").value;
  var bhk = getBHKValue();
  var bathrooms = getBathValue();
  var location = document.getElementById("uiLocations").value;
  var estPrice = document.getElementById("uiEstimatedPrice");

  var url = "http://127.0.0.1:5000/predict_home_price"; // Ensure this URL is correct

  $.post(url, {
      total_sqft: parseFloat(sqft),
      bhk: bhk,
      bath: bathrooms,
      location: location
  }, function (data, status) {
      console.log(data.estimated_price);
      estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
      console.log(status);

      // Show currency animation
      showCurrencyAnimation();
  });
}

function onPageLoad() {
  console.log("document loaded");
  var url = "http://127.0.0.1:5000/get_location_names"; // Ensure this URL is correct

  $.get(url, function (data, status) {
      console.log("got response for get_location_names request");
      if (data) {
          var locations = data.locations;
          var uiLocations = document.getElementById("uiLocations");
          $('#uiLocations').empty();
          for (var i in locations) {
              var opt = new Option(locations[i]);
              $('#uiLocations').append(opt);
          }
      }
  });
}

function showCurrencyAnimation() {
  var currencyAnimation = document.getElementById('currencyAnimation');
  currencyAnimation.style.display = 'block';
  setTimeout(function () {
      currencyAnimation.style.display = 'none';
  }, 3000);
}

function changeBackground(type) {
  var container = document.querySelector('.container');
  if (type === 'house') {
      container.classList.add('house-background');
      container.classList.remove('bathroom-background');
  } else if (type === 'bathroom') {
      container.classList.add('bathroom-background');
      container.classList.remove('house-background');
  } else {
      container.classList.remove('house-background');
      container.classList.remove('bathroom-background');
  }
}

window.onload = onPageLoad;

document.getElementById('bhkOptions').addEventListener('change', function () {
  changeBackground('house');
});

document.getElementById('bathOptions').addEventListener('change', function () {
  changeBackground('bathroom');
});
