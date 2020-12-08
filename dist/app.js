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
const imgContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let imgArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
const count = 30;
const apiKEY = 'N5_jPo_uNENR8TlxL19JonhCjKtfShdhCImjabmAp2s';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKEY}&count=${count}`;
const imageLoaded = () => {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        imagesLoaded = 0;
    }
};
const displayPhotos = (photos) => {
    totalImages = photos.length;
    photos.forEach((photo) => {
        const linkEl = document.createElement('a');
        linkEl.setAttribute('href', photo.links.html);
        linkEl.setAttribute('target', '_blank');
        const imgEl = document.createElement('img');
        imgEl.setAttribute('src', photo.urls.regular);
        imgEl.setAttribute('alt', photo.alt_description);
        imgEl.setAttribute('title', photo.alt_description);
        imgEl.addEventListener('load', imageLoaded);
        linkEl.appendChild(imgEl);
        imgContainer.appendChild(linkEl);
    });
};
const getPhotos = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(apiURL);
        const data = yield response.json();
        imgArray = [...data];
        displayPhotos(imgArray);
    }
    catch (error) {
        alert(`Something went wrong. Error: ${error}`);
    }
});
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
        ready) {
        ready = false;
        getPhotos();
    }
});
getPhotos();
