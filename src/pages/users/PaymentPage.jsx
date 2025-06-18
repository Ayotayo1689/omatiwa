"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, CreditCard, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

import JCB from "../../asset/jcb.svg";
import AMEX from "../../asset/amex.svg";
import Master from "../../asset/master.svg";
import Visa from "../../asset/visa.svg";
import { decrypt } from "@/utils/encryption";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { CheckoutForm } from "./CheckoutForm";
const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "China",
  "Brazil",
  "India",
];

function PaymentPage() {
  //   const { data } = useParams();
  const params = useParams();
  const pathParam = params["*"] || "";
  const location = useLocation();
  const fullPath = location.pathname;

  const pathAfterPayment = fullPath.startsWith("/payment/")
    ? fullPath.substring("/payment/".length)
    : "";

  const [formData, setFormData] = useState({
    email: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    cardholderName: "",
    country: "United States",
    zip: "",
    saveInfo: false,
    phone: "",
  });

  const [PayAsText, setPayAsText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked) => {
    setFormData((prev) => ({ ...prev, saveInfo: checked }));
  };

  const handleCountryChange = (value) => {
    setFormData((prev) => ({ ...prev, country: value }));
  };

  // ??

  const handleDecrypt = async (encryptedText) => {
    const decrypted = await decrypt(encryptedText);

    setDecryptedText(JSON.parse(decrypted));
  };

  useEffect(() => {
    handleDecrypt(pathParam);
  }, [pathParam, fullPath, pathAfterPayment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payment submitted:", formData);
    alert("Payment processed successfully!");
  };

  // Format card number with spaces
  const formatCardNumber = (value) => {
    return (
      value
        .replace(/\s/g, "")
        .match(/.{1,4}/g)
        ?.join(" ")
        .substr(0, 19) || ""
    );
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, "");
    setFormData((prev) => ({
      ...prev,
      cardNumber: formatCardNumber(value),
    }));
  };

  // Format expiry date
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/[^\d]/g, "");
    if (value.length > 2) {
      value = value.substr(0, 2) + " / " + value.substr(2, 2);
    }
    setFormData((prev) => ({ ...prev, expiry: value }));
  };

  useEffect(() => {
    // console.log(decryptedText);

    if (decryptedText.prices) {
      setPayAsText(decryptedText.prices[0].amount);
    }
  }, [decryptedText.prices]);

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center p-4">
      <Card className="w-full border-0 max-w-6xl">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left side - Payment info */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => navigate(-1)}
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-2">
                  <div className="bg-gray-100 rounded-full p-2">
                    <CreditCard className="h-4 w-4 text-gray-500" />
                  </div>
                  {/* <span className="font-medium">TapReady Ltd</span> */}
                </div>
              </div>

              <div className="space-y-1">
                <h2 className="text-gray-500 text-sm">
                  {/*Advanced*/} Plan payment
                </h2>
                <h1 className="text-4xl font-bold">
                  ${PayAsText || decryptedText?.discountedAmount}
                </h1>
              </div>
            </div>

            {/* Right side - Form */}
            <div>
              <CheckoutForm paymentId={decryptedText.paymentId} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PaymentPage;
