const data = [
  {
    index: 1,
    name: 'Anmol Srivastava',
    userid: 'Thunder376OP',
    img: '',
  },
  {
    index: 2,
    name: 'Subhadeep Choudhary',
    userid: 'Subha41',
    img: '',
  },
  {
    index: 3,
    name: 'Abhishree',
    userid: 'Billa420',
    img: '',
  },
  {
    index: 4,
    name: 'Ali Asad Quasim',
    userid: 'Agent007',
    img: '',
  }
]

const FollowBar = () => {
  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-neutral-800 rounded-xl p-4 flex flex-col">
        <h2 className="text-white text-xl font-semibold">Who to follow</h2>
        {/* <div className="flex flex-col gap-6 mt-4">
        {users.map((user: Record<string, any>) => (
          <div key={user.id} className="flex flex-row gap-4">
            <Avatar userId={user.id} />
            <div className="flex flex-col">
              <p className="text-white font-semibold text-sm">{user.name}</p>
              <p className="text-neutral-400 text-sm">@{user.username}</p>
            </div>
          </div>
        ))}
      </div> */}
        {data.map((index) => {
          return (
            <div key={index.index} className="w-full h-16 bg-neutral-800 pt-4 flex gap-2">
              <div className="w-full flex-[1] h-full rounded-[50%] bg-gray-500"></div>
              <div className="w-full h-full flex-[5] flex flex-col">
                <div className="font-semibold text-lg text-[rgba(255,255,255,0.9)]">{index.name}</div>
                <div className="font-semibold text-[12px] text-[rgba(255,255,255,0.7)]">@{index.userid}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>);
}

export default FollowBar;