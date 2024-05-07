import {Spacer, User} from "@nextui-org/react";

function Sidebar (){
return(
    <div className="w-[350px] h-full flex flex-col bg-gray-100 items-center ">
        <Spacer y={30} />
        <User
            classNames={{
                name: "text-black font-bold text-lg",
                description: "stroke-white",

            }}
            name="Jane Doe"
            description="Manager"
            avatarProps={{
                src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
            }}
        />

        <Spacer y={70} />


        <h1 className="text-gray-700 font-semibold w-full bg-gray-50 p-5 text-lg rounded-b flex items-center justify-center duration-75 hover:bg-white">Manage Stocks</h1>
        <h1 className="text-gray-700 font-semibold w-full bg-gray-200 p-5 text-lg rounded-b flex items-center justify-center duration-75 hover:bg-gray-100">Add Promotions</h1>
        <h1 className="text-gray-700 font-semibold w-full bg-gray-200 p-5 text-lg rounded-b flex items-center justify-center duration-75 hover:bg-gray-100">Accept Predictions</h1>
        <h1 className="text-gray-700 font-semibold w-full bg-gray-200 p-5 text-lg rounded-b flex items-center justify-center duration-75 hover:bg-gray-100">Orders</h1>
        <h1 className="text-gray-700 font-semibold w-full bg-gray-200 p-5 text-lg rounded-b flex items-center justify-center duration-75 hover:bg-gray-100">Add or Remove Users</h1>

    </div>)}

export default Sidebar;