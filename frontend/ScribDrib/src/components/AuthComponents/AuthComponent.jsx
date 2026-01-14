import { Outlet } from "react-router-dom"

export default function AuthComponent() {
    return (
        <div>
            <p>This is Auth Page</p>
            <Outlet/>
        </div>
    )
}

