const memeDiv = document.getElementById('catfactdiv');
const btn = document.getElementById('btn');

async function fetchMeme() {
    const response = await fetch('https://api.imgflip.com/get_memes');
    const data = await response.json();

    if (data.success) {
        const meme = data.data.memes[Math.floor(Math.random() * data.data.memes.length)];
        const img = document.createElement('img');
        img.src = meme.url;
        img.alt = meme.name;
        img.style.maxWidth = '100%'; // Ensures the image fits the div
        memeDiv.innerHTML = ''; // Clear any previous meme
        memeDiv.appendChild(img);
    } else {
        memeDiv.textContent = 'Failed to load meme.';
    }
}

btn.addEventListener('click', fetchMeme);
