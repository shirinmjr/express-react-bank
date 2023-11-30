import AccountList from './AccountsList';
import NewAccount from './NewAccount';

export default function Home(props) {

    return (
        <div>
            <div>
                <NewAccount />
            </div>
            <div>
                <AccountList />
            </div>
        </div>
    );
}