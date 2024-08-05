document.addEventListener('DOMContentLoaded', function () {
    const selectedPlan = localStorage.getItem('selectedPlan');
    if (!selectedPlan) {
        alert('No se ha seleccionado ningún plan. Volviendo a la página principal.');
        window.location.href = '/';
        return;
    }

    const maxOptions = parseInt(selectedPlan);
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const nextBtn = document.getElementById('nextBtn');
    const inputs = document.querySelectorAll('#configForm .a, #configForm .des textarea');

    function updateCheckboxes() {
        let checkedCount = 0;
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                checkedCount++;
            }
            if (checkedCount >= maxOptions) {
                // Disable unchecked checkboxes
                checkboxes.forEach(cb => {
                    if (!cb.checked) {
                        cb.disabled = true;
                    }
                });
            } else {
                // Enable all checkboxes
                checkboxes.forEach(cb => {
                    cb.disabled = false;
                });
            }
        });
    }

    function checkFormValidity() { //Revisa si el formato es valido c:
        let allFilled = true; //Si todo está lleno avanza
        inputs.forEach(input => {
            if (!input.value.trim()) {
                allFilled = false;
            }
        });

        let oneCheckboxChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
        nextBtn.disabled = !(allFilled && oneCheckboxChecked);
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateCheckboxes();
            checkFormValidity();
        });
    });

    inputs.forEach(input => {
        input.addEventListener('input', checkFormValidity);
    });

    updateCheckboxes();
    checkFormValidity();
});

function goNext() {
    const form = document.getElementById('configForm');
    if (form.checkValidity()) {
        window.location.href = '/pagar';
    } else {
        alert('Por favor, complete todos los campos requeridos.');
    }
}

function goBack() {
    window.history.back();
}