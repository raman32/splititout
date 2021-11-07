import { useEffect } from "react"
import Group from "./Group"

export default  function Groups ({groups}) {
    return <>
    <div className="my-12 mx-auto border bg-gray-100 max-w-sm rounded">
        <div>Groups</div>
        {groups && groups.map((group)=><Group id={group}/>)}
    </div>
    </>
}