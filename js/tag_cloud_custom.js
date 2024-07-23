function tag_cloud_custom(options) {
  const tags = options.tags || [];
  const minFont = options.min_font || 15;
  const maxFont = options.max_font || 30;
  const unit = options.unit || 'px';
  const startColor = options.start_color || '#BBBBEE';
  const endColor = options.end_color || '#337ab7';

  const minCount = Math.min(...tags.map(tag => tag.posts.length));
  const maxCount = Math.max(...tags.map(tag => tag.posts.length));

  function getFontSize(count) {
    if (maxCount === minCount) {
        return minFont;
    }
    return minFont + (maxFont - minFont) * (count - minCount) / (maxCount - minCount);
  }

  function getColor(count) {
    // console.log(maxCount);
    // console.log(minCount);
    if (maxCount === minCount) {
      return startColor; // 如果所有标签的计数相同，可以返回一个固定颜色
    }
    const ratio = (count - minCount) / (maxCount - minCount);
    const start = hexToRgb(startColor);
    const end = hexToRgb(endColor);
    const r = Math.round(start.r + (end.r - start.r) * ratio);
    const g = Math.round(start.g + (end.g - start.g) * ratio);
    const b = Math.round(start.b + (end.b - start.b) * ratio);
    return `rgb(${r},${g},${b})`;
  }

  function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255
    };
  }

  return tags.map(tag => {
    tag_count = tag.posts.length;
    const size = getFontSize(tag_count);
    const color = getColor(tag_count);
    const tag_name = tag.name.charAt(0).toUpperCase() + tag.name.slice(1);
    return `<a href="/discipline/${tag_name.toLowerCase()}" style="font-size: ${size}${unit}; color: ${color};">${tag_name}</a>`;
  }).join(' ');
}

// Export the function for use in templates
module.exports = tag_cloud_custom;

