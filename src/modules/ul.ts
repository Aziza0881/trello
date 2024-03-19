import { Reload } from "../types";
const places: NodeListOf<HTMLDivElement> = document.querySelectorAll(".tasks");

export function reload({ arr, places }: Reload) {
	places.forEach((el) => (el.innerHTML = ""));

	for (let item of arr) {
		const div = document.createElement("div");
		const title = document.createElement("span");
		const description = document.createElement("p");

		div.classList.add("item");
		div.draggable = true;
		title.innerHTML = item.title;
		description.innerHTML = item.description;

		div.append(title, description);
		places[0].append(div);

		div.ondragstart = () => {
			div.classList.add("hold");
            div.id = "selected"
			setTimeout(() => {
				div.classList.add("invisible");
			}, 0);
		};
		div.ondragend = () => {
			div.classList.remove("hold");
			div.classList.remove("invisible");
            div.removeAttribute('id')
		};
	}
}

for (let place of places) {
    let parent = place.parentElement as HTMLDivElement

	parent.ondragenter = () => {
		parent.style.border = "2px dashed black";
	};
	parent.ondragover = (e) => {
		e.preventDefault();
	};
	parent.ondragleave = () => {
		parent.style.border = "none";
	};
	parent.ondrop = () => {
        parent.style.border = "none";

        let selected:any = document.getElementById('selected')
        selected.id = ""

        place.append(selected)


		






		parent.ondrop = () => {
			parent.style.border = "none";
		
			let selected: HTMLElement | null = document.getElementById('selected');
			if (selected) {
				selected.id = "";
				place.append(selected);
		
				
				let divIndex = Array.from(places).indexOf(place);
				let titleElement = selected.querySelector("span");
				if (titleElement) {
					titleElement.innerHTML = (divIndex + 1).toString();
				}
				
				
				let itemTitle = titleElement ? titleElement.innerHTML : "";
				let itemId = selected.dataset.id; 
		
				
				fetch(`/api/updateItem/${itemId}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ title: itemTitle }),
				})
				.then((response) => response.json())
				.then((data) => {
					
					console.log(data);
				})
				.catch((error) => {
					
					console.error(error);
				});
			}
		};
		
		
	};
}
