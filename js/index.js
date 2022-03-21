import data from "./data.js";

const generateSlides = () => {
  const carousel = document.querySelectorAll(".carousel-item");
  [...carousel].forEach((item, index) => {
    item.children[0].setAttribute("src", data[index].image);
    item.children[0].setAttribute("alt", data[index].name);
  });
};

const validation = () => {
  const entrar = document.querySelector("#cadastro");
  const input = entrar.querySelectorAll("input");
  console.log(input);
  [...input].forEach((item) => {
    const placeholder = item.placeholder;
    const action = actions[placeholder];
    item.addEventListener("input", (e) => action(e));
  });
};

const insertMessage = (message, e) => {
  const messageTag = document.querySelector(".message");
  if (messageTag == null || messageTag.textContent != message) {
    const para = document.createElement("p");
    para.textContent = message;
    para.classList.add("text-danger", "message");
    e.target.insertAdjacentElement("afterend", para);
  }
};

const removeMessage = (e) => {
  if (e.target.nextSibling !== null) {
    e.target.nextSibling.remove();
  }
};

const actions = {
  nome: (e) => {
    const nome = e.target.value;
    const message =
      "Nome muito pequeno (tamanho minimo 1) ou muito grande (máximo 50)";
    nome.length < 2 || nome.length > 50
      ? insertMessage(message, e)
      : removeMessage(e);
  },
  email: (e) => {
    // https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = Boolean(e.target.value.match(re));
    const message = "Email inválido.";
    isValid ? removeMessage(e) : insertMessage(message, e);
  },
  senha: (e) => {
    // https://stackoverflow.com/questions/5142103/regex-to-validate-password-strength
    const re =
      /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/;
    const isValid = Boolean(e.target.value.match(re));
    const message = "Senha inválida";
    isValid ? removeMessage(e) : insertMessage(message, e);
  },
};

validation();
generateSlides();
