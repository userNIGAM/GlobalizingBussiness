import ToggleSwitch from "../ToggleSwitch";

export default function SecurityTab({ security, setSecurity }) {
  return (
    <div className="space-y-6">
      <Row
        title="Two-Factor Authentication"
        desc="Add an extra layer of security"
        value={security.twoFactor}
        onChange={(v) => setSecurity({ ...security, twoFactor: v })}
      />

      <Row
        title="Login Alerts"
        desc="Get notified of new sign-ins"
        value={security.loginAlerts}
        onChange={(v) => setSecurity({ ...security, loginAlerts: v })}
      />

      <button className="w-full px-4 py-3 text-blue-600 bg-blue-50 rounded-xl">
        Change Password
      </button>
    </div>
  );
}

function Row({ title, desc, value, onChange }) {
  return (
    <div className="flex justify-between p-4 bg-white/50 border rounded-xl">
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
      <ToggleSwitch checked={value} onChange={onChange} />
    </div>
  );
}
