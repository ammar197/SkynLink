import { useTranslation } from "react-i18next";

interface PropertyTypeBadgeProps {
  type: string;
}

export default function PropertyTypeBadge({ type }: PropertyTypeBadgeProps) {
  const { t } = useTranslation();
  
  let bgColor = "";
  let label = "";
  
  switch (type) {
    case "full_apartment":
      bgColor = "bg-secondary";
      label = t('propertyTypes.fullApartment');
      break;
    case "private_room":
      bgColor = "bg-primary";
      label = t('propertyTypes.privateRoom');
      break;
    case "shared_bed":
      bgColor = "bg-neutral-600";
      label = t('propertyTypes.sharedBed');
      break;
    default:
      bgColor = "bg-neutral-500";
      label = type;
  }
  
  return (
    <div className={`${bgColor} text-white text-sm font-bold px-2 py-1 rounded`}>
      <span lang="ar">{label}</span>
      <span lang="en">{label}</span>
    </div>
  );
}
