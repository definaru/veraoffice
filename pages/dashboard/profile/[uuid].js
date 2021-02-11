import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { AiOutlineInfoCircle, AiOutlineUser } from 'react-icons/ai'
import { Card, CardBody, CardImg, Col, FormGroup, Row, Alert } from 'reactstrap'
import { FaCameraRetro, FaImage, FaRegQuestionCircle, FaTimes } from 'react-icons/fa'
import { AdminInterface } from '../../../components/layout/AdminInterface'
import { ListLanguages } from '../../../components/data/ListLanguages'
import { ToastAlert } from '../../../components/alert/ToastAlert'
import { useForm } from 'react-hook-form'
import FileProgressBar from '../../../components/helper/FileProgressBar'
import Account from '../../../components/context/UserAccount'
import makeAnimated from 'react-select/animated'
import CountryList from '../../../components/CountryList'
import Skeleton from 'react-loading-skeleton'
import chroma from 'chroma-js'
import Select from 'react-select'
import Fire from '../../../config/fire-config'


export default function EditUser()
{

    const router = useRouter()
    const info = Account()
    const colourOptions = ListLanguages()
    const country = CountryList()
    //const ChEmail = ChangeEmail('Q1KYJ6O8~fs4J}*') 
    const DefaultData = {
        value: '',
        isFocused: false
    }
    const { uuid } = router.query
    const { register, watch } = useForm()
    const [login, setLogin] = useState(null)
    const [select, setSelect] = useState([colourOptions[0], colourOptions[7]])
    const [languages, setLanguages] = useState(null)
    const [mmail, setMmail] = useState(false)
    const [mphone, setMPhone] = useState(false)
    const [file, setFile] = useState(null)
    const [errorType, setErrorType] = useState(null)
    const [change, setChange] = useState(null)
    const [visible, setVisible] = useState(false)

    const [name, setName] = useState(DefaultData)
    const [lastName, setLastName] = useState(DefaultData)
    const [myrank, setMyrank] = useState(DefaultData)
    const [myphone, setMyPhone] = useState(DefaultData)
    const [about, setAbout] = useState(DefaultData)

    const FieldsLanguages = watch(["languages"])
    const FirstName = watch("first_name")
    const LastName = watch("last_name")
    const Position = watch("position")
    const Phone = watch("phone")
    const AboutMe = watch("about_me")

    const animatedComponents = makeAnimated()
    const types = ['image/png', 'image/jpeg']

    const deFocus = () => setName({isFocused: false})
    const deFocusTwo = () => setLastName({isFocused: false})
    const deFocusRank = () => setMyrank({isFocused: false})
    const deFocusPhone = () => setMyPhone({isFocused: false})
    const deFocusAbout = () => setAbout({isFocused: false})
    const onDismiss = () => setVisible(false)

    const currentUser = Fire.auth().currentUser

    function сhangeRank()
    {
        setChange(Position)
        setMyrank({ value: Position, isFocused: true })
        if(myrank.isFocused) {
            setTimeout( () => setChange(null), 2000) 
            Fire.database().ref('users/' + uuid).update({
                rank: Position
            })
        }
    }

    function сhangeAbout()
    {
        setChange(AboutMe)
        setAbout({ value: AboutMe, isFocused: true })
        if(about.isFocused) {
            setTimeout(() => setChange(null), 2000) 
            Fire.database().ref('users/' + uuid).update({
                descript: AboutMe
            })
        }
    }

    function сhangeName()
    {
        setName({ value: FirstName, isFocused: true })
        setLastName({ value: LastName, isFocused: true })
        if(name.isFocused || lastName.isFocused) {
            Fire.database().ref('users/' + uuid).update({
                username: FirstName,
                lastname: LastName
            })

            currentUser.updateProfile({
                displayName: FirstName + ' ' + LastName
            })
        }
    }

    function сhangePhoneNumber(e)
    {
        setMyPhone({ value: Phone, isFocused: true })
        setChange(Phone)
        if(myphone.isFocused) {
            
            setTimeout( () => setChange(null), 1000)             
            Fire.database().ref('users/' + uuid).update({
                phone: Phone
            })
        }

        //currentUser.updatePhoneNumber(e.target.value)
        //    .then(()=>{ 
        //        console.log("Success update phone") 
        //    })
        //    .catch(error=>{
        //        console.log(error.message);
        //    })
    }

    // ----> const getKeyByValue = (obj, value) => Object.keys(obj).find(key => obj[key] === value)
    
    function changePermission(e)
    {
        setChange(e.target.value)
        setTimeout( () => setChange(null), 1000) 
        Fire.database().ref('users/' + uuid).update({
            permission: e.target.value
        }) 
    }

    const handleChange = e => {

        setSelect(e)
        setLanguages(FieldsLanguages.languages)
        setChange(e)
        setTimeout( () => setChange(null), 1000) 

        Fire.database().ref('users/' + uuid).update({
            languages: languages.toString()
        })      
    }

    const imageChange = (e) => {
        let selectFile = e.target.files[0]
        if(selectFile && types.includes(selectFile.type)) {
            setFile(selectFile)
            setChange(selectFile)
            setTimeout(() => setChange(null), 1000) 
            setErrorType('')
        } else {
            setFile(null)
            setErrorType('Please select an image file (png or jpeg) !')
        }
    }
    
    useEffect(() => {
        if(uuid !== '') { 
            Fire.database().ref('users/' + uuid).once('value').then(function(snapshot) {
                setLogin(snapshot.val())
            })
        }
        if(select) {
            setLanguages(select.map(s => s.value))
        } else {
            setLanguages('')
        }
    }, [select, uuid, login])

    const Title = login ? login.username + ' ' + login.lastname : 'Loading...'

    const colourStyles = {
        control: styles => ({ ...styles, backgroundColor: 'white' }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
          const color = chroma(data.color);
          return {
            ...styles,
            backgroundColor: isDisabled
              ? null
              : isSelected
              ? data.color
              : isFocused
              ? color.alpha(0.1).css()
              : null,
            color: isDisabled
              ? '#ccc'
              : isSelected
              ? chroma.contrast(color, 'white') > 2
                ? 'white'
                : 'black'
              : data.color,
            cursor: isDisabled ? 'not-allowed' : 'default',
      
            ':active': {
              ...styles[':active'],
              backgroundColor: color.alpha(0.1).css(),
            },
          };
        },
        multiValue: (styles, { data }) => {
          const color = chroma(data.color);
          return {
            ...styles,
            backgroundColor: color.alpha(0.9).css()
          };
        },
        multiValueLabel: (styles, { data }) => ({
          ...styles,
          color: '#fff'
          //data.color,
        }),
        multiValueRemove: (styles, { data }) => ({
          ...styles,
          color: '#ddd',
          ':hover': {
            backgroundColor: data.color,
            color: 'white',
          },
        }),
    }

    return (
        <AdminInterface title={`Edit user: ${Title}`}>
            <div className="d-flex justify-content-between">
                <div>
                    <h1 className="h2 font-weight-semibold mb-4 js-loon">
                        <AiOutlineUser className="text-vera" />
                        &#160;Editing user data
                    </h1>
                </div>
                <div>
                    <button className="btn bg-white" onClick={() => setVisible(true)}>
                        <FaRegQuestionCircle />
                    </button>
                </div>
            </div>

            <ol className="breadcrumb bg-transparent small p-0">
                <li className="breadcrumb-item">
                    <Link href="/dashboard">
                        <a>Home</a>
                    </Link>
                </li>
                <li className="breadcrumb-item">
                    <Link href="/dashboard/profile">
                        <a>Profile</a>
                    </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">{Title}</li>
            </ol>

            <Alert color="info" isOpen={visible} toggle={onDismiss}>
                <div className="btn-block text-center">
                    <strong><AiOutlineInfoCircle /> Information:</strong>
                    &#160;&#160;We have autosave, no additional actions are needed.
                </div>
            </Alert>
            {/*
            <p>{info.user.currently ? info.user.currently.uid : 'Loading'}</p>
            <p>{info.user.login ? info.user.login.permission : 'Loading'}</p>            
            */}
            

            {
                login  ?
                    <form>
                        <Card style={{marginBottom: '100px'}}>
                            <CardBody>
                                <Row>
                                    <Col md={'4'} className="border-md-right border-light text-center pt-1">
                                        <label className="editBGform">
                                            <div className="editMovieCam cp">
                                                <FaCameraRetro />
                                            </div>
                                            <input type="file" style={{display: 'none'}} onChange={imageChange} />
                                            <CardImg 
                                                src={login.photo}
                                                className="img-fluid rounded-circle mb-3"
                                                style={{
                                                    width: '84px', 
                                                    height: '84px'
                                                }}
                                            />                                        
                                        </label>
                                        {errorType && <p className="text-danger"><small>{errorType}</small></p>}
                                        {file && <p className="text-muted"><FaImage className="text-vera" /> {file.name}</p>}
                                        {file && <FileProgressBar file={file} setFile={setFile} id={uuid} />}
                                        <FormGroup>
                                            <label style={{color: '#a3a3a5'}}>First name & Last name</label>
                                            <div className="d-flex">
                                                <div className="mr-2">
                                                    <input 
                                                        type="text" 
                                                        name="first_name"
                                                        autoComplete="off" 
                                                        autoCorrect="off" 
                                                        autoCapitalize="words" 
                                                        spellCheck="false" 
                                                        defaultValue={name.value}
                                                        onChange={сhangeName}
                                                        style={{fontSize: '20px'}}
                                                        className="form-control custom-input text-center rounded-0 font-weight-bold" 
                                                        defaultValue={login.username}
                                                        ref={register} 
                                                        key={name.isFocused}
                                                        onBlur={deFocus}
                                                    />
                                                </div>
                                                <div>
                                                    <input 
                                                        type="text" 
                                                        name="last_name" 
                                                        autoComplete="off" 
                                                        autoCorrect="off" 
                                                        autoCapitalize="words" 
                                                        spellCheck="false" 
                                                        style={{fontSize: '20px'}}
                                                        className="form-control custom-input text-center rounded-0 font-weight-bold" 
                                                        defaultValue={login.lastname} 
                                                        onChange={сhangeName}
                                                        ref={register}
                                                        key={lastName.isFocused}
                                                        onBlur={deFocusTwo}
                                                    />
                                                </div>
                                            </div>                                    
                                        </FormGroup>
                                        <FormGroup>
                                            <input 
                                                type="text" 
                                                name="position" 
                                                autoComplete="off" 
                                                autoCorrect="off" 
                                                autoCapitalize="words" 
                                                spellCheck="false"
                                                className="form-control custom-input text-center rounded-0" 
                                                defaultValue={login.rank} 
                                                placeholder="Your position"
                                                onChange={сhangeRank}
                                                ref={register}
                                                key={myrank.isFocused}
                                                onBlur={deFocusRank}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <input 
                                                type="text" 
                                                name="phone" 
                                                className="form-control custom-input text-center rounded-0 font-weight-bold text-vera" 
                                                defaultValue={login.phone}
                                                placeholder="Your phone"
                                                onChange={сhangePhoneNumber}
                                                ref={register}
                                                onClick={() => setMPhone(true)}
                                                onBlur={deFocusPhone}
                                            />                                           
                                        </FormGroup>
                                        <FormGroup>
                                            <input 
                                                type="text" 
                                                className="form-control custom-input text-center" 
                                                defaultValue={login.email} 
                                                name="email" 
                                                placeholder="Your E-mail"
                                                onClick={() => setMmail(true)}
                                            />
                                        </FormGroup>                                      
                                        <Link href="/dashboard/profile">
                                            <a className="btn btn-block btn-dark mt-2">
                                                <FaTimes />&#160;Cancel
                                            </a>
                                        </Link>
                                    </Col>
                                    <Col md={'8'}>
                                        <h3 className="card-title js-loon mb-1">About me</h3>
                                        <textarea 
                                            rows="7" 
                                            name="about_me" 
                                            defaultValue={login.descript}
                                            className="form-control mb-4"
                                            style={{resize: 'none'}}
                                            onChange={сhangeAbout}
                                            ref={register}
                                            onBlur={deFocusAbout}
                                        />

                                        {
                                            info.user.login ? 
                                                <Row>
                                                    <Col 
                                                        md={info.user.login.permission === 'Admin' ? 6 : 12}
                                                        className={info.user.login.permission === 'Admin' ? "" : "d-none"}
                                                    >
                                                        <FormGroup>
                                                            <h3 className="card-title js-loon mb-1">Permissions and roles</h3>
                                                            <select 
                                                                className="form-control" 
                                                                name="permission"
                                                                defaultValue={login.permission ? login.permission : "Select a permissions and roles"}
                                                                onChange={changePermission}
                                                            >
                                                                <option disabled>Select a permissions and roles</option> 
                                                                <option value="User">User</option>
                                                                <option value="Admin">Admin</option>
                                                                <option value="Broker">Broker</option>
                                                                <option value="Agent">Agent</option>
                                                            </select>                                            
                                                        </FormGroup>                                                    
                                                    </Col>
                                                    <Col md={info.user.login.permission === 'Admin' ? 6 : 12}>
                                                        <FormGroup>
                                                            <h3 className="card-title js-loon mb-1">User gender</h3>
                                                            <select 
                                                                className="form-control" 
                                                                name="sex"
                                                                defaultValue={
                                                                    login.sex !== 'no data' ? 
                                                                        login.sex : 
                                                                        "Select a user gender"
                                                                }
                                                            >
                                                                <option disabled>Select a user gender</option> 
                                                                <option value="0">Female</option>
                                                                <option value="1">Male</option>
                                                            </select> 
                                                        </FormGroup>
                                                    </Col>
                                                </Row> : ''                                           
                                        }
                                        <Row className="mt-4">
                                            <Col lg={'2'} className="mb-5 mb-lg-0">
                                                <h4 className="h3 mb-3 js-loon">License</h4>
                                                <FormGroup>
                                                    <input 
                                                        type="text" 
                                                        name="license" 
                                                        className="form-control custom-input" 
                                                        defaultValue={login.license_number}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg={'4'}>
                                                <h4 className="h3 mb-3 js-loon">Country</h4>
                                                <FormGroup>
                                                    <select 
                                                        name="country" 
                                                        className="form-control custom-input" 
                                                        defaultValue="Miami, FL, USA"
                                                    >
                                                        <option disabled>Select a country</option>                                        
                                                        {country.map(c => (
                                                        <option key={c.id} value={c.country}>{c.country}</option>
                                                        ))}
                                                    </select>
                                                </FormGroup>
                                            </Col>
                                            <Col lg={'6'}>
                                                <h4 className="h3 mb-3 js-loon">Knowledge of languages</h4>
                                                <FormGroup>
                                                    <Select
                                                        isMulti
                                                        placeholder="Choose language"
                                                        closeMenuOnSelect={true}
                                                        value={colourOptions.find(obj => obj.value === select)}
                                                        defaultValue={select}
                                                        name="languages" 
                                                        onChange={handleChange}
                                                        options={colourOptions}
                                                        styles={colourStyles}
                                                    />
                                                </FormGroup>
                                                
                                        {/*
                                                <pre>{JSON.stringify(name, null,2)}</pre>
                                                <pre>{JSON.stringify(FieldsLanguages, null,2)}</pre>
                                                <pre>{JSON.stringify(select, null,2)}</pre>
                                                <pre>{JSON.stringify(languages, null,2)}</pre>
                                        */}

                                                { 
                                                    languages ? 
                                                        <input 
                                                            type="hidden" 
                                                            name="languages"
                                                            ref={register}
                                                            className="form-control"
                                                            defaultValue={languages} 
                                                        /> : '' 
                                                }
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </form>
                     :
                    <Card>
                        <Skeleton />
                    </Card>
            }
            {
                mmail ? 
                    <ToastAlert 
                        header="Information" 
                        text="Your email is a login, changing your email will lead to a repeated verification and confirmation of your account." 
                        color="info" 
                    /> : ''
            }
            {
                mphone ? 
                    <ToastAlert 
                        header="Warning!" 
                        text="Are you sure you want to change your phone number?" 
                        color="warning" 
                        headerColor="text-dark" 
                        textColor="text-dark" 
                    /> : ''
            }
            {
                change &&
                    <ToastAlert 
                        header="Successfully" 
                        text="Your data has been changed" 
                        color="success" 
                        headerColor="text-white" 
                        textColor="text-light" 
                    />
            }

            {/*
                {info.user.role ? <pre>{JSON.stringify(info.user.role, null, 2)}</pre> : ''}
                {login ? <pre>{JSON.stringify(login, null, 2)}</pre> : <p>...</p>}
            */}
            
            
            
            <style jsx>{`
                .custom-input {
                    width: 100%;
                    display: block;
                    border: 0;
                    border-bottom: 1px solid #ddd;
                }
                label {
                    font-size: 13px;
                    font-weight:bold;
                }
            `}</style>
        </AdminInterface>
    )
}