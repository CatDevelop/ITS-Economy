import {useDispatch} from "react-redux";
import {useAuth} from "../hooks/use-auth";
import {getProfile} from "../store/slices/profileSlice";
import {useEffect} from "react";
import {useProfile} from "../hooks/use-profile";
import Card from "../components/Card/Card";
import TransferForm from "../components/TransferForm/TransferForm";
import {useUsers} from "../hooks/use-users";
import {getUsers} from "../store/slices/transferSlice";

export const TransferPage = () => {
    const dispatch = useDispatch();
    const user = useAuth();

    useEffect(() => {
        dispatch(getProfile(user.id));
        dispatch(getUsers());
    }, []);

    const [profile] = useProfile();
    const [users] = useUsers();
    debugger
    return (
        <div>
            <Card
                balance={profile.balance}
                cardholderName={profile.firstName+" "+profile.secondName}
                cardholderCard={profile.card}
            />

            <TransferForm users={users.users} myCard={profile.card}/>
        </div>
    )
}