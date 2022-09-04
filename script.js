

const imageContainer = document.getElementById('image-container');
const pageLoader = document.getElementById('page-loader');

let ready = false;
let imagesLoaded = 0;
let totalImages= 0;

let photosArray = [];

// unplash API
const photosToLoad = 3;
const imageSize = "regular";
const apiKey = '7B31_IL-q-490hufLlg5kA_Tfz7RKdCPBvvnZ3kbPaQ';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${photosToLoad}&urls=${imageSize}`;


/*<<<< IMAGE LOADED >>>>*/
function imageLoaded(){
 imagesLoaded++;
 if (imagesLoaded === (totalImages)){
    ready = true;
    pageLoader.hidden = true;
    console.log('ready =' + ready)
 }
}

/*<<<< HELPER FUNCTION >>>>*/

function setAttributes(element, attributes){
  for(const key in attributes){
    element.setAttribute(key, attributes[key])
  }
}

/*<<<< Create elements for links and photos >>>>*/
function displayFotos(){
  // ⇓ Reseting imagesLoaded is the answer of the tutorial  
  imagesLoaded = 0;
  // ⇓ following solution works, but is not the right answer for the project; 
  // totalImages = photosArray.length + imagesLoaded;
  // ⇓ following code woks but won't load more images if is not corrected 
  totalImages = photosArray.length;


  console.log('total images = ' + totalImages);

  photosArray.forEach((photo) => {
    // Create <a> to link to unsplash

    const item = document.createElement('a');
    setAttributes(item,{
      href:photo.links.html,
      target: '_blank'
    })
    // item.setAttribute('href', photo.links.html);
    // item.setAttribute('target','_blank');

    //create <img>

    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    })
    // img.setAttribute('src', photo.urls.regular);
    // img.setAttribute('alt', photo.alt_description);
    // img.setAttribute('title', photo.alt_description);

    /*<<<< CHECK WHEN EACH IS FINISHE LOADING >>>>*/
    img.addEventListener('load', imageLoaded);
    // image inside <a>
    item.appendChild(img);
    imageContainer.appendChild(item);

  });
}


/*<<<< GET PHOTOS FROM UNSPLASH >>>>*/

async function getPhotosUnsplah(){
  try{
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayFotos();

  } catch (error){
    //Catch error
  }
}
// Check if scroll is near the page

window.addEventListener('scroll', ()=>{
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
    console.log('ready after scroll = '+ ready);
    getPhotosUnsplah();
    ready = false;
    // console.log(`window.innerHeight: ${window.innerHeight}`);
  //   console.log(``);
  //   console.log(``);
  //   console.log(``);
  //   console.log('load more');
  }
});

//Load
getPhotosUnsplah();