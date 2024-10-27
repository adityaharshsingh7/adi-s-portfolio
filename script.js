function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}


<script type="module">
  import { Amplify, Interactions } from 'aws-amplify';
  import awsconfig from './aws-exports.js';

  Amplify.configure(awsconfig);

  async function sendMessage() {
      const userMessage = document.getElementById("user-input").value;
      document.getElementById("user-input").value = "";

      // Display user message in the chat output
      const chatOutput = document.getElementById("chat-output");
      const userMsgElement = document.createElement("p");
      userMsgElement.innerHTML = `<strong>You:</strong> ${userMessage}`;
      chatOutput.appendChild(userMsgElement);

      // Send the message to the Lex bot
      const botResponse = await Interactions.send(personal_portfolio, userMessage);

      // Display bot response
      const botMsgElement = document.createElement("p");
      botMsgElement.innerHTML = `<strong>Bot:</strong> ${botResponse.message}`;
      chatOutput.appendChild(botMsgElement);
  }
</script>
