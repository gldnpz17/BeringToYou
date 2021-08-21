/*!
* Start Bootstrap - Creative v7.0.4 (https://startbootstrap.com/theme/creative)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
*/
//
// Scripts
// 

document.getElementById('contact-form').addEventListener('submit', event => {
    event.preventDefault();

    let queryParams = new URLSearchParams();
    let data = new FormData(event.target);
      
    queryParams.append('subject', 'Masukan');
    queryParams.append('body', data.get('message'));

    let components = [{ 
            order: 0, 
            text: 'ma' 
        }, {
            order: 4, 
            text: 'you'
        }, {
            order: 3, 
            text: 'to'
        }, {
            order: 2, 
            text: ':bering'
        }, {
            order: 1, 
            text: 'ilto' 
        }, {
            order: 6, 
            text: 'ma'
        }, {
            order: 8, 
            text: '.c' 
        }, {
            order: 7, 
            text: 'il' 
        }, {
            order: 9, 
            text: 'om'
        }, {
            order: 5, 
            text: '@g'
        }
    ];

    let result = '';
    components.sort((a, b) => a.order - b.order).forEach(component => result += component.text);

    window.location.href = result + '?' + queryParams.toString();

    event.target.reset();
})

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Activate SimpleLightbox plugin for portfolio items
    new SimpleLightbox({
        elements: '#portfolio a.portfolio-box'
    });

});
