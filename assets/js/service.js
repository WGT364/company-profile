const accordionButtons = document.querySelectorAll('.accordion button');

accordionButtons.forEach(button => {
    button.addEventListener('click', () => {
        const expanded = button.getAttribute('aria-expanded') === 'true';
        accordionButtons.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
        if (!expanded) {
            button.setAttribute('aria-expanded', 'true');
        }
        const content = button.nextElementSibling;
        document.querySelectorAll('.accordion-content').forEach(c => {
            if (c !== content) {
                c.style.maxHeight = null;
            }
        });
        content.style.maxHeight = expanded ? null : content.scrollHeight + 'px';
    });
});