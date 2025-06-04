document.addEventListener('DOMContentLoaded', function () {
    // 解析 URL 中的参数
    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get('q');
    if (q) {
        // 模拟用户在搜索框输入关键词并触发搜索
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.value = q;
            // 触发搜索事件（这里假设 Fluid 主题的搜索输入框有类似的事件绑定逻辑）
            const event = new Event('input', { bubbles: true });
            searchInput.dispatchEvent(event);
        }
    }
});
