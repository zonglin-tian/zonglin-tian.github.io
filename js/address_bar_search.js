document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q');
    console.log('DOMContentLoaded 事件触发，当前 URL 参数:', urlParams); // 添加调试输出
    if (searchQuery) {
        console.log('检测到 q 参数，值为:', searchQuery); // 添加调试输出
        // 使用 history.replaceState 重定向到首页，不留下 /search 的历史记录
        history.replaceState(null, null, '/');
        console.log('执行 history.replaceState 重定向'); // 添加调试输出
        // 监听 popstate 事件（页面状态变化事件），确保重定向后执行后续代码
        window.addEventListener('popstate', function () {
            console.log('popstate 事件触发'); // 添加调试输出
            const searchModal = new bootstrap.Modal(document.getElementById('modalSearch'));
            searchModal._config.backdrop = 'false';
            searchModal.show();
            searchModal._element.addEventListener('shown.bs.modal', function () {
                console.log('shown.bs.modal 事件触发'); // 添加调试输出
                const searchInput = document.getElementById('local-search-input');
                if (searchInput) {
                    console.log('获取到搜索输入框，设置值为:', searchQuery); // 添加调试输出
                    searchInput.value = searchQuery;
                    const inputEvent = new Event('input', { bubbles: true });
                    searchInput.dispatchEvent(inputEvent);
                    console.log('触发 input 事件'); // 添加调试输出
                }
            });
        });
        // 手动触发 popstate 事件（因为 history.replaceState 不会自动触发）
        console.log('手动触发 popstate 事件'); // 添加调试输出
        window.dispatchEvent(new PopStateEvent('popstate'));
    }
});
