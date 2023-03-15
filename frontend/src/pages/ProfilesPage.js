import {useDispatch} from "react-redux";
import {useAuth} from "../hooks/use-auth";
import {getProfile} from "../store/slices/profileSlice";
import {useEffect} from "react";
import {useProfile} from "../hooks/use-profile";
import Card from "../components/Card/Card";
import Transactions from "../components/Transactions/Transactions";
import {getProfiles} from "../store/slices/profilesSlice";
import Profiles from "../components/Profiles/Profiles";
import {useProfiles} from "../hooks/use-profiles";

export const ProfilesPage = () => {
    const dispatch = useDispatch();
    const user = useAuth();

    useEffect(() => {
        dispatch(getProfile(user.id));
        dispatch(getProfiles());
    }, []);

    const [profile] = useProfile();
    const [profiles] = useProfiles();

    return (
        <div>
            <Card balance={profile.balance}
                  cardholderName={profile.firstName+" "+profile.secondName}
                  cardholderCard={profile.card}
            />

            <Profiles profiles={profiles.profiles}/>
        </div>
    )
}