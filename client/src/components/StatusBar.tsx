interface StatusBarProps {
  status: "idle" | "loading" | "connected" | "error";
  message: string;
}

const StatusBar = ({ status, message }: StatusBarProps) => {
  let indicatorClass = "w-3 h-3 rounded-full mr-2 ";
  
  switch (status) {
    case "connected":
      indicatorClass += "bg-green-500";
      break;
    case "error":
      indicatorClass += "bg-destructive";
      break;
    case "loading":
      indicatorClass += "bg-yellow-500";
      break;
    default:
      indicatorClass += "bg-gray-400";
  }

  return (
    <div className="mb-4 p-3 bg-gray-100 rounded-md flex items-center">
      <div className={indicatorClass}></div>
      <span className="text-muted-foreground text-sm">{message}</span>
    </div>
  );
};

export default StatusBar;
