<script setup>
import { deptPaths, nationalOutline } from '../data/boliviaMapData'
</script>

<template>
  <!-- Mapa de Bolivia (diseño claro): departamentos grises neutros + contorno rojo de marca sutil + red -->
  <div class="relative w-full max-w-125 mx-auto">
    <!-- Contenedor del mapa con proporciones reales de Bolivia (114.98 x 130) -->
    <div class="map-container relative">
      <!-- Silueta REAL de Bolivia: contorno nacional + límites departamentales -->
      <svg class="bolivia-bg" viewBox="0 0 114.98 130" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <path v-for="(d, i) in deptPaths" :key="'dept-' + i" :d="d" class="dept-line" />
        <path :d="nationalOutline" class="national-outline" />
      </svg>

      <!-- Canvas: ciudades, rutas y animación de flota -->
      <BoliviaNetworkCanvas />
    </div>
  </div>
</template>

<style scoped>
/* Contenedor del mapa: mantiene el aspect ratio real de Bolivia (0.8844).
   Fondo transparente — el rojo solo vive en el contorno exterior y el hub. */
.map-container {
  position: relative;
  width: 100%;
  aspect-ratio: 0.8844;
}

/* Silueta real de Bolivia como "tarjeta elevada" sobre blanco:
   sombra ambiental suave en vez de glow de color. */
.bolivia-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  pointer-events: none;
  filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.07));
}

.dept-line {
  fill: #f4f4f5;
  stroke: #a1a1aa;
  stroke-width: 0.35;
  vector-effect: non-scaling-stroke;
}

/* Único lugar donde el contorno lleva rojo: el borde exterior del país,
   a baja opacidad. Detalle de marca deliberado, no ruido. */
.national-outline {
  fill: none;
  stroke: rgba(225, 29, 46, 0.45);
  stroke-width: 0.8;
  vector-effect: non-scaling-stroke;
}
</style>
