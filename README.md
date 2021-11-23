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


                            Kindergarten v1.0  -- unit test
    До даної версії було зроблені unit test, покрито практично 90% всього проекту, включаючи в себе guards & services.
    Щоб запустити тестування потрібно у терміналі прописати ng test --code-coverage і щщоб побачити шо і як покрито, то відкриваєте через гугл оцей файл cstd-kolodiibohdan-2122\coverage\kindergarten\index.html і побачите всю картину тестів

                            Kindergarten v1.25  -- added Kindergarten-list & kindergarten-details & updated tests
    До даної версії було додано дві нові компоненти : Kindergarten-list & kindergarten-details. Тепер таба "Kindergarten", котра знаходиться справа в меню працює. Ця таба перенаправить вас на вкладку Kindergarten-list де розпарсаються дані з колекції, в якій міститься всі садочки. Якщо навести курсор мишки на будь-який садочок, то спрацює ховер ефект і ви побачите коротку інформацію про садочок і кнопку, котра перенаправить вас на вкладку з деталями про цей конкретний садочок. На вкладці деталей ви будете бачити тайтл садочку і кнопку(кнопка перенаправить вас вниз сторінки де буде форма, також кнопка заповнить дані про вас(поки тільки імейл)). Якщо поскролити нижче то можна побачити опис про садочок, види груп, переваги садочку, адреси садочку і форми перебування в садочку. В самому низу знаходиться форма, котру потрібно заповнити, якщо хочете подати за'явку на запис вашої дитини у цей садочок. Після того,як ви заповнете форму, то вона буде надіслана в нову колекцію де будуть зберігатися всі форми(коли буде розроблено сторона представника садочку, то він зможе бачити всі ці форми і приймати рішення чи написати вам). До всіх компонент вже розроблено адаптивність(тобто під будь-яку ширину екрану) і оновлено тести. 
