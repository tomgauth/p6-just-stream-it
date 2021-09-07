// do promise validate promise

// code w Axios
// import axios from '.node_modules/axios.js';

const root = "http://localhost:8000/api/v1/titles/"

var dict = {
	year: 1997
}



function getPage(root, dict) {
	axios.get(root, {
		params: dict
	}).then(function(response) {
		const page = response.data
		createSection(page)
	})
}

const createSections = () => {
		getPage(root, dict)
}

const createSection = (page) => {
	const section = document.createElement("section")
	section.id = "section1"
	const wrapper = document.getElementsByClassName("wrapper")[0]
	wrapper.appendChild(section)
	console.log(section)
	const items = page.results
	console.log(items)
	items.forEach(function(item){
		createItem(item)
	})
};

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
	const section = document.getElementById("section1")
	console.log(section)
	// Append the items to the container element
	section.appendChild(item)
	// Each item will contain an h1 and a p
	a.appendChild(img)
	a.appendChild(h1)
	item.appendChild(a)
};


// call the first page result
// while (data.next !== null) {
// create the section
// for each item, create item
// append to the section
// increment sectionId ++
//
// }



function getPageTitles() {

	axios.get(root, {
			params: {
				year: 1998,
			}
		})
		.then(response => {
			const nextPage = response.data.next
			const titles = response.data.results;

			//const wrapper = document.getElementsByClassName("wrapper")[0]
			console.log(response.data)
			console.log(titles)

			// while data.next !== null() {}
			// create the 5 items for the page
			// add it to the section
			// increment sectionId ++
			// move to the next page

		})
		.catch(function(error) {
			console.log(error);
		})
		.then(function() {
			// always executed
		});
}

// var request = new XMLHttpRequest()

// request.open("GET", "http://localhost:8000/api/v1/titles/?year=1993&min_year=&max_year=&imdb_score=6&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=", true)
// request.onload = function() {
// if (request.status >= 200 && request.status < 400) {

// Begin accessing JSON data here



// split the data into sections
// const wrapper = document.getElementsByClassName("wrapper")[0]
// let sectionId = 1
// next = data.next
// while (next !== null) {
// create the 5 items

// }



// Runs 5 times, with values of i 0 through 4.
console.log(i);
console.log('Adding a section');
// sectionItems = data.results.range(i,i+5)
console.log(data.results)

// Create section
const section = document.createElement("section")
section.id = `section${sectionId}`

// Create next and previous buttons
const arrowLeft = document.createElement("a")
arrowLeft.textContent = "‹"
arrowLeft.href = `#section${sectionId-1}`
arrowLeft.classList.add("arrow__btn", "left-arrow")
const arrowRight = document.createElement("a")
arrowRight.href = `#section${sectionId+1}`
arrowRight.classList.add("arrow__btn", "right-arrow")
arrowRight.textContent = "›"
section.appendChild(arrowLeft)
section.appendChild(arrowRight)

// loop through the 5 next movies

// Create a div with a item class
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
// Append the items to the container element
section.appendChild(item)
// Each item will contain an h1 and a p
a.appendChild(img)
a.appendChild(h1)
item.appendChild(a)
// item.appendChild(p)
//		sectionId++
//		wrapper.appendChild(section)
//	} else {
//		console.log("error")
//	}
//}


const app = document.getElementById("root")

request.send()

app.appendChild(logo)

// const logo = document.createElement("img")
// logo.src = "juststreamit_logo.png"


// const section1 = document.getElementById("section1")


// app.appendChild(section1)
