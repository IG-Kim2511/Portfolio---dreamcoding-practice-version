"use strict";
// c58 (js58). show navbar with scroll (make navbar transparent when it is on the top)
// JS에서 height 잡아내기
// scroll 될때마다 function호출하기
// scroll할때마다 scrollY값 가져옴
//   console.log(window.scrollY);
//   console.log(`navbarHeight: ${navbarHeight}`);

//   1. window.scroll y값이 navbarHeight보다 크면,
// 'navbar--dark'클래스를 추가함
// ( 작으면, 제거함)

// 2. css에 'navbar--dark'를 스타일링함

//  <오답노트>
// ifelse, toggle, scrollY

const navbar = document.querySelector("#navbar");

const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

//c60. Handle scrolling when tapping on the navbar menu(메뉴버튼 클릭하면 해당 섹션으로 이동)
// 클릭이 되는 event. 클릭할때 타겟이 되는 이벤트
// dataset: html 의 data 가져오는 코드

// <오답노트>
// navbar__menu 가져옴
// event.target
// target= event.target;
// target.dataset.link;

const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
  console.log(event.target);
  console.log(event.target.dataset.link);

  const target = event.target;
  const link = target.dataset.link;

  // navbar__버튼 밖의 menu 클릭했을때  return시킴
  if (link == null) {
    return;
  }

  // scrollIntoView
  const scrollTo = document.querySelector(link);
  scrollTo.scrollIntoView({ behavior: "smooth" });

  // (74). 모바일에서 scroll할때는 navbar가 닫혀지게..
  navbarMenu.classList.remove("open");
});

// (74) Navbar toggle button for small screen
// small screen- menubar클릭하면 menu목록 나오기
// ??!! toggle
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
navbarToggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
});

// Handle click on 'contact me' button on  home
//메뉴버튼 클릭하면 해당 섹션으로 이동
// selector : 임의로 지은 parameter
//중첩되는 function scrollIntoView...따로 빼서도 가능.그리고 다른 함수에서 사용 하게

const homeContactBtn = document.querySelector(".home__contact");
homeContactBtn.addEventListener("click", () => {
  // const scrollTo = document.querySelector(selector);
  // scrollTo.scrollIntoView({ behavior: "smooth" });
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

// <오답노트>
// home.getBoundingClientRect().height;
// const home = document.querySelector("#home");
// const homeHeight = home.offsetheight;
//   home.style.opacity = 1 - window.scrollY / homeHeight;

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

// Handle click  on the 'arrow up' button (arrow버튼누르면 home)
// <오답노트> scrollIntoView

arrowUp.addEventListener("click", () => {
  scrollIntoView("#home");
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
}

// (68)projects - project list클릭하면, 해당 프로젝트만 뜨게 하기 . html data 사용

// 알고리즘
// 1. 버튼. 컨테이너 . 프로젝트 가져옴
// 2. click, addEventListener
// 3. button, span 의 data  가져오기
// 4. forEach로 dataset목록 다 돌림
// 5. data-filter = data-type이 같을때 .invisible을 삭제, 다르면 추가함.

// const filter = e.target.dataset.filter
// e: event
// event안에 있는
// target 안에 있는
// dataset안에 있는
// filter값 프린트하기

//   <디버깅 debugging>
// : breakpoint :코드넘버 누르면 breakpoint생김
//   source-page-main.js
// - scope- e클릭..읽어보기
// - watch
// - e.target
// - e.target.parentNode
// - e.target.parentNode.dataset.filter 검색해보기

const workBtnContainer = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");

workBtnContainer.addEventListener("click", (e) => {
  // (68-1) dataset 가져옴

  // span 클릭되게 하기 : e.target.parentNode.dataset.filter; 추가
  //쉽게하기: const filter = e.target.dataset.filter; 만 넣고 , span은 구석으로 밀어버리기.

  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;

  // 만약을 위해 코드 추가 if...filter가 null이면 return..끝냄
  if (filter == null) {
    return;
  }

  // (68-2)forEach로 dataset목록 다 돌리고, 해당되는 아이템만 보이게하기
  projects.forEach((project) => {
    console.log(project.dataset.type);

    if (filter === "*" || filter === project.dataset.type) {
      project.classList.remove("invisible");
    } else {
      project.classList.add("invisible");
    }
  });

  // (70) project 화면전환 애니메이션 &  300ms 후 초기화
  projectContainer.classList.add("anim-out");

  setTimeout(() => {
    projectContainer.classList.remove("anim-out");
  }, 300);

  // (72) 현재 클릭된곳으로 버튼효과 옮겨가기
  //  Remove selection from the previous item and select the next selection

  const active = document.querySelector(".category__btn.selected");
  if (active != null) {
    active.classList.remove("selected");
  }

  e.target.classList.add("selected");
});
