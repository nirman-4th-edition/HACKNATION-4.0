import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import "./BookAppointment.css";
import toast from "react-hot-toast";
import axios from "axios";
import { doctorSpecializations } from "../../constant/data.js";
import { NODE_BACKEND_URL } from "../../redux/store.js";

const publishKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePromise = loadStripe(publishKey);

const BookAppointmentForm = () => {
  const [formData, setFormData] = useState({
    concern: "",
    date: "",
    time: "",
    description: "",
    prev_health_condition: "",
    specialization: "",
  });
  const [clientSecret, setClientSecret] = useState("");
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [specializationConcerns, setSpecializationConcerns] = useState([]);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigation = useNavigate();

  useEffect(() => {
    if (showPaymentForm) {
      const createPaymentIntent = async () => {
        const { data } = await axios.post(
          `${NODE_BACKEND_URL}/payment/create-payment-intent`,
          {
            amount: 49,
          }
        );
        setClientSecret(data.clientSecret);
      };
      createPaymentIntent();
    }
  }, [showPaymentForm]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "specialization") {
      const selectedSpecialization = e.target.value;
      const specialization = doctorSpecializations.find(
        (specialty) => specialty.specialization === selectedSpecialization
      );
      setSpecializationConcerns(specialization ? specialization.concerns : []);
    }
  };
  const handleBookAppointment = (e) => {
    e.preventDefault();
    setShowPaymentForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) {
        toast.error(`Payment failed: ${error.message}`);
        return;
      }

      const { data } = await axios.post(
        `${NODE_BACKEND_URL}/patient/request-appointment`,
        {
          ...formData,
          paymentIntentId: paymentIntent.id,
        },
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        toast.success("✅ Appointment booked successfully!");
        navigation("/");
      } else {
        toast.error("❌ Something went wrong while booking the appointment.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="appointment-container">
      <h2 className="appointment-title">📅 Book an Appointment</h2>
      <form className="appointment-form" onSubmit={handleBookAppointment}>
        {/* Appointment Details Form */}
        {!showPaymentForm && (
          <>
            <select
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
            >
              <option value="">Select Specialization</option>
              {doctorSpecializations.map((specialization) => (
                <option
                  key={specialization.specialization}
                  value={specialization.specialization}
                >
                  {specialization.specialization}
                </option>
              ))}
            </select>
            {formData.specialization && (
              <select
                name="concern"
                value={formData.concern}
                onChange={handleChange}
                required
              >
                <option value="">Select Concern</option>
                {specializationConcerns.map((concern, index) => (
                  <option key={index} value={concern}>
                    {concern}
                  </option>
                ))}
              </select>
            )}
            <div className="form-group">
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                id="description"
                name="description"
                placeholder="Enter a brief description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <textarea
                id="prev_health_condition"
                name="prev_health_condition"
                placeholder="Enter your past medical history"
                value={formData.prev_health_condition}
                onChange={handleChange}
                required
                className="full-width-textarea"
              ></textarea>
            </div>

            <button type="submit" className="book-btn">
              Book Appointment
            </button>
          </>
        )}

        {showPaymentForm && (
          <div className="payment-container">
            <h3>💳 Enter Payment Details</h3>
            <div className="amount-box">Amount: ₹49</div>
            <div className="card-element-container">
              <CardElement id="card-element" />
            </div>
            <button
              type="button"
              className="book-btn"
              onClick={handleSubmit}
              disabled={!stripe || loading}
            >
              {loading ? (
                <>
                  Processing Payment...{" "}
                  <span className="loading-spinner"></span>
                </>
              ) : (
                "Confirm Payment & Book Appointment"
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

const BookAppointment = () => {
  return (
    <Elements stripe={stripePromise}>
      <BookAppointmentForm />
    </Elements>
  );
};

export default BookAppointment;
