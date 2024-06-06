<template>
  <section class="section-3" id="section-3">
    <div class="products">
      <h2>Productos</h2>
      <div class="container-product-top">
        <div class="container-nav">
          <button type="button" aria-label="flecha a la izquierda" id="button--left"><object id="arrow--left" type="image/svg+xml" data="/images/arrow_left.svg"></object></button>
          <button type="button" aria-label="flecha a la derecha" id="button--right"><object id="arrow--right" type="image/svg+xml" data="/images/arrow_right.svg"></object></button>
        </div>
      </div>
      <div class="container-slider">
        <div id="my-keen-slider" class="keen-slider" ref="sliderContainer">
          <div class="keen-slider__slide number-slide1">
            <h3>Film</h3>
            <h4>Film manual y de máquina estirables. Tenemos diferentes preestiros y de material reciclado.</h4>
            <div class="svg-container-products">
              <img alt="ilustración de una caja siendo embalada con film transparente" src="/images/film.svg">
            </div>
          </div>
          <div class="keen-slider__slide number-slide">
            <h3>Precinto</h3>
            <h4>Acrílicos, base solvente y PVC de diferentes calidades, medidas y colores.</h4>
            <div class="svg-container-products">
              <img alt="ilustración de una caja y tres rollos de precinto al lado izquierdo" src="/images/Precinto.svg">
            </div>
          </div>
          <div class="keen-slider__slide number-slide">
            <h3>Big Bag</h3>
            <h4>Reutilizables de diferentes medidas, materiales, pesos y especificaciones.</h4>
            <div class="svg-container-products">
              <img alt="ilustración de un big bag lleno" src="/images/Bags.svg">
            </div>
          </div>
          <div class="keen-slider__slide number-slide">
            <h3>Fleje</h3>
            <h4>Polipropileno y reciclado para máquina y manual, en diferentes medidas.</h4>
            <div class="svg-container-products">
              <img alt="ilustración de una bobina de fleje" src="/images/Fleje.svg">
            </div>
          </div>
          <div class="keen-slider__slide number-slide">
            <h3>Poliolefina</h3>
            <h4>Bobinas semitubo de diferentes medidas y gramajes.</h4>
            <div class="svg-container-products">
              <img alt="ilustración de una bobina de poliolefina y una bandeja de comida embalada" src="/images/Poleolefina.svg">
            </div>
          </div>
          <div class="keen-slider__slide number-slide">
            <h3>Cordel</h3>
            <h4>Bobinas de cordel para máquinas industriales y manuales de tres cabos.</h4>
            <div class="svg-container-products">
              <img alt="ilustración de tres bobinas de cordel, una de ellas al frente, las otras dos detrás" src="/images/Cordel.svg">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import KeenSlider from 'keen-slider'

import 'keen-slider/keen-slider.min.css'

export default {
  name: 'Products',
  setup() {
    const sliderContainer = ref(null)
    let sliderInstance = null

    const initializeSlider = () => {
      if (sliderInstance) {
        sliderInstance.destroy()
      }
      sliderInstance = new KeenSlider(sliderContainer.value, {
        loop: true,
        slides: {
          perView: window.innerWidth <= 900 ? 1 : 2,
        },
        breakpoints: {
          '(max-width: 900px)': {
            slides: { perView: 1 }
          },
          '(min-width: 901px)': {
            slides: { perView: 2 }
          }
        }
      })

      const buttonLeft = document.getElementById("button--left")
      const buttonRight = document.getElementById("button--right")
      const arrowLeft = document.getElementById("arrow--left")
      const arrowRight = document.getElementById("arrow--right")

      sliderInstance.on("move", (details) => {
        if (details.relativeSlide === 0) {
          arrowLeft.classList.add("hidden")
        } else {
          arrowLeft.classList.remove("hidden")
        }
        if (details.relativeSlide === details.size - 1) {
          arrowRight.classList.add("hidden")
        } else {
          arrowRight.classList.remove("hidden")
        }
      })

      buttonLeft.addEventListener("click", () => {
        sliderInstance.prev()
      })

      buttonRight.addEventListener("click", () => {
        sliderInstance.next()
      })
    }

    onMounted(() => {
      initializeSlider()
      window.addEventListener("resize", initializeSlider)
    })

    onBeforeUnmount(() => {
      if (sliderInstance) {
        sliderInstance.destroy()
      }
      window.removeEventListener("resize", initializeSlider)
    })

    return { sliderContainer }
  }
}
</script>

<style scoped>

.hidden {
  display: none;
}

</style>
