export default function ToggleSwitch({ checked, onChange }) {
    return (
        <label className="inline-flex items-center cursor-pointer screen-only">
            <input
                type="checkbox"
                className="sr-only peer"
                checked={checked}
                onChange={onChange}
            />
            <div className="w-9 h-5 bg-gray-300 rounded-full peer-checked:bg-blue-500 relative transition-colors">
                <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transform transition-transform duration-200 ease-in-out peer-checked:translate-x-4"></div>
            </div>
        </label>
    );
}
