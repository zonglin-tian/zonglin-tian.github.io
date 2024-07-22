'use strict';

const pagination = require('hexo-pagination');

module.exports = function(locals, customPosts, path = '', paginationDir = 'page', paginationOptions = {}) {
  const config = this.config;

  // 如果没有提供 customPosts，则使用 locals.index_posts
  const posts = customPosts || locals.index_posts.sort(config.index_generator.order_by);

  // 排序置顶文章
  posts.data.sort((a, b) => (b.sticky || 0) - (a.sticky || 0));

  // 生成分页数据
  return pagination(path, posts, {
    perPage: config.index_generator.per_page,
    layout: 'archive',
    format: paginationDir + '/%d/',
    ...paginationOptions  // 添加额外的分页参数
  });
};

