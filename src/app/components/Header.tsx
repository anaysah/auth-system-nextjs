const Header = () => {
    return (
        <div className="header flex justify-between items-center p-4 bg-gray-100">
            <div className="website-name-description flex flex-col">
                <h1 className="text-3xl font-bold">Auth System</h1>
                <p className="text-lg">
                    This will be a basis session based auth system
                </p>
            </div>
            <nav>
                <ul className="flex gap-4">
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/login">Login</a>
                    </li>
                    <li>
                        <a href="/signup">Register</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Header;