// 定义一个异步函数读取文件内容
async function readTextFile(filePath) {
    try {
        // 使用 Fetch API 进行网络请求
        let response = await fetch(filePath);
        // 检查响应状态
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        // 读取响应体中的文本内容
        let text = await response.text();
        // 将文本内容赋值给变量
        return text;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// 调用函数并处理结果
readTextFile('/statistics/ad_log.txt').then(content => {
    // debug 显示文件内容到控制台
    console.log(content);
    // 将内容显示在  HTML 页面上
    document.getElementById('updated-time').innerText = "最近部署于: " + content;
});

