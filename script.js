// do promise validate promise

// code w Axios
// import axios from '.node_modules/axios.js';

const root = "http://localhost:8000/api/v1/titles/"

var dict = {
	sort_by: "-imdb_score",
	year: 2020

}


const createSection = (row, number) => {
	// create a section with id number +1
	let section = document.createElement("section")
	section.id = `section${number+1}`
	// create the arriw left
	let leftArrow = document.createElement("a")
	leftArrow.href=`#section${number}`
	leftArrow.classList.add("arrow__btn", "left-arrow")
	leftArrow.textContent = "‹"
	section.appendChild(leftArrow)
	// for each item in row, create the item
	row.forEach(item => {
		let divItem = document.createElement("div")
		divItem.classList.add("item")
		let image = document.createElement("img")
		image.src = `${item.image_url}`
		divItem.appendChild(image)
		// append each item to the section
		section.appendChild(divItem)
	})
	// create and append the arrow right
	let rightArrow = document.createElement("a")
	rightArrow.href=`#section${number+2}`
	rightArrow.classList.add("arrow__btn", "right-arrow")
	rightArrow.textContent = "›"
	section.appendChild(rightArrow)
	// return the section
	return section
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
	const numPages = Math.ceil(response.data.count / 5)
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
	const carousel = document.getElementById(id)
	table.forEach( (row, index)  => {
		// slide should return an html object
		slide = createSection(row, index)
		carousel.appendChild(slide)
	})
}



loadCarousel("bestMovies", {
	sort_by: "-imdb_score",
	year: 2020
})

loadCarousel("worstOfCage", {
	actor : "Nicolas Cage",
	sort_by: "imdb_score"
})

loadCarousel("2010", {
	sort_by: "-imdb_score",
	year: 2010
})




// const createSection = (page, sectionName) => {
// 	console.log(`section: ${sectionName}`)
// 	var section = document.getElementById(sectionName)
// 	console.log(section)
// 	if (section == null) {
// 		section = document.createElement("section")
// 	} else {
// 		section = document.getElementById(sectionName)
// 		section.innerHTML = ""
// 		console.log("else")
// 	}
// 	section.id = sectionName
// 	section.classList.add("section")
// 	const wrap = document.getElementsByClassName("wrapper")[0]
// 	wrap.appendChild(section)
// 	console.log(section)

// 	const items = page.results
// 	const arrowLeft = document.createElement("a")
// 	arrowLeft.onclick = function() {
// 		getPage(page.previous, {}, sectionName)
// 	}
// 	arrowLeft.textContent = "‹"
// 	arrowLeft.href = `#section5`
// 	arrowLeft.classList.add("arrow__btn", "left-arrow")
// 	const arrowRight = document.createElement("a")
// 	// arrowRight.href = `#` // try calling function getPage with the next page
// 	arrowRight.onclick = function() {
// 		getPage(page.next, {}, sectionName)
// 	}
// 	arrowRight.classList.add("arrow__btn", "right-arrow")
// 	arrowRight.textContent = "›"
// 	section.appendChild(arrowLeft)
// 	section.appendChild(arrowRight)

// 	console.log(items)
// 	items.forEach(function(item) {
// 		movie = createItem(item)
// 		section.appendChild(movie)
// 	})
// };

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
