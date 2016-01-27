define(['data', 'moment'], function (data, Moment) {

  function getYear(dateString) {

    return dateString.split('-')[0];

  }

  function getMonth (dateString) {
    return parseInt(dateString.split('-')[1]);
  }

  function getDay (dateString) {
    return parseInt(dateString.split('-')[2]);
  }

  function parseMonth(monthNumber) {
    var monthStr = '';
    switch(monthNumber) {
      case 1:
      monthStr='January';
       break;
      case 2:
      monthStr='February';
       break;
      case 3:
      monthStr='March';
       break;
      case 4:
      monthStr='April';
       break;
      case 5:
      monthStr='May';
       break;
      case 6:
      monthStr='June';
       break;
      case 7:
      monthStr='July';
       break;
      case 8:
      monthStr='August';
       break;
      case 9:
      monthStr='September';
       break;
      case 10:
      monthStr='October';
       break;
      case 11:
      monthStr='November';
       break;
      case 12:
      monthStr='December';
       break;
    }

    return monthStr;
  }

  function parseDate (dateString) {
    var year  = getYear(dateString);
    var month = parseMonth(getMonth(dateString));
    var day   = getDay(dateString);

    return {
      year: year,
      month: month,
      day: day,
      date: month+' '+day+', '+year
    };
  }

  var _proto = {
    initialize: function () {
      return this;
    },
    processData: function () {
      console.log('Processing Data: %o', data);
      var _data = {};
      var _tmp  = {};
      var date  = {};
      //copy source
      _data = data;
      //group items by year first
      // _data.timelineItems.sort(function (y1,y2) {
      //   return getYear(y2.date) - getYear(y1.date);
      // });
      //then aggregate each element into a separate array by year
      // _data.timelineItems.forEach(function (event) {
      //   date = parseDate(event.date);
      //   console.log(date);
      //   if (!_tmp.hasOwnProperty(date.year)) {
      //     //if the year doesn't exist in the hash, initialize key (year) w/
      //     //empty object
      //     _tmp[date.year] = {};
      //   }
      //
      //   //group items by month
      //   if (!_tmp[date.year].hasOwnProperty(date.month)) {
      //     _tmp[date.year][date.month] = [];
      //   }
      //   event.dateRaw = event.date;
      //   event.date = date.date;
      //
      //   _tmp[date.year][date.month].push(event);
      //
      // });

      for (var i = (_data.timelineItems.length -1 ); i > -1; i--) {
        date = parseDate(_data.timelineItems[i].date);
        console.log(date);
        if (!_tmp.hasOwnProperty(date.year)) {
          //if the year doesn't exist in the hash, initialize key (year) w/
          //empty object
          _tmp[date.year] = {};
        }

        //group items by month
        if (!_tmp[date.year].hasOwnProperty(date.month)) {
          _tmp[date.year][date.month] = [];
        }
        _data.timelineItems[i].dateRaw = _data.timelineItems[i].date;
        _data.timelineItems[i].date = date.date;

        _tmp[date.year][date.month].push(_data.timelineItems[i]);
      }

      _data.timelineItems = Object.keys(_tmp).map(function (key, val){
        console.log(val);
        console.log(key);

        return {
          year: key,
          data: _tmp[key]
        };
      }).reverse();

      console.log(_data.timelineItems);

      return _data;

    },
    getRawData : function () {
      return data;
    },
    getData: function () {
      return data;
    }

  };

  function DataSource (config) {
    return Object.create(_proto, config);
  }

  return DataSource;

});
