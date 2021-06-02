function search() {
  let input = document.getElementById("search").value;
  searchApi(input);
  document.getElementById("loading").style.display = "initial";
}

function searchApi(value) {
  const header = {
    method: "GET",
    Authorization: "Bearer 2162a51a55a6e4c79db8730927a51886",
  };
  const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${value}&limit=10&exchange=NASDAQ`;
  fetch(url, header)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      document.getElementById("results").innerHTML = "";

      for (let i = 0; i < data.length; i++) {
        const url2 = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${data[i].symbol}`;
        fetch(url2, header)
          .then((response) => {
            return response.json();
          })
          .then((company) => {
               const element=document.createElement("li") //cria o elemento lista
                element.innerHTML=`<img id="img-srch" src=${company.profile.image}><a href="/company.html?symbol=${company.symbol}"> ${company.profile.companyName} (${company.symbol}) ${company.profile.changesPercentage}</a>`//conteudo do list item que é o link com o simbolo vindo do input da busca do usuário                
                document.getElementById("results").appendChild(element) //coloca o elemento criado dentro da id results do html.
                document.getElementById("loading").style.display = "none"; //to stop the loading
                
            });
      }
    });
}




function getUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  let mySymbol = urlParams.get("symbol");
  profileApi(mySymbol);
  getChartData(mySymbol);
}

function profileApi(value) {
  const header = { method: "GET" };
  const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${value}`;
  fetch(url, header)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      document.getElementById("name").innerHTML = data.profile.companyName;
      document.getElementById("descr").innerHTML = data.profile.description;
      document.getElementById("link").innerHTML = data.profile.website;
      document.getElementById("link").setAttribute("href", data.profile.website);
      document.getElementById("img").setAttribute("src", data.profile.image);
      document.getElementById("change").innerHTML = data.profile.changesPercentage;
      if (data.profile.changesPercentage.includes("-") == true) {
        document.getElementById("change").style.color = "lightgreen";
      } else {
        document.getElementById("change").style.color = "red";
      }
      document.getElementById("price").innerHTML = "Stock price: " + data.profile.price;
    });
}
function getChartData(symbol) {
  let url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`;
  const header = { method: "GET" };
  fetch(url, header)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let dates = [];
      let prices = [];
      let cont = 0;
      for (let item of data.historical) {
        if (cont <= 20) {
          dates.push(item.date);
          prices.push(Number(item.close));
        }
        cont++;
      }
      generateChart(dates, prices);
      console.log(prices);
    });
}
function generateChart(labels, data) {
  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Stock price history",
          data: data,
          borderColor: "rgb(255,105,0)",
          pointBackgroundColor: "rgb(255,105,0)",
          tension: 0.3,
          fill: {
            target: "origin",
            above: "rgb(255,105,0)",
          },
          borderWidth: 1,
        },
      ],
    },
  });
}
