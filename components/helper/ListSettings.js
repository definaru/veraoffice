import { 
    AiOutlineLaptop, 
    AiOutlineMobile, 
    AiOutlineHighlight, 
    AiOutlineSafetyCertificate, 
    AiOutlineIdcard, 
    AiOutlineUsb 
} from 'react-icons/ai'

export function ListSettings()
{
    return [
        { id: '1', icon: <AiOutlineSafetyCertificate />, header: 'Confidentiality', text: 'Data protection, Recognition', href: 'security' },
        { id: '2', icon: <AiOutlineLaptop />, header: 'System', text: 'Notifications, Messages, Mailings', href: 'system' },
        { id: '3', icon: <AiOutlineMobile />, header: 'Phone', text: 'SMS Notifications, SMS Alert, Verification', href: 'phone' },
        { id: '4', icon: <AiOutlineHighlight />, header: 'Personalization', text: 'Theme, Language, Location', href: 'persona' },
        { id: '5', icon: <AiOutlineIdcard />, header: 'License', text: 'Receipt, Confirmation, Verification', href: 'license' },
        { id: '6', icon: <AiOutlineUsb />, header: 'EDS', text: 'Electronic Digital Signature', href: 'eds' }
    ]
}