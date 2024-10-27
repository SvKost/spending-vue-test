<script setup></script>

<template>
  <div class="relative w-full">
    <h1
      class="text-center font-bold mb-4 text-xl sm:text-xl md:text-2xl lg:text-3xl px-4 sm:px-6 md:px-8 leading-tight sm:leading-snug md:leading-normal mx-auto max-w-4xl"
    >
      ТОП-10 транзакцій за даними Державної казначейської служби України
    </h1>
    <picture>
      <source
        srcset="../assets/img/main-img.webp"
        type="image/webp"
        media="(min-width: 768px)"
      />
      <source
        srcset="../assets/img/main-img.jpg"
        type="image/jpeg"
        media="(min-width: 768px)"
      />
      <img
        class="object-contain w-full max-h-[75vh] mx-auto"
        alt="Gadgets for calculations"
        src="../assets/img/main-img.jpg"
      />
    </picture>
  </div>
</template>
