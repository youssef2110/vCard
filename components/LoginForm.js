import React, { Component } from 'react'
import { Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from 'yup';
import SignInError from './signInError';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css'
import { supabase } from './supabase/supabaseClient';
import { setCookie } from 'cookies-next';

export default function LoginForm({changeVisibility}) {
    const { error } = useRouter().query;
    const router = useRouter()
    
    const schema = yup.object({
        email: yup
            .string('Enter your Email')
            .required('Email is required'),
        password: yup
            .string('Enter your password')
            .required('Password is required'),
    });
    return (
        <>
            <h1 className={styles.title}>Connectez-vous à vCard.</h1>
            <p className={styles.text}>Entrez vos coordonnées ci-dessous.</p>
            <Formik
                validationSchema={schema}
                validateOnChange={false}
                validateOnBlur={false}
                initialValues={{ email: "", password: "" }}
                onSubmit={async (values) => {
                    let { data, error } = await supabase.auth.signInWithPassword({
                        email: values.email,
                        password: values.password
                    })
                    if(data) setCookie('access_token', data.session.access_token); router.push('/profile')
                }}
            >
                {({ values, errors, handleChange, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                className="shadow-none"
                                value={values.email}
                                name='email'
                                type="email"
                                placeholder="Email"
                                onChange={handleChange}
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control
                                className="shadow-none"
                                value={values.password}
                                name='password'
                                type="password"
                                placeholder="votre mot de passe"
                                onChange={handleChange}
                                isInvalid={!!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                        { error && <SignInError styles={styles} error={error} /> }
                        <p className={styles.forgetPassword} onClick={changeVisibility}>
                            {"Don't have an account ? Sign Up"}
                        </p> 
                        <Button className={styles.buttonForm} variant="primary" type="submit">
                            Se connecter
                        </Button>
                        
                    </Form>
                )}
            </Formik>
        </>
    )
}
