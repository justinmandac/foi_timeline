define(['TimelineView', 'DataSource'],
function (TimelineView, DataSource) {

  Math.easeInOutQuad = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) {
      return c/2*t*t + b;
    }
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
  };

  Math.easeInCubic = function(t, b, c, d) {
    var tc = (t/=d)*t*t;
    return b+c*(tc);
  };

  Math.inOutQuintic = function(t, b, c, d) {
    var ts = (t/=d)*t,
    tc = ts*t;
    return b+c*(6*tc*ts + -15*ts*ts + 10*tc);
  };

  // requestAnimationFrame for Smart Animating http://goo.gl/sx5sts
  var requestAnimFrame = (function(){
    return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function( callback ){ window.setTimeout(callback, 1000 / 60); };
  })();

  function scrollTo(to, callback, duration) {
    // because it's so fucking difficult to detect the scrolling element, just move them all
    function move(amount) {
      document.documentElement.scrollTop = amount;
      document.body.parentNode.scrollTop = amount;
      document.body.scrollTop = amount;
    }
    function position() {
      return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
    }
    var start = position(),
      change = to - start,
      currentTime = 0,
      increment = 20;
    duration = (typeof(duration) === 'undefined') ? 500 : duration;
    var animateScroll = function() {
      // increment the time
      currentTime += increment;
      // find the value with the quadratic in-out easing function
      var val = Math.easeInOutQuad(currentTime, start, change, duration);
      // move the document.body
      move(val);
      // do the animation unless its over
      if (currentTime < duration) {
        requestAnimFrame(animateScroll);
      } else {
        if (callback && typeof(callback) === 'function') {
          // the animation is done so lets callback
          callback();
        }
      }
    };
    animateScroll();
  }

  var view;
  var dataSrc  = DataSource();

  console.group('TimelineView');


  view = TimelineView({
    el: '#main',
    data:   dataSrc.processData(),
    vueMethods: {
      getArrayLength: function (array) {
        if (typeof array === 'undefined') {
          return  0;
        } else {
          return  array.length;
        }
      },
      triggerSidebar: function (event) {
        console.log('Sidebar should be triggered.');
        var main = document.getElementById('main');
        var flag = (main.dataset.sidebarShow === 'true');
        console.log(flag);

        main.setAttribute('data-sidebar-show', !flag);

      },
      handleMenuClick: function (event) {
        event.preventDefault();
        var $element  = event.srcElement;
        var $target;
        var $tagetHash;
        var offset;
        var add;
        if ($element.tagName === 'A') {
          console.dir($element);
          $target = document.getElementById($element.hash.replace('#',''));
          console.dir($target);
          console.dir($target.getBoundingClientRect().top);
          offset =   $target.getBoundingClientRect().top + (window.scrollY -  100);
          console.log(offset);
          scrollTo(  offset , null, 600);

        }
      }
    },
    methods: {

    }
  }).initialize().render();

  console.groupEnd();

});
