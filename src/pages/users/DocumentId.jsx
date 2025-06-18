import { useEffect, useState, useRef } from "react";
import { Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import IdCard from "../../asset/IdCard.svg";
import ResendVerificationModal from "@/components/ResendVerificationModal";
import { useApiGet, useApiPost } from "@/hooks/useApi";
import { useNavigate, useParams } from "react-router-dom";
import SkeletonLoader from "@/components/TableSkeleton";
import ApiErr from "@/components/ApiErr";
import { toast } from "react-toastify";
import {
  capitalizeFirstLetter,
  convertToLowerCase,
  formatDateString,
} from "@/utils/formatDate";
import VerificationRequest from "@/components/VerificationRequest";
import PaymentPlan from "@/components/PaymentPlan";
import { encrypt } from "@/utils/encryption";
import { Box, Modal } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import "./print.css";
import { MatchedIcon, NotMatchedIcon, RedXIcon } from "@/icons/icons";
import WarningBanner from "@/components/WarningBanner";
import { ToggleTextVisibility } from "@/components/TextVisibility";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95vw",
  bgcolor: "white",
  border: "none",
  outline: "none",
  // p: 4,
  maxWidth: "500px",
  borderRadius: "20px",
  zIndex: 1,
};

export default function DocumentId() {
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const [isResendModalOpen, setIsResendModalOpen] = useState(false);
  const [selected, setSelected] = useState();

  const [isHover, setIsHover] = useState(false);
  const [Blur, setBlur] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({ contentRef });
  // Usage example:

  const {
    data: documentsData,
    isFetching: fetchingDocumentsData,
    isLoading: isLoadingDocumentData,
    error: errorDocumentsData,
    refetch: refetchDocumentsData,
  } = useApiGet(`/company/verification-requests/${id}`);

  useEffect(() => {
    if (documentsData) {
      console.log(documentsData);
    }
  }, [documentsData]);

  const {
    data: documents,
    isFetching: fetchingDocuments,
    error: errorDocuments,
    refetch: refetchDocuments,
  } = useApiGet("/documents");

  const {
    data: subPlan,
    isFetching: fetchingSubPlan,
    isLoading: loadingsubPlan,
    error: errorsubPlan,
    refetch: refetchsubPlan,
  } = useApiGet("/subscription-plans");

  const { post } = useApiPost();

  const verificationRequest = documentsData?.data?.verificationRequest;
  const matchedFields = documentsData?.data?.matchedFields;
  const dataReadByVYC = documentsData?.data?.verificationRequestResults;
  const verificationRequestResults =
    documentsData?.data?.verificationRequest?.verificationRequestResults;

  const handleDownloadDocument = async (
    imageUrl,
    filename = "downloaded-image.webp"
  ) => {
    try {
      const response = await fetch(imageUrl, { mode: "cors" });

      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(url);
      toast.info("Image downloaded successfully");
    } catch (error) {
      toast.error("Error downloading image!");
      console.error("Error downloading image:", error);
    }
  };

  const [loading, setLoading] = useState(false);

  const [step, setStep] = useState(1);

  const handleCreatePayment = async () => {
    const data = subPlan?.data?.subscriptionPlans?.filter(
      (item) => item?.billingType === "PAY_AS_YOU_GO"
    )[0];

    setLoading(true);
    const formData = {
      subscriptionPlanId: data.id,
      subscriptionPlanType: "PAY_AS_YOU_GO",
      // paymentMethod: "STRIPE",
      type: data.prices[0].type,
    };
    const response = await post(
      "/company/account/subscriptions/subscribe",
      formData
    );

    if (response.success) {
      const dat = JSON.stringify({
        ...data,
        paymentId: response.data.payment.id,
      });
      const enc = await encrypt(dat);
      window.location.href = `/payment/${enc}`;
    } else {
      setLoading(false);
    }
    setLoading(false);
  };

  const handleClose = () => {
    setIsResendModalOpen(false);
    setStep(1);
  };

  const [allTrue, setAllTrue] = useState(true);

  useEffect(() => {
    if (verificationRequest) {
      const name = `${verificationRequest?.firstName}-${verificationRequest?.lastName}`;
      document.title = name; // Set page title

      return () => {
        document.title = "verify your customers"; // Reset when component unmounts (optional)
      };
    }
  }, [verificationRequest]);

  useEffect(() => {
    if (documentsData) {
      setAllTrue(
        Object.values(documentsData?.data?.nfcDataPageComparison).every(Boolean)
      );
    }
  }, [documentsData]);

  const handleResendVerification = () => {
    setIsResendModalOpen(true);
  };

  const handleCloseResendModal = () => {
    setIsResendModalOpen(false);
  };

  const formatDate = (dateString) => {
    console.log(dateString);

    if (!dateString) return "";
    const day = new Date(dateString).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    console.log(day);

    return day;
  };

  const formatDateShort = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const formattedYear = year % 100; // Get the last two digits of the year
    return date
      .toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .replace(year.toString(), formattedYear.toString().padStart(2, "0"));
  };

  const renderStatusBadge = (status) => {
    const statusColor =
      status === "PENDING"
        ? "bg-yellow-500"
        : status === "COMPLETED"
        ? "bg-green-500"
        : "bg-red-500";

    return (
      <div className="flex items-center gap-2">
        Status:{" "}
        <span className="flex items-center gap-1">
          <span className={`w-2 h-2 rounded-full ${statusColor}`} />
          <span>{capitalizeFirstLetter(status)}</span>
        </span>
      </div>
    );
  };

  const renderDataSection = (title, data, date, isCompleted) => {
    console.log("this is data", data);

    if (!data) return null;

    const filteredData = Object.entries(data).filter(([key, value]) => {
      return !(typeof value === "string" && value.startsWith("http"));
    });
    return (
      <div className="flex flex-col gap-6">
        {verificationRequestResults && (
          <div className="">
            <div className="bg-white    h-fit rounded-xl p-6 space-y-6">
              <div className="flex items-center flex-wrap gap-4 justify-between">
                <h2 className="text-lg font-semibold">{title}</h2>
                {date && (
                  <div className="text-sm">
                    Request date: {formatDate(date)}
                    {isCompleted && verificationRequestResults && (
                      <span className="text-green-600 ml-2">
                        - Completed:{" "}
                        {formatDate(verificationRequestResults[0].updatedAt)}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="space-y-4">
                {filteredData.map(([key, value]) => {
                  const formatDate = (date) => {
                    const parsedDate = new Date(date);
                    if (isNaN(parsedDate.getTime())) return value;
                    return parsedDate.toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    });
                  };
                  console.log("value", Date.parse(value));

                  // Check if value looks like a date
                  const formattedValue =
                    typeof value === "string" && !isNaN(Date.parse(value))
                      ? value
                      : value;

                  return (
                    <div
                      key={key}
                      className="flex flex-wrap items-center gap-2"
                    >
                      <div className="text-gray-500 capitalize">
                        {key.replace(/([A-Z])/g, " $1").toLowerCase()}:
                      </div>
                      <div>
                        {key === "dateOfExpiration" ? (
                          !Blur ? (
                            formatDateString(value)
                          ) : (
                            <ToggleTextVisibility
                              text={formatDateString(value)}
                            />
                          )
                        ) : key === "dateOfBirth" ? (
                          !Blur ? (
                            formatDateString(value)
                          ) : (
                            <ToggleTextVisibility
                              text={formatDateString(value)}
                            />
                          )
                        ) : key === "documentNo" ? (
                          !Blur ? (
                            value
                          ) : (
                            <ToggleTextVisibility text={value} />
                          )
                        ) : (
                          formattedValue
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <div className="">
          {!allTrue && (
            <WarningBanner
              nfcDataPageComparison={documentsData?.data?.nfcDataPageComparison}
            />
          )}
        </div>
      </div>
    );
  };

  const renderSubmittedDataSection = (
    title,
    data,
    matchedFields,
    date,
    isCompleted
  ) => {
    if (!data) return null;

    return (
      <div className="flex flex-col gap-4">
        <div className="bg-white rounded-xl p-4 space-y-6">
          <div className="flex border-b pb-2 mb-2 flex-wrap gap-4 items-center justify-between">
            <h2 className="text-lg font-semibold">{title}</h2>
            {date && <div className="text-sm">Request date: {date}</div>}
          </div>
          <div className="space-y-4">
            {Object.entries(data).map(([key, value]) => {
              if (!value) return null;

              const isMatched = matchedFields?.[key] ?? false;

              return (
                <div
                  key={key}
                  className="flex justify-between  items-center gap-2"
                >
                  <div className=" w-fit flex flex-wrap  gap-1">
                    {key.replace(/([A-Z])/g, " $1").trim() === "first Name" ? (
                      <div className="text-gray-500 whitespace-nowrap ">
                        {"Given Name(s):"}
                      </div>
                    ) : (
                      <div className=" text-gray-500 whitespace-nowrap capitalize">{`${key
                        .replace(/([A-Z])/g, " $1")
                        .toLowerCase()}:`}</div>
                    )}
                    <div className="font-medium whitespace-nowrap">
                      {key === "dateOfBirth" ? (
                        !Blur ? (
                          formatDateString(value)
                        ) : (
                          <ToggleTextVisibility
                            text={formatDateString(value)}
                          />
                        )
                      ) : key === "email" ? (
                        convertToLowerCase(value)
                      ) : (
                        capitalizeFirstLetter(value)
                      )}
                    </div>
                  </div>
                  {verificationRequestResults[0] && key !== "email" && (
                    <div
                      className={
                        " w-[150px] flex justify-end items-center gap-1  text-right no-wrap"
                      }
                    >
                      {isMatched ? <MatchedIcon /> : <NotMatchedIcon />}{" "}
                      {isMatched ? "Matched" : "Not matched"}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {verificationRequestResults[0]?.data?.live?.dataPageImage && (
          <div
            // onMouseEnter={() => setIsHover(true)}
            // onMouseLeave={() => setIsHover(false)}
            className="bg-white flex-1 rounded-xl p-6 group space-y-4"
          >
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <h2 className="text-lg font-semibold">
                Document image read by VYC
              </h2>
              {isCompleted && verificationRequestResults && (
                <span className="text-green-600 text-sm">
                  Completed:{" "}
                  {formatDate(verificationRequestResults[0].updatedAt)}
                </span>
              )}
            </div>
            <div className="relative border min-h-[100px] h-fit rounded-md">
              <img
                src={
                  verificationRequestResults[0]?.data?.live?.dataPageImage ||
                  "/placeholder.svg"
                }
                alt="Document"
                className={`rounded-lg ${
                  Blur && "blur"
                } max-h-[250px] object-cover w-full`}
              />
              <div className="flex absolute top-5 right-5 gap-2">
                <Dialog
                  open={isImagePreviewOpen}
                  onOpenChange={setIsImagePreviewOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-fit p-1 hidden group-hover:block h-fit bg-white"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="rounded-xl max-w-[90vw] md:max-w-lg">
                    <img
                      src={
                        verificationRequestResults[0]?.data?.live
                          ?.dataPageImage || "/placeholder.svg"
                      }
                      alt="Document Preview"
                      className="w-full"
                    />
                    <Button
                      variant="default"
                      className="bg-black mt-4 hover:bg-black/90 flex-1"
                      onClick={() =>
                        handleDownloadDocument(
                          verificationRequestResults[0]?.data?.live
                            ?.dataPageImage
                        )
                      }
                    >
                      Download image
                    </Button>
                  </DialogContent>
                </Dialog>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-fit opacity-0 group-hover:opacity-100 p-1 h-fit bg-white transition-opacity"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() =>
                        handleDownloadDocument(
                          verificationRequestResults[0]?.data?.live
                            ?.dataPageImage
                        )
                      }
                    >
                      Download
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className=" mx-auto p-1 text-sm md:text-base md:p-4 space-y-6">
      {isLoadingDocumentData ? (
        <div className="h-8 bg-gray-200 animate-pulse rounded w-1/3"></div>
      ) : (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {verificationRequest && (
            <h1 className="text-2xl font-bold">
              {capitalizeFirstLetter(verificationRequest?.firstName)}{" "}
              {capitalizeFirstLetter(verificationRequest?.lastName)}'s
              Verification
            </h1>
          )}
          {verificationRequest && (
            <div className="flex items-center gap-4">
              {renderStatusBadge(verificationRequest?.status)}
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}

      {!errorDocumentsData && (
        <div className="flex flex-row md:justify-end gap-3">
          <Button
            variant="default"
            className="bg-black hover:bg-black/90 flex-1 max-w-[180px]"
            onClick={() => {
              setBlur(false);
              setTimeout(() => {
                reactToPrintFn();
              }, 200);
            }}
            disabled={isLoadingDocumentData}
          >
            Download report
          </Button>
          <Button
            variant="outline"
            onClick={handleResendVerification}
            className="flex-1 max-w-[180px] border-black"
            disabled={isLoadingDocumentData}
          >
            Resend verification
          </Button>
        </div>
      )}

      {/* Main Content */}
      {isLoadingDocumentData ? (
        <SkeletonLoader />
      ) : errorDocumentsData ? (
        <ApiErr
          loading={fetchingDocumentsData}
          refresh={refetchDocumentsData}
        />
      ) : (
        <div
          ref={contentRef}
          className=" print-content grid  grid-cols-1 md:grid-cols-2  gap-4"
        >
          {renderSubmittedDataSection(
            "Submitted data",
            {
              firstName: verificationRequest?.firstName,
              lastName: verificationRequest?.lastName,
              nationality: verificationRequest?.nationality,
              dateOfBirth: verificationRequest?.DOB,
              documentType: verificationRequest?.document?.name,
              email: verificationRequest?.email,
            },
            matchedFields,
            formatDate(verificationRequest?.createdAt),
            verificationRequest?.status === "COMPLETED"
          )}

          {/* VYC Data */}
          {renderDataSection(
            "Information read by VYC",
            //   replace this with the actual data
            verificationRequestResults[0]?.data?.nfc,

            verificationRequestResults[0]?.createdAt,
            verificationRequest?.status === "COMPLETED"
          )}
        </div>
      )}

      {!errorDocumentsData && (
        <div className="flex flex-row md:justify-start gap-3">
          <Button
            variant="default"
            className="bg-black hover:bg-black/90 flex-1 max-w-[180px]"
            onClick={() => {
              setBlur(false);
              setTimeout(() => {
                reactToPrintFn();
              }, 200);
            }}
            disabled={isLoadingDocumentData}
          >
            Download report
          </Button>
          <Button
            variant="outline"
            onClick={handleResendVerification}
            className="flex-1 max-w-[180px] border border-black"
            disabled={isLoadingDocumentData}
          >
            Resend verification
          </Button>
        </div>
      )}

      <Modal
        open={isResendModalOpen}
        sx={{
          zIndex: "30",
        }}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className=" py-6 px-4 max-h-[70vh] overflow-auto">
            {step === 1 ? (
              <VerificationRequest
                // setFormDataFunc={setFormData}
                // draftData={draft}
                handleClose={handleClose}
                noSendAnother={true}
                closed={isResendModalOpen}
                refetch={refetchDocumentsData}
                selected={verificationRequest}
                onClick={() => setStep(2)}
                setSelected={setSelected}
              />
            ) : (
              <PaymentPlan
                chooseAnother={() => navigate("/user/pricing_plan")}
                amount={
                  subPlan?.data?.subscriptionPlans?.filter(
                    (item) => item?.billingType === "PAY_AS_YOU_GO"
                  )[0].prices[0].discountedAmount
                }
                onclick={() => handleCreatePayment()}
              />
            )}
          </div>
        </Box>
      </Modal>

      {/* Resend Verification Modal */}
      {/* <ResendVerificationModal
      documents={documents?.data?.documents}
        isOpen={isResendModalOpen}
        onClose={handleCloseResendModal}
        initialData={{
          firstName: verificationRequest?.firstName,
          lastName: verificationRequest?.lastName,
          email: verificationRequest?.email,
          documentType: verificationRequest?.document?.name,
        }}
      /> */}
    </div>
  );
}
