var nav_active_class = "nav-active";
var menus         = document.getElementsByClassName("menu");
var section       = document.getElementsByTagName("section");

function launchLocomotive() {
    var all_section_limit = {};
    var window_height     = window.innerHeight;

    for (var i = 1; i <= section.length; i++) {
        var section_id = section[i- 1].id;
        all_section_limit[section_id] = window_height * i;
    }

    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        smartphone: {
            smooth: true,
        },
        tablet: {
            smooth:true,
        }
    });

    scroll.on('scroll', (args) => {
        const els      = args.currentElements;
        const scroll_y = args.scroll['y'];

        for (let el in els) {
            var id        = els[el]['section']['el'].id;
            var menu_id   = id.split("-")[0] + "-menu";
            var menu_item = document.getElementById(menu_id);

            
            var menu_actived = checkActiveClass();

            var section_height = all_section_limit[id];
            var bottom_section = (section_height - window_height) - (window_height / 2);
            var top_section    = section_height - (window_height / 2);


            if (bottom_section < scroll_y   && scroll_y < top_section) {
                menu_actived.classList.remove(nav_active_class);
                menu_item.classList.add(nav_active_class);
            }
        }
    });
}



function checkActiveClass() {
    var menu_actived     = "";
    
    for(var menu of menus) {
        var menu_has_active = menu.classList.contains(nav_active_class);

        if (menu_has_active) {
            menu_actived = menu;
        }
    }

    return menu_actived;
}



launchLocomotive();
