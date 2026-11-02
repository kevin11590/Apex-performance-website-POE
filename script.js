/* ==========================================================================
   APEX PERFORMANCE AUTO GROUP - DYNAMIC CONTENT & FORM VALIDATION
   ========================================================================== */

// --- 1. DYNAMIC CATALOGUE DATA ARRAY ---
const partsCatalogue = [
    { id: 1, name: "Full Synthetic 5W-40 Motor Oil", category: "fluids", price: 850, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80" },
    { id: 2, name: "High-Flow Cold Air Intake Filter", category: "hardware", price: 2400, image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80" },
    { id: 3, name: "Cat-Back Stainless Steel Exhaust", category: "exhaust", price: 12500, image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=600&q=80" },
    { id: 4, name: "DOT 4 High-Temp Brake Fluid", category: "fluids", price: 350, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80" },
    { id: 5, name: "Performance ECU Flash Diagnostics Tool", category: "hardware", price: 4500, image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=600&q=80" }
];

// --- 2. DYNAMIC LOADING & SEARCH FILTERING (shop.html) ---
function loadProducts(productsToRender) {
    const productGrid = document.getElementById("product-grid");
    if (!productGrid) return;

    productGrid.innerHTML = "";

    if (productsToRender.length === 0) {
        productGrid.innerHTML = "<p>No matching performance components found.</p>";
        return;
    }

    productsToRender.forEach(item => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
            <img class="product-img" src="${item.image}" alt="${item.name}" loading="lazy">
            <h3>${item.name}</h3>
            <p>Category: ${item.category.toUpperCase()}</p>
            <p><strong>Price: R ${item.price.toLocaleString()}</strong></p>
            <button class="cta-button" onclick="addToCart('${item.name}')">Add to Cart</button>
        `;
        productGrid.appendChild(productCard);
    });
}

function filterProducts() {
    const searchInput = document.getElementById("search-input");
    if (!searchInput) return;

    const query = searchInput.value.toLowerCase().trim();
    const filtered = partsCatalogue.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.category.toLowerCase().includes(query)
    );
    loadProducts(filtered);
}

function addToCart(productName) {
    alert(`${productName} has been added to your cart.`);
}

// Initialize Product Store
document.addEventListener("DOMContentLoaded", () => {
    loadProducts(partsCatalogue);

    // Setup Search Event Listener
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
        searchInput.addEventListener("input", filterProducts);
    }

    // --- 3. ENQUIRY FORM VALIDATION & DYNAMIC COST ESTIMATION (enquiry.html) ---
    const enquiryForm = document.getElementById("enquiry-form");
    if (enquiryForm) {
        enquiryForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const serviceType = document.getElementById("enquiry-service").value;
            const fullDetails = document.getElementById("enquiry-details").value.trim();
            const outputBox = document.getElementById("enquiry-response");

            if (fullDetails === "") {
                outputBox.style.display = "block";
                outputBox.style.color = "#ff2a2a";
                outputBox.innerHTML = "<p><strong>Error:</strong> Please provide details regarding your query.</p>";
                return;
            }

            let estimatedCost = "R 1,500 - R 3,500";
            let timeline = "1 - 2 Business Days";

            if (serviceType === "Custom ECU Tune") {
                estimatedCost = "R 4,500 - R 8,500";
                timeline = "Same Day Dyno Session";
            } else if (serviceType === "Aftermarket Parts Order") {
                estimatedCost = "Dependent on Component Availability";
                timeline = "2 - 4 Delivery Days";
            }

            outputBox.style.display = "block";
            outputBox.style.color = "#f0f2f5";
            outputBox.innerHTML = `
                <div class="service-item" style="border-color: #ff2a2a;">
                    <h3 style="color: #ff2a2a;">Enquiry Estimate Generated</h3>
                    <p><strong>Service Type:</strong> ${serviceType}</p>
                    <p><strong>Estimated Investment Range:</strong> ${estimatedCost}</p>
                    <p><strong>Estimated Service/Delivery Time:</strong> ${timeline}</p>
                    <p>An Apex representative will contact you shortly to confirm slot availability.</p>
                </div>
            `;
            enquiryForm.reset();
        });
    }

    // --- 4. CONTACT FORM VALIDATION & MAILTO PRODUCER (contact.html) ---
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();
            const formFeedback = document.getElementById("contact-feedback");

            if (name === "" || email === "" || message === "") {
                formFeedback.style.display = "block";
                formFeedback.style.color = "#ff2a2a";
                formFeedback.textContent = "Please complete all required fields.";
                return;
            }

            const recipient = "info@apexperformance.co.za";
            const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject || 'General Enquiry')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

            formFeedback.style.display = "block";
            formFeedback.style.color = "#2aff75";
            formFeedback.textContent = "Validation successful! Opening your default email client...";

            setTimeout(() => {
                window.location.href = mailtoUrl;
            }, 1000);
        });
    }
});