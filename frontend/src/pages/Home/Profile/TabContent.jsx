/* eslint-disable no-unused-vars */

import { motion, AnimatePresence } from "framer-motion";
import ProfileTab from "./tabs/ProfileTab";
import AccountTab from "./tabs/AccountTab";
import SecurityTab from "./tabs/SecurityTab";
import VisibilityTab from "./tabs/VisibilityTab";
import PrivacyTab from "./tabs/PrivacyTab";
import NotificationsTab from "./tabs/NotificationsTab";
import Logout from "./tabs/Logout";

const tabMap = {
  profile: ProfileTab,
  account: AccountTab,
  security: SecurityTab,
  visibility: VisibilityTab,
  privacy: PrivacyTab,
  notifications: NotificationsTab,
  Logout: Logout,
};

export default function TabContent(props) {
  const { activeTab } = props;
  const ActiveTab = tabMap[activeTab];

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <ActiveTab {...props} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
