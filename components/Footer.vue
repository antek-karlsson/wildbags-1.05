<template>
  <div>
    <SectionDivider />
    <div class="footer">
      <NuxtLink to="/"><img src="@/assets/images/logo.png" alt="Wildbags logo" /></NuxtLink>
      <a class="footer__link" href="tel: +48537254320">+48 537 254 320</a>
      <a class="footer__link" href="mailto: wildbags@wildbags.pl">wildbags@wildbags.pl</a>
      <a class="footer__link--icon" href="https://www.instagram.com/_wildbags/" target="_blank">
        <IconMdi:instagram />
      </a>
      <div class="footer__copyright">
        <p class="footer__copyright-main"><span>&copy;</span> 2023 Wildbags</p>
        <p class="footer__copyright-sub">
          built by <a href="https://github.com/antek-karlsson" target="_blank">Antoni Karlsson</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.footer {
  @include flex($direction: row, $justify: space-evenly, $align: center, $gap: 3.2rem);
  flex-wrap: wrap;
  width: 100%;
  padding: 2.5rem;
  background-color: transparent;
  color: $color-black;

  @include tablet-landscape {
    padding-block: 3.2rem;
  }

  @include desktop {
    padding-block: 4.8rem;
  }

  img {
    max-width: 12rem;
  }

  &__link {
    font-family: $font-lato;
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 1.33;
    text-decoration: none;
    color: inherit;

    // @include tablet-landscape {
    //   font-size: 2.4rem;
    // }

    &--icon {
      transition: all 0.3s ease-out;

      svg {
        color: $color-black;
        font-size: 3rem;
        transition: all 0.3s ease-in-out;
      }

      @media (hover: hover) {
        &:hover {
          transform: scale(1.5);
        }
      }
    }
  }

  &__copyright-main {
    font-family: $font-lato;
    font-weight: 600;
    font-size: 1.2rem;
    line-height: 1.33;
    letter-spacing: 0.01em;
  }

  &__copyright-sub {
    font-family: $font-lato;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.33;
    letter-spacing: 0.01em;

    a {
      display: inline-block;
      background-color: $color-black;
      padding-inline: 0.5rem;
      text-decoration: none;
      color: $color-white;
      font-weight: 600;
      transition: all 0.3s ease-out;

      @media (hover: hover) {
        &:hover {
          transform: scale(1.5);
          transform-origin: top left;
        }
      }
    }
  }
}
</style>
