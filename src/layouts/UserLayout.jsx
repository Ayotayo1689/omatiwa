"use client";

import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  LayoutGrid,
  FileText,
  CreditCard,
  LogOutIcon,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import BigLogo from "../asset/BigLogo.svg";
import {
  BillingIcon,
  DashBoardFileIcon,
  DashBoardIcon,
  HamburgerIcon,
  WarningIcon,
} from "@/icons/icons";
import { Box, Modal } from "@mui/material";
import { getFirstLetterCapitalized } from "@/utils/tokenManager";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useApiGet } from "@/hooks/useApi";
import { capitalizeFirstLetter } from "@/utils/formatDate";
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

const NavItem = ({ icon: Icon, label, to, active }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className={`w-full  flex items-center font-medium text-lg space-x-3 px-4 py-3 rounded-lg ${
        active ? "bg-[#0A3B25] text-white" : "text-[#0F0F0F] hover:bg-gray-100"
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );
};

export default function UserLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const companyInfo = JSON.parse(localStorage.getItem("companyInfo"));
  console.log(companyInfo);
  const companyName = localStorage.getItem("companyName");

  // const userName = localStorage.getItem("userInfo")
  // const companyName = localStorage.getItem("companyInfo")
  // Determine active route based on current path
  const getActiveRoute = (path) => {
    if (path.includes("/dashboard")) return "dashboard";
    if (path.includes("/documents")) return "documents";
    if (path.includes("/billings")) return "billings";
    return "dashboard"; // Default
  };

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openBusiness, setOpenBusiness] = useState(false);
  const activeRoute = getActiveRoute(location.pathname);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (id) => {
    setIsMobileMenuOpen(false);
    setOpen(true);
  };

  const handleCloseBusiness = () => {
    setOpenBusiness(false);
  };

  const handleOpenBusiness = (id) => {
    setOpenBusiness(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const { data, isLoading, isFetching, error, refetch } = useApiGet(
    "/auth/get-company-setup-details"
  );

  useEffect(() => {
    console.log(data?.data);
  }, [data]);

  const handleSetupProfile = () => {
    if (data.data.isDocument) {
      handleOpenBusiness();

      // navigate("/business_setup?step=2")
    } else if (data.data.isCompany && data.data.isDocument === false) {
      navigate("/business_setup?step=2");
    } else {
      navigate("/business_setup");
    }
  };

  const renderSidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center space-x-2 p-4">
        <div className="">
          <img
            src={BigLogo || "/placeholder.svg"}
            alt="VYC Logo"
            className="md:mx-auto "
          />
        </div>
      </div>
      <nav className="flex-1 p-4   relative space-y-4">
        {data?.data?.isCompany &&
          (companyInfo ? (
            <div className="flex items-center mb-6 gap-2">
              <div className="ml-2 w-10 h-10  rounded-full bg-[#57B243] flex items-center justify-center text-white text-base font-bold">
                {getFirstLetterCapitalized(companyInfo?.name)}
              </div>
              <span className="text-base capitalize font-medium">
                {" "}
                {capitalizeFirstLetter(companyInfo?.name)}
              </span>
            </div>
          ) : (
            companyName && (
              <div className="flex items-center mb-6 gap-2">
                <div className="ml-2 w-10 h-10 rounded-full bg-[#57B243] flex items-center justify-center text-white text-base font-bold">
                  {getFirstLetterCapitalized(companyName)}
                </div>
                <span className="text-base font-medium">
                  {" "}
                  {capitalizeFirstLetter(companyName)}
                </span>
              </div>
            )
          ))}

        <NavItem
          icon={DashBoardIcon}
          label="Dashboard"
          to="/user"
          active={activeRoute === "dashboard"}
        />
        <NavItem
          icon={DashBoardFileIcon}
          label="Documents"
          to="/user/documents"
          active={activeRoute === "documents"}
        />
        <NavItem
          icon={BillingIcon}
          label="Billings"
          to="/user/billings"
          active={activeRoute === "billings"}
        />

        <Button
          onClick={() => handleOpen()}
          variant="ghost"
          className="absolute bottom-6 text-red-500 flex items-center gap-6 font-bold "
        >
          {" "}
          <LogOutIcon /> Logout
        </Button>
      </nav>
    </div>
  );

  return (
    <div className="min-h-screen relative bg-gray-50">
      {/* {
        <div className="absolute w-[100vw] h-full flex justify-center items-center bg-[#ffffffa1] z-50">
          <span className="loader"></span>
        </div>
      } */}
      {/* Desktop Sidebar */}
      <div className="p-3 hidden md:fixed md:inset-y-0 md:flex md:w-80 md:flex-col bg-white border-r">
        {renderSidebarContent()}
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <div className="md:hidden fixed p-2 top-4 left-4 z-40">
            <HamburgerIcon />
          </div>
        </SheetTrigger>
        <SheetContent side="left" className="p-0  max-w-[260px]">
          {renderSidebarContent()}
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="md:pl-80 flex flex-col min-h-screen">
        <header className="bg-white border-b sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="">
              <img
                src={BigLogo || "/placeholder.svg"}
                alt="VYC Logo"
                className="md:mx-auto relative w-20 left-10 flex md:hidden"
              />
            </div>

            {/* <Button className="bg-[#57B243] hover:bg-[#57B243] text-white text-base font-bold rounded-full">
              {getFirstLetterCapitalized(userInfo?.firstName)}
            </Button> */}
            <Popover>
              <PopoverTrigger asChild>
                <Button className="bg-[#57B243] hover:bg-[#57B243] text-white text-base font-bold rounded-full">
                  {getFirstLetterCapitalized(userInfo?.firstName)}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-2 shadow-lg rounded-lg bg-white">
                <button
                  onClick={() => handleSetupProfile()}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md text-sm font-medium"
                >
                  Setup Business
                </button>
              </PopoverContent>
            </Popover>
          </div>
        </header>

        <main className="flex-1 bg-[#e7e7e74f] p-4 md:p-6">
          <Outlet />
        </main>

        {/* Mobile Footer */}
        {/* <FooterComp /> */}
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
          {/* <img src={Waring} alt="" className=" m-auto mb-6" /> */}

          <div className="flex justify-center items-center mb-6">
            {" "}
            <WarningIcon />
          </div>
          <h2 className="text-xl text-center font-medium mb-2">
            Are you sure you want to <br /> logout?
          </h2>
          <div className="flex gap-4">
            <Button
              onClick={() => handleClose()}
              variant="outline"
              className="border border-black w-full mt-4"
            >
              No, Cancel
            </Button>

            <Button onClick={() => handleLogout()} className="w-full mt-4">
              Yes, Continue
            </Button>
          </div>
        </Box>
      </Modal>

      <Modal
        open={openBusiness}
        sx={{
          zIndex: "30",
        }}
        onClose={handleCloseBusiness}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <img src={Waring} alt="" className=" m-auto mb-6" /> */}

          <div className="flex justify-center items-center mb-6">
            {" "}
            <WarningIcon />
          </div>
          <h2 className="text-xl text-center font-medium mb-2">
            Business already setup
          </h2>
          <div className="flex gap-4">
            <Button
              onClick={() => handleCloseBusiness()}
              variant="outline"
              className="border border-black w-full mt-4"
            >
              Ok, close
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
