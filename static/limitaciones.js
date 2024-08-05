function formatCardNumber(event) {
    const input = event.target;
    let value = input.value.replace(/\D/g, ''); // Eliminar todos los caracteres no numéricos
    value = value.substring(0, 16); // Limitar a 16 caracteres
    const formattedValue = value.match(/.{1,4}/g)?.join('-') || value; // Agrupar en bloques de 4
    input.value = formattedValue;
    checkFormValidity(); // Verificar validez del formulario al formatear
}

function restrictNumberInput(event) {
    const input = event.target;
    input.value = input.value.replace(/\D/g, ''); // Eliminar todos los caracteres no numéricos
    checkFormValidity(); // Verificar validez del formulario al restringir números
}

function checkFormValidity() {
    const cardNumber = document.getElementById('NumT').value.replace(/-/g, ''); // Quitar guiones para verificar longitud
    const expDate = document.getElementById('ExpT').value;
    const cvv = document.getElementById('CvT').value;

    const allFilled = cardNumber.length === 16 && expDate && cvv.length === 3;
    const button = document.getElementById('payBtn');
    button.disabled = !allFilled;
}

document.addEventListener('DOMContentLoaded', () => {
    // Asignar eventos a los inputs
    document.getElementById('NumT').addEventListener('input', formatCardNumber);
    document.getElementById('ExpT').addEventListener('input', checkFormValidity);
    document.getElementById('CvT').addEventListener('input', restrictNumberInput);

    // Verificar validez inicial del formulario
    checkFormValidity();
});