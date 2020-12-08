const imgContainer = document.getElementById('image-container') as HTMLElement;
const loader = document.getElementById('loader') as HTMLElement;

let imgArray: object[] = [];

const count = 10;
const apiKEY = 'N5_jPo_uNENR8TlxL19JonhCjKtfShdhCImjabmAp2s';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKEY}&count=${count}`;

const displayPhotos = (photos: object[]): void => {
  photos.forEach((photo: any): void => {
    // Create <a>
    const linkEl = document.createElement('a');
    linkEl.setAttribute('href', photo.links.html);
    linkEl.setAttribute('target', '_blank');

    // Create <img>
    const imgEl = document.createElement('img');
    imgEl.setAttribute('src', photo.urls.regular);
    imgEl.setAttribute('alt', photo.alt_description);
    imgEl.setAttribute('title', photo.alt_description);

    // Put <img> inside <a>, then put both inside imgContainer element
    linkEl.appendChild(imgEl);
    imgContainer.appendChild(linkEl);
  });
};

const getPhotos = async (): Promise<void | string[]> => {
  try {
    const response = await fetch(apiURL);
    const data: object[] = await response.json();
    imgArray = [...data];
    displayPhotos(imgArray);
  } catch (error) {
    console.log(error);
  }
};

getPhotos();
