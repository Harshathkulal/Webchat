const ConversationSkeleton = () => {
  return (
    <div className="p-1 divide-y divide-slate-600">
      <div className="animate-pulse flex space-x-2 pl-1">
        <div className="rounded-full bg-slate-700 h-12 w-12"></div>
        <div className="pt-4">
          <div className="h-4 w-36 bg-slate-700 rounded"></div>
        </div>
      </div>
    </div>
  );
};
export default ConversationSkeleton;
