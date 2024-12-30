const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherContetions = document.getElementById("weather-contetions");
// let card;
searchBtn.addEventListener("click", () => {
  const city = cityInput.value;
  console.log(city);
  console.log("Clicked");
  const URL_API = `http://api.weatherapi.com/v1/forecast.json?key=ad4fc9ddaca04689b64115059240412&q=${city}&days=8&aqi=no&alerts=no`;
  fetch(URL_API)
    .then((response) => {
      console.log(response.ok, response.status);
      if (!response.ok) {
        // حذف الكاردات القديمة
        weatherContetions.innerHTML = `
        <div class="not-found">
                <img width="40" src="./Animation - 1733425239611.gif" alt="">
                <h3>City not found</h3>
            </div>
        `
      }
      return response.json();
    })
    .then((response) => {
      const city = response.location.name; // البلد
      const country = response.location.country; // البلد
      const forecastDays = response.forecast.forecastday; // بيانات الأيام الخمسة
      weatherContetions.innerHTML = ``

      // عرض البيانات
      forecastDays.forEach((day, index) => {
        const date = day.date; // التاريخ
        const temperature = day.day.avgtemp_c; // درجة الحرارة المتوسطة
        const humidity = day.day.avghumidity; // الرطوبة المتوسطة
        const weatherCondition = day.day.condition.text; // حالة الطقس
        const weatherIcon = day.day.condition.icon; // صورة حالة الطقس

        
        weatherContetions.innerHTML += `
            <input type="checkbox" id="card${index}" style="display: none;">
            <label for="card${index}" class="weather-contetion">
            <div class="front">
            <div class="date">${date.split("-")[1] + "-" + date.split("-")[2]}</div>
                    <h4 class="city-name">${city}</h4>
                    <h6 class="country-name">${country}</h6>
                    <p style="font-size: 13px;" class="temperature">
                        ${temperature}<sup style="font-size: 10px;">°C</sup>
                    </p>
                    <p style="font-size: 13px;" class="humidity">Humidity:
                    ${humidity}<sup style="font-size: 10px;">%</sup>
                    </p>
                    
                </div>
                <div class="back">
                    <h4 class="city-name">${city}</h4>
                    <p style="margin: 0;font-size: 13px;" class="contetion">${weatherCondition}</p>
                    <p style="margin: -5px;" class="weather-description">
                        <img width="90px" src="${weatherIcon}" alt="Weather Icon">
                    </p>
                </div>
            </label>
        `;

        // console.log(`التاريخ: ${date}`);
        console.log(date.split('-'));
      });
    });
});
