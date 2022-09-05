const imageContainer = document.getElementById('image-container');
const pagePreloader = document.getElementById('page-loader');

let ready = false;
let imagesLoaded = 0;
let totalImages= 0;

let photosArray = [];

// unplash API
const photosToLoad = 3;
const imageSize = "small";
const apiKey = '7B31_IL-q-490hufLlg5kA_Tfz7RKdCPBvvnZ3kbPaQ';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${photosToLoad}&urls=${imageSize}`;


/*<<<< IMAGE LOADED >>>>*/
function imageLoaded(){
 imagesLoaded++;
 if (imagesLoaded === (totalImages)){
    ready = true;
    pagePreloader.hidden = true;
    // console.log('ready =' + ready)
 }
}

/*<<<< HELPER FUNCTION >>>>*/

function setTagAttributes(element, attributes){
  for(const key in attributes){
    element.setAttribute(key, attributes[key])
  }
}

/*<<<< Create elements for links and photos >>>>*/
function displayFotos(){
  // ⇓ Reseting imagesLoaded is the answer of the tutorial  
  imagesLoaded = 0;
  // ⇓ following solution works, but is not the right answer for the project
  // totalImages = photosArray.length + imagesLoaded;
  // ⇓ following code woks but won't load more images if imagesLoaded is not set to 0
  totalImages = photosArray.length;

  // console.log('total images = ' + totalImages);

  photosArray.forEach((photo) => {
    // Create <a> to link to unsplash
    const item = document.createElement('a');

    // item.setAttribute('href', photo.links.html);
    // item.setAttribute('target','_blank');
    // ⇓ Replaced: item.setAttributes with the setTagAttributes.

    setTagAttributes(item,{
      href:photo.links.html,
      target: '_blank'
    })    

    //create <img>
    const img = document.createElement('img');

    // img.setAttribute('src', photo.urls.regular);
    // img.setAttribute('alt', photo.alt_description);
    // img.setAttribute('title', photo.alt_description);
    // ⇓ Replaced: item.setAttributes with the setTagAttributes.

    setTagAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    })

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

/*<<<< Check if scroll is near the page >>>>*/

window.addEventListener('scroll', ()=>{
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
    console.log('ready after scroll = '+ ready);
    getPhotosUnsplah();
    ready = false;
    
    // ⇓ Check heights of the document and window
    console.log(`window.innerHeight: ${window.innerHeight}`);
    console.log(`window.scrollY: ${window.scrollY}` );
    console.log(`window.innerHeight + window.scrollY: ${window.innerHeight + window.scrollY}` );
    console.log(`document.body.offsetHeight - 1000: ${document.body.offsetHeight - 1000}`);    
    console.log('load more');
  }
});

//Load
getPhotosUnsplah();