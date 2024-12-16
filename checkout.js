// This is your test secret API key.
const stripe = Stripe("pk_test_51QEzOZKQ7pECBtXL9i3vm4eSj15GHLoIDdTl4GAr94PhJzL929P7yOVc4cvwiguPEKh2uieT0j0oODFgTZ8s4IWp00qWzmniTy");

initialize();

// Initialize the Stripe Checkout session
async function initialize() {
  const fetchClientSecret = async () => {
    // Collect user selections
    const willType = document.querySelector('input[name="willType"]:checked')?.value;
    const deliveryMethod = document.querySelector('input[name="deliveryMethod"]:checked')?.value;

    if (!willType || !deliveryMethod) {
      alert("Please select both will type and delivery method.");
      throw new Error("Missing will type or delivery method.");
    }

    // Send the selections to the backend
    const response = await fetch("http://127.0.0.1:4242/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ willType, deliveryMethod }),
    });

    if (!response.ok) {
      const error = await response.json();
      alert(`Error: ${error.error || "Failed to create checkout session."}`);
      throw new Error(`Checkout session error: ${error.error || "Unknown error"}`);
    }

    const { clientSecret } = await response.json();
    return clientSecret;
  };

  // Initialize the embedded checkout with Stripe
  const checkout = await stripe.initEmbeddedCheckout({
    fetchClientSecret,
  });

  // Mount the checkout to the DOM
  checkout.mount('#checkout');
}
