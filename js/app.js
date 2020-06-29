const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

var day = new Date();
var hr = day.getHours();
if (hr >= 0 && hr < 12) {
  document.getElementById("greet").innerHTML = "Good Morning dear customer! How can I help you?";
}else if (hr >= 12 && hr <= 16) {
  document.getElementById("greet").innerHTML = "Good Afternoon dear customer! How can I help you?";
} else {
  document.getElementById("greet").innerHTML = "Good Evening dear customer! How can I help you?";
}

const BOT_MSGS = [
  "Hi, how can I help you?",
  "Ohh... I can't understand what you trying to say. Sorry!",
  "Please enter your order id",
  "Your order has been dispatched and will reach you soon",
  "Your order has been packed and is ready to dispatch",
  "Sorry, for the inconvenience caused to you, we will look into your problem ASAP",
  "Is there anything else that I can help you with?",
  "Thanks for using our website, visit again, Thank You!"
];

const BOT_IMG = "https://image.flaticon.com/icons/svg/327/327779.svg";
const PERSON_IMG = "https://image.flaticon.com/icons/svg/145/145867.svg";
const BOT_NAME = "BOT";
const PERSON_NAME = "You";

msgerForm.addEventListener("submit", event => {
  event.preventDefault();

  const msgText = msgerInput.value;
  if (!msgText) return;

  appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
  botResponse();
  msgerInput.value = "";

  
});

function appendMessage(name, img, side, text) {
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>

        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

function botResponse() {
  let msgText = "Sorry! But I can't understand you";
  const msgTextfromuser = msgerInput.value.toString().toLowerCase();
  var delay = msgText.split(" ").length * 100;

  if(msgTextfromuser.indexOf("hi") >= 0 || msgTextfromuser.indexOf("hello") >= 0){
    msgText = BOT_MSGS[0];
  }
  if((msgTextfromuser.indexOf("track") >= 0 && msgTextfromuser.indexOf("order") >= 0) || (msgTextfromuser.indexOf("status") >= 0 && msgTextfromuser.indexOf("order") >= 0)){
    msgText = BOT_MSGS[2];
  }

  if(/^\d+$/.test(msgTextfromuser)) {
    if(msgTextfromuser.length == 10){
      msgText = "Please give me a moment";
      delay = 0;
      setTimeout(() => {
        appendMessage(BOT_NAME, BOT_IMG, "left", "Please give me a moment");
      }, delay);
      delay = 3000;

      msgText = "Thank you for your patience, " + "Your order with order no:" + msgTextfromuser + " has been dispatched and will reach you soon";
    } else {
      msgText = "Please check your order id, it must contain exactly 10 digits, Thank you!";
    }
  }

  if(msgTextfromuser.indexOf("thanks") >= 0 || msgTextfromuser.indexOf("thank") >= 0)
  {
    msgText = BOT_MSGS[6];
  }

  if(msgTextfromuser == "yes") {
    msgText = "How can I help you";
  }

  

  else if(msgTextfromuser.indexOf("place order") >= 0) {
    msgText = "What item do you want to order" + "<br>" + "<br>" + "(a) Dress" + "<br>" + "<br>" + "(b) Shoe" + "<br>" + "<br>" + "(c) Item not present above" + "<br>" + "<br>" +
    "Please enter the order id from the above list";
  }

  if(msgTextfromuser == "1" || msgTextfromuser == "a") {
    msgText = "Your order has been placed with order ID:" + Math.floor(1000000000 + Math.random() * 1000000000);
  }
  if(msgTextfromuser == "2" || msgTextfromuser == "b") {
    msgText = "Your order has been placed with order ID:" + Math.floor(1000000000 + Math.random() * 1000000000);
  }
  if(msgTextfromuser == "3" || msgTextfromuser == "c") {
    msgText = BOT_MSGS[5];
  }
  if(msgTextfromuser == "ok") {
    msgText = BOT_MSGS[6];
  }

  if(msgTextfromuser == "no") {
    msgtext = "Thanks for using our website, visit again, Thank You!";
  }
  

  
 
  

  setTimeout(() => {
    appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
  }, delay);
}

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

