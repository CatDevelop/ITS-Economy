import React from 'react';
import s from './RegistrationForm.module.css';
import Input from "../Input/Input";
import Button from "../Button/Button";
import Form from "react-bootstrap/Form";
import {useForm} from "react-hook-form";
import {signUpUser} from '../../store/slices/userSlice';
import {useDispatch} from "react-redux";
import md5 from 'md5';
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const click = () => {
    console.log("click");
};

function RegistrationForm(props) {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            registrationFirstName: '',
            registrationSecondName: '',
            registrationCard: '',
            registrationLogin: '',
            registrationPassword: '',
            registrationRetryPassword: ''
        },
        mode: "onBlur"
    });

    const onSubmit = (payload) => {
        if (payload.registrationPassword !== payload.registrationRetryPassword) {
            const errorToast = toast.error("Пароли не совпадают!")
            return;
        }

        delete payload.registrationRetryPassword;
        payload.registrationPassword = md5(payload.registrationPassword);

        const data = {
            firstName: payload.registrationFirstName,
            secondName: payload.registrationSecondName,
            card: parseInt(payload.registrationCard),
            login: payload.registrationLogin,
            password: payload.registrationPassword
        }

        toast.promise(dispatch(signUpUser(data)), {
                pending: 'Выполняю запрос',
                success: 'Вы успешно зарегестрировались 👌',
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
            <p className={s.header}>Welcome to<br/>IT-school banking</p>
            <Form className={s.registrationForm} onSubmit={handleSubmit(onSubmit)}>
                <p className={s.registration}>Registration</p>
                <Input register={register}
                       registerName='registrationFirstName'
                       options={
                           {
                               required: true
                           }
                       }
                       errors={errors}
                       title="Имя"
                       require={true}/>

                <Input register={register}
                       registerName='registrationSecondName'
                       options={
                           {
                               required: true
                           }
                       }
                       errors={errors}
                       title="Фамилия"
                       require={true}/>

                <Input register={register}
                       registerName='registrationCard'
                       options={
                           {
                               required: true,
                               pattern: {
                                   value: /^[1-9][0-9]{3}$/, message: "Неверный номер карты"
                               }
                           }
                       }
                       errors={errors}
                       title="Номер карты"
                       require={true}
                       placeholder={"****"}/>

                <Input register={register}
                       registerName='registrationLogin'
                       options={
                           {
                               required: true
                           }
                       }
                       errors={errors}
                       title="Логин"
                       require={true}/>

                <Input register={register}
                       registerName='registrationPassword'
                       options={
                           {
                               required: true
                           }
                       }
                       errors={errors}
                       title="Пароль"
                       require={true}
                       type="password"/>

                <Input register={register}
                       registerName='registrationRetryPassword'
                       options={
                           {
                               required: true
                           }
                       }
                       errors={errors}
                       title="Повторите пароль"
                       require={true} type="password"/>

                <Button type="submit">Sign Up</Button>
            </Form>
        </>
    )
}

export default RegistrationForm;