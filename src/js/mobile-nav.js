const checkbox = document.getElementById("checkbox");
const mobileNavOverlay = document.getElementById("nav-mobile-overlay");
const mobileNav = document.getElementById("nav-mobile");

let open = false;

function openMobileNav() {
	mobileNavOverlay.classList.remove("hidden");
	mobileNavOverlay.classList.remove("fade-out-top");
	mobileNav.classList.remove("fade-in-top");
	mobileNav.classList.add("fade-in-top");
	open = true;
}

function closeMobileNav() {
	const timeout = setTimeout(() => {
		mobileNavOverlay.classList.add("hidden");
		return () => {
			clearTimeout(timeout);
		};
	}, 400);
	mobileNav.classList.remove("fade-in-top");
	mobileNavOverlay.classList.remove("fade-out-top");
	mobileNavOverlay.classList.add("fade-out-top");
	open = false;
	checkbox.checked = false;
}

checkbox.addEventListener("click", () => {
	if (!open) openMobileNav();
	else closeMobileNav();
});

mobileNavOverlay.addEventListener("click", closeMobileNav);
