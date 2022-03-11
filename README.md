# Jq-Slider MetaLamp step 4
#### Задание номер 4 на создания плагина ползунка  для Jquery 

------
### страница с демонстрацией:
https://dmitryguseatnicov.github.io/Jq-slider/

------

### Развертывание 
##### Клонирование репозитрия:
```
git clone https://github.com/DmitryGuseatnicov/Jq-slider.git
```

##### разработка:
```
npm run start
```

##### dev сборка:
```
npm run dev
```

##### prod сборка:
```
npm run build
```

##### Запуск тестов:
```
npm run test
```
------
### Подключение 

Перед подключение плагина нужно подключить библиотеку Jquery  

плагин и стили можно скачать из папки dist или подключить через cdn :

##### плагин:
```
https://cdn.jsdelivr.net/gh/DmitryGuseatnicov/Jq-slider/dist/jqSlider.js
```
##### стили:
```
https://cdn.jsdelivr.net/gh/DmitryGuseatnicov/Jq-slider/dist/jqSlider.css
```

##### html :

```
<body>
    ...
    <div id="slider"></div>
    ...
  </body>
```
##### JavaScript:
```
$(#slider).jqSlider()
```

или

```
$(#slider).jqSlider(data)
```
где  data это объект с параметрами

##### Настройки по умолчанию: 

```
data = {
  min: 0,
  max: 100,
  from: 0,
  to: 100,
  step: 1,
  tip: true,
  range: true,
  progress: true,
  scale: true,
  scaleDestiny: 10,
  horizontal: false,
}
```
------
#### Опции
>|Параметр|Тип|Значение по умолчание|Описание|
> |-------------|----------|---------|---------|
> |min|number|0|минимальное значение ползунка|
> |max|number|100|максимальное значение ползунка|
> |from|number|0|значение ползунка|
> |to|number|100|значение второго ползунка. Работает если range: true|
> |step|number|1|размер шага|
> |tip|boolean|true|Значение над ползунком|
> |range|boolean|true|значение от и до если true или от min до from если false|
> |progress|boolean|true|заливка прогресса в интревале|
> |scale|boolean|true|Линейка под слайдером со значениями|
> |scaleDestiny|number|10|шаг засечки на линейке.то есть если интревал от 0 до 100, а данное значение 10 то через каждые 10 пунктов будет отображаться засечка на линейке со значением  |
> |horizontal|boolean|false|Положение горизонтальное если false или вертикальное есть true|

------
### Api
```
// обновление параметров
$('#slider').jqSlider('update', data)

// получить состояние 
$('#slider').jqSlider('getState') 

// подписаться на события сладера 
$('#slider').jqSlider('onChange', (e) => {
  // где е это Состояние плагина
})
```
-------

### Архитектура

Данный плагин реализует в себе подобие MVP архитектуры. Где есть 2 независимых модуля в виде Модели и Представления.Их связь происходит посредством Презентера.

Все компоненты наследуются от класса EventCreator, который позволяет реализовать возможность создавать кастомные события и подписываться на них. Это позволяет реализовать Паттерн наблюдатель и сделать связи между модулями и их копоментами тонкими.

Модель отвечает за состояние плагина и работу с ним и его вариацию.

Презентер отвечает за инициализацию плагина и подписывается на события модели и представления, обеспечивает связь между ними и с оберткой Jquery реализуя подобие фасада для предоставления удобного API для взаимодействия с плагином.

Представление кроме того что дает возможность подписаться на его события реализует в себе Посредника для создания нужного кол-ва компонентов и взаимодействия с ними.

Представление как и все его компоненты имеют свое состояние и когда оно обновляется происходит отображение.

### UML
![UML](/UML/sliderUML.drawio.png)














