let previousPrices = { btc: null, sol: null };

function updatePrices() {
  fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,solana&vs_currencies=usd')
    .then(response => response.json())
    .then(data => {
      const btcPrice = data.bitcoin.usd;
      const solPrice = data.solana.usd;

      updatePriceDisplay('btc', btcPrice);
      updatePriceDisplay('sol', solPrice);

      previousPrices.btc = btcPrice;
      previousPrices.sol = solPrice;
    })
    .catch(error => {
      console.error('Error al obtener los precios:', error);
    });
}

function updatePriceDisplay(crypto, currentPrice) {
  const priceElement = document.getElementById(`${crypto}-price`);
  const arrowElement = document.getElementById(`${crypto}-arrow`);

  priceElement.textContent = `$${currentPrice}`;

  if (previousPrices[crypto] !== null) {
    if (currentPrice > previousPrices[crypto]) {
      arrowElement.innerHTML = '↑';
      arrowElement.className = 'arrow up';
    } else if (currentPrice < previousPrices[crypto]) {
      arrowElement.innerHTML = '↓';
      arrowElement.className = 'arrow down';
    } else {
      arrowElement.innerHTML = '';
      arrowElement.className = 'arrow';
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  updatePrices();
  setInterval(updatePrices, 60000); // Actualiza cada 60 segundos
});