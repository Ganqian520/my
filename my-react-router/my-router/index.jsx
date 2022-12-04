import React,{useState,useEffect} from 'react'

const {Provider,Consumer} = React.createContext()

export function Route({path,component}) {
    return(
        <Consumer>
            {({location}) => {
                console.log(location);
                if(path==location.pathName){
                    return component()
                }
            }}
        </Consumer>
    )
}

export function HashRouter({children}) {
    const getHash = () => window.location.hash?.slice(1) || '/'
    useEffect(()=>{
        window.location.hash = getHash()
        window.addEventListener('hashchange',(e) => {
            setLocation({
                ...location,
                pathName: getHash()
            })
        })
    },[])
    const [location,setLocation] = useState({
        pathName: getHash()
    })
    return (
        <Provider value={{location}}>
            {children}
        </Provider>
    )
}
