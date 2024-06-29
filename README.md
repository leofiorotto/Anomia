
# Plataforma para Personas con Afasia

Este repositorio contiene el código fuente del proyecto de una plataforma web destinada a ayudar a personas con afasia. La plataforma incluye diversos ejercicios diseñados para mejorar la comunicación de los usuarios.

## Requisitos

Antes de empezar, asegúrate de tener instalados los siguientes requisitos:

- Node.js (v14 o superior)
- npm (v6 o superior)

## Instalación

Sigue estos pasos para clonar el repositorio y configurar el proyecto en tu máquina local:

1. Clona el repositorio:

   \`\`\`bash
   git clone https://github.com/leofiorotto/Anomia.git
   \`\`\`

2. Navega al directorio del proyecto:

   \`\`\`bash
   cd Anomia
   \`\`\`

3. Instala las dependencias:

   \`\`\`bash
   npm install
   \`\`\`


## Estructura del Proyecto

A continuación, se detalla la estructura de directorios del proyecto:

- **src/**: Contiene el código fuente de la aplicación.
  - **components/**: Componentes reutilizables de React.
  - **pages/**: Vistas principales de la aplicación.
  - **services/**: Lógica de negocio y llamadas a la API.
  - **utils/**: Utilidades y funciones auxiliares.
  - **styles/**: Archivos de estilos globales y específicos.
- **public/**: Archivos públicos que se sirven directamente.
- **config/**: Configuración de la aplicación.

## Comandos Útiles

Aquí tienes algunos comandos útiles para trabajar con el proyecto:

- **Iniciar el servidor de desarrollo**:

  \`\`\`bash
  npm run dev
  \`\`\`

- **Compilar la aplicación para producción**:

  \`\`\`bash
  npm run build
  \`\`\`

- **Desplegar la aplicación en GitHub Pages**:

  \`\`\`bash
  npm run deploy
  \`\`\`

- **Ejecutar linter**:

  \`\`\`bash
  npm run lint
  \`\`\`

## Almacenamiento de Imágenes

Estoy utilizando un bucket de AWS para el almacenamiento de las imágenes utilizadas en los ejercicios. Esto permite una gestión eficiente y segura de los recursos multimedia.
