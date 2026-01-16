import { Save } from "lucide-react";

export default function ModalFooter({ onCancel, onSave }) {
  return (
    <div className="p-6 border-t border-gray-200/30 bg-linear-to-r from-gray-50/50 to-white/50">
      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300/50 rounded-xl hover:shadow"
        >
          Cancel
        </button>

        <button
          onClick={onSave}
          className="px-6 py-3 text-sm font-medium text-white bg-linear-to-b from-blue-600 to-blue-400 rounded-xl shadow flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  );
}
