@echo off
title Ejecutar Spotify Manager

cd /d "%~dp0front-spotify-manager"
git pull
call install.bat

rem Llama al script de PowerShell para ejecutar npm start en segundo plano
powershell -WindowStyle Hidden -Command "& {Start-Process cmd -ArgumentList '/c npm start' -NoNewWindow}"

exit
