const card = document.querySelector(".card");

const flipCard = () => {
  card.classList.toggle("flipCard");
};

card.addEventListener("click", flipCard);
