class Chronometer {
  constructor() {
    //ThisTime
    this.circle = document.querySelectorAll(".circle");
    this.hour = document.getElementById("hours");
    this.minute = document.getElementById("minutes");
    this.second = document.getElementById("seconds");
    this.miliSecond = document.getElementById("miliSeconds");
    this.interval;

    //FuncionEmpty
    this.empty();

    //ThisButton
    this.playBtn = document.getElementById("play");
    this.pauseBtn = document.getElementById("pause");
    this.resetBtn = document.getElementById("reset");

    //Desing Circles Smalls
    this.parameters = {
      id: [0, 1, 2, 3],
      pointCant: [23, 59, 59, 99],
      size: [0.6, 0.4, 0.4, 0.2],
      radio: 14,
    };

    for (let i = 0; i < this.circle.length; i++) {
      this.setCircle(
        this.parameters.id[i],
        this.parameters.pointCant[i],
        this.parameters.size[i],
        this.parameters.radio
      );
    }

    //Functions Times
    this.playBtn.addEventListener("click", this.play.bind(this));
    this.pauseBtn.addEventListener("click", this.pause.bind(this));
    this.resetBtn.addEventListener("click", this.reset.bind(this));
  }

  setCircle(id, pointCant, size, radio) {
    const angle = (2 * Math.PI) / pointCant;
    for (let i = 0; i <= pointCant; i++) {
      let result = i * angle;
      let puntoX = radio * Math.cos(result) * 8;
      let puntoY = radio * Math.sin(result) * 8;

      const circleSmall = document.createElement("span");
      circleSmall.classList.add("circle-small-dark");
      circleSmall.id = `circleSmall${id}`;
      circleSmall.style.left = `calc(${puntoX}px + (14em / 2) - (${size}em / 2))`;
      circleSmall.style.top = `calc(${puntoY}px + (14em / 2) - (${size}em / 2))`;
      circleSmall.style.width = `${size}em`;
      circleSmall.style.height = `${size}em`;
      this.circle[id].appendChild(circleSmall);
      this.circle[id].children[1].style.display = "none";
    }
  }

  setMiliSeconds() {
    let circleSmall3 = document.querySelectorAll("#circleSmall3");

    if (this.miliSeconds >= 100) {
      this.setSeconds();
      this.miliSeconds = 0;
      for (let i = 0; i < 100; i++) {
        circleSmall3[i].classList.remove("circle-small");
      }
    }
    circleSmall3[this.miliSeconds].classList.add("circle-small");

    if (this.miliSeconds < 10) {
      this.miliSecond.textContent = `0${this.miliSeconds}`;
    } else {
      this.miliSecond.textContent = this.miliSeconds;
    }
    this.miliSeconds++;
  }

  setSeconds() {
    let circleSmall2 = document.querySelectorAll("#circleSmall2");

    if (this.seconds >= 60) {
      this.setMinutes();
      this.seconds = 0;
      for (let i = 0; i < 60; i++) {
        circleSmall2[i].classList.remove("circle-small");
      }
    }
    circleSmall2[this.seconds].classList.add("circle-small");

    if (this.seconds < 10) {
      this.second.textContent = `0${this.seconds}`;
    } else {
      this.second.textContent = this.seconds;
    }
    this.seconds++;
  }

  setMinutes() {
    let circleSmall1 = document.querySelectorAll("#circleSmall1");
    if (this.minutes >= 60) {
      this.setHours();
      this.minutes = 0;
      for (let i = 0; i < 60; i++) {
        circleSmall1[i].classList.remove("circle-small");
      }
    }
    circleSmall1[this.minutes].classList.add("circle-small");

    if (this.minutes < 10) {
      this.minute.textContent = `0${this.minutes}`;
    } else {
      this.minute.textContent = this.minutes;
    }
    this.minutes++;
  }

  setHours() {
    let circleSmall0 = document.querySelectorAll("#circleSmall0");

    if (this.hours >= 24) {
      this.hours = 0;
      for (let i = 0; i < 24; i++) {
        circleSmall0[i].classList.remove("circle-small");
      }
    }
    circleSmall0[this.hours].classList.add("circle-small");

    if (this.hours < 10) {
      this.hour.textContent = `0${this.hours}`;
    } else {
      this.hour.textContent = this.hours;
    }
    this.hours++;
  }

  play() {
    this.playBtn.style.display = "none";
    this.pauseBtn.style.display = "flex";
    this.interval = setInterval(() => {
      this.setMiliSeconds();
    }, 10);
  }

  pause() {
    this.playBtn.style.display = "flex";
    this.pauseBtn.style.display = "none";
    clearInterval(this.interval);
  }

  reset() {
    //Pausar
    this.pause();

    //Restablecer los stilos
    let circleSmall = document.querySelectorAll(".circle-small");
    for (let i = 0; i < circleSmall.length; i++) {
      circleSmall[i].classList.remove("circle-small");
    }

    //Restablecer los contenedores
    this.empty();
  }

  empty() {
    this.miliSeconds = 1;
    this.miliSecond.textContent = "00";

    this.seconds = 1;
    this.second.textContent = "00";

    this.minutes = 1;
    this.minute.textContent = "00";

    this.hours = 1;
    this.hour.textContent = "00";
  }
}

const manager = new Chronometer();
