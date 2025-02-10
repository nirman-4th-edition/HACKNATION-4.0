import "./Pricing.css";

const Pricing = () => {
  const plans = [
    { name: "Basic", price: "$9/mo", features: ["Llama 3 model", "20 free trials", "Advertisements"], highlight: false },
    { name: "Pro", price: "$19/mo", features: ["Llama 3.3 model", "100 free trials", "No Advertisementst"], highlight: true },
    { name: "Advanced", price: "$49/mo", features: ["OpenAI o4 model", "Unlimited Access", "No Advertisements"], highlight: false },
  ];

  return (
    <div className="pricing-container">
      {plans.map((plan, index) => (
        <div key={index} className={`pricing-card ${plan.highlight ? "highlight" : ""}`}>
          <h3>{plan.name}</h3>
          <p className="price">{plan.price}</p>
          <ul>
            {plan.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
          <button className="btn">Choose Plan</button>
        </div>
      ))}
    </div>
  );
};

export default Pricing;