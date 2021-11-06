import { useEffect } from "react"
import Group from "./Group"

export default  function Groups ({groups}) {
    return <>
    <div className="my-12 mx-auto border bg-gray-100">
        {groups.map((group)=><Group id={group}/>)}
        <div className="max-w-sm shadow-sm my-2 mx-auto bg-white cursor-pointer hover:bg-gray-100"> Create New Group</div>
    </div>
    </>
}