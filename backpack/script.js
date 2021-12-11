import backpackObjectArray from "./components/data.js";

const lidToggle = function (event, button, newArg) {
  console.log(event);
  console.log(newArg);

  let backpackObject = backpackObjectArray.find(({ id }) => id === button.parentElement.id);
  backpackObject.lidOpen == true ? (backpackObject.lidOpen = false) : (backpackObject.lidOpen = true);
  button.innerText == "Open lid" ? (button.innerText = "Close lid") : (button.innerText = "Open lid");
  let status = button.parentElement.querySelector(".backpack__lid span");
  status.innerText == "closed" ? (status.innerText = "open") : (status.innerText = "closed");
};

const newStrapLength = (strapArray) => {
  strapArray.forEach((listElement) => {
    let side = listElement.getAttribute("data-side");
    const lengthForm = document.createElement("form");
    lengthForm.classList.add(`${side}length`);
    lengthForm.innerHTML = `
      <input type="number" name="${side}Length" placeholder="New ${side} length">
      <button>Update</button>
    `;

    lengthForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let newValue = lengthForm.querySelector("input").value;
      listElement.querySelector("span").innerHTML = `${newValue} inches`;
      lengthForm.querySelector("input").value = "";
    });

    listElement.append(lengthForm);
  });
};

const backpackList = backpackObjectArray.map((backpack) => {
  let backpackArticle = document.createElement("article");
  backpackArticle.classList.add("backpack");
  backpackArticle.setAttribute("id", backpack.id);

  backpackArticle.innerHTML = `
    <figure class="backpack__image">
      <img src="everyday.svg" alt="" loading="lazy" />
    </figure>
    <h1 class="backpack__name">${backpack.name}</h1>
    <ul class="backpack__features">
      <li class="feature backpack__volume">Volume:<span> ${backpack.volume}l</span></li>
      <li class="feature backpack__color">Color:<span> ${backpack.color}</span></li>
      <li class="feature backpack__age">Age:<span> ${backpack.backpackAge()} days old</span></li>
      <li class="feature backpack__pockets">Number of pockets:<span> ${backpack.pocketNum}</span></li>
      <li class="feature backpack__strap" data-side="left">Left strap length: <span>${
        backpack.strapLength.left
      } inches</span></li>
      <li class="feature backpack__strap" data-side="right">Right strap length: <span>${
        backpack.strapLength.right
      } inches</span></li>
      <li class="feature backpack__lid">Lid status: <span>${backpack.lidOpen ? "open" : "closed"}</span></li>
    </ul>
    <button class="lid-toggle">Open lid</button>
  `;

  let length = backpackArticle.querySelectorAll(".backpack__strap");
  newStrapLength(length);
  let button = backpackArticle.querySelector(".lid-toggle");
  let newArg = "The argument I want to pass to the callback function!";
  button.addEventListener("click", (event) => {
    lidToggle(event, button, newArg);
  });
  return backpackArticle;
});

const main = document.querySelector(".maincontent");

backpackList.forEach((backpack) => {
  main.append(backpack);
});