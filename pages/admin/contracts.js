import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaRegPlayCircle } from 'react-icons/fa'
import { Button, Card, CardBody, CardFooter, CardHeader, Table, FormGroup, Col, Row } from 'reactstrap'
import { AdminInterface } from '../../components/layout/AdminInterface'
import Fire from '../../config/fire-config'
import { MdLibraryAdd, MdBorderColor, MdDelete, MdClose } from 'react-icons/md'
import { AiOutlineFilePdf } from 'react-icons/ai'
import { LoadTable } from '../../components/helper/AdminContacts'


export default function Contacts()
{
    const Title = 'Contacts'
    const NewDocHref = () => {
        var string = 'abcdefghijklmnopqrstuvwxyz0123456789'
        var rs = ''
        while (rs.length < 6) {
            rs += string[Math.floor(Math.random() * string.length)]
        }
        return rs
    }
    const types = ['application/*']
    const [contacts, setContacts] = useState(null)
    const [data, setData] = useState(null)
    const [files, setFiles] = useState(null)
    const [add, setAdd] = useState(false)
    const db = Fire.database()
    const router = useRouter()
    const { href } = router.query
    const Toggle = () => setAdd(!add)

    const YouTubeVideo = useRef('')
    const refHref = useRef(NewDocHref())
    const refPdf = useRef('')
    const refText = useRef('')

    const replacer = (file) => {
       return String(file).substring(94)
       //.split('?')[0]
    }

    //useEffect(() => {

    //}, [data])

    function RemoveData(data, file) {
        db.ref('DocsList/' + data).remove()
        Fire.storage().ref().child(`../DocsList/Contacts/${replacer(file)}`).delete() //
            .then(() => {
                console.log('File deleted successfully')
            }).catch((error) => {
                console.log('Uh-oh, an error occurred!', error) 
            })
    }

    function hendlerSubmit(e)
    {
        e.preventDefault()
        //console.log(e)
        setData({
            href: refHref.current,
            pdf: refPdf.current.value,
            text: refText.current.value,
            video: YouTubeVideo.current.value
        })
        if(data) {
            db.ref('DocsList/' + data.href).set(
                data,
                (error) => {
                    if (error) {
                        console.log('Docs List:', error)
                    } else {
                        setData(null)
                        setAdd(false)            
                    }
                }
            )
            
        }
    }


    function addNewWriter()
    {
        setAdd(true)
    }

    function fileURLToPathChange(e)
    {
        console.log('Extract:', e.target.files)
        setFiles(e.target.files[0])
    }

    db.ref('DocsList').once('value').then(function(snapshot) {
        setContacts(Object.values(snapshot.val()))
    })


    //let array = []
    //db.collection('contacts').where("text", "!=", '')
    //    .get()
    //    .then(function(querySnapshot) {
    //        querySnapshot.forEach(function(doc) {
    //            array.push(doc.data())
    //        })
    //        setContacts(array)
    //    })
    //    .catch(function(error) {
    //        console.log("Error getting documents: ", error)
    //    })



    return (
        <AdminInterface title={Title}>
            <h1 className="h2 font-weight-semibold mb-4 js-loon">
                <AiOutlineFilePdf className="text-vera" /> {Title}
            </h1>
            <ol className="breadcrumb bg-transparent small p-0 d-print-none">
                <li className="breadcrumb-item">
                    <Link href="/dashboard">
                        <a>Home</a>
                    </Link>
                </li>
                <li className="breadcrumb-item">
                    <Link href="/dashboard/admin">
                        <a>Admin Panel</a>
                    </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">{Title}</li>
            </ol>
            <div className={add === false ? "" : "d-none"}>
                <Card className="col-md-10 p-0">
                    <CardBody className="p-0">
                        <Table responsive hover className="m-0">
                            <tbody>
                            {
                                contacts ? 
                                    <>
                                    {contacts.map((item, inx) => (
                                        <tr key={inx}>
                                            <td style={{width:'20px'}}>
                                                <img src="/icon/pdf.svg" className={item.pdf ? '' : 'grayColorImage'} style={{width: '35px'}} />
                                            </td>
                                            <td>
                                                {
                                                    item.pdf ?
                                                    <Link href="/dashboard/contractsandforms/[href]" as={`/dashboard/contractsandforms/${item.href}`}>
                                                        <a className="text-vera">
                                                            <span className="btn-block crop">{item.text}</span>
                                                        </a>
                                                    </Link> : <span className="btn-block crop">{item.text}</span>                                                   
                                                }

                                            </td>
                                            <td className="text-right">
                                                {
                                                    item.video == '' ? 
                                                    <>
                                                        <button className="btn btn-secondary" disabled>
                                                            <FaRegPlayCircle /> &#160; no &#160; video
                                                        </button>
                                                    </> 
                                                    : 
                                                    <>
                                                    <Link href="/dashboard/contractsandforms/video/[video]" as={`/dashboard/contractsandforms/video/${item.video}`}>
                                                        <a className="btn btn-primary">
                                                            <FaRegPlayCircle />&#160; play video
                                                        </a>
                                                    </Link>
                                                    </>
                                                }
                                            </td>
                                            <td className="pl-0 pr-0">
                                                <Link href={`?href=${item.href}`}>
                                                    <button className="btn border" onClick={() => setAdd(true)}>
                                                        <MdBorderColor />
                                                    </button>                                                    
                                                </Link>
                                            </td>
                                            <td className="pl-0">
                                                <button className="btn btn-danger" onClick={() => RemoveData(`${item.href}`, `${item.pdf}`)}>
                                                    <MdDelete />
                                                </button>
                                            </td>
                                        </tr> 
                                    ))}
                                    
                                    </> : 
                                    <>
                                        <LoadTable />
                                        <LoadTable />
                                        <LoadTable />
                                    </>
                            }
                            </tbody>
                        </Table>                    
                    </CardBody>
                </Card>

                <Button 
                    color="primary" 
                    className="mt-3" 
                    onClick={addNewWriter}
                >
                    <MdLibraryAdd /> &#160; Add New Document
                </Button>                 
            </div>
  

            <Card className={add === false ? "d-none" : "col-md-10 p-0"}>
                <CardHeader>
                    <div className="d-flex justify-content-between">
                        <div>
                            <h3 className="m-0">New Document</h3>
                        </div>
                        <div>
                            <Link href="/admin/contracts">
                                <Button className="p-0 bg-white text-dark border-0" onClick={Toggle}>
                                    <MdClose />
                                </Button>                                
                            </Link>
                        </div>
                    </div>
                </CardHeader>
                <CardFooter>
                    <Row>
                        <Col md={YouTubeVideo.current.value ? 6 : 12}>
                            <form onSubmit={hendlerSubmit}>
                                <FormGroup>
                                    <label className="btn btn-block btn-light">
                                        Select a file
                                        <input 
                                            type="file" 
                                            name="pdf" 
                                            className="form-control d-none" 
                                            ref={refPdf}
                                            onChange={fileURLToPathChange}
                                            accept={types}
                                        />
                                    </label>
{files ? <pre>{JSON.stringify(types.includes(files.type), null, 2)}</pre> : <p>...</p>}
                                </FormGroup>
                                <FormGroup>
                                    <input 
                                        type="text" 
                                        name="text" 
                                        autoComplete="off"
                                        placeholder="Write the document title here..." 
                                        style={{color: '#000', fontWeight: '900'}}
                                        className="form-control" 
                                        ref={refText}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <input 
                                        type="text" 
                                        name="video" 
                                        autoComplete="off"
                                        className="form-control" 
                                        placeholder="Link to YouTube video, insert key here..."
                                        ref={YouTubeVideo}
                                    />    
                                </FormGroup>
                                <FormGroup className="pl-0 col-md-4">
                                    <Button color="dark" className="btn-block" type="submit">
                                        &#160;&#160;Save&#160;&#160;
                                    </Button>
                                </FormGroup>
                            </form>
                        </Col>
                        <Col md={YouTubeVideo.current.value ? 6 : 12}>
                            {
                                YouTubeVideo.current.value !== '' ? 
                                <iframe 
                                    className="you_tube_screen" 
                                    src={`https://www.youtube.com/embed/${YouTubeVideo.current.value}?rel=0`} frameBorder="0" 
                                    allow="autoplay; gyroscope" 
                                    allowFullScreen
                                /> : ''                                
                            }
                        </Col>                        
                    </Row>
                    
                </CardFooter>
            </Card>
            <div className="btn-block" style={{marginBottom: '200px'}} />
            <style jsx>{`
                .you_tube_screen {
                    width:100%;
                    height:200px;
                    margin-bottom:-6px;
                }
            `}</style>
        </AdminInterface>
    )
}