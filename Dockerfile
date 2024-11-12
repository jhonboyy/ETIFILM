# Usa la imagen oficial de Node.js 18 como imagen base
FROM node:18

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del proyecto al contenedor
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
