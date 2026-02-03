/* eslint-disable no-unused-vars */

import { motion, AnimatePresence } from "framer-motion";
import ProfileTabContent from "../ProfileTabContent";
import Logout from "./tabs/profile/Logout";

const tabMap = {
  profile: ProfileTabContent,
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
