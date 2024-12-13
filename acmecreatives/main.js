// Burger icon script
const burger = document.querySelector("#burger");
const menu = document.querySelector("#menu");
burger.addEventListener('click', () => {
  if(menu.classList.contains('hidden')) {
    menu.classList.remove('hidden');
  } else {
    menu.classList.add('hidden');
  }
});

// Canvas Script
// Source: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations#mouse_following_animation
const canvas = document.getElementById("cw");
const context = canvas.getContext("2d");
context.globalAlpha = 0.5;

const cursor = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

let particlesArray = [];

generateParticles(101);
setSize();
anim();

addEventListener("mousemove", (e) => {
  cursor.x = e.clientX;
  cursor.y = e.clientY;
});

addEventListener(
  "touchmove",
  (e) => {
    e.preventDefault();
    cursor.x = e.touches[0].clientX;
    cursor.y = e.touches[0].clientY;
  },
  { passive: false },
);

addEventListener("resize", () => setSize());

function generateParticles(amount) {
  for (let i = 0; i < amount; i++) {
    particlesArray[i] = new Particle(
      innerWidth / 2,
      innerHeight / 2,
      4,
      generateColor(),
      0.02,
    );
  }
}

function generateColor() {
  let hexSet = "0123456789ABCDEF";
  let finalHexString = "#";
  for (let i = 0; i < 6; i++) {
    finalHexString += hexSet[Math.ceil(Math.random() * 15)];
  }
  return finalHexString;
}

function setSize() {
  canvas.height = innerHeight;
  canvas.width = innerWidth;
}

function Particle(x, y, particleTrailWidth, strokeColor, rotateSpeed) {
  this.x = x;
  this.y = y;
  this.particleTrailWidth = particleTrailWidth;
  this.strokeColor = strokeColor;
  this.theta = Math.random() * Math.PI * 2;
  this.rotateSpeed = rotateSpeed;
  this.t = Math.random() * 300;

  this.rotate = () => {
    const ls = {
      x: this.x,
      y: this.y,
    };
    this.theta += this.rotateSpeed;
    this.x = cursor.x + Math.cos(this.theta) * this.t;
    this.y = cursor.y + Math.sin(this.theta) * this.t;
    context.beginPath();
    context.lineWidth = this.particleTrailWidth;
    context.strokeStyle = this.strokeColor;
    context.moveTo(ls.x, ls.y);
    context.lineTo(this.x, this.y);
    context.stroke();
  };
}

function anim() {
  requestAnimationFrame(anim);

  context.fillStyle = "rgb(0 0 0 / 5%)";
  context.fillRect(0, 0, canvas.width, canvas.height);

  particlesArray.forEach((particle) => particle.rotate());
}

// Script for view more for service section
const service1 = document.querySelector("#service1");
const serviceInfo1 = document.querySelector("#service-info1");
service1.addEventListener('click', () => {
  if(serviceInfo1.classList.contains('hidden')){
    serviceInfo1.classList.remove('hidden');
  } else{
    serviceInfo1.classList.add('hidden');
  }
});
const service2 = document.querySelector("#service2");
const serviceInfo2 = document.querySelector("#service-info2");
service2.addEventListener('click', () => {
  if(serviceInfo2.classList.contains('hidden')){
    serviceInfo2.classList.remove('hidden');
  } else{
    serviceInfo2.classList.add('hidden');
  }
});
const service3 = document.querySelector("#service3");
const serviceInfo3 = document.querySelector("#service-info3");
service3.addEventListener('click', () => {
  if(serviceInfo3.classList.contains('hidden')){
    serviceInfo3.classList.remove('hidden');
  } else{
    serviceInfo3.classList.add('hidden');
  }
});
const service4 = document.querySelector("#service4");
const serviceInfo4 = document.querySelector("#service-info4");
service4.addEventListener('click', () => {
  if(serviceInfo4.classList.contains('hidden')){
    serviceInfo4.classList.remove('hidden');
  } else{
    serviceInfo4.classList.add('hidden');
  }
});
const service5 = document.querySelector("#service5");
const serviceInfo5 = document.querySelector("#service-info5");
service5.addEventListener('click', () => {
  if(serviceInfo5.classList.contains('hidden')){
    serviceInfo5.classList.remove('hidden');
  } else{
    serviceInfo5.classList.add('hidden');
  }
});
const service6 = document.querySelector("#service6");
const serviceInfo6 = document.querySelector("#service-info6");
service6.addEventListener('click', () => {
  if(serviceInfo6.classList.contains('hidden')){
    serviceInfo6.classList.remove('hidden');
  } else{
    serviceInfo6.classList.add('hidden');
  }
});
const service7 = document.querySelector("#service7");
const serviceInfo7 = document.querySelector("#service-info7");
service7.addEventListener('click', () => {
  if(serviceInfo7.classList.contains('hidden')){
    serviceInfo7.classList.remove('hidden');
  } else{
    serviceInfo7.classList.add('hidden');
  }
});

// Script for view more div for portfolio highlights section
const viewMore1 = document.querySelector("#moreinfo1");
const details1 = document.querySelector("#details1");
viewMore1.addEventListener('click', () => {
  if(details1.classList.contains('hidden')){
    details1.classList.remove('hidden');
  } else {
    details1.classList.add('hidden');
  }

});
const viewMore2 = document.querySelector("#moreinfo2");
const details2 = document.querySelector("#details2");
viewMore2.addEventListener('click', () => {
  if(details2.classList.contains('hidden')){
    details2.classList.remove('hidden');
  } else {
    details2.classList.add('hidden');
  }

});
const viewMore3 = document.querySelector("#moreinfo3");
const details3 = document.querySelector("#details3");
viewMore3.addEventListener('click', () => {
  if(details3.classList.contains('hidden')){
    details3.classList.remove('hidden');
  } else {
    details3.classList.add('hidden');
  }

});
const viewMore4 = document.querySelector("#moreinfo4");
const details4 = document.querySelector("#details4");
viewMore4.addEventListener('click', () => {
  if(details4.classList.contains('hidden')){
    details4.classList.remove('hidden');
  } else {
    details4.classList.add('hidden');
  }

});
const viewMore5 = document.querySelector("#moreinfo5");
const details5 = document.querySelector("#details5");
viewMore5.addEventListener('click', () => {
  if(details5.classList.contains('hidden')){
    details5.classList.remove('hidden');
  } else {
    details5.classList.add('hidden');
  }

});
const viewMore6 = document.querySelector("#moreinfo6");
const details6 = document.querySelector("#details6");
viewMore6.addEventListener('click', () => {
  if(details6.classList.contains('hidden')){
    details6.classList.remove('hidden');
  } else {
    details6.classList.add('hidden');
  }

});

// Dynamically generate year in footer
let fullDate = new Date();
let year = fullDate.getFullYear();
let footerDate = document.querySelector("#getDate");
footerDate.textContent = year;


// Go back to top button
const mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button

const scrollFunction = () => {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    mybutton.classList.remove("hidden");
  } else {
    mybutton.classList.add("hidden");
  }
};
const backToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

window.addEventListener("scroll", scrollFunction);