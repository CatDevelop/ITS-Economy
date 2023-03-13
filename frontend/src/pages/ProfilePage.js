import {useDispatch} from "react-redux";
import {useAuth} from "../hooks/use-auth";
import {getProfile} from "../store/slices/profileSlice";
import {useEffect} from "react";
import {useProfile} from "../hooks/use-profile";
import Card from "../components/Card/Card";
import Transactions from "../components/Transactions/Transactions";

export const ProfilePage = () => {
    const dispatch = useDispatch();
    const user = useAuth();

    useEffect(() => {
        dispatch(getProfile(user.id));
    }, []);

    const [profile] = useProfile();

    return (
        <div>
            <Card balance={profile.balance}
                  cardholderName={profile.firstName+" "+profile.secondName}
                  cardholderCard={profile.card}
            />

            <Transactions transactions={[].concat(profile.transactions).reverse()}/>
        </div>
    )
}