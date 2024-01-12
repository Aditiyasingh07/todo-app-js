const addCardBtn = document.getElementById("add-card-btn");
const addCardBtn2 = document.getElementById("add-card-btn-2");
let cards = [];
let cardId;

addCardBtn.addEventListener("click", () => {
  const popup = document.getElementById("popup-container");
  popup.style.display = "block";
  let noItem = document.querySelector(".no-item");
  noItem.style.display = "none";
});

// close Add card popup
function closeAddCardPopup() {
  const popup = document.getElementById("popup-container");
  popup.style.display = "none";
}

function newAddCard() {
  const cardText = document.getElementById("card-name").value;
  const card = {
    id: new Date().getTime().toString(),
    cardTitle: cardText,
    content: [],
  };
  if (cardText) {
    cards.push(card);
    renderCards(); // calling function
  } else {
    alert("Add Your Card Name !");
  }
  document.getElementById("card-name").value = "";
  closeAddCardPopup();
}

function renderContent() {
  for (let i = 0; i < cards.length; i++) {
    const ul = document.getElementById(`content_list_${cards[i].id}`);
    let child = "";
    for (let j = 0; j < cards[i].content.length; j++) {
      const content = cards[i].content[j];
      
      child += `<li class ="content ${content.done ? "checked" : "" }" id="content_${content.id}" onclick="doneTask(${content.id},${cards[i].id })">${content.contentText }</li>`;
    }
    ul.innerHTML = child;
  }
}      

function renderCards() {
  const cardcontainer = document.getElementById("cards-container");
  let child = "";
  for (let i = 0; i < cards.length; i++) {
    child += `<div id="card_${cards[i].id}" class="card">
      <h2 class="content-heading" value="${cards[i].cardTitle}" onclick="changelayout(${cards[i].id}, this.getAttribute('value'))"> ${cards[i].cardTitle} </h2>
      <br /><hr />
      <ul id="content_list_${cards[i].id}" class="sub-items">
      </ul>
      <div class="item-content-buttons">
      <button onclick="deleteCard(${cards[i].id})" class="delete-item-content delete-btn"><img src="img/icons-delete.png" alt="" width="45px"></button>
      <button onclick="showAddContentToCardPopup(${cards[i].id})" class="add-item-content add-sub-item-btn"><img src="img/add.png" alt="" width="45px"></img>
      </button>
      </div></div>`;
  }      
  cardcontainer.innerHTML = child;  
  renderContent();
}

function deleteCard(id) {
  const cardId = `card_${id}`;
  const card = document.getElementById(cardId);
  if (confirm("Are you sure you want to delete this card?")) {
    card.parentNode.removeChild(card);
    cards = cards.filter((item) => item.id != id);
  }
}
function showAddContentToCardPopup(id) {
  const popup2 = document.getElementById("popup3-container");
  popup2.style.display = "block";
  cardId = id;
}
function removeAddContentToCardPopup() {
  const popup3 = document.getElementById("popup3-container");
  popup3.style.display = "none";
}
function addContentToCard() {
  const contentListId = `content_list_${cardId}`;
  const Ul = document.getElementById(contentListId);
  const contentText = document.getElementById("sub-item-name").value;
  if (!contentText) {
    alert("Please add task name");
  } else {
    document.getElementById("sub-item-name").value = "";
    const list = document.createElement("li");
    const listId = new Date().getTime().toString();
    list.innerHTML = `<span>${contentText}</span> <button id="${contentText}" class="done sub-btn-done"><svg xmlns="http://www.w3.org/2000/svg" class="dones" width="1.4em" height="1.4em" viewBox="0 0 24 24"><path fill="currentColor" d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4L9.55 18Z"></path></svg></button>`;
    list.className = "content";
    list.id = `content_${listId}`;
    list.onclick = function () {
      doneTask(listId, cardId);
    };
    Ul.appendChild(list);
    removeAddContentToCardPopup();
    list.addEventListener("click", function () {
      if (list.style.textDecoration === "line-through") {
        list.style.textDecoration = "none";
        document.getElementById(`${contentText}`).style.backgroundColor="transparent";
      } else {
        list.style.textDecoration = "line-through";
        document.getElementById(`${contentText}`).style.backgroundColor="green";
      }
    });
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].id == cardId) {
        const content = {
          id: listId,
          contentText: contentText,
          done: false,
        };
        cards[i].content.push(content);
      }
    }
  }
}

function doneTask(listId, cardId) {
  const contentId = `content_${listId}`;
  const liElement = document.getElementById(contentId);
  liElement.classList.toggle("checked");

  for (let i = 0; i < cards.length; i++) {
    for (let j = 0; j < cards[i].content.length; j++) {
      const content = cards[i].content[j];
      if (content.id === listId) {
        cards[i].content[j].done = !cards[i].content[j].done;
      }
    }
  }
}
function changelayout(id, value) {
  const cardTitle = document.getElementById("card-title");
  const container1 = document.getElementById("main-head-container");
  const container2 = document.getElementById("main-head-container-2");
  addCardBtn2.addEventListener("click", () => {
    const popup = document.getElementById("popup-container");
    popup.style.display = "block";
  });
  const cards = document.querySelectorAll(".card");
  const cardShow = document.getElementById(`card_${id}`);
  cards.forEach((allcards) => {
    allcards.style.display = "none";
    container1.style.display = "none";
    container2.style.display = "block";
  });
  cardShow.style.display = "block";
}

function back() {
  const cards = document.querySelectorAll(".card");
  const container1 = document.getElementById("main-head-container");
  const container2 = document.getElementById("main-head-container-2");
  const addBtnB = document.getElementById("add-card-btn-2");
  cards.forEach((allcards) => {
    container2.style.display = "none";
    addBtnB.style.display = "none";
    container1.style.display = "block";
    allcards.style.display = "block";
  });
}