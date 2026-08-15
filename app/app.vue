<template>
  <NuxtPwaAssets />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <!-- Notificación de actualización PWA -->
  <PwaUpdateToast />

  <!-- Música de ambiente: el primer click/tecla en cualquier parte activa una pista al azar -->
  <AmbientMusic />
</template>