(function() {
  var posts = document.getElementById('updated-time');
  if (posts === null || posts.innerHTML === '') { return; }
  // if (posts.length === 0) { return; }
  
  var tag_list = document.getElementsByClassName('print-no-link');
  // console.log(tag_list.length);

  if (tag_list.length === 0) { return; }

  var flag_tag = '#Writing...';  /* 文章标签 */

  for (index = 0; index <tag_list.length; index++) {
      var tag_name = tag_list[index].innerText;
      if (tag_name.length === 0) { continue; }
      // var posts = document.getElementsByClassName('post-content');
      // var posts = document.getElementsByClassName('markdown-body');

      /* 特定标签显示 */
      if (tag_name === flag_tag){
        posts.innerHTML = posts.innerText.trim() + ', ' + '写作中...'
        // posts[0].innerHTML = '<div class="note note-warning" style="font-size:0.9rem"><p>' + 
              // '<div class="h6">文章说明</div><p>这是一篇发布于 天前的文章，部分信息可能已发生改变，请注意甄别。' +
          // '</p></p></div>' + posts[0].innerHTML;
        return;
      }
  }
})();
