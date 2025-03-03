!(function() {
  /** 计时起始时间，自行修改 **/
  var start = new Date("2023/07/01 00:00:00");

  function update() {
    var now = new Date();
    now.setTime(now.getTime()+250);
    days = (now - start) / 1000 / 60 / 60 / 24;
    dnum = Math.floor(days);
    // dnum = 200;

    int_num = dnum;
    // 以 k, w 为单位显示
    if (int_num < 1000) {
        str_trans = int_num.toString();
    } else{
        if (int_num >= 1000 && int_num <10000) {
            int_num = Math.floor(int_num / 10);
            unit = 'k';
        } else{
            int_num = Math.floor(int_num / 100);
            unit = 'w';
        }
        str_trans = (int_num / 100).toFixed(2)

        while (str_trans.substring(str_trans.length - 1) === '0') {
          str_trans = str_trans.substring(0, str_trans.length - 1);
        }

        if (str_trans.substring(str_trans.length - 1) === '.') {
          str_trans = str_trans.substring(0, str_trans.length - 1)
        }

        str_trans = str_trans + unit;
    }
    str_trans = str_trans + '&nbsp;<a href="/recent/">天</a>';


    // 以年和天为单位悬浮显示
    year_num = Math.floor(dnum / 365);
    day_num = dnum % 365;
    var year_day_str = '';
    var year_day_sep = '';
    if (year_num >= 1) {
       year_day_str = year_day_str + year_num + ' 年';
       year_day_sep = ' ';
    }
    if (day_num >= 1) {
       year_day_str = year_day_str + year_day_sep + day_num + ' 天';
    }

    document.getElementById("timeDate").innerHTML = '<a href="/music/" target="_blank" rel="nofollow noopener"><i class="iconfont icon-music"></i></a>' + '&ensp;<span id="run" title="">运行</span>&nbsp;<span id="trans_run_time" title=""></span>';
    document.getElementById("trans_run_time").title = year_day_str.trim();
    document.getElementById("trans_run_time").innerHTML = str_trans.trim();
  }

  update();
  // setInterval(update, 1000);
  setInterval(update, 43200000);  // 12 小时更新一次
})();
