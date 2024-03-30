const MessageSkeleton = () => {
  return (
    <>
      <div className="animate-pulse flex gap-3 items-center">
        <div className="pt-4">
          <div className="h-10 w-36 bg-slate-700 rounded-e-xl rounded-es-xl"></div>
        </div>
      </div>

      <div className="animate-pulse flex gap-3 items-center justify-end">
        <div className="pt-4">
          <div className="h-10 w-36 bg-slate-700 rounded-s-xl rounded-ee-xl"></div>
        </div>
      </div>
    </>
  );
};
export default MessageSkeleton;
