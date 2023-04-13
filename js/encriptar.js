var textEncriptar = document.getElementById("tranform-text");
var regex = /^[A-Za-z\s]+$/;

var textDesencriptar = document.getElementById("tranform-text");
const vocales = "aeiou";
const conv = ["ai", "enter", "imes", "ober", "ufat"];

//funcion encriptar 
const encriptar = () => {
  if (textEncriptar.textContent.trim() !== "") {
    const texto = textEncriptar.textContent.toLowerCase();
    let textoEncriptado = "";

    for (let i = 0; i < texto.length; i++) {

      let caracter = texto.charAt(i);
      let vocalEncontrada = caracter.match(/[aeiou]/gi);
      if (vocalEncontrada) {
        let indice = vocales.indexOf(vocalEncontrada[0]);
        caracter = conv[indice];
      }
      else {
        caracter = caracter;
      }
      textoEncriptado += caracter;
    }
    result(textoEncriptado);
  } else {
    sinMsg();
  }
};

//funcion desencriptar

const desencriptar = () => {
  if (textDesencriptar.textContent.trim() !== "") {
    const textoEncriptado = textDesencriptar.textContent.toLowerCase();
    let textoDesencriptado = "";

    for (let i = 0; i < textoEncriptado.length; i++) {
      let caracter = textoEncriptado.charAt(i);

      if (caracter === "a" && textoEncriptado.substring(i, i + 2) === "ai") {
        caracter = "a";
        i++;
      } else if (caracter === "e" && textoEncriptado.substring(i, i + 5) === "enter") {
        console.log(i);
        caracter = "e";
        i += 4;
      } else if (caracter === "i" && textoEncriptado.substring(i, i + 4) === "imes") {
        caracter = "i";
        i += 3;
      } else if (caracter === "o" && textoEncriptado.substring(i, i + 4) === "ober") {
        caracter = "o";
        i += 3;
      } else if (caracter === "u" && textoEncriptado.substring(i, i + 4) === "ufat") {
        caracter = "u";
        i += 3;
      }

      textoDesencriptado += caracter;
    }

    result(textoDesencriptado);
  } else {
    sinMsg();
  }
}

// funcion para mostrar el resultado de la encriptacion o desencriptacion
const result = (resp) => {
  let cleanMsg = document.getElementsByClassName("response-msg");
  var color = document.getElementById("response-msg");
  color.style.color = "#495057";
  cleanMsg[0].innerHTML = resp;
  let encriptacion = document.getElementsByClassName("response-text");

  encriptacion[0].innerHTML = "";
};

// funcion para mostrar mensajes y imagen 
const sinMsg = () => {

  if (window.innerWidth > 1024) {
    // Mostrar el elemento
    let img = document.getElementById("muneco");
    img.style.display = "block";

  }
  let cleanMsg = document.getElementsByClassName("response-msg");
  cleanMsg[0].innerHTML = "Ningun Mensaje Encontrado";
  let encriptacion = document.getElementsByClassName("response-text");
  encriptacion[0].innerHTML =
    "Ingresa el texto que desees encriptar o desencriptar.";
  let btnCopy = document.getElementById("copy");
  btnCopy.style.display = "none";

}

// evento que eschucha  la entrada en el textarea y verifica si no hay  contenido 
textEncriptar.addEventListener("input", function () {

  if (textEncriptar.textContent.trim() === "" ) {
    sinMsg();
  }

})

// funcion para copiar el texto encriptado o desencriptado
const copiar = async () => {

  let text = document.getElementById('response-msg').innerHTML;
  try {
    await navigator.clipboard.writeText(text);
    console.log('Content copied to clipboard');
  } catch (err) {
    console.error('Failed to copy: ', err);
  }

}
//funcion para verificar sin el text de entrada cumple con unas condiciones
const verificarContent = () => {
  if (!regex.test(textEncriptar.textContent)) {
    alert("El texto no debe contener acentos ni numeros")
    sinMsg();
  }
  else if (textEncriptar.textContent.trim() !== "") {

    let img = document.getElementById("muneco");
    img.style.display = "none";
    let btnCopy = document.getElementById("copy");
    btnCopy.style.display = "block";
  }
}

const buttonEnc = document.querySelector(".btn-enc");
buttonEnc.addEventListener("click", function () {
  verificarContent();
});
const buttonDes = document.querySelector(".btn-des");
buttonDes.addEventListener("click", function () {
  verificarContent();
});
