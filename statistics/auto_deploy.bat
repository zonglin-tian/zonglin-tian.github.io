@echo off
REM 设置 hexo 博客路径
set BLOG_DIR=T:\root\notes\geek_road

REM 进入 Hexo 项目目录
cd /d %BLOG_DIR%

hexo clean && hexo generate && hexo deploy

if %errorlevel% neq 0 (
    echo Failed to deploy to GitHub Pages
    pause
    exit /b %errorlevel%
)

REM 提示完成
echo Deployment complete!
pause
