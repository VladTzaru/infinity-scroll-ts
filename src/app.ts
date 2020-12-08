// DOM ref
const imgContainer = document.getElementById('image-container') as HTMLElement;
const loader = document.getElementById('loader') as HTMLElement;

// State
const count = 30;
let imgArray: object[] = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Configuration
const apiKEY = 'N5_jPo_uNENR8TlxL19JonhCjKtfShdhCImjabmAp2s';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKEY}&count=${count}`;

const imageLoaded = (): void => {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    imagesLoaded = 0;
  }
};

// Create <a> and set attributes
const createLinkEl = (src: string): HTMLElement => {
  const linkEl = document.createElement('a');
  linkEl.setAttribute('href', src);
  linkEl.setAttribute('target', '_blank');
  return linkEl;
};

// Create <img> and set attributes
const createImgEl = (
  src: string,
  alt: string,
  title: string,
  eventListner: () => void
): HTMLElement => {
  const imgEl = document.createElement('img');
  imgEl.setAttribute('src', src);
  imgEl.setAttribute('alt', alt);
  imgEl.setAttribute('title', title);

  imgEl.addEventListener('load', imageLoaded);
  return imgEl;
};

// Render images on the screen
const displayPhotos = (photos: object[]): void => {
  totalImages = photos.length;
  // Used any because I life is too short
  photos.forEach((photo: any): void => {
    const aEl = createLinkEl(photo.links.html);
    const imgEl = createImgEl(
      photo.urls.regular,
      photo.alt_description,
      photo.alt_description,
      imageLoaded
    );
    // Put <img> inside <a>, then put both inside imgContainer element
    aEl.appendChild(imgEl);
    imgContainer.appendChild(aEl);
  });
};

const getPhotos = async (): Promise<void | string[]> => {
  try {
    const response = await fetch(apiURL);
    const data: object[] = await response.json();
    imgArray = [...data];
    displayPhotos(imgArray);
  } catch (error) {
    alert(`Something went wrong. Error: ${error}`);
  }
};

// Call getPhotos after scroll has (almost) ended
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// Invoke stuff
getPhotos();
