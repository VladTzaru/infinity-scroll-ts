"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const quoteContainerEl = document.getElementById('quote-container');
const quoteEl = document.getElementById('quote');
const authorEl = document.getElementById('author');
const twitterBtnEl = document.getElementById('twitter');
const newQuoteBtnEl = document.getElementById('new-quote');
var FontSize;
(function (FontSize) {
    FontSize["Long"] = "long-quote";
})(FontSize || (FontSize = {}));
let loading = false;
let twitterQuote = '';
let twitterQuoteAuthor = '';
const setTweetQuote = (quote, author) => {
    twitterQuote = quote;
    twitterQuoteAuthor = author;
};
const tweetQuote = (quote, author) => {
    const URL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(URL, '_blank');
};
const renderText = (text = 'Unknown', el) => {
    text.length > 100
        ? el.classList.add(`${FontSize.Long}`)
        : el.classList.remove(`${FontSize.Long}`);
    el.textContent = text;
};
const getQuote = () => __awaiter(void 0, void 0, void 0, function* () {
    const proxyURL = 'https://cors-anywhere.herokuapp.com/';
    const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = yield fetch(proxyURL + apiURL);
        const { quoteText, quoteAuthor } = yield response.json();
        setTweetQuote(quoteText, quoteAuthor);
        renderText(quoteText, quoteEl);
        renderText(quoteAuthor, authorEl);
    }
    catch (error) {
        getQuote();
        console.log(error);
    }
});
twitterBtnEl.addEventListener('click', () => tweetQuote(twitterQuote, twitterQuoteAuthor));
newQuoteBtnEl.addEventListener('click', getQuote);
getQuote();
