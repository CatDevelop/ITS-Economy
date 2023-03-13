import React from 'react';
import s from './AuthorizationForm.module.css';
import Input from "../Input/Input";
import Button from "../Button/Button";
import Form from "react-bootstrap/Form";
import {useForm} from "react-hook-form";
import {signInUser} from '../../store/slices/userSlice';
import {useDispatch} from "react-redux";
import md5 from 'md5';
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

function AuthorizationForm(props) {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            authorizationLogin: '',
            authorizationPassword: '',
        },
        mode: "onBlur"
    });

    const onSubmit = (payload) => {
        payload.authorizationPassword = md5(payload.authorizationPassword);
        const data = {
            login: payload.authorizationLogin,
            password: payload.authorizationPassword
        }

        toast.promise(dispatch(signInUser(data)), {
                pending: 'Выполняю запрос',
                success: 'Вы успешно авторизовались 👌',
                error: {
                    render({data}) {
                        return `${data.message}`
                    }
                }
            }
        ).then(() => navigate("/profile"));
    }

    return (
        <>
            <p className={s.header}>Welcome to<br/>IT-School Banking</p>
            <Form className={s.registrationForm} onSubmit={handleSubmit(onSubmit)}>
                <p className={s.registration}>Authorization</p>
                <Input register={register}
                       registerName='authorizationLogin'
                       options={
                           {
                               required: true
                           }
                       }
                       errors={errors}
                       title="Логин"
                       require={true}
                       type="text"/>

                <Input register={register}
                       registerName='authorizationPassword'
                       options={
                           {
                               required: true
                           }
                       }
                       errors={errors}
                       title="Пароль"
                       require={true}
                       type="password"/>
                <Button type="submit">Sign In</Button>
            </Form>
        </>
    )
}

export default AuthorizationForm;