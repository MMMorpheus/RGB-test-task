"use strict";

document.addEventListener("DOMContentLoaded", function () {
  //countries dropdown

  const triangle = document.querySelector(".triangle");
  const countriesList = document.querySelector(".countries");
  let isShown = false;
  let currentCountry = "ua";
  const shortcut = document.querySelector(".shortcut > img");

  triangle.addEventListener("click", () => {
    triangle.classList.toggle("_active");
    if (!isShown) {
      countriesList.style.display = "block";
      isShown = true;
    } else {
      countriesList.style.display = "none";
      isShown = false;
    }
  });

  countriesList.addEventListener("click", (e) => {
    currentCountry = e.target.dataset.country;
    countriesList.style.display = "none";
    triangle.classList.toggle("_active");
    isShown = false;
    shortcut.src = `./assets/countries/${currentCountry}.png`;
  });

  // validation

  const form = document.forms.form;

  const validation = new window.JustValidate(form, {
    tooltip: {
      position: "top",
    },
  });

  validation
    .addField(form.name, [
      {
        rule: "required",
        errorMessage: "Поле не может быть пустым!",
      },
    ])
    .addField(form.tel, [
      {
        validator: (value, context) => {
          switch (currentCountry) {
            case "ua":
              return /^((\+?3)?8)?((0\(\d{2}\)?)|(\(0\d{2}\))|(0\d{2}))\d{7}$/.test(
                value
              );
            case "pol":
                // mised regexp
              return true;
          }
        },
        errorMessage: "Некорректный номер!",
      },
    ])
    .addField(form.email, [
      {
        rule: "required",
        errorMessage: "Поле не может быть пустым!",
      },
      {
        rule: "email",
        errorMessage: "Некорректный email!",
      },
    ])
    .onSuccess(async(e) => {
      e.preventDefault();

      let formData = new FormData(form);
      
      let response = await fetch('sendmail.php', {
        method: "POST",
        body: formData
      })
      if(response.ok){
        // here must be php response
        alert("Заявка успешно отправлена!")
        form.reset();
      } else {
        alert("Произошла ошибка! Повторите позже.")
      }

    });
});
