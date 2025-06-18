"use client";

import { useState, useEffect } from "react";
import { Search, Filter, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CloseIcon from "@mui/icons-material/Close";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Expand from "../../asset/expand.svg";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Modal } from "@mui/material";
import VerificationRequest from "@/components/VerificationRequest";
import PaymentPlan from "@/components/PaymentPlan";
import { useApiGet, useApiPost } from "@/hooks/useApi";
import { RefreshCwIcon as Refresh } from "lucide-react";
import { toast } from "react-toastify";
import { encrypt } from "@/utils/encryption";
import { DashBoardFileIcon } from "@/icons/icons";
import { useDispatch, useSelector } from "react-redux";
import { setIsDraft } from "@/features/draft/draftSlice";
import SummaryModal from "@/components/SummaryModal";
import { Close } from "@mui/icons-material";
import { formatDateString } from "@/utils/formatDate";

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

export default function Documents() {
  const navigate = useNavigate();
  const location = useLocation();

  const PageData = {
    name: "Documents",
    uri: location.pathname,
  };
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [draft, setDraft] = useState(null);
  const [step, setStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    documentType: "",
    order: "DESC",
    status: {
      completed: false,
      pending: false,
    },
    date: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
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
  const [localDraft, setLocalDraft] = useState(
    localStorage.getItem("draft") || null
  );
  // API parameters
  const [apiParams, setApiParams] = useState({
    "q[status]": "",
    "q[createdAt]": "",
    "q[document.name]": "",
    "order[createdAt]": "",
  });

  // Fetch verification requests from API
  const {
    data: dashboardData,
    isFetching,
    isLoading,
    error,
    refetch,
  } = useApiGet(
    "/company/verification-requests?&page=1&limit=1000000",
    apiParams
  );

  const {
    data: isComppany,
    isLoading: isComppanyLoading,
    isFetching: isComppanyFetching,
    error: isComppanyError,
    refetch: isComppanyRefetch,
  } = useApiGet("/auth/get-company-setup-details");
  const [loading, setLoading] = useState(false);

  // Fetch document types
  const {
    data: documentsData,
    isFetching: fetchingDocumentsData,
    error: errorDocumentsData,
    refetch: refetchDocumentsData,
  } = useApiGet("/documents");

  const isDraft = useSelector((state) => state.isDraft);

  // Process the API response data
  const [openCancel, setOpenCancel] = useState(false);
  const [loadingCancel, setLoadingCancel] = useState(false);

  const [processedData, setProcessedData] = useState([]);

  // Calculate total pages based on processed data
  const totalPages = Math.ceil((processedData?.length || 0) / itemsPerPage);

  // Update API params when filters change
  useEffect(() => {
    const newParams = {};

    // Status filter
    if (filters.status.completed && filters.status.pending) {
      newParams["q[status]"] = "PENDING OR COMPLETED";
    } else if (filters.status.completed) {
      newParams["q[status]"] = "COMPLETED";
    } else if (filters.status.pending) {
      newParams["q[status]"] = "PENDING";
    }

    // Document type filter
    if (filters.documentType) {
      newParams["q[document.name]"] = filters.documentType;
    }

    if (filters.order) {
      newParams["order[createdAt]"] = filters.order;
    }

    // Date filter
    if (filters.date) {
      const date = new Date(filters.date);
      if (!isNaN(date.getTime())) {
        newParams["q[createdAt]"] = date.toISOString();
      }
    }

    setApiParams(newParams);
  }, [filters]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    documentId: "",
    nationality: "",
    DOB: "",
  });
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

  // Process API data when it changes
  useEffect(() => {
    if (dashboardData?.success && dashboardData?.data?.verificationRequests) {
      const formattedData = dashboardData?.data?.verificationRequests?.map(
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

  const dispatch = useDispatch();

  // Filter data based on search term
  const filteredData = processedData.filter((item) => {
    if (!searchTerm) return true;

    return Object.values(item).some(
      (val) =>
        typeof val === "string" &&
        val.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Sort data based on sortBy
  const sortedData = filteredData;
  // Paginate data
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
    setSelectedId(null);
    setStep(1);
  };

  // const handleOpenDraft = () => {
  //   setDraft(JSON.parse(localDraft));
  //   handleOpen();
  // };

  const handleOpenDraft = (id) => {
    setDraft(JSON.parse(localDraft));
    localStorage.removeItem("draft");
    localStorage.removeItem("isDraft");
    dispatch(setIsDraft(false));

    if (isComppany.data.isCompany === true) {
      setOpen(true);
      if (id) {
        setSelectedId(id);
      }
    } else {
      handleSetupProfile();
    }
  };

  const handleOpenCancel = (id) => {
    setOpenCancel(true);
    setSelectedId(id);
  };
  const handleCloseCancel = (id) => {
    setOpenCancel(false);

    setSelected(null);
  };

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

  const handleOpen = (id) => {
    setDraft(null);
    if (isComppany.data.isCompany === true) {
      setOpen(true);
      if (id) {
        setSelectedId(id);
      }
    } else {
      handleSetupProfile();
    }
  };

  const handleCancelVerification = async () => {
    setLoadingCancel(true);

    const response = await post(
      `/company/verification-requests/${selectedId?.id}/cancel`
    );

    if (response.success) {
      refetch();
      handleCloseCancel();
    } else {
      setLoadingCancel(false);
    }
    setLoadingCancel(false);
  };

  const { post } = useApiPost();

  const {
    data: subPlan,
    isFetching: fetchingSubPlan,
    isLoading: loadingsubPlan,
    error: errorsubPlan,
    refetch: refetchsubPlan,
  } = useApiGet("/subscription-plans");

  useEffect(() => {
    console.log(subPlan?.data?.subscriptionPlans);

    const filteredData = subPlan?.data?.subscriptionPlans?.filter(
      (item) => item?.billingType === "PAY_AS_YOU_GO"
    )[0];

    console.log(filteredData);
  }, [subPlan]);

  // useEffect(() => {
  //  console.log(formData);

  // }, [formData])

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

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleFilter = () => {
    setIsFilterOpen(false);
    setCurrentPage(1); // Reset to first page when applying filters
    refetch();
  };

  const clearFilters = () => {
    setFilters({
      documentType: "",
      // order:"",
      status: {
        completed: false,
        pending: false,
      },
      date: "",
    });
    setApiParams({
      // "order[createdAt]": "",
      "q[status]": "",
      "q[createdAt]": "",
      "q[document.name]": "",
    });
    setCurrentPage(1); // Reset to first page when clearing filters
    refetch();
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.documentType) count++;
    if (filters.status.completed || filters.status.pending) count++;
    if (filters.date) count++;
    return count;
  };

  // Helper function to capitalize first letter
  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const renderEmptyState = () => (
    <div className="text-center py-24 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Nothing in documents yet</h3>
      <p className="text-gray-500 mb-6">Start by sending your first request</p>
      <Button
        className="bg-black hover:bg-black/90 rounded-full"
        onClick={() => handleOpen()}
      >
        Request verification
      </Button>
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

  const renderTable = () => (
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
            <span className="text-sm text-gray-500">
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
            </div>
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

            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => {
                const newItemsPerPage = Number.parseInt(value);
                setItemsPerPage(newItemsPerPage);
                setCurrentPage(1); // Reset to first page when changing items per page
              }}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue>{itemsPerPage} / Page</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 / Page</SelectItem>
                <SelectItem value="20">20 / Page</SelectItem>
                <SelectItem value="50">50 / Page</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {loading && (
        <div className=" justify-center left-0 absolute items-center flex w-full bg-[#11080869] bottom-0 z-50 h-[100dvh]">
          <div className="loader"></div>
        </div>
      )}
      <div className="flex flex-col md:flex-row justify-between mb-8 gap-8 flex-wrap">
        <h1 className="font-semibold text-2xl">Documents</h1>
        <Button
          onClick={() => handleOpen()}
          className="bg-black font-bold max-w-[200px] hover:bg-black/90 text-white rounded-lg"
        >
          Request verification
        </Button>
      </div>

      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-9 max-w-[300px]"
            />
          </div>
        </div>

        <div className="flex items-end justify-end gap-4 flex-wrap">
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2 rounded-md">
                <Filter className="h-4 w-4" />
                {getActiveFiltersCount() > 0
                  ? `${getActiveFiltersCount()} filters applied`
                  : "Filter"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="start">
              <div className="p-4 flex items-center justify-between border-b">
                <h3 className="font-semibold text-lg">Filter</h3>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    className="text-[#57B243]"
                    onClick={handleFilter}
                  >
                    Save filter
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-[#1035D9]"
                    onClick={clearFilters}
                  >
                    Clear
                  </Button>
                </div>
              </div>
              <div className="p-4 space-y-6">
                <div className="space-y-2 border-b pb-4">
                  <label className="text-sm font-medium">Document Type</label>
                  <Select
                    value={filters.documentType}
                    onValueChange={(value) =>
                      setFilters((prev) => ({ ...prev, documentType: value }))
                    }
                  >
                    <SelectTrigger className="rounded-[12px] py-6">
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      {fetchingDocumentsData ? (
                        <SelectItem value="loading" disabled>
                          Loading document types...
                        </SelectItem>
                      ) : errorDocumentsData ? (
                        <div className="p-2 flex flex-col gap-2">
                          <p className="text-red-500 text-sm">
                            Failed to load document types
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() => refetchDocumentsData()}
                          >
                            <Refresh className="mr-2 h-4 w-4" /> Try again
                          </Button>
                        </div>
                      ) : (
                        documentsData?.data?.documents?.map((document) => (
                          <SelectItem key={document.id} value={document.name}>
                            {document.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Verification status
                  </label>
                  <div className="border-b pb-4 flex gap-4 items-center">
                    <div className="flex items-center border py-2 px-3 flex-1 rounded-2xl space-x-2">
                      <Checkbox
                        id="completed"
                        checked={filters.status.completed}
                        onCheckedChange={(checked) =>
                          setFilters((prev) => ({
                            ...prev,
                            status: { ...prev.status, completed: checked },
                          }))
                        }
                        className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                      />
                      <label htmlFor="completed" className="text-sm">
                        Completed
                      </label>
                    </div>
                    <div className="flex items-center border py-2 px-3 flex-1 rounded-2xl space-x-2">
                      <Checkbox
                        id="pending"
                        checked={filters.status.pending}
                        onCheckedChange={(checked) =>
                          setFilters((prev) => ({
                            ...prev,
                            status: { ...prev.status, pending: checked },
                          }))
                        }
                        className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                      />
                      <label htmlFor="pending" className="text-sm">
                        Pending
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 flex flex-col">
                  <label className="text-sm font-medium">Date</label>
                  <input
                    className="border p-2 rounded-xl"
                    type="date"
                    value={filters.date}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        date: e.target.value,
                      }))
                    }
                    placeholder="YYYY-MM-DD"
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort by:</span>
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
        : processedData.length === 0
        ? renderEmptyState()
        : renderTable()}

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
            <img src={Expand} alt="" srcset="" onClick={handleExpand} />{" "}
            <CloseIcon onClick={handleClose} />
          </div>

          <div className=" py-6 px-4 max-h-[70vh] overflow-auto">
            {step === 1 ? (
              <VerificationRequest
                setFormDataFunc={setFormData}
                draftData={draft}
                closed={open}
                refetch={refetch}
                selected={selectedId}
                onClick={() => setStep(2)}
                setSelected={setSelectedId}
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
          Are you sure you want to cancel verification of {selectedId?.fullName}{" "}
          ?
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
