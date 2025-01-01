const BigLoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="w-20 h-20 border-4 border-[#CDEAE1] border-t-[#8dd3bb] rounded-full animate-spin"></div>
    </div>
  );
};

export default BigLoadingSpinner;
