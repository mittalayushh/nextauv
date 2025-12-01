"use client";
import { useState, useEffect, useRef } from "react";
import { IconX, IconSearch } from "@tabler/icons-react";

const AUV_TAGS = {
  "Navigation & Localization": [
    "SLAM", "EKF", "UKF", "DVL", "INS", "IMU", "GPS-denied", "Acoustic Localization",
    "USBL", "LBL", "Dead Reckoning", "Odometry", "Vision SLAM", "Sonar SLAM",
    "Loop Closure", "Sensor Fusion", "Multi-sensor Integration", "Depth Sensing",
    "Pressure Sensor", "Magnetometer", "Heading Estimation", "Pose Estimation",
    "Localization Drift", "Calibration", "Noise Filtering"
  ],
  "Control & Mission Planning": [
    "PID", "MPC (Model Predictive Control)", "LQR", "Path Planning", "Trajectory Optimization",
    "Obstacle Avoidance", "Station Keeping", "Dynamic Positioning", "Waypoints",
    "Auto-dive", "Auto-return", "Heading Control", "Buoyancy Control", "Ballast",
    "Thruster Mapping", "Thruster Control", "Actuation", "Control Loops", "Setpoints",
    "Teleoperation"
  ],
  "Perception & Sensors": [
    "Sonar", "Multibeam Sonar", "Side Scan Sonar", "Forward-Looking Sonar", "Camera",
    "Underwater Vision", "Color Correction", "Object Detection", "Object Tracking",
    "AprilTags", "AR Markers", "Hydrophone", "Acoustic Processing", "Denoising",
    "Underwater Lighting", "Optical Flow", "Feature Extraction", "Image Enhancement",
    "Segmentation", "Deep Learning"
  ],
  "Software & Middleware": [
    "ROS", "ROS 2", "ROS2 Jazzy", "ROS2 Humble", "Gazebo", "Gazebo Garden",
    "Ignition", "Unity Simulation", "ArduSub", "BlueOS", "MAVLink", "DDS",
    "Cyclone DDS", "FastDDS", "PX4", "Python", "C++", "Docker", "Ubuntu", "Jetson SDK"
  ],
  "Hardware": [
    "Thrusters", "T200", "T500", "Servos", "Battery", "Power Management", "ESC",
    "Waterproofing", "Connectors", "Blue Robotics", "Watertight Enclosures",
    "Pressure Hull", "Mechanical Design", "Hydrodynamics", "CFD", "Buoyancy",
    "Frame Design", "Material Selection", "3D Printing", "Heat Dissipation",
    "Motor Drivers", "PCB Design", "Sensors", "Electronics", "Wiring Harness"
  ],
  "Autonomy & AI": [
    "Behavior Trees", "Mission Planning", "Reinforcement Learning", "Neural Networks",
    "Underwater Dataset", "PoseNet", "Object Recognition", "Mapping", "Planning", "AI Control"
  ],
  "Communications": [
    "LoRa", "Acoustic Modems", "Wi-Fi", "Tethered Communication", "Ethernet",
    "Serial", "CAN", "RS485", "Telemetry", "Network Setup"
  ],
  "Competitions & Teams": [
    "RoboSub", "SAUVC", "NIOT Competition", "TechFest Water Robotics",
    "Team Recruitment", "TDR", "Systems Engineering", "Team Management",
    "Testing", "Field Trials"
  ]
};

// Flatten tags for search
const ALL_TAGS = Object.values(AUV_TAGS).flat();

export default function TagSelector({ selectedTags, setSelectedTags, compact = false }) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  const filteredTags = query === ""
    ? []
    : ALL_TAGS.filter((tag) =>
      tag.toLowerCase().includes(query.toLowerCase()) && !selectedTags.includes(tag)
    ).slice(0, 10); // Limit suggestions

  const addTag = (tag) => {
    if (selectedTags.length < 5 && !selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
      setQuery("");
      // Keep open for multiple selections if compact
      if (!compact) setIsOpen(false);
    }
  };

  const removeTag = (tagToRemove) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="relative" ref={wrapperRef}>
      {!compact && (
        <>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Select Tags (Up to 5)
          </label>
          <p className="text-xs text-gray-500 mb-2">
            Tags help others find your content. Select up to five that best describe your post.
          </p>
        </>
      )}

      {/* Selected Tags (only show here if NOT compact, or if you want them inside the selector) */}
      {!compact && (
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-900/50 text-indigo-200 border border-indigo-700/50"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-indigo-400 hover:bg-indigo-800 hover:text-white focus:outline-none"
              >
                <IconX size={12} />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <IconSearch size={16} className="text-gray-500" />
        </div>
        <input
          type="text"
          className={`block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg leading-5 bg-gray-900 text-gray-300 placeholder-gray-500 focus:outline-none focus:bg-gray-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm transition duration-150 ease-in-out ${compact ? 'text-xs' : ''}`}
          placeholder={compact ? "Search tags..." : "Search for tags..."}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          disabled={selectedTags.length >= 5}
          autoFocus={compact}
        />

        {/* Dropdown results */}
        {isOpen && query.length > 0 && (
          <div className="absolute z-10 mt-1 w-full bg-gray-800 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm border border-gray-700">
            {filteredTags.length === 0 ? (
              <div className="cursor-default select-none relative py-2 px-4 text-gray-500">
                No tags found.
              </div>
            ) : (
              filteredTags.map((tag) => (
                <div
                  key={tag}
                  className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-700 text-gray-300"
                  onClick={() => addTag(tag)}
                >
                  <span className="block truncate">{tag}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      {selectedTags.length >= 5 && (
        <p className="text-xs text-yellow-500 mt-1">Maximum of 5 tags reached.</p>
      )}
    </div>
  );
}
