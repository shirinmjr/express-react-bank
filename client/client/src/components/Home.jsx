import LoginButton from './LoginButton';
import LogoutPage from './LogoutButton';
import Profile from './Profile';
import AccountList from './AccountsList';

export default function Home(props) {

    return (
        <div>
            <h2>Welcome to React Bank</h2>
            <LoginButton />
            <LogoutPage />
            <Profile />
            <AccountList />
        </div>
    );
}