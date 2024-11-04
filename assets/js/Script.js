
function GetNavbar(typeOfNavbar) {
    fetch('/components/navbar.html')
        .then(response => response.text())
        .then(html => {
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, "text/html");
            document.querySelector('header').appendChild(doc.getElementById(`${typeOfNavbar}`));
        });
};
function GetFooter() {
    fetch('/components/footer.html')
        .then(response => response.text())
        .then(html => {
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, "text/html");
            document.querySelector('footer').innerHTML = doc.body.innerHTML;
        });
};
GetFooter();
function TriggerController() {
    window.addEventListener('click', (e) => {
        if (e.target.closest('[data-trigger]:not(.active)')) {
            const target = e.target.closest('[data-trigger]:not(.active)');
            const triggered = document.querySelectorAll(`[data-triggered-id=${target.closest('[data-trigger-id]').dataset.triggerId}] [data-triggered]`);
            target.parentElement.querySelector('.active').classList.remove('active');
            target.classList.add('active');
            triggered.forEach(activeElm => {
                activeElm.classList.remove('active');
            });
            if (target.getAttribute('data-trigger') == '') {
                triggered.forEach(elm => {
                    elm.classList.add('active');
                })
            }
            else {
                triggered.forEach(elm => {
                    elm.dataset.triggered == target.dataset.trigger && elm.classList.add('active');
                })
            };
        };
    });
};
TriggerController();
function ModalTriggerController() {
    window.addEventListener('click', (e) => {
        if (e.target.closest('[data-modal-trigger]')) {
            let triggerButton = e.target.closest('[data-modal-trigger]');
            let modal = document.querySelector(`#${triggerButton.dataset.modalTrigger}`);
            modal.classList.toggle('active');
        }
    });
};
ModalTriggerController();
function HamburgerMenuController() {
    //settimeout silinecek
    setTimeout(() => {
        const hamburgerMenu = document.querySelector('.hamburger-menu');
        const hamburgerMenuList = document.querySelector('nav .nav-links .sub-links');
        console.log(hamburgerMenu);
        hamburgerMenu.addEventListener('click', function (e) {
            hamburgerMenu.classList.toggle('active');
            hamburgerMenuList.classList.toggle('active');
        });
    }, 1000);
}
HamburgerMenuController();
function ChangeFormContainer() {
    window.addEventListener('click', (e) => {
        if (e.target.closest('.btn-change-next-form')) {
            const btnChangeForm = e.target.closest('.btn-change-next-form');
            const activeForm = btnChangeForm.closest('form');
            const otherForm = activeForm.nextElementSibling;
            activeForm.classList.remove('active');
            otherForm.classList.add('active');
        } else if (e.target.closest('.btn-change-prev-form')) {
            const btnChangeForm = e.target.closest('.btn-change-prev-form');
            const activeForm = btnChangeForm.closest('form');
            const otherForm = activeForm.previousElementSibling;
            activeForm.classList.remove('active');
            otherForm.classList.add('active');
        }
    });
};
ChangeFormContainer();
function InputPlaceHolderController() {
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('blur', (e) => {
            try {
                let target = e.target.matches("input");
                if (target && e.target.closest('.inner-input').querySelector('label.i-placeholder')) {
                    e.target.value == ''
                        ? e.target.closest('.outer-input').classList.remove('not-empty')
                        : e.target.closest('.outer-input').classList.add('not-empty')
                }
            } catch (e) {

            }
        }, true);
    })
    window.addEventListener('focus', (e) => {
        try {
            e.target.closest('.outer-input').classList.add('not-empty')
        } catch (e) {

        }
    }, true);
};
setTimeout(() => {
    InputPlaceHolderController();
}, 1000);