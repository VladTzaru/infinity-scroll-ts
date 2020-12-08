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
const count = 10;
const apiKEY = 'N5_jPo_uNENR8TlxL19JonhCjKtfShdhCImjabmAp2s';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKEY}&count=${count}`;
const displayPhotos = (photos) => {
    photos.forEach((photo) => {
        const linkEl = document.createElement('a');
        linkEl.setAttribute('href', photo.links.html);
        linkEl.setAttribute('target', '_blank');
        const imgEl = document.createElement('img');
        imgEl.setAttribute('href', photo.urls.regular);
        imgEl.setAttribute('alt', photo.alt_description);
        imgEl.setAttribute('title', photo.alt_description);
        linkEl.appendChild(imgEl);
        imgContainer === null || imgContainer === void 0 ? void 0 : imgContainer.appendChild(linkEl);
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
        console.log(error);
    }
});
getPhotos();
