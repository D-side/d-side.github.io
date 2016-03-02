---
layout: post
title: Сам себе парсер
tags:
- Программирование
- Ruby
- C
- Гипотетически
---

Я успел поработать со многими языками. Как-то в компании один из друзей задал мне вопрос "ты сколько языков программирования знаешь?", на что другой (пока ощупавший всего пару языков) заметил, что стоит изучить всего несколько, и они все начинают казаться одинаковыми. Он почти прав. Под всеми языками лежит сколько-то общих концепций. После изучения нескольких (желательно, максимально непохожих) языков постижение какого-то нового уже не кажется таким тяжёлым.

Интересно причём то, что в каждый отдельно взятый момент времени "в ходу" довольно небольшой набор концепций, поэтому изучение даже какого-то одного даёт неплохую базу для изучения остальных.

Чтобы уверенно писать на любом языке, нужно научиться бить программный код на части. Примерно так же, как это в итоге делают компилятор/интерпретатор. Авторы [SICP](https://mitpress.mit.edu/sicp/full-text/book/book.html) используют в качестве "первого" языка Scheme именно по той причине, что в нём это не требуется -- всё уже разбито на соответствующие части, каждую из которых можно довольно быстро объяснить. Во многих других языках даже увидеть эти части -- проблема.

### Какие ошибки это устранит

Я видел достаточно много попыток переварить какой-то язык программирования. И даже частично помню собственные. Без понимания того, на что код в итоге будет разобран, можно попытаться наложить "человеческий язык" на синтаксис языка программирования. В результате можно получить, к примеру, это (на С):

{% highlight c %}
int c = getNumber(); // какой-то ввод числа, неважно
if (c = 1 || 3 || 5) {
    // несчастье
}
{% endhighlight %}

Ладно, пусть внимательно читавший учебник по языку уже знает о ловушке `=`/`==` и всё-таки написал этот кусок правильно:

{% highlight c %}
if (c == 1 || 3 || 5) { // <- вон там добавилось =
    // несчастье
}
{% endhighlight %}

...но приоритет оператора `==` выше, и этот же код можно написать вот так:

{% highlight c %}
if ((c == 1) || 3 || 5) {
    // несчастье
}
{% endhighlight %}

Так, в коде явная дыра. Давайте её поправим!

{% highlight c %}
if (c == (1 || 3 || 5)) {
    // несчастье
}
{% endhighlight %}

И это всё ещё не работает, "несчастье" происходит, только если вводить `1`. И чтобы добраться до самого дна, вспомним арифметику. В примере `1 * (2 + 3)` выражение в скобках выполняется первым. Не всегда приходит в голову, что используемые в `(c == (1 || 3 || 5))` работают точно так же. То есть, получается, что `(1 || 3 || 5)` равно `1`. Да, так и есть: в С вместо логических значений только нули (ложь) и не-нули (истина).

Напоследок, должно быть так:

{% highlight c %}
if ( c == 1 || c ==  3 || c ==  5 ) {
    // несчастье
}
{% endhighlight %}

### Это как арифметика

...только операторов больше. И если держать их под контролем, можно делать вот такие забавные вещи:

{% highlight c %}
char c;
while ((c = getchar()) != '0') {
    // выполнится для каждого вводимого символа до `0`
}
{% endhighlight %}

Или такие, что даже считается нормальным (погрузимся в дебри С++):

{% highlight c %}
cout << "Строка, " << манипулятор << число;
{% endhighlight %}

`<<` здесь тоже в роли самого обычного инфиксного оператора, в таком же контексте, где **этот же самый** оператор используется для *побитового сдвига влево* для **чисел**.

{% highlight c %}
a = 2 << 1; // Это 4
{% endhighlight %}

...а вывод -- просто реализация `<<` для **потока**.

### Это было просто...

Отлично! Тогда давайте глянем на Ruby.

{% highlight ruby %}
data = {
  a: 2
  b: {
    c: 1
  }
}
data[:b][:c] = 2
{% endhighlight %}

В последней строчке самое интересное то, что пары квадратных скобок являются частями **разных** операторов. *Внезапность.* Вроде оба реализуют "поиск по ключу". Но они делают это по-разному. В Ruby я могу это записать иначе, чтобы стало понятнее, что происходит:

{% highlight ruby %}
# Так лучше?
(data[:b])[:c] = 2
# А так?
data.[](:b)     # Перенос строки совершенно необязателен
    .[]=(:c, 2) # ...но с ним немножко красивее
{% endhighlight %}

Но такая форма записи используется настолько редко, что даже подсветка из Pygments на ней сломалась. Да, это методы с названиями `[]` и `[]=`.

### В заключение

Чтобы писать на любом отдельно взятом формальном языке (программирования, разметки, и т. п.), надо сначала научиться видеть в нём отдельные операторы и понимать <s>их приоритет</s> какой из них выполнится первее.