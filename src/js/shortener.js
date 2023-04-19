const form = document.getElementById("form-shortener");
const label = document.getElementById("label-shortener");
const input = document.getElementById("input-shortener");
const parentLinks = document.getElementById("links");

const links = [];
let error = false;

function handleError(msg) {
	// label
	label.classList.remove("hidden");
	label.innerText = msg;

	// input
	input.classList.add("error");

	error = true;
}

function clearError(time = 0) {
	const timeout = setTimeout(() => {
		label.classList.add("hidden");
		input.classList.remove("error");
		error = false
		return () => {
			clearTimeout(timeout);
		};
	}, time);
}

async function shorten(link = "") {
	const resp = await fetch(`https://api.shrtco.de/v2/shorten?url=${link}`);
	const data = await resp.json();

	try {
		const { full_short_link, original_link } = data.result;
		links.push({ og: original_link, s: full_short_link });
		localStorage.setItem("shortly:links", JSON.stringify(links));
	} catch (e) {
		if (data.error_code === 2) handleError("Invalid URL");
		if (data.error_code === 3) handleError("Try again in a few seconds");
	}
}

input.addEventListener("change", () => clearError());

form.addEventListener("submit", async (e) => {
	e.preventDefault();

	if (input.value === "") return handleError("Please add a link");
	await shorten(input.value);
	input.value = "";

	if (!error) window.location.reload();
});

window.onload = function () {
	links.push(...JSON.parse(localStorage.getItem("shortly:links")));

	let content = "";
	links.forEach((link, i) => {
		content += `
    <div class="link-container">
      <div
        class="flex flex-col gap-4 md:flex-1 md:flex-row md:justify-between"
      >
        <a href="${link.og}" class="truncate">${link.og}</a>

        <div class="relative md:hidden">
          <div class="link-divider"></div>
        </div>

        <a href="${link.s}" class="text-medium text-cyan"
          >${link.s}</a
        >
      </div>
      <button class="shortener-cta mt-0 md:w-32" id="btn-copy-${i}">Copy</button>
    </div>
    `;
	});
	parentLinks.innerHTML = content;
	links.forEach((link, i) => {
		const btnCopy = document.getElementById(`btn-copy-${i}`)
		btnCopy.addEventListener("click", () => {
			navigator.clipboard.writeText(link.s);

			btnCopy.innerText = "Copied!";
			btnCopy.classList.add("bg-dark-violet", "hover:bg-dark-violet");

			const timeout = setTimeout(() => {
				btnCopy.innerText = "Copy";
				btnCopy.classList.remove("bg-dark-violet", "hover:bg-dark-violet");
				return () => {
					clearTimeout(timeout);
				};
			}, 2000);
		})
	})
};
