import { setMonth } from "date-fns"



export const calculatePeriodEnd =(interval:string)=>{
    const now=  new Date()

    switch (interval){
        case 'MONTHLY':
            return new Date(now.setMonth(now.getMonth() + 1));
        case 'QUARTLY':
            return new Date(now.setMonth(now.getMonth()+3))
        case 'Yearly':
            return new Date(now.setFullYear(now.getFullYear()+1))
        default:
            return new Date(now.setMonth(now.getMonth()+1))

    }


}