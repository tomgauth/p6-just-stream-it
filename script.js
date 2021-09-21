const root = "http://localhost:8000/api/v1/titles/"

const body = document.body

const modal = document.getElementById("itemModal")
const closeBtn = document.getElementsByClassName("close")[0];
//CAROUSEL JS

closeBtn.onclick = function() {
	console.log("close")
	modal.style.display = "none";
	modalContent = modal.querySelector('.modal-content')
	textArea = modalContent.querySelector('.textArea')
	textArea.innerHTML = ""
}

const openItemModal = () => {
	console.log("open")
	modal.style.display = "block";
}

const slideNext = (evt) => {
	// get the carousel inner
	// get the other arrow
	let tracks = document.getElementsByClassName('track')
	let track = tracks[evt.currentTarget.id]
	console.log(track)
	console.log(track.index)
	console.log(track.offsetWidth)
	console.log(track.index * 200)
	if (track.offsetWidth - (track.index * 200) < 1000) {} else {
		track.index++
			track.style.transform = `translateX(-${track.index * 200}px)`;
	}
}


const slidePrev = (evt) => {
	let tracks = document.getElementsByClassName('track')
	let track = tracks[evt.currentTarget.id]
	console.log(track)
	//track = section
	// evt.currentTarget.classList.remove('hide');
	console.log(evt.currentTarget)
	console.log(track.index)
	if (track.index <= 0) {
		console.log("triggered")
		evt.currentTarget.classList.remove('show')
	} else {
		track.index--;
		track.style.transform = `translateX(-${track.index * 200}px)`;
	}

}


// API JS


const openModal = (id) => {
	// get modal by id
	selectedModal = document.getElementById(`myModal${id}`);
	console.log(selectedModal)
	selectedModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal

const closeModal = (id) => {
	selectedModal = document.getElementById(`myModal${id}`);
	console.log(selectedModal)
	selectedModal.style.display = "none";

}

const createModal = async (itemId) => {
	// get the data from the API from itemId
	let target = root.concat(itemId)
	response = await axios.get(target)
	console.log(response.data)
	modalContent = modal.querySelector('.modal-content')
	textArea = modalContent.querySelector('.textArea')
	let item = response.data
	console.log(textArea.textContent)
	// parse the item data into the modal template
	// open the modal
	// create the modal <div id="myModal" class="modal">
	// <div class="modal-content">
	let image = document.createElement("img")
	image.src = `${item.image_url}`
	textArea.appendChild(image)



	let title = document.createElement("h1")
	title.textContent = `${item.title}`


	let genres = document.createElement("p")
	genres.textContent = `${item.genres}`


	let releaseDate = document.createElement("p")
	releaseDate.textContent = `Release Date: ${item.date_published}`

	let year = document.createElement("p")
	year.textContent = `${item.year}`
	let rated = document.createElement("p")
	rated.textContent = `Rated: ${item.rated}`
	let imdbScore = document.createElement("p")
	imdbScore.textContent = `IMDB Score: ${item.imdb_score}`
	let directors = document.createElement("p")
	directors.textContent = `Director: ${item.directors}`
	let actors = document.createElement("p")
	actors.textContent = `Actors: ${item.actors}`
	let duration = document.createElement("p")
	duration.textContent = `Duration: ${item.duration}`
	let country = document.createElement("p")
	country.textContent = `Country: ${item.countries}`
	let boxOffice = document.createElement("p")
	boxOffice.textContent = `Box Office: ${item.worldwide_gross_income}`
	let summary = document.createElement("p")
	boxOffice.textContent = `Summary: ${item.long_description}`
	textArea.appendChild(title)
	textArea.appendChild(genres)
	textArea.appendChild(year)
	textArea.appendChild(rated)
	textArea.appendChild(imdbScore)
	textArea.appendChild(directors)
	textArea.appendChild(actors)
	textArea.appendChild(duration)
	textArea.appendChild(country)
	textArea.appendChild(boxOffice)
	textArea.appendChild(summary)


	console.log(modal)
	openItemModal()
}

const createSection = (items, id) => {
	console.log("Id + Items: "+id+" -- "+items)
	let carouselContainer = document.getElementById(id)
	console.log('carouselContainer: ' + carouselContainer)
	let carouselInner = carouselContainer.getElementsByClassName('carousel-inner')[0]
	let track = carouselInner.getElementsByClassName('track')[0]
	track.id = id
	track.index = 0
	// create the arrow left
	let leftArrow = document.createElement("a")
	leftArrow.classList.add("arrow__btn", "left-arrow")
	leftArrow.textContent = "‹"
	leftArrow.id = id
	leftArrow.addEventListener("click", slidePrev)
	carouselContainer.appendChild(leftArrow)
	// for each item in row, create the item
	items.forEach(item => {
		console.log(item)
		let divItem = document.createElement("div")
		divItem.classList.add("item")
		console.log("item.id " + item.id)
		itemId = item.id
		divItem.setAttribute("onclick", "createModal(" + itemId.toString() + ")")
		let image = document.createElement("img")
		image.src = `${item.image_url}`
		// let modal = createModal(item)
		divItem.appendChild(image)
		body.appendChild(modal)
		// append each item to the section
		track.appendChild(divItem)
	})
	console.log(track)
	// create and append the arrow right
	let rightArrow = document.createElement("a")
	rightArrow.classList.add("arrow__btn", "right-arrow")
	rightArrow.textContent = "›"
	rightArrow.id = id
	console.log(typeof(id))
	rightArrow.addEventListener("click", slideNext)
	carouselContainer.appendChild(rightArrow)
}

const splitMovies = (allPages) => {
	let movies = []
	allPages.forEach(page =>
		movies = movies.concat(page.data.results)
	)
	table = []
	for (let i = 0; i < movies.length; i += 7)
		table.push(movies.slice(i, i + 7));
	return table
}

async function loadCarousel(id, dict) {
	// load page 1 and 2 only (need only 7 movies)
	dict.page = 1
	console.log('calling page 1');
	let pageOne = await axios.get(root, {
		params: dict
	})
	dict.page = 2
	console.log('calling page 2');
	let pageTwo = await axios.get(root, {
		params: dict
	})
	console.log(pageTwo)
	let items = pageOne.data.results.concat(pageTwo.data.results.slice(0,1))
	console.log(items)
	createSection(items, id)
}



loadCarousel("bestMovies", {
	sort_by: "-imdb_score",
})

loadCarousel("bestBiographies", {
	sort_by: "-imdb_score",
	genre_contains: "Biography"
})

loadCarousel("bestOfComedy", {
	sort_by: "-imdb_score",
	genre_contains: "Comedy"
})

loadCarousel("bestOfDrama", {
	sort_by: "-imdb_score",
	genre_contains: "Drama"
})



// pass the section as an argument instead of fetching it back each time
const createItem = (movie) => {
	const item = document.createElement("div")
	item.classList.add("item")
	const a = document.createElement("a")
	a.href = "#"
	const h1 = document.createElement("h1")
	h1.classList.add("heading")
	h1.textContent = `${movie.title}`
	const img = document.createElement("img")
	img.src = `${movie.image_url}`
	img.alt.textContent = `${movie.title}`
	a.appendChild(img)
	a.appendChild(h1)
	item.appendChild(a)
	return item
};


function getBestMovie() {
	axios.get(root, {
		params: {
			sort_by: "-imdb_score"
		}
	}).then(function(response) {
		let movieId = response.data.results[0].id
		console.log(movieId)
		let target = root.concat(movieId)
		axios.get(target).then(function(response) {
			movie = response.data
			console.log(movie.image_url)
			let title = document.createElement("h1")
			title.textContent = `${movie.title}`
			let heroContent = document.getElementsByClassName("heroContent")[0]
			heroContent.appendChild(title)
			const hero = document.getElementsByClassName("hero")[0]
			hero.style.backgroundImage = "url(" + movie.image_url + ")"
			let description = document.createElement("p")
			description.textContent = `${movie.long_description}`
			heroContent.appendChild(description)
			let button = document.createElement("button")
			button.textContent = "Play"
			heroContent.appendChild(button)
		})
	}).catch(function(error) {
		console.log(error)
	})

}

getBestMovie()

const app = document.getElementById("root")


// getPage(root, {
// 	sort_by: "-imdb_score"
// }, "best_movies")
// getBestMovie(root, {sort_by : "-imdb_score"})

// getPage(root, {sort_by : "-imdb_score", actor : "Nicolas Cage"}, "worst_of_cage")
