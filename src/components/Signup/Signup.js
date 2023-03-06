import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Contexts/UserContext';
import './Signup.css';

const Signup = () => {

    const [error, setError] = useState(null);
    const { userCreate } = useContext(AuthContext);

    // sigin button control
    const handleSignUp = (event) => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;

        console.log(email, password, confirm);

        // set password
        if (password.length < 6) {
            setError('Password should be 6 characters or more');
        }

        if (password !== confirm) {
            setError('Your password did not match');
        }

        userCreate(email, password)
            .then(result => {
                const user = result.user;
                form.reset();
                console.log(user);
            })
            .catch(e => {
                console.error(e);
            })
    }

    return (
        <div className='form-container'>
            <h2 className='form-title'>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" required />
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" required />
                </div>
                <div className='form-control'>
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type="password" name="confirm" required />
                </div>
                <p className='error-text'>{error}</p>
                <input className='btn-submit' type="submit" value="Sign Up" />
                <p>Already have an account? <Link to='/login'>Login</Link></p>
            </form>
        </div>
    );
};

export default Signup;