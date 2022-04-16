const chatInput = document.querySelector("#chat-input");
const chatList = document.querySelector("#chat-list");
const createChatItem = function (type = 'user', message = '') {
  const chatItem = document.createElement("div");

  if (type === 'user') {
    chatItem.classList = "chat-item chat-item-user";
  } else {
    chatItem.classList = "chat-item chat-item-robot";
  }
  chatItem.innerText = message;
  
  return chatItem;
};

document.onkeydown = function (event) {
  // 如果是 Enter 事件
  if (event.key === 'Enter') {
    const value = chatInput.value;
    const chatItem = createChatItem("user", value);

    chatList.appendChild(chatItem);
    // 重置 Input Value
    chatInput.value = '';

    fetch(
      "/chat/send",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: value }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const chatItem = createChatItem("robot", data.message);

        chatList.appendChild(chatItem);
      });
  }
};