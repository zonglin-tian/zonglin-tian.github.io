@echo off
REM 设置 hexo 博客路径
set BLOG_DIR=T:\root\notes\geek_road
REM 设置日志文件路径
set LOG_FILE=%BLOG_DIR%\source\statistics\ad_log.txt

REM 进入 Hexo 项目目录
cd /d %BLOG_DIR%

hexo clean && hexo generate && hexo deploy && if %errorlevel% neq 0 (
    echo Failed to deploy to GitHub Pages
    pause
    exit /b %errorlevel%
) else (
    echo BLOG 最近部署时间: %date% %time% > %LOG_FILE%
)

