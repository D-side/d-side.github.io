---
layout: post
title: Домашний Андроид
---

После светопредставления в исполнении <abbr title="Роскомнадзор, федеральная служба по надзору в сфере связи, информационных технологий и массовых коммуникаций">РКН</abbr> вокруг блокировки Телеграма в середине 2018 я лично наблюдал перебои с доступом к самым разнообразным сервисам, и серьёзным звоночком стали перебои с сервисами Google. Имея дома NAS, я задумался над тем, чтобы избавиться от плотной зависимости от сервисов Google. Начиная с того, что к нему максимально прибито -- смартфона на базе ОС Android.

## Насколько всё плохо

Бытует мнение, что Android является островоком свободы на поприще мобильных ОС, имея открытый исходный код и базируясь на Linux, свободном ядре для ОС. И хотя аргументы верны, они демонстрируют лишь часть истории. Хорошую часть. Плохая же часть заключается в том, что остальные компоненты системы, а именно драйверы и приложения, делают из этого (казалось бы) комфортного открытого мирка форменный проприетарный ад.

Беда начинается уже с полок магазинов. Вы приобретаете смартфон, приносите домой, выключаете, и вот вас уже встречает логотип Google, предлагая войти в свой аккаунт. Некоторые смартфоны даже не предоставляют возможности этот шаг пропустить. Хотя бывают исключения, где вас встречает не Google, а другая здоровенная корпорация.

Вам, как пользователю, скорее всего всё равно эти сервисы нужны. Даже если в перспективе вы хотите уменьшить их количество. И вы вводите свои учётные данные. После чего смартфон, скорее всего, вскоре попытается обновить целую пачку приложений от Google, вроде Play Фильмы, Play Музыка... Инстинктивная реакция "так пойду удалю, раз они мне не нужны" наталкивается просто на отсутствие кнопки "Удалить". В лучшем случае присутствует "Отключить" (и то не всегда). Потому что эти приложения установлены в системный раздел, который в заводской конфигурации, без существенных изменений в системе, доступен только для чтения. "Отключение", максимум что вы можете без серьёзных вмешательств с ними сделать, в сущности оставляет у вас в профиле пометку, скрывающую приложение из списков и запрещает запускаться любым его компонентам. Не так уж плохо, единственный ресурс который оно занимает без пользы для пользователя, это дисковое место, обычно не так уж много, и всё равно в недоступном системном разделе (хотя за счёт этого его можно было сделать поменьше, дав пользователю больше места).

Ладно, большинство приложений от Google, которое возможно не запускать самостоятельно, иногда можно отключить; и даже будучи включенными, они своим существованием не особенно мешают: не швыряются уведомлениями в непонятные моменты, не просят кучу подозрительных прав доступа при запуске (если их, хм, не запускать). Потому что многие производители засовывают в системный раздел ещё и собственный набор приложений. Часть из которых, причём, может иметь особо жёсткую интеграцию с интерфейсом телефона (быть под шторкой уведомлений, к примеру) и потому быть фактически неотключаемыми. У меня был один совсем патологический случай: виджет погоды в области уведомлений при щелчке запускал приложение погоды от производителя; и первое, о чём оно просило, это доступ... к журналу звонков? А они там это... не... ладно, проехали.

Даже если вы поотключаете лишние приложения, а возможно даже пойдёте во все тяжкие, получите права суперпользователя (в простонародье "рут") и выкинете ненужные вам приложения из системы...

> И предположим, что вы делали всё аккуратно, и система сохранила должную работоспособность -- потому что легко удалить какое-нибудь приложение от производителя, которое используется в глубоких системных компонентах, из-за чего графический интерфейс начнёт постоянно "падать", т. е. аварийно завершать работу. Возможны и другие последствия. К счастью, почти все они обратимы, и решаются резервным копированием для каждого потенциально опасного действия.

У вас точно останутся "Сервисы Google Play", потому что если удалить их, почти все полезные приложения поломаются напрочь: многие приложения просто не будут запускаться, а что запустится, мало что сможет сделать, ведь среди прочего на этих же сервисах завязаны геолокация, уведомления и ряд других вещей. По этой причине почти любая инструкция по перепрошивке предлагает *отдельно* установить саму прошивку, а *после этого* пакет OpenGapps (собственно, набор приложений от Google). В свежих версиях Android (проверял на 8.0) можно отобрать у них многие права доступа и телефон даже продолжит неплохо работать. Но это ведь системное приложение, которое, в теории, может этими же настройками управлять. Посему ему теоретически ничто не мешает их игнорировать. <abbr title="лат. Кто устережёт самих сторожей?">Quis custodiet ipsos custodes?</abbr>

С уведомлениями ситуация хуже всего, но при этом обоснованно удобная. Если кратко, то смартфон для поддержания множества сетевых соединений расходует много энергии. Чтобы снизить количество поддерживаемых постоянно соединений до одного, уведомления на смартфон отпрвляются через общую "шину": сервер GCM (Google Cloud Messaging), к которому для доставки уведомлений подключаются серверные службы разработчиков отдельных приложений, вместо того чтобы каждый смартфон соединялся с сервером каждого приложения. Так, уведомления для огромного количества приложений идут через один сервер, и телефону нужно держать постоянное соединение только с ним, чтобы получать уведомления практически для всего. И этот сервис тоже принадлежит Google.

> Особенно заметен этот эффект, когда сеть работает не вполне стабильно и в какой-то момент прекращает устанавливать новые соединения. Уведомления продолжат приходить, поскольку соединение для них установлено ранее, но открытие приложений, на которые они ведут, приведут к ожиданию сетевого соединения, поскольку приложения собственных обычно не держат.

> А ещё тем фактом, что сервер уведомлений общий для всех приложений, воспользовался Telegram во время войны с РКН в 2018 году, чтобы повысить свою работоспособность на мобильных устройствах: ведь блокировка серверов доставки уведомлений отрезала бы всех россиян от практически всех сетевых уведомлений в Android.
>
> Моё уважение. Ловкий ход. Хоть и немного подлый, по сути это взятие чужого крупного полезного сервиса "в заложники".

Ну и почти наверняка вам нужен Google Play, особенно если вы ещё не вполне определились, какие именно функции вы хотите от смартфона. И тем более, если что-то там уже купили. Хотя сторонние инструменты для загрузки приложений оттуда существуют, но их я ещё не пробовал и не могу рассказать об их ограничениях.

И Google Pay, если вы живёте "на грани" и расплачиваетесь по NFC.

**Плотненько, да?**

Антимонопольные службы, конечно, уже отметили, насколько мёртвой хваткой Google держит эту с виду открытую платформу, и начали изъявлять своё недовольство и штрафовать компанию. Но это вряд ли когда-нибудь приведёт к сколько-нибудь ощутимым последствиям и смене политики.

Что пользователю с этим всем делать? Ну, можно и ничего. Но если службы Google будут по каким-либо причинам отрезаны, отвалится очень многое. Что можно предпринять?

#### Магазин приложений

Что получается, я ставлю из [F-Droid](https://f-droid.org/en/), это такой каталог для бесплатных Android-приложений с открытым исходным кодом. Нельзя считать, что приложения в нём на 100% безопасны, но их хотя бы можно изучить без реверс-инжиниринга, что в моих глазах уже поднимает его на голову выше Play-маркета в вопросах безопасности. Кроме того, там есть полезная фишка, "анти-фичи": указания о потенциально нежелательных свойствах приложения вроде несвободных лицензий на отдельные кусочки, обязательное взаимодействие с закрытым кодом сервера, отслеживание действий пользователя, реклама и тому подобное.

Замечу, что многие приложения с открытым исходным кодом есть и в Play Market, **но они не всегда такие же**.

> Клиент Telegram, например, у меня установлен не из F-Droid, потому что версия из Play Market использует GCM, а версия из F-Droid использует для уведомлений сервис самого Telegram. Если с GCM возникнут проблемы, можно перейти и на версию без него, ценой немножко большего потребления батареи.

> Нередки также случаи, когда в Play Market имеются (1) "облегчённая" от ряда функций версия бесплатно и (2) полноценная за небольшую сумму денег. При этом в F-Droid в таких случаях зачастую бесплатно распространяется полная версия и предлагается сделать пожертвование автору на дальнейшую разработку.
>
> В этом есть смысл: аудитория Play Market всё-таки намного больше, а у F-Droid аудитория в среднем гораздо более подкована технически и вполне может собрать что-нибудь прямо из исходников, убрав из них ограничения. Так зачем лишний раз тратить их время? Тем более что среди них есть немало сознательного народу, готового вносить пожертвования деньгами или даже собственными усилиями по разработке (необязательно только программированием, открытым проектам нередко нужен дизайн или локализация на другие языки).

Гипотетически, дома можно завести собственный репозиторий F-Droid, но смысл сего действа при отсутствии собственных приложений не очень понятен: обновления чужих приложений нужно откуда-то загружать. А если уже есть доступный источник, для чего заводить собственный? Резервное копирование? Да ну. Его лучше посредством <abbr title="маленькая операционная система, запускаемая вместо Android по особому сочетанию кнопок, в которой обычно предусмотрен сброс к заводским настройкам, но сторонние умеют также устанавливать прошивки и делать резервные копии всей системы">recovery</abbr> делать, лучше справится. Но любопытство всё равно тянет попробовать. Может быть, когда-нибудь, особенно если обстоятельства заставят.

> Если вы пытались пользоваться F-droid в нескольких профилях пользователей и с удивлением обнаружили, что в другие профили (т. е. любой кроме "главного") он не устанавливается без осмысленных объяснений -- не отчаивайтесь, нет, установка приложений из `*.apk`-файлов в другие профили возможна, но исключительно той же самой версии, что уже установлена в главном профиле. F-droid на главной странице предлагает скачать не самую новую версию, а после установки её очень легко обновить. Если вы это всё-таки сделали, просто скачивайте F-droid **не с главной страницы его сайта**, а [со страницы его приложения](https://f-droid.org/en/packages/org.fdroid.fdroid/), где самая верхняя версия обычно и есть та, на которую происходит автоматическое обновление.

#### Календарь и контакты

Календарь весьма полезен, даже если вы не фиксируете свой график занятости, например просто чтобы напоминать о днях рождения людей в списке контактов. А телефонную книжку гораздо удобнее исправлять и пополнять с компьютера, нежели с телефона.

[Nextcloud](https://nextcloud.com/) хорошо работает как собственная серверная часть такой службы. Клиентская же часть состоит из нескольких частей:

* Синхронизацией календаря и контактов можно занять [DAVx⁵](https://f-droid.org/packages/at.bitfire.davdroid).
* Есть также серия приложений [Simple Mobile Tools](https://simplemobiletools.com/), предположительно состоящая из "подтянутых" старых приложений из Android Open-Source Project: прямых ссылок на F-Droid на самом сайте нет, но есть на гитхабе каждого соответствующего приложения, да и в самом F-Droid по слову "Simple" они быстро находятся. Приложения простые, легковесные и без излишеств. В частности, там есть приложения календаря и контактов.
* Вообще календарь может быть, в теории, любым, что использует системные календари. Говорят, что [Etar](https://f-droid.org/en/packages/ws.xsoh.etar/) хорош.

#### Заметки

Скажу честно, мне очень нравится Google Keep. Чисто интерфейсом. "Карточным" обзором заметок, который хорошо работает и в широком браузере на компьютере, и на узеньком телефоне.

Я долго искал альтернативу и нашёл совершенно внезапно в форме [Carnet](https://f-droid.org/en/packages/com.spisoft.quicknote/): интерфейс у него не настолько отполирован, но дополнительные возможности (в основном форматирование) и размещение серверной части в Nextcloud (да-да, в нём же; с помощью одноимённого плагина) очень меня радуют.

#### Синхронизация файлов

Ну, тут история совсем короткая, это чуть ли не первичная функция Nextcloud (опять он!), можно просто использовать его по прямому назначению.

Хотя нет, не совсем короткая. Дело в том, что путём синхронизации файлов можно синхронизировать данные многих других приложений. Единственное, чего стоит остерегаться это расхождений истории: не все приложения хранят данные в формате, который файловая синхронизация может изменять лишь частично.

К теме безопасности, например, можно синхронизировать базу с паролями под KeePass. Поскольку она сама по себе зашифрована, её синхронизацию относительно безопасно делать практически любым инструментом. Для открытия рекомендую [KeePass DX](https://f-droid.org/en/packages/com.kunzisoft.keepass.libre) для смартфона, а для компьютера [KeePassXC](https://keepassxc.org/). Но поскольку вся база с паролями это один файл, если изменить его в двух местах, решить конфликт между ними может быть непросто. Проще всего таких ситуаций избегать, внося изменения только при включенной и работающей автосинхронизации: так, чтобы изменения точно вносились именно в самую свежую копию, и вся изменённая база загружалась в центральное хранилище немедленно.

Есть и другой вариант файловой синхронизации, [Syncthing](https://syncthing.net/); он удобен тем, что для него не нужна серверная часть вовсе (если точнее, то любой клиент, что всегда в сети, можно считать сервером), но и синхронизация между двумя сторонами будет происходить только тогда, когда они обе в сети одновременно, что не очень удобно, но обычно терпимо. Для него также есть Android-приложение [Syncthing Lite](https://f-droid.org/packages/net.syncthing.lite/), которое вместо традиционной полной синхронизации позволяет скачивать и закачивать отдельные файлы.

#### Двухфакторная аутентификация

Когда-то я начал пользоваться Google Authenticator. Мне кажется, именно он начал продавливать в массы идею использовать <abbr title="Time-based One Time Password, одноразовых временны́х паролей; паролей, основанных на общем секретном ключе и синхронно идущих часах; каждый пароль генерируется на основе секрета и номера временно́го окна размером порядка минуты">TOTP</abbr> в дополнение к паролю; и я благодарен всем, кто активно в этом участвовал. Благодаря этому интернет стал заметно безопаснее.

Authy впрочем, хоть и принимал в этом непосредственное участие, вызвал у меня скорее раздражение. А целый ряд сервисов решил укрепить безопасность своих пользователей через него. Почему раздражение? Просто у Authy алгоритм генерации одноразовых паролей стандартный, но с отклонениями. Во-первых, пароли состоят из 7 цифр, а не 6 (или 8), как обычно. Во-вторых, TOTP-секрет не предоставлялся пользователям напрямую, а передавался через сервер Authy, что не давало возможности использовать приложение на свой выбор и не привязываться к мобильному телефону.

Но как оказалось, секретные ключи из Authy владелец путём хитрых манипуляций (установкой браузерного расширения и вскрытия его посредством JavaScript) всё-таки может извлечь и поместить в приложение на свой вкус... если у приложения не случится паника от семизначных паролей. А почти всё, что я пробовал, приходило в недоумение. Остановился я на [andOTP](https://f-droid.org/en/packages/org.shadowice.flocke.andotp). Он спокойно относится к настройкам для Authy и позволяет делать резервные копии напрямую, без трюков. Но важно понимать, что обращаться с резервными копиями (то бишь, вне приложений-аутентификаторов) такой информации нужно предельно осторожно, по возможности если и хранить, то только в зашифрованном виде.

> Сейчас сходу вспомню только две службы, которые раздражали меня отсутствием стандартной двухфакторной аутентификации: Humble Bundle и CloudFlare. Но с тех времён они всё-таки добавили и стандартную тоже... в общем, вчера я отправил запрос на удаление аккаунта Authy.

> Кстати, KeePassXC на настольных системах не только умеет хранить данные, которые содержит QR-код выводимый при настройке, но и умеет самостоятельно подобный QR-код генерировать. Что делает его неплохим средством резервного копирования 2-факторных секретов.
>
> И да, я знаю, что безопасники рекомендуют вместо переноса секретов создавать новые секреты и переключать аккаунт на новые. Но считаю, что пользы от этого мало.
>
> Максимум, в чём есть практическая польза на мой взгляд, это в хранении резервной копии TOTP-секретов (и других в равной степени опасных данных) в отдельной KeePass-базе с повышенными мерами безопасности. Открывать её только когда нужно настроить двухфактор на новом устройстве или внести туда новую запись (что явление нечастое), а в остальное время держать её под надёжным замком за хотя бы одним обязательным действием в оффлайне (файл-ключ на внешних носителях?).

#### Навигация

У меня нет автомобиля, поэтому мои навигационные нужды ограничены маршрутами пешком, на общественном транспорте или (реже) велосипеде.

Я в последнее время предпочитаю [OsmAnd~](https://f-droid.org/en/packages/net.osmand.plus/), использующий OpenStreetMap, способный работать оффлайн и очень неплохо знающий крупные города практически по всему миру даже для чисто пеших маршрутов. <s>К сожалению, маршруты с общественным транспортом он в настоящее время строить не умеет.</s> Пока я доводил пост до ума, он [научился](https://osmand.net/blog/osmand-3-3-released)! Бета, но на осмысленные маршруты даже в Санкт-Петербурге уже способен. Троллейбусные маршруты почему-то отсутствуют. Похоже, что из-за отсутствия в Osmand~ троллейбуса как отдельного вида транспорта, потому что в OpenStreetMap [данные есть](https://www.openstreetmap.org/relation/5353408). Ну, не всё сразу.

> В Берлине он, ведя меня в местный строительный магазин (даже не спрашивайте, зачем), провёл меня даже по каким-то лестницам и довольно неприметным проходам, где даже с велосипедом было бы трудно. Я был приятно удивлён.

Серверная часть для него толком не нужна. Сторонняя уже есть, но нужна только для обновления карт, и если она по каким-то причинам отвалится, карты продолжат работать достаточное время, чтобы сообразить, как их обновлять в дальнейшем. [На сайте OpenStreetMap](https://wiki.openstreetmap.org/wiki/Downloading_data) можно узнать, где и как скачать карты. Видно, что источников множество, что и понятно, ведь данные доступны по открытым лицензиям, поэтому за доступность карт можно пока не беспокоиться. Наверное.

#### Закладки

Есть расширение [floccus](https://github.com/marcelklehr/floccus) с помощью которого можно синхронизировать закладки между устройствами через Nextcloud (и тут он!), но поддерживается оно только на настольных системах. Хотелось бы видеть такую же встроенную поддержку и на мобильных устройствах, но на момент написания Firefox на Android просто не реализует требуемые API доступа к закладкам, чтобы синхронизировать напрямую закладки в самом браузере, что было бы идеально.

Но на Android ситуация далека от идеальной.

Приходится использовать [Nextcloud Bookmarks](https://f-droid.org/en/packages/org.schabi.nxbookmarks/). Который... лучше чем всё остальное, что я опробовал, по крайней мере он показывает _полный_ список закладок и **позволяет его пополнять** (что главное для моих нужд).

Но организацию закладок по папкам он совершенно не поддерживает, ни просмотр, ни изменение. И по закладкам даже поиска нет. Хотя если верить описанию на странице F-droid, то приложение заброшено и ему нужен новый мейнтейнер. С учётом этого факта оно в весьма неплохом состоянии!

---

Практически все нужные мне смартфонные применения список выше покрывает.

Как видно, почти во всём спасает [Nextcloud](https://nextcloud.com/), но в этом посте я ориентируюсь именно на Android-сторону, и о настройке собственного сервера Nextcloud расскажу отдельно (как только сам буду уверен в надёжности результата).