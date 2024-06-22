@echo off
REM 使用 UTF-8 编码保存日志文件
REM chcp 65001 > nul
REM 设置控制台编码为 ANSI
chcp 437 > nul

REM 设置 hexo 博客路径
set BLOG_DIR=T:\root\notes\geek_road
REM 设置日志文件路径
set LOG_FILE=%BLOG_DIR%\source\statistics\ad_log.txt

REM 进入 Hexo 项目目录
cd /d %BLOG_DIR%

REM 获取系统日期和时间
set currentDate=%date%
set currentTime=%time%
REM 格式调整

REM 使用 ,. 作为分隔符, 获取时和分
for /F "tokens=1 delims=,. " %%A in ("%currentTime%") do set timePart=%%A


hexo clean && hexo generate --silent && hexo deploy && if %errorlevel% neq 0 (
    echo Failed to deploy to GitHub Pages
    pause
    exit /b %errorlevel%
) else (
    echo Blog 最后更新于: %currentDate%/%timePart% > %LOG_FILE%
)

