export default function Estate({ query, object })
{
    //return [
    //    {id: '1', type: 'For Sale', price: '720000', image: '/img/work-05.jpg', header: '18201 Collins Avenue', adress: 'Sunny Isles Beach FL, 33160', area: '140', beds: '2', baht: '2', obj: 'jWCnKgxCEk3kb8ETQnoX07yTUkJpzV'},
    //    {id: '2', type: 'For Rent', price: '1900', image: '/img/work-06.jpg', header: '2929 Point East Dr', adress: 'Aventura FL, 33160', area: '140', beds: '2', baht: '1', obj: 'HYsbvzV5rGEcJpMxOCzu1xEiPXzAiO'},
    //    {id: '3', type: 'For Sale', price: '420000', image: '/img/work-02.jpg', header: '605 and 609 S Ocean Dr', adress: 'Hollywood FL, 33019', area: '140', beds: '2', baht: '3', obj: 'tHYwSTx46LHwg3ZnzTYyILOWRuNsxl'},
    //    {id: '4', type: 'For Rent', price: '800', image: '/img/work-04.jpg', header: '15300 SW 134th Pl', adress: 'Miami FL, 33177', area: '140', beds: '2', baht: '1', obj: 'TRotlxgDxH1AUL4qh2QA9C852FT66d'}
    //]
    return { query, object }
}

Estate.getInitialProps = async ({query}) => {
    const token = process.env.TOKEN
    const limit = 100
    const res = await fetch(`https://rets.io/api/v2/miamire/listings/${query}?access_token=${token}&limit=${limit}`)
    const json = await res.json()
    return { 
        query,
        object: json.bundle
    }
    // https://rets.io/api/v2/miamire/listings/1e4e277d8f47c3a4b6e1b967ab41293e?access_token=1bf642605cbd35fa33b5c469fa829217&limit=100
}