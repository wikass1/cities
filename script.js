const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
      let cities = [];
      const searchInput = document.querySelector('.search');
      const suggestions = document.querySelector('.suggestions');
      const suggestionsInnerDefault = suggestions.innerHTML;
      fetch(endpoint).then(blob => blob.json()).then(data => cities.push(...data));

      const findMatches = function(wordToMatch, cities) {
        if(!wordToMatch) return;
        wordToMatch = wordToMatch.replace(wordToMatch[0], wordToMatch[0].toUpperCase());
        return cities.filter(place => {
          return place.city.includes(wordToMatch) || place.state.includes(wordToMatch)
        })
      }



      const highlightedString = function(value,city) {
        const regex = new RegExp(value,'gi');
        return city.replace(regex, `<span class="hl">${value}</span>`);
      }



      const displayMatches = function() {
        const matchArray = findMatches(this.value, cities);
        suggestions.innerHTML = suggestionsInnerDefault;
        if(!matchArray) return;
        const html = matchArray.map(place => {
          return `
          <li>
            <span class="name">${highlightedString(this.value,place.city)}, ${highlightedString(this.value,place.state)}</span>
              <div>
               <img style="width: 6px;" src="human_icon.svg" alt="human">
              <span class="population">${place.population}</span>
              </div>
            </li>
          `
        }).join('');
        suggestions.innerHTML = html;

      }

      searchInput.addEventListener('input', displayMatches);

