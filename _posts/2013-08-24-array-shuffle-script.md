---
author: D-side
comments: true
date: 2013-08-24 19:44:27+00:00
layout: post
slug: array-shuffle-script
title: Перетасовка массива по Дуршенфельду
wordpress_id: 714
tags:
- Программирование
- GameMaker
---

Маленький, но полезный фрагмент GML, если вдруг кому-то такой нужен. Генерация случайной перетасовки массива. Модифицированный Дуршенфельдом метод Фишера-Йейтса. От изначального отличается тем, что все действия производит прямо в массиве, ничего не перебирая.

Сложность: \\(O(size)\\)

Предназначен для GameMaker Studio, но не любой, а достаточно новой (последние версии из 1.1 и любые более новые).

{% highlight c %}
if !is_array(argument0)
    return 0;
var size = array_length_1d(argument0);
var i = 0;
var temp;
for (i = 0; i < size ; ++i)
{
    var ir = irandom(size - i - 1);
    temp = argument0[i + ir];
    argument0[i + ir] = argument0[i];
    argument0[i] = temp;
}
return argument0;
{% endhighlight %}
