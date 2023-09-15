import Avatar from "../ui/Avatar";

const PostTweetForm = ({
  userId,
  onSubmit,
}: { userId: string, onSubmit: (payload: any) => void }) => {
  return (<div className="flex">
    <div className="">
      <Avatar userId={userId} />
    </div>
    <div className="flex items-center">
      <button onClick={onSubmit} className="bg-blue-500 text-white rounded-full px-4 py-2">Tweet</button>
    </div>
  </div>);
}

export default PostTweetForm;