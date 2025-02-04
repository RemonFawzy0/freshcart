import { createContext } from "react";





const countercontext = createContext(0);


export default function CounterContextProvider({children}){
    return < countercontext.Provider>
           {children}
    
    </countercontext.Provider> 
}