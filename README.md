# Kindergarten - diploma work - laboratory work 2

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

Kolodii Bohdan, student of KI-47, Junior Angular Front-End Developer(Software Engineer) at Binariks Inc.
Student number - 13,  HW i-face - UART, Game - chrome dragon game, Data driven format - XML

Щоб заранити проект потрібно дістати його з репозиторію. Потім скачати NodeJs версії не нижче 14 і VS code або WebStorm. Бажано налаштувати NodeJs, щоб можна було через термінал запустити скачування пакетів. Потрібно відкрити проект через Vs code чи WebStorm і в терміналі (я використовую термінал cmd) прописати перше команду (npm install), після  того як всі пакети встановляться, слід прописати команду (ng serve -o) - це потрібно для того, щоб запустити проект на локальному сервері.

                            Kindergarten v1.0 опис
    1. Логінування відбувається з використанням двох полів : email & password. !!! Credential for login : email - bkolodiy20013@gmail.com password - qwerty1234
    2 Також під кнопкою "залогінуватися" є кнопка "забув пароль" де ви зможете відновити пароль, вписавши в відповідне поле свій email, на котрий ви отримаєте повідомлення з силкою, яка вас редіректне на сторінку відновлення паролю, де ви успішно зможете змінити чи відновити пароль.
    3. Під кнопкою "забув пароль", є кнопка "зареєструватися", яка переведе вас на сторінку логінування, де потрібно заповнити такі поля:
      - First Name
      - Second Name
      - Email
      - Password
      - Confirm password
      - Choose you position -- потрібно вибрати чи ти простий юзер чи ти представник садочку
    Юзер буде двох видів : 1. Простий користувач. 2. Представник садочку
    4. Якщо всі поляв реєстрації заповнено вірно, тоді кнопка буде доступною і можна буде ввійти в систему.(Ввійти в систему можна поки що, тільки під звичайним юзером)
    5. Ввійшовши в систему, ви побачите головну сторінку, де буде відображатися меню, хедер і квадрати у котрих розташовані посилання на компоненти, на котрі можна перейти. На перший квадрат стягуються дані з DB про всі садочки і вибирається перший - найновіший, який був доданий в базу. З цього обєкту, який ми отримуємо, я дістаю: назву, опис, лого і головну картинку, яку потім відображаю в самому квадраті.
    6. Поки що на головній сторінці ніщо не клікабельне, лише стрілка біля іконки юзера, де вікривається міні-меню, де можна вилогінуватися з системи.

