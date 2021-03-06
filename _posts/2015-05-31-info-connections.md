---
layout: post
title: "Информация и связи"
tags:
- Программирование
- Документация
---

Есть ряд проблем с поиском информации. Доступной информации в наше время слишком много, но доступной она была не всегда -- и существовала проблема поиска связанной информации. Сначала появились сноски и цитаты. Чтобы найти связанную информацию при виде сноски, приходилось опускать глаза в самый низ страницы, после чего искать указанный там источник, для чего в лучшем случае пришлось бы пошариться по собственной книжной полке, в неплохом -- сходить в библиотеку или спросить у друга, в худшем -- остаться с носом. В любом случае, это долгий процесс (вплоть до \\(+\infty\\) затрат по времени). Во многих случаях настолько долгий, что его просто забрасывают.

### Ещё немного истории

Потом появился интернет и гиперссылки. И... поначалу пользы от этого было немного. Чтобы создать ссылку на информацию, нужно получить адрес этой информации, что означает необходимость опубликовать её в источнике, который можно адресовать. То есть, в нашем случае это должен быть адрес страницы в интернете.

И эта концепция "выстрелила", теперь по подобным адресам доступны практически все знания человечества, успевай читать. Разумеется, было ограничение: так можно было открывать только информацию, доступную по цепочке ссылок с начатой страницы. Сначала проблема решалась "сайтами-друзьями": они размещали ссылки друг на друга только потому, что были посвящены связанным тематикам (или поддерживались связанными авторами). Потом появились поисковые системы: сначала на самих сайтах (когда кто-то додумался в определённое место сайта повесить алгоритм поиска), затем и глобальные.

Сейчас способ работы гиперссылок (а те "ссылки", что мы знаем, называются именно так) кажется настолько очевидным, что знаком практически всем: вы нажимаете на объект со ссылкой и переходите на страницу, куда ссылка ведёт. Если хотите вернуться назад -- у вас есть в браузере соответствующая кнопка. Вроде бы полный порядок.

Проблемы начинаются, когда информация разбита на очень мелкие части. В этом случае вам придётся постоянно перемещаться вперёд-назад, чтобы открывать кусочек, в котором вы заинтересованы сейчас. На границе XX-XXI веков с этим справились с помощью открытия нескольких браузеров сразу в многозадачной среде: на мониторе можно держать таким образом несколько страниц сразу. Но тогда мониторы были гораздо меньших разрешений, и спасало только то, что такой "мелко нарезанной" информации было немного. Откуда ей было браться и зачем?

### Наши дни

Изменилось ли что-либо сейчас? Конечно, немало времени прошло со времён изобретения гиперссылок.

Возникла потребность предоставлять информацию компьютеру для "умного" поиска. Есть целая область, называемая "семантический веб", в которой люди занимаются тем, что разрабатывают инструменты для публикации и анализа такой структурированной информации: протоколы, стандарты, интерфейсы, языки. У них есть что-то работающее, но широкой аудитории об этом практически ничего не известно. Но применения есть. Видели [Google Now](https://www.google.com/search/about/learn-more)? Для его существования необходим колоссальный объём данных, понятный машине. Можно либо изначально заполнять данные в таком формате, либо извлекать их из других текстов. Разумеется, первое проще, но требует всего того же, что нужно второму -- форматы.

Есть и другая потребность -- поиск по информации, изначально генерируемой компьютером. Как программист, я сам регулярно с такой сталкиваюсь. Автодополнение в языках со статической типизацией как раз занимается тем, что производит поиск по организованной структуре данных о вашей программе: в каком классе какие методы, какие у каждого метода есть вариации. Часто программисту даже описание функции не нужно, если она хорошо названа и её назначение можно угадать из названия и аргументов. Но если автодополнения нет, то вам, скорее всего, придётся раскопать документацию по вашему API, и вы получите о функции исчерпывающую информацию. Вот только в одной строчке вполне может быть 3 вызова разных функций. И вам придётся по каждой из них найти страницу. Это не проблема, если сайт с документацией хорошо спланирован и информация разных видов на нём хорошо отделена. А если нет?

### О важности структуры

Когда-то я написал по известной в сообществе Game Maker библиотеке 39DLL то, чего ей так не хватало -- документ, в котором был полный список реализованных в ней функций. Элемент списка выглядел примерно следующим образом:

> #### `функция(арг1, арг2)`
> * `арг1` (тип) -- описание
> * `арг2` (тип) -- описание
>
> Описание

...плюс была сводная таблица всех типов данных, используемых там.

Я получил много хороших отзывов за этот документ, просто за способ изложения -- там было несколько фактических ошибок, вытекших из копипаста, но документ в целом они не слишком портили. Но сейчас я понимаю, что есть много способов улучшить даже это. Исходный документ был написан в Microsoft Office Word и собран в PDF, сейчас же я не задумываясь выберу веб-страницу для такого документа. Причины, может быть, для вас и очевидны, но я всё же и о них поговорю.

Во-первых, когда вы работаете над документом Word, выбор редакторов у вас невелик: вы либо используете сам Word, либо развлекаетесь с чьей-то попыткой корректно переварить этот формат. Сейчас эти попытки чаще успешны, нежели нет, но это только первая часть истории.

Во-вторых, я этот документ готовил прежде всего для себя и с намерением напечатать. Сейчас я понимаю, что печатать информацию бесполезно: она изменится, на бумаге останется устаревшая, получается пустая трата бумаги. Практически всё, что развивается, изменится вскоре после печати, а по устоявшимся продуктам либо неплохой документации уже хватает (и её можно печатать), либо она просто не нужна. Исключения есть, но речь сейчас не о них.

В-третьих, для любого уважающегося себя сайта документации сейчас просто необходима интерактивность: взять хотя бы поиск. По печатным документам поиск возможен разве что глазами. Но обычный браузерный поиск -- тоже скучно. Гораздо интереснее нечёткий поиск: поиск, в котором совпадающей считаются не только записи, в которых есть искомая подстрока, а и те, в которых символы этой подстроки встречаются в той же последовательности. Разумеется, вычислительно алгоритм гораздо более сложен, поэтому пользоваться им как попало не стоит. Но поиском можно внаглую занять клиента -- отдать ему данные, пусть сам ищет. Хе-хе.

### В FedWiki поняли одну важную вещь

Я здесь, кажется, ещё ни разу не рассказывал о Federated Wiki. Это очень занятный проект, состоящий, в основном, из [клиента](https://github.com/fedwiki/wiki-client). [Сервер](https://github.com/fedwiki/wiki-node-server) вроде и есть, но он не так уж важен. Почему? Потому что клиент приспособлен для общения с несколькими серверами сразу, клиент же загружается только с первого (точки входа). Протокол стандартизирован, разработан он поверх формата данных, что позволяет размещать совместимые с этим клиентом сайты только-для-чтения. Сейчас объясню, чем это полезно.

Первая очень важная вещь об этой вики -- клиент может одновременно держать открытыми несколько страниц сразу.

![Скриншот FedWiki](http://i.imgur.com/XJlZT6F.png)

Почему это важно? Потому что вы видите контекст, из которого вы перешли к связанной странице, и вам даже возвращаться к нему не надо -- он тоже на экране. Причём не менее важно, что эти страницы могут быть с разных серверов, как на скриншоте. Это чем-то похоже на традиционный механизм вкладок, только демонстрируются сразу все, слева направо. Если открыть какую-то ссылку на ранней странице (на скриншоте -- на странице слева, например), то страницы правее неё закроются, вместо неё откроется другая.

Интересно то, что вики выглядит редактируемой. Но вносить изменения на самом деле вы можете только на собственный сервер, умеющий сохранять (у меня есть такой, но как его развернуть, я здесь описывать не буду). Что будет, если вы попробуете изменить содержимое на чужом сервере? Ошибка доступа? Нет, всё сохранится. На вашем же компьютере. И видеть изменённый контент сможете только вы.

Эта вики пока существует в виде "концепта", и хотя реализация работает неплохо и что-то делает, у неё большие проблемы с интерфейсом: сложно понять без инструкции, что как происходит. В каком-то виде есть "просьбы принять вклад": вы вносите изменения у себя и отправляете изменения на модерацию владельцу сервера. Разумеется, доступно это не везде. И совсем не работает для статических узлов, которые и не интерактивны вовсе.

### Гипотетически...

Один узел такой вики предназначается для описания какой-то небольшой области. Скажем, давайте прикинем, как эта система может быть примененя для обзора документации к коду.

Один сервер может поддерживать документацию к одной библиотеке. Для чего в такой системе возможность ссылаться на страницы для других библиотек? Очень просто: библиотеки тоже частенько не сами по себе, а реализованы поверх других. Поэтому в документации к библиотеке вполне разумно иметь ссылки на используемые элементы из другой библиотеки.

При наличии одного клиента и многих серверов чтение такой документации ощущается, как чтение в одной системе, несмотря на то, что узлы поддерживаются разными людьми и вовсе зачастую размещены на разных серверах.

Способов представить информацию в совместимом с этой системой виде полно. Формат файлов очень прост, интерфейс тоже. Вот как выглядит страница с одним блоком из Markdown:

{%highlight json%}
{
  "title": "Another example page",
  "story": [
    {
      "type": "markdown",
      "id": "07ba18f52ba13a0e",
      "text": "Привет!"
    }
  ],
  "journal": [
    {
      "type": "create",
      "item": {
        "title": "Another example page",
        "story": []
      },
      "date": 1433024342293
    },
    {
      "item": {
        "type": "markdown",
        "id": "07ba18f52ba13a0e",
        "text": "Привет!"
      },
      "id": "07ba18f52ba13a0e",
      "type": "add",
      "date": 1433024349666
    },
    {
      "type": "edit",
      "id": "07ba18f52ba13a0e",
      "item": {
        "type": "markdown",
        "id": "07ba18f52ba13a0e",
        "text": "Привет!"
      },
      "date": 1433024355905
    }
  ]
}
{%endhighlight%}

Формат лично мне понятен даже без документации: есть `title` с заголовком страницы, есть `story` с текущим состоянием (блоками), есть `journal` с журналом изменений, который нужен не всегда, но может поддерживаться серверной частью. Каждый блок интерпретируется клиентом, на сервере только исходный текст. Может также быть `sitemap.json`, который содержит имеющиеся на сервере страницы в виде заголовков и адресов. Серверный интерфейс поддаётся расширению, а в корне достаточно прост: все запросы на редактирование это `PUT`-запрос с JSON, содержащим суть изменения. Сервер его либо принимает, либо отклоняет -- в зависимости от этого клиент может сохранить страницу локально или довериться в этом вопросе серверу. Запросы на чтение просто забирают с сервера JSON-файлы (на вид).

### И что с того?

Это всего лишь стандарт обмена данными, сильно рассчитывающий на хранение данных у клиента. Больше ничего. В далёком будущем, когда задержки будут астрономическими (связь с Марсом потребует для передачи минимум 9-20 минут в разных местах орбиты, и это только в одну сторону!), выбор у нас будет невелик -- нам придётся часто дублировать данные между узлами, и HTTP в его текущем виде на это не будет способен. Поэтому уже сейчас стоит развивать архитектуры, способные действовать с сетью и без неё, сохраняя связи.

На мой взгляд, "Федеративная Вики" в этом вопросе бежит немножко впереди нашей цивилизации и сильно спотыкается на отсутствии документации (какая ирония!). Но в ней определённо есть идеи, которые будут применены в том Вебе, который мы однажды увидим, но которых нет в том Вебе, который мы знаем сейчас.
