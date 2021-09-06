var request = new XMLHttpRequest()

request.open("GET", "http://localhost:8000/api/v1/titles/?year=1993&min_year=&max_year=&imdb_score=6&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=", true)
request.onload = function() {
	// Begin accessing JSON data here
	var data = JSON.parse(this.response)
	// getting the length of data
	console.log(data.count)
	// split the data into sections
	const wrapper = document.getElementsByClassName("wrapper")[0]
	let sectionId = 1
	for (let i = 0; i < data.count; i += 5) {
		// Runs 5 times, with values of i 0 through 4.
		console.log(i);
		console.log('Adding a section');
		// Create section
		const section = document.createElement("section")
		section.id = `section${sectionId}`
		// Create next and previous buttons
		const arrowLeft = document.createElement("a")
		arrowLeft.href = `#section${sectionId-1}`
		arrowLeft.classList.add("arrow__btn", "left-arrow")
		const arrowRight = document.createElement("a")
		arrowRight.href = `#section${sectionId+1}`
		arrowRight.classList.add("arrow__btn", "right-arrow")
		section.appendChild(arrowLeft)
		section.appendChild(arrowRight)
		if (request.status >= 200 && request.status < 400) {
			data.results.forEach((movie) => {
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
			})
		} else {
			console.log("error")
		}
		sectionId++
		wrapper.appendChild(section)
	}

}
const app = document.getElementById("root")

request.send()

app.appendChild(logo)

// const logo = document.createElement("img")
// logo.src = "juststreamit_logo.png"


// const section1 = document.getElementById("section1")


// app.appendChild(section1)
