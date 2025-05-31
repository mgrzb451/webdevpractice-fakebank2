// Create new account modal
const buttonOpenNewAccountModal = document.getElementById("button-open-new-account-modal");
const buttonCloseNewAccountModal = document.getElementById("button-close-new-account-modal")
const openAccountModal = document.getElementById("new-account-modal");

buttonOpenNewAccountModal.addEventListener("click", function(){
    openAccountModal.showModal()
})

buttonCloseNewAccountModal.addEventListener("click", function() {
    openAccountModal.close()
})

// Nav link hover opacity
const headerLogo = document.getElementById("header-logo")
const navLinksContainer = document.getElementById("nav-links-container")
function focusLink(event) {
    // Assign opacity of 50% to the logo and all the links in the nav except the link being hovered over
    const hoveredLink = event.target
    headerLogo.style.opacity = "0.5"
    for (const link of navLinksContainer.children) {
        if (link !== hoveredLink) {
            link.style.opacity = "0.5"
        }
    }
}
function unfocusLink() {
    // When no links are hovered reset the opacity back to 100%
    headerLogo.style.opacity = "1"
    for (const link of navLinksContainer.children) {
            link.style.opacity = "1"
    }
}
// Assigning the functions above the each of the links in the <ul> element
for (const link of navLinksContainer.children) {
    link.addEventListener("mouseenter", focusLink);
    link.addEventListener("mouseleave", unfocusLink);
}

// STICKY HEADER
const header = document.querySelector("header");
const headerThreshold = document.getElementById("header-threshold")
// we want to act when the bottom of the nav moves out of view
const headerObserverOptions = {
    threshold: 0
}
// a state variable to avoid constantly toggling the .header-sticky class
let stuck = false
function stickHeader(entries) {
    if (!entries[0].isIntersecting && !stuck) {
        // header is out of view and it's not sticky
        header.classList.add("header-sticky")
        stuck = true
        // add sticky and change the state variable
    }
    else if (entries[0].isIntersecting && stuck) {
        // header moved into view and is already sticky
        header.classList.remove("header-sticky")
        stuck = false
        // remove sticky and update flag
    }
}
const headerObserver = new IntersectionObserver(stickHeader, headerObserverOptions);
headerObserver.observe(headerThreshold)

// SLIDE-IN SECTION HEADERS
const featuresSectionHeading = document.getElementById("features-section-heading")
const operationsSectionHeading = document.getElementById("operations-section-heading")
const testimonialsSectionHeading = document.getElementById("testimonials-section-heading")
const ctaSection = document.getElementById("cta-section")
const slidingHeadings = [
    featuresSectionHeading,
    operationsSectionHeading,
    testimonialsSectionHeading,
    ctaSection
]

const slidingHeadingsObserverOptions = {
    threshold: .9
}

function slideInHeading (entries, observer) {
    // Once the heading moves sufficiently into view remove the hiding class
    if (entries[0].isIntersecting) {
        entries[0].target.classList.remove("slide-in-hidden")
        // the effect will only happen on the first scroll-through the page
        observer.unobserve(entries[0].target)
    }
}

const slidingHeadingsObserver = new IntersectionObserver (slideInHeading, slidingHeadingsObserverOptions)
for (const heading of slidingHeadings) {
    // hide the section headings initially only if the user supports JS
    heading.classList.add("slide-in-hidden")
    slidingHeadingsObserver.observe(heading)
}

// LAZY LOAD FEATURE SECTION IMAGES
// get all images with a data-src property in their HTML tag
const lazyImages = document.querySelectorAll("img[data-src]")
const lazyImagesObserverOptions = {
    // we want the loading to happen offscreen - 200px before the image comes into view
    rootMargin: "200px"
}

function fullyLoadImg(entries, observer) {
    const imgEntry = entries[0]
    if (imgEntry.isIntersecting) {
        // replace the src path with the one for a full-sized image and load it
        imgEntry.target.src = imgEntry.target.dataset["src"]
        // once the full image has loaded remove the blur effect
        imgEntry.target.addEventListener("load", function () {
            imgEntry.target.classList.remove("blur-lazy-img")
        })
        // stop observing the current image
        observer.unobserve(imgEntry.target)
    }
}

const lazyImagesObserver = new IntersectionObserver(fullyLoadImg, lazyImagesObserverOptions)
for (const lazyImg of lazyImages) {
    lazyImagesObserver.observe(lazyImg)
}