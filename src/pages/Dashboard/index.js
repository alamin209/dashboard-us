import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Actions
import { saveDashboardData } from "../../store/actions";

// Components
import Header from "../../shared/Header";
import Counter from "./Counter";
import Loading from "../../shared/Loading";

// Icons
import { userIcon, clockIcon } from "../../helpers/icons";

const Dashboard = () => {
  return (
    <div>
      <Header title="Dashboard" />

      <div className="lg:flex block gap-4">
        <Counter
          title="Users"
          todayCount={98}
          totalCount={254}
          icon={userIcon("text-primary", 20, 20)}
          iconBg="bg-primary-dimmed"
        />
        <Counter
          title="Timezones"
          todayCount={98}
          totalCount={254}
          icon={clockIcon(`text-purple-500`, 20, 20)}
          iconBg="bg-purple-200"
        />
      </div>
    </div>
  );
};

export default Dashboard;
