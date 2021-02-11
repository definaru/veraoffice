import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Default } from '../../components/layout/Default'
import { Row, Col, Button, FormGroup, Label, FormFeedback } from 'reactstrap'
import { ToastAlert } from '../../components/alert/ToastAlert'
import { BrowserDetect } from '../../components/helper/BrowserDetect'
// import Account from '../../components/context/UserAccount'
import Loading from '../../components/Loading'
import Fire from '../../config/fire-config'


export default function Login() 
{

    const Title = 'Login'
    //const info = Account()
    const currencyTime = (new Date).getTime()
    const router = useRouter()
    const { name } = router.query
    const Names = name ? name : 'Loading...'
    const { register, errors, watch, handleSubmit } = useForm({
      criteriaMode: "all"
    })

    const watchPassword = watch('password')

    const onSubmit = data => {     
        setLogin(data)
    } 
    const Browser = BrowserDetect()
    const [login, setLogin] = useState(null)
    const [lock, setLock] = useState('')
    const [city, setCity] = useState('')
    //const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [errAuth, setErrAuth] = useState(null)


    const isValid = () => {
      if(errAuth) {
        return (errAuth.code === 'auth/user-not-found') ? false : true
      }
    }

    const isValidPass = () => {
      if(errAuth) {
          return (errAuth.code === 'auth/wrong-password') ? false : true
      } 
    }



    useEffect(() => {

      if(login) {
        
        let credential = Fire.auth.EmailAuthProvider.credential(login.email, login.password)
        window.sessionStorage.setItem('credential', JSON.stringify(credential))

        //console.log('Credential Result: ', credential)

        Fire.auth()
          .signInWithEmailAndPassword(login.email, login.password) 
          .then((user) => {
              //console.log(Browser)

              console.log('Load This:', user)

              if(user) {
                Fire.database().ref('login/' + user.user.uid + '/' + currencyTime)
                  .set(Browser, (error) => {
                    console.log('login:', error)
                  })
              }
              setLoading(true);
              setTimeout(() => {router.push('/dashboard')}, 250) 
          })
          .catch((err) => {
              setErrAuth(err)
              setLoading(false)
              console.log(err.code, err.message)
          })
          if(errAuth) {
              setLoading(false)
          } 
        }
        setLock(window.localStorage.getItem('uuid'))
        
        if(window.localStorage.getItem('location') !== null ) {
            setCity(city)
        } else {
            window.sessionStorage.setItem('location', name)
            setCity(window.sessionStorage.getItem('location'))          
        }
    }, [lock, login, city])


    return (
      <Default title={`${Title}`+" | "+`${Names}`}>
        <Row>
          <Col className="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-10 offset-sm-1 col-10 offset-1">
            <h5 className="text-center mt-5 pt-5">
            <Link href="/">
                <a>
                    <img 
                        src="/img/logo.png" 
                        className="d-flex justify-content-center mb-3" 
                        style={{width: '200px', margin: 'auto'}} 
                    />                  
                </a>
            </Link>
              Sign In
            </h5>
            <p className="text-center">
              New to this site? &#160;
              <Link href="/signup">
                <a className="text-vera">Sign Up</a>
              </Link>
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label>Email</Label>
                <input 
                  type="text" 
                  name="email" 
                  autoComplete="off"
                  className={errors.email ? "is-invalid form-control" : "form-control"}
                  ref={
                    register(
                      {
                        required: true, 
                        pattern: /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-0-9A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
                        validate: {isValid}
                      })} 
                />
                
                {
                  errors.email &&
                  <>
                    {errors?.email?.types?.required && <FormFeedback>Email is required</FormFeedback>}
                    {errors?.email?.types?.pattern && <FormFeedback>This address is not an email</FormFeedback>}
                    {errors?.email?.types?.isValid && <FormFeedback>There is no such user, or the user is not registered</FormFeedback>}                  
                  </>
                }
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <input
                  type="password"
                  name="password"
                  className={errors.password ? "is-invalid form-control" : "form-control"}
                  ref={
                    register({ 
                      required: true,
                      validate: {isValidPass}
                     })}
                />
                {
                    errors.password &&
                    <>
                      {errors?.password?.types?.required && <FormFeedback>password required</FormFeedback>}                   
                      {errors?.password?.types?.isValidPass && <FormFeedback>password is not valid!</FormFeedback>}                      
                    </>
                }

              </FormGroup>
              <FormGroup>
                <input type="hidden" name="city" value={name || ''} ref={register} />
                <input type="hidden" name="lock" value={lock || ''} ref={register} />
                <Link href="/reset">
                    <a className="text-vera">Forgot password?</a>
                </Link>
              </FormGroup>
              <Button type="submit" color="vera" className="btn-block">
                  {loading ? <Loading /> : Title}
              </Button>
            </form> 

            {errAuth ? <ToastAlert header="Error" text={errAuth.message} color="danger" /> : ''}
            
             

            {/*
              {
                login ? 
                <pre>{JSON.stringify(login, null, 2)}</pre> : 'null'
              } 
              <p>{login ? login.email : ''}</p>             
              <p>{login ? login.password : ''}</p>   
              {
                errAuth ? 
                <pre>{JSON.stringify(errAuth, null, 2)}</pre> : 'null'
              }            
            */}  
     

          </Col>
        </Row>
      </Default>
    )
}

