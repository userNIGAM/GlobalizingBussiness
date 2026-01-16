import ToggleSwitch from "../ToggleSwitch";

export default function NotificationsTab({ notifications, setNotifications }) {
  return (
    <div className="space-y-6">
      <Row
        title="Email Notifications"
        desc="Receive updates and alerts via email"
        value={notifications.emailNotif}
        onChange={(v) => setNotifications({ ...notifications, emailNotif: v })}
      />

      <Row
        title="Push Notifications"
        desc="Get instant notifications on your device"
        value={notifications.pushNotif}
        onChange={(v) => setNotifications({ ...notifications, pushNotif: v })}
      />

      <Row
        title="Weekly Digest"
        desc="Get a summary of your activity every week"
        value={notifications.weeklyDigest}
        onChange={(v) =>
          setNotifications({ ...notifications, weeklyDigest: v })
        }
      />
    </div>
  );
}

function Row({ title, desc, value, onChange }) {
  return (
    <div className="flex justify-between p-4 bg-white/50 border border-gray-300/50 rounded-xl">
      <div>
        <h4 className="font-medium text-gray-900">{title}</h4>
        <p className="text-sm text-gray-500 mt-1">{desc}</p>
      </div>
      <ToggleSwitch checked={value} onChange={onChange} />
    </div>
  );
}
