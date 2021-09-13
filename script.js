// do promise validate promise

// code w Axios
// import axios from '.node_modules/axios.js';

const root = "http://localhost:8000/api/v1/titles/"

var dict = {
	sort_by : "-imdb_score"
}

function getPage(root, dict, sectionName) {
	axios.get(root, {
		params: dict
	}).then(function(response) {
		const page = response.data
		createSection(page, sectionName)
	}).catch(function(error){
		console.log(error)
	})
}

const createSection = (page, sectionName) => {
	console.log(`section: ${sectionName}`)
	var section = document.getElementById(sectionName)
	console.log(section)
	if (section == null) {
		section = document.createElement("section")
	} else {
		section = document.getElementById(sectionName)
		section.innerHTML = ""
		console.log("else")
	}
	section.id = sectionName
	section.classList.add("section")
	const wrap = document.getElementsByClassName("wrapper")[0]
	wrap.appendChild(section)
	console.log(section)

	const items = page.results
	const arrowLeft = document.createElement("a")
	arrowLeft.onclick = function() {
		getPage(page.previous, {}, sectionName)
	}
	arrowLeft.textContent = "‹"
	arrowLeft.href = `#section5`
	arrowLeft.classList.add("arrow__btn", "left-arrow")
	const arrowRight = document.createElement("a")
	// arrowRight.href = `#` // try calling function getPage with the next page
	arrowRight.onclick = function() {
		getPage(page.next, {}, sectionName)
	}
	arrowRight.classList.add("arrow__btn", "right-arrow")
	arrowRight.textContent = "›"
	section.appendChild(arrowLeft)
	section.appendChild(arrowRight)

	console.log(items)
	items.forEach(function(item) {
		movie = createItem(item)
		section.appendChild(movie)
	})
};

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
	}).catch(function(error){
		console.log(error)
	})
}

const app = document.getElementById("root")


getPage(root, {sort_by : "-imdb_score"}, "best_movies")
// getBestMovie(root, {sort_by : "-imdb_score"})

// getPage(root, {sort_by : "-imdb_score", actor : "Nicolas Cage"}, "worst_of_cage")



