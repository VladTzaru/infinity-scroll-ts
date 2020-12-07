// Elem refs
const quoteContainerEl = document.getElementById(
  'quote-container'
) as HTMLElement;
const quoteEl = document.getElementById('quote') as HTMLElement;
const authorEl = document.getElementById('author') as HTMLElement;
const twitterBtnEl = document.getElementById('twitter') as HTMLElement;
const newQuoteBtnEl = document.getElementById('new-quote') as HTMLElement;
const loader = document.getElementById('loader') as HTMLElement;

// Style config
enum FontSize {
  Long = 'long-quote',
}

// State
let twitterQuote = '';
let twitterQuoteAuthor = '';

const loading = (): void => {
  loader.hidden = false;
  quoteContainerEl.hidden = true;
};

const completeLoading = (): void => {
  if (!loader.hidden) {
    quoteContainerEl.hidden = false;
    loader.hidden = true;
  }
};

const setTweetQuote = (quote: string, author: string): void => {
  twitterQuote = quote;
  twitterQuoteAuthor = author;
};

// Tweet quote
const tweetQuote = (quote: string, author: string): void => {
  const URL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(URL, '_blank');
};

// Render text in HTML elem
const renderText = (text: string = 'Unknown', el: HTMLElement): void => {
  text.length > 100
    ? el.classList.add(`${FontSize.Long}`)
    : el.classList.remove(`${FontSize.Long}`);

  el.textContent = text;
};

// Get quote form API
const getQuote = async (): Promise<void> => {
  loading();
  const proxyURL = 'https://cors-anywhere.herokuapp.com/';
  const apiURL =
    'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
    const response = await fetch(proxyURL + apiURL);
    const { quoteText, quoteAuthor } = await response.json();
    setTweetQuote(quoteText, quoteAuthor);
    renderText(quoteText, quoteEl);
    renderText(quoteAuthor, authorEl);
    completeLoading();
  } catch (error) {
    completeLoading();
    getQuote();
    console.log(error);
  }
};

// Event listeners
twitterBtnEl.addEventListener('click', () =>
  tweetQuote(twitterQuote, twitterQuoteAuthor)
);
newQuoteBtnEl.addEventListener('click', getQuote);

// Invoke
getQuote();
