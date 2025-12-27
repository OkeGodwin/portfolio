const smMenuBtn = document.querySelector('.main-header__sm-scr-nav-btn')
const smMenu = document.querySelector('.main-header__sm-menu')
const smMenuCloseBtn = document.querySelector('.main-header__sm-menu-close')

const smMenuLinks = document.querySelectorAll('.main-header__sm-menu-link')
const smMenuLink1 = document.querySelector('.main-header__sm-menu-link--1')
const smMenuLink2 = document.querySelector('.main-header__sm-menu-link--2')
const smMenuLink3 = document.querySelector('.main-header__sm-menu-link--3')
const smMenuLink4 = document.querySelector('.main-header__sm-menu-link--4')

smMenuBtn.addEventListener('click', () => {
  smMenu.style.transitionDelay = '0s'
  smMenu.classList.add('main-header__sm-menu--active')

  smMenuLink1.style.transitionDelay = '.5s'
  smMenuLink1.style.transform = 'translateY(0)'
  smMenuLink1.style.opacity = '1'

  smMenuLink2.style.transitionDelay = '.8s'
  smMenuLink2.style.transform = 'translateY(0)'
  smMenuLink2.style.opacity = '1'

  smMenuLink3.style.transitionDelay = '1.1s'
  smMenuLink3.style.transform = 'translateY(0)'
  smMenuLink3.style.opacity = '1'

  smMenuLink4.style.transitionDelay = '1.4s'
  smMenuLink4.style.transform = 'translateY(0)'
  smMenuLink4.style.opacity = '1'
})

smMenuLinks.forEach((ele) => {
  ele.addEventListener('click', () => {
    smMenuLink4.style.transitionDelay = '0s'
    smMenuLink4.style.transform = 'translateY(50px)'
    smMenuLink4.style.opacity = '0'

    smMenuLink3.style.transitionDelay = '.3s'
    smMenuLink3.style.transform = 'translateY(50px)'
    smMenuLink3.style.opacity = '0'

    smMenuLink2.style.transitionDelay = '.6s'
    smMenuLink2.style.transform = 'translateY(50px)'
    smMenuLink2.style.opacity = '0'

    smMenuLink1.style.transitionDelay = '.9s'
    smMenuLink1.style.transform = 'translateY(50px)'
    smMenuLink1.style.opacity = '0'

    smMenu.style.transitionDelay = '1.2s'
    smMenu.classList.remove('main-header__sm-menu--active')

    setTimeout(() => {
      document.getElementById(ele.name).scrollIntoView()
    }, 1300)
  })
})

smMenuCloseBtn.addEventListener('click', () => {
  smMenuLink4.style.transitionDelay = '0s'
  smMenuLink4.style.transform = 'translateY(50px)'
  smMenuLink4.style.opacity = '0'

  smMenuLink3.style.transitionDelay = '.3s'
  smMenuLink3.style.transform = 'translateY(50px)'
  smMenuLink3.style.opacity = '0'

  smMenuLink2.style.transitionDelay = '.6s'
  smMenuLink2.style.transform = 'translateY(50px)'
  smMenuLink2.style.opacity = '0'

  smMenuLink1.style.transitionDelay = '.9s'
  smMenuLink1.style.transform = 'translateY(50px)'
  smMenuLink1.style.opacity = '0'

  smMenu.style.transitionDelay = '1.2s'
  smMenu.classList.remove('main-header__sm-menu--active')
})





// ---
const themeColorSelector = document.querySelector('.themeClrSelector')
const themeColorSelectorInput = document.querySelector(
  '.themeClrSelector__input'
)
const root = document.documentElement;



const hexToRgb = (hex) => {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

const eventFire = (el, etype) => {
  if (el.fireEvent) {
    el.fireEvent('on' + etype)
  } else {
    let evObj = document.createEvent('Events')
    evObj.initEvent(etype, true, false)
    el.dispatchEvent(evObj)
  }
}

themeColorSelector.addEventListener('click', () => {
  eventFire(themeColorSelectorInput, 'input')
})

const setDynamicColor = (color) => {

  const { r, g, b } = hexToRgb(`${color}`)
  
  root.style.setProperty('--themeColor', `${r},${g},${b}`);
  //localStorage.setItem('color', color)
}

themeColorSelectorInput.addEventListener('input', (e) => {
  setDynamicColor(e.target.value)
})

// if (localStorage.getItem('color')) {
//   let userSelectedColor = localStorage.getItem('color')
//   themeColorSelectorInput.value = userSelectedColor
//   setDynamicColor(userSelectedColor)
// }

// ---
const headerLogoConatiner = document.querySelector('.main-header__logo-container')

headerLogoConatiner.addEventListener('click', () => {
  location.href = 'index.html'
})


/* Image slider logic */
;(function () {
  const slidesWrap = document.querySelector('.image-slider__slides')
  if (!slidesWrap) return

  const slides = Array.from(document.querySelectorAll('.image-slider__slide'))
  const prevBtn = document.querySelector('.image-slider__nav--prev')
  const nextBtn = document.querySelector('.image-slider__nav--next')
  const dotsContainer = document.querySelector('.image-slider__dots')

  let current = 0
  let autoplayInterval = null

  function renderDots() {
    dotsContainer.innerHTML = ''
    slides.forEach((_, i) => {
      const d = document.createElement('button')
      d.className = 'image-slider__dot'
      d.setAttribute('aria-label', `Go to slide ${i + 1}`)
      d.addEventListener('click', () => goTo(i))
      dotsContainer.appendChild(d)
    })
    updateDots()
  }

  function updateDots() {
    const dots = dotsContainer.querySelectorAll('.image-slider__dot')
    dots.forEach((dot, i) => {
      dot.classList.toggle('image-slider__dot--active', i === current)
    })
  }

  const isMobile = () => window.matchMedia('(max-width: 600px)').matches

  function setActiveSlideByClass(idx) {
    slides.forEach((s, i) => {
      s.classList.toggle('image-slider__slide--active', i === idx)
    })
  }

  function goTo(index) {
    current = (index + slides.length) % slides.length
    if (isMobile()) {
      // use opacity-based crossfade on mobile
      setActiveSlideByClass(current)
      // ensure slidesWrap has no transform residual
      slidesWrap.style.transform = ''
    } else {
      slidesWrap.style.transform = `translateX(-${current * 100}%)`
      // make sure active class isn't interfering on desktop
      slides.forEach(s => s.classList.remove('image-slider__slide--active'))
    }
    updateDots()
    adjustSliderHeight()
    resetAutoplay()
  }

  function prev() { goTo(current - 1) }
  function next() { goTo(current + 1) }

  function startAutoplay() {
    autoplayInterval = setInterval(() => { goTo(current + 1) }, 4500)
  }

  function resetAutoplay() {
    if (autoplayInterval) clearInterval(autoplayInterval)
    startAutoplay()
  }

  // Dynamically adjust slider height to match current image
  function adjustSliderHeight() {
    const activeSlide = slides[current]
    if (!activeSlide) return
    
    const img = activeSlide.querySelector('img')
    if (!img) return
    
    const onImageLoad = () => {
      const imgHeight = img.offsetHeight
      const imgComputedHeight = window.getComputedStyle(img).height
      const actualHeight = img.naturalHeight ? (img.offsetWidth / img.naturalWidth) * img.naturalHeight : img.offsetHeight
      
      // Set wrapper height to match the image (with min/max bounds)
      const minHeight = 300
      const maxHeight = window.innerHeight * 0.9
      const newHeight = Math.min(Math.max(actualHeight, minHeight), maxHeight)
      
      slidesWrap.parentElement.style.height = newHeight + 'px'
    }
    
    // If image is already loaded, adjust immediately
    if (img.complete) {
      onImageLoad()
    } else {
      // Otherwise, wait for load
      img.addEventListener('load', onImageLoad, { once: true })
    }
  }

  prevBtn.addEventListener('click', prev)
  nextBtn.addEventListener('click', next)

  // Touch / swipe support for mobile
  let touchStartX = 0
  let touchCurrentX = 0
  let isTouching = false

  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length === 1) {
      touchStartX = e.touches[0].clientX
      touchCurrentX = touchStartX
      isTouching = true
      if (autoplayInterval) clearInterval(autoplayInterval)
      // don't perform live translate on mobile; we'll detect swipe on end
    }
  }

  const handleTouchMove = (e) => {
    if (!isTouching) return
    touchCurrentX = e.touches[0].clientX
    // do not change transform during move on mobile to avoid partial overlaps
  }

  const handleTouchEnd = () => {
    if (!isTouching) return
    isTouching = false
    const move = touchCurrentX - touchStartX
    const threshold = Math.min(50, slidesWrap.clientWidth * 0.12)
    if (move < -threshold) {
      next()
    } else if (move > threshold) {
      prev()
    } else {
      goTo(current)
    }
  }

  slidesWrap.addEventListener('touchstart', handleTouchStart, { passive: true })
  slidesWrap.addEventListener('touchmove', handleTouchMove, { passive: true })
  slidesWrap.addEventListener('touchend', handleTouchEnd)

  // on resize, re-render current slide for the current mode
  window.addEventListener('resize', () => {
    goTo(current)
    adjustSliderHeight()
  })

  // set initial active state for mobile and adjust height on load
  if (isMobile()) setActiveSlideByClass(current)
  adjustSliderHeight()

  renderDots()
  startAutoplay()

  // Lightbox functionality
  const lightbox = document.querySelector('.image-lightbox')
  const lightboxImg = document.querySelector('.image-lightbox__img')
  const lightboxCloseBtn = document.querySelector('.image-lightbox__close')

  // Add click handlers to all slider images
  // Add click handlers, keyboard support, and a visual hint badge to all slider images
  slides.forEach((slide) => {
    const img = slide.querySelector('img')

    // create hint badge
    const hint = document.createElement('span')
    hint.className = 'image-slider__zoom-hint'
    hint.setAttribute('aria-hidden', 'true')
    hint.textContent = '🔍'
    slide.appendChild(hint)

    if (img) {
      img.style.cursor = 'pointer'
      img.setAttribute('tabindex', '0')
      img.addEventListener('click', (e) => {
        lightboxImg.src = img.src
        lightboxImg.alt = img.alt
        lightbox.classList.add('image-lightbox--active')
        document.body.style.overflow = 'hidden'
      })
      // keyboard accessibility (Enter / Space)
      img.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          img.click()
        }
      })
    }
  })

  // Close lightbox
  const closeLightbox = () => {
    lightbox.classList.remove('image-lightbox--active')
    document.body.style.overflow = ''
  }

  lightboxCloseBtn.addEventListener('click', closeLightbox)

  // Close on background click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox()
    }
  })

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('image-lightbox--active')) {
      closeLightbox()
    }
  })
})()
