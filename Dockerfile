# Usa la imagen base de PHP con Apache
FROM php:7.4-apache

# Establecer el nombre del servidor para evitar advertencias de Apache
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Instalar Composer globalmente
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copiar el contenido del directorio del proyecto al contenedor
COPY . /var/www/html

# Copiar el archivo .env.local al contenedor
COPY .env.local /var/www/html/.env.local

# Establecer el directorio de trabajo
WORKDIR /var/www/html

# Instalar dependencias de Composer
RUN composer install

# Habilitar el módulo rewrite de Apache
RUN a2enmod rewrite
