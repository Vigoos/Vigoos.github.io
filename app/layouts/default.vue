<template>
  <div class="min-h-screen bg-white font-sans text-slate-800 selection:bg-teal-500 selection:text-white overflow-x-clip">
    <AppHeader />
    
    <main>
      <slot />
    </main>

    <AppFooter />

    <!-- Widget flotante de WhatsApp (mini-chat) -->
    <WhatsAppWidget />

    <!-- Botón flotante para volver arriba de la página -->
    <BackToTop />
  </div>
</template>