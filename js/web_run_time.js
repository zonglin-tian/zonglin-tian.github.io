!(function() {
  /** 计时起始时间，自行修改 **/
  var start = new Date("2023/07/01 00:00:00");

  function update() {
    var now = new Date();
    now.setTime(now.getTime()+250);
    days = (now - start) / 1000 / 60 / 60 / 24;
    dnum = Math.floor(days);
    // dnum = 730;
    year_num = Math.floor(dnum / 365);
    day_num = dnum % 365;
    var run_str = '';
    var year_day_sep = '';
    if (year_num >= 1) {
       run_str = run_str + year_num + '&nbsp;年';
       year_day_sep = '&thinsp;';
    }
    if (day_num >= 1) {
       // run_str = run_str + year_day_sep + day_num + '&nbsp;天';
       run_str = run_str + year_day_sep + day_num + '&nbsp;<a href="/recent/">天</a>';
    }
    // hours = (now - start) / 1000 / 60 / 60 - (24 * dnum);
    // hnum = Math.floor(hours);
    // if(String(hnum).length === 1 ){
    //   hnum = "0" + hnum;
    // }
    // minutes = (now - start) / 1000 /60 - (24 * 60 * dnum) - (60 * hnum);
    // mnum = Math.floor(minutes);
    // if(String(mnum).length === 1 ){
    //   mnum = "0" + mnum;
    // } // seconds = (now - start) / 1000 - (24 * 60 * 60 * dnum) - (60 * 60 * hnum) - (60 * mnum);
    // snum = Math.round(seconds);
    // if(String(snum).length === 1 ){
    //   snum = "0" + snum;
    // }
    document.getElementById("timeDate").innerHTML = '<a href="/music/" target="_blank" rel="nofollow noopener"><i class="iconfont icon-music"></i></a>' + '&ensp;运行&nbsp;' + run_str.trim();
    // document.getElementById("times").innerHTML = hnum + "&nbsp小时&nbsp" + mnum + "&nbsp分&nbsp" + snum + "&nbsp秒";
  }

  update();
  // setInterval(update, 1000);
  setInterval(update, 43200000);  // 12 小时更新一次
})();
