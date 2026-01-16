import ToggleSwitch from "../ToggleSwitch";

export default function VisibilityTab({ visibility, setVisibility }) {
  return (
    <div className="space-y-6">
      <Row
        title="Public Profile"
        desc="Make your profile visible to everyone"
        value={visibility.profilePublic}
        onChange={(v) => setVisibility({ ...visibility, profilePublic: v })}
      />

      <Row
        title="Show Email Address"
        desc="Display your email on your public profile"
        value={visibility.showEmail}
        onChange={(v) => setVisibility({ ...visibility, showEmail: v })}
      />

      <Row
        title="Show Phone Number"
        desc="Display your phone on your public profile"
        value={visibility.showPhone}
        onChange={(v) => setVisibility({ ...visibility, showPhone: v })}
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
