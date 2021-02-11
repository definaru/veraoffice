require('dotenv').config()
//import dotenv from 'dotenv'

module.exports = {
    exportTrailingSlash: false,
    trailingSlash: false,
    generateBuildId: async () => {
        return 'defina-vera-office'
    },
    exportPathMap: async function (
            defaultPathMap,
            { dev, dir, outDir, distDir, buildId }
        ) {
        return {
            '/': { page: '/' },
            '/reset': { page: '/reset' },
            '/signup': { page: '/signup' },
            '/offer': { page: '/offer' },
            '/confirm': { page: '/confirm' },
            '/dashboard/index': { page: '/dashboard' },
            '/dashboard/submitdeal': { page: '/dashboard/submitdeal' },
            '/dashboard/boardsales': { page: '/dashboard/boardsales' },
            '/dashboard/chat': { page: '/dashboard/chat' },
            '/dashboard/profile': { page: '/dashboard/profile' },
            '/dashboard/settings': { page: '/dashboard/settings' },
            '/dashboard/contractsandforms': { page: '/dashboard/contractsandforms' },
            '/dashboard/education': { page: '/dashboard/education' },
            '/login': { page: '/login' },
            '/404': { page: '/404' },
            //'/login/Florida': { page: '/login/Florida', query: { name: 'Florida' } },
            //'/login/Georgia': { page: '/login/Georgia', query: { name: 'Georgia' } },
        }
    },
    env: {
        API_ENV: process.env.API_ENV,
        STATUS: process.env.STATUS,
        API_KEY: process.env.API_KEY,
        LANG: process.env.LANG,
        GOOGLE_USER: process.env.GOOGLE_USER,
        GOOGLE_PASSWORD: process.env.GOOGLE_PASSWORD,
        DOMAIN: process.env.DOMAIN,
        TOKEN: process.env.TOKEN
    }
}