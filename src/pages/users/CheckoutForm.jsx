import React, { useEffect, useState } from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { useApiPost } from "@/hooks/useApi";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Box, Modal } from "@mui/material";
import Success from "../../asset/Success.GIF";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95vw",
  bgcolor: "white",
  border: "none",
  outline: "none",
  p: 4,
  maxWidth: "400px",
  borderRadius: "20px",
  zIndex: 1,
};

export const CheckoutForm = ({ paymentId }) => {
  const stripe = useStripe();
  const [open, setOpen] = useState(false);
  // useEffect(() => {
  //   console.log("paymentId", paymentId);

  // }, [paymentId])

  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (id) => {
    setOpen(true);
  };

  const [formData, setFormData] = useState({
    email: "",
    // cardNumber: "",
    // expiry: "",
    // cvc: "",
    cardholderName: "",
    country: "US",
    zip: "",
    saveInfo: false,
    phone: "",
  });

  const countries = [
    { code: "US", name: "United States", currency: "USD" },
    { code: "CA", name: "Canada", currency: "CAD" },
    { code: "GB", name: "United Kingdom", currency: "GBP" },
    { code: "AU", name: "Australia", currency: "AUD" },
    { code: "EU", name: "European Union", currency: "EUR" },
    { code: "JP", name: "Japan", currency: "JPY" },
    { code: "CN", name: "China", currency: "CNY" },
    { code: "IN", name: "India", currency: "INR" },
    { code: "BR", name: "Brazil", currency: "BRL" },
    { code: "ZA", name: "South Africa", currency: "ZAR" },
    { code: "MX", name: "Mexico", currency: "MXN" },
    { code: "SG", name: "Singapore", currency: "SGD" },
    { code: "HK", name: "Hong Kong", currency: "HKD" },
    { code: "KR", name: "South Korea", currency: "KRW" },
    { code: "CH", name: "Switzerland", currency: "CHF" },
    { code: "SE", name: "Sweden", currency: "SEK" },
    { code: "NO", name: "Norway", currency: "NOK" },
    { code: "DK", name: "Denmark", currency: "DKK" },
    { code: "NZ", name: "New Zealand", currency: "NZD" },
    { code: "RU", name: "Russia", currency: "RUB" },
    { code: "SA", name: "Saudi Arabia", currency: "SAR" },
    { code: "AE", name: "United Arab Emirates", currency: "AED" },
    { code: "TH", name: "Thailand", currency: "THB" },
    { code: "MY", name: "Malaysia", currency: "MYR" },
    { code: "ID", name: "Indonesia", currency: "IDR" },
    { code: "PK", name: "Pakistan", currency: "PKR" },
    { code: "NG", name: "Nigeria", currency: "NGN" },
    { code: "EG", name: "Egypt", currency: "EGP" },
    { code: "KE", name: "Kenya", currency: "KES" },
    { code: "AR", name: "Argentina", currency: "ARS" },
    { code: "CL", name: "Chile", currency: "CLP" },
    { code: "CO", name: "Colombia", currency: "COP" },
    { code: "VN", name: "Vietnam", currency: "VND" },
    { code: "PH", name: "Philippines", currency: "PHP" },
    { code: "BD", name: "Bangladesh", currency: "BDT" },
    { code: "IL", name: "Israel", currency: "ILS" },
    { code: "CZ", name: "Czech Republic", currency: "CZK" },
    { code: "PL", name: "Poland", currency: "PLN" },
    { code: "HU", name: "Hungary", currency: "HUF" },
    { code: "TR", name: "Turkey", currency: "TRY" },
  ];

  const noSub = JSON.parse(localStorage.getItem("noSubData"));
  const PageData = JSON.parse(localStorage.getItem("PageData"));

  const [pageD] = useState(PageData);

  console.log(pageD);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (value) => {
    setFormData((prev) => ({ ...prev, country: value }));
  };

  const handleBackToBilling = async () => {
    function formatDate(inputDate) {
      const date = new Date(inputDate);

      // Get day, month, and year
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
      const year = date.getFullYear();

      return `${year}-${month}-${day}`;
    }
    setLoading(true);
    if (noSub) {
      const result = await post(
        "/company/verification-requests/send",
        {...noSub,
          DOB: formatDate(noSub.DOB),
        },
        true
      );

      if (result.success) {
        localStorage.removeItem("PageData");
        localStorage.removeItem("noSubData");
        setTimeout(() => {
          window.location.href = pageD?.uri || "/user/billings";
        }, 1000);
      } else {
        setLoading(false);
        console.log("hello");
      }
    } else {
      localStorage.removeItem("PageData");
      window.location.href = pageD?.uri || "/user/billings";
    }
    setLoading(false);
  };

  const handleCheckboxChange = (checked) => {
    setFormData((prev) => ({ ...prev, saveInfo: checked }));
  };

  const { post } = useApiPost();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // Step 1: Verify the card details before proceeding
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: formData.cardholderName,
        email: formData.email,
        address: {
          postal_code: formData.zip,
          country: formData.country,
        },
      },
    });

    if (error) {
      setError(error.message);
      console.log("this is error", error);

      setLoading(false);
      return;
    }

    console.log("Card verified successfully:", paymentMethod);

    // Step 2: Proceed to initialize the payment if card is valid
    const formdata = {
      paymentId: paymentId,
      paymentMethodId: paymentMethod.id,
      email: formData.email,
    };

    const response = await post("/payment/initialize", formdata, true);

    if (!response?.data?.clientSecret) {
      setError("Failed to initialize payment.");
      setLoading(false);
      return;
    }

    const { clientSecret, status } = response.data;

    if (status === "succeeded") {
      setLoading(false);
      handleOpen();
      return;
    }

    setLoading(false);
  };

  return (
    <>
      <form
        className=" border max-w-[450px] rounded-xl  py-8 px-6 bg-white"
        onSubmit={handleSubmit}
      >
        <div className="mb-6">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <CardElement className="border p-2 mb-3 " />

        <div className="mb-6">
          <Label htmlFor="cardholderName">Cardholder name</Label>
          <Input
            id="cardholderName"
            name="cardholderName"
            placeholder="Full name on card"
            value={formData.cardholderName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6">
          <Label htmlFor="country">Country or region</Label>
          <Select value={formData.country} onValueChange={handleCountryChange}>
            <SelectTrigger id="country" className="w-full">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map(({ code, name, currency }) => (
                <SelectItem key={code} value={code}>
                  {name} ({currency})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="saveInfo"
              checked={formData.saveInfo}
              onCheckedChange={handleCheckboxChange}
            />
            <div className="grid gap-1.5">
              <Label htmlFor="saveInfo" className="font-medium">
                Securely save my information for 1-click checkout
              </Label>
              <p className="text-sm text-gray-500">
                Enter your phone number to create a Link account and pay faster
                on LEADER ADS LTD and everywhere Link is accepted.
              </p>
            </div>
          </div>

          {/* <div className="flex gap-2">
          <div className="flex-shrink-0 w-12 border rounded px-2 py-2 flex justify-center items-center">
            <span className="text-sm">🇺🇸</span>
          </div>
          <Input
            id="phone"
            name="phone"
            placeholder="(201) 555-0123"
            value={formData.phone}
            onChange={handleChange}
            className="flex-grow"
          />
          <div className="flex-shrink-0 w-20 border rounded px-2 py-2 flex justify-center items-center text-gray-400 text-sm">
            Optional
          </div>
        </div> */}
        </div>

        <div className="pt-4 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-blue-500 font-medium">link</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400 text-sm">More info</span>
          </div>
          <Button
            disabled={!stripe || loading}
            type="submit"
            className="w-full disabled:bg-[#b4d5ff] bg-blue-600 hover:bg-blue-700 text-white py-6"
          >
            {loading ? "Processing..." : "Pay Now"}
          </Button>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <Modal
        open={open}
        sx={{
          zIndex: "30",
        }}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img src={Success} alt="" className=" m-auto  w-[180px]" />
          <h2 className="text-xl text-center font-semibold mb-2">
            You have successfully chosen a payment plan
          </h2>
          <Button onClick={handleBackToBilling} className="w-full mt-4">
            {loading
              ? "Please wait..."
              : `Back to ${PageData?.name || "Billings"}`}
          </Button>
        </Box>
      </Modal>
    </>
  );
};
