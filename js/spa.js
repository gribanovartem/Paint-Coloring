// в закладке УРЛа будем хранить разделённые подчёркиваниями слова
  // #Main - главная
  // #Paint - Рисовать с чистого листа
  // #SelectImg - Выбрать картинку
  // #Load - Загрузить

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
    if ( stateStr!="" ) { // если закладка непустая, читаем из неё состояние и отображаем
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
                { type:'GET', dataType:'html', success:dataLoaded, error:errorHandler }
            );
        break;
      case 'SelectImg':
        pageHTML+="<h3>О нас</h3>";
        pageHTML+="<p>Мы круты!</p>";
        break;
      case 'Load':
        pageHTML+="<h3>О нас</h3>";
        pageHTML+="<p>Мы круты!</p>";
        break;
    }
    function dataLoaded(data) {
        document.getElementById('IPage').innerHTML=data;
        var mainMenu = document.getElementsByClassName('menuItem');
        mainMenu[0].addEventListener('click',switchToPaintPage);
        mainMenu[1].addEventListener('click',switchToSelectImgPage);
        mainMenu[2].addEventListener('click',switchToLoadPage);
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
    switchToState( { pagename:'Main' } );
  }
  function switchToPaintPage() {
    console.log('dfhgs');
    switchToState( { pagename:'Paint' } );
  }
  function switchToSelectImgPage() {
    switchToState( { pagename:'SelectImg' } );
  }
  function switchToLoadPage() {
    switchToState( { pagename:'Load' } );
  }


  switchToStateFromURLHash();