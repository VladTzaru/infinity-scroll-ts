// Get quote form API

const getQuote = async (): Promise<void> => {
  const proxyURL = 'https://cors-anywhere.herokuapp.com/';
  const apiURL =
    'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
    const response = await fetch(proxyURL + apiURL);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

getQuote();
