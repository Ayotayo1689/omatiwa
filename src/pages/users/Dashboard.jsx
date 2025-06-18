"use client";

import { useEffect, useState } from "react";
import { Clock, Search, MoreVertical } from "lucide-react";
// import { Button } from "./ui/button"
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { DashBoardFileIcon, FileIcon } from "@/icons/icons";
import { Modal, Box } from "@mui/material";
import VerificationRequest from "@/components/VerificationRequest";
import PaymentPlan from "@/components/PaymentPlan";
import { useLocation, useNavigate } from "react-router-dom";
import { useApiGet, useApiPost } from "@/hooks/useApi";
import {
  capitalizeFirstLetter,
  formatDate,
  formatDateString,
} from "@/utils/formatDate";
import SkeletonLoader from "@/components/TableSkeleton";
import { toast } from "react-toastify";
import { encrypt } from "@/utils/encryption";
import { useDispatch, useSelector } from "react-redux";
import { setIsDraft } from "@/features/draft/draftSlice";
import SummaryModal from "@/components/SummaryModal";
import Expand from "../../asset/expand.svg";
import CloseIcon from "@mui/icons-material/Close";

// import zIndex from "@mui/material/styles/zIndex";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95vw",
  bgcolor: "white",
  // border: "none",
  outline: "none",
  // p: 4,
  maxWidth: "500px",
  borderRadius: "20px",
  zIndex: 1,
};

const StatusCard = ({ title, count, period }) => (
  <div className="bg-white rounded-xl p-4 border border-[#AAAAAA] flex items-center space-x-3">
    <div className="p-2 bg-gray-50 rounded-full">
      <FileIcon />
    </div>
    <div>
      <div className="flex items-baseline space-x-2">
        <span className="text-2xl font-semibold">{count}</span>
        <span className="text-sm font-medium">{title}</span>
      </div>
      <p className="text-sm text-gray-500">{period}</p>
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const colors = {
    PENDING: "text-blue-600 ",
    COMPLETED: "text-green-600 ",
    FAILED: "text-red-600 ",
  };

  return (
    <span
      className={`px-2.5 py-0.5  font-medium ${
        colors[status] || "text-gray-600"
      }`}
    >
      {capitalizeFirstLetter(status)}
    </span>
  );
};

// Sample data
const sampleData = [
  {
    id: 6,
    requestDate: "12 Dec 2024",
    fullName: "Barbara Ikeonyia",
    email: "bikeonyia@gmail.com",
    documentType: "Passport",
    nationality: "United Kingdom",
    expiryDate: "10 Sep 2026",
    status: "Pending",
  },
  {
    id: 6,
    requestDate: "12 Dec 2024",
    fullName: "Barbara Ikeonyia",
    email: "bikeonyia@gmail.com",
    documentType: "Passport",
    nationality: "United Kingdom",
    expiryDate: "10 Sep 2026",
    status: "Pending",
  },
  {
    id: 9,
    requestDate: "12 Dec 2024",
    fullName: "Barbara Ikeonyia",
    email: "bikeonyia@gmail.com",
    documentType: "Passport",
    nationality: "United Kingdom",
    expiryDate: "10 Sep 2026",
    status: "Completed",
  },
  // Add more sample data as needed
];

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const PageData = {
    name: "Dashboard",
    uri: location.pathname,
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    documentId: "",
  });
  const [localDraft, setLocalDraft] = useState(
    localStorage.getItem("draft") || null
  );
  const {
    data: isComppany,
    isLoading: isComppanyLoading,
    isFetching: isComppanyFetching,
    error: isComppanyError,
    refetch: isComppanyRefetch,
  } = useApiGet("/auth/get-company-setup-details");
  const {
    data: subPlan,
    isFetching: fetchingSubPlan,
    isLoading: loadingsubPlan,
    error: errorsubPlan,
    refetch: refetchsubPlan,
  } = useApiGet("/subscription-plans");

  const isDraft = useSelector((state) => state.isDraft);

  const [open, setOpen] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [openSummary, setOpenSummary] = useState(false);
  const [summaryData, setSummaryData] = useState(null);
  const handleOpenSummary = (data) => {
    setOpenSummary(true);
    setSummaryData(data);
  };
  const handleCloseSummary = () => {
    setOpenSummary(false);
    setSummaryData(null);
  };

  const [selected, setSelected] = useState(null);
  const [draft, setDraft] = useState(null);

  const dispatch = useDispatch();

  const handleSetupProfile = () => {
    if (isComppany.data.isCompany === false) {
      // handleOpenBusiness();
      navigate("/business_setup");
      // navigate("/business_setup?step=2")
    } else if (
      isComppany.data.isCompany &&
      isComppany.data.isDocument === false
    ) {
      navigate("/business_setup?step=2");
    } else {
      navigate("/business_setup");
    }
  };

  useEffect(() => {
    const updateDraft = () => {
      const newDraft = localStorage.getItem("draft") || "";
      console.log("LocalStorage draft updated:", newDraft);

      if (Object.values(JSON.parse(newDraft)).every((value) => value === "")) {
        console.log("jello");
      } else {
        if (Object.values(formData).every((value) => value === "")) {
          console.log("hhh");
        } else {
          console.log("hhjhj");
        }
      }
      console.log("jroo");

      setLocalDraft(newDraft);
    };

    // Overriding setItem to track changes
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key, value) {
      originalSetItem.apply(this, arguments);
      if (key === "draft") {
        updateDraft();
      }
    };

    return () => {
      localStorage.setItem = originalSetItem; // Reset on unmount
    };
  }, []);

  const handleExpand = () => {
    // setDraft(null);
    if (Object.values(formData).every((value) => value === "")) {
      toast.error(" Noting to save in draft.");
    } else {
      dispatch(setIsDraft(true));
      localStorage.setItem("draft", JSON.stringify(formData));

      toast.info("Details saved to draft.");
      handleClose();
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelected(null);
    setStep(1);
  };

  const handleOpenDraft = (id) => {
    setDraft(JSON.parse(localDraft));
    localStorage.removeItem("draft");
    localStorage.removeItem("isDraft");
    dispatch(setIsDraft(false));

    if (isComppany.data.isCompany === true) {
      setOpen(true);
      if (id) {
        setSelected(id);
      }
    } else {
      handleSetupProfile();
    }
  };

  const handleOpen = (id) => {
    setDraft(null);
    if (isComppany.data.isCompany === true) {
      setOpen(true);
      if (id) {
        setSelected(id);
      }
    } else {
      handleSetupProfile();
    }
  };

  const handleOpenCancel = (id) => {
    setOpenCancel(true);
    console.log(id);

    setSelected(id);
  };

  const handleCloseCancel = (id) => {
    setOpenCancel(false);

    setSelected(null);
  };

  const handleCancelVerification = async () => {
    setLoadingCancel(true);

    const response = await post(
      `/company/verification-requests/${selected?.id}/cancel`
    );

    if (response.success) {
      refetch();
      handleCloseCancel();
    } else {
      setLoadingCancel(false);
    }
    setLoadingCancel(false);
  };

  const [apiParams, setApiParams] = useState({
    // "q[status]": "",
    // "q[createdAt]": "",
    // "q[document.name]": "",
    "order[createdAt]": "",
  });

  const { post } = useApiPost();

  const {
    data: dashboardData,
    isFetching,
    isLoading,
    error,
    refetch,
  } = useApiGet("/company/dashboard", apiParams);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [step, setStep] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [processedData, setProcessedData] = useState([]);

  const [filters, setFilters] = useState({
    order: "DESC",
  });
  useEffect(() => {
    if (dashboardData?.success && dashboardData?.data?.verificationRequests) {
      const formattedData = dashboardData.data.verificationRequests.map(
        (item) => {
          // Format date from API timestamp
          const requestDate = new Date(item.createdAt || "").toLocaleDateString(
            "en-GB",
            {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }
          );

          return {
            id: item.id,
            DOB: item.DOB,
            documentId: item.documentId,
            countryCode: item.countryCode,
            requestDate: requestDate,
            fullName: `${item.firstName || ""} ${item.lastName || ""}`.trim(),
            email: item.email || "Not available",
            documentType: item.document?.name || "Not available",
            nationality: item.nationality || "Not available",
            expiryDate: item.expiresAt,
            status: item.status || "PENDING",
            requestType: item.requestType || "STANDARD",
            createdAt: item.createdAt, // Keep original date for sorting
          };
        }
      );

      setProcessedData(formattedData);
    }
  }, [dashboardData]);
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

    // console.log("response", response);

    // console.log("response", {...data, paymentId: response.data.payment.id});

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

  // Update API params when filters change
  useEffect(() => {
    const newParams = {};

    if (filters.order) {
      newParams["order[createdAt]"] = filters.order;
    }

    setApiParams(newParams);
  }, [filters]);

  const filteredData = processedData.filter((item) => {
    if (!searchTerm) return true;

    return Object.values(item).some(
      (val) =>
        typeof val === "string" &&
        val.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
  const hasData = filteredData?.length > 0;

  const sortedData = filteredData;

  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderEmptyState = () => (
    <div className="text-center py-12">
      <h3 className="text-xl font-semibold mb-2">
        You do not have any activity yet
      </h3>
      <p className="text-gray-500 font-normal mb-6">
        Start by sending your first request
      </p>
      <div className="flex  flex-row gap-4 justify-center">
        <Button
          onClick={() => handleOpen()}
          className="bg-black font-bold flex-1 max-w-[200px] hover:bg-black/90 text-white rounded-lg"
        >
          Request verification
        </Button>
        <Button
          // variant=""
          className="rounded-lg flex-1 max-w-[200px] font-bold bg-[#57B243] text-white border-green-200 hover:bg-green-100 hover:text-green-700"
        >
          Watch demo video
        </Button>
      </div>
    </div>
  );

  const renderSkeletonLoader = () => (
    <div className="rounded-lg border bg-white overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 font-medium text-base whitespace-nowrap text-[#363434]">
              S/N
            </TableHead>
            <TableHead className="w-12 font-medium text-base whitespace-nowrap text-[#363434]">
              Request date
            </TableHead>
            <TableHead className="w-12 font-medium text-base whitespace-nowrap text-[#363434]">
              Full name
            </TableHead>
            <TableHead className="w-12 font-medium text-base whitespace-nowrap text-[#363434]">
              Email address
            </TableHead>
            <TableHead className="w-12 font-medium text-base whitespace-nowrap text-[#363434]">
              Document type
            </TableHead>
            <TableHead className="w-12 font-medium text-base whitespace-nowrap text-[#363434]">
              Nationality
            </TableHead>
            <TableHead className="w-12 font-medium text-base whitespace-nowrap text-[#363434]">
              Expiry date
            </TableHead>
            <TableHead className="w-12 font-medium text-base whitespace-nowrap text-[#363434]">
              Status
            </TableHead>
            <TableHead className="w-12 font-medium text-base whitespace-nowrap text-[#363434]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <TableRow key={index}>
                {Array(9)
                  .fill(0)
                  .map((_, cellIndex) => (
                    <TableCell key={cellIndex} className="whitespace-nowrap">
                      <div className="h-5 bg-gray-200 rounded animate-pulse w-20"></div>
                    </TableCell>
                  ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );

  const renderDataTable = () => (
    <div className="rounded-lg border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 font-medium text-base whitespace-nowrap text-[#363434]">
              S/N
            </TableHead>
            <TableHead className="font-medium text-base whitespace-nowrap text-[#363434]">
              Request date
            </TableHead>
            <TableHead className="font-medium text-base whitespace-nowrap text-[#363434]">
              Full name
            </TableHead>
            <TableHead className="font-medium text-base whitespace-nowrap text-[#363434]">
              Email address
            </TableHead>
            <TableHead className="font-medium text-base whitespace-nowrap text-[#363434]">
              Document type
            </TableHead>
            <TableHead className="font-medium text-base whitespace-nowrap text-[#363434]">
              Nationality
            </TableHead>
            <TableHead className="font-medium text-base whitespace-nowrap text-[#363434]">
              Expiry date
            </TableHead>
            <TableHead className="font-medium text-base whitespace-nowrap text-[#363434]">
              Status
            </TableHead>
            <TableHead className="w-12 font-medium text-base whitespace-nowrap text-[#363434]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {error ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-8 text-red-500">
                <div className="flex flex-col items-center gap-2">
                  <p>Error loading data. Please try again.</p>
                  <Button variant="outline" size="sm" onClick={() => refetch()}>
                    <Refresh className="mr-2 h-4 w-4" /> Retry
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ) : paginatedData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-8">
                No verification requests found.
              </TableCell>
            </TableRow>
          ) : (
            paginatedData.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell
                  onClick={() => handleOpenSummary(item)}
                  className="whitespace-nowrap"
                >
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </TableCell>
                <TableCell
                  onClick={() => handleOpenSummary(item)}
                  className="whitespace-nowrap"
                >
                  {item.requestDate}
                </TableCell>
                <TableCell
                  onClick={() => handleOpenSummary(item)}
                  className="whitespace-nowrap"
                >
                  {item.fullName}
                </TableCell>
                <TableCell
                  onClick={() => handleOpenSummary(item)}
                  className="whitespace-nowrap"
                >
                  {item.email}
                </TableCell>
                <TableCell
                  onClick={() => handleOpenSummary(item)}
                  className="whitespace-nowrap"
                >
                  {item.documentType}
                </TableCell>
                <TableCell
                  onClick={() => handleOpenSummary(item)}
                  className="whitespace-nowrap"
                >
                  {item.nationality}
                </TableCell>
                <TableCell
                  onClick={() => handleOpenSummary(item)}
                  className="whitespace-nowrap"
                >
                  {formatDateString(item.expiryDate)}
                </TableCell>
                <TableCell
                  onClick={() => handleOpenSummary(item)}
                  className="whitespace-nowrap"
                >
                  <span
                    className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                      item.status === "COMPLETED" || item.status === "Completed"
                        ? "bg-green-50 text-green-700"
                        : item.status === "CANCELLED"
                        ? "bg-red-50 text-red-700"
                        : "bg-blue-50 text-blue-700"
                    )}
                  >
                    {item.status === "COMPLETED"
                      ? "Completed"
                      : capitalizeFirstLetter(item.status)}
                  </span>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => navigate(`/user/documents/${item.id}`)}
                      >
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleOpen(item)}>
                        Resend
                      </DropdownMenuItem>
                      {item.status === "PENDING" && (
                        <DropdownMenuItem
                          onClick={() => handleOpenCancel(item)}
                          className="text-red-500"
                        >
                          Cancel
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {paginatedData.length > 0 && (
        <div className="flex items-center flex-wrap-reverse  gap-4 justify-between px-4 py-4 border-t">
          <div className="flex m-auto md:m-0  items-center gap-2">
            {/* <span className="text-sm text-gray-500">
              Page {currentPage} of {totalPages || 1}
            </span>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 hidden md:block"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                {"<<"}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 hidden md:block"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                {"<"}
              </Button>
              {Array.from(
                { length: Math.min(5, totalPages) },
                (_, i) => i + 1
              ).map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? "secondary" : "outline"}
                  size="icon"
                  className="w-8 h-8"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
              {totalPages > 5 && <span className="px-2">...</span>}
              {totalPages > 5 && (
                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8"
                  onClick={() => setCurrentPage(totalPages)}
                >
                  {totalPages}
                </Button>
              )}
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 hidden md:block"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages || 1))
                }
                disabled={currentPage === totalPages || totalPages === 0}
              >
                {">"}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 hidden md:block"
                onClick={() => setCurrentPage(totalPages || 1)}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                {">>"}
              </Button>
            </div> */}
          </div>

          <div className="flex flex-1 max-w-[250px] m-auto md:m-0  justify-end   gap-4">
            {isDraft && (
              <>
                <Button
                  className="hidden md:flex"
                  onClick={() => handleOpenDraft()}
                  variant="outline"
                >
                  <DashBoardFileIcon />
                  Draft
                </Button>
                <Button
                  className="flex md:hidden "
                  onClick={() => handleOpenDraft()}
                  variant="outline"
                >
                  <DashBoardFileIcon />
                </Button>
              </>
            )}

            <Button
              onClick={() => (window.location.href = "/user/documents")}
              variant="ghost"
              className="border"
            >
              View More
            </Button>
          </div>
        </div>
      )}
      {/* <div className="flex items-center justify-end px-4 py-4 border-t">
        <Button
          onClick={() => navigate("/user/documents")}
          variant="outline"
          className=" border border-black rounded-xl"
        >
          View More
        </Button>
      </div> */}
    </div>
  );

  return (
    <div className="space-y-6">
      {loading && (
        <div className=" justify-center left-0 absolute items-center flex w-full bg-[#11080869] bottom-0 z-50 h-[100dvh]">
          <div className="loader"></div>
        </div>
      )}
      <div className="  flex flex-col md:flex-row justify-between mb-8 gap-8 flex-wrap  ">
        <h1 className="font-semibold text-2xl">Dashboard overview</h1>
        <Button
          onClick={() => handleOpen()}
          className="bg-black font-bold max-w-[200px] hover:bg-black/90 text-white rounded-lg"
        >
          Request verification
        </Button>
      </div>
      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatusCard
          title="Requested"
          count={dashboardData?.data?.totalRequest ?? 0}
          period="in the last 28 days"
        />
        <StatusCard
          title="Pending"
          count={dashboardData?.data?.pendingRequest ?? 0}
          period="in the last 28 days"
        />
        <StatusCard
          title="Completed"
          count={dashboardData?.data?.totalCompletedRequest ?? 0}
          period="in the last 28 days"
        />
      </div>

      {/* Recent Activity */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <p className="text-sm text-gray-500">Verification updates</p>
          </div>
          <div className="flex  md:flex-row gap-4 md:items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <Input
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 rounded-xl"
              />
            </div>
            <div className="flex  items-center gap-2">
              <span className="text-sm w-fit flex-1   min-w-[50px] text-gray-500">
                Sort by:
              </span>
              <Select
                value={filters.order}
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, order: value }))
                }
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DESC">Newest</SelectItem>
                  <SelectItem value="ASC">Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {isLoading
          ? renderSkeletonLoader()
          : hasData
          ? renderDataTable()
          : renderEmptyState()}
      </div>

      <Modal
        open={open}
        sx={{
          zIndex: "30",
        }}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-end p-4 gap-4">
            {" "}
            {!selected && (
              <img src={Expand} alt="" srcset="" onClick={handleExpand} />
            )}
            <CloseIcon onClick={handleClose} />
          </div>

          <div className=" py-6 px-4 max-h-[70vh] overflow-auto">
            {step === 1 ? (
              <VerificationRequest
                setSelected={setSelected}
                setFormDataFunc={setFormData}
                draftData={draft}
                refetch={refetch}
                selected={selected}
                onClick={() => setStep(2)}
              />
            ) : (
              <PaymentPlan
                chooseAnother={() => {
                  localStorage.setItem("PageData", JSON.stringify(PageData));
                  localStorage.setItem("noSubData", JSON.stringify(formData));
                  navigate("/user/pricing_plan");
                }}
                amount={
                  subPlan?.data?.subscriptionPlans?.filter(
                    (item) => item?.billingType === "PAY_AS_YOU_GO"
                  )[0].prices[0].discountedAmount
                }
                onclick={() => {
                  localStorage.setItem("PageData", JSON.stringify(PageData));

                  localStorage.setItem("noSubData", JSON.stringify(formData));
                  handleCreatePayment();
                }}
              />
            )}
          </div>
        </Box>
      </Modal>

      <Modal
        open={openCancel}
        sx={{
          zIndex: "30",
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, p: 4, textAlign: "center", maxWidth: "350px" }}>
          Are you sure you want to cancel verification of {selected?.fullName} ?
          {loadingCancel ? (
            <div className="flex mt-6 gap-2">
              <Button
                disabled
                variant="ghost"
                className="flex-1 border  bg-none "
              >
                Please Wait...
              </Button>
            </div>
          ) : (
            <div className="flex mt-6 gap-2">
              <Button
                onClick={() => handleCloseCancel()}
                variant="ghost"
                className="flex-1 border border-green-950 bg-none "
              >
                No, Close
              </Button>
              <Button
                onClick={() => handleCancelVerification()}
                className="flex-1"
              >
                Yes, Continue
              </Button>
            </div>
          )}
        </Box>
      </Modal>

      <SummaryModal
        open={openSummary}
        data={summaryData}
        handleClose={handleCloseSummary}
      />
    </div>
  );
}
