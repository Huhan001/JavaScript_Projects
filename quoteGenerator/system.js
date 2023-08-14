// loading fundtion
let qoutes = []
let api = async () => {
    loading();
    try {
        const newa = await fetch('https://jacintodesign.github.io/quotes-api/data/quotes.json');
        qoutes = await newa.json();
        randomqoute();
    } catch (error){
        console.log('not looking so good', error)
    }
}

//=====================================
//signle rnadom qoute
//=====================================
let randomqoute = () => {
    loading();
    let qoute =  qoutes[Math.floor(Math.random() * qoutes.length)];
    
    // to check if author field is blank and replace with uknow if empty
    if(qoute.author == 'Anonymous') {
        authotext.textContent = 'Unknown'
    } else {
        authotext.textContent = qoute.author;
    }
    
    if(qoute.text == null){
        qouteText.textContent = 'Run Once More'
        authotext.textContent = 'Dev'
    }
    //set the qoute and hide the loader
    qouteText.textContent = qoute.text;
    complete();
}
// DOM manupulation
const qouteContainer = document.getElementById('qoute-container');
const qouteText = document.getElementById('qoute');
const authotext = document.getElementById('author');
const tiwtterButton = document.getElementById('twitter');
const newqouteButton = document.getElementById('newqoute');
const loader = document.getElementById('loader');



// =============================================
function tweetQoute() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${qouteText.textContent} - ${authotext.textContent}`;
    window.open(twitterUrl, '_blank');
}

// evemt listeners
newqouteButton.addEventListener('click', randomqoute)
tiwtterButton.addEventListener('click', tweetQoute)

// spinners
let loading = () => {
    loader.hidden = false;
    qouteContainer.hidden = true;
}

//hide loading
let complete = () => {
    qouteContainer.hidden = false;
    loader.hidden = true;
}

// load content
api();