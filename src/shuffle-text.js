const shuffleCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&*";

function shuffleText(element) {
  const finalText = element.dataset.text || element.textContent.trim();
  const letters = finalText.split("");
  let frame = 0;
  const totalFrames = 34;

  element.dataset.text = finalText;
  element.setAttribute("aria-label", finalText);

  const animation = setInterval(() => {
    const progress = frame / totalFrames;

    element.textContent = letters
      .map((letter, index) => {
        if (letter === " ") {
          return " ";
        }

        const letterProgress = index / letters.length;

        if (progress > letterProgress + 0.28) {
          return letter;
        }

        const randomIndex = Math.floor(Math.random() * shuffleCharacters.length);
        return shuffleCharacters[randomIndex];
      })
      .join("");

    frame += 1;

    if (frame > totalFrames) {
      clearInterval(animation);
      element.textContent = finalText;
    }
  }, 45);
}

document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const shuffleElements = document.querySelectorAll("[data-shuffle-text]");

  shuffleElements.forEach((element) => {
    element.dataset.text = element.textContent.trim();

    if (!prefersReducedMotion) {
      shuffleText(element);
      element.addEventListener("mouseenter", () => shuffleText(element));
      element.addEventListener("focus", () => shuffleText(element));
    }
  });
});
