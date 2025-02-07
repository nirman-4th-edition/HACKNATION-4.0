document.addEventListener("DOMContentLoaded", function () {
    const faqs = document.querySelectorAll(".faq");

    faqs.forEach(faq => {
        faq.querySelector(".faq-question").addEventListener("click", () => {
            faq.classList.toggle("active");
        });
    });
});
