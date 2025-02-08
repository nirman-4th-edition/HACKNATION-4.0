import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star, ShoppingBag, Gift, Sparkles, Gem } from "lucide-react";

const Shop = () => {
  const subscriptionPlans = [
    {
      title: "Weekly Plan",
      price: "₹49.00",
      period: "per week",
      features: [
        "Basic financial content access",
        "Weekly newsletter",
        "Community forum access",
      ],
      gradient: "from-primary to-accent",
    },
    {
      title: "Monthly Plan",
      price: "₹149.00",
      period: "per month",
      features: [
        "All Weekly Plan features",
        "One-on-one coaching session",
        "Exclusive webinars",
        "Ad-free experience",
      ],
      popular: true,
      gradient: "from-[#D946EF] to-[#F97316]",
    },
    {
      title: "Yearly Plan",
      price: "₹1,499.00",
      period: "per year",
      features: [
        "All Monthly Plan features",
        "Priority support",
        "Custom financial planning",
        "Exclusive workshops",
        "2 months free",
      ],
      gradient: "from-[#0EA5E9] to-[#00FFFF]",
    },
  ];
  const affiliateProducts = [
    {
      title: "Financial Planning Masterclass",
      description: "Complete guide to personal finance management",
      price: "₹999.00",
      link: "#",
    },
    {
      title: "Investment Tracking Tool",
      description: "Premium tool for portfolio management",
      price: "₹499.00",
      link: "#",
    },
  ];
  const shopItems = [
    {
      title: "Premium Theme",
      price: 500,
      description: "Unlock exclusive app themes",
    },
    {
      title: "Custom Avatar",
      price: 300,
      description: "Create your unique avatar",
    },
    {
      title: "Special Badge",
      price: 1000,
      description: "Show off your achievements",
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4 min-h-screen bg-gradient-to-br from-background/50 to-background">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-3">
          <ShoppingBag className="h-8 w-8 text-primary animate-bounce" />
          <h1 className="text-4xl font-bold text-primary">
            Premium Shop
          </h1>
        </div>
        <div className="flex items-center gap-2 bg-secondary/20 px-4 py-2 rounded-full">
          <Gem className="text-primary" />
          <span className="font-semibold">1,234 gems</span>
        </div>
      </div>

      {/* Premium Subscriptions */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-8">
          <Sparkles className="h-6 w-6 text-primary animate-pulse" />
          <h2 className="text-2xl font-semibold">Premium Subscriptions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subscriptionPlans.map((plan) => (
            <Card
              key={plan.title}
              className={`relative overflow-hidden transition-transform duration-300 hover:scale-105 ${
                plan.popular ? "border-primary shadow-lg shadow-primary/20" : ""
              }`}
            >
              <div
                className={`absolute inset-0 opacity-5 bg-gradient-to-br ${plan.gradient}`}
              />
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 pt-[17px] pb-[10px] rounded-full text-sm font-semibold shadow-lg">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl font-bold">{plan.title}</CardTitle>
                <CardDescription>
                  <span className="text-3xl font-bold text-primary">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground"> {plan.period}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full mt-6 bg-gradient-to-r ${plan.gradient} hover:opacity-90 transition-opacity`}
                >
                  Subscribe Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Affiliate Products */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Recommended Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {affiliateProducts.map((product) => (
            <Card key={product.title}>
              <CardHeader>
                <CardTitle>{product.title}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-bold mb-4">{product.price}</p>
                <Button asChild className="w-full">
                  <a href={product.link} target="_blank" rel="noopener noreferrer">
                    Learn More
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Shop Items */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Shop Items</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shopItems.map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">{item.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Gem className="w-4 h-4 text-primary" />
                    <span>{item.price}</span>
                  </div>
                  <Button>Purchase</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Reward Gems */}
      <section>
        <div className="flex items-center gap-2 mb-8">
          <Gift className="h-6 w-6 text-primary animate-pulse" />
          <h2 className="text-2xl font-semibold">Reward Gems Program</h2>
        </div>
        <Card className="bg-gradient-to-br from-background/50 to-background border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-6 w-6 text-primary animate-spin-slow" />
              Your Gems: 250
            </CardTitle>
            <CardDescription>Earn gems and redeem them for exclusive rewards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">How to Earn Gems</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    Complete courses: 50 gems
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    Refer a friend: 100 gems
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    Make a purchase: 10% of purchase value in gems
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Available Rewards</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Gift className="h-4 w-4 text-primary" />
                    500 gems: 10% off on any subscription
                  </li>
                  <li className="flex items-center gap-2">
                    <Gift className="h-4 w-4 text-primary" />
                    1000 gems: Free month of Premium access
                  </li>
                  <li className="flex items-center gap-2">
                    <Gift className="h-4 w-4 text-primary" />
                    2000 gems: One-on-one coaching session
                  </li>
                </ul>
              </div>
              <Button variant="outline" className="w-full hover:bg-primary/10">
                View All Rewards
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Shop;