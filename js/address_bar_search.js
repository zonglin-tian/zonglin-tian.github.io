document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q');
    if (searchQuery) {
        const searchModal = new bootstrap.Modal(document.getElementById('modalSearch'));
         // 在模态框显示的回调中执行填充和触发事件
        searchModal._config.backdrop = 'false'; // 防止背景点击关闭模态框（可选）
        searchModal.show();
        const searchInput = document.getElementById('local-search-input');
        if (searchInput) {
            searchInput.value = searchQuery;
            const inputEvent = new Event('input', { bubbles: true });
            searchInput.dispatchEvent(inputEvent);
        }
    }
});
