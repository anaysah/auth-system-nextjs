const SignUpForm = () => {
    return (
        <form action="">
            <div className="form-wrapper">
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" name="firstName" id="firstName" />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" name="lastName" id="lastName" />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" />
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Sign Up</button>
            </div>
        </form>
    )
}

export default SignUpForm;