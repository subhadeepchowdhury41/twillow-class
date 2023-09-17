import FollowBar from "../components/layout/Followbar";
import Sidebar from "../components/layout/Sidebar";
import ProtectedRoute from "../protected";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (<html lang="en">
    <body>
      <ProtectedRoute>
        <div className="h-screen bg-black">
          <div className="container h-full mx-auto">
            <div className="grid grid-cols-4 h-full">
              <Sidebar />
              <div
                style={{
                  
                }}
                className="
              col-span-3
              h-screen
              scroll-smooth
              overflow-y-auto
              lg:col-span-2
              border-x-[1px]
              border-neutral-800
            ">
                {children}
              </div>
              <FollowBar />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </body>
  </html>);
}