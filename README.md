# Jq-Slider MetaLamp step 4
#### Задание номер 4 на создания плагина ползунка  для Jquery 

------

### Развертывание 
##### Клонрование репозитрия:
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
где  data это обьект с параметрами

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

#### Опции
>|Параметр|Тип|Значение по умолчание|Описание|
> |-------------|----------|---------|---------|
> |min|number|0|минимальние значение ползунка|
> |max|number|100|максимальное значение ползунка|
> |from|number|0|значение ползунка|
> |to|number|100|значение второго ползунка. Работает если range: true|
> |step|number|1|размер шага|
> |tip|boolean|true|Значение над ползунком|
> |range|boolean|true|значение от и до если true или от min до from если false|
> |progress|boolean|true|заливка прогресса в интревале|
> |scale|boolean|true|Линейка под сладером с значениями|
> |scaleDestiny|number|10|Кратность интервалу отображения засечки на линейке. то есть если интервал 100 а значение 10 то каждое 10 значение будут отображаться на линейке|
> |horizontal|boolean|false|Положение горизотальное если false или вертикальное есть true|

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

### Архитектура









