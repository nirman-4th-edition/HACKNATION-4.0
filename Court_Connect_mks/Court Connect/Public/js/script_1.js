'use strict';

// notification toast variables
const notificationToast = document.querySelector('[data-toast]');
const toastCloseBtn = document.querySelector('[data-toast-close]');
const toastbody = document.querySelector('.toast-title');

// notification toast eventListener
toastCloseBtn.addEventListener('click', function () {
  notificationToast.classList.add('closed');
});

const rules = [" Article  14 - Equality before law " , 
" Article  15 - Prohibition of discrimination " , 
" Article  16 - Equality of opportunity in public employment " , 
" Article  17 - Abolition of untouchability " , 
" Article  18 - Abolition of titles " , 
" Article  19 - Freedom of speech, assembly, association, movement, residence, and profession " , 
" Article  20 - Protection in respect of conviction for offenses " , 
" Article  21 - Right to life and personal liberty " , 
" Article  22 - Protection against arrest and detention in certain cases " , 
" Article  23 - Prohibition of human trafficking and forced labor " , 
" Article  24 - Prohibition of child labor in factories " , 
" Article  25 - Freedom of conscience and religion " , 
" Article  26 - Freedom to manage religious affairs " , 
" Article  27 - Freedom from paying taxes for promotion of any religion " , 
" Article  28 - Freedom from attending religious instruction " , 
" Article  36-51 - Guidelines for the government to create social and economic conditions " , 
" Article  39 - State to ensure equal justice and free legal aid " , 
" Article  40 - Organization of village panchayats " , 
" Article  41 - Right to work, education, and public assistance in certain cases " , 
" Article  44 - Uniform civil code for all citizens " , 
" Article  51A - Citizens' duties to respect the Constitution, national flag, and national anthem " , 
" Article  246 - Distribution of legislative powers between Union and States " , 
" Article  256 - Obligation of states and the Union " , 
" Article  352 - Proclamation of Emergency " , 
" Article  356 - State Emergency (President's Rule) " , 
" Article  360 - Financial Emergency " , 
" Article  79 - Constitution of Parliament " , 
" Article  80 - Composition of Rajya Sabha " , 
" Article  81 - Composition of Lok Sabha " , 
" Article  108 - Joint sitting of both Houses of Parliament " , 
" Article  110 - Definition of Money Bills " , 
" Article  124 - Establishment of Supreme Court " , 
" Article  141 - Supreme Court’s law binding on all courts " , 
" Article  143 - Power of President to consult Supreme Court " , 
" Article  226 - Power of High Courts to issue writs " , 
" Article  227 - High Court's superintendence over all courts in the state " , 
" Article  153 - Governors of states " , 
" Article  168 - Composition of State Legislatures " , 
" Article  213 - Power of Governor to promulgate ordinances " , 
" Article  239 - Administration of Union Territories " , 
" Article  280 - Finance Commission " , 
" Article  300A - Right to property (now a legal right) " , 
" Article  324 - Election Commission " , 
" Article  330 - Reservation of seats for SC/ST in Lok Sabha " , 
" Article  343 - Official language of the Union (Hindi) " , 
" Article  352 - National Emergency " , 
" Article  356 - State Emergency (President's Rule) " , 
" Article  360 - Financial Emergency " , 
" Article  368 - Amendment of the Constitution " , 
" Article  370 - Special status to Jammu & Kashmir (now abrogated) " , ];

function getRandomrules() {
  const randomIndex = Math.floor(Math.random() * rules.length);
  return rules[randomIndex];
}

toastbody.innerHTML=(getRandomrules());


document.getElementById('lgbtn').addEventListener("click",()=>{
  const user = sessionStorage.getItem("user")
  if (!user) {
      window.location.href = "./login"
  }
})


// accordion variables
const accordionBtn = document.querySelectorAll('[data-accordion-btn]');
const accordion = document.querySelectorAll('[data-accordion]');

for (let i = 0; i < accordionBtn.length; i++) {

  accordionBtn[i].addEventListener('click', function () {

    const clickedBtn = this.nextElementSibling.classList.contains('active');

    for (let i = 0; i < accordion.length; i++) {

      if (clickedBtn) break;

      if (accordion[i].classList.contains('active')) {

        accordion[i].classList.remove('active');
        accordionBtn[i].classList.remove('active');

      }

    }

    this.nextElementSibling.classList.toggle('active');
    this.classList.toggle('active');

  });

}