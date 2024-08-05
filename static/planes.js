// Función para manejar el cambio del toggle
document.addEventListener('DOMContentLoaded', function () {
    const priceToggle = document.getElementById('priceToggle');
    const monthlyLabel = document.getElementById('monthlyLabel');
    const annualLabel = document.getElementById('annualLabel');
    const toggleLabels = document.querySelectorAll('.toggle-label');
    const basicPriceElement = document.getElementById('basicPrice');
    const standardPriceElement = document.getElementById('standardPrice');
    const premiumPriceElement = document.getElementById('premiumPrice');
    const basicSavingsElement = document.getElementById('basicSavings');
    const standardSavingsElement = document.getElementById('standardSavings');
    const premiumSavingsElement = document.getElementById('premiumSavings');

    // Función para actualizar los precios y estilos según el estado del toggle
    function updatePrices() {
        if (priceToggle.checked) {
            // Calcula precios anuales con descuento del 15%
            const basicMonthlyPrice = 900;
            const standardMonthlyPrice = 1980;
            const premiumMonthlyPrice = 4580;
            const discountRate = 0.15;

            const basicAnnualPrice = Math.round(basicMonthlyPrice * 12 * (1 - discountRate));
            const standardAnnualPrice = Math.round(standardMonthlyPrice * 12 * (1 - discountRate));
            const premiumAnnualPrice = Math.round(premiumMonthlyPrice * 12 * (1 - discountRate));

            // Actualiza los textos con los precios anuales
            basicPriceElement.textContent = `$${basicAnnualPrice}/año`;
            standardPriceElement.textContent = `$${standardAnnualPrice}/año`;
            premiumPriceElement.textContent = `$${premiumAnnualPrice}/año`;

            // Calcula y muestra el mensaje de ahorro
            const basicSavings = Math.round(basicMonthlyPrice * 12 - basicAnnualPrice);
            const standardSavings = Math.round(standardMonthlyPrice * 12 - standardAnnualPrice);
            const premiumSavings = Math.round(premiumMonthlyPrice * 12 - premiumAnnualPrice);

            basicSavingsElement.textContent = `Ahorras: $${basicSavings}`;
            standardSavingsElement.textContent = `Ahorras: $${standardSavings}`;
            premiumSavingsElement.textContent = `Ahorras: $${premiumSavings}`;

            // Actualiza los estilos de los labels del toggle
            monthlyLabel.classList.remove('active');
            annualLabel.classList.add('active');
        } else {
            // Actualiza los textos con los precios mensuales
            basicPriceElement.textContent = `$900/mes`;
            standardPriceElement.textContent = `$1980/mes`;
            premiumPriceElement.textContent = `$4580/mes`;

            // Limpia el mensaje de ahorro
            basicSavingsElement.textContent = '';
            standardSavingsElement.textContent = '';
            premiumSavingsElement.textContent = '';

            // Actualiza los estilos de los labels del toggle
            monthlyLabel.classList.add('active');
            annualLabel.classList.remove('active');
        }
    }

    // Escucha el cambio en el toggle
    priceToggle.addEventListener('change', updatePrices);

    // Ejecuta la función inicialmente para mostrar los precios mensuales por defecto
    updatePrices();
});

document.addEventListener('DOMContentLoaded', (event) => {
    const links = document.querySelectorAll('nav a');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = e.currentTarget.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            window.scrollTo({
                top: targetElement.offsetTop - 50, // Ajusta el offset si tienes un nav fijo
                behavior: 'smooth'
            });
        });
    });
});

function selectPlan(planNumber) {
    localStorage.setItem('selectedPlan', planNumber);
    window.location.href = "/planes";
}