@echo off

REM 使用 UTF-8 编码保存日志文件
chcp 65001 > nul

REM 设置 hexo 博客路径
set BLOG_DIR=T:\root\notes\geek_road
REM 设置日志文件路径
set LOG_FILE=%BLOG_DIR%\source\statistics\ad_log.txt

REM 进入 Hexo 项目目录
cd /d %BLOG_DIR%

REM 开启延迟变量扩展
setlocal enabledelayedexpansion
REM 初始化
set "lastUpdateTime="

REM 读取文件内容到变量
for /f "delims=" %%i in (%LOG_FILE%) do (
    set "lastUpdateTime=!lastUpdateTime!%%i"
)

REM 获取系统日期和时间
set currentDate=%date%
set currentTime=%time%
REM 格式调整

REM 使用 ,. 作为分隔符, 获取日期
for /F "tokens=2 delims=,. " %%A in ("%currentDate%") do set datePart=%%A

REM 使用 ,. 作为分隔符, 获取时分秒
for /F "tokens=1 delims=,. " %%A in ("%currentTime%") do set timePart=%%A

echo %datePart%/%timePart% > %LOG_FILE%

endlocal

hexo clean --silent && hexo generate --silent && hexo deploy && if %errorlevel% neq 0 (
    echo %lastUpdateTime% > %LOG_FILE%
    echo Failed to deploy to GitHub Pages
    exit /b %errorlevel%
)
