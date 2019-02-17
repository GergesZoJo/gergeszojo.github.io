//https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
(function(d, w, c, ls) {

    Reveal.configure({
      touch: false,
      parallaxBackgroundHorizontal: null,
      parallaxBackgroundVertical: null,
      keyboard: {
        32: null
      }
    });
  
    Reveal.addEventListener( 'init', function( event ) {
      var edge = d.getElementById('edge');
      edge.setAttribute('style', 'background-color:red; text-align:center; display: none');
    });
  
    Reveal.addEventListener( 'shown', function( event) {
      var edge = d.getElementById('edge');
      edge.setAttribute('style', 'background-color:red; text-align:center; display: block');
    });
   
    var menu = d.getElementById("showmenu"),
      menuContainer = d.getElementById("menu-container"),
      menuAcordeon = d.getElementById('menu-acordeon'),
      alert_text = 'Aún no has completado todo el contenido, ¿Estás seguro de que quieres continuar?';
      text_menu = new Array(
        //['#/','#/'],
        ['#/5', '#/6/6'],
        ['#/7', '#/8/12'],
        ['#/9', '#/11', 'label-icon-1'],
        ['#/15', '#/17/6'],
        ['#/22', '#/28'],
        ['#/29', '#/31'],
        ['#/32', '#/34/11', 'label-icon-2'],
        ['#/39', '#/52'],
        ['#/53', '#/55'],
        ['#/55', '#/62'],
        ['#/63', '#/66', 'label-icon-3'],
        ['#/69', '#/74'],
        ['#/75', '#/91'],
        ['#/92', '#/95', 'label-icon-4'],
        ['#/97', '#/97', 'label-icon-5']
      ),
      url_save = [],
      url_obj = {},
      draw_save = [],
      draw_obj = {}
      label_save = [],
      label_obj = {};
  
  
    menu.addEventListener('click', function() {
      menuContainer.classList.toggle('onscreen')
      menu.classList.toggle('closemenu')
      menuAcordeon.classList.toggle('opacidad')
    });
  
    function totalCurso() {
      var aSuma = d.getElementById('menu-acordeon').querySelectorAll('a').length,
        inpSuma = d.getElementById('menu-acordeon').querySelectorAll('label').length,
        elem = d.getElementById("barra"),
        valor1 = d.querySelectorAll('.ok').length / (parseInt(aSuma) + parseInt(inpSuma));
      elem.innerHTML = Math.ceil(valor1 * 100) + "%";
      elem.style.width = Math.ceil(valor1 * 100) + "%";
    }
  
    //TODO: /////////////////////////////////////////
    d.addEventListener('click', function(e) {
      //c(e.target.nodeName)
      //c(e.target.nodeName)
      if ((e.target.nodeName === "BUTTON" || e.target.nodeName == 'BUTTON') ||
        (e.target.nodeName === "DIV" || e.target.nodeName == 'DIV')
      ) {
        var url = location.href,
          dataObject = [];
  
        if (ls.getItem('dataObject') && ls.getItem('dataObject').length > 0) {
          dataObject = JSON.parse(ls.getItem('dataObject'));
        }
  
        if (ls.getItem('url_save') && ls.getItem('url_save').length > 0) {
          url_save = JSON.parse(ls.getItem('url_save'));
        }
        //c("paso")
        var _switch = false;
        for (var i in url_save) {
          if (url_save[i] == url) {
            _switch = true;
            break;
          }
        }
  
        if (_switch) {
          return false;
        }
        //c(_switch)
        //c(e.target.className)
        //c(e.target.parentNode.className)
        if (
          (
            (e.target.className == 'navigate-right enabled' || e.target.className == "navigate-right enabled") ||
            (e.target.className == 'navigate-right highlight enabled' || e.target.className == "navigate-right highlight enabled") ||
            (e.target.className == 'navigate-down enabled' || e.target.className == "navigate-down enabled") ||
            (e.target.className == 'navigate-down' || e.target.className == "navigate-down")
          ) ||
          (
            (e.target.parentNode.className == 'navigate-right enabled' || e.target.parentNode.className == "navigate-right enabled") ||
            (e.target.parentNode.className == 'navigate-right highlight enabled' || e.target.parentNode.className == "navigate-right highlight enabled") ||
            (e.target.parentNode.className == 'navigate-down enabled' || e.target.parentNode.className == "navigate-down enabled") ||
            (e.target.parentNode.className == 'navigate-down' || e.target.parentNode.className == "navigate-down")
          )
        ) {
          var present = d.querySelector('section.present')
            , has_data_id = present.getAttribute('data-id')
            , data_previous_indexv = present.getAttribute('data-previous-indexv')
            , count_previous_indexv = present.querySelectorAll('section');
  
          var block = false;
          var path = null;
          var _ok = false;
          c(dataObject)
          for (var i in dataObject) {
            if(dataObject[i].menu.length > 0){
              var menu = dataObject[i].menu;
              for(var _i in menu) {
                if (menu[_i].previous == url) {
                  menu[_i].previous_view = true;
                  _ok = true;
                  ls.removeItem("dataObject");
                  var _split = url.split("/");
                  var _new = _split[_split.length-1];
                  var res = url.replace(_new, "");
                  _new = parseInt(_new)+1;
                  ls.sequencing = res+_new;
                  break;
                }
      
                if (!menu[_i].previous_view && !_ok) {
                  path = ls.getItem('url');
                  block = true;
                  break;
                }
              }
            }
          }
          c(block)
          if (_ok) {
            ls.setItem('dataObject', JSON.stringify(dataObject));
          }
          
          if (block && (
            (
              (e.target.className == 'navigate-right enabled' || e.target.className == "navigate-right enabled") ||
              (e.target.className == 'navigate-right highlight enabled' || e.target.className == "navigate-right highlight enabled")
            ) ||
  
            (
              (e.target.parentNode.className == 'navigate-right enabled' || e.target.parentNode.className == "navigate-right enabled") ||
              (e.target.parentNode.className == 'navigate-right highlight enabled' || e.target.parentNode.className == "navigate-right highlight enabled")
            )
          )
          ) {
            //c(block)
            // alert(alert_text);
            e.preventDefault()
            alertify.alert(alert_text).setHeader('Alerta').set('closable', false).set('onok', function(closeEvent) {
              w.location.href = path;
            } );
            
            return false;
          }
  
          // var searching_between_url = (dataObject.find(el => el.url === url) ? true : false);
          var searching_between_url = false;
          if(dataObject.length > 0) {
            for(var searching in dataObject) {
              if(dataObject[searching].url == url) {
                searching_between_url  = true;
              }
            }
          }
  
          if (!searching_between_url && (
            (
              (e.target.className == 'navigate-right enabled' || e.target.className == "navigate-right enabled") ||
              (e.target.className == 'navigate-right highlight enabled' || e.target.className == "navigate-right highlight enabled")
            ) ||
  
            (
              (e.target.parentNode.className == 'navigate-right enabled' || e.target.parentNode.className == "navigate-right enabled") ||
              (e.target.parentNode.className == 'navigate-right highlight enabled' || e.target.parentNode.className == "navigate-right highlight enabled")
            )
          )
          ) {
  
            var replace_url = url;
            var pag_item = [];
            if( parseInt(count_previous_indexv.length) > 1 ) {
              ls.sequencing = replace_url+'/1';
              for(var item =1 ; item < parseInt(count_previous_indexv.length); item++ ) {
                var menu_item = {
                  'previous': replace_url + '/' + parseInt(item),
                  'previous_view': false
                }
                pag_item.push(menu_item);
              }
            }
  
            var object_local = {
              url: url,
              view: true,
              section_id: has_data_id,
              data_previous: data_previous_indexv,
              menu: pag_item
            }
  
            dataObject.push(object_local);
            ls.setItem('dataObject', JSON.stringify(dataObject));
          }
  
          if (!_switch) {
            url_obj = url;
            url_save.push(url_obj);
            ls.setItem('url_save', JSON.stringify(url_save));
            ls.setItem("url", url);
            draw(url, 'a');
          }
        }
      }
    });
  
    d.addEventListener('keyup', function(e) {
      //c(e.keyCode)
      if (e.keyCode == '37' || e.keyCode == '38' || e.keyCode == '39' || e.keyCode == '40') {
        var url = location.href,
          dataObject = [];
  
        if (ls.getItem('dataObject') && ls.getItem('dataObject').length > 0) {
          dataObject = JSON.parse(ls.getItem('dataObject'));
        }
  
        if (ls.getItem('url_save') && ls.getItem('url_save').length > 0) {
          url_save = JSON.parse(ls.getItem('url_save'));
        }
  
        var _switch = false;
        for (var i in url_save) {
          if (url_save[i] == url) {
            _switch = true;
            break;
          }
        }
        //c(_switch)
        if (_switch) {
          return false;
        }
        //c(e.code)
        //c(e.key)
        if (
          (e.code == 'ArrowRight' || e.code == "ArrowRight") ||
          (e.code == 'ArrowDown' || e.code == "ArrowDown") ||
          (e.key == 'ArrowRight' || e.key == "ArrowRight") ||
          (e.key == 'ArrowDown' || e.key == "ArrowDown") || 
          (e.key == 'Right'  || e.key == "Right" ) ||
          (e.key== 'Down' || e.key== "Down")
        ) {
          var present = d.querySelector('section.present')
            , has_data_id = present.getAttribute('data-id')
            , data_previous_indexv = present.getAttribute('data-previous-indexv')
            , count_previous_indexv = present.querySelectorAll('section');
  
          var block = false;
          var path = null;
          var _ok = false;
          c(dataObject)
          for (var i in dataObject) {
            if(dataObject[i].menu.length > 0){
              var menu = dataObject[i].menu;
              for(var _i in menu) {
                if (menu[_i].previous == url) {
                  menu[_i].previous_view = true;
                  _ok = true;
                  ls.removeItem("dataObject");
                  var _split = url.split("/");
                  var _new = _split[_split.length-1];
                  var res = url.replace(_new, "");
                  _new = parseInt(_new)+1;
                  ls.sequencing = res+_new;
                  break;
                }
      
                if (!menu[_i].previous_view && !_ok) {
                  path = ls.getItem('url');
                  block = true;
                  break;
                }
              }
            }
          }
  
          if (_ok) {
            ls.setItem('dataObject', JSON.stringify(dataObject));
          }
          c(block)
          if (block && (
            (e.code == 'ArrowRight' || e.code == "ArrowRight") ||
            (e.key == 'ArrowRight' || e.key == "ArrowRight")  || 
            (e.key == 'Right'  || e.key == "Right" )
          )
          ) {
            // alert(alert_text);
            // w.location.href = path;
            // return false;
            e.preventDefault()
            alertify.alert(alert_text).setHeader('Alerta').set('closable', false).set('onok', function(closeEvent) {
              w.location.href = path;
            } ); ;
            return false;
          }
  
          // var searching_between_url = (dataObject.find(el => el.url === url) ? true : false);
          var searching_between_url = false;
          if(dataObject.length > 0) {
            for(var searching in dataObject) {
              if(dataObject[searching].url == url) {
                searching_between_url  = true;
              }
            }
          }
          if (!searching_between_url && (
            (e.code == 'ArrowRight' || e.code == "ArrowRight") ||
            (e.key == 'ArrowRight' || e.key == "ArrowRight") ||
            (e.key == 'Right'  || e.key == "Right" )
          )
          ) {
  
            var replace_url = url;
            var pag_item = [];
            if( parseInt(count_previous_indexv.length) > 1 ) {
              ls.sequencing = replace_url+'/1';
              for(var item =1 ; item < parseInt(count_previous_indexv.length); item++ ) {
                var menu_item = {
                  'previous': replace_url + '/' + parseInt(item),
                  'previous_view': false
                }
                pag_item.push(menu_item);
              }
            }
  
            var object_local = {
              url: url,
              view: true,
              section_id: has_data_id,
              data_previous: data_previous_indexv,
              menu: pag_item
            }
  
            dataObject.push(object_local);
            ls.setItem('dataObject', JSON.stringify(dataObject));
          }
  
          if (!_switch) {
            url_obj = url;
            url_save.push(url_obj);
            ls.setItem('url_save', JSON.stringify(url_save));
            ls.setItem("url", url);
            draw(url, 'a');
          }
        }
      }
    });
  
    //TODO: ////////////////////////////////////////
  
    d.addEventListener('touchmove', function(e) {
      e.preventDefault()
    });
  
    d.addEventListener('touchstart', function(e) {
      /*c('touchstart')
      c(e)
      c(e.target.className)*/
      if ((e.target.nodeName === "BUTTON" || e.target.nodeName == 'BUTTON') ||
        (e.target.nodeName === "DIV" || e.target.nodeName == 'DIV')
      ) {
        //c(e.target)
        var url = location.href,
          dataObject = [];
  
        if (ls.getItem('dataObject') && ls.getItem('dataObject').length > 0) {
          dataObject = JSON.parse(ls.getItem('dataObject'));
        }
  
        if (ls.getItem('url_save') && ls.getItem('url_save').length > 0) {
          url_save = JSON.parse(ls.getItem('url_save'));
        }
  
        var _switch = false;
        for (var i in url_save) {
          if (url_save[i] == url) {
            _switch = true;
            break;
          }
        }
  
        if (_switch) {
          return false;
        }
  
        //c(e.target.className)
  
        //TODO: nuevo
        if (
          (
            (e.target.className == 'navigate-right enabled' || e.target.className == "navigate-right enabled") ||
            (e.target.className == 'navigate-right highlight enabled' || e.target.className == "navigate-right highlight enabled") ||
            (e.target.className == 'navigate-down enabled' || e.target.className == "navigate-down enabled") ||
            (e.target.className == 'navigate-down' || e.target.className == "navigate-down")
          ) ||
          (
            (e.target.parentNode.className == 'navigate-right enabled' || e.target.parentNode.className == "navigate-right enabled") ||
            (e.target.parentNode.className == 'navigate-right highlight enabled' || e.target.parentNode.className == "navigate-right highlight enabled") ||
            (e.target.parentNode.className == 'navigate-down enabled' || e.target.parentNode.className == "navigate-down enabled") ||
            (e.target.parentNode.className == 'navigate-down' || e.target.parentNode.className == "navigate-down")
          )
        ) {
          var present = d.querySelector('section.present')
            , has_data_id = present.getAttribute('data-id')
            , data_previous_indexv = present.getAttribute('data-previous-indexv')
            , count_previous_indexv = present.querySelectorAll('section');
  
  
          var block = false;
          var path = null;
          var _ok = false;
          for (var i in dataObject) {
            if(dataObject[i].menu.length > 0){
              var menu = dataObject[i].menu;
              for(var _i in menu) {
                if (menu[_i].previous == url) {
                  menu[_i].previous_view = true;
                  _ok = true;
                  ls.removeItem("dataObject");
                  var _split = url.split("/");
                  var _new = _split[_split.length-1];
                  var res = url.replace(_new, "");
                  _new = parseInt(_new)+1;
                  ls.sequencing = res+_new;
                  break;
                }
      
                if (!menu[_i].previous_view && !_ok) {
                  path = ls.getItem('url');
                  block = true;
                  break;
                }
              }
            }
          }
  
          if (_ok) {
            ls.setItem('dataObject', JSON.stringify(dataObject));
          }
  
          if (block && (
            (
              (e.target.className == 'navigate-right enabled' || e.target.className == "navigate-right enabled") ||
              (e.target.className == 'navigate-right highlight enabled' || e.target.className == "navigate-right highlight enabled")
            ) ||
            (
              (e.target.parentNode.className == 'navigate-right enabled' || e.target.parentNode.className == "navigate-right enabled") ||
              (e.target.parentNode.className == 'navigate-right highlight enabled' || e.target.parentNode.className == "navigate-right highlight enabled")
            )
          )
          ) {
            // alert(alert_text);
            // w.location.href = path;
            // return false;
            e.preventDefault()
            alertify.alert(alert_text).setHeader('Alerta').set('closable', false).set('onok', function(closeEvent) {
  
              w.location.href = path;
            } ); ;
            
            return false;
  
          }
  
          // var searching_between_url = (dataObject.find(el => el.url === url) ? true : false);
          var searching_between_url = false;
          if(dataObject.length > 0) {
            for(var searching in dataObject) {
              if(dataObject[searching].url == url) {
                searching_between_url  = true;
              }
            }
          }
          if (!searching_between_url &&
            (
              (e.target.className == 'navigate-right enabled' || e.target.className == "navigate-right enabled") ||
              (e.target.className == 'navigate-right highlight enabled' || e.target.className == "navigate-right highlight enabled")
            ) ||
            (
              (e.target.parentNode.className == 'navigate-right enabled' || e.target.parentNode.className == "navigate-right enabled") ||
              (e.target.parentNode.className == 'navigate-right highlight enabled' || e.target.parentNode.className == "navigate-right highlight enabled")
            )
          ) {
            var replace_url = url;
            var pag_item = [];
            if( parseInt(count_previous_indexv.length) > 1 ) {
              ls.sequencing = replace_url+'/1';
              for(var item =1 ; item < parseInt(count_previous_indexv.length); item++ ) {
                var menu_item = {
                  'previous': replace_url + '/' + parseInt(item),
                  'previous_view': false
                }
                pag_item.push(menu_item);
              }
            }
  
            var object_local = {
              url: url,
              view: true,
              section_id: has_data_id,
              data_previous: data_previous_indexv,
              menu: pag_item
            }
  
            dataObject.push(object_local);
            ls.setItem('dataObject', JSON.stringify(dataObject));
          }
  
          if (!_switch) {
            url_obj = url;
            url_save.push(url_obj);
            ls.setItem('url_save', JSON.stringify(url_save));
            ls.setItem("url", url);
            draw(url, 'a');
          }
        }
  
      }
    }, false);
  
    d.addEventListener('touchend', function(e) {
     
      if ((e.target.nodeName === "BUTTON" || e.target.nodeName == 'BUTTON') ||
        (e.target.nodeName === "DIV" || e.target.nodeName == 'DIV')
      ) {
        //c(e.target)
        var url = location.href,
          dataObject = [];
  
        if (ls.getItem('dataObject') && ls.getItem('dataObject').length > 0) {
          dataObject = JSON.parse(ls.getItem('dataObject'));
        }
  
        if (ls.getItem('url_save') && ls.getItem('url_save').length > 0) {
          url_save = JSON.parse(ls.getItem('url_save'));
        }
  
        var _switch = false;
        for (var i in url_save) {
          if (url_save[i] == url) {
            _switch = true;
            break;
          }
        }
  
        if (_switch) {
          return false;
        }
  
        if (
          (
            (e.target.className == 'navigate-right enabled' || e.target.className == "navigate-right enabled") ||
            (e.target.className == 'navigate-right highlight enabled' || e.target.className == "navigate-right highlight enabled") ||
            (e.target.className == 'navigate-down enabled' || e.target.className == "navigate-down enabled") ||
            (e.target.className == 'navigate-down' || e.target.className == "navigate-down")
          ) ||
          (
            (e.target.parentNode.className == 'navigate-right enabled' || e.target.parentNode.className == "navigate-right enabled") ||
            (e.target.parentNode.className == 'navigate-right highlight enabled' || e.target.parentNode.className == "navigate-right highlight enabled") ||
            (e.target.parentNode.className == 'navigate-down enabled' || e.target.parentNode.className == "navigate-down enabled") ||
            (e.target.parentNode.className == 'navigate-down' || e.target.parentNode.className == "navigate-down")
          )
        ) {
          var present = d.querySelector('section.present')
            , has_data_id = present.getAttribute('data-id')
            , data_previous_indexv = present.getAttribute('data-previous-indexv')
            , count_previous_indexv = present.querySelectorAll('section');
  
          var block = false;
          var path = null;
          var _ok = false;
          for (var i in dataObject) {
            if(dataObject[i].menu.length > 0){
              var menu = dataObject[i].menu;
              for(var _i in menu) {
                if (menu[_i].previous == url) {
                  menu[_i].previous_view = true;
                  _ok = true;
                  ls.removeItem("dataObject");
                  var _split = url.split("/");
                  var _new = _split[_split.length-1];
                  var res = url.replace(_new, "");
                  _new = parseInt(_new)+1;
                  ls.sequencing = res+_new;
                  break;
                }
      
                if (!menu[_i].previous_view && !_ok) {
                  path = ls.getItem('url');
                  block = true;
                  break;
                }
              }
            }
          }
  
          if (_ok) {
            ls.setItem('dataObject', JSON.stringify(dataObject));
          }
          //c()
          
          if (block && (
            (
              (e.target.className == 'navigate-right enabled' || e.target.className == "navigate-right enabled") ||
              (e.target.className == 'navigate-right highlight enabled' || e.target.className == "navigate-right highlight enabled")
            ) ||
            (
              (e.target.parentNode.className == 'navigate-right enabled' || e.target.parentNode.className == "navigate-right enabled") ||
              (e.target.parentNode.className == 'navigate-right highlight enabled' || e.target.parentNode.className == "navigate-right highlight enabled")
            )
          )
          ) {
            // alert(alert_text);
            // w.location.href = path;
            // return false;
            e.preventDefault()
            alertify.alert(alert_text).setHeader('Alerta').set('closable', false).set('onok', function(closeEvent) {
  
              w.location.href = path;
            } ); ;
            
            return false;
          }
  
          // var searching_between_url = (dataObject.find(el => el.url === url) ? true : false);
          var searching_between_url = false;
          if(dataObject.length > 0) {
            for(var searching in dataObject) {
              if(dataObject[searching].url == url) {
                searching_between_url  = true;
              }
            }
          }
          if (!searching_between_url &&
            (
              (e.target.className == 'navigate-right enabled' || e.target.className == "navigate-right enabled") ||
              (e.target.className == 'navigate-right highlight enabled' || e.target.className == "navigate-right highlight enabled")
            ) ||
            (
              (e.target.parentNode.className == 'navigate-right enabled' || e.target.parentNode.className == "navigate-right enabled") ||
              (e.target.parentNode.className == 'navigate-right highlight enabled' || e.target.parentNode.className == "navigate-right highlight enabled")
            )
          ) {
  
            var replace_url = url;
            var pag_item = [];
            if( parseInt(count_previous_indexv.length) > 1 ) {
              ls.sequencing = replace_url+'/1';
              for(var item =1 ; item < parseInt(count_previous_indexv.length); item++ ) {
                var menu_item = {
                  'previous': replace_url + '/' + parseInt(item),
                  'previous_view': false
                }
                pag_item.push(menu_item);
              }
            }
  
            var object_local = {
              url: url,
              view: true,
              section_id: has_data_id,
              data_previous: data_previous_indexv,
              menu: pag_item
            }
  
            dataObject.push(object_local);
            ls.setItem('dataObject', JSON.stringify(dataObject));
          }
  
          if (!_switch) {
            url_obj = url;
            url_save.push(url_obj);
            ls.setItem('url_save', JSON.stringify(url_save));
            ls.setItem("url", url);
            draw(url, 'a');
          }
        }
  
      }
    }, false);
  
  
    var url = location.href;
    var draw = function (a, flag) { 
    
      if (ls.getItem('draw_menu') && ls.getItem('draw_menu').length > 0) {
        draw_save = JSON.parse(ls.getItem('draw_menu'));
      }
  
      if (ls.getItem('label') && ls.getItem('label').length > 0) {
        label_save = JSON.parse(ls.getItem('label'));
      }
  
      if (flag == "n") {
        var init = a.querySelectorAll('li')[0];
        var init_a = init.querySelectorAll('i')[0];
        init_a.className = 'fa fa-check-circle far ok';
        draw_obj = init.querySelector('a').hash;
        draw_save.push(draw_obj);
        ls.setItem('draw_menu', JSON.stringify(draw_save));
      } else if (flag == "r") {
        var explode = a.querySelectorAll('a');
        for (var a in explode) {
          var _hash = explode[a].hash;
          for (var i in draw_save) {
            if (draw_save[i] == _hash) {
              var _icon = explode[a].querySelector('i');
              _icon.className = 'fa fa-check-circle far ok';
            }
          }
        }
  
        if (ls.label) {
          for (var x in label_save) {
            var label = document.getElementById(label_save[x])
            label.className = 'fa fa-check-circle far ok';
          }
        }
      } else {
        // var pathname = new URL(a).hash;
        var pathname = w.location.hash;
        c(pathname)
        for (var i in text_menu) {
          var size = text_menu[i].length;
          if (size > 2) {
            if (pathname == text_menu[i][size - 2]) {
              for (var z in menuAcordeon.querySelectorAll('a')) {
                var __icon = menuAcordeon.querySelectorAll('a')[z];
                if (__icon.hash == text_menu[i][size - 3]) {
                  var draw_first = __icon.querySelectorAll('i')[0];
                  draw_first.className = 'fa fa-check-circle far ok';
                  var label = document.getElementById(text_menu[i][size - 1])
                  label.className = 'fa fa-check-circle far ok';
  
                  draw_obj = __icon.hash;
                  draw_save.push(draw_obj);
                  ls.setItem('draw_menu', JSON.stringify(draw_save));
  
  
                  label_obj = text_menu[i][size - 1];
                  label_save.push(label_obj)
                  ls.setItem('label', JSON.stringify(label_save));
                }
              }
            }
          } else {
            if (pathname == text_menu[i][size - 1]) {
              for (var z in menuAcordeon.querySelectorAll('a')) {
                var __icon = menuAcordeon.querySelectorAll('a')[z];
                if (__icon.hash == text_menu[i][size - 2]) {
                  var draw_first = __icon.querySelectorAll('i')[0];
                  draw_first.className = 'fa fa-check-circle far ok';
  
                  draw_obj = __icon.hash;
                  draw_save.push(draw_obj);
                  ls.setItem('draw_menu', JSON.stringify(draw_save));
                }
              }
            }
          }
        }
        totalCurso();
      }
    }
  
    if (ls.url) {
      w.location.href = ls.url;
      draw(menuAcordeon, 'r');
    } else {
      url_obj = url;
      url_save.push(url_obj);
      ls.setItem('url_save', JSON.stringify(url_save));
      ls.setItem("url", url);
      draw(menuAcordeon, 'n');
    }
  
    d.querySelector('.progress').setAttribute('style', 'display: block; pointer-events: none;');
    d.querySelector('.slides').setAttribute('class', 'slides not-selectable');
    d.querySelector('body').setAttribute('oncontextmenu', 'return false;');
    d.querySelector('body').setAttribute('onselectstart', 'return false;');
    d.querySelector('body').setAttribute('oncopy', 'return false;');
    totalCurso();
  
    removedisabled = function(href) {
      c(href)
      var element = w.location.href+href;
  
      if (ls.getItem('url_save') && ls.getItem('url_save').length > 0) {
        url_save = JSON.parse(ls.getItem('url_save'));
      }
  
      var _switch=false;
      for(var i in url_save) {
        if(url_save[i] == element) {
          _switch=true;
          break;
        }
      }
      c(_switch)
  
      if ( !_switch ) {
        if(ls.sequencing == element) {
          url_obj = element;
          url_save.push(url_obj);
          ls.setItem('url_save', JSON.stringify(url_save));
          ls.setItem("url", element);
    
          var _switch = false;
          for (var i in url_save) {
            if (url_save[i] == element) {
              _switch = true;
              break;
            }
          }
      
          c(_switch)
        
          if(_switch) {
            var str = href;
            var res = str.replace("/", "");
            var _number = parseInt(res)+1;
            ls.sequencing =  w.location.href+'/'+_number;
            w.location.href = element;
          }
        } else {
          // alert("Debe seguir la secuencia.!!");
          
            alertify.alert("Debe seguir la secuencia.!!").setHeader('Alerta').set('closable', false).set('onok', function(closeEvent) {
            } );
        }
      } else {
        w.location.href = element;
      }
      return false;
    }
  
    w.addEventListener('hashchange', function(e) {
      dataObject = [];
      var _ok = false;
  
      if (ls.getItem('dataObject') && ls.getItem('dataObject').length > 0) {
        dataObject = JSON.parse(ls.getItem('dataObject'));
      }
  
      for (var i in dataObject) {
        if(dataObject[i].menu.length > 0){
          var menu = dataObject[i].menu;
          for(var _i in menu) {
            if (menu[_i].previous == w.location.href) {
              menu[_i].previous_view = true;
              _ok = true;
              ls.removeItem("dataObject");
              break;
            }
          }
        }
      }
  
      if (_ok) {
        ls.setItem('dataObject', JSON.stringify(dataObject));
        draw(w.location.href, 'a');
      }
    });
  
  })(document, window, console.log, localStorage);  
