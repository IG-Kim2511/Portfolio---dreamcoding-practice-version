"use strict";

//  Make navbar transparent when it is on the top
const navbar = document.querySelector("#navbar");
// JS에서 height 잡아내기
const navbarHeight = navbar.getBoundingClientRect().height;

// scroll 될때마다 function호출하기
document.addEventListener("scroll", () => {
  // scroll할때마다 scrollY값 가져옴
  //   console.log(window.scrollY);
  //   console.log(`navbarHeight: ${navbarHeight}`);

  //   1. window.scroll y값이 navbarHeight보다 크면,
  // 'navbar--dark'클래스를 추가함
  // (
  // 작으면, 제거함)

  // 2. css에 'navbar--dark'를 스타일링함

  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

//Handle scrolling when tapping on the navbar menu
//메뉴버튼 클릭하면 해당 섹션으로 이동

const navbarMenu = document.querySelector(".navbar__menu");
// 클릭이 되는 evetn. 클릭할때 타겟이 되는 이벤트
navbarMenu.addEventListener("click", (event) => {
  console.log(event.target);

  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  console.log(event.target.dataset.link);

  // mdn scrollIntoView
  const scrollTo = document.querySelector(link);
  scrollTo.scrollIntoView({ behavior: "smooth" });
});

// Handle click on 'contact me' button on  home
//메뉴버튼 클릭하면 해당 섹션으로 이동
//따로 function scrollIntoView로 빼서도 가능.

const homeContactBtn = document.querySelector(".home__contact");
homeContactBtn.addEventListener("click", () => {
  scrollIntoView("#contact");
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
}

// make home slowly fade to transparent as the window scrolls down
// 알고리즘 opacity
// 1 - (window.scrollY / homeHeight)
// 1 -            (  0    /  800 = 0 )   = 1
// 1 -           ( 400   /  800 = 0.5 )   = 0.5
// 1 -           (  800  /  800 = 1 )   = 0
// 1 -           ( 1600 /  800 = 2 )   = -1

const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// Show "arrow up" button when scrolling down
// 알고리즘: 스크롤할때 homeheight의 1/2로 내려오면. arroup에 visible 클래스 추가
const arrowUp = document.querySelector(".arrow-up");
document.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add("visible");
  } else {
    arrowUp.classList.remove("visible");
  }
});

// Handle click  on the 'arrow up' button
arrowUp.addEventListener("click", () => {
  scrollIntoView("#home");
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
}
