"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Clock, FileText, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import EndPlanDialog from "@/components/EndPlanDialog";
import {
  CalenderIcon,
  SmallBillingIcon,
  SmallFileIcon,
  WarningIcon,
} from "@/icons/icons";
import { useApiGet } from "@/hooks/useApi";
import {
  capitalizeFirstLetter,
  formatDate,
  getExpiryDuration,
} from "@/utils/formatDate";
import { getTokens } from "@/utils/tokenManager";
import { baseUrl } from "@/features/api/apiSlice";

export default function Billings() {
  const navigate = useNavigate();

  // const {
  //   data: dashboardData,
  //   isFetching,
  //   isLoading,
  //   error,
  //   refetch,
  // } = useApiGet(`/company/account/subscription?t=${new Date().getTime()}`);

  // useEffect(() => {
  //   console.log(dashboardData);
  // }, [dashboardData]);

  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEndPlanOpen, setIsEndPlanOpen] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);

      setError(null);
      console.log("loading1");
      const { accessToken } = getTokens();
      console.log("loading0");
      console.log(accessToken);

      const response = await fetch(
        `${baseUrl}company/account/subscription?t=${new Date().getTime()}`,
        {
          headers: {
            "Content-Type": "application/json",
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
          },
        }
      );
      console.log("loading");

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setDashboardData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const billingData = {
    subscriptionEnd: {
      days: 2,
      renewalDate: "Friday, March 30 2025",
    },
    plan: {
      name: "VYC Pro Plan",
      status: "Paid",
      dateRange: "February 28, 2025- March 30, 2025",
      verificationRequests: 100,
      pricePerMonth: 42.0,
    },
    summary: {
      nextPayment: {
        amount: 42,
        date: "30/03/2025",
      },
      allocated: 100,
      used: 90,
      paymentMethod: "Stripe",
    },
  };

  return (
    <>
      {isLoading ? (
        <div className="w-full  min-h-[400px] flex justify-center items-center">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto p-4 space-y-6">
          <h1 className="text-2xl font-bold">Billings</h1>

          {/* Subscription Alert */}

          {dashboardData?.message !==
          "You don't have an active subscription" ? (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Summary */}
              <div className=" flex flex-col gap-4">
                {dashboardData?.data?.subscription?.subscriptionPlan
                  ?.billingType !== "PAY_AS_YOU_GO" && (
                  <div className="bg-[#F5F9F7] border border-[#E6F0E9] rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <WarningIcon />
                      <div>
                        {dashboardData?.message ===
                        "You don't have an active subscription" ? (
                          dashboardData?.message
                        ) : (
                          <>
                            <p className="font-medium">
                              Your subscription ends
                              {getExpiryDuration(
                                dashboardData?.data?.subscription
                                  ?.subscriptionPlan?.companies[0]
                                  .subscriptionExpiresAt
                              )}
                            </p>
                            <p className="text-gray-500 text-sm">
                              Your subscription will automatically renew on{" "}
                              {formatDate(
                                dashboardData?.data?.subscription
                                  ?.subscriptionPlan?.companies[0]
                                  .subscriptionExpiresAt
                              )}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-white rounded-xl p-6 space-y-6">
                  <h2 className="text-xl font-semibold">Summary</h2>

                  <div className="space-y-6">
                    {dashboardData?.data?.subscription?.subscriptionPlan
                      ?.billingType !== "PAY_AS_YOU_GO" && (
                      <div>
                        <div className="text-gray-500 mb-1">
                          Next payment estimate
                        </div>
                        <div className="flex text-[#57B243] font-medium items-baseline">
                          <span className="">
                            ${dashboardData?.data?.subscription?.amount}
                          </span>
                          <span className=" ml-1">
                            on{" "}
                            {formatDate(
                              dashboardData?.data?.subscription
                                ?.subscriptionPlan?.companies[0]
                                .subscriptionExpiresAt
                            )}
                          </span>
                        </div>
                      </div>
                    )}

                    <div>
                      <div className="text-gray-500 mb-1">
                        Allocated verification
                      </div>
                      <div>
                        {dashboardData?.data?.subscription?.subscriptionPlan
                          ?.billingType === "PAY_AS_YOU_GO"
                          ? "1"
                          : dashboardData?.data?.subscription?.subscriptionPlan
                              ?.companies[0].allocatedVerification}
                      </div>
                    </div>

                    {dashboardData?.data?.subscription?.subscriptionPlan
                      ?.billingType !== "PAY_AS_YOU_GO" && (
                      <div>
                        <div className="text-gray-500 mb-1">
                          Used verification
                        </div>
                        <div>
                          {
                            dashboardData?.data?.subscription?.subscriptionPlan
                              ?.companies[0].usedVerification
                          }
                        </div>
                      </div>
                    )}

                    <div>
                      <div className="text-gray-500 mb-1">Payment method</div>
                      <div>
                        {capitalizeFirstLetter(
                          dashboardData?.data?.subscription?.method
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Plan Details */}
              <div className="bg-white rounded-xl h-fit p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">YOUR PLAN</div>
                  <div className="text-[#57B243] text-sm font-medium">
                    {capitalizeFirstLetter(
                      dashboardData?.data?.subscription?.status
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">
                    {dashboardData?.data?.subscription?.subscriptionPlan?.name}
                  </h2>
                  {/* <Button
                    variant="outline"
                    className="border border-black rounded-xl"
                  >
                    View invoice
                  </Button> */}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <CalenderIcon />
                    <span>
                      {formatDate(dashboardData?.data?.subscription?.createdAt)}{" "}
                      {dashboardData?.data?.subscription?.subscriptionPlan
                        ?.billingType !== "PAY_AS_YOU_GO" && (
                        <>
                          {" "}
                          -{" "}
                          {formatDate(
                            dashboardData?.data?.subscription?.subscriptionPlan
                              ?.companies[0].subscriptionExpiresAt
                          )}
                        </>
                      )}
                    </span>
                  </div>
                  {dashboardData?.data?.subscription?.subscriptionPlan
                    ?.billingType !== "PAY_AS_YOU_GO" && (
                    <div className="flex items-center gap-3 text-gray-600">
                      <SmallFileIcon className="w-5 h-5" />
                      <span>
                        {
                          dashboardData?.data?.subscription?.subscriptionPlan
                            ?.companies[0].allocatedVerification
                        }{" "}
                        verification requests per month
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-3 text-gray-600">
                    <SmallBillingIcon className="w-5 h-5" />
                    <span>
                      ${dashboardData?.data?.subscription?.amount} per{" "}
                      {dashboardData?.data?.subscription?.subscriptionPlan
                        ?.billingType === "PAY_AS_YOU_GO"
                        ? "Request"
                        : "Month"}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => navigate("/user/pricing_plan")}
                    className="bg-black hover:bg-black/90 flex-1"
                  >
                    Choose another plan
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border border-black rounded-xl"
                    onClick={() => setIsEndPlanOpen(true)}
                  >
                    End plan
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex gap-3 flex-col  pt-4">
              <div className="bg-[#F5F9F7] border border-[#E6F0E9] rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <WarningIcon />
                  <div>
                    {dashboardData?.message ===
                    "You don't have an active subscription" ? (
                      dashboardData?.message
                    ) : (
                      <>
                        <p className="font-medium">
                          Your subscription ends
                          {getExpiryDuration(
                            dashboardData?.data?.subscription?.subscriptionPlan
                              ?.companies[0].subscriptionExpiresAt
                          )}
                        </p>
                        <p className="text-gray-500 text-sm">
                          Your subscription will automatically renew on{" "}
                          {formatDate(
                            dashboardData?.data?.subscription?.subscriptionPlan
                              ?.companies[0].subscriptionExpiresAt
                          )}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <Button
                onClick={() => navigate("/user/pricing_plan")}
                className="bg-black max-w-[400px] mt-8 hover:bg-black/90 flex-1"
              >
                Choose a plan
              </Button>
            </div>
          )}

          <EndPlanDialog
            refetch={fetchData}
            open={isEndPlanOpen}
            onOpenChange={setIsEndPlanOpen}
          />
        </div>
      )}
    </>
  );
}
