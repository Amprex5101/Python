document.addEventListener('DOMContentLoaded', function() {
    const steps = document.querySelectorAll('.step');

    steps.forEach((step, index) => {
        step.addEventListener('click', () => {
            steps.forEach(s => s.classList.remove('active'));
            step.classList.add('active');
        });
    });
});
