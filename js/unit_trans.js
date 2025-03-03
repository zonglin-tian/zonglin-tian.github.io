!(function() {
    function trans() {
        /** 访问量单位变换 **/
        var site_pv_num = document.getElementById("leancloud-site-pv").innerText;
        var site_uv_num = document.getElementById("leancloud-site-uv").innerText;
        console.log(site_pv_num);

        pv_int = Number(site_pv_num);
        uv_int = Number(site_uv_num);
        if (pv_int >= 1000 && pv_int <10000) {
            pv_trans = (pv_int / 1000).toFixed(2) + 'k';
        } else if (pv_int >= 10000) {
            pv_trans = (pv_int / 10000).toFixed(1) + 'w';
        } else {
            pv_trans = pv_int.toString();
        }
        if (uv_int >= 1000 && uv_int <10000) {
            uv_trans = (uv_int / 1000).toFixed(2) + 'k';
        } else if (uv_int >= 10000) {
            uv_trans = (uv_int / 10000).toFixed(1) + 'w';
        } else {
            uv_trans = uv_int.toString();
        }
        document.getElementById("leancloud-site-pv-trans").innerText = pv_trans;
        // document.getElementById("leancloud-site-pv").style.display = "none";
        // document.getElementById("leancloud-site-uv-trans").innerText = uv_trans;
    }

  trans();
  // setInterval(trans, 1000);
})();
