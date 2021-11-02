const form = document.getElementById("form"),
  ism = document.getElementById("username"),
  mail = document.getElementById("mail"),
  parol = document.getElementById("parol"),
  tParol = document.getElementById("t-parol");

function xatolikYuzasidan(kiritish, xabar) {
  let formaNazorat = kiritish.parentElement;

  formaNazorat.className = "input xatolik";
  let small = formaNazorat.querySelector("small");
  small.innerText = xabar;
}

function muofiq(kiritish) {
  let formaNazorat = kiritish.parentElement;
  formaNazorat.classList.add("muofiq");
}

function tekshiruv(kiritishMassivi) {
  kiritishMassivi.forEach((kiritish) => {
    if (kiritish.value.trim() === "") {
      xatolikYuzasidan(
        kiritish,
        `${getFieldName(kiritish)} maydoni to'ldiring`
      );
    } else {
      muofiq(kiritish);
    }
  });
}

function getFieldName(kiritish) {
  return kiritish.id.charAt(0).toUpperCase() + kiritish.id.slice(1);
}

function uzunligiTekshirish(kiritish, min, max) {
  if (kiritish.value.length < min) {
    xatolikYuzasidan(
      kiritish,
      `${getFieldName(kiritish)} maydoni ${min} ta belgidan ko'p bo'lish kerak`
    );
  } else if (kiritish.value.length > max) {
      xatolikYuzasidan(kiritish, `${getFieldName(kiritish)} maydon ${max} ta belgidan ozroq bo'lishi kerak`)
  } else {
    muofiq(kiritish)
  }
}


function mailTekshiruv(kiritish){
    const e = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (e.test(kiritish.value.trim())){
        muofiq(kiritish)
    } else {
        xatolikYuzasidan(kiritish, `Bunday email mavjud emas`)
    }
}

function parolTekshiruv(kiritish1, kiritish2){
    if(kiritish1.value != kiritish2.value){
        xatolikYuzasidan(kiritish2, ` Yuqoridagi foydalanuvchi paroli bilan mos emas !`)
    }
}


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    tekshiruv([ism, mail, parol, tParol]);
    uzunligiTekshirish(ism, 3, 15);
    uzunligiTekshirish(parol, 6, 20);
    mailTekshiruv(mail);
    parolTekshiruv(parol, tParol);
})