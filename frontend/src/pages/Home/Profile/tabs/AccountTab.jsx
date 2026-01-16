export default function AccountTab({ accountPrefs, setAccountPrefs }) {
  const handleChange = (key, value) => {
    setAccountPrefs((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <Select
        label="Language"
        value={accountPrefs.language}
        onChange={(v) => handleChange("language", v)}
        options={[
          ["english", "English"],
          ["spanish", "Spanish"],
          ["french", "French"],
          ["german", "German"],
        ]}
      />

      <Select
        label="Timezone"
        value={accountPrefs.timezone}
        onChange={(v) => handleChange("timezone", v)}
        options={[
          ["UTC", "UTC"],
          ["EST", "Eastern Time"],
          ["PST", "Pacific Time"],
          ["CST", "Central Time"],
        ]}
      />

      <Select
        label="Date Format"
        value={accountPrefs.dateFormat}
        onChange={(v) => handleChange("dateFormat", v)}
        options={[
          ["MM/DD/YYYY", "MM/DD/YYYY"],
          ["DD/MM/YYYY", "DD/MM/YYYY"],
          ["YYYY-MM-DD", "YYYY-MM-DD"],
        ]}
      />
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-white/50 border border-gray-300/50 rounded-xl"
      >
        {options.map(([val, label]) => (
          <option key={val} value={val}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
