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
const count = 30;
let imgArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
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
const createLinkEl = (src, target = '_blank') => {
    const linkEl = document.createElement('a');
    linkEl.setAttribute('href', src);
    linkEl.setAttribute('target', target);
    return linkEl;
};
const createImgEl = (src, alt, title, eListener) => {
    const imgEl = document.createElement('img');
    imgEl.setAttribute('src', src);
    imgEl.setAttribute('alt', alt);
    imgEl.setAttribute('title', title);
    imgEl.addEventListener('load', eListener);
    return imgEl;
};
const displayPhotos = (photos) => {
    totalImages = photos.length;
    photos.forEach((photo) => {
        const aEl = createLinkEl(photo.links.html);
        const imgEl = createImgEl(photo.urls.regular, photo.alt_description, photo.alt_description, imageLoaded);
        aEl.appendChild(imgEl);
        imgContainer.appendChild(aEl);
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
