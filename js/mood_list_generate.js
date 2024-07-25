'use strict';

// 函数定义，处理 locals 并生成 moodList
function generateMoodList(locals) {
  const allMoods = {};

  console.log(hexo.locals.get('all_posts'));
  // 遍历所有文章，收集 mood_type 数据
  locals.all_posts.forEach(post => {
    if (post.mood_type) {
      if (!allMoods[post.mood_type]) {
        allMoods[post.mood_type] = { name: post.mood_type, posts: [] };
      }
      allMoods[post.mood_type].posts.push(post);
    }
  });

  // 将 moods 转换为数组
  return Object.keys(allMoods).map(mood => allMoods[mood]);
}

module.exports = generateMoodList;
