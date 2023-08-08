document.addEventListener(`DOMContentLoaded`, init);


function addMoviesToNav(){
    fetch(`http://localhost:3000/movies`)
    .then(r => r.json())
    .then(movies => movies.forEach(movie => addMoviesToNavHelper(movie)))
}

function addMoviesToNavHelper(movieObj){
    const img = document.createElement(`img`);
        img.src = movieObj[`image`];
    const nav = document.querySelector(`nav#movie-list`);
        nav.append(img);
    
    img.addEventListener(`click`, () => setScreen(movieObj));
}

function setScreen(movieObj){
    const title = document.querySelector(`h1#title`);
    const yearReleased = document.querySelector(`h3#year-released`);
    const description = document.querySelector(`p#description`);
    const bloodAmount = document.querySelector(`span#amount`);
    const watchedButton = document.querySelector(`button#watched`)
    const bloodForm = document.querySelector(`form#blood-form`);

    title.textContent = movieObj[`title`];
    yearReleased.textContent = movieObj[`release_year`];
    description.textContent = movieObj[`description`];
    bloodAmount.textContent = movieObj[`blood_amount`];
    if(movieObj[`watched`]){
        watchedButton.textContent = `Watched`;
    } else {
        watchedButton.textContent = `Unwatched`;
    }
    
    
    watchedButton.addEventListener(`click`, () => {
        movieObj[`watched`] = !movieObj[`watched`];
        fetch(`http://localhost:3000/movies/${movieObj[`id`]}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(movieObj)
        })

        if(movieObj[`watched`]){
            watchedButton.textContent = `Watched`;
        } else {
            watchedButton.textContent = `Unwatched`;
        }
    })
    bloodForm.addEventListener(`submit`, (e) => {
        e.preventDefault();
        const bloodInput = document.querySelector(`input#blood-amount`);
        movieObj[`blood_amount`] += parseInt(bloodInput.value);
        fetch(`http://localhost:3000/movies/${movieObj[`id`]}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(movieObj)
        })
        .then(resp => bloodAmount.textContent = movieObj[`blood_amount`])
    })
}

function setInitContent(){
    fetch(`http://localhost:3000/movies`)
    .then(r => r.json())
    .then(movies => {
        setScreen(movies[0])
    })
}



function init(){
    addMoviesToNav();
    setInitContent();
}