import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import cookies from "js-cookie";

// Data
import { AdminRoles } from "data/constants";

// Properties
import properties from "properties.json";

// Assets
import { angleDownIcon, barsIcon, closeIcon, logoutIcon } from "helpers/icons";

// Routes
import routes from "data/routes";

const Sidebar = () => {
  const navigate = useNavigate();
  const { loggedAdmin } = useSelector((state) => state.dataReducer);
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubOpened, setIsSubOpened] = useState({});

  const pathnameWithoutSlash =
    pathname.endsWith("/") && pathname.length > 1
      ? pathname.slice(0, -1)
      : pathname;

  const changePage = (e, path) => {
    e.preventDefault();
    setIsOpen(false);
    navigate(path);
  };

  const logout = (e) => {
    e.preventDefault();
    cookies.remove(properties.storage.cookie_name);
    navigate("/login");
  };

  const pages = routes.map((page) => {
    const isAllowed = page.allowedRoles.includes(loggedAdmin.role);

    const children = page.subPages?.map((child) => {
      const isSubAllowed = child.allowedRoles.includes(loggedAdmin.role);

      return (
        isSubAllowed && (
          <a
            key={child.name}
            className={`${
              child.path === pathnameWithoutSlash
                ? "text-primary border-r-4 border-primary"
                : "text-gray-500 dark:text-gray-200 hover:text-secondary"
            } w-full font-thin uppercase flex items-center p-4 my-2 transition-colors duration-200 justify-start`}
            href={child.path}
            onClick={(e) => changePage(e, child.path)}
          >
            <span className="text-left">{child.icon}</span>
            <span className="mx-4 text-sm font-normal">{child.name}</span>
          </a>
        )
      );
    });

    return (
      isAllowed && (
        <div>
          <a
            key={page.name}
            className={`${
              page.path === pathnameWithoutSlash
                ? "text-primary bg-gradient-to-r from-white to-blue-100 dark:from-gray-700 dark:to-gray-800 border-r-4 border-primary"
                : "text-gray-500 dark:text-gray-200 hover:text-secondary"
            } w-full font-thin uppercase flex items-center p-4 my-2 transition-colors duration-200 justify-start relative cursor-pointer`}
            href={page.path}
            onClick={(e) =>
              page.path
                ? changePage(e, page.path)
                : setIsSubOpened({
                    ...isSubOpened,
                    [page.name]: !isSubOpened[page.name],
                  })
            }
          >
            {page.subPages && (
              <div
                className={`absolute right-4 top-[50%] -translate-y-1/2 transition-all duration-200 ${
                  isSubOpened[page.name] && "rotate-180"
                }`}
              >
                {angleDownIcon()}
              </div>
            )}
            <span className="text-left">{page.icon}</span>
            <span className="mx-4 text-sm font-normal">{page.name}</span>
          </a>
          {isSubOpened[page.name] && (
            <div className="pl-3 bg-[#f3f3f3]">{children}</div>
          )}
        </div>
      )
    );
  });

  useEffect(() => {
    routes.forEach((page) => {
      if (page.subPages) {
        setIsSubOpened({
          ...isSubOpened,
          [page.name]: false,
        });
      }
    });
  }, []);

  return (
    <div
      className={`h-screen rounded-2xl lg:block transition-all fixed shadow-2xl lg:shadow-xl w-72 lg:left-[16px] z-50 ${
        isOpen ? "left-0" : "-left-72"
      }`}
    >
      <button
        className={`lg:hidden block absolute transition-all ${
          isOpen ? "right-3" : "-right-24"
        } top-3 px-4 py-2 text-white bg-primary rounded-full shadow-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-blue-200`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? closeIcon("", 23, 23) : barsIcon("", 23, 23)}
      </button>
      <div className="bg-white h-full rounded-2xl dark:bg-gray-700">
        <div className="flex items-center justify-center pt-6 mb-8">
          <img
            src={require(`assets/${properties.appearence.logo}`)}
            alt="Timezones App"
            className="max-w-[180px] max-h-48 relative lg:left-0 left-[-25px]"
          />
        </div>
        <nav className="mt-6">
          <div>
            {pages}
            <a
              href="/"
              className="text-gray-500 dark:text-gray-200 hover:text-primary w-full font-thin uppercase flex items-center p-4 my-2 transition-colors duration-200 justify-start"
              onClick={(e) => logout(e)}
            >
              <span className="text-left">{logoutIcon()}</span>
              <span className="mx-4 text-sm font-normal">Logout</span>
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
