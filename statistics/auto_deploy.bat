@echo off
REM 设置 hexo 博客路径
set BLOG_DIR=T:\root\notes\geek_road

REM 进入 Hexo 项目目录
cd /d %BLOG_DIR%

hexo clean --silent && hexo generate --silent && hexo deploy

REM 提示完成
echo Deployment complete!
pause
