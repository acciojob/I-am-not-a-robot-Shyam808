const imageContainer = document.getElementById("image-container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const message = document.getElementById("para");
const promptText = document.getElementById("h");

const imageClasses = ["img1", "img2", "img3", "img4", "img5"];
let selectedImages = [];

// Shuffle array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createImageGrid() {
  // Clear old content
  imageContainer.innerHTML = "";
  selectedImages = [];
  message.textContent = "";
  promptText.textContent = "Please click on the identical tiles to verify that you are not a robot.";
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";

  const images = [...imageClasses];
  const duplicateIndex = Math.floor(Math.random() * images.length);
  images.push(images[duplicateIndex]); // Add duplicate
  shuffle(images);

  images.forEach((imgClass, index) => {
    const img = document.createElement("img");
    img.classList.add(imgClass);
    img.setAttribute("data-class", imgClass);
    img.addEventListener("click", () => handleImageClick(img));
    imageContainer.appendChild(img);
  });
}

function handleImageClick(img) {
  if (selectedImages.length === 2) return;

  const alreadySelected = selectedImages.includes(img);
  if (!alreadySelected) {
    img.classList.add("selected");
    selectedImages.push(img);

    if (selectedImages.length === 1) {
      resetBtn.style.display = "inline-block";
    } else if (selectedImages.length === 2) {
      verifyBtn.style.display = "inline-block";
    }
  }
}

resetBtn.addEventListener("click", () => {
  selectedImages.forEach(img => img.classList.remove("selected"));
  selectedImages = [];
  verifyBtn.style.display = "none";
  message.textContent = "";
  promptText.textContent = "Please click on the identical tiles to verify that you are not a robot.";
});

verifyBtn.addEventListener("click", () => {
  const [img1, img2] = selectedImages;
  const class1 = img1.getAttribute("data-class");
  const class2 = img2.getAttribute("data-class");

  if (class1 === class2) {
    message.textContent = "You are a human. Congratulations!";
  } else {
    message.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }

  verifyBtn.style.display = "none";
});

window.onload = createImageGrid;
