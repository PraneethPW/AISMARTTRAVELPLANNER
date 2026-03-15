import Sidebar from "./Sidebar"

export default function DashboardLayout({children}:any){

return(

<div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">

<Sidebar/>

<div className="flex-1 p-8 overflow-y-auto">

{children}

</div>

</div>

)

}