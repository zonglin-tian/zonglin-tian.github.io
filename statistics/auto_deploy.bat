@echo off
REM 设置 hexo 博客路径
set BLOG_DIR=T:\root\notes\geek_road

REM 进入 Hexo 项目目录
cd /d %BLOG_DIR%

REM 清理之前生成的文件
REM hexo clean

REM 生成静态文件
hexo generate

REM 部署到 GitHub Pages
hexo deploy

REM 提示完成
echo Deployment complete!
pause
