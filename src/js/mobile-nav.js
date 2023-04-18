const burger = document.getElementById("burger");
const mobileNav = document.getElementById("nav-mobile");

let open = false;

function showMobileNav() {
  mobileNav.classList.remove("hidden")
  open = true
}

function closeMobileNav() {
	mobileNav.classList.add("hidden");
	open = false;
}


burger.addEventListener("click", () => {
	console.log("hi")
  if (!open) showMobileNav()
	else closeMobileNav()
})