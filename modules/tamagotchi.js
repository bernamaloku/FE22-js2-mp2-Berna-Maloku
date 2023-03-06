//en klass som är en blueprint för objekt (alltså i detta fall tamagotchin)
class Tamagotchi {
  #name;
  #type;
  #happiness = 10;
  #hunger = 10;
  #happinessCounter;
  #hungerCounter;
  #isDead = false;
  #img;
  constructor(name, type) {
    this.#name = name;
    this.#type = type;
    this.#newTam();
    this.#showHunger();
    this.#showHappiness();
  }

  //när tamagotchin dör så visar det ett rött meddelande
  #newGui() {
    this.#happinessCounter.innerText = `Happiness level is at: ${
      this.#happiness
    }`;
    this.#hungerCounter.innerText = `Hunger level is at: ${this.#hunger}`;

    if (this.#hunger === 0 || this.#happiness === 0) {
      this.#isDead = true;
      clearInterval(this.#showHunger);
      clearInterval(this.#showHappiness);

      const message = document.createElement("p");
      message.innerText = "Your Tamagotchi has died, get a new one :(";
      message.style.color = "red";
      this.#img.insertAdjacentElement("afterend", message);
    }
  }

  //new Tamagotchi objekt för varje tamagotchi man lägger till
  #newTam() {
    const tamDiv = document.getElementById("tamContainer");
    const mainDiv = document.createElement("div");
    tamDiv.append(mainDiv);

    const text = document.createElement("h3");
    text.innerText = `${this.#name} the ${this.#type}`;
    mainDiv.append(text);

    this.#img = new Image();
    this.#img.src = `./bilder/${this.#type}.png`;
    mainDiv.appendChild(this.#img);

    this.#happinessCounter = document.createElement("p");
    this.#happinessCounter.innerText = `Happiness level is at: ${
      this.#happiness
    }`;
    mainDiv.append(this.#happinessCounter);

    this.#hungerCounter = document.createElement("p");
    this.#hungerCounter.innerText = `Hunger level is at: ${this.#hunger}`;
    mainDiv.append(this.#hungerCounter);

    const createButton = (buttonText, clickHandler) => {
      const button = document.createElement("button");
      button.innerText = buttonText;
      button.addEventListener("click", clickHandler);
      mainDiv.append(button);
    };

    createButton("play with the tamagotchi", () => {
      this.#play();
    });

    createButton("feed the tamagotchi", () => {
      this.#feed();
    });
  }

  // metoder som sänker hunger och happiness level. det kollar även om tamagotchin är död eller inte, om ja det stoppar tamagotchi hunger och happiness från att sänkas.
  #showHunger() {
    const intervalId = setInterval(() => {
      if (this.#hunger > 0 && !this.#isDead) {
        this.#hunger--;
        this.#newGui();
      } else {
        this.isDead = true;
        clearInterval(intervalId);
      }
    }, 2500);
  }
  #showHappiness() {
    const intervalId = setInterval(() => {
      if (this.#happiness > 0 && !this.#isDead) {
        this.#happiness--;
        this.#newGui();
      } else {
        this.isDead = true;
        clearInterval(intervalId);
      }
    }, 3500);
  }

  // båda metoderna ökar värdena för husdjurets hunger och lycka (happiness) med 1, så länge dessa värden inte redan är 10 (maximala möjliga värden). Om husdjurets hunger eller lycka redan är på 10, kommer ingen ökning att ske.Metoderna kallar också på en metod som heter #newGui(), som uppdaterar användargränssnittet för att spegla husdjurets nya värden för hunger och lycka. 

  #play() {
    if (this.#happiness != 10 && !this.#isDead) {
      this.#happiness++;
      this.#newGui();
    }
  }

  #feed() {
    if (this.#hunger != 10 && !this.#isDead) {
      this.#hunger++;
      this.#newGui();
    }
  }
}

//exporterar class:en tamagotchi att användas på main.js filen.
export { Tamagotchi };
