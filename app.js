
async function games() {
  const gameResponse = await fetch('https://www.cheapshark.com/api/1.0/deals?storeID=1');
  const games = await gameResponse.json();
  const gameListEl = document.querySelector('.game__list');
gameListEl.innerHTML = games
  .map(game => {
    let ratingColor = '';
    let countColor = '';
    if (game.steamRatingPercent < 70) {
      ratingColor = 'red';
      countColor = 'red';
    } else if (game.steamRatingPercent < 80) {
      ratingColor = '#F2921D';
      countColor = '#F2921D';
    } else if (game.steamRatingPercent < 90) {
      ratingColor = '#FCE22A';
      countColor = '#FCE22A';
    }
    return `
      <div class="game__card">
        <img src="${game.thumb}" alt="">
        <h2 class="game__title">${game.title}</h2>
        <div class="game__info--wrapper">
          <h3 class="game__rating" style="background-color: ${ratingColor};">${game.steamRatingPercent}</h3>
          <span class="game__count" style="color: ${countColor};">Rating based off ${game.steamRatingCount} reviews</span>
        </div>
        <div class="game__price">
          <span class="game__price--normal">${game.normalPrice}</span>
          <span class="game__price--sale">${game.salePrice}</span>
        </div>
        <a href="${game.metacriticLink}" target="_blank">
          <button class="btn">Buy Now</button>
        </a>              
        <h4 class="game__saving">${parseFloat(game.savings).toFixed(0)}% off</h4>
      </div>
    `;
  })
  .join('');

  const filterEl = document.querySelector('#filter');

filterEl.addEventListener('change', () => {
  const selectedOption = filterEl.value;
  if (selectedOption === 'priceHighToLow') {
    games.sort((a, b) => b.salePrice - a.salePrice);
  } else if (selectedOption === 'priceLowToHigh') {
    games.sort((a, b) => a.salePrice - b.salePrice);
  } else if (selectedOption === 'rating') {
    games.sort((a, b) => b.steamRatingPercent - a.steamRatingPercent);
  }
  const gameListEl = document.querySelector('.game__list');
  gameListEl.innerHTML = games
    .map(game => {
      let ratingColor = '';
    let countColor = '';
    if (game.steamRatingPercent < 70) {
      ratingColor = 'red';
      countColor = 'red';
    } else if (game.steamRatingPercent < 80) {
      ratingColor = '#F2921D';
      countColor = '#F2921D';
    } else if (game.steamRatingPercent < 90) {
      ratingColor = '#FCE22A';
      countColor = '#FCE22A';
    }
      return `
        <div class="game__card">
          <img src="${game.thumb}" alt="">
          <h2 class="game__title">${game.title}</h2>
          <div class="game__info--wrapper">
            <h3 class="game__rating" style="background-color: ${ratingColor};">${game.steamRatingPercent}</h3>
            <span class="game__count" style="color: ${countColor};">Rating based off ${game.steamRatingCount} reviews</span>
          </div>
          <div class="game__price">
            <span class="game__price--normal">$${game.normalPrice}</span>
            <span class="game__price--sale">$${game.salePrice}</span>
          </div>
          <a href="${game.metacriticLink}" target="_blank">
            <button class="btn">Buy Now</button>
          </a>              
          <h4 class="game__saving">${parseFloat(game.savings).toFixed(0)}% off</h4>
        </div>
      `;
    })
    .join('');
});

function searchGames() {
  const searchTerm = document.querySelector("#search-bar").value.toLowerCase();
  const filteredGames = games.filter(game => game.title.toLowerCase().includes(searchTerm));
  const gameListEl = document.querySelector(".game__list");
  gameListEl.innerHTML = filteredGames
    .map(game => 
      `<div class="game__card">
        <img src="${game.thumb}" alt="">
        <h2 class="game__title">${game.title}</h2>
        <div class="game__info--wrapper">
          <h3 class="game__rating">${game.steamRatingPercent}</h3>
          <span class="game__count">Rating based off ${game.steamRatingCount} reviews</span>
        </div>
        <div class="game__price">
          <span class="game__price--normal">$${game.normalPrice}</span>
          <span class="game__price--sale">$${game.salePrice}</span>
        </div>
        <a href="${game.metacriticLink}" target="_blank">
          <button class="btn">Buy Now</button>
        </a>              
        <h4 class="game__saving">${parseFloat(game.savings).toFixed(0)}% off</h4>
      </div>`
    ).join("");
}

const searchIcon = document.querySelector("#search-icon");
const searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    searchGames();
  }
});
searchIcon.addEventListener("click", searchGames);
}

games();