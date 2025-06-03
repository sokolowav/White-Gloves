
// -------- SWIPER NEWS ----------------------------------------

const swiperNews = new Swiper('.news .swiper', {
  effect: 'fade',
  fadeEffect: { crossFade: true },
  loop: true,
  autoplay: {
    delay: 5000,
    pauseOnMouseEnter: true,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.news .swiper-pagination',
    clickable: true,
  },
})

// -----  BUTTON HOVER ANIMATION (BUBBLE) --------------------

const btns = document.querySelectorAll('.news .button')
btns.forEach((btn) => {
  const span = btn.querySelector('.bubble')

  function setPosition(e) {
    const rect = btn.getBoundingClientRect()
    const relX = e.clientX - rect.left
    const relY = e.clientY - rect.top

    span.style.left = `${relX}px`
    span.style.top = `${relY}px`
  }

  btn.addEventListener('mouseenter', setPosition)
  btn.addEventListener('mouseout', setPosition)
})

// ----- SWIPER DEMONSTRATION ------------------------------------
const demonstrationSwiper = new Swiper('.demonstration__swiper', {
  slidesPerView: 1,
  effect: 'fade',
  allowTouchMove: false,
})
const mobileToggle = document.querySelector('.swiper__tabsToggle')
const tabs = document.querySelector('.swiper__tabs')
const mobileSelected = document.querySelector('.swiper__tabs_selected')
const demonstrationOverlay = document.querySelector('.demonstration__overlay')
const closeBtn = demonstrationOverlay.querySelector('.closeBtn')

mobileToggle?.addEventListener('click', () => {
  tabs.classList.toggle('show')
  mobileToggle.classList.toggle('open')
})

document.querySelectorAll('.swiper__tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    const index = parseInt(tab.dataset.tab, 10)
    demonstrationSwiper.slideTo(index)
    document
      .querySelectorAll('.swiper__tab')
      .forEach((t) => t.classList.remove('active'))
    tab.classList.add('active')
    mobileSelected.textContent = tab.textContent
    tabs.classList.remove('show')
    mobileToggle.classList.remove('open')
    demonstrationOverlay.classList.add('fade-out')
    setTimeout(() => {
      demonstrationOverlay.classList.remove('fade-out')
      demonstrationOverlay.classList.remove('active')
      demonstrationOverlay.style.visibility = 'hidden'
      demonstrationOverlay.style.pointerEvents = 'none'
    }, 300)
  })
})

document.querySelectorAll('.dotWrapper').forEach((dot) =>
  dot.addEventListener('click', () => {
    const text = dot.querySelector('span').innerHTML
    const textWrapper = demonstrationOverlay.querySelector('span')
    textWrapper.innerHTML = text
    demonstrationOverlay.style.visibility = 'visible'
    demonstrationOverlay.style.pointerEvents = 'auto'
    demonstrationOverlay.classList.add('active')
  })
)

closeBtn.addEventListener('click', () => {
  demonstrationOverlay.classList.add('fade-out')

  setTimeout(() => {
    demonstrationOverlay.classList.remove('fade-out')
    demonstrationOverlay.classList.remove('active')
    demonstrationOverlay.style.visibility = 'hidden'
    demonstrationOverlay.style.pointerEvents = 'none'
  }, 300)
})

// ----- SWIPER REPORT --------------------------------------------
const reportSwiper = new Swiper('.report__swiper', {
  effect: 'fade',
  fadeEffect: { crossFade: true },
  loop: true,
  allowTouchMove: false,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  on: {
    slideChange: function () {
      updateCustomPagination(this)
    },
    init: function () {
      updateCustomPagination(this)
    },
  },
})

function updateCustomPagination(swiper) {
  const slides = swiper.slides

  slides.forEach((slide, index) => {
    const pagination = slide.querySelector('.swiper__pagination')
    if (!pagination) return

    pagination.innerHTML = ''
    for (let i = 0; i < swiper.slides.length; i++) {
      const bullet = document.createElement('span')
      bullet.className = 'swiper__paginationBullet'
      if (i === swiper.realIndex)
        bullet.classList.add('swiper__paginationBullet_active')
      bullet.addEventListener('click', () => swiper.slideToLoop(i))
      pagination.appendChild(bullet)
    }
  })
}

//------------------BEFORE/AFTER -----------------------------
document.querySelectorAll('.slider').forEach((slider) => {
  slider.addEventListener('input', () => slide(slider.id))
})

function slide(id) {
  const slider = document.getElementById(id)
  const slideValue = slider.value

  slider.previousElementSibling.previousElementSibling.style.clipPath = `polygon(0 0, ${slideValue}% 0, ${slideValue}% 100%, 0 100%)`

  const line = document.getElementById(`line-${id}`)
  line.style.left = `calc(${slideValue}% - 1px)`
}

//------------------CHECKBOX--------------------------------------
document.querySelectorAll('.checkboxWrapper').forEach((checkbox) => {
  checkbox.addEventListener('click', () => {
    checkbox.querySelector('.check').classList.toggle('check_invisible')
  })
})

//------------------Phone INPUT mask-----------------------------------------

const phoneInputEquipment = document.querySelector('.equipment__input')
const phoneInputResult = document.querySelector('.result__input')
const phoneInputOrder = document.querySelector('.order__input')

Inputmask({
  mask: '+7 (999) 999-99-99',
  showMaskOnHover: false,
  showMaskOnFocus: true,
  placeholder: '_',
  clearIncomplete: true,
}).mask(phoneInputEquipment)

Inputmask({
  mask: '+7 (999) 999-99-99',
  showMaskOnHover: false,
  showMaskOnFocus: true,
  placeholder: '_',
  clearIncomplete: true,
}).mask(phoneInputResult)

Inputmask({
  mask: '+7 (999) 999-99-99',
  showMaskOnHover: false,
  showMaskOnFocus: true,
  placeholder: '_',
  clearIncomplete: true,
}).mask(phoneInputOrder)

//------------------FAQ--------------------------------------

document.querySelectorAll('.FAQ__itemQuestion').forEach((question) => {
  question.addEventListener('click', () => {
    const item = question.closest('.FAQ__item')
    const answer = item.querySelector('.FAQ__itemAnswer')
    const btnImg = item.querySelector('.FAQ__buttonImg')
    const isOpen = answer.classList.contains('active')

    document.querySelectorAll('.FAQ__itemAnswer').forEach((el) => {
      el.classList.remove('active')
      el.style.maxHeight = null
    })
    document.querySelectorAll('.FAQ__buttonImg').forEach((img) => {
      img.classList.remove('FAQ__buttonImg_active')
    })

    if (!isOpen) {
      answer.classList.add('active')
      answer.style.maxHeight = answer.scrollHeight + 40 + 'px'
      btnImg.classList.add('FAQ__buttonImg_active')
    }
  })
})

//-----------------NAVBAR------------------------------------

document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.querySelector('.navbar')
  const navbarTabs = document.querySelectorAll('.navbar__tab')
  const navLinks = document.querySelectorAll('.navbar a[href^="#"]')
  const servicesSection = document.querySelector('.services')
  const sections = document.querySelectorAll('section[id]')
  let navbarVisible = false

  //--Navbar visibility (window restart) behavior--
  const servicesRect = servicesSection.getBoundingClientRect()
  const inView = servicesRect.top < 100
  if (inView) {
    navbar.classList.add('visible')
    navbarVisible = true
  }

  //--Active link behavior--
  navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute('href'))
      const navbarTab = this.closest('.navbar__tab')

      if (target) {
        const navbarOffset = parseFloat(getComputedStyle(navbar).height)
        const offsetPosition =
          target.getBoundingClientRect().top + window.pageYOffset - navbarOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })

        navbarTabs.forEach((tab) => tab.classList.remove('active'))
        navbarTab.classList.add('active')
      }
    })
  })

  //--Section Observers--
  const servicesObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !navbarVisible && window.scrollY > 100) {
          navbar.classList.add('visible')
          navbarVisible = true
        } else if (
          (!entry.isIntersecting || window.scrollY <= 100) &&
          navbarVisible
        ) {
          navbar.classList.remove('visible')
          navbarVisible = false
        }
      })
    },
    { threshold: 0.1 }
  )

  servicesObserver.observe(servicesSection)

  window.addEventListener('scroll', () => {
    if (window.scrollY <= 100 && navbarVisible) {
      navbar.classList.remove('visible')
      navbarVisible = false
    } else if (
      window.scrollY > 100 &&
      servicesSection.getBoundingClientRect().top < window.innerHeight
    ) {
      navbar.classList.add('visible')
      navbarVisible = true
    }
  })

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('id')
        const navbarTab = document
          .querySelector(`.navbar a[href="#${id}"]`)
          ?.closest('.navbar__tab')

        if (entry.isIntersecting) {
          navbarTabs.forEach((tab) => tab.classList.remove('active'))
          if (navbarTab) navbarTab.classList.add('active')
        }
      })
    },
    { threshold: 0.25 }
  )

  sections.forEach((section) => sectionObserver.observe(section))

  //--Navbar mobile logic--
  const burger = document.querySelector('#navbarBurger')
  const navbarArrow = document.querySelector('#navbarArrow')
  const footer = document.querySelector('.footer')
  let isHidden = false
  let timeoutId = null
  const mobileMenu = document.createElement('div')
  mobileMenu.classList.add('navbar__tabs_mobile')

  function openMobileNavbar() {
    burger.classList.add('active')
    mobileMenu.classList.add('active', 'fadeInRightSection')
  }

  function closeMobileNavbar() {
    burger.classList.remove('active')
    mobileMenu.classList.remove('fadeInRightSection')
    mobileMenu.classList.add('fadeOutRightSection')

    setTimeout(
      () => mobileMenu.classList.remove('active', 'fadeOutRightSection'),
      300
    )
  }

  navbarTabs.forEach((tab) => {
    const clone = tab.cloneNode(true)
    mobileMenu.appendChild(clone)
  })

  document.body.appendChild(mobileMenu)

  burger.addEventListener('click', () =>
    burger.classList.contains('active')
      ? closeMobileNavbar()
      : openMobileNavbar()
  )

  mobileMenu.querySelectorAll('.navbar__tab').forEach((tab) => {
    tab.addEventListener('click', (e) => {
      e.preventDefault()
      const link = tab.querySelector('a')
      const target = document.querySelector(link.getAttribute('href'))

      if (target) {
        const offsetPosition =
          target.getBoundingClientRect().top + window.pageYOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })
      }

      closeMobileNavbar()
    })
  })

  navbarArrow.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    closeMobileNavbar()
  })

  const showControls = () => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      if (isHidden) {
        burger.classList.remove('fadeOutRightSection')
        navbarArrow.classList.remove('fadeOutRightSection')
        burger.classList.add('fadeInRightSection')
        navbarArrow.classList.add('fadeInRightSection')
        isHidden = false
      }
    }, 300)
  }

  const hideControls = () => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      if (!isHidden) {
        burger.classList.remove('fadeInRightSection')
        navbarArrow.classList.remove('fadeInRightSection')
        burger.classList.add('fadeOutRightSection')
        navbarArrow.classList.add('fadeOutRightSection')
        closeMobileNavbar()
        isHidden = true
      }
    }, 300)
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          hideControls()
        } else {
          showControls()
        }
      })
    },
    {
      root: null,
      threshold: 0.1,
    }
  )

  if (footer && window.innerWidth <= 767) {
    observer.observe(footer)
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth > 767) {
      clearTimeout(timeoutId)
      burger.classList.remove('fadeOutRightSection', 'fadeInRightSection')
      navbarArrow.classList.remove('fadeOutRightSection', 'fadeInRightSection')

      closeMobileNavbar()
    }
  })
})

//-----------------DETAILS----------------------------------
document.addEventListener('DOMContentLoaded', function () {
  const items = document.querySelectorAll('.services__item')

  items.forEach((item) => {
    const detailsBtn = item.querySelector('.details')
    const closeBtn = item.querySelector('.closeBtn')

    detailsBtn.addEventListener('click', () => {
      items.forEach((el) => el.classList.remove('flipped'))
      item.classList.add('flipped')
    })

    closeBtn.addEventListener('click', () => {
      item.classList.remove('flipped')
    })
  })
})

//-----------------FADE-IN-SECTIONS---------------------

const fadeItems = document.querySelectorAll('.fadeInSection')

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = parseInt(entry.target.dataset.index, 10) || 0
        const delay = index * 100
        entry.target.style.setProperty('--delay', `${delay}ms`)

        entry.target.classList.add('show')
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.2 }
)

fadeItems.forEach((el) => observer.observe(el))

//-----------------MODALS--------------------

//--------------- MODAL CALC ----------------

document.addEventListener('DOMContentLoaded', () => {
  const modalOverlayCalc = document.querySelector('#modalOverlayCalc')
  const modalOverlayResult = document.querySelector('#modalOverlayResult')
  const modalOverlayConfirmation = document.querySelector(
    '#modalOverlayConfirmation'
  )
  const modalOverlayOrder = document.querySelector('#modalOverlayOrder')
  const modalOverlayRequisites = document.querySelector(
    '#modalOverlayRequisites'
  )
  const modalOverlayPrivacy = document.querySelector('#modalOverlayPrivacy')

  const formCalc = document.querySelector('.modal_calculator__content')
  const formOrder = modalOverlayOrder.querySelector('.order__form')
  const formEquipment = document.querySelector('.equipment__form')
  const modalCalc = document.querySelector('#modalCalc')
  const resultSummaryContainer =
    modalOverlayResult.querySelector('.resultSummary')
  const resultPriceContainer = modalOverlayResult.querySelector('.resultPrice')

  const btnsOpenModalCalc = document.querySelectorAll('.openModalCalc')
  const btnsOpenModalOrder = document.querySelectorAll('.openModalOrder')
  const btnOpenModalRequisites = document.querySelector('.openModalRequisites')
  const btnsOpenModalPrivacy = document.querySelectorAll('.openModalPrivacy')
  const btnOrder = modalOverlayOrder.querySelector('.order__button')
  const btnEquipment = document.querySelector('.equipment__button')
  const btnForward = modalCalc.querySelector('.button_forward')
  const btnBack = modalCalc.querySelector('.button_back')
  const btnConfirm = modalOverlayResult.querySelector('.result__button')
  const closeBtnCalc = modalOverlayCalc.querySelector('.closeBtn')
  const closeBtnResult = modalOverlayResult.querySelector('.closeBtn')
  const closeBtnConfirmation =
    modalOverlayConfirmation.querySelector('.closeBtn')
  const closeBtnOrder = modalOverlayOrder.querySelector('.closeBtn')
  const closeBtnRequisites = modalOverlayRequisites.querySelector('.closeBtn')
  const closeBtnPrivacy = modalOverlayPrivacy.querySelector('.closeBtn')

  const steps = modalCalc.querySelectorAll('.modal__step')
  const progressBar = modalCalc.querySelector('.modal__progressBar')
  const progressBarTxt = progressBar.querySelector('.txt_regular')
  const modalCalcLeftItem = modalOverlayCalc.querySelector(
    '.modal_calculator__aside'
  )
  const modalCalcRightItem = modalOverlayCalc.querySelector(
    '.modal_calculator__content'
  )
  const modalResult = modalOverlayResult.querySelector('.modal_result')
  const modalConfirmation = modalOverlayConfirmation.querySelector(
    '.modal_confirmation'
  )
  const modalOrder = modalOverlayOrder.querySelector('.modal_order')
  const modalRequisites =
    modalOverlayRequisites.querySelector('.modal_requisites')
  const modalPrivacy = modalOverlayPrivacy.querySelector('.modal_privacy')
  let currentStep = 0

  const servicePrices = {
    'Гeнеральная уборка': 150,
    'Уборка после ремонта': 150,
    'Поддерживающая уборка': 80,
    'Экспресс уборка': 130,
  }

  const extraServices = {
    'Мойка холодильника': 600,
    'Мойка микроволновки': 400,
    'Мойка варочной плиты': 400,
    'Мойка духовки': 500,
    'Мойка вытяжки': 500,
    'Уборка на балконе': 1000,
    'Мойка потолков': 35,
    'Мойка стен': 50,
    'Поменять постельное': 200,
  }

  let serviceSummary = {}
  let total = ''

  function calculatePrice(area, servicePrice, extras) {
    const extraPriceResults = []
    let total = 0

    const serviceCost = area * servicePrice
    total += serviceCost

    const allExtras = extras.map((extra) => {
      const isPerSquare = ['Мойка потолков', 'Мойка стен'].includes(extra.name)
      const cost = isPerSquare ? extra.price * area : extra.price
      return {
        name: extra.name,
        amount: cost,
      }
    })

    const sortedExtras = [...allExtras].sort((a, b) => a.amount - b.amount)

    const freebiesCount = Math.floor(allExtras.length / 4)
    const freeExtras = sortedExtras.slice(0, freebiesCount)

    const freeExtraNames = freeExtras.map((item) => item.name)

    allExtras.forEach((extra) => {
      const finalAmount = freeExtraNames.includes(extra.name) ? 0 : extra.amount
      extraPriceResults.push({
        name: extra.name,
        amount: finalAmount,
      })
      total += finalAmount
    })

    return {
      serviceCost,
      extraPriceResults,
      total,
    }
  }

  function openModalCalc() {
    modalOverlayCalc.classList.add('active')
    document.body.style.overflow = 'hidden'
    if (window.innerWidth <= 1023) {
      modalCalcLeftItem.classList.add('fadeInBottomSection')
      modalCalcRightItem.classList.add('fadeInBottomSection')
    } else {
      modalCalcLeftItem.classList.add('fadeInLeftSection')
      modalCalcRightItem.classList.add('fadeInRightSection')
    }
  }

  function closeModalCalc() {
    modalCalcLeftItem.classList.remove(
      'fadeInLeftSection',
      'fadeInBottomSection'
    )
    modalCalcRightItem.classList.remove(
      'fadeInRightSection',
      'fadeInBottomSection'
    )

    if (window.innerWidth <= 1023) {
      modalCalcLeftItem.classList.add('fadeOutBottomSection')
      modalCalcRightItem.classList.add('fadeOutBottomSection')

      setTimeout(() => {
        modalOverlayCalc.classList.remove('active')
        document.body.style.overflow = ''
        modalCalcLeftItem.classList.remove('fadeOutBottomSection')
        modalCalcRightItem.classList.remove('fadeOutBottomSection')
      }, 300)
    } else {
      modalCalcLeftItem.classList.add('fadeOutLeftSection')
      modalCalcRightItem.classList.add('fadeOutRightSection')

      setTimeout(() => {
        modalOverlayCalc.classList.remove('active')
        document.body.style.overflow = ''
        modalCalcLeftItem.classList.remove('fadeOutLeftSection')
        modalCalcRightItem.classList.remove('fadeOutRightSection')
      }, 300)
    }
  }

  function openModalResult() {
    const place = modalCalc.querySelector('input[name="Место"]:checked').value
    const service = modalCalc.querySelector(
      'input[name="Услуга"]:checked'
    ).value
    const area = parseInt(modalCalc.querySelector('input.areaInput').value)
    const extras = [
      ...modalCalc.querySelectorAll('input[name="Допуслуга[]"]:checked'),
    ]
      .map((el) => el.value)
      .filter((val) => val !== 'Ничего не нужно')

    const servicePrice = servicePrices[service]
    const extraServiceItems = extras.map((name) => ({
      name,
      price: extraServices[name],
    }))

    const priceResults = calculatePrice(area, servicePrice, extraServiceItems)
    serviceSummary[
      `${service} ` + `${place} площадью ${area} м²`
    ] = `${priceResults.serviceCost.toLocaleString('ru-RU')} ₽`

    resultSummaryContainer.innerHTML = `
    <span class="txt_regular">
      ${service} <br />${place} площадью ${area} м²</span>
    <span class="txt_regular servicePrice price">${priceResults.serviceCost.toLocaleString(
      'ru-RU'
    )} ₽</span>
    `
    priceResults.extraPriceResults.forEach((item) => {
      const name = document.createElement('span')
      const cost = document.createElement('span')
      cost.classList.add('price')
      name.textContent = `${item.name}`
      cost.textContent = `${item.amount.toLocaleString('ru-RU')} ₽`
      serviceSummary[`${item.name}`] = `${item.amount.toLocaleString(
        'ru-RU'
      )} ₽`
      resultSummaryContainer.appendChild(name)
      resultSummaryContainer.appendChild(cost)
    })

    resultPriceContainer.innerHTML = `
    <span class="txt_subtitle txt_bold resultPrice">Стоимость:</span>
    <span class="txt_subtitle txt_bold txt_aquamarine price">
      ${priceResults.total.toLocaleString('ru-RU')} ₽</span>`
    total = `${priceResults.total.toLocaleString('ru-RU')} ₽`
    modalOverlayResult.classList.add('active')
    modalResult.classList.add('fadeInBottomSection')
    document.body.style.overflow = 'hidden'
  }

  function closeModalResult() {
    modalResult.classList.remove('fadeInBottomSection')
    modalResult.classList.add('fadeOutBottomSection')

    setTimeout(() => {
      modalOverlayResult.classList.remove('active')
      document.body.style.overflow = ''
      modalResult.classList.remove('fadeOutBottomSection')
    }, 300)
  }

  function openModalConfirmation() {
    modalOverlayConfirmation.classList.add('active')
    document.body.style.overflow = 'hidden'
    modalConfirmation.classList.add('fadeInBottomSection')
  }

  function closeModalConfirmation() {
    modalConfirmation.classList.remove('fadeInBottomSection')
    modalConfirmation.classList.add('fadeOutBottomSection')

    setTimeout(() => {
      modalOverlayConfirmation.classList.remove('active')
      document.body.style.overflow = ''
      modalConfirmation.classList.remove('fadeOutBottomSection')
    }, 300)
  }

  function openModalOrder() {
    modalOverlayOrder.classList.add('active')
    document.body.style.overflow = 'hidden'
    modalOrder.classList.add('fadeInBottomSection')
  }

  function closeModalOrder() {
    modalOrder.classList.remove('fadeInBottomSection')
    modalOrder.classList.add('fadeOutBottomSection')

    setTimeout(() => {
      modalOverlayOrder.classList.remove('active')
      document.body.style.overflow = ''
      modalOrder.classList.remove('fadeOutBottomSection')
    }, 300)
  }

  function openModalRequisites() {
    modalOverlayRequisites.classList.add('active')
    document.body.style.overflow = 'hidden'
    modalRequisites.classList.add('fadeInBottomSection')
  }

  function closeModalRequisites() {
    modalRequisites.classList.remove('fadeInBottomSection')
    modalRequisites.classList.add('fadeOutBottomSection')

    setTimeout(() => {
      modalOverlayRequisites.classList.remove('active')
      document.body.style.overflow = ''
      modalRequisites.classList.remove('fadeOutBottomSection')
    }, 300)
  }

  function openModalPrivacy() {
    modalOverlayPrivacy.classList.add('active')
    document.body.style.overflow = 'hidden'
    modalPrivacy.classList.add('fadeInBottomSection')
  }

  function closeModalPrivacy() {
    modalPrivacy.classList.remove('fadeInBottomSection')
    modalPrivacy.classList.add('fadeOutBottomSection')

    setTimeout(() => {
      modalOverlayPrivacy.classList.remove('active')
      document.body.style.overflow = ''
      modalPrivacy.classList.remove('fadeOutBottomSection')
    }, 300)
  }

  function showStep(index) {
    steps.forEach((step, i) => {
      step.classList.toggle('active', i === index)
    })

    index === 0
      ? btnBack.classList.add('hide')
      : btnBack.classList.remove('hide')
  }

  function updateProgressBar(step) {
    const percent = ((step + 1) / steps.length) * 100
    progressBar.style.width = `${percent}%`
    progressBarTxt.innerHTML = `Вопрос ${step + 1} из ${steps.length}`
  }

  function isStepValidated(step) {
    const currentStep = steps[step]

    const input =
      currentStep.querySelector('input[type="radio"]:checked') ||
      currentStep.querySelector('input[type="checkbox"]:checked') ||
      currentStep.querySelector('input[type="number"]')

    if (input) {
      if (input.type === 'number' && input.value.trim() === '') return false
      return true
    }

    return false
  }

  function resetFormCalc() {
    formCalc.reset()
    currentStep = 0
    showStep(currentStep)
    updateProgressBar(currentStep)

    const dots = formCalc.querySelectorAll('.stepItem__dot.checked')
    const dotWrappers = formCalc.querySelectorAll(
      '.stepItem__checkWrapper.checked'
    )
    const checks = formCalc.querySelectorAll('.stepItem__check.checked')
    const bolds = formCalc.querySelectorAll('.txt_regular.checked')

    dots.forEach((el) => el.classList.remove('checked'))
    dotWrappers.forEach((el) => el.classList.remove('checked'))
    checks.forEach((el) => el.classList.remove('checked'))
    bolds.forEach((el) => el.classList.remove('checked'))
  }

  function resetFormOrder() {
    const checkedLabel = formOrder.querySelector('.socialWrapper.checked')
    if (checkedLabel) {
      checkedLabel.classList.remove('checked')
    }
    formOrder.reset()
  }

  btnForward.addEventListener('click', () => {
    if (isStepValidated(currentStep)) {
      if (currentStep < steps.length - 1) {
        currentStep++
        updateProgressBar(currentStep)
        showStep(currentStep)
      } else {
        closeModalCalc()
        setTimeout(() => openModalResult(), 300)
      }
    } else {
      const instruction = modalCalc.querySelector('.instruction')
      instruction.classList.add('alert')
      setTimeout(() => {
        instruction.classList.remove('alert')
      }, 300)
    }
  })

  btnBack.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep--
      updateProgressBar(currentStep)
      showStep(currentStep)
    }
  })

  btnsOpenModalCalc.forEach((btn) =>
    btn.addEventListener('click', () => openModalCalc())
  )

  btnsOpenModalOrder.forEach((btn) =>
    btn.addEventListener('click', () => openModalOrder())
  )

  btnsOpenModalPrivacy.forEach((btn) =>
    btn.addEventListener('click', () => openModalPrivacy())
  )

  btnOpenModalRequisites.addEventListener('click', () => openModalRequisites())

  btnConfirm.addEventListener('click', (e) => {
    const check = modalOverlayResult.querySelector('.check')
    const checkboxWrapper = modalOverlayResult.querySelector('.checkboxWrapper')
    const isPhoneValid = phoneInputResult.inputmask.isComplete()
    const isCheckVisible = !check.classList.contains('check_invisible')
    e.preventDefault()
    if (!isPhoneValid || !isCheckVisible) {
      if (!isCheckVisible) {
        checkboxWrapper.classList.add('alert')
        setTimeout(() => checkboxWrapper.classList.remove('alert'), 300)
      }
      if (!isPhoneValid) {
        phoneInputResult.classList.add('alert')
        setTimeout(() => phoneInputResult.classList.remove('alert'), 300)
      }

      return
    }

    sendToTelegram({ phone: phoneInputResult.value, serviceSummary, total })
    serviceSummary = {}
    total = ''
    phoneInputResult.value = ''
    closeModalResult()
    resetFormCalc()
    setTimeout(() => openModalConfirmation(), 300)
  })

  btnOrder.addEventListener('click', (e) => {
    const check = modalOverlayOrder.querySelector('.check')
    const checkboxWrapper = modalOverlayOrder.querySelector('.checkboxWrapper')
    const isPhoneValid = phoneInputOrder.inputmask.isComplete()
    const isCheckVisible = !check.classList.contains('check_invisible')

    e.preventDefault()

    if (!isPhoneValid || !isCheckVisible) {
      if (!isCheckVisible) {
        checkboxWrapper.classList.add('alert')
        setTimeout(() => checkboxWrapper.classList.remove('alert'), 300)
      }
      if (!isPhoneValid) {
        phoneInputOrder.classList.add('alert')
        setTimeout(() => phoneInputOrder.classList.remove('alert'), 400)
      }
      return
    }

    sendToTelegram({
      phone: phoneInputOrder.value,
      contactMethod: contactMethod,
    })
    contactMethod = undefined
    resetFormOrder()
    closeModalOrder()
    setTimeout(() => openModalConfirmation(), 300)
  })

  btnEquipment.addEventListener('click', (e) => {
    const check = formEquipment.querySelector('.check')
    const checkboxWrapper = formEquipment.querySelector('.checkboxWrapper')
    const isPhoneValid = phoneInputEquipment.inputmask.isComplete()
    const isCheckVisible = !check.classList.contains('check_invisible')

    e.preventDefault()

    if (!isPhoneValid || !isCheckVisible) {
      if (!isCheckVisible) {
        checkboxWrapper.classList.add('alert')
        setTimeout(() => checkboxWrapper.classList.remove('alert'), 300)
      }
      if (!isPhoneValid) {
        phoneInputEquipment.classList.add('alert')
        setTimeout(() => phoneInputEquipment.classList.remove('alert'), 400)
      }
      return
    }

    sendToTelegram({
      phone: phoneInputEquipment.value,
    })

    formEquipment.reset()
    openModalConfirmation()
  })

  closeBtnCalc.addEventListener('click', () => {
    closeModalCalc()
    resetFormCalc()
  })

  closeBtnResult.addEventListener('click', () => {
    closeModalResult()
    resetFormCalc()
  })

  closeBtnConfirmation.addEventListener('click', () => {
    closeModalConfirmation()
  })

  closeBtnOrder.addEventListener('click', () => {
    resetFormOrder()
    closeModalOrder()
  })

  closeBtnRequisites.addEventListener('click', () => closeModalRequisites())

  closeBtnPrivacy.addEventListener('click', () => closeModalPrivacy())
})

//---- STEP №1 INPUT LOGIC ----
const placeInputs = document.querySelectorAll('input[name="Место"]')

placeInputs.forEach((input) => {
  input.addEventListener('change', () => {
    const labels = document.querySelectorAll('#step1 .stepItem')

    labels.forEach((label) => {
      const dot = label.querySelector('.stepItem__checkWrapper')
      const check = label.querySelector('.stepItem__check')
      const input = label.querySelector('input[type="radio"]')
      const txt = label.querySelector('.txt_bold')

      if (input.checked) {
        dot.classList.add('checked')
        check.classList.add('checked')
        txt.classList.add('checked')
      } else {
        dot.classList.remove('checked')
        check.classList.remove('checked')
        txt.classList.remove('checked')
      }
    })
  })
})

//---- STEP №2 INPUT LOGIC ----
const serviceInputs = document.querySelectorAll('input[name="Услуга"]')

serviceInputs.forEach((input) => {
  input.addEventListener('change', () => {
    const labels = document.querySelectorAll('#step2 .stepItem')

    labels.forEach((label) => {
      const dot = label.querySelector('.stepItem__dot')
      const check = label.querySelector('.stepItem__check')
      const input = label.querySelector('input[type="radio"]')
      const txt = label.querySelector('.txt_regular')

      if (input.checked) {
        dot.classList.add('checked')
        check.classList.add('checked')
        txt.classList.add('checked')
      } else {
        dot.classList.remove('checked')
        check.classList.remove('checked')
        txt.classList.remove('checked')
      }
    })
  })
})

//---- STEP №3 INPUT LOGIC ----

const areaInput = document.querySelector('.areaInput')

areaInput.addEventListener('input', () => {
  const label = areaInput.closest('.stepItem')
  const dot = label.querySelector('.stepItem__dot')
  const check = label.querySelector('.stepItem__check')

  areaInput.value = areaInput.value.replace(/[^0-9]/g, '')
  areaInput.value = areaInput.value.replace(/^0+/, '')
  if (areaInput.value.length > 4) {
    areaInput.value = areaInput.value.slice(0, 4)
  }
  dot.classList.toggle('checked', areaInput.value.trim() !== '')
  check.classList.toggle('checked', areaInput.value.trim() !== '')
})

areaInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    document.querySelector('.button_forward').click()
  }
})

//---- STEP №4 INPUT LOGIC ----

const extraServiceInputs = document.querySelectorAll(
  'input[name="Допуслуга[]"]'
)
const noExtraServiceInput = document.querySelector(
  'input[value="Ничего не нужно"]'
)

function updateCheckedInputStyles() {
  const labels = document.querySelectorAll('#step4 .stepItem')

  labels.forEach((label) => {
    const dot = label.querySelector('.stepItem__dot')
    const check = label.querySelector('.stepItem__check')
    const input = label.querySelector('input[name="Допуслуга[]"]')
    const txt = label.querySelector('.txt_regular')

    if (input.checked) {
      dot.classList.add('checked')
      check.classList.add('checked')
      txt.classList.add('checked')
    } else {
      dot.classList.remove('checked')
      check.classList.remove('checked')
      txt.classList.remove('checked')
    }
  })
}

noExtraServiceInput.addEventListener('change', () => {
  if (noExtraServiceInput.checked) {
    extraServiceInputs.forEach((input) => {
      if (input !== noExtraServiceInput) {
        input.checked = false
      }
    })
    updateCheckedInputStyles()
  }
})

extraServiceInputs.forEach((input) => {
  if (input !== noExtraServiceInput) {
    input.addEventListener('change', () => {
      if (input.checked && noExtraServiceInput.checked) {
        noExtraServiceInput.checked = false
      }
      updateCheckedInputStyles()
    })
  }
})

updateCheckedInputStyles()

//-------- ORDER MODAL INPUT LOGIC ------

const callByInputs = document.querySelectorAll('input[name="Способ связи"]')
let contactMethod = undefined

callByInputs.forEach((input) => {
  input.addEventListener('change', () => {
    const labels = document.querySelectorAll(
      '.order__socialsWrapper .socialWrapper'
    )

    labels.forEach((label) => {
      const input = label.querySelector('input[type="radio"]')
      if (input.checked) {
        contactMethod = input.value
        label.classList.add('checked')
      } else label.classList.remove('checked')
    })
  })
})

phoneInputOrder.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    document.querySelector('.order__button').click()
  }
})

//------- EQUIPMENT INPUT LOGIC ------
phoneInputEquipment.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    document.querySelector('.equipment__button').click()
  }
})


//------- Telegram --------
function sendToTelegram({ phone, contactMethod, serviceSummary, total }) {
  fetch('/api/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, contactMethod, serviceSummary, total }),
  })
    .then((res) => {
      if (!res.ok) {
        console.error('Ошибка при отправке на сервер')
      }
    })
    .catch((err) => {
      console.error('Ошибка сети:', err)
    })
}
