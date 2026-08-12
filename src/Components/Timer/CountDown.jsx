"use client"

import { useEffect, useReducer } from "react"
import Button from "../UiElements/Button"
import handleTime from "@/helpers/handleTime"

export default function CountDown({duration = 20_000}) {
    const intialValues = {remainingTime: duration, endTime: null, isRunning: false}
    const reducer = (countDown, action) => {
        const { type } = action
        const {endTime, remainingTime} = countDown
        switch(type) {
            case "start":
                return {remainingTime: duration, endTime: Date.now() + duration, isRunning: true}
            case "pause":
                return {...countDown, isRunning: false}
            case "resume":
                    return {...countDown, endTime: Date.now() + remainingTime, isRunning: true}
            case "reset":
                return {remainingTime: duration, endTime: null, isRunning: false}
            case "setRemain":
                    return {...countDown, remainingTime: endTime - Date.now() }        
            case "setIsRunning":
                    return {...countDown, isRunning: false}        
                }
                return countDown
    }
        
    const [countDown, dispatch] = useReducer(reducer, intialValues)
    const {remainingTime, isRunning, endTime} = countDown
    const start = () => dispatch({type: "start"})
    const resume = () => dispatch({type: "resume"})
    const pause = () => dispatch({type: "pause"})
    const reset = () => dispatch({type: "reset"})   

    useEffect(() => {
        if(!isRunning) return
        const interval = setInterval(() => {
            const remaining = Math.max(endTime - Date.now(), 0)
            dispatch({type: "setRemain"})
    
            if(remaining === 0) {
                clearInterval(interval)
                dispatch({type: "setIsRunning"})
                console.log("Finished")
            }
        }, 10)
     return () => clearInterval(interval)
    }, [isRunning, endTime])

    const [minutes, seconds, milli] = handleTime(remainingTime)

    return (
        <div>
        <p>{minutes}:{seconds}:{milli}</p>
        <div>
            <Button success onClick={start}>Start</Button>
            <Button outline onClick={resume}>Resume</Button>
            <Button danger  onClick={pause}>Pause</Button>
            <Button onClick={reset}>Reset</Button>
        </div>
        </div>
    )
}