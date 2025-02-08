import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { NODE_BACKEND_URL } from "../../redux/store";
import "./PD_ASK.css";

const publishKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePromise = loadStripe(publishKey);

const PD_ASK = () => {
  const [formData, setFormData] = useState({
    mdvpFo: "",
    mdvpFhi: "",
    mdvpFlo: "",
    mdvpJitter: "",
    mdvpShimmer: "",
  });

  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const { user } = useSelector((state) => state.user);

  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkTrialStatus = async () => {
    if (user?.pankrison_paid_trial === 1) return true;
    else if (user?.pankrison_model_trial >= 3) {
      setShowPaymentForm(true);
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (showPaymentForm) {
      const createPaymentIntent = async () => {
        const { data } = await axios.post(
          `${NODE_BACKEND_URL}/payment/create-payment-intent`,
          {
            amount: 49,
          }
        );
        console.log(data);
        setClientSecret(data.clientSecret);
      };
      createPaymentIntent();
    }
  }, [showPaymentForm]);

  const handlePayment = async () => {
    if (!stripe || !elements) {
      return;
    }

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
        `${NODE_BACKEND_URL}/patient/parkinson/predict-paid`,
        {
          features: Object.values(formData).map(Number),
          paymentIntentId: paymentIntent.id,
        },
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        toast.success("Prediction processed successfully!");
        setShowPaymentForm(false);
        window.location.reload();
      } else {
        toast.error("❌ Something went wrong while processing the prediction.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Payment or prediction failed.");
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        setAudioURL(URL.createObjectURL(audioBlob));
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handlePredict = async () => {
    const canProceed = await checkTrialStatus();
    if (!canProceed) return;

    try {
      let token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:5001/predict/${user._id}`,
        { features: Object.values(formData).map(Number) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.data.prediction_int === 1)
        toast.success(response.data.prediction);
      else toast.warning(response.data.prediction);
      setFormData({
        mdvpFo: "",
        mdvpFhi: "",
        mdvpFlo: "",
        mdvpJitter: "",
        mdvpShimmer: "",
      });
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
  };

  const handleSubmitAudio = async () => {
    const canProceed = await checkTrialStatus();
    if (!canProceed) return;

    if (!audioURL) {
      alert("Please record an audio first.");
      return;
    }

    try {
      const response = await fetch(audioURL);
      const audioBlob = await response.blob();
      const formData = new FormData();
      formData.append("file", audioBlob, "recorded_audio.wav");

      let token = localStorage.getItem("token");

      const uploadResponse = await axios.post(
        `http://localhost:5001/upload/${user._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (uploadResponse.data.prediction_int === 1)
        toast.success(uploadResponse.data.prediction);
      else toast.warning(uploadResponse.data.prediction);
      setFormData({
        mdvpFo: "",
        mdvpFhi: "",
        mdvpFlo: "",
        mdvpJitter: "",
        mdvpShimmer: "",
      });
    } catch (error) {
      console.error("Error uploading audio:", error);
      alert("Error in processing audio.");
    }
  };

  return (
    <div className="ask-container">
      <div className="known-details-section">
        <h2>Already Know Your Parameters?</h2>
        <h4>Enter the details manually to check the prediction.</h4>
        <form className="known-details-form">
          {["mdvpFo", "mdvpFhi", "mdvpFlo", "mdvpJitter", "mdvpShimmer"].map(
            (field, index) => (
              <label key={index}>
                {field.toUpperCase()}
                <input
                  type="number"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={
                    field === "mdvpJitter"
                      ? `Enter ${field}(in %)`
                      : field === "mdvpShimmer"
                      ? `Enter ${field}(in dc)`
                      : `Enter ${field}(in Hz)`
                  }
                />
              </label>
            )
          )}
          <button type="button" className="predict-btn" onClick={handlePredict}>
            Check Prediction
          </button>
        </form>
      </div>

      <div className="unknown-details-section">
        <h2>Don&apos;t Know the Parameters?</h2>
        <p>Record your voice by saying "Ahhhhhhh" for 5 seconds to analyze.</p>
        <button
          className="record-btn"
          onClick={isRecording ? stopRecording : startRecording}
        >
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>

        {audioURL && (
          <div className="audio-preview">
            <p>Recorded Audio:</p>
            <audio controls>
              <source src={audioURL} type="audio/wav" />
              Your browser does not support the audio tag.
            </audio>
            <button className="details-btn" onClick={handleSubmitAudio}>
              Submit Data
            </button>
          </div>
        )}
      </div>

      {showPaymentForm && (
        <div className="payment-prompt">
          <h3>💳 Enter Payment Details</h3>
          <div className="amount-box">Amount: ₹19</div>
          <div className="card-element-container">
            <CardElement />
          </div>
          <button
            type="button"
            className="book-btn"
            onClick={handlePayment}
            disabled={!stripe || !elements}
          >
            Confirm Payment & Get Prediction
          </button>
        </div>
      )}
    </div>
  );
};

const PD_ASKWrapper = () => {
  return (
    <Elements stripe={stripePromise}>
      <PD_ASK />
    </Elements>
  );
};

export default PD_ASKWrapper;
