// в закладке УРЛа будем хранить разделённые подчёркиваниями слова
  // #Main - главная
  // #Paint - Рисовать с чистого листа
  // #SelectImg - Выбрать картинку
  // #Load - Загрузить
  var selectImg = null;
  // отслеживаем изменение закладки в УРЛе
  // оно происходит при любом виде навигации
  // в т.ч. при нажатии кнопок браузера ВПЕРЁД/НАЗАД
  window.onhashchange=switchToStateFromURLHash;
 
  // текущее состояние приложения
  // это Model из MVC
  var SPAState={};
  function switchToStateFromURLHash() {
    var URLHash=window.location.hash;
    
    // убираем из закладки УРЛа решётку
    // (по-хорошему надо ещё убирать восклицательный знак, если есть)
    var stateStr=URLHash.substr(1);
    if(stateStr.indexOf('&')>-1) {
      console.log(window.location.hostname);
      console.log(selectImg);
      var protocol = window.location.protocol;
      var hostName = window.location.hostname;
      var href = window.location.href;
      var parts=stateStr.split("&").pop();
      // selectImg = imgStorage.getValue(parts);
      selectImg = href+'/img/'+parts;
      console.log(href);
      $.ajax("html/paint.html",
          { type:'GET', dataType:'html', success:dataLoaded3, error:errorHandler }
      );
      SPAState={ pagename: stateStr };
    } 
    else if ( stateStr!="" ) { // если закладка непустая, читаем из неё состояние и отображаем
        var parts=stateStr.split("_");
        SPAState={ pagename: parts[0] }; // первая часть закладки - номер страницы
    }
    
    else
        SPAState={pagename:'Main'}; // иначе показываем главную страницу
    // обновляем вариабельную часть страницы под текущее состояние
    // это реализация View из MVC - отображение состояния модели в HTML-код
    var pageHTML = '';
    switch ( SPAState.pagename ) {
      case 'Main':
            $.ajax("html/main.html",
            { type:'GET', dataType:'html', success:dataLoaded, error:errorHandler }
        );
        break;
      case 'Paint':
            $.ajax("html/paint.html",
                { type:'GET', dataType:'html', success:dataLoaded1, error:errorHandler }
            );
            
        break;
        case 'PaintImg':
            $.ajax("html/paint.html",
                { type:'GET', dataType:'html', success:dataLoaded3, error:errorHandler }
            );
            
        break;
      case 'SelectImg':
            $.ajax("html/slider.html",
              { type:'GET', dataType:'html', success:dataLoaded2, error:errorHandler }
            );
        break;
      case 'Load':
        pageHTML+="<h3>О нас</h3>";
        pageHTML+="<p>Мы круты!</p>";
        document.getElementById('IPage').innerHTML=pageHTML;
        break;
    }
    function dataLoaded(data) {
        document.getElementById('IPage').innerHTML=data;
        var mainMenu = document.getElementsByClassName('menuItem');
        
        mainMenu[0].addEventListener('click',switchToPaintPage);
        mainMenu[1].addEventListener('click',switchToSelectImgPage);
        mainMenu[2].addEventListener('click',switchToLoadPage);
        var menuToSound = document.getElementsByClassName('menuItem');
        MenuSoundModel.start(MenuSoundView,'sound/click.mp3');
        MenuSoundView.start(MenuSoundModel);
        MenuSoundController.start(MenuSoundModel, menuToSound);
    }
    function dataLoaded1(data) {
      document.getElementById('IPage').innerHTML=data;
      ColoringSoundModel.start(ColoringSoundView,'sound/coloring.mp3');
      ColoringSoundView.start(ColoringSoundModel);
      ToBrushSoundModel.start(ToBrushgSoundView,'sound/paint.mp3');
      ToBrushgSoundView.start(ToBrushSoundModel);
      var containerElem = document.getElementById('Canvas');
      paint.start(paintView);
      paintView.start(paint, containerElem);
      paintController.start(paint, containerElem);
      var brushToSound = document.getElementsByClassName('brush');
      BrushSoundModel.start(BrushSoundView,'sound/brush.mp3');
      BrushSoundView.start(BrushSoundModel);
      BrushSoundController.start(BrushSoundModel, brushToSound);
    }
    function dataLoaded2(data) {
      console.log('change222222');
      document.getElementById('IPage').innerHTML=data;
      let slideWrapper = document.getElementsByClassName('slider__wrapper')[0];
      let mainSlider = document.getElementById('Slider');
      sliderModel.start(sliderView, ['img/111.png','img/5914.gif','img/avto.svg','img/222.png']);
      sliderView.start(sliderModel, slideWrapper,mainSlider);
      sliderController.start(sliderModel, mainSlider);
    }
    function dataLoaded3(data) {
      document.getElementById('IPage').innerHTML=data;
      ColoringSoundModel.start(ColoringSoundView,'sound/coloring.mp3');
      ColoringSoundView.start(ColoringSoundModel);
      ToBrushSoundModel.start(ToBrushgSoundView,'sound/paint.mp3');
      ToBrushgSoundView.start(ToBrushSoundModel);
      var containerElem = document.getElementById('Canvas');
      paint.start(paintView);
      
      console.log('change');
      paintView.start(paint, containerElem,selectImg);
      paintController.start(paint, containerElem);
      var brushToSound = document.getElementsByClassName('brush');
      BrushSoundModel.start(BrushSoundView,'sound/brush.mp3');
      BrushSoundView.start(BrushSoundModel);
      BrushSoundController.start(BrushSoundModel, brushToSound);
    }
    function errorHandler(jqXHR,statusStr,errorStr) {
        alert(statusStr+' '+errorStr);
    }
  }

  function switchToState(newState) {
    // устанавливаем закладку УРЛа
    // нужно для правильной работы кнопок навигации браузера
    // (т.к. записывается новый элемент истории просмотренных страниц)
    // и для возможности передачи УРЛа другим лицам
    var stateStr=newState.pagename;
    location.hash=stateStr;
    // АВТОМАТИЧЕСКИ вызовется switchToStateFromURLHash()
    // т.к. закладка УРЛа изменилась (ЕСЛИ она действительно изменилась)
  }
  function switchToMainPage() {
    if("vibrate" in navigator) {
      window.navigator.vibrate(100);
    }
    switchToState( { pagename:'Main' } );
  }
  function switchToPaintPage() {
    if("vibrate" in navigator) {
      window.navigator.vibrate(100);
    }
    switchToState( { pagename:'Paint'} );
  }
  function switchToSelectImgPage() {
    if("vibrate" in navigator) {
      window.navigator.vibrate(100);
    }
    switchToState( { pagename:'SelectImg' } );
  }
  function switchToPaintImgPage(key) {
    if("vibrate" in navigator) {
      window.navigator.vibrate(100);
    }
    switchToState( { pagename:'PaintImg'+'&'+key } );
  }
  function switchToLoadPage() {
    if("vibrate" in navigator) {
      window.navigator.vibrate(100);
    }
    switchToState( { pagename:'Load' } );
  }


  switchToStateFromURLHash();