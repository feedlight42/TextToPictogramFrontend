// Grab necessary elements
const textInput = document.getElementById("text-input");
const languageSelector = document.getElementById("language");
const submitBtn = document.getElementById("submit-btn");
const translatedTextElement = document.getElementById("translated-text");
const pictogramImageElement = document.getElementById("pictogram");

const apiUrl = "https://feedlight42-text2picto.hf.space/v1/translate"; // Hugging Face Space API URL

// Event listener for button click
submitBtn.addEventListener("click", async function () {
    const text = textInput.value.trim();
    const language = languageSelector.value;

    if (text === "") {
        alert("Please enter some text.");
        return;
    }

    // Make API request
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                src: text,
                language: language,
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch data from API");
        }

        const data = await response.json();

        // Update UI with response data
        translatedTextElement.innerText = data.tgt; // Show translated sentence
        pictogramImageElement.src = `data:image/png;base64,${data.image_base64}`; // Show base64 image
        pictogramImageElement.alt = "Pictogram for " + data.src; // Add alt text for image

    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while fetching the translation. Please try again.");
    }
});
