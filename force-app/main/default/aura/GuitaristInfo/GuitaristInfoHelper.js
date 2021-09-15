({
    handleImageClick: function (event) {

        // Since the onclick is on the div, sometimes the target is the image, sometimes it's the div
        // It depends on what was clicked. So if there's no sibling, we clicked the image. Otherwise, we clicked the div
        let text = event.target.nextElementSibling;
        if (!text) text = event.target.parentElement.nextElementSibling;

        // Expand or collapse the text based on it's current state
        if (text.classList.contains("collapsed")) {
            text.classList.remove("collapsed");
            text.classList.add("expanded");
        }
        else {
            text.classList.remove("expanded");
            text.classList.add("collapsed");
        }
    }
})
