import ToggleSwitch from "../ToggleSwitch";

export default function PrivacyTab({ privacy, setPrivacy }) {
  return (
    <div className="space-y-6">
      <Row
        title="Data Sharing"
        desc="Allow sharing data with third-party partners"
        value={privacy.dataSharing}
        onChange={(v) => setPrivacy({ ...privacy, dataSharing: v })}
      />

      <Row
        title="Analytics & Tracking"
        desc="Help us improve by allowing usage analytics"
        value={privacy.analytics}
        onChange={(v) => setPrivacy({ ...privacy, analytics: v })}
      />

      <button className="w-full px-4 py-3 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition">
        Download My Data
      </button>

      <button className="w-full px-4 py-3 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition">
        Delete Account
      </button>
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
