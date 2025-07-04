// ToggleSwitch.jsx
export default function ToggleSwitch({ checked, onChange }) {

    console.log("ToggleSwitch fired");

    return (
        <label className="relative inline-block w-10 cursor-pointer select-none">
            {/* hidden checkbox that becomes the peer */}
            <input
                type="checkbox"
                className="sr-only peer"
                checked={checked}
                onChange={onChange}
            />

            {/* track */}
            <span className="block h-5 w-10 rounded-full bg-gray-300 transition-colors peer-checked:bg-blue-500" />

            {/* knob (sibling of the peer, absolutely positioned) */}
            <span
                className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white
                   transition-transform duration-200 transform
                   peer-checked:translate-x-5"
            />
        </label>
    );
}
