import { ObjectDirective } from 'vue';

export const clickOutside: ObjectDirective = {
    beforeMount(el, binding) {
        el.clickOutsideEvent = function(event: MouseEvent) {
            if (!(el === event.target || el.contains(event.target as Node))) {
                binding.value(event); // вызываем метод
            }
        };
        document.addEventListener('click', el.clickOutsideEvent, true);
    },
    unmounted(el) {
        document.removeEventListener('click', el.clickOutsideEvent, true);
    },

};


