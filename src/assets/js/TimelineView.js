define(['vue'], function (Vue) {


  var _proto = {
    el: null,
    data: null,
    methods: null,
    computed: null,
    initialize: function (methods) {
      var self = this;
      console.log('Initializing TimelineView');
      console.log(this);
      //START TEST
      console.assert(this.data !== null || typeof this.data !== 'undefined', 'No datasource found');
      //END TEST

      this.vue = new Vue({
        methods: this.vueMethods
      });

      if (Array.isArray(methods)) {
        methods.forEach(function (methodName) {
          if (typeof self[methodName] === 'function') {
            console.log('%s is a function of TimelineView',methodName);
            self[methodName].apply(self);

          }
        });
      }

      return this;
    },
    render: function () {
      console.log('Rendering TimelineView');
      this.vue.$data = this.data;

      this.vue.$log();

      this.vue.$mount(this.el);
      return this;
    }
  };


  function TimelineView(config) {
    var _obj;

    console.log('Creating TimelineView instance');
    console.log(config);
    //START TEST
    console.assert(!(typeof config == 'undefined' || config === null), 'No configuration object found');
    //END TEST

    _proto.data        = config.data;
    _proto.vueMethods  = config.vueMethods;
    _proto.computed    = config.computed;
    _proto.el          = config.el;

    Object.assign(_proto, config.methods);

    _obj = Object.create(_proto);
    return _obj;
  }

  return TimelineView;


});
