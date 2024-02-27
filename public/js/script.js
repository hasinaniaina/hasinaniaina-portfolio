var nav_active_class = "nav-active";
var menus = document.getElementsByClassName("menu");
var section = document.getElementsByTagName("section");

function launchLocomotive() {
    let locoScroll = new LocomotiveScroll({
        el: document.querySelector('#scroll-container'),
        smooth: true,
        tablet: {
            breakpoint: 0,
            smooth: true,
        },
    });



    gsap.registerPlugin(ScrollTrigger);

    locoScroll.on('scroll', (args) => {
        const els = args.currentElements;
        const scroll_y = args.scroll['y'];

        if (els) {
            for (let el in els) {
                var id = els[el]['section']['el'].id;
                handleSectionMenuActive(id, scroll_y);
            }
        }

        ScrollTrigger.update();
    });


    ScrollTrigger.scrollerProxy("#scroll-container", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        scrollLeft(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.x;
        }
    });


    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.defaults({ scroller: "#scroll-container" });

    const triggerContainer = document.querySelector('#project-item-container');
    const projectsSection = gsap.utils.toArray('.project-item');


    gsap.to(projectsSection, {
        xPercent: -100 * (projectsSection.length - 1),
        scrollTrigger: {
            trigger: triggerContainer,
            start: "top top",
            pin: true,
            scrub: true,
            end: () => "+=" + triggerContainer.offsetWidth,
            onUpdate: (self) => {
                let gsap_srcoll_container = self.vars.trigger.id;
                let id = document.getElementById(gsap_srcoll_container).parentElement.parentElement.id;
                handleSectionMenuActive(id, self.start)
            }
        }
    });

    ScrollTrigger.refresh();
}


function handleSectionMenuActive(id, scroll_y) {
    var all_section_limit = {};
    var window_height = window.innerHeight;

    var project_section_width = document.querySelector('#project-item-container').offsetWidth;

    for (var i = 1; i <= section.length; i++) {
        var section_id = section[i - 1].id;
        all_section_limit[section_id] = window_height * i;
    }



    var menu_id = id.split("-")[0] + "-menu";
    var menu_item = document.getElementById(menu_id);

    var menu_actived = checkActiveClass();

    var section_height = all_section_limit[id];
    var bottom_section = (id.indexOf("contact") == 0) ? ((section_height - window_height) - (window_height / 2) + project_section_width) : (section_height - window_height) - (window_height / 2);
    var top_section = (id.indexOf("contact") == 0) ? (section_height - (window_height / 2) + project_section_width) : section_height - (window_height / 2);



    if (scroll_y > bottom_section && scroll_y < top_section) {
        menu_actived.classList.remove(nav_active_class);
        menu_item.classList.add(nav_active_class);
    }
}


function checkActiveClass() {
    var menu_actived = "";

    for (var menu of menus) {
        var menu_has_active = menu.classList.contains(nav_active_class);

        if (menu_has_active) {
            menu_actived = menu;
        }
    }

    return menu_actived;
}

function animateHeroSection() {
    var developpeurFullstackSection = document.querySelector('.head-content-container');
    var ImageRightSection = document.querySelector('.svg-content');
    var menuSection = document.querySelector('#portfolio-menu');
    var menuHolder = document.querySelector('#menu-holder');

    const timelime = new TimelineMax();

    timelime.fromTo(menuSection, 2, { height: "100vh", y: "0%" }, { height: "25vh", y: "70vh" })
        .fromTo(menuHolder, 1, { y: "200%", opacity: 0 }, { y: "0%", opacity: 1 })
}



launchLocomotive();
animateHeroSection();