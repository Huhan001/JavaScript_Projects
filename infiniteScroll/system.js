//========================== build containers

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('leader');


// unsplash API
const count = 10
const apiKey = 'DtxrcAd1Ex-hMRFhtty3EPOvu3rLU2a74qJ5XJ3GATM';
const url = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


//imageloade function

let photosArray = [];


//create elements for links & photos
const displayphotos = () => {
    photosArray.forEach((photo) => {
        // creating an anchor element to link to unsplash
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        
        //create <img> for photo
        const img = document.createElement('img');
        img.setAttribute('src',photo.urls.regular);
        img.setAttribute('alt',photo.alt_description);
        img.setAttribute('title',photo.alt_description)
        //event listener image load.
        
        //put both <a> and <img. inside our container.
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

const fetchApi = async () => {
    try {
        let firstStep = await fetch(url)
        photosArray = await firstStep.json();
        displayphotos();
    }catch (error) {
        console.log('not looking soo good', error)
    }
}


// infintie scroll mechanism. 
fetchApi()
const scrolled = () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        fetchApi();
    }
}
// check for scrilling
document.addEventListener('scroll', scrolled);
