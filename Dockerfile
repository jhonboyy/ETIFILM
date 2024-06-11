# Usar la imagen base oficial de PHP con Apache
FROM php:7.4-apache

# Copiar los archivos del proyecto PHP en el directorio público del servidor Apache
COPY . /var/www/html

# Habilitar el módulo de Apache para manejar .htaccess y otros
RUN a2enmod rewrite

# Exponer el puerto 80 para acceder al servidor desde el host
EXPOSE 80
