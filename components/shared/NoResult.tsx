import Image from "next/image";

interface Props {
  title: string;
  description: string;
}

const NoResult = (params: Props) => {
  return (
    <div className="flex flex-col items-center justify-center w-full mt-10">
      <Image
        src="/assets/images/no_data.svg"
        alt="No reuslt illustration"
        width={300}
        height={300}
        className="block object-contain dark:hidden"
      />
      <h2 className="mt-8 h2-bold text-dark200_light900">{params.title}</h2>
      <p className="body-regular text-dark500_light700 my-3.5 max-w-wd text-center">
        {params.description}
      </p>
    </div>
  );
};

export default NoResult;
