---
layout: post
title: HaxeFlixel после GameMaker
date: 2014-08-16
tags:
- Программирование
- Игрострой
- haxe
---

Каково, просидев долгие годы на очень удобном конструкторе, сделав на нём несколько игрушек, взять "сырой игровой движок" и начать шаманить с ним? Ну... это не катастрофа. Жить можно. Это многому учит из того, что конструктор делал за вас, и какую вы можете извлечь выгоду из явного управления этим делом. Я считал когда-то, что понимаю, как устроен GM. Что при большом желании, необходимости и наличии ресурсов я смогу его написать сам. И, наверное, я был прав, но я всё ещё узнал бы немало.

Последний... месяц, наверное? работы с haxe я читаю исходники. Разные исходники. В основном то, что касается [HaxeFlixel](http://haxeflixel.com/), в том числе исходники самого движка (крайне поучительно). Пожалуй, мне стоит вам рассказать, что это такое, откуда взялось и куда едет.

Для начала отмечу, что программы на Нaxe изначально можно было нормально собирать только в `*.swf`, флэш-приложения. Поэтому портировать на Haxe, преемника ActionScript (хочет того Adobe или нет), начали портировать то, что было в первую очередь полезно именно разработчикам-флэшерам. И одним из таких крайне полезных продуктов был [Flixel](http://flixel.org/) &mdash; который называют игровым движком... с хорошей долей точности, да. В сущности &mdash; это всего лишь алгоритм управления неким списком рисуемых объектов (`DisplayList`). Но если разобрать любую игру на мельчайшие детали, на дне вы обнаружите что-то похожее. Опустим детали. Они здесь не важны.

Итак, появился HaxeFlixel. Но и Haxe не стоял на месте. Это вообще интересный язык, который не имеет собственного компилятора, т. е. в запускаемый машинный код напрямую не переводится. То, что называется компилятором Haxe, является на деле транслятором, переводящим исходный код на Haxe в исходный код на другом языке. И таких "других языков" сейчас очень много: C#, Java, JavaScript, C++, PHP... Но нас интересует С++.

### Немножко о С++

Компиляторы для C++, я вам скажу, продвинутые. Они оптимизируют всё, что только могут, хвастаются килотонной настроек для оптимизаций, а кривой код компилируют таким образом, что он начинает работать... криво. Хотите пример? [Смотрите](http://stackoverflow.com/questions/24296571/why-does-this-loop-produce-warning-iteration-3u-invokes-undefined-behavior-an):

{%highlight c++%}
#include <iostream>

int main() {
  for (int i = 0; i < 4; ++i)
    std::cout << i*1000000000 << std::endl;
}
{%endhighlight%}

Этот код, если компилировать с хорошими флагами оптимизации, оказывается **бесконечным циклом**. Почему, спросите вы? Потому что компилятор заскучает от лишних операций и сделает вот это:

{%highlight c++%}
#include <iostream>

int main() {
  for (int i = 0; i < 4000000000; i+= 1000000000)
    std::cout << i << std::endl;
}
{%endhighlight%}

И возникнет занимательная деталь. *В 32-битное знаковое целое число не влезает 4 миллиарда.* Только 2 с лишним. Компилятор попытается соорудить прыжок с условием, но не сможет сформулировать условие, поскольку число в указанном типе непредставимо. И цикл окажется без условия, то есть, бесконечным. Весело, да? Никаких ошибок не будет (может всплыть предупреждение), компиляция успешно завершится.

Это пример **undefined behavior**. Программа пришла в ту часть стандарта, в которой тот отказывается от ответственности и заявляет, что **программа может вести себя как угодно** &mdash; нельзя заранее предсказать, как. Ошибка есть даже в непреобразованной части, одно из выводимых в `cout` (оператором `<<`) значений не умещается тот тип, в котором представлено `i`, поэтому при сложении произойдёт "переполнение" (попытка записать значение больше максимального), и результат станет... отрицательным? `O_o` Да. "С другой стороны" диапазона значений этого типа такие же отрицательные числа. `int` может быть опасным, ха.

Это так, лирическое отступление. С++, кстати, стоит изучать хотя бы затем, чтобы понять, как компьютер вас понимает. Ещё лучше бы изучать С... но это уже на ваш выбор.

### Итак, Haxe начал поддерживать С++...

...и это позволило Haxe вырваться за пределы флэша и с помощью разных библиотечек собирать автономные приложения, в частности &mdash; игры. Скачал, запустил, работает. Люди разогнались и собрали инструменты для сборки игр на Haxe под Windows, OSX, Linux, Android, iOS... А всё потому, что С++ на этих системах работает. HaxeFlixel не единственный инструмент на Haxe для сборки игр. Но мне он показался наиболее просто устроенным. Хотя и в нём есть свои заморочки.

### Простота архитектуры

На HaxeFlixel не слишком легко разрабатывать, если раньше ничем подобным не занимались. Просто немножко удивляет, насколько всё изнутри просто устроено. Из этого, конечно, следует очевидный минус &mdash; многое нужно писать самостоятельно.

Тут спасает ассортимент объектов, доступных в самом движке. В GM выбирать не приходится &mdash; шаблон под объект всего один, предполагается его "физическое существование", наличие у него спрайта, возможноксть включения физики... У него можно включать и выключать разные вещи, из-за чего интерфейс выглядит довольно громоздко, а новички большинством этого великолепия всё равно не пользуются. Впрочем, без надобности и не трогают. Видя, что интерфейс становится сложноватым, Марк Овермарс (а тогда разработка велась под его началом) ввёл "упрощённый режим" и "расширенный режим". В упрощённом некоторые элементы управления (ненужные новичкам) прятались, и всё выглядело более-менее понятно.

В HaxeFlixel объекты выстроены в иерархию. Как, впрочем, и все типы Haxe, но нас интересуют представленные в движке.

* `FlxBasic` как незримое божество &mdash; о нём неизвестно решительно ничего, но он существует и может выполнять действия в игровом мире.
* `FlxObject`, подвид `FlxBasic` &mdash; уже похож на GM-овский объект: умеет сталкиваться, двигаться (в том числе с ускорением), может иметь массу (хотя работает она, если верить документации, непредсказуемо)
* `FlxSprite`, подвид `FlxObject` &mdash; просто объект со спрайтом.
* `FlxNapeSprite`, подвид `FlxSprite` &mdash; полноценное физическое тело в [Nape](http://napephys.com/), физическом движке. Nape по назначению похож на Box2D, но что круче, сказать трудно.

Это, конечно, не все. Вообще можно (и нужно) создавать для своих объектов собственные классы. Но во многих случаях бывает достаточно создать один из вышеуказанных и просто задать параметры. В GM именно это и происходит, только прототип всего один и параметров очень много. Но здесь код движка компилируется вместе с вашим, на том же языке, по тем же правилам.

Заметили, что возникла цепочка из наследования? В списке каждый следующий &mdash; наследник предыдыдущего. Это не случайно, и это всего лишь одна из веток всего дерева объектов. В HaxeFlixel конструирование нового объекта обычно означает наследование от существующего. Есть ли другие подходы? Ну а то.

Unity3D использует немножко другую систему. В ней новый игровой объект обычно собирается из отдельных компонентов. Ему нужны столкновения? Добавить коллайдер. Нужна анимация? Повесить модель-скелетик и соответствующий контроллер. Нужно корректное физическое поведение? Приклеить физическое тело. В таком подходе любой объект составляется из каких-то отдельных компонентов, а в сущности они из себя представляют одно и то же.

Итого два подхода, "наследовательный" (ох, какое страшное слово) и "компонентный". Возможно, есть и другие, но эти наиболее популярны и (важно!) не являются взаимоисключающими. Не могу сказать за Unity3D, но в HaxeFlixel реализовать систему компонентов не мешает решительно ничего, и это уже пытаются сделать (впрочем, пока предлагают добавить только в пакет `flixel-addons`, в дополнения). Кстати, компонентная система устроена внутри сложнее, и ресурсов потребует больше. Насколько? Трудно сказать. Однозначно уйдёт несколько больше оперативной памяти на хранение списка компонентов в каждом объекте; зато гораздо проще "играться" &mdash; добавлять и удалять компоненты прямо после запуска, следить за реакцией. То есть, да, ресурсы тратятся вовсе не впустую.

### Аналогия в ресурсах