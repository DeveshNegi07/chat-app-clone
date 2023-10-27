const socket = io();
let name;
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message_area");
let audio = new Audio("pop.mp3");
do {
  name = prompt("Please enter your name");
  socket.emit("new-user-joined", name);
} while (!name);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

let sendMessage = (message) => {
  let msg = {
    user: name,
    message: message.trim(),
  };
  appendMessage(msg, "outgoing");
  textarea.value = "";
  scrollToBottom();
  //send to server
  socket.emit("message", msg);
};

let appendMessage = (msg, type) => {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");

  let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
        `;
  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
};
let joined = (name) => {
  appendName = document.createElement("p");
  appendName.classList.add("join");
  let text = document.createTextNode(`${name} has joined the conversation`);
  appendName.appendChild(text);
  messageArea.appendChild(appendName);
  audio.play();
};
socket.on("new-user-joined", (name) => {
  joined(name);
});
//recieve

socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  scrollToBottom();
  audio.play();
});

let scrollToBottom = () => {
  messageArea.scrollTop = messageArea.scrollHeight;
};
