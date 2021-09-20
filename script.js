const root = "http://localhost:8000/api/v1/titles/"

const body = document.body



//CAROUSEL JS

const prev = document.querySelector('.left-arrow');
const next = document.querySelector('.right-arrow');

// const track = document.querySelector('.track');

let index = 0;


const slideNext = (id, index) => {
	index++;
	prev.classList.add('show');
	tracks = document.getElementsByClassName('track')
	track = tracks[id]
	console.log(track)
	track.style.transform = `translateX(-${index * 200}px)`;
	console.log(track.offsetWidth)
	console.log(index * 200)
	if (track.offsetWidth - (index * 200) < 1200) {
		next.classList.add('hide');
	}
}


const slidePrev = () => {
	index--;
	track = section
	next.classList.remove('hide');
	if (index === 0) {
		prev.classList.remove('show');
	}
	track.style.transform = `translateX(-${index * 200}px)`;
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

const createModal = (item) => {
	// create the modal <div id="myModal" class="modal">
	let myModal = document.createElement("div")
	myModal.classList.add("modal")
	myModal.id = `myModal${item.id}`
	// <div class="modal-content">
	let modalContent = document.createElement("div")
	modalContent.classList.add("modal-content")
	// <span class="close">&times;</span>
	let closeButton = document.createElement("span")
	closeButton.classList.add("close")
	closeButton.innerHTML = "&times;"
	let image = document.createElement("img")
	image.src = `${item.image_url}`

	let textArea = document.createElement("div")
	textArea.classList.add("textArea")
	let title = document.createElement("h1")
	title.textContent = `${item.title}`
	console.log(item.title)
	let genres = document.createElement("p")
	genres.textContent = `${item.genres}`
	let year = document.createElement("p")
	year.textContent = `${item.year}`
	// let rating = document.createElement("p")
	// title.textContent = `${item.rating}`
	let imdbScore = document.createElement("p")
	imdbScore.textContent = `${item.imdb_score}`
	let directors = document.createElement("p")
	directors.textContent = `${item.directors}`
	let actors = document.createElement("p")
	actors.textContent = `${item.actors}`
	// let duration = document.createElement("p")
	// title.textContent = `${item.duration}`
	// let country = document.createElement("p")
	// title.textContent = `${item.country}`
	// let boxOffice = document.createElement("p")
	// boxOffice.textContent = `${item.boxOffice}`
	// let summary = document.createElement("p")
	// boxOffice.textContent = `${item.summary}`
	textArea.appendChild(title)
	textArea.appendChild(genres)
	textArea.appendChild(year)
	// textArea.appendChild(rating)
	textArea.appendChild(imdbScore)
	textArea.appendChild(directors)
	textArea.appendChild(actors)
	// textArea.appendChild(duration)
	// textArea.appendChild(country)
	// textArea.appendChild(boxOffice)
	// textArea.appendChild(summary)
	modalContent.appendChild(closeButton)
	modalContent.appendChild(image)
	modalContent.appendChild(textArea)
	myModal.appendChild(modalContent)
	itemId = item.id
	console.log("itemId: " + itemId)
	myModal.setAttribute("onclick", "closeModal(" + itemId.toString() + ")")
	console.log(myModal)
	return myModal
}

const createSection = (row, id) => {
	let carouselContainer = document.getElementById(id)
	console.log('carouselContainer: ' + carouselContainer)
	let carouselInner = carouselContainer.getElementsByClassName('carousel-inner')[0]
	let track = carouselInner.getElementsByClassName('track')[0]
	track.id = id
	// create the arrow left
	let leftArrow = document.createElement("a")
	leftArrow.classList.add("arrow__btn", "left-arrow")
	leftArrow.textContent = "‹"
	leftArrow.addEventListener("click", slidePrev)
	carouselContainer.appendChild(leftArrow)
	// for each item in row, create the item
	row.forEach(item => {
		console.log(item)
		let divItem = document.createElement("div")
		divItem.classList.add("item")
		console.log("item.id " + item.id)
		itemId = item.id
		divItem.setAttribute("onclick", "openModal(" + itemId.toString() + ")")
		let image = document.createElement("img")
		image.src = `${item.image_url}`
		let modal = createModal(item)
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
	console.log(index)
	console.log(typeof(id))
	console.log(typeof(index))
	console.log("slideNext("+ id.toString()+","+index+")")
	let param = "slideNext("+ id.toString()+","+index+")"
	rightArrow.addEventListener("click", param)
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
	console.log('calling');
	response = await axios.get(root, {
		params: dict
	})
	console.log(response)
	const numPages = 2; // Math.ceil(response.data.count / 5)
	console.log(numPages);
	// now get an array of all the requests
	requests = []
	for (var i = 1; i <= numPages; i++) {
		dict.page = i
		request = axios.get(root, {
			params: dict
		})
		requests.push(request)
	}
	console.log(requests)
	allPages = await axios.all(requests)
	console.log(allPages)
	table = splitMovies(allPages)
	createSection(table[0], id)
}



// loadCarousel("bestMovies", {
// 	sort_by: "-imdb_score",
// 	year: 2020
// })

loadCarousel("worstOfCage", {
	actor: "Nicolas Cage",
	sort_by: "imdb_score"
})

// loadCarousel("2010", {
// 	sort_by: "-imdb_score",
// 	year: 2010
// })



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


function getBestMovie(root, dict) {
	axios.get(root, {
		params: dict
	}).then(function(response) {
		const movie = response.data.results[0]
		console.log(movie)
		const bestMovie = document.createElement("img")
		bestMovie.src = `${movie.image_url}`
		const sectionBestMovie = document.getElementsByClassName("topMovie")[0]
		sectionBestMovie.appendChild(bestMovie)
	}).catch(function(error) {
		console.log(error)
	})
}

const app = document.getElementById("root")


// getPage(root, {
// 	sort_by: "-imdb_score"
// }, "best_movies")
// getBestMovie(root, {sort_by : "-imdb_score"})

// getPage(root, {sort_by : "-imdb_score", actor : "Nicolas Cage"}, "worst_of_cage")
