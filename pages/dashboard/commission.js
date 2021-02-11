import Link from 'next/link'
import Homelist from '../../components/Homelist'
import { useRouter } from 'next/router'
import { AdminInterface } from '../../components/layout/AdminInterface'
import { AiOutlineFileProtect } from 'react-icons/ai'
import { CardBody, Card} from 'reactstrap'


export default function Commission()
{
    const router = useRouter()

    const List = Homelist()
    const href = router.pathname
    const result = List.filter(p => p.href.includes(href))
    const Title = result[0].header 

    return (
        <AdminInterface title={Title}>
            <h1 className="h2 font-weight-semibold mb-4 js-loon">
                <AiOutlineFileProtect className="text-vera" /> {Title}
            </h1>
            <ol className="breadcrumb bg-transparent small p-0">
                <li className="breadcrumb-item">
                    <Link href="/dashboard">
                        <a>Home</a>
                    </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">{Title}</li>
            </ol>
            <Card>
                <CardBody>
                    ...
                </CardBody>
            </Card>
        </AdminInterface>
    )
}
