import { LoginFormUserType } from "../login/page";

type LogInProps = {
    user: LoginFormUserType;
    setUser: React.Dispatch<React.SetStateAction<LoginFormUserType>>;
    onLogin: () => void;
    buttonDisabled: boolean;
    Loading: boolean;
    error: string;
    success: string;
}

const LogInForm = ({ user, setUser, onLogin, buttonDisabled, Loading, error, success }: LogInProps) => {
    return (
        <div className="form-wrapper">
            <div>
                <label htmlFor="email">Email</label>
                <input value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} type="email" name="email" id="email" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} type="password" name="password" id="password" />
            </div>
            <button onClick={onLogin} disabled={buttonDisabled} className={`${buttonDisabled ? "opacity-50 cursor-not-allowed" : ""} bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline mt-2`}>
                {Loading ? "Loading..." : "Log In"}
            </button>
            <p className="text-red-500">{error}</p>
            <p className="text-green-500">{success}</p>
        </div>
    )
}

export default LogInForm;