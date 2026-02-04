function Navbar(){
    return(
        <nav className="flex items-center justify-between px-10 py-5 bg-slate-900 text-white">
            <h1 className="text-2xl font-bold">mailM</h1>
            <ul className="flex space-x-8 text-sm font-medium">
                <li className="cursor-pointer hover:text-blue-400">Home</li>
                <li className="cursor-pointer hover:text-blue-400">About</li>
                <li className="cursor-pointer hover:text-blue-400">contact</li>
            </ul>
        </nav>
    )
}
export default Navbar;