@echo off
setlocal enabledelayedexpansion

echo.
echo ======================================================
echo   ShopiCo - Levantando Entorno de Desarrollo
echo   ACLARATORIA IMPORTANTE: Es vital tener Docker abierto para que se genere el 
echo   Contenedor de la base de datos MySQL. En caso de tener complicaciones
echo   Se puede utilizar:
echo   cd api > npm run start:dev
echo   cd mobile > npm run android    (En caso de Android)
echo   Ajustar las variables de entornos: Si usa Android Studio dejar http://10.0.2.2:3000
echo   Caso contrario, se recomienda usar la IPv4 de la Maquina Servidor.
echo   EN CASO DE NO FUNCIONAR. TAMBIEN SE PUEDE USAR > npm run dev | Desde la consola de comandos.
echo ======================================================
echo.

:: 1. IMPORTANTE ACLARATORIA: Ameritamos Docker para levantar el servicio.
echo [1/3] Verificando Docker Desktop...
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Docker no parece estar iniciado.
    echo Por favor, abre Docker Desktop y espera a que este listo.
    echo.
    pause
    exit /b 1
)
echo [OK] Docker esta activo.

:: 2. Verificacion de modulos existentes en el programa raíz.
if not exist "node_modules" (
    echo [2/3] Instalando dependencias de la raiz...
    call npm install
) else (
    echo [2/3] Dependencias de la raiz encontradas.
)

:: 3. Levantamos todos los servicios en general. Si todo funciona.
echo [3/3] Iniciando Base de datos, API, y la aplicacion en general.
echo.
call npm run dev

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Hubo un problema al iniciar los servicios.
    echo Revisa los logs de arriba para mas detalles.
    echo.
    pause
)

echo.
echo ======================================================
echo   Proceso finalizado.
echo ======================================================
pause
