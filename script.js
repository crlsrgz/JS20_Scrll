const imageContainer = document.getElementById('image-container');
const imageLoader = document.getElementById('image-loader');

let photosArray = [];

// unplash API
const photosToLoad = 5;
const apiKey = '7B31_IL-q-490hufLlg5kA_Tfz7RKdCPBvvnZ3kbPaQ';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${photosToLoad}`;


/*<<<< HELPER FUNCTION >>>>*/

function setAttributes(element, attributes){
  for(const key in attributes){
    element.setAttribute(key, attributes[key])
  }
}

/*<<<< Create elements for links and photos >>>>*/
function displayFotos(){
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


//Load
getPhotosUnsplah();