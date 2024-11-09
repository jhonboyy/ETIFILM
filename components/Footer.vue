<template>
   <footer id="footer">
     <div class="footer-left">
       <p>Etifilm Embalajes Industriales</p>
       <a href="mailto:etifilm@gmail.com" style="text-decoration: underline !important;">etifilm@gmail.com</a>
       <p>922 19 56 68 / 647 44 90 08</p>
     </div>
     <div class="footer-center">
       <p>Calle Justicia, 45, 17B</p>
       <p>38296, Canarias, España</p>
       <p>La Laguna, Santa Cruz de Tenerife</p>
     </div>
     <div class="footer-right">         
       <p>© Etifilm <span id="current-year">{{ currentYear }}</span></p>
       <a href="./privacidad" target="_blank" style="text-decoration: underline !important;">Politica de privacidad</a>
       <p>Esta web no usa cookies de terceros</p>
     </div>
   </footer>
 </template>
 
 <script>
 export default {
   name: 'FooterSection',
   data() {
     return {
       currentYear: new Date().getFullYear()
     };
   }
 };
 </script>
 
 <style scoped>
 /* Estilos específicos del footer */
 </style>
 