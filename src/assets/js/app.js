define(['TimelineView', 'DataSource'],
function (TimelineView, DataSource) {
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
        main.dataset.sidebarShow = event.srcElement.checked;
      }
    },
    methods: {

    }
  }).initialize().render();

  console.groupEnd();

});
