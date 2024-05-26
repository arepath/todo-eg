# Iniciar proyecto

El proyecto esta creado en react por lo que se deben instalar las dependencias con npm i, seguido de esto correr el comando npm run start

- Las actividades destan distribuidas por ramas ejemplo: actividad1

# Docker

- Crear imagen de docker con 
    docker build -t docker-todoeg:1.0 .
- Ejecutar imagen con 
    docker run -p 4000:80 --name todoeg docker-todoeg:1.0
