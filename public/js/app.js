const hamburger = document.querySelector('.header_hamburger');
const header = document.querySelector('.header');
const dy = document.getElementById("y");
const dm = document.getElementById("m");
const dw = document.getElementById("w");
const d = document.getElementById("d");
const dhr = document.getElementById("hr");
const dmin = document.getElementById("min");
const dsec = document.getElementById("sec");
const scroll = document.querySelector(".scroll");
const spinner = document.querySelector('.spinning');
const spinBtn = document.querySelector('.spin-con button');
const photosArr = document.querySelectorAll('.gal-box span');
const galOv = document.querySelector('.gal-big');
const galOvImg = document.querySelector('.gal-big img');

hamburger.addEventListener("click", toggleHamburger);
spinBtn.addEventListener('click', spinWheel);
galOv.addEventListener('click', closeGallery);

window.setInterval(getCurrentTime, 1000);
window.addEventListener('scroll', toggleScroll);

function toggleHamburger() {
  hamburger.classList.toggle('open');
  header.classList.toggle('active');
}

function abso(a) {
  return a - Math.floor(a);
}

function ten(x) {
  return (x < 10 ? "0" : "") + x;
}

function getCurrentTime() {
  const date = new Date("7/29/2024 00:00:00");
  const ms = Date.now() - date.getTime();
  const dayM = ms / (24 * 3600 * 1000);
  const hrM = abso(dayM) * 24;
  const hr = Math.floor(hrM);
  const minM = abso(hrM) * 60;
  const min = Math.floor(minM);
  const secM = abso(minM) * 60;
  const sec = Math.floor(secM);

  dhr.innerText = ten(hr);
  dmin.innerText = ten(min);
  dsec.innerText = ten(sec);

  const cDate = new Date();
  const cMonth = cDate.getMonth();
  const cYear = cDate.getFullYear();
  const timeC = dateRange(2024, 7, cYear, cMonth);
  const tempDay = cDate.getDate();

  const countYear = ten(Math.floor(timeC.length / 12));
  dy.innerText = countYear;

  let countMonth = (timeC.length % 12);
  const monthZero = tempDay < 7;
  countMonth = (countMonth === 1 && monthZero) ? 0 : countMonth;
  dm.innerText = ten(countMonth);

  const tempN = getNdays(cMonth - 1, cYear);
  const adjustedDay = tempDay >= 7 ? tempDay - 7 : tempN - 6 + tempDay;
  const countWeek = ten(Math.floor(adjustedDay / 7));
  const countDays = ten(adjustedDay % 7);

  d.innerText = countDays;
  dw.innerText = countWeek;
}

function dateRange(startYear, startM, endYear, endM) {
  const dates = [];
  for (let i = startYear; i <= endYear; i++) {
    const endMonth = (i !== endYear) ? 11 : parseInt(endM) - 1;
    const startMon = (i === startYear) ? parseInt(startM) - 1 : 0;
    for (let j = startMon; j <= endMonth; j++) {
      dates.push([i, j + 1]);
    }
  }
  return dates;
}

function getNdays(month, year) {
  return new Date(year, month, 0).getDate();
}

function toggleScroll() {
  const h = document.documentElement.clientHeight * 0.5;
  scroll.classList.toggle('active-scroll', window.scrollY > h);
  scroll.classList.toggle('inactive-scroll', window.scrollY <= h);
}

let deg = 0;
let newDeg = null;
let prize;

function spinWheel() {
  let rotateDeg = deg + ((Math.random() * 1000) + 3333);
  let pureDeg = rotateDeg % 360;

  pureDeg = changeDeg(pureDeg, rotateDeg);
  checkDeg(pureDeg);

  if (newDeg) rotateDeg = newDeg;
  spinBtn.removeEventListener('click', spinWheel);
  spinner.style.transform = `rotate(${rotateDeg}deg)`;
  deg = rotateDeg;
  newDeg = null;

  setTimeout(() => {
    const winner = document.querySelector(`.spin-con_content:nth-of-type(${prize})`);
    const infoSpin = document.querySelector('.spin-info');
    winner.classList.add('won');
    let wItem = winner.children[0].innerText;
    infoSpin.innerText = `Congrats Bae, you will get ${wItem.length < 6 ? 'a ' + wItem : wItem}!`;
  }, 5000);
}

function changeDeg(deg, rotateD) {
  const degArr = [20.5, 69.5, 114, 159, 203, 249, 293, 339.5];
  for (let i = 0; i < degArr.length; i++) {
    if (deg > degArr[i] && deg < (degArr[i] + 3)) {
      newDeg = rotateD + 8;
      return deg + 8;
    }
    if (deg < degArr[i] && deg > (degArr[i] - 3)) {
      newDeg = rotateD - 8;
      return deg - 8;
    }
  }
  return deg;
}

function checkDeg(deg) {
  if (deg > 20.5 && deg < 69.5) {
    prize = '8';
  } else if (deg > 69.5 && deg < 114) {
    prize = '7';
  } else if (deg > 114 && deg < 159) {
    prize = '6';
  } else if (deg > 159 && deg < 203) {
    prize = '5';
  } else if (deg > 203 && deg < 249) {
    prize = '4';
  } else if (deg > 249 && deg < 293) {
    prize = '3';
  } else if (deg > 293 && deg < 339.5) {
    prize = '2';
  } else {
    prize = '1';
  }
}

function closeGallery(e) {
  if (e.target === galOv) {
    galOv.classList.remove('show-galbig');
  }
}

photosArr.forEach((p) => {
  p.addEventListener('click', () => {
    const src = p.children[0].getAttribute('src');
    galOvImg.setAttribute('src', src);
    galOv.classList.add('show-galbig');
  });
});
