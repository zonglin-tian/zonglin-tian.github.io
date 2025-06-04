document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q');
    if (searchQuery) {
        // 使用 history.replaceState 重定向到首页，不留下 /search 的历史记录
        history.replaceState(null, null, '/');
        const searchModal = new bootstrap.Modal(document.getElementById('modalSearch'));
        searchModal._config.backdrop = 'false';
        searchModal.show();
        searchModal._element.addEventListener('shown.bs.modal', function () {
            const searchInput = document.getElementById('local - search - input');
            if (searchInput) {
                searchInput.value = searchQuery;
                const inputEvent = new Event('input', { bubbles: true });
                searchInput.dispatchEvent(inputEvent);
            }
        });
    }
});
