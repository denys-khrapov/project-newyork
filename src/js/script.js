document.addEventListener("DOMContentLoaded", function () {
	initSwiper()
	menu()
	cancelActionBadgeLink()

	function cancelActionBadgeLink() {
		const badgeLinkDisabled = document.querySelectorAll(
			".badge__link--disabled"
		)
		badgeLinkDisabled.forEach(link => {
			link.addEventListener("click", function (e) {
				e.preventDefault()
			})
		})
	}

	function initSwiper() {
		let popularObjSlider = new Swiper(".popular-obj-slider", {
			slidesPerView: "auto",
			spaceBetween: 48,
			loop: true,
			speed: 500,
			pagination: {
				el: ".popular-obj__nav .swiper-pagination",
				type: "fraction",
				formatFractionCurrent: function (number) {
					return ("0" + number).slice(-2)
				},
				formatFractionTotal: function (number) {
					return ("0" + number).slice(-2)
				},
				renderFraction: function (currentClass, totalClass) {
					return (
						'<span class="' +
						currentClass +
						'"></span>' +
						"/" +
						'<span class="' +
						totalClass +
						'"></span>'
					)
				},
			},
			navigation: {
				nextEl: ".popular-obj__nav .swiper-button-next",
				prevEl: ".popular-obj__nav .swiper-button-prev",
			},
		})
		let feedbackSlider = new Swiper(".feedback__slider", {
			slidesPerView: "auto",
			spaceBetween: 48,
			loop: true,
			speed: 500,
			pagination: {
				el: ".feedback__navigation .swiper-pagination",
				type: "fraction",
				formatFractionCurrent: function (number) {
					return ("0" + number).slice(-2)
				},
				formatFractionTotal: function (number) {
					return ("0" + number).slice(-2)
				},
				renderFraction: function (currentClass, totalClass) {
					return (
						'<span class="' +
						currentClass +
						'"></span>' +
						"/" +
						'<span class="' +
						totalClass +
						'"></span>'
					)
				},
			},
			navigation: {
				nextEl: ".feedback__navigation .swiper-button-next",
				prevEl: ".feedback__navigation .swiper-button-prev",
			},
		})
		let blogSlider = new Swiper(".blog__main", {
			slidesPerView: "auto",
			spaceBetween: 48,
			loop: true,
			speed: 500,
			pagination: {
				el: ".blog__navigation .swiper-pagination",
				type: "fraction",
				formatFractionCurrent: function (number) {
					return ("0" + number).slice(-2)
				},
				formatFractionTotal: function (number) {
					return ("0" + number).slice(-2)
				},
				renderFraction: function (currentClass, totalClass) {
					return (
						'<span class="' +
						currentClass +
						'"></span>' +
						"/" +
						'<span class="' +
						totalClass +
						'"></span>'
					)
				},
			},
			navigation: {
				nextEl: ".blog__navigation .swiper-button-next",
				prevEl: ".blog__navigation .swiper-button-prev",
			},
		})
	}

	function menu() {
		const buttonOpen = document.querySelectorAll(".header__burger")
		const menu = document.querySelector(".menu-header")
		const html = document.querySelector("html")
		const buttonClose = document.querySelector(".menu-header__close")

		buttonOpen.forEach(button => {
			button.addEventListener("click", e => {
				e.preventDefault()
				menu.classList.toggle("active")
				if (window.innerWidth <= 676) {
					html.classList.toggle("lock")
				}
			})
		})
		buttonClose.addEventListener("click", e => {
			e.preventDefault()
			menu.classList.toggle("active")
			if (html.classList.contains("lock")) {
				html.classList.remove("lock")
			}
		})
	}

	const appHeight = () => {
		const doc = document.documentElement
		doc.style.setProperty("--app-height", `${window.innerHeight}px`)
	}
	appHeight()

	function adjustArticleTextHeight() {
		document.querySelectorAll(".archive-article__item").forEach(item => {
			if (window.matchMedia("(max-width: 1279px)").matches) {
				const title = item.querySelector(".archive-article__title")
				const textHolder = item.querySelector(".archive-article__text-holder")
				const titleHeight = title.scrollHeight
				const textHolderMaxHeight = 205
				const maxTextHeight = textHolderMaxHeight - titleHeight
				textHolder.style.maxHeight = `${
					maxTextHeight > 0 ? maxTextHeight : 0
				}px`
			} else {
				const title = item.querySelector(".archive-article__title")
				const textHolder = item.querySelector(".archive-article__text-holder")
				const titleHeight = title.scrollHeight
				const textHolderMaxHeight = 281
				const maxTextHeight = textHolderMaxHeight - titleHeight
				textHolder.style.maxHeight = `${
					maxTextHeight > 0 ? maxTextHeight : 0
				}px`
			}
		})
	}

	window.addEventListener("load", adjustArticleTextHeight)
	window.addEventListener("resize", () => {
		appHeight()
		adjustArticleTextHeight()
	})
})

jQuery(document).ready(function ($) {
	function setupFAQ() {
		var faqBox = $(".faq__box")
		var showMoreBtn = $("#showMoreBtn")
		var isExpanded = false

		showMoreBtn.click(function () {
			faqBox.slideToggle(300)
			isExpanded = !isExpanded

			var buttonText = isExpanded ? "СВЕРНУТЬ" : "РАЗВЕРНУТЬ"
			$(this)
				.toggleClass("active", isExpanded)
				.find(".btn-text")
				.text(buttonText)
		})

		$(document).on("click", ".faq__header", function () {
			var faqHeader = $(this)
			var faqItem = faqHeader.closest(".faq__item")
			faqHeader.toggleClass("active")
			$(".faq__header").not(faqHeader).removeClass("active")
			$(".faq__item")
				.not(faqItem)
				.removeClass("active")
				.find(".faq__content")
				.slideUp(300)
			faqItem.toggleClass("active").find(".faq__content").slideToggle(300)
		})
	}

	function seo() {
		$("#seo__btn").click(function () {
			$(".seo__main").slideToggle(300)
			$(this).toggleClass("active")
			var buttonText = $(this).hasClass("active") ? "СВЕРНУТЬ" : "РАЗВЕРНУТЬ"
			$(this).find(".btn-text").text(buttonText)
		})
	}

	function feedback() {
		$(".feedback__btn").click(function () {
			var targetBlock = $(this).data("target")
			var $textElement = $(
				'.feedback__text-holder[data-block="' + targetBlock + '"]'
			)

			$textElement.toggleClass("expanded")

			var isExpanded = $textElement.hasClass("expanded")
			var buttonText = isExpanded ? "СВЕРНУТЬ" : "РАЗВЕРНУТЬ"

			$(this).find(".btn-text").text(buttonText)

			// Add or remove 'active' class on the button
			$(this).toggleClass("active", isExpanded)

			if (isExpanded) {
				$textElement.css("-webkit-line-clamp", "unset")
			} else {
				$textElement.css("-webkit-line-clamp", "6")
			}
		})
	}

	setupFAQ()
	seo()
	feedback()
})
