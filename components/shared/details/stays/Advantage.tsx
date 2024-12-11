import "@/app/globals.css";

interface AdvantageProps {
  name: string
}

const Advantage: React.FC<AdvantageProps> = (props) => {
  return (
    <div className="flex flex-col justify-between rounded-xl min-w-40 min-h-40 p-4 pr-16 border-2 border-primary-100">
      <img src="/assets/icons/advantage-stars.svg" alt="Stars" className="size-8"/>
      <span className="mt-auto text-sm">{props.name}</span>
    </div>
  );
};

export default Advantage;
