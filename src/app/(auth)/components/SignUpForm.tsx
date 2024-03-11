import { UserFormType } from "../signup/page";

type SignUpFormProps = { 
    user: UserFormType; 
    setUser: (user: UserFormType) => void; 
    Loading: boolean; 
    error: string; 
    success: string; 
    onSignup: () => void; 
    buttonDisabled: boolean; 
}

const SignUpForm = ({ user, setUser, Loading, error, success, onSignup, buttonDisabled }: SignUpFormProps) => {

    return (
        // <form>
            <div className="form-wrapper">
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input value={user.firstName} onChange={(e) => setUser({ ...user, firstName: e.target.value })} type="text" name="firstName" id="firstName" />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input value={user.lastName} onChange={(e) => setUser({ ...user, lastName: e.target.value })} type="text" name="lastName" id="lastName" />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} type="email" name="email" id="email" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} type="password" name="password" id="password" />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input value={user.confirmPassword} onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })} type="password" name="confirmPassword" id="confirmPassword" />
                </div>
                <button onClick={onSignup} disabled={buttonDisabled} className={`${buttonDisabled ? "opacity-50 cursor-not-allowed" : ""} bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}>
                    {Loading ? "Loading..." : "Sign Up"}
                </button>
                <p className="text-red-500">{error}</p>
                <p className="text-green-500">{success}</p>
            </div>
        // </form>
    )
}

export default SignUpForm;